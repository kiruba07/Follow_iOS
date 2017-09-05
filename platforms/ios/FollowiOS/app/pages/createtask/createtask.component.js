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
                    'createdByToken': deviceToken
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
                    'createdByToken': deviceToken
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
                // this.getLastCountAndEnterDetails(i,this.selectedItems.length,this.selectedItems[i],recipentsCount,remainderCount,deviceRegisteredUserName,devicePhoneNumber,completionCount,myCompletionStatus,taskName,category,dateTime,x),i;
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
                    'completionStatus': false
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
        providers: [http_post_services_1.MyHttpPostService],
        templateUrl: "pages/createtask/createtask.html",
        styleUrls: ["pages/createtask/createtask-common.css", "pages/createtask/createtask.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page, router_2.RouterExtensions, http_post_services_1.MyHttpPostService])
], CreateTaskComponent);
exports.CreateTaskComponent = CreateTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRldGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGV0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBeUM7QUFDekMsMkNBQTBDO0FBQzFDLHVEQUEwRDtBQUMxRCw2REFVOEI7QUFDOUIsMkVBQXlFO0FBQ3pFLDZEQUE0RDtBQUM1RCw4Q0FBNkM7QUFJN0MsZ0NBQStCO0FBRS9CLHNEQUErRDtBQUMvRCx1RUFBcUU7QUFRckUsSUFBYSxtQkFBbUI7SUFzQjVCLDZCQUFvQixNQUFjLEVBQVMsSUFBVSxFQUFTLGdCQUFrQyxFQUFTLGFBQWdDO1FBQXJILFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQWxCMUksZ0JBQVcsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFDMUIsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1FBQzlCLHVCQUFrQixHQUFVLEVBQUUsQ0FBQztRQU85QixTQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ2YsUUFBRyxHQUFRLEVBQUUsQ0FBQztRQUNkLFNBQUksR0FBUSxFQUFFLENBQUM7UUFDZixTQUFJLEdBQVEsRUFBRSxDQUFDO1FBR2YsVUFBSyxHQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFJYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRSxJQUFJLHVCQUFVLENBQUM7UUFFaEMsSUFBSSxDQUFDLGFBQWEsR0FBQyxJQUFJLDZCQUFhLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxD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TixDQUFDO0lBR0wsMEJBQUM7QUFBRCxDQUFDLEFBbGxCRCxJQWtsQkM7QUFsbEJZLG1CQUFtQjtJQU4vQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsU0FBUyxFQUFFLENBQUMsc0NBQWlCLENBQUM7UUFDOUIsV0FBVyxFQUFFLGtDQUFrQztRQUMvQyxTQUFTLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxpQ0FBaUMsQ0FBQztLQUN6RixDQUFDO3FDQXVCOEIsZUFBTSxFQUFlLFdBQUksRUFBMkIseUJBQWdCLEVBQXdCLHNDQUFpQjtHQXRCaEksbUJBQW1CLENBa2xCL0I7QUFsbEJZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvdXNlclwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdJdGVtcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2xpc3R2aWV3aXRlbXNcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3XCI7XG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSBcInVpL2RhdGUtcGlja2VyXCI7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTXlIdHRwUG9zdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9odHRwLXBvc3Quc2VydmljZXNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICBwcm92aWRlcnM6IFtNeUh0dHBQb3N0U2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2NyZWF0ZXRhc2svY3JlYXRldGFzay5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvY3JlYXRldGFzay9jcmVhdGV0YXNrLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9jcmVhdGV0YXNrL2NyZWF0ZXRhc2suY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIENyZWF0ZVRhc2tDb21wb25lbnRcbntcbiAgLy8gWW91ciBUeXBlU2NyaXB0IGxvZ2ljIGdvZXMgaGVyZVxuICAgdXNlcjogVXNlclxuICAgY29udGFjdExpc3Q9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICBzZWxlY3RlZEl0ZW1zOnN0cmluZ1tdPVtdO1xuICAgc2VsZWN0ZWRJdGVtc05hbWU6c3RyaW5nW109W107XG4gICBzZWxlY3RlZEl0ZW1zVG9rZW46c3RyaW5nW109W107XG4gICBsaXN0Vmlld0l0ZW1zOkxpc3RWaWV3SXRlbXM7XG4gICAgb2JzZXJ2YWJsZTpPYnNlcnZhYmxlXG4gICAgY2hlY2tUcnk7XG4gICAgZGF0ZVBpY2tlclZpZXc6c3RyaW5nO1xuICAgIGJ1dHRvblZpZXc6c3RyaW5nO1xuICAgIFxuICAgIHNob3c6c3RyaW5nPVwiXCI7XG4gICAgZGF5OnN0cmluZz1cIlwiO1xuICAgIHllYXI6c3RyaW5nPVwiXCI7XG4gICAgbW90aDpzdHJpbmc9XCJcIjtcbiAgICBkYXRlUGlja2VydmFsdWU6c3RyaW5nO1xuICAgIHRhc2tGaWVsZDtcbiAgICB0b2RheT1uZXcgRGF0ZSgpO1xuICAgIHBhZ2VUaXRsZTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLHByaXZhdGUgcGFnZTogUGFnZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBteVBvc3RTZXJ2aWNlOiBNeUh0dHBQb3N0U2VydmljZSlcbiAgICB7XG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgICAgIHRoaXMub2JzZXJ2YWJsZT0gbmV3IE9ic2VydmFibGU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxpc3RWaWV3SXRlbXM9bmV3IExpc3RWaWV3SXRlbXM7XG4gICAgICAgIHRoaXMuY29udGFjdExpc3Q9dGhpcy5saXN0Vmlld0l0ZW1zLmdldENvbnRhY3RMaXN0KCk7XG4gICAgICAgIHRoaXMuc2hvdz1cImNvbGxhcHNlXCI7XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXc9XCJjb2xsYXBzZVwiO1xuICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgICAgIHRoaXMuY2hlY2tUcnk9XCJjaGVja1wiO1xuICAgICAgICB0aGlzLnBhZ2VUaXRsZT1cIkNyZWF0ZSBUYXNrXCI7XG4gICAgICAgIFxuICAgIH1cblxuICAgICBwdWJsaWMgZ29CYWNrKCkge1xuICAgICAgICAgY29uc29sZS5sb2coXCJCYWNrIHRhcHBlZFwiKTtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cblxuICAgIGhpZGVEYXRlUGlja2VyKGFyZ3Mpe1xuICAgICAgICBjb25zb2xlLmxvZyhcInRhcHBlZC0tLVwiKTtcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyVmlldyA9ICdjb2xsYXBzZSc7XG4gICAgICAgIHRoaXMuYnV0dG9uVmlldz1cInZpc2libGVcIjtcbiAgICBcbiAgICB9XG4gICAgc2hvd0RhdGVQaWNrZXIoYXJncyl7XG4gICAgICAgaWYodGhpcy5kYXRlUGlja2VyVmlldz09XCJ2aXNpYmxlXCIpe1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyVmlldyA9ICdjb2xsYXBzZSc7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXcgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJjb2xsYXBzZVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZVNvZnRLZXlwYWQoKTtcblxuICAgICAgICBcbiAgICB9XG4gICAgaGlkZVNvZnRLZXlwYWQoKXtcbiAgICAgICAgdmFyIGxheW91dCA9IHRoaXMucGFnZTtcbiAgICAgICAgdmFyIGNhdGVnb3J5RmllbGQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJjYXRlZ29yeVwiKTtcbiAgICAgICAgdmFyIHRhc2tGaWVsZCA9IGxheW91dC5nZXRWaWV3QnlJZChcInRhc2tOYW1lXCIpO1xuICAgICAgICBpZiAoY2F0ZWdvcnlGaWVsZC5pb3MgfHwgdGFza0ZpZWxkLmlvcylcbiAgICAgICAge1xuICAgICAgICAgICAgY2F0ZWdvcnlGaWVsZC5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICAgIHRhc2tGaWVsZC5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICAgZWxzZSBpZiAoY2F0ZWdvcnlGaWVsZC5hbmRyb2lkIHx8IHRhc2tGaWVsZC5hbmRyb2lkIClcbiAgICAgICAge1xuICAgICAgICAgICAgY2F0ZWdvcnlGaWVsZC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgICAgIHRhc2tGaWVsZC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3RBc3NpZ25lZSgpXG4gICAge1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5zaG93PT1cInZpc2libGVcIil7XG4gICAgICAgICAgICB0aGlzLnNob3cgPSAnY29sbGFwc2UnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnNob3cgPSAndmlzaWJsZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRlUGlja2VyVmlldz1cImNvbGxhcHNlXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uVmlldz1cInZpc2libGVcIjtcbiAgICAgICAgdGhpcy5oaWRlU29mdEtleXBhZCgpO1xuICAgICAgICBcbiAgICB9XG4gICAgY2FuY2VsKCl7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgfVxuICAgICBvblBpY2tlckxvYWRlZChhcmdzKSB7XG4gICAgICAgIGxldCBkYXRlUGlja2VyID0gPERhdGVQaWNrZXI+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgXG4gICAgICAgICBsZXQgZGQ9IHRoaXMudG9kYXkuZ2V0RGF5KCk7XG4gICAgICAgIGxldCAgbW0gPSB0aGlzLnRvZGF5LmdldE1vbnRoKCkrMTsgLy9KYW51YXJ5IGlzIDAhXG4gICAgICAgIGxldCB5eXl5ID0gdGhpcy50b2RheS5nZXRGdWxsWWVhcigpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ3VycmVudCBEYXRlID09PT09XCIrZGQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgbW9udGggPT09PT1cIittbSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ3VycmVudCB5ZWFyID09PT09XCIreXl5eSk7XG5cbiAgICAgICAgZGF0ZVBpY2tlci55ZWFyID0geXl5eTtcbiAgICAgICAgIGRhdGVQaWNrZXIubW9udGggPW1tO1xuICAgICAgICAvL2RhdGVQaWNrZXIuZGF5ID1kZDtcblxuICAgICAgICBkYXRlUGlja2VyLm1pbkRhdGUgPSBuZXcgRGF0ZSgxOTc1LCAwLCAyOSk7XG4gICAgICAgIGRhdGVQaWNrZXIubWF4RGF0ZSA9IG5ldyBEYXRlKDIwNDUsIDQsIDEyKTtcblxuICAgICAgICAgdGhpcy5kYXRlUGlja2VydmFsdWU9XCJTZWxlY3QgRW5kIGRhdGVcIjtcbiAgICB9XG5cbiAgICBvbkRhdGVDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBkYXRlVmFsdWU9PERhdGVQaWNrZXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlcnZhbHVlPWRhdGVWYWx1ZS5kYXkrXCIvXCIrZGF0ZVZhbHVlLm1vbnRoK1wiL1wiK2RhdGVWYWx1ZS55ZWFyO1xuICAgICAgXG4gICAgfSAgICBcbiAgICBwdWJsaWMgaXRlbVRhcChpdGVtKVxuICAgIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkl0ZW0gdGFwPS09PT09PT09PVwiK2l0ZW0ubmFtZSk7XG4gICAgICAgIGlmKGl0ZW0uc2VsZWN0ZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tCb3g9XCJcXHV7ZjA5Nn1cIjtcblxuICAgICAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VySXRlbT10aGlzLnNlbGVjdGVkSXRlbXNbaV07XG4gICAgICAgICAgICAgICAgLy92YXIgY3VySXRlbU5hbWU9dGhpcy5zZWxlY3RlZEl0ZW1zTmFtZVtpXVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjdXIgaXRlbS0tLS0nK2N1ckl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmKGN1ckl0ZW09PWl0ZW0ubnVtYmVyKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZGV4IDo6Ojo6OicraSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZS5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW4uc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL3RoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaXRlbS5udW1iZXIsMSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zIGFmdGVyIHNsaWNlPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zKTtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgaXRlbS5jaGVja0JveD1cIlxcdXtmMDQ2fVwiO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbS5udW1iZXIpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZS5wdXNoKGl0ZW0ubmFtZUxhYmVsKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuLnB1c2goaXRlbS5kZXZpY2VUb2tlbik7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQ9IWl0ZW0uc2VsZWN0ZWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXM9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zIHRva2VuPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW4pO1xuICAgICAgICBcblxuXG5cbiAgICB9XG4gICBcbiAgICBcblxuICBwdWJsaWMgYXNzaWduVGFzaygpIFxuICB7XG5cbiAgICB2YXIgeD10aGlzO1xuICAgIHZhciB0YXNrTmFtZT10aGlzLnVzZXIudGFza05hbWU7XG4gICAgdmFyIGNhdGVnb3J5PXRoaXMudXNlci5jYXRlZ29yeTtcbiAgICB2YXIgZGF0ZVRpbWU9dGhpcy51c2VyLmRhdGVUaW1lO1xuICAgLy8gdmFyIGFzc2lnbmVlPXRoaXMudXNlci5hc3NpZ25lZTtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiVGFzayBuYW1lLS0tXCIrdGFza05hbWUpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnktLS1cIitjYXRlZ29yeSk7XG4gICAgIC8vY29uc29sZS5sb2coXCJEYXRlIHRpbWUtLS1cIitkYXRlVGltZSk7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFzc2lnbmVlLS0tXCIrYXNzaWduZWUpO1xuXG4gICAgLy9jaGVjayB0aGUgbGFzdCBrZXkgaW4gVGFza0RldGFpbHMgdGFibGVcbiAgICBpZih0YXNrTmFtZT09bnVsbCB8fCBjYXRlZ29yeT09bnVsbCB8fCB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoPDEgfHwgZGF0ZVRpbWU9PVwiU2VsZWN0IEVuZCBkYXRlXCIpXG4gICAge1xuICAgIGNvbnNvbGUubG9nKFwiRW1wdHkgPT09PT1cIik7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIHZhciBnZXRMYXN0S2V5SW5UYXNLRGV0YWlscyA9IGZ1bmN0aW9uKHJlc3VsdCkgXG4gICAgICAgIHtcblxuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKSBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpPT1cIm51bGxcIilcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB4LmVudGVyRGF0YUludG9UYXNrRGV0YWlscyhcIjFcIix0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcbiAgICAgICAgICAgICAgICAgICAgfSAgIFxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB4LmVudGVyRGF0YUludG9UYXNrRGV0YWlscyhcIm51bGxcIix0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgICAgICAgICBnZXRMYXN0S2V5SW5UYXNLRGV0YWlscyxcbiAgICAgICAgICAgICAgICAnL1Rhc2tEZXRhaWxzLycsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuQ0hJTEQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd0YXNrTmFtZScgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICB9XG4gICAgXG5cbiAgfVxuICAgIHB1YmxpYyBlbnRlckRhdGFJbnRvVGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG4gICAgICAgIHZhciB5PXRoaXM7XG4gICAgICAgICBpZihpZD09XCIxXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgJy9UYXNrRGV0YWlscy8nK2lkLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGRldGFpbHMgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIHRhc2sgZGV0YWlscyBmaXJzdCB0aW1lLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlckRhdGFJbnRvTXlUYXNrRGV0YWlscyhpZCx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlckRhdGFJbnRvT3RoZXJUYXNrRGV0YWlscyhpZCx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IGFscmVhZHkgdGhlcmUgbmVlZCB0byBnZXQgbGFzdCBjb3VudCB2YWx1ZScpXG4gICAgICAgICAgICAgICAgeS5nZXRMYXN0Q291bnRBbmRFbnRlckRldGFpc0luVGFza0RldGFpbHNQYWdlKHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHkpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGdldExhc3RDb3VudEFuZEVudGVyRGV0YWlzSW5UYXNrRGV0YWlsc1BhZ2UodGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG4gICAgICAgIHZhciB5PXRoaXM7XG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsYXN0S2V5PTA7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsYXN0S2V5PXBhcnNlSW50KGtleSk7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3RLZXk9bGFzdEtleSsxO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICcvVGFza0RldGFpbHMvJytsYXN0S2V5LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICAgeS5lbnRlckRhdGFJbnRvTXlUYXNrRGV0YWlscyhsYXN0S2V5LHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHkpO1xuICAgICAgICAgICAgICAgICAgICAgIHkuZW50ZXJEYXRhSW50b090aGVyVGFza0RldGFpbHMobGFzdEtleSx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx5KTtcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAnL1Rhc2tEZXRhaWxzLycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZW50ZXJEYXRhSW50b015VGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG4gICAgICAgIHZhciB5PXRoaXM7XG4gICAgICAgIC8qKiB0ZW1wb3JhcnkgdmFsdWVzIGFzc2lnbmVkIG5lZWQgdG8gY2hhZ25lIGxhdGVyICovXG4gICAgICAgIHZhciByZWNpcGVudHNDb3VudD10aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICAgICAgICB2YXIgcmVtYWluZGVyQ291bnQ9MDtcbiAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudD0wO1xuICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzPWZhbHNlO1xuICAgICAgICB2YXIgaWRUZW1wO1xuICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zIHRva2VuPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW4pO1xuXG4gICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgdmFyIGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZT1nZXRTdHJpbmcoXCJkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcIik7XG4gICAgICAgIHZhciBkZXZpY2VUb2tlbj1nZXRTdHJpbmcoXCJkZXZpY2VUb2tlblwiKTsgXG4gICAgICAgXG4gICAgICAgIFxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJpIHZhbHVlIGl0ZW1zPT09PT1pPT09PT09PT09XCIraStcIj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1tpXSk7XG4gICAgICAgICAgICBsZXQgaW5kZXg9aTtcbiAgICAgICAgICAgIGlmKGlkPT1cIjFcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAnL015VGFza0RldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbaV0rJy8nK1wiMVwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5VG9rZW4nOmRldmljZVRva2VuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzIGZpcnN0IHRpbWUtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgdG9rZW49PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbltpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRQdXNoTm90aWZpY2F0aW9uKHRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuW2luZGV4XSxkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsdGFza05hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRWxzZSAgIGkgdmFsdWUgaXRlbXM9PT09PWk9PT09PT09PT1cIitpK1wiPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKTtcblxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAnL015VGFza0RldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbaV0rJy8nK2lkLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdyZWNpcGVudHNDb3VudCc6cmVjaXBlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVJlZ0lkJzpkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6Y29tcGxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlUb2tlbic6ZGV2aWNlVG9rZW4gXG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj09PUlGPT1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zIHRva2VuPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW5baW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHkuc2VuZFB1c2hOb3RpZmljYXRpb24odGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW5baW5kZXhdLGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSx0YXNrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHkucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgLy8gdGhpcy5nZXRMYXN0Q291bnRBbmRFbnRlckRldGFpbHMoaSx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoLHRoaXMuc2VsZWN0ZWRJdGVtc1tpXSxyZWNpcGVudHNDb3VudCxyZW1haW5kZXJDb3VudCxkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsZGV2aWNlUGhvbmVOdW1iZXIsY29tcGxldGlvbkNvdW50LG15Q29tcGxldGlvblN0YXR1cyx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KSxpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IFxuICAgIHB1YmxpYyBzZW5kUHVzaE5vdGlmaWNhdGlvbihhc3NpZ25lZURldmljZVRva2VuLGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSx0YXNrTmFtZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW49PT09XCIrYXNzaWduZWVEZXZpY2VUb2tlbik7XG4gICAgICAgIC8vc2VuZCBwdXNoIG5vdGlmaWNhdGlvblxuICAgICAgICBsZXQgZGF0YT17XG4gICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIk5ldyBUYXNrIFJlY2VpdmVkIVwiLFxuICAgICAgICAgICAgICAgIFwiYm9keVwiOiBkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUrXCIgaGFzIGFzc2lnbmVkIFwiK3Rhc2tOYW1lLFxuICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJ0b1wiOmFzc2lnbmVlRGV2aWNlVG9rZW5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGE9PVwiK0pTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgdGhpcy5teVBvc3RTZXJ2aWNlXG4gICAgICAgIC5wb3N0RGF0YShkYXRhKS5zdWJzY3JpYmUoKHJlcyk9PntcbiAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbWluZGVyIFN1Y2Nlc3NcIik7XG4gICAgICAgIH0sKGVycm9yKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZW1pbmRlciBGYWlsdXJlPT09XCIrZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIGVudGVyRGF0YUludG9PdGhlclRhc2tEZXRhaWxzKGlkLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuICAgICAgICB2YXIgeT10aGlzO1xuICAgICAgICAvKiogdGVtcG9yYXJ5IHZhbHVlcyBhc3NpZ25lZCBuZWVkIHRvIGNoYWduZSBsYXRlciAqL1xuICAgICAgICB2YXIgcmVjaXBlbnRzQ291bnQ9dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50PTA7XG4gICAgICAgIHZhciBjb21wbGV0aW9uQ291bnQ9MDtcbiAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cz1mYWxzZTtcbiAgICAgICAgdmFyIGlkVGVtcDtcbiAgICAgICBcbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICB2YXIgZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lPWdldFN0cmluZyhcImRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZVwiKTtcbiAgICAgICAgdmFyIGRlbGV0aW9uQ291bnQ9MDtcbiAgICAgICAgdmFyIGRldmljZVRva2VuPWdldFN0cmluZyhcImRldmljZVRva2VuXCIpOyBcbiAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vIGZvcih2YXIgaT0wO2k8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICAgIC8vIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImkgdmFsdWUgaXRlbXM9PT09PWk9PT09PT09PT1cIitpK1wiPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKTtcblxuICAgICAgICAgICAgaWYoaWQ9PVwiMVwiKVxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK1wiMVwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6ZGVsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVRva2VuJzpkZXZpY2VUb2tlbiBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiBvdGhlciB0YXNrIGRldGFpbHMgZmlyc3QgdGltZS0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZm9yKHZhciBqPTA7ajx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO2orKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAnT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvMS9Bc3NpZ25lZURldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbal0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhc3NpZ25lZU5hbWUnOnRoaXMuc2VsZWN0ZWRJdGVtc05hbWVbal0sXG4gICAgICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uU3RhdHVzJzpmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cblxuXG5cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJFbHNlICAgaSB2YWx1ZSBpdGVtcz09PT09aT09PT09PT09PVwiK2krXCI9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNbaV0pO1xuXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytpZCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6ZGVsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVRva2VuJzpkZXZpY2VUb2tlbiBcbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIG90aGVyIHRhc2sgZGV0YWlscy09PT09PT09PVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAvLyB0aGlzLmdldExhc3RDb3VudEFuZEVudGVyRGV0YWlscyhpLHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGgsdGhpcy5zZWxlY3RlZEl0ZW1zW2ldLHJlY2lwZW50c0NvdW50LHJlbWFpbmRlckNvdW50LGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxkZXZpY2VQaG9uZU51bWJlcixjb21wbGV0aW9uQ291bnQsbXlDb21wbGV0aW9uU3RhdHVzLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpLGk7XG4gICAgICAgICAgICBmb3IodmFyIGo9MDtqPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aisrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICdPdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK2lkKycvQXNzaWduZWVEZXRhaWxzLycrdGhpcy5zZWxlY3RlZEl0ZW1zW2pdLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnYXNzaWduZWVOYW1lJzp0aGlzLnNlbGVjdGVkSXRlbXNOYW1lW2pdLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzowLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RlbGV0aW9uQ291bnQnOjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29tcGxldGlvblN0YXR1cyc6ZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL31cbiAgICB9XG4gICAgcHVibGljIGdldExhc3RDb3VudEFuZEVudGVyRGV0YWlscyhpLHNlbGVkdGVkSXRlbXNMZW5ndGgsc2VsZWN0ZWRBc3NpZ25lZSxyZWNpcGVudHNDb3VudCxyZW1haW5kZXJDb3VudCxkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsZGV2aWNlUGhvbmVOdW1iZXIsY29tcGxldGlvbkNvdW50LG15Q29tcGxldGlvblN0YXR1cyx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KVxuICAgIHtcblxuICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGxhc3RLZXk9MDtcbiAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsYXN0S2V5PXBhcnNlSW50KGtleSk7XG4gICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3RLZXk9bGFzdEtleSsxO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICcvTXlUYXNrRGV0YWlscy8nK3NlbGVjdGVkQXNzaWduZWUrJy8nK2xhc3RLZXksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yeSc6Y2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICdkdWVEYXRlJzpkYXRlVGltZSxcbiAgICAgICAgICAgICAgICAgICAgJ3JlY2lwZW50c0NvdW50JzpyZWNpcGVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzpyZW1haW5kZXJDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeSc6ZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5UmVnSWQnOmRldmljZVBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAnY29tcGxldGlvbkNvdW50Jzpjb21wbGV0aW9uQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdteUNvbXBsZXRpb25TdGF0dXMnOm15Q29tcGxldGlvblN0YXR1cyxcbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGk9PXNlbGVkdGVkSXRlbXNMZW5ndGgtMSl7XG4gICAgICAgICAgICAgICAgICAgIHgucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAnL015VGFza0RldGFpbHMvJytzZWxlY3RlZEFzc2lnbmVlKycvJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhpcyB0byB0cnVlIGlmIHlvdSB3YW50IHRvIGNoZWNrIGlmIHRoZSB2YWx1ZSBleGlzdHMgb3IganVzdCB3YW50IHRoZSBldmVudCB0byBmaXJlIG9uY2VcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IGZhbHNlLCBzbyBpdCBsaXN0ZW5zIGNvbnRpbnVvdXNseVxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIC8vIG9yZGVyIGJ5IGNvbXBhbnkuY291bnRyeVxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgLy8gICAgdmFsdWU6ICd0YXNrTmFtZScgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cblxufVxuIl19