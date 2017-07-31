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
        console.log("Current Date =====" + dd);
        console.log("Current month =====" + mm);
        console.log("Current year =====" + yyyy);
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
                console.log('cur item----' + curItem);
                if (curItem == item.number) {
                    console.log('index ::::::' + i);
                    this.selectedItems.splice(i, 1);
                }
            }
            //this.selectedItems.splice(item.number,1);
            console.log("Selected items after slice======" + this.selectedItems);
        }
        else {
            item.checkBox = "\uF046";
            this.selectedItems.push(item.number);
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
                    // console.log("Task has been saved successfully in my task details-===i==--"+i+"==="+res);
                    // console.log("Length===i=="+i+"====="+(y.selectedItems.length-1));
                    // if(i==(y.selectedItems.length-1))
                    // {
                    console.log("===IF==");
                    y.router.navigate([
                        '/mainfragment',
                        { outlets: { mytaskoutlet: ['mytask'] } }
                    ]);
                    // }
                    // else{
                    //     console.log("===Else==");
                    // }
                }, function (res) {
                    console.log("Problem in saving my task details---" + res);
                });
                // this.getLastCountAndEnterDetails(i,this.selectedItems.length,this.selectedItems[i],recipentsCount,remainderCount,deviceRegisteredUserName,devicePhoneNumber,completionCount,myCompletionStatus,taskName,category,dateTime,x),i;
            }
        }
    };
    CreateTaskComponent.prototype.enterDataIntoOtherTaskDetails = function (id, taskName, category, dateTime, x) {
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
                // console.log("Length===i=="+i+"====="+(y.selectedItems.length-1));
                // if(i==(y.selectedItems.length-1))
                // {
                console.log("===IF==");
                // y.router.navigate([
                //           '/mainfragment',
                //           { outlets: { mytaskoutlet: ['mytask'] } }
                //         ]);
                // }
                // else{
                //     console.log("===Else==");
                // }
            }, function (res) {
                console.log("Problem in saving my task details---" + res);
            });
            // this.getLastCountAndEnterDetails(i,this.selectedItems.length,this.selectedItems[i],recipentsCount,remainderCount,deviceRegisteredUserName,devicePhoneNumber,completionCount,myCompletionStatus,taskName,category,dateTime,x),i;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRldGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGV0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBeUM7QUFDekMsMkNBQTBDO0FBQzFDLHVEQUEwRDtBQUMxRCw2REFVOEI7QUFDOUIsMkVBQXlFO0FBQ3pFLDZEQUE0RDtBQUM1RCw4Q0FBNkM7QUFJN0MsZ0NBQStCO0FBRS9CLHNEQUErRDtBQVEvRCxJQUFhLG1CQUFtQjtJQW1CNUIsNkJBQW9CLE1BQWMsRUFBUyxJQUFVLEVBQVMsZ0JBQWtDO1FBQTVFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWZqRyxnQkFBVyxHQUFDLElBQUksa0NBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxrQkFBYSxHQUFVLEVBQUUsQ0FBQztRQU96QixTQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ2YsUUFBRyxHQUFRLEVBQUUsQ0FBQztRQUNkLFNBQUksR0FBUSxFQUFFLENBQUM7UUFDZixTQUFJLEdBQVEsRUFBRSxDQUFDO1FBR2YsVUFBSyxHQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFHYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRSxJQUFJLHVCQUFVLENBQUM7UUFFaEMsSUFBSSxDQUFDLGFBQWEsR0FBQyxJQUFJLDZCQUFhLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLEdBQUMsVUFBVSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUMsVUFBVSxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUMsU0FBUyxD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XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvdXNlclwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdJdGVtcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2xpc3R2aWV3aXRlbXNcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3XCI7XG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSBcInVpL2RhdGUtcGlja2VyXCI7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvY3JlYXRldGFzay9jcmVhdGV0YXNrLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9jcmVhdGV0YXNrL2NyZWF0ZXRhc2stY29tbW9uLmNzc1wiLCBcInBhZ2VzL2NyZWF0ZXRhc2svY3JlYXRldGFzay5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQ3JlYXRlVGFza0NvbXBvbmVudFxue1xuICAvLyBZb3VyIFR5cGVTY3JpcHQgbG9naWMgZ29lcyBoZXJlXG4gICB1c2VyOiBVc2VyXG4gICBjb250YWN0TGlzdD1uZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgIHNlbGVjdGVkSXRlbXM6c3RyaW5nW109W107XG4gICBsaXN0Vmlld0l0ZW1zOkxpc3RWaWV3SXRlbXM7XG4gICAgb2JzZXJ2YWJsZTpPYnNlcnZhYmxlXG4gICAgY2hlY2tUcnk7XG4gICAgZGF0ZVBpY2tlclZpZXc6c3RyaW5nO1xuICAgIGJ1dHRvblZpZXc6c3RyaW5nO1xuICAgIFxuICAgIHNob3c6c3RyaW5nPVwiXCI7XG4gICAgZGF5OnN0cmluZz1cIlwiO1xuICAgIHllYXI6c3RyaW5nPVwiXCI7XG4gICAgbW90aDpzdHJpbmc9XCJcIjtcbiAgICBkYXRlUGlja2VydmFsdWU6c3RyaW5nO1xuICAgIHRhc2tGaWVsZDtcbiAgICB0b2RheT1uZXcgRGF0ZSgpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSBwYWdlOiBQYWdlLHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucylcbiAgICB7XG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgICAgIHRoaXMub2JzZXJ2YWJsZT0gbmV3IE9ic2VydmFibGU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxpc3RWaWV3SXRlbXM9bmV3IExpc3RWaWV3SXRlbXM7XG4gICAgICAgIHRoaXMuY29udGFjdExpc3Q9dGhpcy5saXN0Vmlld0l0ZW1zLmdldENvbnRhY3RMaXN0KCk7XG4gICAgICAgIHRoaXMuc2hvdz1cImNvbGxhcHNlXCI7XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXc9XCJjb2xsYXBzZVwiO1xuICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgICAgIHRoaXMuY2hlY2tUcnk9XCJjaGVja1wiO1xuICAgICAgICBcbiAgICB9XG5cbiAgICAgcHVibGljIGdvQmFjaygpIHtcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFjayB0YXBwZWRcIik7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG5cbiAgICBoaWRlRGF0ZVBpY2tlcihhcmdzKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0YXBwZWQtLS1cIik7XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXcgPSAnY29sbGFwc2UnO1xuICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgXG4gICAgfVxuICAgIHNob3dEYXRlUGlja2VyKGFyZ3Mpe1xuICAgICAgIGlmKHRoaXMuZGF0ZVBpY2tlclZpZXc9PVwidmlzaWJsZVwiKXtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXcgPSAnY29sbGFwc2UnO1xuICAgICAgICAgICAgdGhpcy5idXR0b25WaWV3PVwidmlzaWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJWaWV3ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgdGhpcy5idXR0b25WaWV3PVwiY29sbGFwc2VcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGVTb2Z0S2V5cGFkKCk7XG5cbiAgICAgICAgXG4gICAgfVxuICAgIGhpZGVTb2Z0S2V5cGFkKCl7XG4gICAgICAgIHZhciBsYXlvdXQgPSB0aGlzLnBhZ2U7XG4gICAgICAgIHZhciBjYXRlZ29yeUZpZWxkID0gbGF5b3V0LmdldFZpZXdCeUlkKFwiY2F0ZWdvcnlcIik7XG4gICAgICAgIHZhciB0YXNrRmllbGQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJ0YXNrTmFtZVwiKTtcbiAgICAgICAgaWYgKGNhdGVnb3J5RmllbGQuaW9zIHx8IHRhc2tGaWVsZC5pb3MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3J5RmllbGQuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgICAgICB0YXNrRmllbGQuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgIGVsc2UgaWYgKGNhdGVnb3J5RmllbGQuYW5kcm9pZCB8fCB0YXNrRmllbGQuYW5kcm9pZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3J5RmllbGQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgICAgICB0YXNrRmllbGQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VsZWN0QXNzaWduZWUoKVxuICAgIHtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuc2hvdz09XCJ2aXNpYmxlXCIpe1xuICAgICAgICAgICAgdGhpcy5zaG93ID0gJ2NvbGxhcHNlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zaG93ID0gJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXc9XCJjb2xsYXBzZVwiO1xuICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgICAgIHRoaXMuaGlkZVNvZnRLZXlwYWQoKTtcbiAgICAgICAgXG4gICAgfVxuICAgICBvblBpY2tlckxvYWRlZChhcmdzKSB7XG4gICAgICAgIGxldCBkYXRlUGlja2VyID0gPERhdGVQaWNrZXI+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgXG4gICAgICAgICBsZXQgZGQ9IHRoaXMudG9kYXkuZ2V0RGF5KCk7XG4gICAgICAgIGxldCAgbW0gPSB0aGlzLnRvZGF5LmdldE1vbnRoKCkrMTsgLy9KYW51YXJ5IGlzIDAhXG4gICAgICAgIGxldCB5eXl5ID0gdGhpcy50b2RheS5nZXRGdWxsWWVhcigpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBEYXRlID09PT09XCIrZGQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgbW9udGggPT09PT1cIittbSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCB5ZWFyID09PT09XCIreXl5eSk7XG5cbiAgICAgICAgZGF0ZVBpY2tlci55ZWFyID0geXl5eTtcbiAgICAgICAgIGRhdGVQaWNrZXIubW9udGggPW1tO1xuICAgICAgICAvL2RhdGVQaWNrZXIuZGF5ID1kZDtcblxuICAgICAgICBkYXRlUGlja2VyLm1pbkRhdGUgPSBuZXcgRGF0ZSgxOTc1LCAwLCAyOSk7XG4gICAgICAgIGRhdGVQaWNrZXIubWF4RGF0ZSA9IG5ldyBEYXRlKDIwNDUsIDQsIDEyKTtcblxuICAgICAgICAgdGhpcy5kYXRlUGlja2VydmFsdWU9XCJTZWxlY3QgRW5kIGRhdGVcIjtcbiAgICB9XG5cbiAgICBvbkRhdGVDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBkYXRlVmFsdWU9PERhdGVQaWNrZXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlcnZhbHVlPWRhdGVWYWx1ZS5kYXkrXCIvXCIrZGF0ZVZhbHVlLm1vbnRoK1wiL1wiK2RhdGVWYWx1ZS55ZWFyO1xuICAgICAgXG4gICAgfSAgICBcbiAgICBwdWJsaWMgaXRlbVRhcChpdGVtKVxuICAgIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkl0ZW0gdGFwPS09PT09PT09PVwiK2l0ZW0ubmFtZSk7XG4gICAgICAgIGlmKGl0ZW0uc2VsZWN0ZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tCb3g9XCJcXHV7ZjA5Nn1cIjtcblxuICAgICAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VySXRlbT10aGlzLnNlbGVjdGVkSXRlbXNbaV07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2N1ciBpdGVtLS0tLScrY3VySXRlbSk7XG4gICAgICAgICAgICAgICAgaWYoY3VySXRlbT09aXRlbS5udW1iZXIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW5kZXggOjo6Ojo6JytpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL3RoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaXRlbS5udW1iZXIsMSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zIGFmdGVyIHNsaWNlPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zKTtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgaXRlbS5jaGVja0JveD1cIlxcdXtmMDQ2fVwiO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbS5udW1iZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS5zZWxlY3RlZD0haXRlbS5zZWxlY3RlZDtcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcz09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgIFxuXG5cblxuICAgIH1cbiAgIFxuICAgIFxuXG4gIHB1YmxpYyBhc3NpZ25UYXNrKCkgXG4gIHtcblxuICAgIHZhciB4PXRoaXM7XG4gICAgdmFyIHRhc2tOYW1lPXRoaXMudXNlci50YXNrTmFtZTtcbiAgICB2YXIgY2F0ZWdvcnk9dGhpcy51c2VyLmNhdGVnb3J5O1xuICAgIHZhciBkYXRlVGltZT10aGlzLnVzZXIuZGF0ZVRpbWU7XG4gICAvLyB2YXIgYXNzaWduZWU9dGhpcy51c2VyLmFzc2lnbmVlO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJUYXNrIG5hbWUtLS1cIit0YXNrTmFtZSk7XG4gICAgLy8gY29uc29sZS5sb2coXCJDYXRlZ29yeS0tLVwiK2NhdGVnb3J5KTtcbiAgICAgLy9jb25zb2xlLmxvZyhcIkRhdGUgdGltZS0tLVwiK2RhdGVUaW1lKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQXNzaWduZWUtLS1cIithc3NpZ25lZSk7XG5cbiAgICAvL2NoZWNrIHRoZSBsYXN0IGtleSBpbiBUYXNrRGV0YWlscyB0YWJsZVxuICAgIGlmKHRhc2tOYW1lPT1udWxsIHx8IGNhdGVnb3J5PT1udWxsIHx8IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg8MSB8fCBkYXRlVGltZT09XCJTZWxlY3QgRW5kIGRhdGVcIilcbiAgICB7XG4gICAgY29uc29sZS5sb2coXCJFbXB0eSA9PT09PVwiKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgdmFyIGdldExhc3RLZXlJblRhc0tEZXRhaWxzID0gZnVuY3Rpb24ocmVzdWx0KSBcbiAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSk9PVwibnVsbFwiKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHguZW50ZXJEYXRhSW50b1Rhc2tEZXRhaWxzKFwiMVwiLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpO1xuICAgICAgICAgICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHguZW50ZXJEYXRhSW50b1Rhc2tEZXRhaWxzKFwibnVsbFwiLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICAgICAgICAgIGdldExhc3RLZXlJblRhc0tEZXRhaWxzLFxuICAgICAgICAgICAgICAgICcvVGFza0RldGFpbHMvJyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3Rhc2tOYW1lJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgIH1cbiAgICBcblxuICB9XG4gICAgcHVibGljIGVudGVyRGF0YUludG9UYXNrRGV0YWlscyhpZCx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KVxuICAgIHtcbiAgICAgICAgdmFyIHk9dGhpcztcbiAgICAgICAgIGlmKGlkPT1cIjFcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAnL1Rhc2tEZXRhaWxzLycraWQsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgZGV0YWlscyBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gdGFzayBkZXRhaWxzIGZpcnN0IHRpbWUtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyRGF0YUludG9NeVRhc2tEZXRhaWxzKGlkLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyRGF0YUludG9PdGhlclRhc2tEZXRhaWxzKGlkLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpO1xuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgYWxyZWFkeSB0aGVyZSBuZWVkIHRvIGdldCBsYXN0IGNvdW50IHZhbHVlJylcbiAgICAgICAgICAgICAgICB5LmdldExhc3RDb3VudEFuZEVudGVyRGV0YWlzSW5UYXNrRGV0YWlsc1BhZ2UodGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseSk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0TGFzdENvdW50QW5kRW50ZXJEZXRhaXNJblRhc2tEZXRhaWxzUGFnZSh0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KVxuICAgIHtcbiAgICAgICAgdmFyIHk9dGhpcztcbiAgICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGxhc3RLZXk9MDtcbiAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxhc3RLZXk9cGFyc2VJbnQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFzdEtleT1sYXN0S2V5KzE7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgJy9UYXNrRGV0YWlscy8nK2xhc3RLZXksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yeSc6Y2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICdkdWVEYXRlJzpkYXRlVGltZSxcbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgICB5LmVudGVyRGF0YUludG9NeVRhc2tEZXRhaWxzKGxhc3RLZXksdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseSk7XG4gICAgICAgICAgICAgICAgICAgICAgeS5lbnRlckRhdGFJbnRvT3RoZXJUYXNrRGV0YWlscyhsYXN0S2V5LHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHkpO1xuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvVGFza0RldGFpbHMvJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBlbnRlckRhdGFJbnRvTXlUYXNrRGV0YWlscyhpZCx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KVxuICAgIHtcbiAgICAgICAgdmFyIHk9dGhpcztcbiAgICAgICAgLyoqIHRlbXBvcmFyeSB2YWx1ZXMgYXNzaWduZWQgbmVlZCB0byBjaGFnbmUgbGF0ZXIgKi9cbiAgICAgICAgdmFyIHJlY2lwZW50c0NvdW50PXRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XG4gICAgICAgIHZhciByZW1haW5kZXJDb3VudD0wO1xuICAgICAgICB2YXIgY29tcGxldGlvbkNvdW50PTA7XG4gICAgICAgIHZhciBteUNvbXBsZXRpb25TdGF0dXM9ZmFsc2U7XG4gICAgICAgIHZhciBpZFRlbXA7XG4gICAgICAgXG4gICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgdmFyIGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZT1nZXRTdHJpbmcoXCJkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcIik7XG4gICAgICAgXG4gICAgICAgIFxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJpIHZhbHVlIGl0ZW1zPT09PT1pPT09PT09PT09XCIraStcIj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1tpXSk7XG5cbiAgICAgICAgICAgIGlmKGlkPT1cIjFcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAnL015VGFza0RldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbaV0rJy8nK1wiMVwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzIGZpcnN0IHRpbWUtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL21haW5mcmFnbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG91dGxldHM6IHsgbXl0YXNrb3V0bGV0OiBbJ215dGFzayddIH0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRWxzZSAgIGkgdmFsdWUgaXRlbXM9PT09PWk9PT09PT09PT1cIitpK1wiPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKTtcblxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAnL015VGFza0RldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbaV0rJy8nK2lkLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdyZWNpcGVudHNDb3VudCc6cmVjaXBlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVJlZ0lkJzpkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6Y29tcGxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiBteSB0YXNrIGRldGFpbHMtPT09aT09LS1cIitpK1wiPT09XCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJMZW5ndGg9PT1pPT1cIitpK1wiPT09PT1cIisoeS5zZWxlY3RlZEl0ZW1zLmxlbmd0aC0xKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKGk9PSh5LnNlbGVjdGVkSXRlbXMubGVuZ3RoLTEpKVxuICAgICAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj09PUlGPT1cIik7XG4gICAgICAgICAgICAgICAgICAgIHkucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiPT09RWxzZT09XCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAvLyB0aGlzLmdldExhc3RDb3VudEFuZEVudGVyRGV0YWlscyhpLHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGgsdGhpcy5zZWxlY3RlZEl0ZW1zW2ldLHJlY2lwZW50c0NvdW50LHJlbWFpbmRlckNvdW50LGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxkZXZpY2VQaG9uZU51bWJlcixjb21wbGV0aW9uQ291bnQsbXlDb21wbGV0aW9uU3RhdHVzLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpLGk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gXG4gICAgcHVibGljIGVudGVyRGF0YUludG9PdGhlclRhc2tEZXRhaWxzKGlkLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuICAgICAgICB2YXIgeT10aGlzO1xuICAgICAgICAvKiogdGVtcG9yYXJ5IHZhbHVlcyBhc3NpZ25lZCBuZWVkIHRvIGNoYWduZSBsYXRlciAqL1xuICAgICAgICB2YXIgcmVjaXBlbnRzQ291bnQ9dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50PTA7XG4gICAgICAgIHZhciBjb21wbGV0aW9uQ291bnQ9MDtcbiAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cz1mYWxzZTtcbiAgICAgICAgdmFyIGlkVGVtcDtcbiAgICAgICBcbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICB2YXIgZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lPWdldFN0cmluZyhcImRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZVwiKTtcbiAgICAgICAgdmFyIGRlbGV0aW9uQ291bnQ9MDtcbiAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vIGZvcih2YXIgaT0wO2k8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICAgIC8vIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImkgdmFsdWUgaXRlbXM9PT09PWk9PT09PT09PT1cIitpK1wiPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKTtcblxuICAgICAgICAgICAgaWYoaWQ9PVwiMVwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytcIjFcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yeSc6Y2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICdkdWVEYXRlJzpkYXRlVGltZSxcbiAgICAgICAgICAgICAgICAgICAgJ3JlY2lwZW50c0NvdW50JzpyZWNpcGVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzpyZW1haW5kZXJDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeSc6ZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5UmVnSWQnOmRldmljZVBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAnY29tcGxldGlvbkNvdW50Jzpjb21wbGV0aW9uQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdteUNvbXBsZXRpb25TdGF0dXMnOm15Q29tcGxldGlvblN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgJ2RlbGV0aW9uQ291bnQnOmRlbGV0aW9uQ291bnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiBvdGhlciB0YXNrIGRldGFpbHMgZmlyc3QgdGltZS0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJFbHNlICAgaSB2YWx1ZSBpdGVtcz09PT09aT09PT09PT09PVwiK2krXCI9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNbaV0pO1xuXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytpZCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6ZGVsZXRpb25Db3VudFxuICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gb3RoZXIgdGFzayBkZXRhaWxzLT09PT09PT09XCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJMZW5ndGg9PT1pPT1cIitpK1wiPT09PT1cIisoeS5zZWxlY3RlZEl0ZW1zLmxlbmd0aC0xKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKGk9PSh5LnNlbGVjdGVkSXRlbXMubGVuZ3RoLTEpKVxuICAgICAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj09PUlGPT1cIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIHkucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiPT09RWxzZT09XCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAvLyB0aGlzLmdldExhc3RDb3VudEFuZEVudGVyRGV0YWlscyhpLHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGgsdGhpcy5zZWxlY3RlZEl0ZW1zW2ldLHJlY2lwZW50c0NvdW50LHJlbWFpbmRlckNvdW50LGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxkZXZpY2VQaG9uZU51bWJlcixjb21wbGV0aW9uQ291bnQsbXlDb21wbGV0aW9uU3RhdHVzLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpLGk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy99XG4gICAgfVxuICAgIHB1YmxpYyBnZXRMYXN0Q291bnRBbmRFbnRlckRldGFpbHMoaSxzZWxlZHRlZEl0ZW1zTGVuZ3RoLHNlbGVjdGVkQXNzaWduZWUscmVjaXBlbnRzQ291bnQscmVtYWluZGVyQ291bnQsZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLGRldmljZVBob25lTnVtYmVyLGNvbXBsZXRpb25Db3VudCxteUNvbXBsZXRpb25TdGF0dXMsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG5cbiAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsYXN0S2V5PTA7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGFzdEtleT1wYXJzZUludChrZXkpO1xuICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0S2V5PWxhc3RLZXkrMTtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAnL015VGFza0RldGFpbHMvJytzZWxlY3RlZEFzc2lnbmVlKycvJytsYXN0S2V5LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdyZWNpcGVudHNDb3VudCc6cmVjaXBlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVJlZ0lkJzpkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6Y29tcGxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICBpZihpPT1zZWxlZHRlZEl0ZW1zTGVuZ3RoLTEpe1xuICAgICAgICAgICAgICAgICAgICB4LnJvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL21haW5mcmFnbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG91dGxldHM6IHsgbXl0YXNrb3V0bGV0OiBbJ215dGFzayddIH0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9O1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycrc2VsZWN0ZWRBc3NpZ25lZSsnLycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoaXMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBjaGVjayBpZiB0aGUgdmFsdWUgZXhpc3RzIG9yIGp1c3Qgd2FudCB0aGUgZXZlbnQgdG8gZmlyZSBvbmNlXG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBmYWxzZSwgc28gaXQgbGlzdGVucyBjb250aW51b3VzbHlcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAvLyBvcmRlciBieSBjb21wYW55LmNvdW50cnlcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICAgIC8vICAgIHZhbHVlOiAndGFza05hbWUnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG5cbn1cbiJdfQ==