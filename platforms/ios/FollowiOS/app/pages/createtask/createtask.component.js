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
        this.categoryListItems = new observable_array_1.ObservableArray([]);
        this.categoryListArray = [];
        this.show = "";
        this.day = "";
        this.year = "";
        this.moth = "";
        this.today = new Date();
        this.user = new user_1.User();
        this.observable = new observable_1.Observable;
        this.selectedCategory = "";
        this.listViewItems = new listviewitems_1.ListViewItems;
        this.contactList = this.listViewItems.getContactList();
        this.show = "collapse";
        this.datePickerView = "collapse";
        this.buttonView = "visible";
        this.checkTry = "check";
        this.pageTitle = "Create Task";
    }
    CreateTaskComponent.prototype.ngOnInit = function () {
        console.log("onit");
        this.categoryListArray = this.listViewItems.getCategoryListForCreateTask();
        this.categoryListArray.push("Default");
        // for(let i=0;i<this.categoryListItems.length;i++)
        // {
        //     console.log("this.categoryListItems.getItem(i).category===="+this.categoryListItems.getItem(i).category);
        //     this.categoryListArray.push(this.categoryListItems.getItem(i).category);
        // }
        // console.log("Category List Array========"+this.categoryListArray);
    };
    CreateTaskComponent.prototype.goBack = function () {
        console.log("Back tapped");
        this.routerExtensions.backToPreviousPage();
    };
    CreateTaskComponent.prototype.onchange = function (args) {
        console.log("Drop Down selected index changed from " + args.oldIndex + " to " + args.newIndex);
        var newIndex = args.newIndex;
        this.selectedCategory = this.categoryListArray[newIndex];
        console.log("selectedCategory++++++" + this.selectedCategory);
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
        var category = this.selectedCategory;
        var dateTime = this.user.dateTime;
        // var assignee=this.user.assignee;
        // console.log("Task name---"+taskName);
        console.log("Category---" + category);
        //console.log("Date time---"+dateTime);
        //console.log("Assignee---"+assignee);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRldGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGV0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBeUM7QUFDekMsMkNBQTBDO0FBQzFDLHVEQUEwRDtBQUMxRCw2REFVOEI7QUFDOUIsMkVBQXlFO0FBQ3pFLDZEQUE0RDtBQUM1RCw4Q0FBNkM7QUFJN0MsZ0NBQStCO0FBRS9CLHNEQUErRDtBQUMvRCx1RUFBcUU7QUFRckUsSUFBYSxtQkFBbUI7SUEwQjVCLDZCQUFvQixNQUFjLEVBQVMsSUFBVSxFQUFTLGdCQUFrQyxFQUFTLGFBQWdDO1FBQXJILFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQXJCMUksZ0JBQVcsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFDMUIsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1FBQzlCLHVCQUFrQixHQUFVLEVBQUUsQ0FBQztRQUMvQixzQkFBaUIsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1FBUTdCLFNBQUksR0FBUSxFQUFFLENBQUM7UUFDZixRQUFHLEdBQVEsRUFBRSxDQUFDO1FBQ2QsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUNmLFNBQUksR0FBUSxFQUFFLENBQUM7UUFHZixVQUFLLEdBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUliLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFFLElBQUksdUJBQVUsQ0FBQztRQUNoQyxJQUFJLENBQUMsZ0JBQWdC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dEM7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0lBR0wsMEJBQUM7QUFBRCxDQUFDLEFBaG9CRCxJQWdvQkM7QUFob0JZLG1CQUFtQjtJQU4vQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsU0FBUyxFQUFFLENBQUMsc0NBQWlCLENBQUM7UUFDOUIsV0FBVyxFQUFFLGtDQUFrQztRQUMvQyxTQUFTLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxpQ0FBaUMsQ0FBQztLQUN6RixDQUFDO3FDQTJCOEIsZUFBTSxFQUFlLFdBQUksRUFBMkIseUJBQWdCLEVBQXdCLHNDQUFpQjtHQTFCaEksbUJBQW1CLENBZ29CL0I7QUFob0JZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL3VzZXJcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IExpc3RWaWV3SXRlbXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9saXN0dmlld2l0ZW1zXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlld1wiO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gXCJ1aS9kYXRlLXBpY2tlclwiO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBNeUh0dHBQb3N0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2h0dHAtcG9zdC5zZXJ2aWNlc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHByb3ZpZGVyczogW015SHR0cFBvc3RTZXJ2aWNlXSxcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvY3JlYXRldGFzay9jcmVhdGV0YXNrLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9jcmVhdGV0YXNrL2NyZWF0ZXRhc2stY29tbW9uLmNzc1wiLCBcInBhZ2VzL2NyZWF0ZXRhc2svY3JlYXRldGFzay5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQ3JlYXRlVGFza0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxuXG57XG4gIC8vIFlvdXIgVHlwZVNjcmlwdCBsb2dpYyBnb2VzIGhlcmVcbiAgIHVzZXI6IFVzZXJcbiAgIGNvbnRhY3RMaXN0PW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgc2VsZWN0ZWRJdGVtczpzdHJpbmdbXT1bXTtcbiAgIHNlbGVjdGVkSXRlbXNOYW1lOnN0cmluZ1tdPVtdO1xuICAgc2VsZWN0ZWRJdGVtc1Rva2VuOnN0cmluZ1tdPVtdO1xuICAgY2F0ZWdvcnlMaXN0SXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICBjYXRlZ29yeUxpc3RBcnJheTpzdHJpbmdbXT1bXTtcbiAgIGxpc3RWaWV3SXRlbXM6TGlzdFZpZXdJdGVtcztcbiAgICBvYnNlcnZhYmxlOk9ic2VydmFibGVcbiAgICBjaGVja1RyeTtcbiAgICBkYXRlUGlja2VyVmlldzpzdHJpbmc7XG4gICAgYnV0dG9uVmlldzpzdHJpbmc7XG4gICAgc2VsZWN0ZWRDYXRlZ29yeTpzdHJpbmc7XG4gICAgXG4gICAgc2hvdzpzdHJpbmc9XCJcIjtcbiAgICBkYXk6c3RyaW5nPVwiXCI7XG4gICAgeWVhcjpzdHJpbmc9XCJcIjtcbiAgICBtb3RoOnN0cmluZz1cIlwiO1xuICAgIGRhdGVQaWNrZXJ2YWx1ZTpzdHJpbmc7XG4gICAgdGFza0ZpZWxkO1xuICAgIHRvZGF5PW5ldyBEYXRlKCk7XG4gICAgcGFnZVRpdGxlO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSBwYWdlOiBQYWdlLHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxwcml2YXRlIG15UG9zdFNlcnZpY2U6IE15SHR0cFBvc3RTZXJ2aWNlKVxuICAgIHtcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgICAgICAgdGhpcy5vYnNlcnZhYmxlPSBuZXcgT2JzZXJ2YWJsZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5PVwiXCI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxpc3RWaWV3SXRlbXM9bmV3IExpc3RWaWV3SXRlbXM7XG4gICAgICAgIHRoaXMuY29udGFjdExpc3Q9dGhpcy5saXN0Vmlld0l0ZW1zLmdldENvbnRhY3RMaXN0KCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgXG5cbiAgICAgICAgdGhpcy5zaG93PVwiY29sbGFwc2VcIjtcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyVmlldz1cImNvbGxhcHNlXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uVmlldz1cInZpc2libGVcIjtcbiAgICAgICAgdGhpcy5jaGVja1RyeT1cImNoZWNrXCI7XG4gICAgICAgIHRoaXMucGFnZVRpdGxlPVwiQ3JlYXRlIFRhc2tcIjtcbiAgICAgICAgXG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uaXRcIik7XG4gICAgICAgIHRoaXMuY2F0ZWdvcnlMaXN0QXJyYXk9dGhpcy5saXN0Vmlld0l0ZW1zLmdldENhdGVnb3J5TGlzdEZvckNyZWF0ZVRhc2soKTtcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3RBcnJheS5wdXNoKFwiRGVmYXVsdFwiKTtcbiAgICAgICAgLy8gZm9yKGxldCBpPTA7aTx0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwidGhpcy5jYXRlZ29yeUxpc3RJdGVtcy5nZXRJdGVtKGkpLmNhdGVnb3J5PT09PVwiK3RoaXMuY2F0ZWdvcnlMaXN0SXRlbXMuZ2V0SXRlbShpKS5jYXRlZ29yeSk7XG4gICAgICAgIC8vICAgICB0aGlzLmNhdGVnb3J5TGlzdEFycmF5LnB1c2godGhpcy5jYXRlZ29yeUxpc3RJdGVtcy5nZXRJdGVtKGkpLmNhdGVnb3J5KTtcbiAgICAgICAgICBcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IExpc3QgQXJyYXk9PT09PT09PVwiK3RoaXMuY2F0ZWdvcnlMaXN0QXJyYXkpO1xuICAgIH1cblxuXG4gICAgIHB1YmxpYyBnb0JhY2soKSB7XG4gICAgICAgICBjb25zb2xlLmxvZyhcIkJhY2sgdGFwcGVkXCIpO1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XG4gICAgfVxuICAgIHB1YmxpYyBvbmNoYW5nZShhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSlcbiAgICB7XG5cbiAgICAgICAgY29uc29sZS5sb2coYERyb3AgRG93biBzZWxlY3RlZCBpbmRleCBjaGFuZ2VkIGZyb20gJHthcmdzLm9sZEluZGV4fSB0byAke2FyZ3MubmV3SW5kZXh9YCk7XG4gICAgICAgIGxldCBuZXdJbmRleDpudW1iZXI9YXJncy5uZXdJbmRleDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5PXRoaXMuY2F0ZWdvcnlMaXN0QXJyYXlbbmV3SW5kZXhdO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkQ2F0ZWdvcnkrKysrKytcIit0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpO1xuXG5cbiAgICB9XG4gICAgaGlkZURhdGVQaWNrZXIoYXJncyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGFwcGVkLS0tXCIpO1xuICAgICAgICB0aGlzLmRhdGVQaWNrZXJWaWV3ID0gJ2NvbGxhcHNlJztcbiAgICAgICAgdGhpcy5idXR0b25WaWV3PVwidmlzaWJsZVwiO1xuICAgIFxuICAgIH1cbiAgICBzaG93RGF0ZVBpY2tlcihhcmdzKXtcbiAgICAgICBpZih0aGlzLmRhdGVQaWNrZXJWaWV3PT1cInZpc2libGVcIil7XG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJWaWV3ID0gJ2NvbGxhcHNlJztcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uVmlldz1cInZpc2libGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyVmlldyA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uVmlldz1cImNvbGxhcHNlXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRlU29mdEtleXBhZCgpO1xuXG4gICAgICAgIFxuICAgIH1cbiAgICBoaWRlU29mdEtleXBhZCgpe1xuICAgICAgICB2YXIgbGF5b3V0ID0gdGhpcy5wYWdlO1xuICAgICAgICB2YXIgY2F0ZWdvcnlGaWVsZCA9IGxheW91dC5nZXRWaWV3QnlJZChcImNhdGVnb3J5XCIpO1xuICAgICAgICB2YXIgdGFza0ZpZWxkID0gbGF5b3V0LmdldFZpZXdCeUlkKFwidGFza05hbWVcIik7XG4gICAgICAgIGlmIChjYXRlZ29yeUZpZWxkLmlvcyB8fCB0YXNrRmllbGQuaW9zKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXRlZ29yeUZpZWxkLmlvcy5lbmRFZGl0aW5nKHRydWUpO1xuICAgICAgICAgICAgdGFza0ZpZWxkLmlvcy5lbmRFZGl0aW5nKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgICBlbHNlIGlmIChjYXRlZ29yeUZpZWxkLmFuZHJvaWQgfHwgdGFza0ZpZWxkLmFuZHJvaWQgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXRlZ29yeUZpZWxkLmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICAgICAgdGFza0ZpZWxkLmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNlbGVjdEFzc2lnbmVlKClcbiAgICB7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLnNob3c9PVwidmlzaWJsZVwiKXtcbiAgICAgICAgICAgIHRoaXMuc2hvdyA9ICdjb2xsYXBzZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc2hvdyA9ICd2aXNpYmxlJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGVQaWNrZXJWaWV3PVwiY29sbGFwc2VcIjtcbiAgICAgICAgdGhpcy5idXR0b25WaWV3PVwidmlzaWJsZVwiO1xuICAgICAgICB0aGlzLmhpZGVTb2Z0S2V5cGFkKCk7XG4gICAgICAgIFxuICAgIH1cbiAgICBjYW5jZWwoKXtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICB9XG4gICAgIG9uUGlja2VyTG9hZGVkKGFyZ3MpIHtcbiAgICAgICAgbGV0IGRhdGVQaWNrZXIgPSA8RGF0ZVBpY2tlcj5hcmdzLm9iamVjdDtcblxuICAgICAgICBcbiAgICAgICAgIGxldCBkZD0gdGhpcy50b2RheS5nZXREYXkoKTtcbiAgICAgICAgbGV0ICBtbSA9IHRoaXMudG9kYXkuZ2V0TW9udGgoKSsxOyAvL0phbnVhcnkgaXMgMCFcbiAgICAgICAgbGV0IHl5eXkgPSB0aGlzLnRvZGF5LmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IERhdGUgPT09PT1cIitkZCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ3VycmVudCBtb250aCA9PT09PVwiK21tKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IHllYXIgPT09PT1cIit5eXl5KTtcblxuICAgICAgICBkYXRlUGlja2VyLnllYXIgPSB5eXl5O1xuICAgICAgICAgZGF0ZVBpY2tlci5tb250aCA9bW07XG4gICAgICAgIC8vZGF0ZVBpY2tlci5kYXkgPWRkO1xuXG4gICAgICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IG5ldyBEYXRlKDE5NzUsIDAsIDI5KTtcbiAgICAgICAgZGF0ZVBpY2tlci5tYXhEYXRlID0gbmV3IERhdGUoMjA0NSwgNCwgMTIpO1xuXG4gICAgICAgICB0aGlzLmRhdGVQaWNrZXJ2YWx1ZT1cIlNlbGVjdCBFbmQgZGF0ZVwiO1xuICAgIH1cblxuICAgIG9uRGF0ZUNoYW5nZWQoYXJncykge1xuICAgICAgICBcbiAgICAgICAgbGV0IGRhdGVWYWx1ZT08RGF0ZVBpY2tlcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5kYXRlUGlja2VydmFsdWU9ZGF0ZVZhbHVlLmRheStcIi9cIitkYXRlVmFsdWUubW9udGgrXCIvXCIrZGF0ZVZhbHVlLnllYXI7XG4gICAgICBcbiAgICB9ICAgIFxuICAgIHB1YmxpYyBpdGVtVGFwKGl0ZW0pXG4gICAge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiSXRlbSB0YXA9LT09PT09PT09XCIraXRlbS5uYW1lKTtcbiAgICAgICAgaWYoaXRlbS5zZWxlY3RlZClcbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbS5jaGVja0JveD1cIlxcdXtmMDk2fVwiO1xuXG4gICAgICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBjdXJJdGVtPXRoaXMuc2VsZWN0ZWRJdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAvL3ZhciBjdXJJdGVtTmFtZT10aGlzLnNlbGVjdGVkSXRlbXNOYW1lW2ldXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2N1ciBpdGVtLS0tLScrY3VySXRlbSk7XG4gICAgICAgICAgICAgICAgaWYoY3VySXRlbT09aXRlbS5udW1iZXIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW5kZXggOjo6Ojo6JytpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNOYW1lLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbi5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vdGhpcy5zZWxlY3RlZEl0ZW1zLnNwbGljZShpdGVtLm51bWJlciwxKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgYWZ0ZXIgc2xpY2U9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXMpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICBpdGVtLmNoZWNrQm94PVwiXFx1e2YwNDZ9XCI7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtLm51bWJlcik7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNOYW1lLnB1c2goaXRlbS5uYW1lTGFiZWwpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW4ucHVzaChpdGVtLmRldmljZVRva2VuKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS5zZWxlY3RlZD0haXRlbS5zZWxlY3RlZDtcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcz09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgdG9rZW49PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbik7XG4gICAgICAgIFxuXG5cblxuICAgIH1cbiAgIFxuICAgIFxuXG4gIHB1YmxpYyBhc3NpZ25UYXNrKCkgXG4gIHtcblxuICAgIHZhciB4PXRoaXM7XG4gICAgdmFyIHRhc2tOYW1lPXRoaXMudXNlci50YXNrTmFtZTtcbiAgICB2YXIgY2F0ZWdvcnk9dGhpcy5zZWxlY3RlZENhdGVnb3J5O1xuICAgIHZhciBkYXRlVGltZT10aGlzLnVzZXIuZGF0ZVRpbWU7XG4gICAvLyB2YXIgYXNzaWduZWU9dGhpcy51c2VyLmFzc2lnbmVlO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJUYXNrIG5hbWUtLS1cIit0YXNrTmFtZSk7XG4gICAgY29uc29sZS5sb2coXCJDYXRlZ29yeS0tLVwiK2NhdGVnb3J5KTtcbiAgICAgLy9jb25zb2xlLmxvZyhcIkRhdGUgdGltZS0tLVwiK2RhdGVUaW1lKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQXNzaWduZWUtLS1cIithc3NpZ25lZSk7XG5cbiAgICBcbiAgICBpZih0YXNrTmFtZT09bnVsbCB8fCBjYXRlZ29yeT09bnVsbCB8fCB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoPDEgfHwgZGF0ZVRpbWU9PVwiU2VsZWN0IEVuZCBkYXRlXCIpXG4gICAge1xuICAgIGNvbnNvbGUubG9nKFwiRW1wdHkgPT09PT1cIik7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIHZhciBnZXRMYXN0S2V5SW5UYXNLRGV0YWlscyA9IGZ1bmN0aW9uKHJlc3VsdCkgXG4gICAgICAgIHtcblxuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKSBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpPT1cIm51bGxcIilcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB4LmVudGVyRGF0YUludG9UYXNrRGV0YWlscyhcIjFcIix0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcbiAgICAgICAgICAgICAgICAgICAgfSAgIFxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB4LmVudGVyRGF0YUludG9UYXNrRGV0YWlscyhcIm51bGxcIix0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgICAgICAgICBnZXRMYXN0S2V5SW5UYXNLRGV0YWlscyxcbiAgICAgICAgICAgICAgICAnL1Rhc2tEZXRhaWxzLycsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuQ0hJTEQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd0YXNrTmFtZScgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICB9XG4gICAgXG5cbiAgfVxuICAgIHB1YmxpYyBlbnRlckRhdGFJbnRvVGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG4gICAgICAgIHZhciB5PXRoaXM7XG4gICAgICAgICBpZihpZD09XCIxXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgJy9UYXNrRGV0YWlscy8nK2lkLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGRldGFpbHMgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIHRhc2sgZGV0YWlscyBmaXJzdCB0aW1lLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlckRhdGFJbnRvTXlUYXNrRGV0YWlscyhpZCx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlckRhdGFJbnRvT3RoZXJUYXNrRGV0YWlscyhpZCx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IGFscmVhZHkgdGhlcmUgbmVlZCB0byBnZXQgbGFzdCBjb3VudCB2YWx1ZScpXG4gICAgICAgICAgICAgICAgeS5nZXRMYXN0Q291bnRBbmRFbnRlckRldGFpc0luVGFza0RldGFpbHNQYWdlKHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHkpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGdldExhc3RDb3VudEFuZEVudGVyRGV0YWlzSW5UYXNrRGV0YWlsc1BhZ2UodGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG4gICAgICAgIHZhciB5PXRoaXM7XG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsYXN0S2V5PTA7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsYXN0S2V5PXBhcnNlSW50KGtleSk7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3RLZXk9bGFzdEtleSsxO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICcvVGFza0RldGFpbHMvJytsYXN0S2V5LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICAgeS5lbnRlckRhdGFJbnRvTXlUYXNrRGV0YWlscyhsYXN0S2V5LHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHkpO1xuICAgICAgICAgICAgICAgICAgICAgIHkuZW50ZXJEYXRhSW50b090aGVyVGFza0RldGFpbHMobGFzdEtleSx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx5KTtcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAnL1Rhc2tEZXRhaWxzLycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZW50ZXJEYXRhSW50b015VGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG4gICAgICAgIHZhciB5PXRoaXM7XG4gICAgICAgIC8qKiB0ZW1wb3JhcnkgdmFsdWVzIGFzc2lnbmVkIG5lZWQgdG8gY2hhZ25lIGxhdGVyICovXG4gICAgICAgIHZhciByZWNpcGVudHNDb3VudD10aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICAgICAgICB2YXIgcmVtYWluZGVyQ291bnQ9MDtcbiAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudD0wO1xuICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzPWZhbHNlO1xuICAgICAgICB2YXIgaWRUZW1wO1xuICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zIHRva2VuPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW4pO1xuXG4gICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgdmFyIGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZT1nZXRTdHJpbmcoXCJkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcIik7XG4gICAgICAgIHZhciBkZXZpY2VUb2tlbj1nZXRTdHJpbmcoXCJkZXZpY2VUb2tlblwiKTsgXG4gICAgICAgXG4gICAgICAgIFxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJpIHZhbHVlIGl0ZW1zPT09PT1pPT09PT09PT09XCIraStcIj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1tpXSk7XG4gICAgICAgICAgICBsZXQgaW5kZXg9aTtcbiAgICAgICAgICAgIGlmKGlkPT1cIjFcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAnL015VGFza0RldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbaV0rJy8nK1wiMVwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5VG9rZW4nOmRldmljZVRva2VuLFxuICAgICAgICAgICAgICAgICAgICAnYXNzaWduZWVOYW1lJzp0aGlzLnNlbGVjdGVkSXRlbXMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiBteSB0YXNrIGRldGFpbHMgZmlyc3QgdGltZS0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcyB0b2tlbj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZFB1c2hOb3RpZmljYXRpb24odGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW5baW5kZXhdLGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSx0YXNrTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBcbiAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRWxzZSAgIGkgdmFsdWUgaXRlbXM9PT09PWk9PT09PT09PT1cIitpK1wiPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKTtcblxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAnL015VGFza0RldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbaV0rJy8nK2lkLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdyZWNpcGVudHNDb3VudCc6cmVjaXBlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVJlZ0lkJzpkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6Y29tcGxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlUb2tlbic6ZGV2aWNlVG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICdhc3NpZ25lZU5hbWUnOnRoaXMuc2VsZWN0ZWRJdGVtcyxcbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09SUY9PVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgdG9rZW49PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbltpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgeS5zZW5kUHVzaE5vdGlmaWNhdGlvbih0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbltpbmRleF0sZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLHRhc2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgeS5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gXG4gICAgcHVibGljIHNlbmRQdXNoTm90aWZpY2F0aW9uKGFzc2lnbmVlRGV2aWNlVG9rZW4sZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLHRhc2tOYW1lKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZ1wiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJUb2tlbj09PT1cIithc3NpZ25lZURldmljZVRva2VuKTtcbiAgICAgICAgLy9zZW5kIHB1c2ggbm90aWZpY2F0aW9uXG4gICAgICAgIGxldCBkYXRhPXtcbiAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiTmV3IFRhc2sgUmVjZWl2ZWQhXCIsXG4gICAgICAgICAgICAgICAgXCJib2R5XCI6IGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZStcIiBoYXMgYXNzaWduZWQgXCIrdGFza05hbWUsXG4gICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInRvXCI6YXNzaWduZWVEZXZpY2VUb2tlblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YT09XCIrSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICB0aGlzLm15UG9zdFNlcnZpY2VcbiAgICAgICAgLnBvc3REYXRhKGRhdGEpLnN1YnNjcmliZSgocmVzKT0+e1xuICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVtaW5kZXIgU3VjY2Vzc1wiKTtcbiAgICAgICAgfSwoZXJyb3IpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbWluZGVyIEZhaWx1cmU9PT1cIitlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgZW50ZXJEYXRhSW50b090aGVyVGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG4gICAgICAgIHZhciB5PXRoaXM7XG4gICAgICAgIC8qKiB0ZW1wb3JhcnkgdmFsdWVzIGFzc2lnbmVkIG5lZWQgdG8gY2hhZ25lIGxhdGVyICovXG4gICAgICAgIHZhciByZWNpcGVudHNDb3VudD10aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICAgICAgICB2YXIgcmVtYWluZGVyQ291bnQ9MDtcbiAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudD0wO1xuICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzPWZhbHNlO1xuICAgICAgICB2YXIgaWRUZW1wO1xuICAgICAgIFxuICAgICAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgICAgIHZhciBkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWU9Z2V0U3RyaW5nKFwiZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lXCIpO1xuICAgICAgICB2YXIgZGVsZXRpb25Db3VudD0wO1xuICAgICAgICB2YXIgZGV2aWNlVG9rZW49Z2V0U3RyaW5nKFwiZGV2aWNlVG9rZW5cIik7IFxuICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLy8gZm9yKHZhciBpPTA7aTx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO2krKylcbiAgICAgICAgLy8ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiaSB2YWx1ZSBpdGVtcz09PT09aT09PT09PT09PVwiK2krXCI9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNbaV0pO1xuXG4gICAgICAgICAgICBpZihpZD09XCIxXCIpXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnLycrXCIxXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdyZWNpcGVudHNDb3VudCc6cmVjaXBlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVJlZ0lkJzpkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6Y29tcGxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICdkZWxldGlvbkNvdW50JzpkZWxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5VG9rZW4nOmRldmljZVRva2VuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIG90aGVyIHRhc2sgZGV0YWlscyBmaXJzdCB0aW1lLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmb3IodmFyIGo9MDtqPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aisrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICdPdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8xL0Fzc2lnbmVlRGV0YWlscy8nK3RoaXMuc2VsZWN0ZWRJdGVtc1tqXSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Fzc2lnbmVlTmFtZSc6dGhpcy5zZWxlY3RlZEl0ZW1zTmFtZVtqXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkZWxldGlvbkNvdW50JzowLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXZpY2VUb2tlblwiOnRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuW2pdLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25TdGF0dXMnOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cblxuXG5cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJFbHNlICAgaSB2YWx1ZSBpdGVtcz09PT09aT09PT09PT09PVwiK2krXCI9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNbaV0pO1xuXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytpZCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6ZGVsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVRva2VuJzpkZXZpY2VUb2tlbiBcbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIG90aGVyIHRhc2sgZGV0YWlscy09PT09PT09PVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAvLyB0aGlzLmdldExhc3RDb3VudEFuZEVudGVyRGV0YWlscyhpLHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGgsdGhpcy5zZWxlY3RlZEl0ZW1zW2ldLHJlY2lwZW50c0NvdW50LHJlbWFpbmRlckNvdW50LGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxkZXZpY2VQaG9uZU51bWJlcixjb21wbGV0aW9uQ291bnQsbXlDb21wbGV0aW9uU3RhdHVzLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpLGk7XG5cblxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IodmFyIGo9MDtqPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aisrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT1EZXZpY2UgVG9rZW49PT09PT09PT09PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbltqXSk7XG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAnT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytpZCsnL0Fzc2lnbmVlRGV0YWlscy8nK3RoaXMuc2VsZWN0ZWRJdGVtc1tqXSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Fzc2lnbmVlTmFtZSc6dGhpcy5zZWxlY3RlZEl0ZW1zTmFtZVtqXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkZWxldGlvbkNvdW50JzowLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXZpY2VUb2tlblwiOnRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuW2pdLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25TdGF0dXMnOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vfVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0TGFzdENvdW50QW5kRW50ZXJEZXRhaWxzKGksc2VsZWR0ZWRJdGVtc0xlbmd0aCxzZWxlY3RlZEFzc2lnbmVlLHJlY2lwZW50c0NvdW50LHJlbWFpbmRlckNvdW50LGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxkZXZpY2VQaG9uZU51bWJlcixjb21wbGV0aW9uQ291bnQsbXlDb21wbGV0aW9uU3RhdHVzLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuXG4gICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbGFzdEtleT0wO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxhc3RLZXk9cGFyc2VJbnQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFzdEtleT1sYXN0S2V5KzE7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycrc2VsZWN0ZWRBc3NpZ25lZSsnLycrbGFzdEtleSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaT09c2VsZWR0ZWRJdGVtc0xlbmd0aC0xKXtcbiAgICAgICAgICAgICAgICAgICAgeC5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvTXlUYXNrRGV0YWlscy8nK3NlbGVjdGVkQXNzaWduZWUrJy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGV4aXN0cyBvciBqdXN0IHdhbnQgdGhlIGV2ZW50IHRvIGZpcmUgb25jZVxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgZmFsc2UsIHNvIGl0IGxpc3RlbnMgY29udGludW91c2x5XG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICAvLyAgICB2YWx1ZTogJ3Rhc2tOYW1lJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuXG59XG4iXX0=