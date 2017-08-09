"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var dataItem_service_1 = require("../../service/dataItem.service");
var listviewitems_1 = require("../../service/listviewitems");
var timerModule = require("tns-core-modules/timer");
var firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("application-settings");
var page_1 = require("ui/page");
// import { View } from "ui/core/view";
var OtherTaskComponent = (function () {
    function OtherTaskComponent(router, page) {
        this.router = router;
        this.page = page;
        this.dataItems = new observable_array_1.ObservableArray([]);
        this.detailedDataItems = new observable_array_1.ObservableArray([]);
        this.listViewItems = new listviewitems_1.ListViewItems;
        this.showDetailedView = "collapse";
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
                });
            }
        };
        firebase.query(onQueryEvent, '/OtherTaskDetails/' + devicePhoneNumber + '/' + tappedItemKey + '/remainderCount', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
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
        providers: [dataItem_service_1.DataItemService],
        templateUrl: "pages/othertask/othertask.html",
        styleUrls: ["pages/othertask/othertask-common.css", "pages/othertask/othertask.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page])
], OtherTaskComponent);
exports.OtherTaskComponent = OtherTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RoZXJ0YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm90aGVydGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBeUM7QUFDekMsc0NBQWtEO0FBQ2xELDJFQUF5RTtBQUV6RSxtRUFBaUU7QUFHakUsNkRBQTREO0FBRTVELG9EQUF1RDtBQUN2RCx1REFBMEQ7QUFDMUQsNkRBVThCO0FBQzlCLGdDQUErQjtBQUMvQix1Q0FBdUM7QUFRdkMsSUFBYSxrQkFBa0I7SUFVM0IsNEJBQW9CLE1BQWMsRUFBUyxJQUFVO1FBQWpDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBUnJELGNBQVMsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsc0JBQWlCLEdBQUUsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBUXZDLElBQUksQ0FBQyxhQUFhLEdBQUMsSUFBSSw2QkFBYSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxVQUFVLENBQUM7SUFHckMsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFFSSxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM1RCxDQUFDO0lBQ00sK0NBQWtCLEdBQXpCLFVBQTBCLElBQXVCO1FBRTdDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFPLFdBQVcsQ0FBQyxDQUFDO1FBQ3hELElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQU8sWUFBWSxDQUFDLENBQUM7UUFDMUQsV0FBVyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMs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QUM7UUFNaEMsMEJBQTBCO1FBSTFCLDBDQUEwQztRQUMxQyx1REFBdUQ7UUFDdkQsMkNBQTJDO1FBQzNDLHNFQUFzRTtRQUV4RSx3Q0FBd0M7UUFDdEMsc0RBQXNEO1FBQ3ZELDZDQUE2QztRQUM3QywrQ0FBK0M7UUFHOUMseURBQXlEO1FBQ3pELElBQUk7UUFDSiw4QkFBOEI7UUFDOUIsK0RBQStEO1FBRS9ELElBQUk7UUFDSixRQUFRO1FBRVIsZ0NBQWdDO1FBQ2hDLCtEQUErRDtRQUUvRCxJQUFJO1FBR0osaURBQWlEO1FBQ2pELGlEQUFpRDtJQUVyRCxDQUFDO0lBRUQsdUNBQVUsR0FBVjtRQUNRLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUU5QyxDQUFDO0lBRUwseUJBQUM7QUFBRCxDQUFDLEFBbFFELElBa1FDO0FBbFFZLGtCQUFrQjtJQU45QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztRQUM1QixXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLCtCQUErQixDQUFDO0tBQ3JGLENBQUM7cUNBVzhCLGVBQU0sRUFBZSxXQUFJO0dBVjVDLGtCQUFrQixDQWtROUI7QUFsUVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBEYXRhSXRlbSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2RhdGFJdGVtXCI7XG5pbXBvcnQgeyBEYXRhSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9kYXRhSXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3XCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBMaXN0Vmlld0l0ZW1zIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvbGlzdHZpZXdpdGVtc1wiO1xuaW1wb3J0IHsgUmFkTGlzdFZpZXdDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3L2FuZ3VsYXJcIjtcbmltcG9ydCAqIGFzIHRpbWVyTW9kdWxlICBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy90aW1lclwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuLy8gaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICBwcm92aWRlcnM6IFtEYXRhSXRlbVNlcnZpY2VdLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9vdGhlcnRhc2svb3RoZXJ0YXNrLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9vdGhlcnRhc2svb3RoZXJ0YXNrLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9vdGhlcnRhc2svb3RoZXJ0YXNrLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBPdGhlclRhc2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXRcbntcbiAgICBkYXRhSXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgZGV0YWlsZWREYXRhSXRlbXM9IG5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIGxpc3RWaWV3SXRlbXM6TGlzdFZpZXdJdGVtcztcbiAgICB0YXBwZWRJdGVtS2V5O1xuICAgIFxuICAgXG4gICAgc2hvd0RldGFpbGVkVmlldztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHRoaXMubGlzdFZpZXdJdGVtcz1uZXcgTGlzdFZpZXdJdGVtcztcbiAgICAgICAgdGhpcy5zaG93RGV0YWlsZWRWaWV3PVwiY29sbGFwc2VcIjtcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIFxuICAgIHtcbiAgICAgICAgdGhpcy5kYXRhSXRlbXM9dGhpcy5saXN0Vmlld0l0ZW1zLmdldE90aGVyVGFza0RldGFpbHMoKTsgIFxuICAgIH1cbiAgICBwdWJsaWMgb25Td2lwZUNlbGxTdGFydGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKVxuICAgIHtcbiAgICAgICAgdmFyIHN3aXBlTGltaXRzID0gYXJncy5kYXRhLnN3aXBlTGltaXRzO1xuICAgICAgICB2YXIgc3dpcGVWaWV3ID0gYXJnc1snb2JqZWN0J107XG4gICAgICAgIHZhciBsZWZ0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZDxWaWV3PignZW1wdHlWaWV3Jyk7XG4gICAgICAgIHZhciByaWdodEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQ8Vmlldz4oJ2RlbGV0ZVZpZXcnKTtcbiAgICAgICAgc3dpcGVMaW1pdHMubGVmdCA9IGxlZnRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICAgICAgc3dpcGVMaW1pdHMucmlnaHQgPSByaWdodEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgICAgICBzd2lwZUxpbWl0cy50aHJlc2hvbGQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCkgLyAyO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblB1bGxUb1JlZnJlc2hJbml0aWF0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpXG4gICAge1xuICAgICAgICB0aGlzLmRhdGFJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0T3RoZXJUYXNrRGV0YWlscygpOyAgICBcbiAgICAgICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RWaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgICAgICAgICAgICAgbGlzdFZpZXcubm90aWZ5UHVsbFRvUmVmcmVzaEZpbmlzaGVkKCk7XG4gICAgICAgICAgICB9LDEwMDApOyAgICBcblxuICAgfVxuICAgZGVsZXRlVGFzayhhcmdzKVxuICAge1xuICAgIFxuICAgICAgICB2YXIgdGFwSW5kZXg9dGhpcy5kYXRhSXRlbXMuaW5kZXhPZihhcmdzLm9iamVjdC5iaW5kaW5nQ29udGV4dClcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZW0gS2F5PT09PT09XCIrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIE5hbWU9PT09PT1cIit0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS50YXNrTmFtZSk7XG4gICAgICAgIHZhciBjcmVhdGVkQnlOdW1iZXI9dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkuY3JlYXRlZEJ5TnVtYmVyO1xuICAgICAgICAvL3ZhciBrZXk9dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5O1xuICAgICAgICB2YXIgaXRlbUtleT10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5rZXk7XG4gICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcblxuICAgICAgICB2YXIgeD10aGlzO1xuICAgICAgICB2YXIgb25RdWVyeUV2ZW50PWZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWxldGUgTXkgdGFza1wiKTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSUZcIik7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzdWx0PT1cIityZXN1bHRKc29uKTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleTEgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXNzaWduZWUgTnVtYmVyXCIra2V5MSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGtleTE9PW51bGwgfHwga2V5MT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0aGUgdGFzayBpbiBteSB0YXNrIGRldGFpbHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnJlbW92ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICcvTXlUYXNrRGV0YWlscy8nK2tleTErJy8nK2l0ZW1LZXksXG4gICAgICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgICAgICB4LmRlbGV0ZU90aGVyVGFzayhkZXZpY2VQaG9uZU51bWJlcix0YXBJbmRleCxpdGVtS2V5KTsgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFxuICAgICAgICB9ICAgXG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK2l0ZW1LZXkrJy9Bc3NpZ25lZURldGFpbHMnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgICAgIHguZGF0YUl0ZW1zPXgubGlzdFZpZXdJdGVtcy5nZXRPdGhlclRhc2tEZXRhaWxzKCk7XG4gICAgICAgIH0sMTAwMCk7XG4gICAgICAgIFxuXG5cbiAgICAgICAgXG4gICAgICAgXG4gICB9XG4gICBwdWJsaWMgZGVsZXRlT3RoZXJUYXNrKGRldmljZVBob25lTnVtYmVyLHRhcEluZGV4LGl0ZW1LZXkpXG4gICAge1xuICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRhc2sgaW4gb3RoZXIgdGFzayBkZXRhaWxzIHBhZ2VcbiAgICAgICAgICAgICAgICAgZmlyZWJhc2UucmVtb3ZlKFxuICAgICAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytpdGVtS2V5LFxuICAgICAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBkZWxldGVkIHN1Y2Nlc3NmdWxseSBpbiBvdGhlciB0YXNrIGRldGFpbHMtLS1cIik7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBkZWxldGluZyBvdGhlciB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgfSAgIFxuICAgIGNhbmNlbCgpXG4gICAge1xuICAgICAgICB0aGlzLnNob3dEZXRhaWxlZFZpZXc9XCJjb2xsYXBzZVwiO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0UmVtYWluZGVyQ291bnRBbmRVcGRhdGUobnVtYmVyLGNTdGF0dXMsckNvdW50KVxuICAgIHtcbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICBmaXJlYmFzZS51cGRhdGUoXG4gICAgICAgICcvTXlUYXNrRGV0YWlscy8nK251bWJlcisnLycrdGhpcy50YXBwZWRJdGVtS2V5LFxuICAgICAgICB7XG4gICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJDb3VudCsxLFxuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK3RoaXMudGFwcGVkSXRlbUtleSsnL0Fzc2lnbmVlRGV0YWlscy8nK251bWJlcixcbiAgICAgICAge1xuICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzpyQ291bnQrMSxcbiAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICBzZW5kUmVtaW5kZXIoKVxuICAgIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGFwcGVkSXRlbUtleT09PVwiK3RoaXMudGFwcGVkSXRlbUtleSk7IFxuICAgICAgICBsZXQgdGFwcGVkSXRlbUtleT10aGlzLnRhcHBlZEl0ZW1LZXk7XG4gICAgICAgIGxldCByZW1pbmRlclNlbmREZXRhaWxzPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICAgdmFyIHg9dGhpcztcbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICAgY29uc29sZS5sb2coXCJMZW5ndGg9PT1cIit0aGlzLmRldGFpbGVkRGF0YUl0ZW1zLmxlbmd0aCk7XG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5kZXRhaWxlZERhdGFJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgIFxuICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBudW1iZXI9dGhpcy5kZXRhaWxlZERhdGFJdGVtcy5nZXRJdGVtKGkpLmFzc2lnbmVlTnVtYmVyO1xuICAgICAgICAgICAgdmFyIGNTdGF0dXM9dGhpcy5kZXRhaWxlZERhdGFJdGVtcy5nZXRJdGVtKGkpLmNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICB2YXIgckNvdW50PXRoaXMuZGV0YWlsZWREYXRhSXRlbXMuZ2V0SXRlbShpKS5yZW1haW5kZXJDb3VudDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTnVtYmVyPT09PVwiK251bWJlcik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNTdGF0dXM9PT09XCIrY1N0YXR1cyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJDb3VudD09PT1cIityQ291bnQpO1xuICAgICAgICAgICAgaWYoIWNTdGF0dXMpXG4gICAgICAgICAgICB0aGlzLmdldFJlbWFpbmRlckNvdW50QW5kVXBkYXRlKG51bWJlcixjU3RhdHVzLHJDb3VudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YXIgdGFwSW5kZXg9dGhpcy5kYXRhSXRlbXMuaW5kZXhPZih0YXBwZWRJdGVtS2V5KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJJbmRleD09PVwiK3RhcEluZGV4KTtcbiAgICAgICAgLy8gbGV0IG92ZXJBbGxSZW1haW5kZXJDb3VudD10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5yZW1haW5kZXJDb3VudDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvdmVyQWxsUmVtYWluZGVyQ291bnQ9PT09PVwiK292ZXJBbGxSZW1haW5kZXJDb3VudCk7XG4gICAgICAgIC8vIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgLy8gJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK3RhcHBlZEl0ZW1LZXksXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgICdyZW1haW5kZXJDb3VudCc6b3ZlckFsbFJlbWFpbmRlckNvdW50KzEsXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQ9ZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgIGlmKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKFxuICAgICAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJyt0YXBwZWRJdGVtS2V5LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzpyZXN1bHQudmFsdWUrMSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJyt0YXBwZWRJdGVtS2V5KycvcmVtYWluZGVyQ291bnQnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgXG5cbiAgICAgICAgXG4gICAgICAgXG5cblxuICAgIH1cbiAgICBpdGVtVGFwKGl0ZW0pXG4gICAge1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCJJVGVtIEtleT09XCIraXRlbS5rZXkpO1xuICAgICAgICB0aGlzLnRhcHBlZEl0ZW1LZXk9aXRlbS5rZXk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGFwcGVkSXRlbUtleT09PVwiK3RoaXMudGFwcGVkSXRlbUtleSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRldGFpbGVkRGF0YUl0ZW1zPXRoaXMubGlzdFZpZXdJdGVtcy5nZXRPdGhlclRhc2tEZXRhaWxzRGV0YWlsZWREZXRhaWxzKGl0ZW0ua2V5KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2hvd0RldGFpbGVkVmlldz1cInZpc2libGVcIjtcblxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICBcblxuICAgICAgICAvLyB2YXIgbGF5b3V0ID0gdGhpcy5wYWdlO1xuICAgICAgICBcblxuXG4gICAgICAgIC8vIHZhciBpZE5hbWU9XCJ0YXNrRGV0YWlsZWRWaWV3XCIraXRlbS5rZXk7XG4gICAgICAgIC8vIHZhciBkZXRhaWxlZFZpZXdMYXlvdXQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoaWROYW1lKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJJRD09PVwiK2RldGFpbGVkVmlld0xheW91dCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIGNsYXNzPT1cIitkZXRhaWxlZFZpZXdMYXlvdXQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKVsxXSk7XG5cbiAgICAgIC8vICBsYXlvdXQuY2xhc3NOYW1lPVwidGFza0RldGFpbGVkVmlld1wiO1xuICAgICAgICAvL3ZhciBjbGFzc0xheW91dD1sYXlvdXQuY2xhc3NOYW1lPVwidGFza0RldGFpbGVkVmlld1wiO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2Fsc3MgTGF5b3V0PT1cIitjbGFzc0xheW91dCk7XG4gICAgICAgLy8gbGF5b3V0LnNldChcImNsYXNzXCIsXCJ0YXNrRGV0YWlsZWRWaWV3IGhpZGVcIik7XG5cblxuICAgICAgICAvLyBpZihkZXRhaWxlZFZpZXdMYXlvdXQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKVsxXT09J3Nob3cnKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhcIklGPT1cIik7XG4gICAgICAgIC8vICAgICBkZXRhaWxlZFZpZXdMYXlvdXQuc2V0KFwiY2xhc3NcIixcInRhc2tEZXRhaWxlZFZpZXcgaGlkZVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2V7XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwiRUxTRT09XCIpO1xuICAgICAgICAvLyAgICAgZGV0YWlsZWRWaWV3TGF5b3V0LnNldChcImNsYXNzXCIsXCJ0YXNrRGV0YWlsZWRWaWV3IHNob3dcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vZGV0YWlsZWRWaWV3TGF5b3V0LnNldChcInZpc2liaWxpdHlcIixcInZpc2libGVcIik7XG4gICAgICAgIC8vdmFyIHRhc2tGaWVsZCA9IGxheW91dC5nZXRWaWV3QnlJZChcInRhc2tOYW1lXCIpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBjcmVhdGVUYXNrKCl7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvY3JlYXRldGFza1wiXSk7XG5cbiAgICB9XG4gICBcbn1cblxuXG5cbiJdfQ==