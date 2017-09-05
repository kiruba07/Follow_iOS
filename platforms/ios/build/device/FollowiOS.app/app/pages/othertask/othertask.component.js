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
        console.log("this.deviceFCMId--" + this.deviceFCMId);
        var data = {
            "notification": {
                "title": "Test Notification",
                "body": "5 to 1",
                "priority": "high"
            },
            "to": this.deviceFCMId
        };
        console.log("data==" + JSON.stringify(data));
        this.myPostService
            .postData(data).subscribe(function (res) {
            console.log("Success");
        }, function (error) {
            console.log("failure===" + error);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RoZXJ0YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm90aGVydGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBeUM7QUFDekMsc0NBQWtEO0FBQ2xELDJFQUF5RTtBQUt6RSw2REFBNEQ7QUFFNUQsb0RBQXVEO0FBQ3ZELHVEQUEwRDtBQUMxRCw2REFVOEI7QUFDOUIsZ0NBQStCO0FBQy9CLHVFQUFxRTtBQVNyRSxJQUFhLGtCQUFrQjtJQVczQiw0QkFBb0IsTUFBYyxFQUFTLElBQVUsRUFBUyxhQUFnQztRQUE5RixpQkFZQztRQVptQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQVQ5RixjQUFTLEdBQUMsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLHNCQUFpQixHQUFFLElBQUksa0NBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQVN2QyxJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksNkJBQWEsQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUMsVUFBVSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUMsWUFBWSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQWE7WUFDOUMsK0JBQStCO1lBQ2hDLHlDQUF5QztZQUN4QyxLQUFJLENBQUMsV0FBVyxHQUFDLEtBQUssQ0FBQztRQUd6QixDQUFDLENBQUMsQ0FBQztJQUVULENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBRUksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUNNLCtDQUFrQixHQUF6QixVQUEwQixJQUF1QjtRQUU3QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxD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SUFBSSxDQUFDLGdCQUFnQixHQUFDLFNBQVMsQ0FBQztRQU1oQywwQkFBMEI7UUFJMUIsMENBQTBDO1FBQzFDLHVEQUF1RDtRQUN2RCwyQ0FBMkM7UUFDM0Msc0VBQXNFO1FBRXhFLHdDQUF3QztRQUN0QyxzREFBc0Q7UUFDdkQsNkNBQTZDO1FBQzdDLCtDQUErQztRQUc5Qyx5REFBeUQ7UUFDekQsSUFBSTtRQUNKLDhCQUE4QjtRQUM5QiwrREFBK0Q7UUFFL0QsSUFBSTtRQUNKLFFBQVE7UUFFUixnQ0FBZ0M7UUFDaEMsK0RBQStEO1FBRS9ELElBQUk7UUFHSixpREFBaUQ7UUFDakQsaURBQWlEO0lBRXJELENBQUM7SUFFRCx1Q0FBVSxHQUFWO1FBQ1EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRTlDLENBQUM7SUFFTCx5QkFBQztBQUFELENBQUMsQUE3U0QsSUE2U0M7QUE3U1ksa0JBQWtCO0lBTjlCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixTQUFTLEVBQUUsQ0FBQyxzQ0FBaUIsQ0FBQztRQUM5QixXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLCtCQUErQixDQUFDO0tBQ3JGLENBQUM7cUNBWThCLGVBQU0sRUFBZSxXQUFJLEVBQXdCLHNDQUFpQjtHQVhyRixrQkFBa0IsQ0E2UzlCO0FBN1NZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgRGF0YUl0ZW0gfSBmcm9tIFwiLi4vLi4vc2VydmljZS9kYXRhSXRlbVwiO1xuaW1wb3J0IHsgRGF0YUl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvZGF0YUl0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlld1wiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuaW1wb3J0IHsgTGlzdFZpZXdJdGVtcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2xpc3R2aWV3aXRlbXNcIjtcbmltcG9ydCB7IFJhZExpc3RWaWV3Q29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlldy9hbmd1bGFyXCI7XG5pbXBvcnQgKiBhcyB0aW1lck1vZHVsZSAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdGltZXJcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IE15SHR0cFBvc3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvaHR0cC1wb3N0LnNlcnZpY2VzXCI7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICBwcm92aWRlcnM6IFtNeUh0dHBQb3N0U2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL290aGVydGFzay9vdGhlcnRhc2suaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL290aGVydGFzay9vdGhlcnRhc2stY29tbW9uLmNzc1wiLCBcInBhZ2VzL290aGVydGFzay9vdGhlcnRhc2suY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIE90aGVyVGFza0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxue1xuICAgIGRhdGFJdGVtcz1uZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICBkZXRhaWxlZERhdGFJdGVtcz0gbmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgbGlzdFZpZXdJdGVtczpMaXN0Vmlld0l0ZW1zO1xuICAgIHRhcHBlZEl0ZW1LZXk7XG4gICAgXG4gICAgcGFnZVRpdGxlO1xuICAgXG4gICAgc2hvd0RldGFpbGVkVmlldztcbiAgICBkZXZpY2VGQ01JZDtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLHByaXZhdGUgcGFnZTogUGFnZSxwcml2YXRlIG15UG9zdFNlcnZpY2U6IE15SHR0cFBvc3RTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMubGlzdFZpZXdJdGVtcz1uZXcgTGlzdFZpZXdJdGVtcztcbiAgICAgICAgdGhpcy5zaG93RGV0YWlsZWRWaWV3PVwiY29sbGFwc2VcIjtcbiAgICAgICAgdGhpcy5wYWdlVGl0bGU9XCJPdGhlciBUYXNrXCI7XG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRQdXNoVG9rZW4oKS50aGVuKCh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAvLyBtYXkgYmUgbnVsbCBpZiBub3Qga25vd24geWV0XG4gICAgICAgICAgIC8vIGFsZXJ0KFwiQ3VycmVudCBwdXNoIHRva2VuOiBcIiArIHRva2VuKTtcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlRkNNSWQ9dG9rZW47XG4gICAgICAgICAgXG5cbiAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSBcbiAgICB7XG4gICAgICAgIHRoaXMuZGF0YUl0ZW1zPXRoaXMubGlzdFZpZXdJdGVtcy5nZXRPdGhlclRhc2tEZXRhaWxzKCk7ICBcbiAgICB9XG4gICAgcHVibGljIG9uU3dpcGVDZWxsU3RhcnRlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSlcbiAgICB7XG4gICAgICAgIHZhciBzd2lwZUxpbWl0cyA9IGFyZ3MuZGF0YS5zd2lwZUxpbWl0cztcbiAgICAgICAgdmFyIHN3aXBlVmlldyA9IGFyZ3NbJ29iamVjdCddO1xuICAgICAgICB2YXIgbGVmdEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQ8Vmlldz4oJ2VtcHR5VmlldycpO1xuICAgICAgICB2YXIgcmlnaHRJdGVtID0gc3dpcGVWaWV3LmdldFZpZXdCeUlkPFZpZXc+KCdkZWxldGVWaWV3Jyk7XG4gICAgICAgIHN3aXBlTGltaXRzLmxlZnQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgICAgIHN3aXBlTGltaXRzLnJpZ2h0ID0gcmlnaHRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICAgICAgc3dpcGVMaW1pdHMudGhyZXNob2xkID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpIC8gMjtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25QdWxsVG9SZWZyZXNoSW5pdGlhdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKVxuICAgIHtcbiAgICAgICAgdGhpcy5kYXRhSXRlbXM9dGhpcy5saXN0Vmlld0l0ZW1zLmdldE90aGVyVGFza0RldGFpbHMoKTsgICAgXG4gICAgICAgIHRpbWVyTW9kdWxlLnNldFRpbWVvdXQoZnVuY3Rpb24gKClcbiAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0VmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICAgICAgICAgIGxpc3RWaWV3Lm5vdGlmeVB1bGxUb1JlZnJlc2hGaW5pc2hlZCgpO1xuICAgICAgICAgICAgfSwxMDAwKTsgICAgXG5cbiAgIH1cbiAgIGRlbGV0ZVRhc2soYXJncylcbiAgIHtcbiAgICBcbiAgICAgICAgdmFyIHRhcEluZGV4PXRoaXMuZGF0YUl0ZW1zLmluZGV4T2YoYXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQpXG5cbiAgICAgICAgY29uc29sZS5sb2coXCJJdGVtIEtheT09PT09PVwiK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmtleSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBOYW1lPT09PT09XCIrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkudGFza05hbWUpO1xuICAgICAgICB2YXIgY3JlYXRlZEJ5TnVtYmVyPXRoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmNyZWF0ZWRCeU51bWJlcjtcbiAgICAgICAgLy92YXIga2V5PXRoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmtleTtcbiAgICAgICAgdmFyIGl0ZW1LZXk9dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5O1xuICAgICAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG5cbiAgICAgICAgdmFyIHg9dGhpcztcbiAgICAgICAgdmFyIG9uUXVlcnlFdmVudD1mdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlIE15IHRhc2tcIik7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklGXCIpO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdD09XCIrcmVzdWx0SnNvbik7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkxIGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFzc2lnbmVlIE51bWJlclwiK2tleTEpO1xuICAgICAgICAgICAgICAgICAgICBpZihrZXkxPT1udWxsIHx8IGtleTE9PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdGhlIHRhc2sgaW4gbXkgdGFzayBkZXRhaWxzXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5yZW1vdmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAnL015VGFza0RldGFpbHMvJytrZXkxKycvJytpdGVtS2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICAgICAgeC5kZWxldGVPdGhlclRhc2soZGV2aWNlUGhvbmVOdW1iZXIsdGFwSW5kZXgsaXRlbUtleSk7ICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgfSAgIFxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytpdGVtS2V5KycvQXNzaWduZWVEZXRhaWxzJyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRpbWVyTW9kdWxlLnNldFRpbWVvdXQoZnVuY3Rpb24gKClcbiAgICAgICAge1xuXG4gICAgICAgICAgICAgICB4LmRhdGFJdGVtcz14Lmxpc3RWaWV3SXRlbXMuZ2V0T3RoZXJUYXNrRGV0YWlscygpO1xuICAgICAgICB9LDEwMDApO1xuICAgICAgICBcblxuXG4gICAgICAgIFxuICAgICAgIFxuICAgfVxuICAgcHVibGljIGRlbGV0ZU90aGVyVGFzayhkZXZpY2VQaG9uZU51bWJlcix0YXBJbmRleCxpdGVtS2V5KVxuICAgIHtcbiAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0YXNrIGluIG90aGVyIHRhc2sgZGV0YWlscyBwYWdlXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLnJlbW92ZShcbiAgICAgICAgICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnLycraXRlbUtleSxcbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gZGVsZXRlZCBzdWNjZXNzZnVsbHkgaW4gb3RoZXIgdGFzayBkZXRhaWxzLS0tXCIpO1xuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gZGVsZXRpbmcgb3RoZXIgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgIH0gXG4gICAgICBcbiAgICBjYW5jZWwoKVxuICAgIHtcbiAgICAgICAgdGhpcy5zaG93RGV0YWlsZWRWaWV3PVwiY29sbGFwc2VcIjtcbiAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuZGV2aWNlRkNNSWQtLVwiK3RoaXMuZGV2aWNlRkNNSWQpO1xuICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBsZXQgZGF0YT17XG4gICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJUZXN0IE5vdGlmaWNhdGlvblwiLFxuICAgICAgICAgICAgICAgICBcImJvZHlcIjogXCI1IHRvIDFcIixcbiAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICBcInRvXCI6dGhpcy5kZXZpY2VGQ01JZFxuICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhPT1cIitKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIHRoaXMubXlQb3N0U2VydmljZVxuICAgICAgICAucG9zdERhdGEoZGF0YSkuc3Vic2NyaWJlKChyZXMpPT57XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc1wiKTtcbiAgICAgICAgfSwoZXJyb3IpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZhaWx1cmU9PT1cIitlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFxuICAgIH1cblxuICAgIFxuXG4gICAgcHVibGljIGdldFJlbWFpbmRlckNvdW50QW5kVXBkYXRlKG51bWJlcixjU3RhdHVzLHJDb3VudClcbiAgICB7XG4gICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgZmlyZWJhc2UudXBkYXRlKFxuICAgICAgICAnL015VGFza0RldGFpbHMvJytudW1iZXIrJy8nK3RoaXMudGFwcGVkSXRlbUtleSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzpyQ291bnQrMSxcbiAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBmaXJlYmFzZS51cGRhdGUoXG4gICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJyt0aGlzLnRhcHBlZEl0ZW1LZXkrJy9Bc3NpZ25lZURldGFpbHMvJytudW1iZXIsXG4gICAgICAgIHtcbiAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6ckNvdW50KzEsXG4gICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgc2VuZFJlbWluZGVyKClcbiAgICB7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcInRhcHBlZEl0ZW1LZXk9PT1cIit0aGlzLnRhcHBlZEl0ZW1LZXkpOyBcbiAgICAgICAgbGV0IHRhcHBlZEl0ZW1LZXk9dGhpcy50YXBwZWRJdGVtS2V5O1xuICAgICAgICBsZXQgcmVtaW5kZXJTZW5kRGV0YWlscz1uZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICAgICAgIHZhciB4PXRoaXM7XG4gICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiTGVuZ3RoPT09XCIrdGhpcy5kZXRhaWxlZERhdGFJdGVtcy5sZW5ndGgpO1xuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuZGV0YWlsZWREYXRhSXRlbXMubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICBcbiAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgbnVtYmVyPXRoaXMuZGV0YWlsZWREYXRhSXRlbXMuZ2V0SXRlbShpKS5hc3NpZ25lZU51bWJlcjtcbiAgICAgICAgICAgIHZhciBjU3RhdHVzPXRoaXMuZGV0YWlsZWREYXRhSXRlbXMuZ2V0SXRlbShpKS5jb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgdmFyIHJDb3VudD10aGlzLmRldGFpbGVkRGF0YUl0ZW1zLmdldEl0ZW0oaSkucmVtYWluZGVyQ291bnQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk51bWJlcj09PT1cIitudW1iZXIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjU3RhdHVzPT09PVwiK2NTdGF0dXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyQ291bnQ9PT09XCIrckNvdW50KTtcbiAgICAgICAgICAgIGlmKCFjU3RhdHVzKVxuICAgICAgICAgICAgdGhpcy5nZXRSZW1haW5kZXJDb3VudEFuZFVwZGF0ZShudW1iZXIsY1N0YXR1cyxyQ291bnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFyIHRhcEluZGV4PXRoaXMuZGF0YUl0ZW1zLmluZGV4T2YodGFwcGVkSXRlbUtleSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSW5kZXg9PT1cIit0YXBJbmRleCk7XG4gICAgICAgIC8vIGxldCBvdmVyQWxsUmVtYWluZGVyQ291bnQ9dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkucmVtYWluZGVyQ291bnQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib3ZlckFsbFJlbWFpbmRlckNvdW50PT09PT1cIitvdmVyQWxsUmVtYWluZGVyQ291bnQpO1xuICAgICAgICAvLyBmaXJlYmFzZS51cGRhdGUoXG4gICAgICAgIC8vICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJyt0YXBwZWRJdGVtS2V5LFxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICAncmVtYWluZGVyQ291bnQnOm92ZXJBbGxSZW1haW5kZXJDb3VudCsxLFxuICAgICAgICAvLyB9KTtcblxuICAgICAgICB2YXIgb25RdWVyeUV2ZW50PWZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICBpZighcmVzdWx0LmVycm9yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnLycrdGFwcGVkSXRlbUtleSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVzdWx0LnZhbHVlKzEsXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9LChyZXMpPT57fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnLycrdGFwcGVkSXRlbUtleSsnL3JlbWFpbmRlckNvdW50JyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRpbWVyTW9kdWxlLnNldFRpbWVvdXQoZnVuY3Rpb24gKClcbiAgICAgICAge1xuICAgICAgICAgICAgeC5kYXRhSXRlbXM9eC5saXN0Vmlld0l0ZW1zLmdldE90aGVyVGFza0RldGFpbHMoKTtcbiAgICAgICAgICAgIHguc2hvd0RldGFpbGVkVmlldz1cImNvbGxhcHNlXCI7IFxuICAgICAgICB9LDUwMCk7XG4gICAgICAgIFxuXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICBcblxuXG4gICAgfVxuICAgIGl0ZW1UYXAoaXRlbSlcbiAgICB7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcIklUZW0gS2V5PT1cIitpdGVtLmtleSk7XG4gICAgICAgIHRoaXMudGFwcGVkSXRlbUtleT1pdGVtLmtleTtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0YXBwZWRJdGVtS2V5PT09XCIrdGhpcy50YXBwZWRJdGVtS2V5KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGV0YWlsZWREYXRhSXRlbXM9dGhpcy5saXN0Vmlld0l0ZW1zLmdldE90aGVyVGFza0RldGFpbHNEZXRhaWxlZERldGFpbHMoaXRlbS5rZXkpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zaG93RGV0YWlsZWRWaWV3PVwidmlzaWJsZVwiO1xuXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgIFxuXG4gICAgICAgIC8vIHZhciBsYXlvdXQgPSB0aGlzLnBhZ2U7XG4gICAgICAgIFxuXG5cbiAgICAgICAgLy8gdmFyIGlkTmFtZT1cInRhc2tEZXRhaWxlZFZpZXdcIitpdGVtLmtleTtcbiAgICAgICAgLy8gdmFyIGRldGFpbGVkVmlld0xheW91dCA9IGxheW91dC5nZXRWaWV3QnlJZChpZE5hbWUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIklEPT09XCIrZGV0YWlsZWRWaWV3TGF5b3V0KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIgY2xhc3M9PVwiK2RldGFpbGVkVmlld0xheW91dC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpWzFdKTtcblxuICAgICAgLy8gIGxheW91dC5jbGFzc05hbWU9XCJ0YXNrRGV0YWlsZWRWaWV3XCI7XG4gICAgICAgIC8vdmFyIGNsYXNzTGF5b3V0PWxheW91dC5jbGFzc05hbWU9XCJ0YXNrRGV0YWlsZWRWaWV3XCI7XG4gICAgICAgLy8gY29uc29sZS5sb2coXCJDYWxzcyBMYXlvdXQ9PVwiK2NsYXNzTGF5b3V0KTtcbiAgICAgICAvLyBsYXlvdXQuc2V0KFwiY2xhc3NcIixcInRhc2tEZXRhaWxlZFZpZXcgaGlkZVwiKTtcblxuXG4gICAgICAgIC8vIGlmKGRldGFpbGVkVmlld0xheW91dC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpWzFdPT0nc2hvdycpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwiSUY9PVwiKTtcbiAgICAgICAgLy8gICAgIGRldGFpbGVkVmlld0xheW91dC5zZXQoXCJjbGFzc1wiLFwidGFza0RldGFpbGVkVmlldyBoaWRlXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coXCJFTFNFPT1cIik7XG4gICAgICAgIC8vICAgICBkZXRhaWxlZFZpZXdMYXlvdXQuc2V0KFwiY2xhc3NcIixcInRhc2tEZXRhaWxlZFZpZXcgc2hvd1wiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLy9kZXRhaWxlZFZpZXdMYXlvdXQuc2V0KFwidmlzaWJpbGl0eVwiLFwidmlzaWJsZVwiKTtcbiAgICAgICAgLy92YXIgdGFza0ZpZWxkID0gbGF5b3V0LmdldFZpZXdCeUlkKFwidGFza05hbWVcIik7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGNyZWF0ZVRhc2soKXtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9jcmVhdGV0YXNrXCJdKTtcblxuICAgIH1cbiAgIFxufVxuXG5cblxuIl19