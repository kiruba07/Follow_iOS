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
        this.pageTitle = "Other Task";
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
        providers: [dataItem_service_1.DataItemService],
        templateUrl: "pages/othertask/othertask.html",
        styleUrls: ["pages/othertask/othertask-common.css", "pages/othertask/othertask.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page])
], OtherTaskComponent);
exports.OtherTaskComponent = OtherTaskComponent;
