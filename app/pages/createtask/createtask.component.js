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
        this.contactGroupList = new observable_array_1.ObservableArray([]);
        this.selectedItems = [];
        this.selectedItemsName = [];
        this.selectedItemsToken = [];
        this.selectedItemsGroupArray = [];
        this.selectedItemsIndividualArray = [];
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
        // this.contactList=this.listViewItems.getContactList();
        this.contactList = this.listViewItems.getContactListWithGroup();
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
        var currentItemArray = [];
        if (item.selected) {
            item.checkBox = "\uF096";
            //new code starts
            for (var i = 0; i < item.number.split(",").length; i++) {
                if (item.number.split(",")[i].split("G")[1]) {
                    //this.selectedItems.push(item.number.split(",")[i].split("G")[1]);
                    // currentItemArray.push(item.number.split(",")[i].split("G")[1]);
                    for (var j = 0; j < this.selectedItems.length; j++) {
                        var loopNumber = this.selectedItems[j];
                        //console.log('cur item----'+loopNumber);
                        if (this.selectedItemsIndividualArray.indexOf(loopNumber) > -1) {
                            this.selectedItemsGroupArray.splice(j, 1);
                        }
                        else if (loopNumber == item.number.split(",")[i].split("G")[1]) {
                            this.selectedItems.splice(j, 1);
                            this.selectedItemsName.splice(j, 1);
                            this.selectedItemsToken.splice(j, 1);
                            this.selectedItemsGroupArray.splice(j, 1);
                        }
                    }
                }
                else {
                    //this.selectedItems.push(item.number.split(",")[i]);
                    // currentItemArray.push(item.number.split(",")[i]);
                    for (var j = 0; j < this.selectedItems.length; j++) {
                        var loopNumber = this.selectedItems[j];
                        //console.log('cur item----'+loopNumber);
                        if (this.selectedItemsGroupArray.indexOf(loopNumber) > -1) {
                            this.selectedItemsIndividualArray.splice(j, 1);
                        }
                        else if (loopNumber == item.number) {
                            this.selectedItems.splice(j, 1);
                            this.selectedItemsName.splice(j, 1);
                            this.selectedItemsToken.splice(j, 1);
                            this.selectedItemsIndividualArray.splice(j, 1);
                        }
                    }
                }
            }
            //new code ends
            // original code starts
            // for(var i=0;i<this.selectedItems.length;i++)
            // {
            //     var loopNumber=this.selectedItems[i];
            //     //new code starts
            //     console.log('cur item----'+loopNumber);
            //     if(currentItemArray.indexOf(loopNumber) > -1){
            //         console.log("IF");
            //     }
            //     else{
            //         console.log("ELSE");
            //     }
            //     //new code ends
            //     if(loopNumber==item.number)
            //     {
            //         this.selectedItems.splice(i,1);
            //         this.selectedItemsName.splice(i,1);
            //         this.selectedItemsToken.splice(i,1);
            //     }
            // }
            // original code ends
            //this.selectedItems.splice(item.number,1);
            //console.log("Selected items after slice======"+this.selectedItems);
        }
        else {
            item.checkBox = "\uF046";
            for (var i = 0; i < item.number.split(",").length; i++) {
                if (item.number.split(",")[i].split("G")[1]) {
                    this.selectedItems.push(item.number.split(",")[i].split("G")[1]);
                    this.selectedItemsGroupArray.push(item.number.split(",")[i].split("G")[1]);
                }
                else {
                    this.selectedItems.push(item.number.split(",")[i]);
                    this.selectedItemsIndividualArray.push(item.number.split(",")[i]);
                }
            }
            for (var i = 0; i < item.nameLabel.split(",").length; i++) {
                this.selectedItemsName.push(item.nameLabel.split(",")[i]);
            }
            for (var i = 0; i < item.deviceToken.split(",").length; i++) {
                this.selectedItemsToken.push(item.deviceToken.split(",")[i]);
            }
            //original code starts
            // this.selectedItems.push(item.number);
            //this.selectedItemsName.push(item.nameLabel);
            //this.selectedItemsToken.push(item.deviceToken);
            //original code ends
        }
        item.selected = !item.selected;
        //new code starts
        this.selectedItems = this.selectedItems.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
        this.selectedItemsName = this.selectedItemsName.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
        this.selectedItemsToken = this.selectedItemsToken.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
        //new code ends
        //console.log("Check======"+arr);
        console.log("Selected items======" + this.selectedItems);
        console.log("Selected items Name======" + this.selectedItemsName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRldGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGV0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBeUM7QUFDekMsMkNBQTBDO0FBQzFDLHVEQUEwRDtBQUMxRCw2REFVOEI7QUFDOUIsMkVBQXlFO0FBQ3pFLDZEQUE0RDtBQUM1RCw4Q0FBNkM7QUFJN0MsZ0NBQStCO0FBRS9CLHNEQUErRDtBQUMvRCx1RUFBcUU7QUFRckUsSUFBYSxtQkFBbUI7SUE2QjVCLDZCQUFvQixNQUFjLEVBQVMsSUFBVSxFQUFTLGdCQUFrQyxFQUFTLGFBQWdDO1FBQXJILFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQXhCMUksZ0JBQVcsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMscUJBQWdCLEdBQUMsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBQzFCLHNCQUFpQixHQUFVLEVBQUUsQ0FBQztRQUM5Qix1QkFBa0IsR0FBVSxFQUFFLENBQUM7UUFDL0IsNEJBQXVCLEdBQVUsRUFBRSxDQUFDO1FBQ3BDLGlDQUE0QixHQUFVLEVBQUUsQ0FBQztRQUN6QyxzQkFBaUIsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1FBUTdCLFNBQUksR0FBUSxFQUFFLENBQUM7UUFDZixRQUFHLEdBQVEsRUFBRSxDQUFDO1FBQ2QsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUNmLFNBQUksR0FBUSxFQUFFLENBQUM7UUFHZixVQUFLLEdBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUli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QUUsa0NBQWtDO1FBQy9DLFNBQVMsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLGlDQUFpQyxDQUFDO0tBQ3pGLENBQUM7cUNBOEI4QixlQUFNLEVBQWUsV0FBSSxFQUEyQix5QkFBZ0IsRUFBd0Isc0NBQWlCO0dBN0JoSSxtQkFBbUIsQ0Fnd0IvQjtBQWh3Qlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvdXNlclwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdJdGVtcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2xpc3R2aWV3aXRlbXNcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3XCI7XG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSBcInVpL2RhdGUtcGlja2VyXCI7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE15SHR0cFBvc3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvaHR0cC1wb3N0LnNlcnZpY2VzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgcHJvdmlkZXJzOiBbTXlIdHRwUG9zdFNlcnZpY2VdLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9jcmVhdGV0YXNrL2NyZWF0ZXRhc2suaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2NyZWF0ZXRhc2svY3JlYXRldGFzay1jb21tb24uY3NzXCIsIFwicGFnZXMvY3JlYXRldGFzay9jcmVhdGV0YXNrLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBDcmVhdGVUYXNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0XG5cbntcbiAgLy8gWW91ciBUeXBlU2NyaXB0IGxvZ2ljIGdvZXMgaGVyZVxuICAgdXNlcjogVXNlclxuICAgY29udGFjdExpc3Q9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICBjb250YWN0R3JvdXBMaXN0PW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgc2VsZWN0ZWRJdGVtczpzdHJpbmdbXT1bXTtcbiAgIHNlbGVjdGVkSXRlbXNOYW1lOnN0cmluZ1tdPVtdO1xuICAgc2VsZWN0ZWRJdGVtc1Rva2VuOnN0cmluZ1tdPVtdO1xuICAgc2VsZWN0ZWRJdGVtc0dyb3VwQXJyYXk6c3RyaW5nW109W107XG4gICBzZWxlY3RlZEl0ZW1zSW5kaXZpZHVhbEFycmF5OnN0cmluZ1tdPVtdO1xuICAgY2F0ZWdvcnlMaXN0SXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICBjYXRlZ29yeUxpc3RBcnJheTpzdHJpbmdbXT1bXTtcbiAgIGxpc3RWaWV3SXRlbXM6TGlzdFZpZXdJdGVtcztcbiAgICBvYnNlcnZhYmxlOk9ic2VydmFibGVcbiAgICBjaGVja1RyeTtcbiAgICBkYXRlUGlja2VyVmlldzpzdHJpbmc7XG4gICAgYnV0dG9uVmlldzpzdHJpbmc7XG4gICAgc2VsZWN0ZWRDYXRlZ29yeTpzdHJpbmc7XG4gICAgXG4gICAgc2hvdzpzdHJpbmc9XCJcIjtcbiAgICBkYXk6c3RyaW5nPVwiXCI7XG4gICAgeWVhcjpzdHJpbmc9XCJcIjtcbiAgICBtb3RoOnN0cmluZz1cIlwiO1xuICAgIGRhdGVQaWNrZXJ2YWx1ZTpzdHJpbmc7XG4gICAgdGFza0ZpZWxkO1xuICAgIHRvZGF5PW5ldyBEYXRlKCk7XG4gICAgcGFnZVRpdGxlO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSBwYWdlOiBQYWdlLHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxwcml2YXRlIG15UG9zdFNlcnZpY2U6IE15SHR0cFBvc3RTZXJ2aWNlKVxuICAgIHtcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgICAgICAgdGhpcy5vYnNlcnZhYmxlPSBuZXcgT2JzZXJ2YWJsZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5PVwiXCI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxpc3RWaWV3SXRlbXM9bmV3IExpc3RWaWV3SXRlbXM7XG4gICAgICAgLy8gdGhpcy5jb250YWN0TGlzdD10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0Q29udGFjdExpc3QoKTtcbiAgICAgICAgdGhpcy5jb250YWN0TGlzdD10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0Q29udGFjdExpc3RXaXRoR3JvdXAoKTtcblxuICAgICAgICB0aGlzLnNob3c9XCJjb2xsYXBzZVwiO1xuICAgICAgICB0aGlzLmRhdGVQaWNrZXJWaWV3PVwiY29sbGFwc2VcIjtcbiAgICAgICAgdGhpcy5idXR0b25WaWV3PVwidmlzaWJsZVwiO1xuICAgICAgICB0aGlzLmNoZWNrVHJ5PVwiY2hlY2tcIjtcbiAgICAgICAgdGhpcy5wYWdlVGl0bGU9XCJDcmVhdGUgVGFza1wiO1xuICAgICAgICBcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25pdFwiKTtcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3RBcnJheT10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0Q2F0ZWdvcnlMaXN0Rm9yQ3JlYXRlVGFzaygpO1xuICAgICAgICB0aGlzLmNhdGVnb3J5TGlzdEFycmF5LnB1c2goXCJEZWZhdWx0XCIpO1xuICAgICAgICAvLyBmb3IobGV0IGk9MDtpPHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMubGVuZ3RoO2krKylcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJ0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmdldEl0ZW0oaSkuY2F0ZWdvcnk9PT09XCIrdGhpcy5jYXRlZ29yeUxpc3RJdGVtcy5nZXRJdGVtKGkpLmNhdGVnb3J5KTtcbiAgICAgICAgLy8gICAgIHRoaXMuY2F0ZWdvcnlMaXN0QXJyYXkucHVzaCh0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmdldEl0ZW0oaSkuY2F0ZWdvcnkpO1xuICAgICAgICAgIFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgTGlzdCBBcnJheT09PT09PT09XCIrdGhpcy5jYXRlZ29yeUxpc3RBcnJheSk7XG4gICAgfVxuXG5cbiAgICAgcHVibGljIGdvQmFjaygpIHtcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFjayB0YXBwZWRcIik7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG4gICAgcHVibGljIG9uY2hhbmdlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKVxuICAgIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgZnJvbSAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH1gKTtcbiAgICAgICAgbGV0IG5ld0luZGV4Om51bWJlcj1hcmdzLm5ld0luZGV4O1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnk9dGhpcy5jYXRlZ29yeUxpc3RBcnJheVtuZXdJbmRleF07XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0ZWRDYXRlZ29yeSsrKysrK1wiK3RoaXMuc2VsZWN0ZWRDYXRlZ29yeSk7XG5cblxuICAgIH1cbiAgICBoaWRlRGF0ZVBpY2tlcihhcmdzKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0YXBwZWQtLS1cIik7XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXcgPSAnY29sbGFwc2UnO1xuICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgXG4gICAgfVxuICAgIHNob3dEYXRlUGlja2VyKGFyZ3Mpe1xuICAgICAgIGlmKHRoaXMuZGF0ZVBpY2tlclZpZXc9PVwidmlzaWJsZVwiKXtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXcgPSAnY29sbGFwc2UnO1xuICAgICAgICAgICAgdGhpcy5idXR0b25WaWV3PVwidmlzaWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJWaWV3ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgdGhpcy5idXR0b25WaWV3PVwiY29sbGFwc2VcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGVTb2Z0S2V5cGFkKCk7XG5cbiAgICAgICAgXG4gICAgfVxuICAgIGhpZGVTb2Z0S2V5cGFkKCl7XG4gICAgICAgIHZhciBsYXlvdXQgPSB0aGlzLnBhZ2U7XG4gICAgICAgIHZhciBjYXRlZ29yeUZpZWxkID0gbGF5b3V0LmdldFZpZXdCeUlkKFwiY2F0ZWdvcnlcIik7XG4gICAgICAgIHZhciB0YXNrRmllbGQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJ0YXNrTmFtZVwiKTtcbiAgICAgICAgaWYgKGNhdGVnb3J5RmllbGQuaW9zIHx8IHRhc2tGaWVsZC5pb3MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3J5RmllbGQuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgICAgICB0YXNrRmllbGQuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgIGVsc2UgaWYgKGNhdGVnb3J5RmllbGQuYW5kcm9pZCB8fCB0YXNrRmllbGQuYW5kcm9pZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3J5RmllbGQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgICAgICB0YXNrRmllbGQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VsZWN0QXNzaWduZWUoKVxuICAgIHtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuc2hvdz09XCJ2aXNpYmxlXCIpe1xuICAgICAgICAgICAgdGhpcy5zaG93ID0gJ2NvbGxhcHNlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zaG93ID0gJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXc9XCJjb2xsYXBzZVwiO1xuICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgICAgIHRoaXMuaGlkZVNvZnRLZXlwYWQoKTtcbiAgICAgICAgXG4gICAgfVxuICAgIGNhbmNlbCgpe1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL21haW5mcmFnbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG91dGxldHM6IHsgbXl0YXNrb3V0bGV0OiBbJ215dGFzayddIH0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgIH1cbiAgICAgb25QaWNrZXJMb2FkZWQoYXJncykge1xuICAgICAgICBsZXQgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIFxuICAgICAgICAgbGV0IGRkPSB0aGlzLnRvZGF5LmdldERheSgpO1xuICAgICAgICBsZXQgIG1tID0gdGhpcy50b2RheS5nZXRNb250aCgpKzE7IC8vSmFudWFyeSBpcyAwIVxuICAgICAgICBsZXQgeXl5eSA9IHRoaXMudG9kYXkuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgRGF0ZSA9PT09PVwiK2RkKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IG1vbnRoID09PT09XCIrbW0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgeWVhciA9PT09PVwiK3l5eXkpO1xuXG4gICAgICAgIGRhdGVQaWNrZXIueWVhciA9IHl5eXk7XG4gICAgICAgICBkYXRlUGlja2VyLm1vbnRoID1tbTtcbiAgICAgICAgLy9kYXRlUGlja2VyLmRheSA9ZGQ7XG5cbiAgICAgICAgZGF0ZVBpY2tlci5taW5EYXRlID0gbmV3IERhdGUoMTk3NSwgMCwgMjkpO1xuICAgICAgICBkYXRlUGlja2VyLm1heERhdGUgPSBuZXcgRGF0ZSgyMDQ1LCA0LCAxMik7XG5cbiAgICAgICAgIHRoaXMuZGF0ZVBpY2tlcnZhbHVlPVwiU2VsZWN0IEVuZCBkYXRlXCI7XG4gICAgfVxuXG4gICAgb25EYXRlQ2hhbmdlZChhcmdzKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgZGF0ZVZhbHVlPTxEYXRlUGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLmRhdGVQaWNrZXJ2YWx1ZT1kYXRlVmFsdWUuZGF5K1wiL1wiK2RhdGVWYWx1ZS5tb250aCtcIi9cIitkYXRlVmFsdWUueWVhcjtcbiAgICAgIFxuICAgIH0gICAgXG4gICAgcHVibGljIGl0ZW1UYXAoaXRlbSlcbiAgICB7XG4gICAgICAgIFxuICAgICAgICBsZXQgY3VycmVudEl0ZW1BcnJheTpzdHJpbmdbXT1bXTtcbiAgICAgICAgaWYoaXRlbS5zZWxlY3RlZClcbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbS5jaGVja0JveD1cIlxcdXtmMDk2fVwiO1xuXG4gICAgICAgICAgICAvL25ldyBjb2RlIHN0YXJ0c1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxpdGVtLm51bWJlci5zcGxpdChcIixcIikubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihpdGVtLm51bWJlci5zcGxpdChcIixcIilbaV0uc3BsaXQoXCJHXCIpWzFdKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtLm51bWJlci5zcGxpdChcIixcIilbaV0uc3BsaXQoXCJHXCIpWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgLy8gY3VycmVudEl0ZW1BcnJheS5wdXNoKGl0ZW0ubnVtYmVyLnNwbGl0KFwiLFwiKVtpXS5zcGxpdChcIkdcIilbMV0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaj0wO2o8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtqKyspXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvb3BOdW1iZXI9dGhpcy5zZWxlY3RlZEl0ZW1zW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2N1ciBpdGVtLS0tLScrbG9vcE51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZEl0ZW1zSW5kaXZpZHVhbEFycmF5LmluZGV4T2YobG9vcE51bWJlcik+LTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNHcm91cEFycmF5LnNwbGljZShqLDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobG9vcE51bWJlcj09aXRlbS5udW1iZXIuc3BsaXQoXCIsXCIpW2ldLnNwbGl0KFwiR1wiKVsxXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaiwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZS5zcGxpY2UoaiwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW4uc3BsaWNlKGosMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zR3JvdXBBcnJheS5zcGxpY2UoaiwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtLm51bWJlci5zcGxpdChcIixcIilbaV0pO1xuICAgICAgICAgICAgICAgICAgIC8vIGN1cnJlbnRJdGVtQXJyYXkucHVzaChpdGVtLm51bWJlci5zcGxpdChcIixcIilbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqPTA7ajx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO2orKylcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbG9vcE51bWJlcj10aGlzLnNlbGVjdGVkSXRlbXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY3VyIGl0ZW0tLS0tJytsb29wTnVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkSXRlbXNHcm91cEFycmF5LmluZGV4T2YobG9vcE51bWJlcik+LTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNJbmRpdmlkdWFsQXJyYXkuc3BsaWNlKGosMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihsb29wTnVtYmVyPT1pdGVtLm51bWJlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaiwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZS5zcGxpY2UoaiwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW4uc3BsaWNlKGosMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zSW5kaXZpZHVhbEFycmF5LnNwbGljZShqLDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL25ldyBjb2RlIGVuZHNcbiAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgIC8vIG9yaWdpbmFsIGNvZGUgc3RhcnRzXG4gICAgICAgICAgICAvLyBmb3IodmFyIGk9MDtpPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgLy8gICAgIHZhciBsb29wTnVtYmVyPXRoaXMuc2VsZWN0ZWRJdGVtc1tpXTtcbiAgICAgICAgICAgIC8vICAgICAvL25ldyBjb2RlIHN0YXJ0c1xuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdjdXIgaXRlbS0tLS0nK2xvb3BOdW1iZXIpO1xuICAgICAgICAgICAgLy8gICAgIGlmKGN1cnJlbnRJdGVtQXJyYXkuaW5kZXhPZihsb29wTnVtYmVyKSA+IC0xKXtcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJJRlwiKTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyAgICAgZWxzZXtcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJFTFNFXCIpO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vICAgICAvL25ldyBjb2RlIGVuZHNcblxuICAgICAgICAgICAgLy8gICAgIGlmKGxvb3BOdW1iZXI9PWl0ZW0ubnVtYmVyKVxuICAgICAgICAgICAgLy8gICAgIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNOYW1lLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbi5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAvLyBvcmlnaW5hbCBjb2RlIGVuZHNcblxuXG4gICAgICAgICAgICAvL3RoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaXRlbS5udW1iZXIsMSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgYWZ0ZXIgc2xpY2U9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXMpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICBpdGVtLmNoZWNrQm94PVwiXFx1e2YwNDZ9XCI7XG5cbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPGl0ZW0ubnVtYmVyLnNwbGl0KFwiLFwiKS5sZW5ndGg7aSsrKVxuICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgaWYoaXRlbS5udW1iZXIuc3BsaXQoXCIsXCIpW2ldLnNwbGl0KFwiR1wiKVsxXSlcbiAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbS5udW1iZXIuc3BsaXQoXCIsXCIpW2ldLnNwbGl0KFwiR1wiKVsxXSk7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNHcm91cEFycmF5LnB1c2goaXRlbS5udW1iZXIuc3BsaXQoXCIsXCIpW2ldLnNwbGl0KFwiR1wiKVsxXSk7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0ubnVtYmVyLnNwbGl0KFwiLFwiKVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNJbmRpdmlkdWFsQXJyYXkucHVzaChpdGVtLm51bWJlci5zcGxpdChcIixcIilbaV0pO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPGl0ZW0ubmFtZUxhYmVsLnNwbGl0KFwiLFwiKS5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZS5wdXNoKGl0ZW0ubmFtZUxhYmVsLnNwbGl0KFwiLFwiKVtpXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxpdGVtLmRldmljZVRva2VuLnNwbGl0KFwiLFwiKS5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuLnB1c2goaXRlbS5kZXZpY2VUb2tlbi5zcGxpdChcIixcIilbaV0pO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL29yaWdpbmFsIGNvZGUgc3RhcnRzXG4gICAgICAgICAgIC8vIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0ubnVtYmVyKTtcbiAgICAgICAgICAgIC8vdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZS5wdXNoKGl0ZW0ubmFtZUxhYmVsKTtcbiAgICAgICAgICAgIC8vdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW4ucHVzaChpdGVtLmRldmljZVRva2VuKTtcbiAgICAgICAgICAgIC8vb3JpZ2luYWwgY29kZSBlbmRzXG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQ9IWl0ZW0uc2VsZWN0ZWQ7XG5cbiAgICAgICBcbiAgICAgICAgLy9uZXcgY29kZSBzdGFydHNcbiAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5maWx0ZXIoZnVuY3Rpb24oZWxlbSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgICAgICAgICByZXR1cm4gaW5kZXggPT0gc2VsZi5pbmRleE9mKGVsZW0pO1xuICAgICAgICAgfSlcblxuICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZSA9IHRoaXMuc2VsZWN0ZWRJdGVtc05hbWUuZmlsdGVyKGZ1bmN0aW9uKGVsZW0sIGluZGV4LCBzZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPT0gc2VsZi5pbmRleE9mKGVsZW0pO1xuICAgICAgICB9KVxuXG4gICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbiA9IHRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuLmZpbHRlcihmdW5jdGlvbihlbGVtLCBpbmRleCwgc2VsZikge1xuICAgICAgICAgICAgIHJldHVybiBpbmRleCA9PSBzZWxmLmluZGV4T2YoZWxlbSk7XG4gICAgICAgICB9KVxuICAgICAgICAgLy9uZXcgY29kZSBlbmRzXG5cblxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2hlY2s9PT09PT1cIithcnIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcyBOYW1lPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgdG9rZW49PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbik7XG4gICAgICAgIFxuXG5cblxuICAgIH1cbiAgIFxuICAgIFxuXG4gIHB1YmxpYyBhc3NpZ25UYXNrKCkgXG4gIHtcblxuICAgIHZhciB4PXRoaXM7XG4gICAgdmFyIHRhc2tOYW1lPXRoaXMudXNlci50YXNrTmFtZTtcbiAgICB2YXIgY2F0ZWdvcnk9dGhpcy5zZWxlY3RlZENhdGVnb3J5O1xuICAgIHZhciBkYXRlVGltZT10aGlzLnVzZXIuZGF0ZVRpbWU7XG4gICAvLyB2YXIgYXNzaWduZWU9dGhpcy51c2VyLmFzc2lnbmVlO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJUYXNrIG5hbWUtLS1cIit0YXNrTmFtZSk7XG4gICAgY29uc29sZS5sb2coXCJDYXRlZ29yeS0tLVwiK2NhdGVnb3J5KTtcbiAgICAgLy9jb25zb2xlLmxvZyhcIkRhdGUgdGltZS0tLVwiK2RhdGVUaW1lKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQXNzaWduZWUtLS1cIithc3NpZ25lZSk7XG5cbiAgICBcbiAgICBpZih0YXNrTmFtZT09bnVsbCB8fCBjYXRlZ29yeT09bnVsbCB8fCB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoPDEgfHwgZGF0ZVRpbWU9PVwiU2VsZWN0IEVuZCBkYXRlXCIpXG4gICAge1xuICAgIGNvbnNvbGUubG9nKFwiRW1wdHkgPT09PT1cIik7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIHZhciBnZXRMYXN0S2V5SW5UYXNLRGV0YWlscyA9IGZ1bmN0aW9uKHJlc3VsdCkgXG4gICAgICAgIHtcblxuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKSBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpPT1cIm51bGxcIilcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB4LmVudGVyRGF0YUludG9UYXNrRGV0YWlscyhcIjFcIix0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcbiAgICAgICAgICAgICAgICAgICAgfSAgIFxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB4LmVudGVyRGF0YUludG9UYXNrRGV0YWlscyhcIm51bGxcIix0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgICAgICAgICBnZXRMYXN0S2V5SW5UYXNLRGV0YWlscyxcbiAgICAgICAgICAgICAgICAnL1Rhc2tEZXRhaWxzLycsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuQ0hJTEQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd0YXNrTmFtZScgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICB9XG4gICAgXG5cbiAgfVxuICAgIHB1YmxpYyBlbnRlckRhdGFJbnRvVGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG4gICAgICAgIHZhciB5PXRoaXM7XG4gICAgICAgICBpZihpZD09XCIxXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgJy9UYXNrRGV0YWlscy8nK2lkLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGRldGFpbHMgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIHRhc2sgZGV0YWlscyBmaXJzdCB0aW1lLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlckRhdGFJbnRvTXlUYXNrRGV0YWlscyhpZCx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlckRhdGFJbnRvT3RoZXJUYXNrRGV0YWlscyhpZCx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IGFscmVhZHkgdGhlcmUgbmVlZCB0byBnZXQgbGFzdCBjb3VudCB2YWx1ZScpXG4gICAgICAgICAgICAgICAgeS5nZXRMYXN0Q291bnRBbmRFbnRlckRldGFpc0luVGFza0RldGFpbHNQYWdlKHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHkpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGdldExhc3RDb3VudEFuZEVudGVyRGV0YWlzSW5UYXNrRGV0YWlsc1BhZ2UodGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG4gICAgICAgIHZhciB5PXRoaXM7XG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsYXN0S2V5PTA7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsYXN0S2V5PXBhcnNlSW50KGtleSk7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3RLZXk9bGFzdEtleSsxO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICcvVGFza0RldGFpbHMvJytsYXN0S2V5LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICAgeS5lbnRlckRhdGFJbnRvTXlUYXNrRGV0YWlscyhsYXN0S2V5LHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHkpO1xuICAgICAgICAgICAgICAgICAgICAgIHkuZW50ZXJEYXRhSW50b090aGVyVGFza0RldGFpbHMobGFzdEtleSx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx5KTtcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAnL1Rhc2tEZXRhaWxzLycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZW50ZXJEYXRhSW50b015VGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG4gICAgICAgIHZhciB5PXRoaXM7XG4gICAgICAgIC8qKiB0ZW1wb3JhcnkgdmFsdWVzIGFzc2lnbmVkIG5lZWQgdG8gY2hhZ25lIGxhdGVyICovXG4gICAgICAgIHZhciByZWNpcGVudHNDb3VudD10aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICAgICAgICB2YXIgcmVtYWluZGVyQ291bnQ9MDtcbiAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudD0wO1xuICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzPWZhbHNlO1xuICAgICAgICB2YXIgaWRUZW1wO1xuICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zIHRva2VuPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW4pO1xuXG4gICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgdmFyIGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZT1nZXRTdHJpbmcoXCJkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcIik7XG4gICAgICAgIHZhciBkZXZpY2VUb2tlbj1nZXRTdHJpbmcoXCJkZXZpY2VUb2tlblwiKTsgXG4gICAgICAgXG4gICAgICAgIFxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJpIHZhbHVlIGl0ZW1zPT09PT1pPT09PT09PT09XCIraStcIj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1tpXSk7XG4gICAgICAgICAgICBsZXQgaW5kZXg9aTtcbiAgICAgICAgICAgIGlmKGlkPT1cIjFcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAnL015VGFza0RldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbaV0rJy8nK1wiMVwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5VG9rZW4nOmRldmljZVRva2VuLFxuICAgICAgICAgICAgICAgICAgICAnYXNzaWduZWVOYW1lJzp0aGlzLnNlbGVjdGVkSXRlbXMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiBteSB0YXNrIGRldGFpbHMgZmlyc3QgdGltZS0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcyB0b2tlbj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZFB1c2hOb3RpZmljYXRpb24odGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW5baW5kZXhdLGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSx0YXNrTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBcbiAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRWxzZSAgIGkgdmFsdWUgaXRlbXM9PT09PWk9PT09PT09PT1cIitpK1wiPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKTtcblxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAnL015VGFza0RldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbaV0rJy8nK2lkLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdyZWNpcGVudHNDb3VudCc6cmVjaXBlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVJlZ0lkJzpkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6Y29tcGxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlUb2tlbic6ZGV2aWNlVG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICdhc3NpZ25lZU5hbWUnOnRoaXMuc2VsZWN0ZWRJdGVtcyxcbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09SUY9PVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgdG9rZW49PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbltpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgeS5zZW5kUHVzaE5vdGlmaWNhdGlvbih0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbltpbmRleF0sZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLHRhc2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgeS5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gXG4gICAgcHVibGljIHNlbmRQdXNoTm90aWZpY2F0aW9uKGFzc2lnbmVlRGV2aWNlVG9rZW4sZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLHRhc2tOYW1lKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZ1wiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJUb2tlbj09PT1cIithc3NpZ25lZURldmljZVRva2VuKTtcbiAgICAgICAgLy9zZW5kIHB1c2ggbm90aWZpY2F0aW9uXG4gICAgICAgIGxldCBkYXRhPXtcbiAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiTmV3IFRhc2sgUmVjZWl2ZWQhXCIsXG4gICAgICAgICAgICAgICAgXCJib2R5XCI6IGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZStcIiBoYXMgYXNzaWduZWQgXCIrdGFza05hbWUsXG4gICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInRvXCI6YXNzaWduZWVEZXZpY2VUb2tlblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YT09XCIrSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICB0aGlzLm15UG9zdFNlcnZpY2VcbiAgICAgICAgLnBvc3REYXRhKGRhdGEpLnN1YnNjcmliZSgocmVzKT0+e1xuICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVtaW5kZXIgU3VjY2Vzc1wiKTtcbiAgICAgICAgfSwoZXJyb3IpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbWluZGVyIEZhaWx1cmU9PT1cIitlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgZW50ZXJEYXRhSW50b090aGVyVGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG4gICAgICAgIHZhciB5PXRoaXM7XG4gICAgICAgIC8qKiB0ZW1wb3JhcnkgdmFsdWVzIGFzc2lnbmVkIG5lZWQgdG8gY2hhZ25lIGxhdGVyICovXG4gICAgICAgIHZhciByZWNpcGVudHNDb3VudD10aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICAgICAgICB2YXIgcmVtYWluZGVyQ291bnQ9MDtcbiAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudD0wO1xuICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzPWZhbHNlO1xuICAgICAgICB2YXIgaWRUZW1wO1xuICAgICAgIFxuICAgICAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgICAgIHZhciBkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWU9Z2V0U3RyaW5nKFwiZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lXCIpO1xuICAgICAgICB2YXIgZGVsZXRpb25Db3VudD0wO1xuICAgICAgICB2YXIgZGV2aWNlVG9rZW49Z2V0U3RyaW5nKFwiZGV2aWNlVG9rZW5cIik7IFxuICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLy8gZm9yKHZhciBpPTA7aTx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO2krKylcbiAgICAgICAgLy8ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiaSB2YWx1ZSBpdGVtcz09PT09aT09PT09PT09PVwiK2krXCI9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNbaV0pO1xuXG4gICAgICAgICAgICBpZihpZD09XCIxXCIpXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnLycrXCIxXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdyZWNpcGVudHNDb3VudCc6cmVjaXBlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVJlZ0lkJzpkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6Y29tcGxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICdkZWxldGlvbkNvdW50JzpkZWxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5VG9rZW4nOmRldmljZVRva2VuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIG90aGVyIHRhc2sgZGV0YWlscyBmaXJzdCB0aW1lLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmb3IodmFyIGo9MDtqPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aisrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICdPdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8xL0Fzc2lnbmVlRGV0YWlscy8nK3RoaXMuc2VsZWN0ZWRJdGVtc1tqXSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Fzc2lnbmVlTmFtZSc6dGhpcy5zZWxlY3RlZEl0ZW1zTmFtZVtqXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkZWxldGlvbkNvdW50JzowLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXZpY2VUb2tlblwiOnRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuW2pdLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25TdGF0dXMnOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cblxuXG5cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJFbHNlICAgaSB2YWx1ZSBpdGVtcz09PT09aT09PT09PT09PVwiK2krXCI9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNbaV0pO1xuXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytpZCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6ZGVsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVRva2VuJzpkZXZpY2VUb2tlbiBcbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIG90aGVyIHRhc2sgZGV0YWlscy09PT09PT09PVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAvLyB0aGlzLmdldExhc3RDb3VudEFuZEVudGVyRGV0YWlscyhpLHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGgsdGhpcy5zZWxlY3RlZEl0ZW1zW2ldLHJlY2lwZW50c0NvdW50LHJlbWFpbmRlckNvdW50LGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxkZXZpY2VQaG9uZU51bWJlcixjb21wbGV0aW9uQ291bnQsbXlDb21wbGV0aW9uU3RhdHVzLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpLGk7XG5cblxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IodmFyIGo9MDtqPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aisrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT1EZXZpY2UgVG9rZW49PT09PT09PT09PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbltqXSk7XG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAnT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytpZCsnL0Fzc2lnbmVlRGV0YWlscy8nK3RoaXMuc2VsZWN0ZWRJdGVtc1tqXSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Fzc2lnbmVlTmFtZSc6dGhpcy5zZWxlY3RlZEl0ZW1zTmFtZVtqXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkZWxldGlvbkNvdW50JzowLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXZpY2VUb2tlblwiOnRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuW2pdLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25TdGF0dXMnOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vfVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0TGFzdENvdW50QW5kRW50ZXJEZXRhaWxzKGksc2VsZWR0ZWRJdGVtc0xlbmd0aCxzZWxlY3RlZEFzc2lnbmVlLHJlY2lwZW50c0NvdW50LHJlbWFpbmRlckNvdW50LGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxkZXZpY2VQaG9uZU51bWJlcixjb21wbGV0aW9uQ291bnQsbXlDb21wbGV0aW9uU3RhdHVzLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuXG4gICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbGFzdEtleT0wO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxhc3RLZXk9cGFyc2VJbnQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFzdEtleT1sYXN0S2V5KzE7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycrc2VsZWN0ZWRBc3NpZ25lZSsnLycrbGFzdEtleSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaT09c2VsZWR0ZWRJdGVtc0xlbmd0aC0xKXtcbiAgICAgICAgICAgICAgICAgICAgeC5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvTXlUYXNrRGV0YWlscy8nK3NlbGVjdGVkQXNzaWduZWUrJy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGV4aXN0cyBvciBqdXN0IHdhbnQgdGhlIGV2ZW50IHRvIGZpcmUgb25jZVxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgZmFsc2UsIHNvIGl0IGxpc3RlbnMgY29udGludW91c2x5XG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICAvLyAgICB2YWx1ZTogJ3Rhc2tOYW1lJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuXG59XG4iXX0=