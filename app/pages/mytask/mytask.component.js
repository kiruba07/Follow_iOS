"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("application-settings");
var listviewitems_1 = require("../../service/listviewitems");
var timerModule = require("tns-core-modules/timer");
var MyTaskComponent = (function () {
    function MyTaskComponent(router) {
        this.router = router;
        this.dataItems = new observable_array_1.ObservableArray([]);
        this.listViewItems = new listviewitems_1.ListViewItems;
        this.pageTitle = "My Task";
    }
    MyTaskComponent.prototype.ngOnInit = function () {
        this.dataItems = this.listViewItems.getMyTaskdetails();
        //   console.log("Grid=="+this.gridLayout.page.getViewById("grid1"));
    };
    MyTaskComponent.prototype.onViewLoaded = function () {
        alert("Loaded");
    };
    MyTaskComponent.prototype.onSwipeCellStarted = function (args) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];
        var leftItem = swipeView.getViewById('deleteView');
        var rightItem = swipeView.getViewById('doneView');
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    };
    MyTaskComponent.prototype.onPullToRefreshInitiated = function (args) {
        console.log("Pul to refresh");
        this.dataItems = this.listViewItems.getMyTaskdetails();
        timerModule.setTimeout(function () {
            var listView = args.object;
            listView.notifyPullToRefreshFinished();
        }, 1000);
    };
    MyTaskComponent.prototype.doneTask = function (args) {
        var _this = this;
        var tapIndex = this.dataItems.indexOf(args.object.bindingContext);
        var x = this;
        console.log("Item Kay======" + this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======" + this.dataItems.getItem(tapIndex).taskName);
        console.log("Created By Number======" + this.dataItems.getItem(tapIndex).createdByNumber);
        var createdByNumber = this.dataItems.getItem(tapIndex).createdByNumber;
        var key = this.dataItems.getItem(tapIndex).key;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        //update completion status in mytask details
        firebase.update('/MyTaskDetails/' + devicePhoneNumber + '/' + this.dataItems.getItem(tapIndex).key, {
            'myCompletionStatus': true,
        }).then(function (res) {
            console.log("Task has been upadates successfully in my task details---" + res);
            _this.dataItems = _this.listViewItems.getMyTaskdetails();
        }, function (res) {
            console.log("Problem in updating my task details---" + res);
        });
        //get the updation count and update completion status in other task details
        var onQueryEvent = function (result) {
            if (!result.error) {
                console.log("Get the current value===" + result.value);
                firebase.update('/OtherTaskDetails/' + createdByNumber + '/' + key, {
                    'completionCount': (result.value + 1),
                }).then(function (res) {
                    console.log("Completion count has been upadates successfully in other task details---" + res);
                    firebase.update('/MyTaskDetails/' + devicePhoneNumber + '/' + key, {
                        'completionCount': (result.value + 1),
                    }).then(function (res) {
                        console.log("Completion count has been upadates successfully in my task details---" + res);
                        x.dataItems = x.listViewItems.getMyTaskdetails();
                    }, function (res) {
                        console.log("Problem in updating completion count in my task details---" + res);
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
    };
    MyTaskComponent.prototype.deleteTask = function (args) {
        var _this = this;
        var tapIndex = this.dataItems.indexOf(args.object.bindingContext);
        console.log("Item Kay======" + this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======" + this.dataItems.getItem(tapIndex).taskName);
        var createdByNumber = this.dataItems.getItem(tapIndex).createdByNumber;
        var key = this.dataItems.getItem(tapIndex).key;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
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
    };
    MyTaskComponent.prototype.createTask = function () {
        this.router.navigate(["/createtask"]);
    };
    return MyTaskComponent;
}());
MyTaskComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        // providers: [DataItemService],
        templateUrl: "pages/mytask/mytask.html",
        styleUrls: ["pages/mytask/mytask-common.css", "pages/mytask/mytask.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], MyTaskComponent);
exports.MyTaskComponent = MyTaskComponent;
