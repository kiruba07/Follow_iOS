"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_1 = require("../../service/user");
var firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("application-settings");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var listviewitems_1 = require("../../service/listviewitems");
var observable_1 = require("data/observable");
var page_1 = require("ui/page");
var router_2 = require("nativescript-angular/router");
var CreateTaskComponent = (function () {
    function CreateTaskComponent(router, page, routerExtensions) {
        this.router = router;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.contactList = new observable_array_1.ObservableArray([]);
        this.selectedItems = [];
        this.selectedItemsName = [];
        this.show = "";
        this.day = "";
        this.year = "";
        this.moth = "";
        this.today = new Date();
        this.user = new user_1.User();
        this.observable = new observable_1.Observable;
        this.listViewItems = new listviewitems_1.ListViewItems;
        this.contactList = this.listViewItems.getContactList();
        this.show = "collapse";
        this.datePickerView = "collapse";
        this.buttonView = "visible";
        this.checkTry = "check";
        this.pageTitle = "Create Task";
    }
    CreateTaskComponent.prototype.goBack = function () {
        console.log("Back tapped");
        this.routerExtensions.backToPreviousPage();
    };
    CreateTaskComponent.prototype.hideDatePicker = function (args) {
        console.log("tapped---");
        this.datePickerView = 'collapse';
        this.buttonView = "visible";
    };
    CreateTaskComponent.prototype.showDatePicker = function (args) {
        if (this.datePickerView == "visible") {
            this.datePickerView = 'collapse';
            this.buttonView = "visible";
        }
        else {
            this.datePickerView = 'visible';
            this.buttonView = "collapse";
        }
        this.hideSoftKeypad();
    };
    CreateTaskComponent.prototype.hideSoftKeypad = function () {
        var layout = this.page;
        var categoryField = layout.getViewById("category");
        var taskField = layout.getViewById("taskName");
        if (categoryField.ios || taskField.ios) {
            categoryField.ios.endEditing(true);
            taskField.ios.endEditing(true);
        }
        else if (categoryField.android || taskField.android) {
            categoryField.android.clearFocus();
            taskField.android.clearFocus();
        }
    };
    CreateTaskComponent.prototype.selectAssignee = function () {
        if (this.show == "visible") {
            this.show = 'collapse';
        }
        else {
            this.show = 'visible';
        }
        this.datePickerView = "collapse";
        this.buttonView = "visible";
        this.hideSoftKeypad();
    };
    CreateTaskComponent.prototype.cancel = function () {
        this.router.navigate([
            '/mainfragment',
            { outlets: { mytaskoutlet: ['mytask'] } }
        ]);
    };
    CreateTaskComponent.prototype.onPickerLoaded = function (args) {
        var datePicker = args.object;
        var dd = this.today.getDay();
        var mm = this.today.getMonth() + 1; //January is 0!
        var yyyy = this.today.getFullYear();
        // console.log("Current Date ====="+dd);
        // console.log("Current month ====="+mm);
        // console.log("Current year ====="+yyyy);
        datePicker.year = yyyy;
        datePicker.month = mm;
        //datePicker.day =dd;
        datePicker.minDate = new Date(1975, 0, 29);
        datePicker.maxDate = new Date(2045, 4, 12);
        this.datePickervalue = "Select End date";
    };
    CreateTaskComponent.prototype.onDateChanged = function (args) {
        var dateValue = args.object;
        this.datePickervalue = dateValue.day + "/" + dateValue.month + "/" + dateValue.year;
    };
    CreateTaskComponent.prototype.itemTap = function (item) {
        //console.log("Item tap=-========"+item.name);
        if (item.selected) {
            item.checkBox = "\uF096";
            for (var i = 0; i < this.selectedItems.length; i++) {
                var curItem = this.selectedItems[i];
                //var curItemName=this.selectedItemsName[i]
                console.log('cur item----' + curItem);
                if (curItem == item.number) {
                    console.log('index ::::::' + i);
                    this.selectedItems.splice(i, 1);
                    this.selectedItemsName.splice(i, 1);
                }
            }
            //this.selectedItems.splice(item.number,1);
            console.log("Selected items after slice======" + this.selectedItems);
        }
        else {
            item.checkBox = "\uF046";
            this.selectedItems.push(item.number);
            this.selectedItemsName.push(item.nameLabel);
        }
        item.selected = !item.selected;
        console.log("Selected items======" + this.selectedItems);
    };
    CreateTaskComponent.prototype.assignTask = function () {
        var x = this;
        var taskName = this.user.taskName;
        var category = this.user.category;
        var dateTime = this.user.dateTime;
        // var assignee=this.user.assignee;
        // console.log("Task name---"+taskName);
        // console.log("Category---"+category);
        //console.log("Date time---"+dateTime);
        //console.log("Assignee---"+assignee);
        //check the last key in TaskDetails table
        if (taskName == null || category == null || this.selectedItems.length < 1 || dateTime == "Select End date") {
            console.log("Empty =====");
        }
        else {
            var getLastKeyInTasKDetails = function (result) {
                if (!result.error) {
                    if (JSON.stringify(result.value) == "null") {
                        x.enterDataIntoTaskDetails("1", taskName, category, dateTime, x);
                    }
                    else {
                        x.enterDataIntoTaskDetails("null", taskName, category, dateTime, x);
                    }
                }
            };
            firebase.query(getLastKeyInTasKDetails, '/TaskDetails/', {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'taskName' // mandatory when type is 'child'
                },
            });
        }
    };
    CreateTaskComponent.prototype.enterDataIntoTaskDetails = function (id, taskName, category, dateTime, x) {
        var _this = this;
        var y = this;
        if (id == "1") {
            firebase.setValue('/TaskDetails/' + id, {
                'taskName': taskName,
                'category': category,
                'dueDate': dateTime,
            }).then(function (res) {
                console.log("Task details has been saved successfully in task details first time---" + res);
                _this.enterDataIntoMyTaskDetails(id, taskName, category, dateTime, x);
                _this.enterDataIntoOtherTaskDetails(id, taskName, category, dateTime, x);
            }, function (res) {
                console.log("Problem in saving task details---" + res);
            });
        }
        else {
            console.log('entry already there need to get last count value');
            y.getLastCountAndEnterDetaisInTaskDetailsPage(taskName, category, dateTime, y);
        }
    };
    CreateTaskComponent.prototype.getLastCountAndEnterDetaisInTaskDetailsPage = function (taskName, category, dateTime, x) {
        var y = this;
        var onQueryEvent = function (result) {
            var lastKey = 0;
            if (!result.error) {
                var resultJson = result.value;
                for (var key in resultJson) {
                    lastKey = parseInt(key);
                }
                lastKey = lastKey + 1;
                firebase.setValue('/TaskDetails/' + lastKey, {
                    'taskName': taskName,
                    'category': category,
                    'dueDate': dateTime,
                }).then(function (res) {
                    console.log("Task has been saved successfully in task details---" + res);
                    y.enterDataIntoMyTaskDetails(lastKey, taskName, category, dateTime, y);
                    y.enterDataIntoOtherTaskDetails(lastKey, taskName, category, dateTime, y);
                }, function (res) {
                    console.log("Problem in saving task details---" + res);
                });
            }
        };
        firebase.query(onQueryEvent, '/TaskDetails/', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
    };
    CreateTaskComponent.prototype.enterDataIntoMyTaskDetails = function (id, taskName, category, dateTime, x) {
        var _this = this;
        var y = this;
        /** temporary values assigned need to chagne later */
        var recipentsCount = this.selectedItems.length;
        var remainderCount = 0;
        var completionCount = 0;
        var myCompletionStatus = false;
        var idTemp;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var deviceRegisteredUserName = application_settings_1.getString("deviceRegisteredUserName");
        for (var i = 0; i < this.selectedItems.length; i++) {
            //console.log("i value items=====i========="+i+"======"+this.selectedItems[i]);
            if (id == "1") {
                firebase.setValue('/MyTaskDetails/' + this.selectedItems[i] + '/' + "1", {
                    'taskName': taskName,
                    'category': category,
                    'dueDate': dateTime,
                    'recipentsCount': recipentsCount,
                    'remainderCount': remainderCount,
                    'createdBy': deviceRegisteredUserName,
                    'createdByRegId': devicePhoneNumber,
                    'completionCount': completionCount,
                    'myCompletionStatus': myCompletionStatus,
                }).then(function (res) {
                    // console.log("Task has been saved successfully in my task details first time---"+res);
                    _this.router.navigate([
                        '/mainfragment',
                        { outlets: { mytaskoutlet: ['mytask'] } }
                    ]);
                }, function (res) {
                    console.log("Problem in saving my task details---" + res);
                });
            }
            else {
                //console.log("Else   i value items=====i========="+i+"======"+this.selectedItems[i]);
                firebase.setValue('/MyTaskDetails/' + this.selectedItems[i] + '/' + id, {
                    'taskName': taskName,
                    'category': category,
                    'dueDate': dateTime,
                    'recipentsCount': recipentsCount,
                    'remainderCount': remainderCount,
                    'createdBy': deviceRegisteredUserName,
                    'createdByRegId': devicePhoneNumber,
                    'completionCount': completionCount,
                    'myCompletionStatus': myCompletionStatus,
                }).then(function (res) {
                    console.log("===IF==");
                    y.router.navigate([
                        '/mainfragment',
                        { outlets: { mytaskoutlet: ['mytask'] } }
                    ]);
                }, function (res) {
                    console.log("Problem in saving my task details---" + res);
                });
                // this.getLastCountAndEnterDetails(i,this.selectedItems.length,this.selectedItems[i],recipentsCount,remainderCount,deviceRegisteredUserName,devicePhoneNumber,completionCount,myCompletionStatus,taskName,category,dateTime,x),i;
            }
        }
    };
    CreateTaskComponent.prototype.enterDataIntoOtherTaskDetails = function (id, taskName, category, dateTime, x) {
        var y = this;
        /** temporary values assigned need to chagne later */
        var recipentsCount = this.selectedItems.length;
        var remainderCount = 0;
        var completionCount = 0;
        var myCompletionStatus = false;
        var idTemp;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var deviceRegisteredUserName = application_settings_1.getString("deviceRegisteredUserName");
        var deletionCount = 0;
        // for(var i=0;i<this.selectedItems.length;i++)
        // {
        //console.log("i value items=====i========="+i+"======"+this.selectedItems[i]);
        if (id == "1") {
            firebase.setValue('/OtherTaskDetails/' + devicePhoneNumber + '/' + "1", {
                'taskName': taskName,
                'category': category,
                'dueDate': dateTime,
                'recipentsCount': recipentsCount,
                'remainderCount': remainderCount,
                'createdBy': deviceRegisteredUserName,
                'createdByRegId': devicePhoneNumber,
                'completionCount': completionCount,
                'myCompletionStatus': myCompletionStatus,
                'deletionCount': deletionCount
            }).then(function (res) {
                console.log("Task has been saved successfully in other task details first time---" + res);
                // this.router.navigate([
                //           '/mainfragment',
                //           { outlets: { mytaskoutlet: ['mytask'] } }
                //         ]);
            }, function (res) {
                console.log("Problem in saving my task details---" + res);
            });
            for (var j = 0; j < this.selectedItems.length; j++) {
                firebase.setValue('OtherTaskDetails/' + devicePhoneNumber + '/1/AssigneeDetails/' + this.selectedItems[j], {
                    'assigneeName': this.selectedItemsName[j],
                    'remainderCount': 0,
                    'deletionCount': 0
                });
            }
        }
        else {
            //console.log("Else   i value items=====i========="+i+"======"+this.selectedItems[i]);
            firebase.setValue('/OtherTaskDetails/' + devicePhoneNumber + '/' + id, {
                'taskName': taskName,
                'category': category,
                'dueDate': dateTime,
                'recipentsCount': recipentsCount,
                'remainderCount': remainderCount,
                'createdBy': deviceRegisteredUserName,
                'createdByRegId': devicePhoneNumber,
                'completionCount': completionCount,
                'myCompletionStatus': myCompletionStatus,
                'deletionCount': deletionCount
            }).then(function (res) {
                console.log("Task has been saved successfully in other task details-========" + res);
            }, function (res) {
                console.log("Problem in saving my task details---" + res);
            });
            // this.getLastCountAndEnterDetails(i,this.selectedItems.length,this.selectedItems[i],recipentsCount,remainderCount,deviceRegisteredUserName,devicePhoneNumber,completionCount,myCompletionStatus,taskName,category,dateTime,x),i;
            for (var j = 0; j < this.selectedItems.length; j++) {
                firebase.setValue('OtherTaskDetails/' + devicePhoneNumber + '/' + id + '/AssigneeDetails/' + this.selectedItems[j], {
                    'assigneeName': this.selectedItemsName[j],
                    'remainderCount': 0,
                    'deletionCount': 0,
                    'completionStatus': false
                });
            }
        }
        //}
    };
    CreateTaskComponent.prototype.getLastCountAndEnterDetails = function (i, seledtedItemsLength, selectedAssignee, recipentsCount, remainderCount, deviceRegisteredUserName, devicePhoneNumber, completionCount, myCompletionStatus, taskName, category, dateTime, x) {
        var onQueryEvent = function (result) {
            var lastKey = 0;
            if (!result.error) {
                var resultJson = result.value;
                for (var key in resultJson) {
                    lastKey = parseInt(key);
                }
                lastKey = lastKey + 1;
                firebase.setValue('/MyTaskDetails/' + selectedAssignee + '/' + lastKey, {
                    'taskName': taskName,
                    'category': category,
                    'dueDate': dateTime,
                    'recipentsCount': recipentsCount,
                    'remainderCount': remainderCount,
                    'createdBy': deviceRegisteredUserName,
                    'createdByRegId': devicePhoneNumber,
                    'completionCount': completionCount,
                    'myCompletionStatus': myCompletionStatus,
                }).then(function (res) {
                    console.log("Task has been saved successfully in my task details---" + res);
                    if (i == seledtedItemsLength - 1) {
                        x.router.navigate([
                            '/mainfragment',
                            { outlets: { mytaskoutlet: ['mytask'] } }
                        ]);
                    }
                }, function (res) {
                    console.log("Problem in saving my task details---" + res);
                });
            }
        };
        firebase.query(onQueryEvent, '/MyTaskDetails/' + selectedAssignee + '/', {
            // set this to true if you want to check if the value exists or just want the event to fire once
            // default false, so it listens continuously
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
    };
    return CreateTaskComponent;
}());
CreateTaskComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "pages/createtask/createtask.html",
        styleUrls: ["pages/createtask/createtask-common.css", "pages/createtask/createtask.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page, router_2.RouterExtensions])
], CreateTaskComponent);
exports.CreateTaskComponent = CreateTaskComponent;
