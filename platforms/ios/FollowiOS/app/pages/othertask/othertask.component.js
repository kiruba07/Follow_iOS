"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var listviewitems_1 = require("../../service/listviewitems");
var timerModule = require("tns-core-modules/timer");
var firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("application-settings");
var page_1 = require("ui/page");
var http_post_services_1 = require("../../service/http-post.services");
var OtherTaskComponent = (function () {
    function OtherTaskComponent(router, page, myPostService) {
        var _this = this;
        this.router = router;
        this.page = page;
        this.myPostService = myPostService;
        this.dataItems = new observable_array_1.ObservableArray([]);
        this.detailedDataItems = new observable_array_1.ObservableArray([]);
        this.listViewItems = new listviewitems_1.ListViewItems;
        this.showDetailedView = "collapse";
        this.pageTitle = "Other Task";
        firebase.getCurrentPushToken().then(function (token) {
            // may be null if not known yet
            // alert("Current push token: " + token);
            _this.deviceFCMId = token;
        });
    }
    OtherTaskComponent.prototype.ngOnInit = function () {
        this.dataItems = this.listViewItems.getOtherTaskDetails();
    };
    OtherTaskComponent.prototype.onSwipeCellStarted = function (args) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];
        var leftItem = swipeView.getViewById('emptyView');
        var rightItem = swipeView.getViewById('deleteView');
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    };
    OtherTaskComponent.prototype.onPullToRefreshInitiated = function (args) {
        this.dataItems = this.listViewItems.getOtherTaskDetails();
        timerModule.setTimeout(function () {
            var listView = args.object;
            listView.notifyPullToRefreshFinished();
        }, 1000);
    };
    OtherTaskComponent.prototype.deleteTask = function (args) {
        var tapIndex = this.dataItems.indexOf(args.object.bindingContext);
        console.log("Item Kay======" + this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======" + this.dataItems.getItem(tapIndex).taskName);
        var createdByNumber = this.dataItems.getItem(tapIndex).createdByNumber;
        //var key=this.dataItems.getItem(tapIndex).key;
        var itemKey = this.dataItems.getItem(tapIndex).key;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var x = this;
        var onQueryEvent = function (result) {
            console.log("Delete My task");
            if (!result.error) {
                console.log("IF");
                var resultJson = result.value;
                console.log("Result==" + resultJson);
                for (var key1 in resultJson) {
                    console.log("Assignee Number" + key1);
                    if (key1 == null || key1 == "null") { }
                    else {
                        //delete the task in my task details
                        firebase.remove('/MyTaskDetails/' + key1 + '/' + itemKey);
                    }
                }
                x.deleteOtherTask(devicePhoneNumber, tapIndex, itemKey);
            }
        };
        firebase.query(onQueryEvent, '/OtherTaskDetails/' + devicePhoneNumber + '/' + itemKey + '/AssigneeDetails', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
        timerModule.setTimeout(function () {
            x.dataItems = x.listViewItems.getOtherTaskDetails();
        }, 1000);
    };
    OtherTaskComponent.prototype.deleteOtherTask = function (devicePhoneNumber, tapIndex, itemKey) {
        //delete task in other task details page
        firebase.remove('/OtherTaskDetails/' + devicePhoneNumber + '/' + itemKey).then(function (res) {
            console.log("Task has been deleted successfully in other task details---");
        }, function (res) {
            console.log("Problem in deleting other task details---" + res);
        });
    };
    OtherTaskComponent.prototype.cancel = function () {
        this.showDetailedView = "collapse";
        // console.log("this.deviceFCMId--"+this.deviceFCMId);
        // let data={
        //     "notification": {
        //          "title": "Test Notification",
        //          "body": "5 to 1",
        //          "priority": "high"
        //        },
        //        "to":this.deviceFCMId
        //      };
        //      console.log("data=="+JSON.stringify(data));
        // this.myPostService
        // .postData(data).subscribe((res)=>{
        //     console.log("Success");
        // },(error)=>{
        //     console.log("failure==="+error);
        // });
    };
    OtherTaskComponent.prototype.getRemainderCountAndUpdate = function (number, cStatus, rCount) {
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        firebase.update('/MyTaskDetails/' + number + '/' + this.tappedItemKey, {
            'remainderCount': rCount + 1,
        });
        firebase.update('/OtherTaskDetails/' + devicePhoneNumber + '/' + this.tappedItemKey + '/AssigneeDetails/' + number, {
            'remainderCount': rCount + 1,
        });
    };
    OtherTaskComponent.prototype.sendReminder = function () {
        console.log("tappedItemKey===" + this.tappedItemKey);
        var tappedItemKey = this.tappedItemKey;
        var reminderSendDetails = new observable_array_1.ObservableArray([]);
        var x = this;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        console.log("Length===" + this.detailedDataItems.length);
        for (var i = 0; i < this.detailedDataItems.length; i++) {
            var number = this.detailedDataItems.getItem(i).assigneeNumber;
            var cStatus = this.detailedDataItems.getItem(i).completionStatus;
            var rCount = this.detailedDataItems.getItem(i).remainderCount;
            console.log("Number====" + number);
            console.log("cStatus====" + cStatus);
            console.log("rCount====" + rCount);
            if (!cStatus)
                this.getRemainderCountAndUpdate(number, cStatus, rCount);
        }
        // var tapIndex=this.dataItems.indexOf(tappedItemKey);
        // console.log("Index==="+tapIndex);
        // let overAllRemainderCount=this.dataItems.getItem(tapIndex).remainderCount;
        // console.log("overAllRemainderCount====="+overAllRemainderCount);
        // firebase.update(
        // '/OtherTaskDetails/'+devicePhoneNumber+'/'+tappedItemKey,
        // {
        //     'remainderCount':overAllRemainderCount+1,
        // });
        var onQueryEvent = function (result) {
            if (!result.error) {
                firebase.update('/OtherTaskDetails/' + devicePhoneNumber + '/' + tappedItemKey, {
                    'remainderCount': result.value + 1,
                }).then(function (res) {
                }, function (res) { });
            }
        };
        firebase.query(onQueryEvent, '/OtherTaskDetails/' + devicePhoneNumber + '/' + tappedItemKey + '/remainderCount', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
        timerModule.setTimeout(function () {
            x.dataItems = x.listViewItems.getOtherTaskDetails();
            x.showDetailedView = "collapse";
        }, 500);
    };
    OtherTaskComponent.prototype.itemTap = function (item) {
        console.log("ITem Key==" + item.key);
        this.tappedItemKey = item.key;
        console.log("tappedItemKey===" + this.tappedItemKey);
        this.detailedDataItems = this.listViewItems.getOtherTaskDetailsDetailedDetails(item.key);
        this.showDetailedView = "visible";
        // var layout = this.page;
        // var idName="taskDetailedView"+item.key;
        // var detailedViewLayout = layout.getViewById(idName);
        // console.log("ID==="+detailedViewLayout);
        // console.log(" class=="+detailedViewLayout.className.split(" ")[1]);
        //  layout.className="taskDetailedView";
        //var classLayout=layout.className="taskDetailedView";
        // console.log("Calss Layout=="+classLayout);
        // layout.set("class","taskDetailedView hide");
        // if(detailedViewLayout.className.split(" ")[1]=='show')
        // {
        //     // console.log("IF==");
        //     detailedViewLayout.set("class","taskDetailedView hide");
        // }
        // else{
        //     // console.log("ELSE==");
        //     detailedViewLayout.set("class","taskDetailedView show");
        // }
        //detailedViewLayout.set("visibility","visible");
        //var taskField = layout.getViewById("taskName");
    };
    OtherTaskComponent.prototype.createTask = function () {
        this.router.navigate(["/createtask"]);
    };
    return OtherTaskComponent;
}());
OtherTaskComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        providers: [http_post_services_1.MyHttpPostService],
        templateUrl: "pages/othertask/othertask.html",
        styleUrls: ["pages/othertask/othertask-common.css", "pages/othertask/othertask.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page, http_post_services_1.MyHttpPostService])
], OtherTaskComponent);
exports.OtherTaskComponent = OtherTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RoZXJ0YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm90aGVydGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBeUM7QUFDekMsc0NBQWtEO0FBQ2xELDJFQUF5RTtBQUt6RSw2REFBNEQ7QUFFNUQsb0RBQXVEO0FBQ3ZELHVEQUEwRDtBQUMxRCw2REFVOEI7QUFDOUIsZ0NBQStCO0FBQy9CLHVFQUFxRTtBQVNyRSxJQUFhLGtCQUFrQjtJQVczQiw0QkFBb0IsTUFBYyxFQUFTLElBQVUsRUFBUyxhQUFnQztRQUE5RixpQkFZQztRQVptQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQVQ5RixjQUFTLEdBQUMsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLHNCQUFpQixHQUFFLElBQUksa0NBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQVN2QyxJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksNkJBQWEsQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUMsVUFBVSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUMsWUFBWSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQWE7WUFDOUMsK0JBQStCO1lBQ2hDLHlDQUF5QztZQUN4QyxLQUFJLENBQUMsV0FBVyxHQUFDLEtBQUssQ0FBQztRQUd6QixDQUFDLENBQUMsQ0FBQztJQUVULENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBRUksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUNNLCtDQUFrQixHQUF6QixVQUEwQixJQUF1QjtRQUU3QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxD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QVY7UUFDUSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFFOUMsQ0FBQztJQUVMLHlCQUFDO0FBQUQsQ0FBQyxBQTdTRCxJQTZTQztBQTdTWSxrQkFBa0I7SUFOOUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFNBQVMsRUFBRSxDQUFDLHNDQUFpQixDQUFDO1FBQzlCLFdBQVcsRUFBRSxnQ0FBZ0M7UUFDN0MsU0FBUyxFQUFFLENBQUMsc0NBQXNDLEVBQUUsK0JBQStCLENBQUM7S0FDckYsQ0FBQztxQ0FZOEIsZUFBTSxFQUFlLFdBQUksRUFBd0Isc0NBQWlCO0dBWHJGLGtCQUFrQixDQTZTOUI7QUE3U1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBEYXRhSXRlbSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2RhdGFJdGVtXCI7XG5pbXBvcnQgeyBEYXRhSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9kYXRhSXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3XCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBMaXN0Vmlld0l0ZW1zIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvbGlzdHZpZXdpdGVtc1wiO1xuaW1wb3J0IHsgUmFkTGlzdFZpZXdDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3L2FuZ3VsYXJcIjtcbmltcG9ydCAqIGFzIHRpbWVyTW9kdWxlICBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy90aW1lclwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgTXlIdHRwUG9zdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9odHRwLXBvc3Quc2VydmljZXNcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHByb3ZpZGVyczogW015SHR0cFBvc3RTZXJ2aWNlXSxcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvb3RoZXJ0YXNrL290aGVydGFzay5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvb3RoZXJ0YXNrL290aGVydGFzay1jb21tb24uY3NzXCIsIFwicGFnZXMvb3RoZXJ0YXNrL290aGVydGFzay5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgT3RoZXJUYXNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0XG57XG4gICAgZGF0YUl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIGRldGFpbGVkRGF0YUl0ZW1zPSBuZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICBsaXN0Vmlld0l0ZW1zOkxpc3RWaWV3SXRlbXM7XG4gICAgdGFwcGVkSXRlbUtleTtcbiAgICBcbiAgICBwYWdlVGl0bGU7XG4gICBcbiAgICBzaG93RGV0YWlsZWRWaWV3O1xuICAgIGRldmljZUZDTUlkO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSBwYWdlOiBQYWdlLHByaXZhdGUgbXlQb3N0U2VydmljZTogTXlIdHRwUG9zdFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5saXN0Vmlld0l0ZW1zPW5ldyBMaXN0Vmlld0l0ZW1zO1xuICAgICAgICB0aGlzLnNob3dEZXRhaWxlZFZpZXc9XCJjb2xsYXBzZVwiO1xuICAgICAgICB0aGlzLnBhZ2VUaXRsZT1cIk90aGVyIFRhc2tcIjtcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFB1c2hUb2tlbigpLnRoZW4oKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIC8vIG1heSBiZSBudWxsIGlmIG5vdCBrbm93biB5ZXRcbiAgICAgICAgICAgLy8gYWxlcnQoXCJDdXJyZW50IHB1c2ggdG9rZW46IFwiICsgdG9rZW4pO1xuICAgICAgICAgICAgdGhpcy5kZXZpY2VGQ01JZD10b2tlbjtcbiAgICAgICAgICBcblxuICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIFxuICAgIHtcbiAgICAgICAgdGhpcy5kYXRhSXRlbXM9dGhpcy5saXN0Vmlld0l0ZW1zLmdldE90aGVyVGFza0RldGFpbHMoKTsgIFxuICAgIH1cbiAgICBwdWJsaWMgb25Td2lwZUNlbGxTdGFydGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKVxuICAgIHtcbiAgICAgICAgdmFyIHN3aXBlTGltaXRzID0gYXJncy5kYXRhLnN3aXBlTGltaXRzO1xuICAgICAgICB2YXIgc3dpcGVWaWV3ID0gYXJnc1snb2JqZWN0J107XG4gICAgICAgIHZhciBsZWZ0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZDxWaWV3PignZW1wdHlWaWV3Jyk7XG4gICAgICAgIHZhciByaWdodEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQ8Vmlldz4oJ2RlbGV0ZVZpZXcnKTtcbiAgICAgICAgc3dpcGVMaW1pdHMubGVmdCA9IGxlZnRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICAgICAgc3dpcGVMaW1pdHMucmlnaHQgPSByaWdodEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgICAgICBzd2lwZUxpbWl0cy50aHJlc2hvbGQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCkgLyAyO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblB1bGxUb1JlZnJlc2hJbml0aWF0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpXG4gICAge1xuICAgICAgICB0aGlzLmRhdGFJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0T3RoZXJUYXNrRGV0YWlscygpOyAgICBcbiAgICAgICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RWaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgICAgICAgICAgICAgbGlzdFZpZXcubm90aWZ5UHVsbFRvUmVmcmVzaEZpbmlzaGVkKCk7XG4gICAgICAgICAgICB9LDEwMDApOyAgICBcblxuICAgfVxuICAgZGVsZXRlVGFzayhhcmdzKVxuICAge1xuICAgIFxuICAgICAgICB2YXIgdGFwSW5kZXg9dGhpcy5kYXRhSXRlbXMuaW5kZXhPZihhcmdzLm9iamVjdC5iaW5kaW5nQ29udGV4dClcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZW0gS2F5PT09PT09XCIrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIE5hbWU9PT09PT1cIit0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS50YXNrTmFtZSk7XG4gICAgICAgIHZhciBjcmVhdGVkQnlOdW1iZXI9dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkuY3JlYXRlZEJ5TnVtYmVyO1xuICAgICAgICAvL3ZhciBrZXk9dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5O1xuICAgICAgICB2YXIgaXRlbUtleT10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5rZXk7XG4gICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcblxuICAgICAgICB2YXIgeD10aGlzO1xuICAgICAgICB2YXIgb25RdWVyeUV2ZW50PWZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWxldGUgTXkgdGFza1wiKTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSUZcIik7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzdWx0PT1cIityZXN1bHRKc29uKTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleTEgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXNzaWduZWUgTnVtYmVyXCIra2V5MSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGtleTE9PW51bGwgfHwga2V5MT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0aGUgdGFzayBpbiBteSB0YXNrIGRldGFpbHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnJlbW92ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICcvTXlUYXNrRGV0YWlscy8nK2tleTErJy8nK2l0ZW1LZXksXG4gICAgICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgICAgICB4LmRlbGV0ZU90aGVyVGFzayhkZXZpY2VQaG9uZU51bWJlcix0YXBJbmRleCxpdGVtS2V5KTsgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFxuICAgICAgICB9ICAgXG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK2l0ZW1LZXkrJy9Bc3NpZ25lZURldGFpbHMnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgICAgIHguZGF0YUl0ZW1zPXgubGlzdFZpZXdJdGVtcy5nZXRPdGhlclRhc2tEZXRhaWxzKCk7XG4gICAgICAgIH0sMTAwMCk7XG4gICAgICAgIFxuXG5cbiAgICAgICAgXG4gICAgICAgXG4gICB9XG4gICBwdWJsaWMgZGVsZXRlT3RoZXJUYXNrKGRldmljZVBob25lTnVtYmVyLHRhcEluZGV4LGl0ZW1LZXkpXG4gICAge1xuICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRhc2sgaW4gb3RoZXIgdGFzayBkZXRhaWxzIHBhZ2VcbiAgICAgICAgICAgICAgICAgZmlyZWJhc2UucmVtb3ZlKFxuICAgICAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytpdGVtS2V5LFxuICAgICAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBkZWxldGVkIHN1Y2Nlc3NmdWxseSBpbiBvdGhlciB0YXNrIGRldGFpbHMtLS1cIik7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBkZWxldGluZyBvdGhlciB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgfSBcbiAgICAgIFxuICAgIGNhbmNlbCgpXG4gICAge1xuICAgICAgICB0aGlzLnNob3dEZXRhaWxlZFZpZXc9XCJjb2xsYXBzZVwiO1xuICAgICAgXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcy5kZXZpY2VGQ01JZC0tXCIrdGhpcy5kZXZpY2VGQ01JZCk7XG4gICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vIGxldCBkYXRhPXtcbiAgICAgICAgLy8gICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgLy8gICAgICAgICAgXCJ0aXRsZVwiOiBcIlRlc3QgTm90aWZpY2F0aW9uXCIsXG4gICAgICAgIC8vICAgICAgICAgIFwiYm9keVwiOiBcIjUgdG8gMVwiLFxuICAgICAgICAvLyAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgIFwidG9cIjp0aGlzLmRldmljZUZDTUlkXG4gICAgICAgIC8vICAgICAgfTtcbiAgICAgICAgLy8gICAgICBjb25zb2xlLmxvZyhcImRhdGE9PVwiK0pTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgLy8gdGhpcy5teVBvc3RTZXJ2aWNlXG4gICAgICAgIC8vIC5wb3N0RGF0YShkYXRhKS5zdWJzY3JpYmUoKHJlcyk9PntcblxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzXCIpO1xuICAgICAgICAvLyB9LChlcnJvcik9PntcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiZmFpbHVyZT09PVwiK2Vycm9yKTtcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgXG5cbiAgICBwdWJsaWMgZ2V0UmVtYWluZGVyQ291bnRBbmRVcGRhdGUobnVtYmVyLGNTdGF0dXMsckNvdW50KVxuICAgIHtcbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICBmaXJlYmFzZS51cGRhdGUoXG4gICAgICAgICcvTXlUYXNrRGV0YWlscy8nK251bWJlcisnLycrdGhpcy50YXBwZWRJdGVtS2V5LFxuICAgICAgICB7XG4gICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJDb3VudCsxLFxuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK3RoaXMudGFwcGVkSXRlbUtleSsnL0Fzc2lnbmVlRGV0YWlscy8nK251bWJlcixcbiAgICAgICAge1xuICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzpyQ291bnQrMSxcbiAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICBzZW5kUmVtaW5kZXIoKVxuICAgIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGFwcGVkSXRlbUtleT09PVwiK3RoaXMudGFwcGVkSXRlbUtleSk7IFxuICAgICAgICBsZXQgdGFwcGVkSXRlbUtleT10aGlzLnRhcHBlZEl0ZW1LZXk7XG4gICAgICAgIGxldCByZW1pbmRlclNlbmREZXRhaWxzPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICAgdmFyIHg9dGhpcztcbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICAgY29uc29sZS5sb2coXCJMZW5ndGg9PT1cIit0aGlzLmRldGFpbGVkRGF0YUl0ZW1zLmxlbmd0aCk7XG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5kZXRhaWxlZERhdGFJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgIFxuICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBudW1iZXI9dGhpcy5kZXRhaWxlZERhdGFJdGVtcy5nZXRJdGVtKGkpLmFzc2lnbmVlTnVtYmVyO1xuICAgICAgICAgICAgdmFyIGNTdGF0dXM9dGhpcy5kZXRhaWxlZERhdGFJdGVtcy5nZXRJdGVtKGkpLmNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICB2YXIgckNvdW50PXRoaXMuZGV0YWlsZWREYXRhSXRlbXMuZ2V0SXRlbShpKS5yZW1haW5kZXJDb3VudDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTnVtYmVyPT09PVwiK251bWJlcik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNTdGF0dXM9PT09XCIrY1N0YXR1cyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJDb3VudD09PT1cIityQ291bnQpO1xuICAgICAgICAgICAgaWYoIWNTdGF0dXMpXG4gICAgICAgICAgICB0aGlzLmdldFJlbWFpbmRlckNvdW50QW5kVXBkYXRlKG51bWJlcixjU3RhdHVzLHJDb3VudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YXIgdGFwSW5kZXg9dGhpcy5kYXRhSXRlbXMuaW5kZXhPZih0YXBwZWRJdGVtS2V5KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJJbmRleD09PVwiK3RhcEluZGV4KTtcbiAgICAgICAgLy8gbGV0IG92ZXJBbGxSZW1haW5kZXJDb3VudD10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5yZW1haW5kZXJDb3VudDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvdmVyQWxsUmVtYWluZGVyQ291bnQ9PT09PVwiK292ZXJBbGxSZW1haW5kZXJDb3VudCk7XG4gICAgICAgIC8vIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgLy8gJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK3RhcHBlZEl0ZW1LZXksXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgICdyZW1haW5kZXJDb3VudCc6b3ZlckFsbFJlbWFpbmRlckNvdW50KzEsXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQ9ZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgIGlmKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKFxuICAgICAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJyt0YXBwZWRJdGVtS2V5LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzpyZXN1bHQudmFsdWUrMSxcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0sKHJlcyk9Pnt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJyt0YXBwZWRJdGVtS2V5KycvcmVtYWluZGVyQ291bnQnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgICAgICB7XG4gICAgICAgICAgICB4LmRhdGFJdGVtcz14Lmxpc3RWaWV3SXRlbXMuZ2V0T3RoZXJUYXNrRGV0YWlscygpO1xuICAgICAgICAgICAgeC5zaG93RGV0YWlsZWRWaWV3PVwiY29sbGFwc2VcIjsgXG4gICAgICAgIH0sNTAwKTtcbiAgICAgICAgXG5cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgIFxuXG5cbiAgICB9XG4gICAgaXRlbVRhcChpdGVtKVxuICAgIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSVRlbSBLZXk9PVwiK2l0ZW0ua2V5KTtcbiAgICAgICAgdGhpcy50YXBwZWRJdGVtS2V5PWl0ZW0ua2V5O1xuICAgICAgICBjb25zb2xlLmxvZyhcInRhcHBlZEl0ZW1LZXk9PT1cIit0aGlzLnRhcHBlZEl0ZW1LZXkpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5kZXRhaWxlZERhdGFJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0T3RoZXJUYXNrRGV0YWlsc0RldGFpbGVkRGV0YWlscyhpdGVtLmtleSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNob3dEZXRhaWxlZFZpZXc9XCJ2aXNpYmxlXCI7XG5cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgXG5cbiAgICAgICAgLy8gdmFyIGxheW91dCA9IHRoaXMucGFnZTtcbiAgICAgICAgXG5cblxuICAgICAgICAvLyB2YXIgaWROYW1lPVwidGFza0RldGFpbGVkVmlld1wiK2l0ZW0ua2V5O1xuICAgICAgICAvLyB2YXIgZGV0YWlsZWRWaWV3TGF5b3V0ID0gbGF5b3V0LmdldFZpZXdCeUlkKGlkTmFtZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSUQ9PT1cIitkZXRhaWxlZFZpZXdMYXlvdXQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBjbGFzcz09XCIrZGV0YWlsZWRWaWV3TGF5b3V0LmNsYXNzTmFtZS5zcGxpdChcIiBcIilbMV0pO1xuXG4gICAgICAvLyAgbGF5b3V0LmNsYXNzTmFtZT1cInRhc2tEZXRhaWxlZFZpZXdcIjtcbiAgICAgICAgLy92YXIgY2xhc3NMYXlvdXQ9bGF5b3V0LmNsYXNzTmFtZT1cInRhc2tEZXRhaWxlZFZpZXdcIjtcbiAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNhbHNzIExheW91dD09XCIrY2xhc3NMYXlvdXQpO1xuICAgICAgIC8vIGxheW91dC5zZXQoXCJjbGFzc1wiLFwidGFza0RldGFpbGVkVmlldyBoaWRlXCIpO1xuXG5cbiAgICAgICAgLy8gaWYoZGV0YWlsZWRWaWV3TGF5b3V0LmNsYXNzTmFtZS5zcGxpdChcIiBcIilbMV09PSdzaG93JylcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coXCJJRj09XCIpO1xuICAgICAgICAvLyAgICAgZGV0YWlsZWRWaWV3TGF5b3V0LnNldChcImNsYXNzXCIsXCJ0YXNrRGV0YWlsZWRWaWV3IGhpZGVcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNle1xuICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhcIkVMU0U9PVwiKTtcbiAgICAgICAgLy8gICAgIGRldGFpbGVkVmlld0xheW91dC5zZXQoXCJjbGFzc1wiLFwidGFza0RldGFpbGVkVmlldyBzaG93XCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvL2RldGFpbGVkVmlld0xheW91dC5zZXQoXCJ2aXNpYmlsaXR5XCIsXCJ2aXNpYmxlXCIpO1xuICAgICAgICAvL3ZhciB0YXNrRmllbGQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJ0YXNrTmFtZVwiKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgY3JlYXRlVGFzaygpe1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2NyZWF0ZXRhc2tcIl0pO1xuXG4gICAgfVxuICAgXG59XG5cblxuXG4iXX0=