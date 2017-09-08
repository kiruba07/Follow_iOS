"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var page_1 = require("ui/page");
var firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("application-settings");
var listviewitems_1 = require("../../service/listviewitems");
var timerModule = require("tns-core-modules/timer");
var http_post_services_1 = require("../../service/http-post.services");
var MyTaskComponent = (function () {
    function MyTaskComponent(router, myPostService, page) {
        this.router = router;
        this.myPostService = myPostService;
        this.page = page;
        this.dataItems = new observable_array_1.ObservableArray([]);
        this.layout = new page_1.Page();
        this.listViewItems = new listviewitems_1.ListViewItems;
        this.pageTitle = "My Task";
    }
    MyTaskComponent.prototype.ngOnInit = function () {
        this.dataItems = this.listViewItems.getMyTaskdetails();
        // this.layout = this.page;
        // let grid = this.layout.getViewById("myTaskDetailsDock");
        // console.log("Grid layout==="+grid);
        // let layoutBase = <LayoutBase>grid;
        // layoutBase.isUserInteractionEnabled=true;
    };
    MyTaskComponent.prototype.onSwipeCellStarted = function (args) {
        console.log("Index key===" + args.index);
        var completionStatus = this.dataItems.getItem(args.index).completed;
        console.log("Completed======" + completionStatus);
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];
        var leftItem = swipeView.getViewById('deleteView');
        var rightItem = swipeView.getViewById('doneView');
        if (completionStatus) {
            swipeLimits.left = 0;
            swipeLimits.right = 0;
        }
        else {
            swipeLimits.left = leftItem.getMeasuredWidth();
            swipeLimits.right = rightItem.getMeasuredWidth();
            swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
        }
    };
    MyTaskComponent.prototype.onPullToRefreshInitiated = function (args) {
        this.dataItems = this.listViewItems.getMyTaskdetails();
        timerModule.setTimeout(function () {
            var listView = args.object;
            listView.notifyPullToRefreshFinished();
        }, 1000);
    };
    MyTaskComponent.prototype.doneTask = function (args) {
        // this.layout = this.page;
        // let grid = this.layout.getViewById("myTaskDetailsDock");
        // console.log("Grid layout==="+grid);
        // let layoutBase = <LayoutBase>grid;
        // layoutBase.isUserInteractionEnabled=true;
        var tapIndex = this.dataItems.indexOf(args.object.bindingContext);
        var x = this;
        // var swipeView = args['object'] as RadListView;
        // var leftItem = swipeView.getViewById<View>('grid');
        // console.log("Left Item=="+leftItem);
        // var layout = this.page;
        // var left = layout.getViewById(this.dataItems.getItem(tapIndex).taskName);
        // console.log("Left Item=="+left);
        //  let layoutBase = <LayoutBase>grid;
        // layoutBase.isUserInteractionEnabled=true;
        // left.isUserInteractionEnabled=true;
        console.log("Item Kay======" + this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======" + this.dataItems.getItem(tapIndex).taskName);
        console.log("Created By Number======" + this.dataItems.getItem(tapIndex).createdByNumber);
        console.log("Created By Token======" + this.dataItems.getItem(tapIndex).createdByToken);
        console.log("Assigne Numbers======" + this.dataItems.getItem(tapIndex).assigneeNumber);
        var createdByNumber = this.dataItems.getItem(tapIndex).createdByNumber;
        var key = this.dataItems.getItem(tapIndex).key;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var deviceRegisteredUserName = application_settings_1.getString("deviceRegisteredUserName");
        var taskName = this.dataItems.getItem(tapIndex).taskName;
        var createdByToken = this.dataItems.getItem(tapIndex).createdByToken;
        //update completion status in mytask details
        //let numberString=this.dataItems.getItem(tapIndex).assigneeNumber;
        var assigneeNumbers = this.dataItems.getItem(tapIndex).assigneeNumber;
        // firebase.update(
        //         '/MyTaskDetails/'+devicePhoneNumber+'/'+this.dataItems.getItem(tapIndex).key,
        //         {
        //             'myCompletionStatus':true,
        //         }
        //         ).then(
        //           (res)=>{
        //             console.log("Task has been upadates successfully in my task details---"+res);
        //            // this.dataItems=this.listViewItems.getMyTaskdetails();   
        //           },(res)=>{
        //             console.log("Problem in updating my task details---"+res);
        //           });
        //get the updation count and update completion status in other task details
        var onQueryEvent = function (result) {
            if (!result.error) {
                console.log("Get the current value===" + result.value);
                firebase.update('/OtherTaskDetails/' + createdByNumber + '/' + key, {
                    'completionCount': (result.value + 1),
                }).then(function (res) {
                    console.log("Completion count has been upadates successfully in other task details---" + res);
                    firebase.update('/MyTaskDetails/' + devicePhoneNumber + '/' + x.dataItems.getItem(tapIndex).key, {
                        'myCompletionStatus': true,
                    }).then(function (res) {
                        console.log("Completion status has been upadates successfully in my task details---" + res);
                        // x.dataItems=x.listViewItems.getMyTaskdetails(); 
                        x.updateCompletionCountInMyTaskDetailsForAllAssignees(result.value, assigneeNumbers, key);
                    }, function (res) {
                        console.log("Problem in updating completion status in my task details---" + res);
                    });
                }, function (res) {
                    console.log("Problem in updating completion count in other task details---" + res);
                });
            }
        };
        firebase.query(onQueryEvent, '/OtherTaskDetails/' + this.dataItems.getItem(tapIndex).createdByNumber + '/' + this.dataItems.getItem(tapIndex).key + '/completionCount', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
        //update individual completion stats in other task details
        firebase.update('/OtherTaskDetails/' + this.dataItems.getItem(tapIndex).createdByNumber + '/' + this.dataItems.getItem(tapIndex).key + '/AssigneeDetails/' + devicePhoneNumber, {
            'completionStatus': true,
        });
        //send push notification
        var data = {
            "notification": {
                "title": "Task Completed!",
                "body": deviceRegisteredUserName + " has completed " + taskName,
                "priority": "high"
            },
            "to": createdByToken
        };
        console.log("data==" + JSON.stringify(data));
        this.myPostService
            .postData(data).subscribe(function (res) {
            console.log("Reminder Success");
        }, function (error) {
            console.log("Reminder Failure===" + error);
        });
    };
    MyTaskComponent.prototype.updateCompletionCountInMyTaskDetailsForAllAssignees = function (count, assigneeNumbers, key) {
        var x = this;
        for (var i = 0; i < assigneeNumbers.length; i++) {
            console.log("Numbers===i===" + assigneeNumbers[i]);
            firebase.update('/MyTaskDetails/' + assigneeNumbers[i] + '/' + key, {
                'completionCount': (count + 1),
            }).then(function (res) {
                console.log("Completion count has been upadates successfully in my task details---" + res);
                //x.dataItems=x.listViewItems.getMyTaskdetails();
            }, function (res) {
                console.log("Problem in updating completion count in my task details---" + res);
            });
        }
        x.dataItems = x.listViewItems.getMyTaskdetails();
    };
    MyTaskComponent.prototype.deleteTask = function (args) {
        var _this = this;
        var tapIndex = this.dataItems.indexOf(args.object.bindingContext);
        console.log("Item Kay======" + this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======" + this.dataItems.getItem(tapIndex).taskName);
        var createdByNumber = this.dataItems.getItem(tapIndex).createdByNumber;
        var key = this.dataItems.getItem(tapIndex).key;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var taskName = this.dataItems.getItem(tapIndex).taskName;
        var createdByToken = this.dataItems.getItem(tapIndex).createdByToken;
        var deviceRegisteredUserName = application_settings_1.getString("deviceRegisteredUserName");
        firebase.remove('/MyTaskDetails/' + devicePhoneNumber + '/' + this.dataItems.getItem(tapIndex).key).then(function (res) {
            console.log("Task has been upadates successfully in my task details---" + res);
            _this.dataItems = _this.listViewItems.getMyTaskdetails();
        }, function (res) {
            console.log("Problem in updating my task details---" + res);
        });
        //update delete count in other task details page
        var onQueryEvent = function (result) {
            if (!result.error) {
                console.log("Get the current value===" + result.value);
                firebase.update('/OtherTaskDetails/' + createdByNumber + '/' + key, {
                    'deletionCount': (result.value + 1),
                }).then(function (res) {
                    console.log("Deletion count has been upadates successfully in other task details---" + res);
                }, function (res) {
                    console.log("Problem in updating deletion count in other task details---" + res);
                });
            }
        };
        firebase.query(onQueryEvent, '/OtherTaskDetails/' + this.dataItems.getItem(tapIndex).createdByNumber + '/' + this.dataItems.getItem(tapIndex).key + '/deletionCount', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
        //update individual deletion count in other task details
        firebase.update('/OtherTaskDetails/' + this.dataItems.getItem(tapIndex).createdByNumber + '/' + this.dataItems.getItem(tapIndex).key + '/AssigneeDetails/' + devicePhoneNumber, {
            'deletionCount': 1,
        });
        //send push notification
        var data = {
            "notification": {
                "title": "Task Declined!",
                "body": deviceRegisteredUserName + " has declined " + taskName,
                "priority": "high"
            },
            "to": createdByToken
        };
        console.log("data==" + JSON.stringify(data));
        this.myPostService
            .postData(data).subscribe(function (res) {
            console.log("Reminder Success");
        }, function (error) {
            console.log("Reminder Failure===" + error);
        });
    };
    MyTaskComponent.prototype.createTask = function () {
        this.router.navigate(["/createtask"]);
    };
    return MyTaskComponent;
}());
MyTaskComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        providers: [http_post_services_1.MyHttpPostService],
        templateUrl: "pages/mytask/mytask.html",
        styleUrls: ["pages/mytask/mytask-common.css", "pages/mytask/mytask.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, http_post_services_1.MyHttpPostService, page_1.Page])
], MyTaskComponent);
exports.MyTaskComponent = MyTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXl0YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15dGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBeUM7QUFDekMsc0NBQTZEO0FBQzdELDJFQUF5RTtBQUd6RSxnQ0FBK0I7QUFFL0IsdURBQTBEO0FBQzFELDZEQVU4QjtBQUM5Qiw2REFBNEQ7QUFFNUQsb0RBQXVEO0FBQ3ZELHVFQUFxRTtBQVdyRSxJQUFhLGVBQWU7SUFPeEIseUJBQW9CLE1BQWMsRUFBUyxhQUFnQyxFQUFTLElBQVU7UUFBMUUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFKN0YsY0FBUyxHQUFDLElBQUksa0NBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUduQyxXQUFNLEdBQUMsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxhQUFhLEdBQUMsSUFBSSw2QkFBYSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUMsU0FBUyxDQUFDO0lBSTdCLENBQUM7SUFDRCxrQ0FBUSxHQUFSO1FBRUksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDckQsMkJBQTJCO1FBQzNCLDJEQUEyRDtRQUMzRCxzQ0FBc0M7UUFDdEMscUNBQXFDO1FBQ3JDLDRDQUE0QztJQUdoRCxDQUFDO0lBRUQsNENBQWtCLEdBQWxCLFVBQW1CLElBQXVCO1FBSXhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2QyxJQUFJLGdCQUFnQixHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFB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LGFBQWE7YUFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQUc7WUFFMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsRUFBQyxVQUFDLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBRU4sQ0FBQztJQUdELG9DQUFVLEdBQVY7UUFFQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNKLHNCQUFDO0FBQUQsQ0FBQyxBQXZVRCxJQXVVQztBQXZVWSxlQUFlO0lBTjNCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixTQUFTLEVBQUUsQ0FBQyxzQ0FBaUIsQ0FBQztRQUM5QixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLHlCQUF5QixDQUFDO0tBQ3pFLENBQUM7cUNBUThCLGVBQU0sRUFBd0Isc0NBQWlCLEVBQWUsV0FBSTtHQVByRixlQUFlLENBdVUzQjtBQXZVWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3XCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IExheW91dEJhc2UgfSBmcm9tIFwidWkvbGF5b3V0cy9sYXlvdXQtYmFzZVwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IExpc3RWaWV3SXRlbXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9saXN0dmlld2l0ZW1zXCI7XG5pbXBvcnQgeyBSYWRMaXN0Vmlld0NvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vbGlzdHZpZXcvYW5ndWxhclwiO1xuaW1wb3J0ICogYXMgdGltZXJNb2R1bGUgIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3RpbWVyXCI7XG5pbXBvcnQgeyBNeUh0dHBQb3N0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2h0dHAtcG9zdC5zZXJ2aWNlc1wiO1xuXG5pbXBvcnQgeyBTd2lwZUdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidWkvZ2VzdHVyZXNcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHByb3ZpZGVyczogW015SHR0cFBvc3RTZXJ2aWNlXSxcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbXl0YXNrL215dGFzay5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvbXl0YXNrL215dGFzay1jb21tb24uY3NzXCIsIFwicGFnZXMvbXl0YXNrL215dGFzay5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTXlUYXNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0XG57XG5cbiAgICAgZGF0YUl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICBsaXN0Vmlld0l0ZW1zOkxpc3RWaWV3SXRlbXNcbiAgICAgcGFnZVRpdGxlO1xuICAgIGxheW91dD1uZXcgUGFnZSgpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSBteVBvc3RTZXJ2aWNlOiBNeUh0dHBQb3N0U2VydmljZSxwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgdGhpcy5saXN0Vmlld0l0ZW1zPW5ldyBMaXN0Vmlld0l0ZW1zO1xuICAgICAgICB0aGlzLnBhZ2VUaXRsZT1cIk15IFRhc2tcIjtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgXG4gICAgICAgIHRoaXMuZGF0YUl0ZW1zPXRoaXMubGlzdFZpZXdJdGVtcy5nZXRNeVRhc2tkZXRhaWxzKCk7ICBcbiAgICAgICAgLy8gdGhpcy5sYXlvdXQgPSB0aGlzLnBhZ2U7XG4gICAgICAgIC8vIGxldCBncmlkID0gdGhpcy5sYXlvdXQuZ2V0Vmlld0J5SWQoXCJteVRhc2tEZXRhaWxzRG9ja1wiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJHcmlkIGxheW91dD09PVwiK2dyaWQpO1xuICAgICAgICAvLyBsZXQgbGF5b3V0QmFzZSA9IDxMYXlvdXRCYXNlPmdyaWQ7XG4gICAgICAgIC8vIGxheW91dEJhc2UuaXNVc2VySW50ZXJhY3Rpb25FbmFibGVkPXRydWU7XG5cbiAgICBcbiAgICB9XG4gICAgXG4gICAgb25Td2lwZUNlbGxTdGFydGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKVxuICAgIHtcblxuXG4gICAgICBjb25zb2xlLmxvZyhcIkluZGV4IGtleT09PVwiK2FyZ3MuaW5kZXgpO1xuICAgICBcbiAgICAgIGxldCBjb21wbGV0aW9uU3RhdHVzOmJvb2xlYW49dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbShhcmdzLmluZGV4KS5jb21wbGV0ZWQ7XG4gICAgICBjb25zb2xlLmxvZyhcIkNvbXBsZXRlZD09PT09PVwiK2NvbXBsZXRpb25TdGF0dXMpO1xuXG4gICAgdmFyIHN3aXBlTGltaXRzID0gYXJncy5kYXRhLnN3aXBlTGltaXRzO1xuICAgIHZhciBzd2lwZVZpZXcgPSBhcmdzWydvYmplY3QnXSBhcyBSYWRMaXN0VmlldztcblxuICAgXG5cbiAgICB2YXIgbGVmdEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQ8Vmlldz4oJ2RlbGV0ZVZpZXcnKTtcbiAgICB2YXIgcmlnaHRJdGVtID0gc3dpcGVWaWV3LmdldFZpZXdCeUlkPFZpZXc+KCdkb25lVmlldycpO1xuXG4gICAgICBpZihjb21wbGV0aW9uU3RhdHVzKXtcbiAgICAgICAgc3dpcGVMaW1pdHMubGVmdCA9IDA7XG4gICAgICAgIHN3aXBlTGltaXRzLnJpZ2h0ID0gMDtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIHN3aXBlTGltaXRzLmxlZnQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgICAgIHN3aXBlTGltaXRzLnJpZ2h0ID0gcmlnaHRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICAgICAgc3dpcGVMaW1pdHMudGhyZXNob2xkID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpIC8gMjtcbiAgICAgICAgXG4gICAgICB9XG4gICB9XG5cblxuICAgcHVibGljIG9uUHVsbFRvUmVmcmVzaEluaXRpYXRlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSlcbiAgIHtcblxuICAgIHRoaXMuZGF0YUl0ZW1zPXRoaXMubGlzdFZpZXdJdGVtcy5nZXRNeVRhc2tkZXRhaWxzKCk7ICBcbiAgICB0aW1lck1vZHVsZS5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpXG4gICAgIHtcbiAgICAgICAgICAgIHZhciBsaXN0VmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICAgICAgbGlzdFZpZXcubm90aWZ5UHVsbFRvUmVmcmVzaEZpbmlzaGVkKCk7XG4gICAgICAgIH0sMTAwMCk7XG5cbiAgIH1cbiAgIGRvbmVUYXNrKGFyZ3MpXG4gICB7XG4gICAgXG4gICAgXG4gICAgICAvLyB0aGlzLmxheW91dCA9IHRoaXMucGFnZTtcbiAgICAgIC8vIGxldCBncmlkID0gdGhpcy5sYXlvdXQuZ2V0Vmlld0J5SWQoXCJteVRhc2tEZXRhaWxzRG9ja1wiKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiR3JpZCBsYXlvdXQ9PT1cIitncmlkKTtcbiAgICAgIC8vIGxldCBsYXlvdXRCYXNlID0gPExheW91dEJhc2U+Z3JpZDtcbiAgICAgIC8vIGxheW91dEJhc2UuaXNVc2VySW50ZXJhY3Rpb25FbmFibGVkPXRydWU7XG5cbiAgICAgICAgdmFyIHRhcEluZGV4PXRoaXMuZGF0YUl0ZW1zLmluZGV4T2YoYXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQpXG4gICAgICAgIHZhciB4PXRoaXM7XG5cbiAgICAgICAgLy8gdmFyIHN3aXBlVmlldyA9IGFyZ3NbJ29iamVjdCddIGFzIFJhZExpc3RWaWV3O1xuICAgICAgICAvLyB2YXIgbGVmdEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQ8Vmlldz4oJ2dyaWQnKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJMZWZ0IEl0ZW09PVwiK2xlZnRJdGVtKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHZhciBsYXlvdXQgPSB0aGlzLnBhZ2U7XG4gICAgICAgIC8vIHZhciBsZWZ0ID0gbGF5b3V0LmdldFZpZXdCeUlkKHRoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLnRhc2tOYW1lKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJMZWZ0IEl0ZW09PVwiK2xlZnQpO1xuICAgICAgICAvLyAgbGV0IGxheW91dEJhc2UgPSA8TGF5b3V0QmFzZT5ncmlkO1xuICAgICAgICAvLyBsYXlvdXRCYXNlLmlzVXNlckludGVyYWN0aW9uRW5hYmxlZD10cnVlO1xuICAgICAgICAvLyBsZWZ0LmlzVXNlckludGVyYWN0aW9uRW5hYmxlZD10cnVlO1xuICAgICAgICBcbiAgICAgICAgXG5cblxuICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZW0gS2F5PT09PT09XCIrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIE5hbWU9PT09PT1cIit0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS50YXNrTmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRlZCBCeSBOdW1iZXI9PT09PT1cIit0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlOdW1iZXIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0ZWQgQnkgVG9rZW49PT09PT1cIit0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlUb2tlbik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXNzaWduZSBOdW1iZXJzPT09PT09XCIrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkuYXNzaWduZWVOdW1iZXIpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGNyZWF0ZWRCeU51bWJlcj10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlOdW1iZXI7XG4gICAgICAgIHZhciBrZXk9dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5O1xuXG4gICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgdmFyIGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZT1nZXRTdHJpbmcoXCJkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcIik7XG4gICAgICAgIHZhciB0YXNrTmFtZT10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS50YXNrTmFtZTtcbiAgICAgICAgdmFyIGNyZWF0ZWRCeVRva2VuPXRoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmNyZWF0ZWRCeVRva2VuO1xuXG5cbiAgICAgICAgLy91cGRhdGUgY29tcGxldGlvbiBzdGF0dXMgaW4gbXl0YXNrIGRldGFpbHNcbiAgICAgICAgLy9sZXQgbnVtYmVyU3RyaW5nPXRoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmFzc2lnbmVlTnVtYmVyO1xuICAgICAgICBsZXQgYXNzaWduZWVOdW1iZXJzOnN0cmluZ1tdPXRoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmFzc2lnbmVlTnVtYmVyO1xuICAgICAgICBcblxuICAgICAgICAvLyBmaXJlYmFzZS51cGRhdGUoXG4gICAgICAgIC8vICAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmtleSxcbiAgICAgICAgLy8gICAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgICAgICdteUNvbXBsZXRpb25TdGF0dXMnOnRydWUsXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICkudGhlbihcbiAgICAgICAgLy8gICAgICAgICAgIChyZXMpPT57XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiB1cGFkYXRlcyBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgLy8gICAgICAgICAgICAvLyB0aGlzLmRhdGFJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0TXlUYXNrZGV0YWlscygpOyAgIFxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiB1cGRhdGluZyBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAvLyAgICAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgICAgIC8vZ2V0IHRoZSB1cGRhdGlvbiBjb3VudCBhbmQgdXBkYXRlIGNvbXBsZXRpb24gc3RhdHVzIGluIG90aGVyIHRhc2sgZGV0YWlsc1xuICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAge1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IHRoZSBjdXJyZW50IHZhbHVlPT09XCIrcmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKFxuICAgICAgICAgICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJytjcmVhdGVkQnlOdW1iZXIrJy8nK2tleSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOihyZXN1bHQudmFsdWUrMSksXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcGxldGlvbiBjb3VudCBoYXMgYmVlbiB1cGFkYXRlcyBzdWNjZXNzZnVsbHkgaW4gb3RoZXIgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAnL015VGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnLycreC5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcGxldGlvbiBzdGF0dXMgaGFzIGJlZW4gdXBhZGF0ZXMgc3VjY2Vzc2Z1bGx5IGluIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgICAvLyB4LmRhdGFJdGVtcz14Lmxpc3RWaWV3SXRlbXMuZ2V0TXlUYXNrZGV0YWlscygpOyBcbiAgICAgICAgICAgICAgICAgICAgICB4LnVwZGF0ZUNvbXBsZXRpb25Db3VudEluTXlUYXNrRGV0YWlsc0ZvckFsbEFzc2lnbmVlcyhyZXN1bHQudmFsdWUsYXNzaWduZWVOdW1iZXJzLGtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiB1cGRhdGluZyBjb21wbGV0aW9uIHN0YXR1cyBpbiBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHVwZGF0aW5nIGNvbXBsZXRpb24gY291bnQgaW4gb3RoZXIgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJyt0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlOdW1iZXIrJy8nK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmtleSsnL2NvbXBsZXRpb25Db3VudCcsXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgfVxuICAgICAgKTsgXG4gICAgICAgIFxuICAgICAgLy91cGRhdGUgaW5kaXZpZHVhbCBjb21wbGV0aW9uIHN0YXRzIGluIG90aGVyIHRhc2sgZGV0YWlsc1xuICAgICAgICAgICAgICBmaXJlYmFzZS51cGRhdGUoXG4gICAgICAgICAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkuY3JlYXRlZEJ5TnVtYmVyKycvJyt0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5rZXkrJy9Bc3NpZ25lZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uU3RhdHVzJzp0cnVlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAvL3NlbmQgcHVzaCBub3RpZmljYXRpb25cbiAgICAgICAgbGV0IGRhdGE9e1xuICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlRhc2sgQ29tcGxldGVkIVwiLFxuICAgICAgICAgICAgICBcImJvZHlcIjogZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lK1wiIGhhcyBjb21wbGV0ZWQgXCIrdGFza05hbWUsXG4gICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0b1wiOmNyZWF0ZWRCeVRva2VuXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGE9PVwiK0pTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgIHRoaXMubXlQb3N0U2VydmljZVxuICAgICAgLnBvc3REYXRhKGRhdGEpLnN1YnNjcmliZSgocmVzKT0+e1xuXG4gICAgICAgICAgY29uc29sZS5sb2coXCJSZW1pbmRlciBTdWNjZXNzXCIpO1xuICAgICAgfSwoZXJyb3IpPT57XG4gICAgICAgICAgY29uc29sZS5sb2coXCJSZW1pbmRlciBGYWlsdXJlPT09XCIrZXJyb3IpO1xuICAgICAgfSk7XG4gICB9XG4gICB1cGRhdGVDb21wbGV0aW9uQ291bnRJbk15VGFza0RldGFpbHNGb3JBbGxBc3NpZ25lZXMoY291bnQsYXNzaWduZWVOdW1iZXJzLGtleSlcbiAgIHtcbiAgICAgbGV0IHg9dGhpcztcbiAgICBmb3IobGV0IGk9MDtpPGFzc2lnbmVlTnVtYmVycy5sZW5ndGg7aSsrKVxuICAgICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk51bWJlcnM9PT1pPT09XCIrYXNzaWduZWVOdW1iZXJzW2ldKTtcblxuICAgICAgICBmaXJlYmFzZS51cGRhdGUoXG4gICAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycrYXNzaWduZWVOdW1iZXJzW2ldKycvJytrZXksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOihjb3VudCsxKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbXBsZXRpb24gY291bnQgaGFzIGJlZW4gdXBhZGF0ZXMgc3VjY2Vzc2Z1bGx5IGluIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgIC8veC5kYXRhSXRlbXM9eC5saXN0Vmlld0l0ZW1zLmdldE15VGFza2RldGFpbHMoKTtcblxuICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHVwZGF0aW5nIGNvbXBsZXRpb24gY291bnQgaW4gbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgeC5kYXRhSXRlbXM9eC5saXN0Vmlld0l0ZW1zLmdldE15VGFza2RldGFpbHMoKTtcbiAgICAgIFxuICAgfVxuICAgZGVsZXRlVGFzayhhcmdzKVxuICAge1xuICAgIFxuICAgICAgICB2YXIgdGFwSW5kZXg9dGhpcy5kYXRhSXRlbXMuaW5kZXhPZihhcmdzLm9iamVjdC5iaW5kaW5nQ29udGV4dClcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZW0gS2F5PT09PT09XCIrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIE5hbWU9PT09PT1cIit0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS50YXNrTmFtZSk7XG4gICAgICAgIHZhciBjcmVhdGVkQnlOdW1iZXI9dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkuY3JlYXRlZEJ5TnVtYmVyO1xuICAgICAgICB2YXIga2V5PXRoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmtleTtcbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICB2YXIgdGFza05hbWU9dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkudGFza05hbWU7XG4gICAgICAgIHZhciBjcmVhdGVkQnlUb2tlbj10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlUb2tlbjtcbiAgICAgICAgdmFyIGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZT1nZXRTdHJpbmcoXCJkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcIik7XG5cbiAgICAgICAgZmlyZWJhc2UucmVtb3ZlKFxuICAgICAgICAgICAgICAgICcvTXlUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJyt0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5rZXksXG4gICAgICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHVwYWRhdGVzIHN1Y2Nlc3NmdWxseSBpbiBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0TXlUYXNrZGV0YWlscygpOyAgIFxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiB1cGRhdGluZyBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIC8vdXBkYXRlIGRlbGV0ZSBjb3VudCBpbiBvdGhlciB0YXNrIGRldGFpbHMgcGFnZVxuICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAge1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IHRoZSBjdXJyZW50IHZhbHVlPT09XCIrcmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKFxuICAgICAgICAgICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJytjcmVhdGVkQnlOdW1iZXIrJy8nK2tleSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICdkZWxldGlvbkNvdW50JzoocmVzdWx0LnZhbHVlKzEpLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlbGV0aW9uIGNvdW50IGhhcyBiZWVuIHVwYWRhdGVzIHN1Y2Nlc3NmdWxseSBpbiBvdGhlciB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gdXBkYXRpbmcgZGVsZXRpb24gY291bnQgaW4gb3RoZXIgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJyt0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlOdW1iZXIrJy8nK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmtleSsnL2RlbGV0aW9uQ291bnQnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICAvL3VwZGF0ZSBpbmRpdmlkdWFsIGRlbGV0aW9uIGNvdW50IGluIG90aGVyIHRhc2sgZGV0YWlsc1xuICAgICAgICAgICAgICBmaXJlYmFzZS51cGRhdGUoXG4gICAgICAgICAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkuY3JlYXRlZEJ5TnVtYmVyKycvJyt0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5rZXkrJy9Bc3NpZ25lZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICdkZWxldGlvbkNvdW50JzoxLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAvL3NlbmQgcHVzaCBub3RpZmljYXRpb25cbiAgICAgICAgbGV0IGRhdGE9e1xuICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlRhc2sgRGVjbGluZWQhXCIsXG4gICAgICAgICAgICAgIFwiYm9keVwiOiBkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUrXCIgaGFzIGRlY2xpbmVkIFwiK3Rhc2tOYW1lLFxuICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidG9cIjpjcmVhdGVkQnlUb2tlblxuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhPT1cIitKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICB0aGlzLm15UG9zdFNlcnZpY2VcbiAgICAgIC5wb3N0RGF0YShkYXRhKS5zdWJzY3JpYmUoKHJlcyk9PntcblxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVtaW5kZXIgU3VjY2Vzc1wiKTtcbiAgICAgIH0sKGVycm9yKT0+e1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVtaW5kZXIgRmFpbHVyZT09PVwiK2Vycm9yKTtcbiAgICAgIH0pO1xuXG4gICB9XG4gICAgXG5cbiAgIGNyZWF0ZVRhc2soKXtcblxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9jcmVhdGV0YXNrXCJdKTtcbiAgIH1cbn0iXX0=