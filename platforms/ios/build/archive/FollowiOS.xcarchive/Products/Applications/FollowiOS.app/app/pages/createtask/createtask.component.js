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
var http_post_services_1 = require("../../service/http-post.services");
var CreateTaskComponent = (function () {
    function CreateTaskComponent(router, page, routerExtensions, myPostService) {
        this.router = router;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.myPostService = myPostService;
        this.contactList = new observable_array_1.ObservableArray([]);
        this.selectedItems = [];
        this.selectedItemsName = [];
        this.selectedItemsToken = [];
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
                    this.selectedItemsToken.splice(i, 1);
                }
            }
            //this.selectedItems.splice(item.number,1);
            console.log("Selected items after slice======" + this.selectedItems);
        }
        else {
            item.checkBox = "\uF046";
            this.selectedItems.push(item.number);
            this.selectedItemsName.push(item.nameLabel);
            this.selectedItemsToken.push(item.deviceToken);
        }
        item.selected = !item.selected;
        console.log("Selected items======" + this.selectedItems);
        console.log("Selected items token======" + this.selectedItemsToken);
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
        console.log("Selected items token======" + this.selectedItemsToken);
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var deviceRegisteredUserName = application_settings_1.getString("deviceRegisteredUserName");
        var deviceToken = application_settings_1.getString("deviceToken");
        var _loop_1 = function () {
            //console.log("i value items=====i========="+i+"======"+this.selectedItems[i]);
            var index = i;
            if (id == "1") {
                firebase.setValue('/MyTaskDetails/' + this_1.selectedItems[i] + '/' + "1", {
                    'taskName': taskName,
                    'category': category,
                    'dueDate': dateTime,
                    'recipentsCount': recipentsCount,
                    'remainderCount': remainderCount,
                    'createdBy': deviceRegisteredUserName,
                    'createdByRegId': devicePhoneNumber,
                    'completionCount': completionCount,
                    'myCompletionStatus': myCompletionStatus,
                    'createdByToken': deviceToken,
                    'assigneeName': this_1.selectedItems,
                }).then(function (res) {
                    // console.log("Task has been saved successfully in my task details first time---"+res);
                    console.log("Selected items token======" + _this.selectedItemsToken[index]);
                    _this.sendPushNotification(_this.selectedItemsToken[index], deviceRegisteredUserName, taskName);
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
                firebase.setValue('/MyTaskDetails/' + this_1.selectedItems[i] + '/' + id, {
                    'taskName': taskName,
                    'category': category,
                    'dueDate': dateTime,
                    'recipentsCount': recipentsCount,
                    'remainderCount': remainderCount,
                    'createdBy': deviceRegisteredUserName,
                    'createdByRegId': devicePhoneNumber,
                    'completionCount': completionCount,
                    'myCompletionStatus': myCompletionStatus,
                    'createdByToken': deviceToken,
                    'assigneeName': this_1.selectedItems,
                }).then(function (res) {
                    console.log("===IF==");
                    console.log("Selected items token======" + _this.selectedItemsToken[index]);
                    y.sendPushNotification(_this.selectedItemsToken[index], deviceRegisteredUserName, taskName);
                    y.router.navigate([
                        '/mainfragment',
                        { outlets: { mytaskoutlet: ['mytask'] } }
                    ]);
                }, function (res) {
                    console.log("Problem in saving my task details---" + res);
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.selectedItems.length; i++) {
            _loop_1();
        }
    };
    CreateTaskComponent.prototype.sendPushNotification = function (assigneeDeviceToken, deviceRegisteredUserName, taskName) {
        console.log("Checking");
        console.log("Token====" + assigneeDeviceToken);
        //send push notification
        var data = {
            "notification": {
                "title": "New Task Received!",
                "body": deviceRegisteredUserName + " has assigned " + taskName,
                "priority": "high"
            },
            "to": assigneeDeviceToken
        };
        console.log("data==" + JSON.stringify(data));
        this.myPostService
            .postData(data).subscribe(function (res) {
            console.log("Reminder Success");
        }, function (error) {
            console.log("Reminder Failure===" + error);
        });
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
        var deviceToken = application_settings_1.getString("deviceToken");
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
                'deletionCount': deletionCount,
                'createdByToken': deviceToken
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
                    'deletionCount': 0,
                    "deviceToken": this.selectedItemsToken[j],
                    'completionStatus': false,
                    'taskName': taskName,
                    'createdBy': deviceRegisteredUserName
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
                'deletionCount': deletionCount,
                'createdByToken': deviceToken
            }).then(function (res) {
                console.log("Task has been saved successfully in other task details-========" + res);
            }, function (res) {
                console.log("Problem in saving my task details---" + res);
            });
            // this.getLastCountAndEnterDetails(i,this.selectedItems.length,this.selectedItems[i],recipentsCount,remainderCount,deviceRegisteredUserName,devicePhoneNumber,completionCount,myCompletionStatus,taskName,category,dateTime,x),i;
            for (var j = 0; j < this.selectedItems.length; j++) {
                // console.log("======================Device Token==============="+this.selectedItemsToken[j]);
                firebase.setValue('OtherTaskDetails/' + devicePhoneNumber + '/' + id + '/AssigneeDetails/' + this.selectedItems[j], {
                    'assigneeName': this.selectedItemsName[j],
                    'remainderCount': 0,
                    'deletionCount': 0,
                    "deviceToken": this.selectedItemsToken[j],
                    'completionStatus': false,
                    'taskName': taskName,
                    'createdBy': deviceRegisteredUserName
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
        providers: [http_post_services_1.MyHttpPostService],
        templateUrl: "pages/createtask/createtask.html",
        styleUrls: ["pages/createtask/createtask-common.css", "pages/createtask/createtask.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page, router_2.RouterExtensions, http_post_services_1.MyHttpPostService])
], CreateTaskComponent);
exports.CreateTaskComponent = CreateTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRldGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGV0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBeUM7QUFDekMsMkNBQTBDO0FBQzFDLHVEQUEwRDtBQUMxRCw2REFVOEI7QUFDOUIsMkVBQXlFO0FBQ3pFLDZEQUE0RDtBQUM1RCw4Q0FBNkM7QUFJN0MsZ0NBQStCO0FBRS9CLHNEQUErRDtBQUMvRCx1RUFBcUU7QUFRckUsSUFBYSxtQkFBbUI7SUFzQjVCLDZCQUFvQixNQUFjLEVBQVMsSUFBVSxFQUFTLGdCQUFrQyxFQUFTLGFBQWdDO1FBQXJILFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQWxCMUksZ0JBQVcsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFDMUIsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1FBQzlCLHVCQUFrQixHQUFVLEVBQUUsQ0FBQztRQU85QixTQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ2YsUUFBRyxHQUFRLEVBQUUsQ0FBQztRQUNkLFNBQUksR0FBUSxFQUFFLENBQUM7UUFDZixTQUFJLEdBQVEsRUFBRSxDQUFDO1FBR2YsVUFBSyxHQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFJYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRSxJQUFJLHVCQUFVLENBQUM7UUFFaEMsSUFBSSxDQUFDLGFBQWEsR0FBQyxJQUFJLDZCQUFhLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxD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LENBQUM7WUFHYixDQUFDO1FBRUQsQ0FBQyxDQUFDO1FBQ0YsUUFBUSxDQUFDLEtBQUssQ0FDVixZQUFZLEVBQ2hCLGlCQUFpQixHQUFDLGdCQUFnQixHQUFDLEdBQUcsRUFDbEM7WUFDSSxnR0FBZ0c7WUFDaEcsNENBQTRDO1lBQzVDLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLDJCQUEyQjtZQUMzQixPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO2FBRXRDO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUdMLDBCQUFDO0FBQUQsQ0FBQyxBQWhtQkQsSUFnbUJDO0FBaG1CWSxtQkFBbUI7SUFOL0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFNBQVMsRUFBRSxDQUFDLHNDQUFpQixDQUFDO1FBQzlCLFdBQVcsRUFBRSxrQ0FBa0M7UUFDL0MsU0FBUyxFQUFFLENBQUMsd0NBQXdDLEVBQUUsaUNBQWlDLENBQUM7S0FDekYsQ0FBQztxQ0F1QjhCLGVBQU0sRUFBZSxXQUFJLEVBQTJCLHlCQUFnQixFQUF3QixzQ0FBaUI7R0F0QmhJLG1CQUFtQixDQWdtQi9CO0FBaG1CWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL3VzZXJcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IExpc3RWaWV3SXRlbXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9saXN0dmlld2l0ZW1zXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlld1wiO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gXCJ1aS9kYXRlLXBpY2tlclwiO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE15SHR0cFBvc3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvaHR0cC1wb3N0LnNlcnZpY2VzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgcHJvdmlkZXJzOiBbTXlIdHRwUG9zdFNlcnZpY2VdLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9jcmVhdGV0YXNrL2NyZWF0ZXRhc2suaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2NyZWF0ZXRhc2svY3JlYXRldGFzay1jb21tb24uY3NzXCIsIFwicGFnZXMvY3JlYXRldGFzay9jcmVhdGV0YXNrLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBDcmVhdGVUYXNrQ29tcG9uZW50XG57XG4gIC8vIFlvdXIgVHlwZVNjcmlwdCBsb2dpYyBnb2VzIGhlcmVcbiAgIHVzZXI6IFVzZXJcbiAgIGNvbnRhY3RMaXN0PW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgc2VsZWN0ZWRJdGVtczpzdHJpbmdbXT1bXTtcbiAgIHNlbGVjdGVkSXRlbXNOYW1lOnN0cmluZ1tdPVtdO1xuICAgc2VsZWN0ZWRJdGVtc1Rva2VuOnN0cmluZ1tdPVtdO1xuICAgbGlzdFZpZXdJdGVtczpMaXN0Vmlld0l0ZW1zO1xuICAgIG9ic2VydmFibGU6T2JzZXJ2YWJsZVxuICAgIGNoZWNrVHJ5O1xuICAgIGRhdGVQaWNrZXJWaWV3OnN0cmluZztcbiAgICBidXR0b25WaWV3OnN0cmluZztcbiAgICBcbiAgICBzaG93OnN0cmluZz1cIlwiO1xuICAgIGRheTpzdHJpbmc9XCJcIjtcbiAgICB5ZWFyOnN0cmluZz1cIlwiO1xuICAgIG1vdGg6c3RyaW5nPVwiXCI7XG4gICAgZGF0ZVBpY2tlcnZhbHVlOnN0cmluZztcbiAgICB0YXNrRmllbGQ7XG4gICAgdG9kYXk9bmV3IERhdGUoKTtcbiAgICBwYWdlVGl0bGU7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixwcml2YXRlIHBhZ2U6IFBhZ2UscHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLHByaXZhdGUgbXlQb3N0U2VydmljZTogTXlIdHRwUG9zdFNlcnZpY2UpXG4gICAge1xuICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xuICAgICAgICB0aGlzLm9ic2VydmFibGU9IG5ldyBPYnNlcnZhYmxlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5saXN0Vmlld0l0ZW1zPW5ldyBMaXN0Vmlld0l0ZW1zO1xuICAgICAgICB0aGlzLmNvbnRhY3RMaXN0PXRoaXMubGlzdFZpZXdJdGVtcy5nZXRDb250YWN0TGlzdCgpO1xuICAgICAgICB0aGlzLnNob3c9XCJjb2xsYXBzZVwiO1xuICAgICAgICB0aGlzLmRhdGVQaWNrZXJWaWV3PVwiY29sbGFwc2VcIjtcbiAgICAgICAgdGhpcy5idXR0b25WaWV3PVwidmlzaWJsZVwiO1xuICAgICAgICB0aGlzLmNoZWNrVHJ5PVwiY2hlY2tcIjtcbiAgICAgICAgdGhpcy5wYWdlVGl0bGU9XCJDcmVhdGUgVGFza1wiO1xuICAgICAgICBcbiAgICB9XG5cbiAgICAgcHVibGljIGdvQmFjaygpIHtcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFjayB0YXBwZWRcIik7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG5cbiAgICBoaWRlRGF0ZVBpY2tlcihhcmdzKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0YXBwZWQtLS1cIik7XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXcgPSAnY29sbGFwc2UnO1xuICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgXG4gICAgfVxuICAgIHNob3dEYXRlUGlja2VyKGFyZ3Mpe1xuICAgICAgIGlmKHRoaXMuZGF0ZVBpY2tlclZpZXc9PVwidmlzaWJsZVwiKXtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXcgPSAnY29sbGFwc2UnO1xuICAgICAgICAgICAgdGhpcy5idXR0b25WaWV3PVwidmlzaWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJWaWV3ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgdGhpcy5idXR0b25WaWV3PVwiY29sbGFwc2VcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGVTb2Z0S2V5cGFkKCk7XG5cbiAgICAgICAgXG4gICAgfVxuICAgIGhpZGVTb2Z0S2V5cGFkKCl7XG4gICAgICAgIHZhciBsYXlvdXQgPSB0aGlzLnBhZ2U7XG4gICAgICAgIHZhciBjYXRlZ29yeUZpZWxkID0gbGF5b3V0LmdldFZpZXdCeUlkKFwiY2F0ZWdvcnlcIik7XG4gICAgICAgIHZhciB0YXNrRmllbGQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJ0YXNrTmFtZVwiKTtcbiAgICAgICAgaWYgKGNhdGVnb3J5RmllbGQuaW9zIHx8IHRhc2tGaWVsZC5pb3MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3J5RmllbGQuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgICAgICB0YXNrRmllbGQuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgIGVsc2UgaWYgKGNhdGVnb3J5RmllbGQuYW5kcm9pZCB8fCB0YXNrRmllbGQuYW5kcm9pZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3J5RmllbGQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgICAgICB0YXNrRmllbGQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VsZWN0QXNzaWduZWUoKVxuICAgIHtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuc2hvdz09XCJ2aXNpYmxlXCIpe1xuICAgICAgICAgICAgdGhpcy5zaG93ID0gJ2NvbGxhcHNlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zaG93ID0gJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXc9XCJjb2xsYXBzZVwiO1xuICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgICAgIHRoaXMuaGlkZVNvZnRLZXlwYWQoKTtcbiAgICAgICAgXG4gICAgfVxuICAgIGNhbmNlbCgpe1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL21haW5mcmFnbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG91dGxldHM6IHsgbXl0YXNrb3V0bGV0OiBbJ215dGFzayddIH0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgIH1cbiAgICAgb25QaWNrZXJMb2FkZWQoYXJncykge1xuICAgICAgICBsZXQgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIFxuICAgICAgICAgbGV0IGRkPSB0aGlzLnRvZGF5LmdldERheSgpO1xuICAgICAgICBsZXQgIG1tID0gdGhpcy50b2RheS5nZXRNb250aCgpKzE7IC8vSmFudWFyeSBpcyAwIVxuICAgICAgICBsZXQgeXl5eSA9IHRoaXMudG9kYXkuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgRGF0ZSA9PT09PVwiK2RkKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IG1vbnRoID09PT09XCIrbW0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgeWVhciA9PT09PVwiK3l5eXkpO1xuXG4gICAgICAgIGRhdGVQaWNrZXIueWVhciA9IHl5eXk7XG4gICAgICAgICBkYXRlUGlja2VyLm1vbnRoID1tbTtcbiAgICAgICAgLy9kYXRlUGlja2VyLmRheSA9ZGQ7XG5cbiAgICAgICAgZGF0ZVBpY2tlci5taW5EYXRlID0gbmV3IERhdGUoMTk3NSwgMCwgMjkpO1xuICAgICAgICBkYXRlUGlja2VyLm1heERhdGUgPSBuZXcgRGF0ZSgyMDQ1LCA0LCAxMik7XG5cbiAgICAgICAgIHRoaXMuZGF0ZVBpY2tlcnZhbHVlPVwiU2VsZWN0IEVuZCBkYXRlXCI7XG4gICAgfVxuXG4gICAgb25EYXRlQ2hhbmdlZChhcmdzKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgZGF0ZVZhbHVlPTxEYXRlUGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLmRhdGVQaWNrZXJ2YWx1ZT1kYXRlVmFsdWUuZGF5K1wiL1wiK2RhdGVWYWx1ZS5tb250aCtcIi9cIitkYXRlVmFsdWUueWVhcjtcbiAgICAgIFxuICAgIH0gICAgXG4gICAgcHVibGljIGl0ZW1UYXAoaXRlbSlcbiAgICB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJJdGVtIHRhcD0tPT09PT09PT1cIitpdGVtLm5hbWUpO1xuICAgICAgICBpZihpdGVtLnNlbGVjdGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrQm94PVwiXFx1e2YwOTZ9XCI7XG5cbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGN1ckl0ZW09dGhpcy5zZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIC8vdmFyIGN1ckl0ZW1OYW1lPXRoaXMuc2VsZWN0ZWRJdGVtc05hbWVbaV1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY3VyIGl0ZW0tLS0tJytjdXJJdGVtKTtcbiAgICAgICAgICAgICAgICBpZihjdXJJdGVtPT1pdGVtLm51bWJlcilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmRleCA6Ojo6OjonK2kpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc05hbWUuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy90aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKGl0ZW0ubnVtYmVyLDEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcyBhZnRlciBzbGljZT09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtcyk7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgIGl0ZW0uY2hlY2tCb3g9XCJcXHV7ZjA0Nn1cIjtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0ubnVtYmVyKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc05hbWUucHVzaChpdGVtLm5hbWVMYWJlbCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbi5wdXNoKGl0ZW0uZGV2aWNlVG9rZW4pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLnNlbGVjdGVkPSFpdGVtLnNlbGVjdGVkO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcyB0b2tlbj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuKTtcbiAgICAgICAgXG5cblxuXG4gICAgfVxuICAgXG4gICAgXG5cbiAgcHVibGljIGFzc2lnblRhc2soKSBcbiAge1xuXG4gICAgdmFyIHg9dGhpcztcbiAgICB2YXIgdGFza05hbWU9dGhpcy51c2VyLnRhc2tOYW1lO1xuICAgIHZhciBjYXRlZ29yeT10aGlzLnVzZXIuY2F0ZWdvcnk7XG4gICAgdmFyIGRhdGVUaW1lPXRoaXMudXNlci5kYXRlVGltZTtcbiAgIC8vIHZhciBhc3NpZ25lZT10aGlzLnVzZXIuYXNzaWduZWU7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlRhc2sgbmFtZS0tLVwiK3Rhc2tOYW1lKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNhdGVnb3J5LS0tXCIrY2F0ZWdvcnkpO1xuICAgICAvL2NvbnNvbGUubG9nKFwiRGF0ZSB0aW1lLS0tXCIrZGF0ZVRpbWUpO1xuICAgIC8vY29uc29sZS5sb2coXCJBc3NpZ25lZS0tLVwiK2Fzc2lnbmVlKTtcblxuICAgIC8vY2hlY2sgdGhlIGxhc3Qga2V5IGluIFRhc2tEZXRhaWxzIHRhYmxlXG4gICAgaWYodGFza05hbWU9PW51bGwgfHwgY2F0ZWdvcnk9PW51bGwgfHwgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDwxIHx8IGRhdGVUaW1lPT1cIlNlbGVjdCBFbmQgZGF0ZVwiKVxuICAgIHtcbiAgICBjb25zb2xlLmxvZyhcIkVtcHR5ID09PT09XCIpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICB2YXIgZ2V0TGFzdEtleUluVGFzS0RldGFpbHMgPSBmdW5jdGlvbihyZXN1bHQpIFxuICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKT09XCJudWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgeC5lbnRlckRhdGFJbnRvVGFza0RldGFpbHMoXCIxXCIsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseCk7XG4gICAgICAgICAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgeC5lbnRlckRhdGFJbnRvVGFza0RldGFpbHMoXCJudWxsXCIsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9O1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgICAgICAgICAgZ2V0TGFzdEtleUluVGFzS0RldGFpbHMsXG4gICAgICAgICAgICAgICAgJy9UYXNrRGV0YWlscy8nLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndGFza05hbWUnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgfVxuICAgIFxuXG4gIH1cbiAgICBwdWJsaWMgZW50ZXJEYXRhSW50b1Rhc2tEZXRhaWxzKGlkLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuICAgICAgICB2YXIgeT10aGlzO1xuICAgICAgICAgaWYoaWQ9PVwiMVwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICcvVGFza0RldGFpbHMvJytpZCxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yeSc6Y2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICdkdWVEYXRlJzpkYXRlVGltZSxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBkZXRhaWxzIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiB0YXNrIGRldGFpbHMgZmlyc3QgdGltZS0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJEYXRhSW50b015VGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJEYXRhSW50b090aGVyVGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseCk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbnRyeSBhbHJlYWR5IHRoZXJlIG5lZWQgdG8gZ2V0IGxhc3QgY291bnQgdmFsdWUnKVxuICAgICAgICAgICAgICAgIHkuZ2V0TGFzdENvdW50QW5kRW50ZXJEZXRhaXNJblRhc2tEZXRhaWxzUGFnZSh0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx5KTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBnZXRMYXN0Q291bnRBbmRFbnRlckRldGFpc0luVGFza0RldGFpbHNQYWdlKHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuICAgICAgICB2YXIgeT10aGlzO1xuICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbGFzdEtleT0wO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGFzdEtleT1wYXJzZUludChrZXkpO1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0S2V5PWxhc3RLZXkrMTtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAnL1Rhc2tEZXRhaWxzLycrbGFzdEtleSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgIHkuZW50ZXJEYXRhSW50b015VGFza0RldGFpbHMobGFzdEtleSx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx5KTtcbiAgICAgICAgICAgICAgICAgICAgICB5LmVudGVyRGF0YUludG9PdGhlclRhc2tEZXRhaWxzKGxhc3RLZXksdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseSk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9O1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9UYXNrRGV0YWlscy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGVudGVyRGF0YUludG9NeVRhc2tEZXRhaWxzKGlkLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuICAgICAgICB2YXIgeT10aGlzO1xuICAgICAgICAvKiogdGVtcG9yYXJ5IHZhbHVlcyBhc3NpZ25lZCBuZWVkIHRvIGNoYWduZSBsYXRlciAqL1xuICAgICAgICB2YXIgcmVjaXBlbnRzQ291bnQ9dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50PTA7XG4gICAgICAgIHZhciBjb21wbGV0aW9uQ291bnQ9MDtcbiAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cz1mYWxzZTtcbiAgICAgICAgdmFyIGlkVGVtcDtcbiAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcyB0b2tlbj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuKTtcblxuICAgICAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgICAgIHZhciBkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWU9Z2V0U3RyaW5nKFwiZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lXCIpO1xuICAgICAgICB2YXIgZGV2aWNlVG9rZW49Z2V0U3RyaW5nKFwiZGV2aWNlVG9rZW5cIik7IFxuICAgICAgIFxuICAgICAgICBcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiaSB2YWx1ZSBpdGVtcz09PT09aT09PT09PT09PVwiK2krXCI9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNbaV0pO1xuICAgICAgICAgICAgbGV0IGluZGV4PWk7XG4gICAgICAgICAgICBpZihpZD09XCIxXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKycvJytcIjFcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yeSc6Y2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICdkdWVEYXRlJzpkYXRlVGltZSxcbiAgICAgICAgICAgICAgICAgICAgJ3JlY2lwZW50c0NvdW50JzpyZWNpcGVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzpyZW1haW5kZXJDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeSc6ZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5UmVnSWQnOmRldmljZVBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAnY29tcGxldGlvbkNvdW50Jzpjb21wbGV0aW9uQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdteUNvbXBsZXRpb25TdGF0dXMnOm15Q29tcGxldGlvblN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVRva2VuJzpkZXZpY2VUb2tlbixcbiAgICAgICAgICAgICAgICAgICAgJ2Fzc2lnbmVlTmFtZSc6dGhpcy5zZWxlY3RlZEl0ZW1zLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzIGZpcnN0IHRpbWUtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgdG9rZW49PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbltpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRQdXNoTm90aWZpY2F0aW9uKHRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuW2luZGV4XSxkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsdGFza05hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgXG4gICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkVsc2UgICBpIHZhbHVlIGl0ZW1zPT09PT1pPT09PT09PT09XCIraStcIj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1tpXSk7XG5cbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKycvJytpZCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5VG9rZW4nOmRldmljZVRva2VuLFxuICAgICAgICAgICAgICAgICAgICAnYXNzaWduZWVOYW1lJzp0aGlzLnNlbGVjdGVkSXRlbXMsXG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj09PUlGPT1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zIHRva2VuPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW5baW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHkuc2VuZFB1c2hOb3RpZmljYXRpb24odGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW5baW5kZXhdLGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSx0YXNrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHkucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IFxuICAgIHB1YmxpYyBzZW5kUHVzaE5vdGlmaWNhdGlvbihhc3NpZ25lZURldmljZVRva2VuLGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSx0YXNrTmFtZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW49PT09XCIrYXNzaWduZWVEZXZpY2VUb2tlbik7XG4gICAgICAgIC8vc2VuZCBwdXNoIG5vdGlmaWNhdGlvblxuICAgICAgICBsZXQgZGF0YT17XG4gICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIk5ldyBUYXNrIFJlY2VpdmVkIVwiLFxuICAgICAgICAgICAgICAgIFwiYm9keVwiOiBkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUrXCIgaGFzIGFzc2lnbmVkIFwiK3Rhc2tOYW1lLFxuICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJ0b1wiOmFzc2lnbmVlRGV2aWNlVG9rZW5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGE9PVwiK0pTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgdGhpcy5teVBvc3RTZXJ2aWNlXG4gICAgICAgIC5wb3N0RGF0YShkYXRhKS5zdWJzY3JpYmUoKHJlcyk9PntcbiAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbWluZGVyIFN1Y2Nlc3NcIik7XG4gICAgICAgIH0sKGVycm9yKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZW1pbmRlciBGYWlsdXJlPT09XCIrZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIGVudGVyRGF0YUludG9PdGhlclRhc2tEZXRhaWxzKGlkLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuICAgICAgICB2YXIgeT10aGlzO1xuICAgICAgICAvKiogdGVtcG9yYXJ5IHZhbHVlcyBhc3NpZ25lZCBuZWVkIHRvIGNoYWduZSBsYXRlciAqL1xuICAgICAgICB2YXIgcmVjaXBlbnRzQ291bnQ9dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50PTA7XG4gICAgICAgIHZhciBjb21wbGV0aW9uQ291bnQ9MDtcbiAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cz1mYWxzZTtcbiAgICAgICAgdmFyIGlkVGVtcDtcbiAgICAgICBcbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICB2YXIgZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lPWdldFN0cmluZyhcImRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZVwiKTtcbiAgICAgICAgdmFyIGRlbGV0aW9uQ291bnQ9MDtcbiAgICAgICAgdmFyIGRldmljZVRva2VuPWdldFN0cmluZyhcImRldmljZVRva2VuXCIpOyBcbiAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vIGZvcih2YXIgaT0wO2k8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICAgIC8vIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImkgdmFsdWUgaXRlbXM9PT09PWk9PT09PT09PT1cIitpK1wiPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKTtcblxuICAgICAgICAgICAgaWYoaWQ9PVwiMVwiKVxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK1wiMVwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6ZGVsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVRva2VuJzpkZXZpY2VUb2tlbiBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiBvdGhlciB0YXNrIGRldGFpbHMgZmlyc3QgdGltZS0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZm9yKHZhciBqPTA7ajx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO2orKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAnT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvMS9Bc3NpZ25lZURldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbal0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhc3NpZ25lZU5hbWUnOnRoaXMuc2VsZWN0ZWRJdGVtc05hbWVbal0sXG4gICAgICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV2aWNlVG9rZW5cIjp0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbltqXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uU3RhdHVzJzpmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRWxzZSAgIGkgdmFsdWUgaXRlbXM9PT09PWk9PT09PT09PT1cIitpK1wiPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKTtcblxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnLycraWQsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yeSc6Y2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICdkdWVEYXRlJzpkYXRlVGltZSxcbiAgICAgICAgICAgICAgICAgICAgJ3JlY2lwZW50c0NvdW50JzpyZWNpcGVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzpyZW1haW5kZXJDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeSc6ZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5UmVnSWQnOmRldmljZVBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAnY29tcGxldGlvbkNvdW50Jzpjb21wbGV0aW9uQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdteUNvbXBsZXRpb25TdGF0dXMnOm15Q29tcGxldGlvblN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgJ2RlbGV0aW9uQ291bnQnOmRlbGV0aW9uQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlUb2tlbic6ZGV2aWNlVG9rZW4gXG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiBvdGhlciB0YXNrIGRldGFpbHMtPT09PT09PT1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgLy8gdGhpcy5nZXRMYXN0Q291bnRBbmRFbnRlckRldGFpbHMoaSx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoLHRoaXMuc2VsZWN0ZWRJdGVtc1tpXSxyZWNpcGVudHNDb3VudCxyZW1haW5kZXJDb3VudCxkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsZGV2aWNlUGhvbmVOdW1iZXIsY29tcGxldGlvbkNvdW50LG15Q29tcGxldGlvblN0YXR1cyx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KSxpO1xuXG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKHZhciBqPTA7ajx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO2orKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09RGV2aWNlIFRva2VuPT09PT09PT09PT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW5bal0pO1xuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgJ090aGVyVGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnLycraWQrJy9Bc3NpZ25lZURldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbal0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhc3NpZ25lZU5hbWUnOnRoaXMuc2VsZWN0ZWRJdGVtc05hbWVbal0sXG4gICAgICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV2aWNlVG9rZW5cIjp0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbltqXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uU3RhdHVzJzpmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL31cbiAgICB9XG4gICAgcHVibGljIGdldExhc3RDb3VudEFuZEVudGVyRGV0YWlscyhpLHNlbGVkdGVkSXRlbXNMZW5ndGgsc2VsZWN0ZWRBc3NpZ25lZSxyZWNpcGVudHNDb3VudCxyZW1haW5kZXJDb3VudCxkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsZGV2aWNlUGhvbmVOdW1iZXIsY29tcGxldGlvbkNvdW50LG15Q29tcGxldGlvblN0YXR1cyx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KVxuICAgIHtcblxuICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGxhc3RLZXk9MDtcbiAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsYXN0S2V5PXBhcnNlSW50KGtleSk7XG4gICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3RLZXk9bGFzdEtleSsxO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICcvTXlUYXNrRGV0YWlscy8nK3NlbGVjdGVkQXNzaWduZWUrJy8nK2xhc3RLZXksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yeSc6Y2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICdkdWVEYXRlJzpkYXRlVGltZSxcbiAgICAgICAgICAgICAgICAgICAgJ3JlY2lwZW50c0NvdW50JzpyZWNpcGVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzpyZW1haW5kZXJDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeSc6ZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5UmVnSWQnOmRldmljZVBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAnY29tcGxldGlvbkNvdW50Jzpjb21wbGV0aW9uQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdteUNvbXBsZXRpb25TdGF0dXMnOm15Q29tcGxldGlvblN0YXR1cyxcbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGk9PXNlbGVkdGVkSXRlbXNMZW5ndGgtMSl7XG4gICAgICAgICAgICAgICAgICAgIHgucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAnL015VGFza0RldGFpbHMvJytzZWxlY3RlZEFzc2lnbmVlKycvJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhpcyB0byB0cnVlIGlmIHlvdSB3YW50IHRvIGNoZWNrIGlmIHRoZSB2YWx1ZSBleGlzdHMgb3IganVzdCB3YW50IHRoZSBldmVudCB0byBmaXJlIG9uY2VcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IGZhbHNlLCBzbyBpdCBsaXN0ZW5zIGNvbnRpbnVvdXNseVxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIC8vIG9yZGVyIGJ5IGNvbXBhbnkuY291bnRyeVxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgLy8gICAgdmFsdWU6ICd0YXNrTmFtZScgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cblxufVxuIl19