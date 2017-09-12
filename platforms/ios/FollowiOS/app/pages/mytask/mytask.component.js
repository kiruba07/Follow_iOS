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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXl0YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15dGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBeUM7QUFDekMsc0NBQTZEO0FBQzdELDJFQUF5RTtBQUd6RSxnQ0FBK0I7QUFFL0IsdURBQTBEO0FBQzFELDZEQVU4QjtBQUM5Qiw2REFBNEQ7QUFFNUQsb0RBQXVEO0FBQ3ZELHVFQUFxRTtBQVdyRSxJQUFhLGVBQWU7SUFPeEIseUJBQW9CLE1BQWMsRUFBUyxhQUFnQyxFQUFTLElBQVU7UUFBMUUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFKN0YsY0FBUyxHQUFDLElBQUksa0NBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUduQyxXQUFNLEdBQUMsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUVoQixJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksNkJBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFDLFNBQVMsQ0FBQztJQUk3QixDQUFDO0lBQ0Qsa0NBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3JELDJCQUEyQjtRQUMzQiwyREFBMkQ7UUFDM0Qsc0NBQXNDO1FBQ3RDLHFDQUFxQztRQUNyQyw0Q0FBNEM7SUFHaEQsQ0FBQztJQUVELDRDQUFrQixHQUFsQixVQUFtQixJQUF1QjtRQUl4QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkMsSUFBSSxnQkFBZ0IsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJB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QyxhQUFhO2FBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHO1lBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNwQyxDQUFDLEVBQUMsVUFBQyxLQUFLO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUVOLENBQUM7SUFHRCxvQ0FBVSxHQUFWO1FBRUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDSixzQkFBQztBQUFELENBQUMsQUF2VUQsSUF1VUM7QUF2VVksZUFBZTtJQU4zQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsU0FBUyxFQUFFLENBQUMsc0NBQWlCLENBQUM7UUFDOUIsV0FBVyxFQUFFLDBCQUEwQjtRQUN2QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSx5QkFBeUIsQ0FBQztLQUN6RSxDQUFDO3FDQVE4QixlQUFNLEVBQXdCLHNDQUFpQixFQUFlLFdBQUk7R0FQckYsZUFBZSxDQXVVM0I7QUF2VVksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlld1wiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBMYXlvdXRCYXNlIH0gZnJvbSBcInVpL2xheW91dHMvbGF5b3V0LWJhc2VcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0l0ZW1zIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvbGlzdHZpZXdpdGVtc1wiO1xuaW1wb3J0IHsgUmFkTGlzdFZpZXdDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3L2FuZ3VsYXJcIjtcbmltcG9ydCAqIGFzIHRpbWVyTW9kdWxlICBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy90aW1lclwiO1xuaW1wb3J0IHsgTXlIdHRwUG9zdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9odHRwLXBvc3Quc2VydmljZXNcIjtcblxuaW1wb3J0IHsgU3dpcGVHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInVpL2dlc3R1cmVzXCI7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICBwcm92aWRlcnM6IFtNeUh0dHBQb3N0U2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL215dGFzay9teXRhc2suaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL215dGFzay9teXRhc2stY29tbW9uLmNzc1wiLCBcInBhZ2VzL215dGFzay9teXRhc2suY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIE15VGFza0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxue1xuXG4gICAgIGRhdGFJdGVtcz1uZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICAgbGlzdFZpZXdJdGVtczpMaXN0Vmlld0l0ZW1zXG4gICAgIHBhZ2VUaXRsZTtcbiAgICBsYXlvdXQ9bmV3IFBhZ2UoKTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLHByaXZhdGUgbXlQb3N0U2VydmljZTogTXlIdHRwUG9zdFNlcnZpY2UscHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICB0aGlzLmxpc3RWaWV3SXRlbXM9bmV3IExpc3RWaWV3SXRlbXM7XG4gICAgICAgIHRoaXMucGFnZVRpdGxlPVwiTXkgVGFza1wiO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICBcbiAgICAgICAgdGhpcy5kYXRhSXRlbXM9dGhpcy5saXN0Vmlld0l0ZW1zLmdldE15VGFza2RldGFpbHMoKTsgIFxuICAgICAgICAvLyB0aGlzLmxheW91dCA9IHRoaXMucGFnZTtcbiAgICAgICAgLy8gbGV0IGdyaWQgPSB0aGlzLmxheW91dC5nZXRWaWV3QnlJZChcIm15VGFza0RldGFpbHNEb2NrXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkdyaWQgbGF5b3V0PT09XCIrZ3JpZCk7XG4gICAgICAgIC8vIGxldCBsYXlvdXRCYXNlID0gPExheW91dEJhc2U+Z3JpZDtcbiAgICAgICAgLy8gbGF5b3V0QmFzZS5pc1VzZXJJbnRlcmFjdGlvbkVuYWJsZWQ9dHJ1ZTtcblxuICAgIFxuICAgIH1cbiAgICBcbiAgICBvblN3aXBlQ2VsbFN0YXJ0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpXG4gICAge1xuXG5cbiAgICAgIGNvbnNvbGUubG9nKFwiSW5kZXgga2V5PT09XCIrYXJncy5pbmRleCk7XG4gICAgIFxuICAgICAgbGV0IGNvbXBsZXRpb25TdGF0dXM6Ym9vbGVhbj10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKGFyZ3MuaW5kZXgpLmNvbXBsZXRlZDtcbiAgICAgIGNvbnNvbGUubG9nKFwiQ29tcGxldGVkPT09PT09XCIrY29tcGxldGlvblN0YXR1cyk7XG5cbiAgICB2YXIgc3dpcGVMaW1pdHMgPSBhcmdzLmRhdGEuc3dpcGVMaW1pdHM7XG4gICAgdmFyIHN3aXBlVmlldyA9IGFyZ3NbJ29iamVjdCddIGFzIFJhZExpc3RWaWV3O1xuXG4gICBcblxuICAgIHZhciBsZWZ0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZDxWaWV3PignZGVsZXRlVmlldycpO1xuICAgIHZhciByaWdodEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQ8Vmlldz4oJ2RvbmVWaWV3Jyk7XG5cbiAgICAgIGlmKGNvbXBsZXRpb25TdGF0dXMpe1xuICAgICAgICBzd2lwZUxpbWl0cy5sZWZ0ID0gMDtcbiAgICAgICAgc3dpcGVMaW1pdHMucmlnaHQgPSAwO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgc3dpcGVMaW1pdHMubGVmdCA9IGxlZnRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICAgICAgc3dpcGVMaW1pdHMucmlnaHQgPSByaWdodEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgICAgICBzd2lwZUxpbWl0cy50aHJlc2hvbGQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCkgLyAyO1xuICAgICAgICBcbiAgICAgIH1cbiAgIH1cblxuXG4gICBwdWJsaWMgb25QdWxsVG9SZWZyZXNoSW5pdGlhdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKVxuICAge1xuXG4gICAgdGhpcy5kYXRhSXRlbXM9dGhpcy5saXN0Vmlld0l0ZW1zLmdldE15VGFza2RldGFpbHMoKTsgIFxuICAgIHRpbWVyTW9kdWxlLnNldFRpbWVvdXQoZnVuY3Rpb24gKClcbiAgICAge1xuICAgICAgICAgICAgdmFyIGxpc3RWaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgICAgICAgICBsaXN0Vmlldy5ub3RpZnlQdWxsVG9SZWZyZXNoRmluaXNoZWQoKTtcbiAgICAgICAgfSwxMDAwKTtcblxuICAgfVxuICAgZG9uZVRhc2soYXJncylcbiAgIHtcbiAgICBcbiAgICBcbiAgICAgIC8vIHRoaXMubGF5b3V0ID0gdGhpcy5wYWdlO1xuICAgICAgLy8gbGV0IGdyaWQgPSB0aGlzLmxheW91dC5nZXRWaWV3QnlJZChcIm15VGFza0RldGFpbHNEb2NrXCIpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJHcmlkIGxheW91dD09PVwiK2dyaWQpO1xuICAgICAgLy8gbGV0IGxheW91dEJhc2UgPSA8TGF5b3V0QmFzZT5ncmlkO1xuICAgICAgLy8gbGF5b3V0QmFzZS5pc1VzZXJJbnRlcmFjdGlvbkVuYWJsZWQ9dHJ1ZTtcblxuICAgICAgICB2YXIgdGFwSW5kZXg9dGhpcy5kYXRhSXRlbXMuaW5kZXhPZihhcmdzLm9iamVjdC5iaW5kaW5nQ29udGV4dClcbiAgICAgICAgdmFyIHg9dGhpcztcblxuICAgICAgICAvLyB2YXIgc3dpcGVWaWV3ID0gYXJnc1snb2JqZWN0J10gYXMgUmFkTGlzdFZpZXc7XG4gICAgICAgIC8vIHZhciBsZWZ0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZDxWaWV3PignZ3JpZCcpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkxlZnQgSXRlbT09XCIrbGVmdEl0ZW0pO1xuICAgICAgICBcbiAgICAgICAgLy8gdmFyIGxheW91dCA9IHRoaXMucGFnZTtcbiAgICAgICAgLy8gdmFyIGxlZnQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQodGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkudGFza05hbWUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkxlZnQgSXRlbT09XCIrbGVmdCk7XG4gICAgICAgIC8vICBsZXQgbGF5b3V0QmFzZSA9IDxMYXlvdXRCYXNlPmdyaWQ7XG4gICAgICAgIC8vIGxheW91dEJhc2UuaXNVc2VySW50ZXJhY3Rpb25FbmFibGVkPXRydWU7XG4gICAgICAgIC8vIGxlZnQuaXNVc2VySW50ZXJhY3Rpb25FbmFibGVkPXRydWU7XG4gICAgICAgIFxuICAgICAgICBcblxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSXRlbSBLYXk9PT09PT1cIit0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5rZXkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgTmFtZT09PT09PVwiK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLnRhc2tOYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJDcmVhdGVkIEJ5IE51bWJlcj09PT09PVwiK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmNyZWF0ZWRCeU51bWJlcik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRlZCBCeSBUb2tlbj09PT09PVwiK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmNyZWF0ZWRCeVRva2VuKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJBc3NpZ25lIE51bWJlcnM9PT09PT1cIit0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5hc3NpZ25lZU51bWJlcik7XG4gICAgICAgIFxuICAgICAgICB2YXIgY3JlYXRlZEJ5TnVtYmVyPXRoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmNyZWF0ZWRCeU51bWJlcjtcbiAgICAgICAgdmFyIGtleT10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5rZXk7XG5cbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICB2YXIgZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lPWdldFN0cmluZyhcImRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZVwiKTtcbiAgICAgICAgdmFyIHRhc2tOYW1lPXRoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLnRhc2tOYW1lO1xuICAgICAgICB2YXIgY3JlYXRlZEJ5VG9rZW49dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkuY3JlYXRlZEJ5VG9rZW47XG5cblxuICAgICAgICAvL3VwZGF0ZSBjb21wbGV0aW9uIHN0YXR1cyBpbiBteXRhc2sgZGV0YWlsc1xuICAgICAgICAvL2xldCBudW1iZXJTdHJpbmc9dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkuYXNzaWduZWVOdW1iZXI7XG4gICAgICAgIGxldCBhc3NpZ25lZU51bWJlcnM6c3RyaW5nW109dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkuYXNzaWduZWVOdW1iZXI7XG4gICAgICAgIFxuXG4gICAgICAgIC8vIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgLy8gICAgICAgICAnL015VGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnLycrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5LFxuICAgICAgICAvLyAgICAgICAgIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6dHJ1ZSxcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgKS50aGVuKFxuICAgICAgICAvLyAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHVwYWRhdGVzIHN1Y2Nlc3NmdWxseSBpbiBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAvLyAgICAgICAgICAgIC8vIHRoaXMuZGF0YUl0ZW1zPXRoaXMubGlzdFZpZXdJdGVtcy5nZXRNeVRhc2tkZXRhaWxzKCk7ICAgXG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHVwZGF0aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgIC8vICAgICAgICAgICB9KTtcbiAgICAgICAgXG5cbiAgICAgICAgLy9nZXQgdGhlIHVwZGF0aW9uIGNvdW50IGFuZCB1cGRhdGUgY29tcGxldGlvbiBzdGF0dXMgaW4gb3RoZXIgdGFzayBkZXRhaWxzXG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgdGhlIGN1cnJlbnQgdmFsdWU9PT1cIityZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICBmaXJlYmFzZS51cGRhdGUoXG4gICAgICAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2NyZWF0ZWRCeU51bWJlcisnLycra2V5LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6KHJlc3VsdC52YWx1ZSsxKSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb21wbGV0aW9uIGNvdW50IGhhcyBiZWVuIHVwYWRhdGVzIHN1Y2Nlc3NmdWxseSBpbiBvdGhlciB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICcvTXlUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJyt4LmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5rZXksXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb21wbGV0aW9uIHN0YXR1cyBoYXMgYmVlbiB1cGFkYXRlcyBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgIC8vIHguZGF0YUl0ZW1zPXgubGlzdFZpZXdJdGVtcy5nZXRNeVRhc2tkZXRhaWxzKCk7IFxuICAgICAgICAgICAgICAgICAgICAgIHgudXBkYXRlQ29tcGxldGlvbkNvdW50SW5NeVRhc2tEZXRhaWxzRm9yQWxsQXNzaWduZWVzKHJlc3VsdC52YWx1ZSxhc3NpZ25lZU51bWJlcnMsa2V5KTtcblxuICAgICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHVwZGF0aW5nIGNvbXBsZXRpb24gc3RhdHVzIGluIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gdXBkYXRpbmcgY29tcGxldGlvbiBjb3VudCBpbiBvdGhlciB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmNyZWF0ZWRCeU51bWJlcisnLycrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5KycvY29tcGxldGlvbkNvdW50JyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcbiAgICAgICAgICB9XG4gICAgICApOyBcbiAgICAgICAgXG4gICAgICAvL3VwZGF0ZSBpbmRpdmlkdWFsIGNvbXBsZXRpb24gc3RhdHMgaW4gb3RoZXIgdGFzayBkZXRhaWxzXG4gICAgICAgICAgICAgIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJyt0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlOdW1iZXIrJy8nK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmtleSsnL0Fzc2lnbmVlRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25TdGF0dXMnOnRydWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgIC8vc2VuZCBwdXNoIG5vdGlmaWNhdGlvblxuICAgICAgICBsZXQgZGF0YT17XG4gICAgICAgICAgXCJub3RpZmljYXRpb25cIjoge1xuICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiVGFzayBDb21wbGV0ZWQhXCIsXG4gICAgICAgICAgICAgIFwiYm9keVwiOiBkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUrXCIgaGFzIGNvbXBsZXRlZCBcIit0YXNrTmFtZSxcbiAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRvXCI6Y3JlYXRlZEJ5VG9rZW5cbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YT09XCIrSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgdGhpcy5teVBvc3RTZXJ2aWNlXG4gICAgICAucG9zdERhdGEoZGF0YSkuc3Vic2NyaWJlKChyZXMpPT57XG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbWluZGVyIFN1Y2Nlc3NcIik7XG4gICAgICB9LChlcnJvcik9PntcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbWluZGVyIEZhaWx1cmU9PT1cIitlcnJvcik7XG4gICAgICB9KTtcbiAgIH1cbiAgIHVwZGF0ZUNvbXBsZXRpb25Db3VudEluTXlUYXNrRGV0YWlsc0ZvckFsbEFzc2lnbmVlcyhjb3VudCxhc3NpZ25lZU51bWJlcnMsa2V5KVxuICAge1xuICAgICBsZXQgeD10aGlzO1xuICAgIGZvcihsZXQgaT0wO2k8YXNzaWduZWVOdW1iZXJzLmxlbmd0aDtpKyspXG4gICAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTnVtYmVycz09PWk9PT1cIithc3NpZ25lZU51bWJlcnNbaV0pO1xuXG4gICAgICAgIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgICAnL015VGFza0RldGFpbHMvJythc3NpZ25lZU51bWJlcnNbaV0rJy8nK2tleSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6KGNvdW50KzEpLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcGxldGlvbiBjb3VudCBoYXMgYmVlbiB1cGFkYXRlcyBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgLy94LmRhdGFJdGVtcz14Lmxpc3RWaWV3SXRlbXMuZ2V0TXlUYXNrZGV0YWlscygpO1xuXG4gICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gdXBkYXRpbmcgY29tcGxldGlvbiBjb3VudCBpbiBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB4LmRhdGFJdGVtcz14Lmxpc3RWaWV3SXRlbXMuZ2V0TXlUYXNrZGV0YWlscygpO1xuICAgICAgXG4gICB9XG4gICBkZWxldGVUYXNrKGFyZ3MpXG4gICB7XG4gICAgXG4gICAgICAgIHZhciB0YXBJbmRleD10aGlzLmRhdGFJdGVtcy5pbmRleE9mKGFyZ3Mub2JqZWN0LmJpbmRpbmdDb250ZXh0KVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSXRlbSBLYXk9PT09PT1cIit0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5rZXkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgTmFtZT09PT09PVwiK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLnRhc2tOYW1lKTtcbiAgICAgICAgdmFyIGNyZWF0ZWRCeU51bWJlcj10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlOdW1iZXI7XG4gICAgICAgIHZhciBrZXk9dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5O1xuICAgICAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgICAgIHZhciB0YXNrTmFtZT10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS50YXNrTmFtZTtcbiAgICAgICAgdmFyIGNyZWF0ZWRCeVRva2VuPXRoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmNyZWF0ZWRCeVRva2VuO1xuICAgICAgICB2YXIgZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lPWdldFN0cmluZyhcImRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZVwiKTtcblxuICAgICAgICBmaXJlYmFzZS5yZW1vdmUoXG4gICAgICAgICAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmtleSxcbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gdXBhZGF0ZXMgc3VjY2Vzc2Z1bGx5IGluIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YUl0ZW1zPXRoaXMubGlzdFZpZXdJdGVtcy5nZXRNeVRhc2tkZXRhaWxzKCk7ICAgXG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHVwZGF0aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgLy91cGRhdGUgZGVsZXRlIGNvdW50IGluIG90aGVyIHRhc2sgZGV0YWlscyBwYWdlXG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgdGhlIGN1cnJlbnQgdmFsdWU9PT1cIityZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICBmaXJlYmFzZS51cGRhdGUoXG4gICAgICAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2NyZWF0ZWRCeU51bWJlcisnLycra2V5LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ2RlbGV0aW9uQ291bnQnOihyZXN1bHQudmFsdWUrMSksXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRpb24gY291bnQgaGFzIGJlZW4gdXBhZGF0ZXMgc3VjY2Vzc2Z1bGx5IGluIG90aGVyIHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiB1cGRhdGluZyBkZWxldGlvbiBjb3VudCBpbiBvdGhlciB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmNyZWF0ZWRCeU51bWJlcisnLycrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5KycvZGVsZXRpb25Db3VudCcsXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIC8vdXBkYXRlIGluZGl2aWR1YWwgZGVsZXRpb24gY291bnQgaW4gb3RoZXIgdGFzayBkZXRhaWxzXG4gICAgICAgICAgICAgIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJyt0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlOdW1iZXIrJy8nK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmtleSsnL0Fzc2lnbmVlRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ2RlbGV0aW9uQ291bnQnOjEsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIC8vc2VuZCBwdXNoIG5vdGlmaWNhdGlvblxuICAgICAgICBsZXQgZGF0YT17XG4gICAgICAgICAgXCJub3RpZmljYXRpb25cIjoge1xuICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiVGFzayBEZWNsaW5lZCFcIixcbiAgICAgICAgICAgICAgXCJib2R5XCI6IGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZStcIiBoYXMgZGVjbGluZWQgXCIrdGFza05hbWUsXG4gICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ0b1wiOmNyZWF0ZWRCeVRva2VuXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGE9PVwiK0pTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgIHRoaXMubXlQb3N0U2VydmljZVxuICAgICAgLnBvc3REYXRhKGRhdGEpLnN1YnNjcmliZSgocmVzKT0+e1xuXG4gICAgICAgICAgY29uc29sZS5sb2coXCJSZW1pbmRlciBTdWNjZXNzXCIpO1xuICAgICAgfSwoZXJyb3IpPT57XG4gICAgICAgICAgY29uc29sZS5sb2coXCJSZW1pbmRlciBGYWlsdXJlPT09XCIrZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgIH1cbiAgICBcblxuICAgY3JlYXRlVGFzaygpe1xuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2NyZWF0ZXRhc2tcIl0pO1xuICAgfVxufSJdfQ==