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
                    'deletionCount': 0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRldGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGV0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBeUM7QUFDekMsMkNBQTBDO0FBQzFDLHVEQUEwRDtBQUMxRCw2REFVOEI7QUFDOUIsMkVBQXlFO0FBQ3pFLDZEQUE0RDtBQUM1RCw4Q0FBNkM7QUFJN0MsZ0NBQStCO0FBRS9CLHNEQUErRDtBQVEvRCxJQUFhLG1CQUFtQjtJQW9CNUIsNkJBQW9CLE1BQWMsRUFBUyxJQUFVLEVBQVMsZ0JBQWtDO1FBQTVFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWhCakcsZ0JBQVcsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFDMUIsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1FBTzdCLFNBQUksR0FBUSxFQUFFLENBQUM7UUFDZixRQUFHLEdBQVEsRUFBRSxDQUFDO1FBQ2QsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUNmLFNBQUksR0FBUSxFQUFFLENBQUM7UUFHZixVQUFLLEdBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUdiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFFLElBQUksdUJBQVUsQ0FBQztRQUVoQyxJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksNkJBQWEsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLElBQUksR0FBQyxVQUFVLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBQyxVQUFVLENBQUM7UUFD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QVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO2FBRXRDO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUdMLDBCQUFDO0FBQUQsQ0FBQyxBQS9oQkQsSUEraEJDO0FBL2hCWSxtQkFBbUI7SUFML0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxrQ0FBa0M7UUFDL0MsU0FBUyxFQUFFLENBQUMsd0NBQXdDLEVBQUUsaUNBQWlDLENBQUM7S0FDekYsQ0FBQztxQ0FxQjhCLGVBQU0sRUFBZSxXQUFJLEVBQTJCLHlCQUFnQjtHQXBCdkYsbUJBQW1CLENBK2hCL0I7QUEvaEJZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvdXNlclwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdJdGVtcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2xpc3R2aWV3aXRlbXNcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3XCI7XG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSBcInVpL2RhdGUtcGlja2VyXCI7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvY3JlYXRldGFzay9jcmVhdGV0YXNrLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9jcmVhdGV0YXNrL2NyZWF0ZXRhc2stY29tbW9uLmNzc1wiLCBcInBhZ2VzL2NyZWF0ZXRhc2svY3JlYXRldGFzay5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQ3JlYXRlVGFza0NvbXBvbmVudFxue1xuICAvLyBZb3VyIFR5cGVTY3JpcHQgbG9naWMgZ29lcyBoZXJlXG4gICB1c2VyOiBVc2VyXG4gICBjb250YWN0TGlzdD1uZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgIHNlbGVjdGVkSXRlbXM6c3RyaW5nW109W107XG4gICBzZWxlY3RlZEl0ZW1zTmFtZTpzdHJpbmdbXT1bXTtcbiAgIGxpc3RWaWV3SXRlbXM6TGlzdFZpZXdJdGVtcztcbiAgICBvYnNlcnZhYmxlOk9ic2VydmFibGVcbiAgICBjaGVja1RyeTtcbiAgICBkYXRlUGlja2VyVmlldzpzdHJpbmc7XG4gICAgYnV0dG9uVmlldzpzdHJpbmc7XG4gICAgXG4gICAgc2hvdzpzdHJpbmc9XCJcIjtcbiAgICBkYXk6c3RyaW5nPVwiXCI7XG4gICAgeWVhcjpzdHJpbmc9XCJcIjtcbiAgICBtb3RoOnN0cmluZz1cIlwiO1xuICAgIGRhdGVQaWNrZXJ2YWx1ZTpzdHJpbmc7XG4gICAgdGFza0ZpZWxkO1xuICAgIHRvZGF5PW5ldyBEYXRlKCk7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixwcml2YXRlIHBhZ2U6IFBhZ2UscHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKVxuICAgIHtcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgICAgICAgdGhpcy5vYnNlcnZhYmxlPSBuZXcgT2JzZXJ2YWJsZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGlzdFZpZXdJdGVtcz1uZXcgTGlzdFZpZXdJdGVtcztcbiAgICAgICAgdGhpcy5jb250YWN0TGlzdD10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0Q29udGFjdExpc3QoKTtcbiAgICAgICAgdGhpcy5zaG93PVwiY29sbGFwc2VcIjtcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyVmlldz1cImNvbGxhcHNlXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uVmlldz1cInZpc2libGVcIjtcbiAgICAgICAgdGhpcy5jaGVja1RyeT1cImNoZWNrXCI7XG4gICAgICAgIFxuICAgIH1cblxuICAgICBwdWJsaWMgZ29CYWNrKCkge1xuICAgICAgICAgY29uc29sZS5sb2coXCJCYWNrIHRhcHBlZFwiKTtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cblxuICAgIGhpZGVEYXRlUGlja2VyKGFyZ3Mpe1xuICAgICAgICBjb25zb2xlLmxvZyhcInRhcHBlZC0tLVwiKTtcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyVmlldyA9ICdjb2xsYXBzZSc7XG4gICAgICAgIHRoaXMuYnV0dG9uVmlldz1cInZpc2libGVcIjtcbiAgICBcbiAgICB9XG4gICAgc2hvd0RhdGVQaWNrZXIoYXJncyl7XG4gICAgICAgaWYodGhpcy5kYXRlUGlja2VyVmlldz09XCJ2aXNpYmxlXCIpe1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyVmlldyA9ICdjb2xsYXBzZSc7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXcgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJjb2xsYXBzZVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZVNvZnRLZXlwYWQoKTtcblxuICAgICAgICBcbiAgICB9XG4gICAgaGlkZVNvZnRLZXlwYWQoKXtcbiAgICAgICAgdmFyIGxheW91dCA9IHRoaXMucGFnZTtcbiAgICAgICAgdmFyIGNhdGVnb3J5RmllbGQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJjYXRlZ29yeVwiKTtcbiAgICAgICAgdmFyIHRhc2tGaWVsZCA9IGxheW91dC5nZXRWaWV3QnlJZChcInRhc2tOYW1lXCIpO1xuICAgICAgICBpZiAoY2F0ZWdvcnlGaWVsZC5pb3MgfHwgdGFza0ZpZWxkLmlvcylcbiAgICAgICAge1xuICAgICAgICAgICAgY2F0ZWdvcnlGaWVsZC5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICAgIHRhc2tGaWVsZC5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICAgZWxzZSBpZiAoY2F0ZWdvcnlGaWVsZC5hbmRyb2lkIHx8IHRhc2tGaWVsZC5hbmRyb2lkIClcbiAgICAgICAge1xuICAgICAgICAgICAgY2F0ZWdvcnlGaWVsZC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgICAgIHRhc2tGaWVsZC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3RBc3NpZ25lZSgpXG4gICAge1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5zaG93PT1cInZpc2libGVcIil7XG4gICAgICAgICAgICB0aGlzLnNob3cgPSAnY29sbGFwc2UnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnNob3cgPSAndmlzaWJsZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRlUGlja2VyVmlldz1cImNvbGxhcHNlXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uVmlldz1cInZpc2libGVcIjtcbiAgICAgICAgdGhpcy5oaWRlU29mdEtleXBhZCgpO1xuICAgICAgICBcbiAgICB9XG4gICAgIG9uUGlja2VyTG9hZGVkKGFyZ3MpIHtcbiAgICAgICAgbGV0IGRhdGVQaWNrZXIgPSA8RGF0ZVBpY2tlcj5hcmdzLm9iamVjdDtcblxuICAgICAgICBcbiAgICAgICAgIGxldCBkZD0gdGhpcy50b2RheS5nZXREYXkoKTtcbiAgICAgICAgbGV0ICBtbSA9IHRoaXMudG9kYXkuZ2V0TW9udGgoKSsxOyAvL0phbnVhcnkgaXMgMCFcbiAgICAgICAgbGV0IHl5eXkgPSB0aGlzLnRvZGF5LmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IERhdGUgPT09PT1cIitkZCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ3VycmVudCBtb250aCA9PT09PVwiK21tKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IHllYXIgPT09PT1cIit5eXl5KTtcblxuICAgICAgICBkYXRlUGlja2VyLnllYXIgPSB5eXl5O1xuICAgICAgICAgZGF0ZVBpY2tlci5tb250aCA9bW07XG4gICAgICAgIC8vZGF0ZVBpY2tlci5kYXkgPWRkO1xuXG4gICAgICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IG5ldyBEYXRlKDE5NzUsIDAsIDI5KTtcbiAgICAgICAgZGF0ZVBpY2tlci5tYXhEYXRlID0gbmV3IERhdGUoMjA0NSwgNCwgMTIpO1xuXG4gICAgICAgICB0aGlzLmRhdGVQaWNrZXJ2YWx1ZT1cIlNlbGVjdCBFbmQgZGF0ZVwiO1xuICAgIH1cblxuICAgIG9uRGF0ZUNoYW5nZWQoYXJncykge1xuICAgICAgICBcbiAgICAgICAgbGV0IGRhdGVWYWx1ZT08RGF0ZVBpY2tlcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5kYXRlUGlja2VydmFsdWU9ZGF0ZVZhbHVlLmRheStcIi9cIitkYXRlVmFsdWUubW9udGgrXCIvXCIrZGF0ZVZhbHVlLnllYXI7XG4gICAgICBcbiAgICB9ICAgIFxuICAgIHB1YmxpYyBpdGVtVGFwKGl0ZW0pXG4gICAge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiSXRlbSB0YXA9LT09PT09PT09XCIraXRlbS5uYW1lKTtcbiAgICAgICAgaWYoaXRlbS5zZWxlY3RlZClcbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbS5jaGVja0JveD1cIlxcdXtmMDk2fVwiO1xuXG4gICAgICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBjdXJJdGVtPXRoaXMuc2VsZWN0ZWRJdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAvL3ZhciBjdXJJdGVtTmFtZT10aGlzLnNlbGVjdGVkSXRlbXNOYW1lW2ldXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2N1ciBpdGVtLS0tLScrY3VySXRlbSk7XG4gICAgICAgICAgICAgICAgaWYoY3VySXRlbT09aXRlbS5udW1iZXIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW5kZXggOjo6Ojo6JytpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNOYW1lLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL3RoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaXRlbS5udW1iZXIsMSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zIGFmdGVyIHNsaWNlPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zKTtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgaXRlbS5jaGVja0JveD1cIlxcdXtmMDQ2fVwiO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbS5udW1iZXIpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZS5wdXNoKGl0ZW0ubmFtZUxhYmVsKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS5zZWxlY3RlZD0haXRlbS5zZWxlY3RlZDtcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcz09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgIFxuXG5cblxuICAgIH1cbiAgIFxuICAgIFxuXG4gIHB1YmxpYyBhc3NpZ25UYXNrKCkgXG4gIHtcblxuICAgIHZhciB4PXRoaXM7XG4gICAgdmFyIHRhc2tOYW1lPXRoaXMudXNlci50YXNrTmFtZTtcbiAgICB2YXIgY2F0ZWdvcnk9dGhpcy51c2VyLmNhdGVnb3J5O1xuICAgIHZhciBkYXRlVGltZT10aGlzLnVzZXIuZGF0ZVRpbWU7XG4gICAvLyB2YXIgYXNzaWduZWU9dGhpcy51c2VyLmFzc2lnbmVlO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJUYXNrIG5hbWUtLS1cIit0YXNrTmFtZSk7XG4gICAgLy8gY29uc29sZS5sb2coXCJDYXRlZ29yeS0tLVwiK2NhdGVnb3J5KTtcbiAgICAgLy9jb25zb2xlLmxvZyhcIkRhdGUgdGltZS0tLVwiK2RhdGVUaW1lKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQXNzaWduZWUtLS1cIithc3NpZ25lZSk7XG5cbiAgICAvL2NoZWNrIHRoZSBsYXN0IGtleSBpbiBUYXNrRGV0YWlscyB0YWJsZVxuICAgIGlmKHRhc2tOYW1lPT1udWxsIHx8IGNhdGVnb3J5PT1udWxsIHx8IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg8MSB8fCBkYXRlVGltZT09XCJTZWxlY3QgRW5kIGRhdGVcIilcbiAgICB7XG4gICAgY29uc29sZS5sb2coXCJFbXB0eSA9PT09PVwiKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgdmFyIGdldExhc3RLZXlJblRhc0tEZXRhaWxzID0gZnVuY3Rpb24ocmVzdWx0KSBcbiAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSk9PVwibnVsbFwiKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHguZW50ZXJEYXRhSW50b1Rhc2tEZXRhaWxzKFwiMVwiLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpO1xuICAgICAgICAgICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHguZW50ZXJEYXRhSW50b1Rhc2tEZXRhaWxzKFwibnVsbFwiLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICAgICAgICAgIGdldExhc3RLZXlJblRhc0tEZXRhaWxzLFxuICAgICAgICAgICAgICAgICcvVGFza0RldGFpbHMvJyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3Rhc2tOYW1lJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgIH1cbiAgICBcblxuICB9XG4gICAgcHVibGljIGVudGVyRGF0YUludG9UYXNrRGV0YWlscyhpZCx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KVxuICAgIHtcbiAgICAgICAgdmFyIHk9dGhpcztcbiAgICAgICAgIGlmKGlkPT1cIjFcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAnL1Rhc2tEZXRhaWxzLycraWQsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgZGV0YWlscyBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gdGFzayBkZXRhaWxzIGZpcnN0IHRpbWUtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyRGF0YUludG9NeVRhc2tEZXRhaWxzKGlkLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyRGF0YUludG9PdGhlclRhc2tEZXRhaWxzKGlkLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpO1xuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgYWxyZWFkeSB0aGVyZSBuZWVkIHRvIGdldCBsYXN0IGNvdW50IHZhbHVlJylcbiAgICAgICAgICAgICAgICB5LmdldExhc3RDb3VudEFuZEVudGVyRGV0YWlzSW5UYXNrRGV0YWlsc1BhZ2UodGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseSk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0TGFzdENvdW50QW5kRW50ZXJEZXRhaXNJblRhc2tEZXRhaWxzUGFnZSh0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KVxuICAgIHtcbiAgICAgICAgdmFyIHk9dGhpcztcbiAgICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGxhc3RLZXk9MDtcbiAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxhc3RLZXk9cGFyc2VJbnQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFzdEtleT1sYXN0S2V5KzE7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgJy9UYXNrRGV0YWlscy8nK2xhc3RLZXksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yeSc6Y2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICdkdWVEYXRlJzpkYXRlVGltZSxcbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgICB5LmVudGVyRGF0YUludG9NeVRhc2tEZXRhaWxzKGxhc3RLZXksdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseSk7XG4gICAgICAgICAgICAgICAgICAgICAgeS5lbnRlckRhdGFJbnRvT3RoZXJUYXNrRGV0YWlscyhsYXN0S2V5LHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHkpO1xuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvVGFza0RldGFpbHMvJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBlbnRlckRhdGFJbnRvTXlUYXNrRGV0YWlscyhpZCx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KVxuICAgIHtcbiAgICAgICAgdmFyIHk9dGhpcztcbiAgICAgICAgLyoqIHRlbXBvcmFyeSB2YWx1ZXMgYXNzaWduZWQgbmVlZCB0byBjaGFnbmUgbGF0ZXIgKi9cbiAgICAgICAgdmFyIHJlY2lwZW50c0NvdW50PXRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XG4gICAgICAgIHZhciByZW1haW5kZXJDb3VudD0wO1xuICAgICAgICB2YXIgY29tcGxldGlvbkNvdW50PTA7XG4gICAgICAgIHZhciBteUNvbXBsZXRpb25TdGF0dXM9ZmFsc2U7XG4gICAgICAgIHZhciBpZFRlbXA7XG4gICAgICAgXG4gICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgdmFyIGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZT1nZXRTdHJpbmcoXCJkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcIik7XG4gICAgICAgXG4gICAgICAgIFxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJpIHZhbHVlIGl0ZW1zPT09PT1pPT09PT09PT09XCIraStcIj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1tpXSk7XG5cbiAgICAgICAgICAgIGlmKGlkPT1cIjFcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAnL015VGFza0RldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbaV0rJy8nK1wiMVwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzIGZpcnN0IHRpbWUtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL21haW5mcmFnbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG91dGxldHM6IHsgbXl0YXNrb3V0bGV0OiBbJ215dGFzayddIH0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRWxzZSAgIGkgdmFsdWUgaXRlbXM9PT09PWk9PT09PT09PT1cIitpK1wiPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKTtcblxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAnL015VGFza0RldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbaV0rJy8nK2lkLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdyZWNpcGVudHNDb3VudCc6cmVjaXBlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVJlZ0lkJzpkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6Y29tcGxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj09PUlGPT1cIik7XG4gICAgICAgICAgICAgICAgICAgIHkucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgLy8gdGhpcy5nZXRMYXN0Q291bnRBbmRFbnRlckRldGFpbHMoaSx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoLHRoaXMuc2VsZWN0ZWRJdGVtc1tpXSxyZWNpcGVudHNDb3VudCxyZW1haW5kZXJDb3VudCxkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsZGV2aWNlUGhvbmVOdW1iZXIsY29tcGxldGlvbkNvdW50LG15Q29tcGxldGlvblN0YXR1cyx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KSxpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IFxuICAgIHB1YmxpYyBlbnRlckRhdGFJbnRvT3RoZXJUYXNrRGV0YWlscyhpZCx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KVxuICAgIHtcbiAgICAgICAgdmFyIHk9dGhpcztcbiAgICAgICAgLyoqIHRlbXBvcmFyeSB2YWx1ZXMgYXNzaWduZWQgbmVlZCB0byBjaGFnbmUgbGF0ZXIgKi9cbiAgICAgICAgdmFyIHJlY2lwZW50c0NvdW50PXRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XG4gICAgICAgIHZhciByZW1haW5kZXJDb3VudD0wO1xuICAgICAgICB2YXIgY29tcGxldGlvbkNvdW50PTA7XG4gICAgICAgIHZhciBteUNvbXBsZXRpb25TdGF0dXM9ZmFsc2U7XG4gICAgICAgIHZhciBpZFRlbXA7XG4gICAgICAgXG4gICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgdmFyIGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZT1nZXRTdHJpbmcoXCJkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcIik7XG4gICAgICAgIHZhciBkZWxldGlvbkNvdW50PTA7XG4gICAgICAgXG4gICAgICAgIFxuICAgICAgICAvLyBmb3IodmFyIGk9MDtpPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgICAvLyB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJpIHZhbHVlIGl0ZW1zPT09PT1pPT09PT09PT09XCIraStcIj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1tpXSk7XG5cbiAgICAgICAgICAgIGlmKGlkPT1cIjFcIilcbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytcIjFcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yeSc6Y2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICdkdWVEYXRlJzpkYXRlVGltZSxcbiAgICAgICAgICAgICAgICAgICAgJ3JlY2lwZW50c0NvdW50JzpyZWNpcGVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzpyZW1haW5kZXJDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeSc6ZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5UmVnSWQnOmRldmljZVBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAnY29tcGxldGlvbkNvdW50Jzpjb21wbGV0aW9uQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdteUNvbXBsZXRpb25TdGF0dXMnOm15Q29tcGxldGlvblN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgJ2RlbGV0aW9uQ291bnQnOmRlbGV0aW9uQ291bnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiBvdGhlciB0YXNrIGRldGFpbHMgZmlyc3QgdGltZS0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZm9yKHZhciBqPTA7ajx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO2orKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAnT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvMS9Bc3NpZ25lZURldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbal0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhc3NpZ25lZU5hbWUnOnRoaXMuc2VsZWN0ZWRJdGVtc05hbWVbal0sXG4gICAgICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6MFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cblxuXG5cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJFbHNlICAgaSB2YWx1ZSBpdGVtcz09PT09aT09PT09PT09PVwiK2krXCI9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNbaV0pO1xuXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytpZCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6ZGVsZXRpb25Db3VudFxuICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gb3RoZXIgdGFzayBkZXRhaWxzLT09PT09PT09XCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgIC8vIHRoaXMuZ2V0TGFzdENvdW50QW5kRW50ZXJEZXRhaWxzKGksdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCx0aGlzLnNlbGVjdGVkSXRlbXNbaV0scmVjaXBlbnRzQ291bnQscmVtYWluZGVyQ291bnQsZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLGRldmljZVBob25lTnVtYmVyLGNvbXBsZXRpb25Db3VudCxteUNvbXBsZXRpb25TdGF0dXMsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseCksaTtcbiAgICAgICAgICAgIGZvcih2YXIgaj0wO2o8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtqKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgJ090aGVyVGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnLycraWQrJy9Bc3NpZ25lZURldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbal0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhc3NpZ25lZU5hbWUnOnRoaXMuc2VsZWN0ZWRJdGVtc05hbWVbal0sXG4gICAgICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6MFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vfVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0TGFzdENvdW50QW5kRW50ZXJEZXRhaWxzKGksc2VsZWR0ZWRJdGVtc0xlbmd0aCxzZWxlY3RlZEFzc2lnbmVlLHJlY2lwZW50c0NvdW50LHJlbWFpbmRlckNvdW50LGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxkZXZpY2VQaG9uZU51bWJlcixjb21wbGV0aW9uQ291bnQsbXlDb21wbGV0aW9uU3RhdHVzLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuXG4gICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbGFzdEtleT0wO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxhc3RLZXk9cGFyc2VJbnQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFzdEtleT1sYXN0S2V5KzE7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycrc2VsZWN0ZWRBc3NpZ25lZSsnLycrbGFzdEtleSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaT09c2VsZWR0ZWRJdGVtc0xlbmd0aC0xKXtcbiAgICAgICAgICAgICAgICAgICAgeC5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvTXlUYXNrRGV0YWlscy8nK3NlbGVjdGVkQXNzaWduZWUrJy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGV4aXN0cyBvciBqdXN0IHdhbnQgdGhlIGV2ZW50IHRvIGZpcmUgb25jZVxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgZmFsc2UsIHNvIGl0IGxpc3RlbnMgY29udGludW91c2x5XG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICAvLyAgICB2YWx1ZTogJ3Rhc2tOYW1lJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuXG59XG4iXX0=