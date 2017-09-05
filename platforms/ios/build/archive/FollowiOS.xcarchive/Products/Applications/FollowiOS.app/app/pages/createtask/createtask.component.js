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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRldGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGV0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBeUM7QUFDekMsMkNBQTBDO0FBQzFDLHVEQUEwRDtBQUMxRCw2REFVOEI7QUFDOUIsMkVBQXlFO0FBQ3pFLDZEQUE0RDtBQUM1RCw4Q0FBNkM7QUFJN0MsZ0NBQStCO0FBRS9CLHNEQUErRDtBQVEvRCxJQUFhLG1CQUFtQjtJQXFCNUIsNkJBQW9CLE1BQWMsRUFBUyxJQUFVLEVBQVMsZ0JBQWtDO1FBQTVFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWpCakcsZ0JBQVcsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFDMUIsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1FBTzdCLFNBQUksR0FBUSxFQUFFLENBQUM7UUFDZixRQUFHLEdBQVEsRUFBRSxDQUFDO1FBQ2QsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUNmLFNBQUksR0FBUSxFQUFFLENBQUM7UUFHZixVQUFLLEdBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUliLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFFLElBQUksdUJBQVUsQ0FBQztRQUVoQyxJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksNkJBQWEsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLElBQUksR0FBQyxVQUFVLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBQyxVQUFVLENBQUM7UUFD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QzFELENBQUMsQ0FBQyxDQUFDO1lBR2IsQ0FBQztRQUVELENBQUMsQ0FBQztRQUNGLFFBQVEsQ0FBQyxLQUFLLENBQ1YsWUFBWSxFQUNoQixpQkFBaUIsR0FBQyxnQkFBZ0IsR0FBQyxHQUFHLEVBQ2xDO1lBQ0ksZ0dBQWdHO1lBQ2hHLDRDQUE0QztZQUM1QyxXQUFXLEVBQUUsSUFBSTtZQUNqQiwyQkFBMkI7WUFDM0IsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRzthQUV0QztTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFHTCwwQkFBQztBQUFELENBQUMsQUF4aUJELElBd2lCQztBQXhpQlksbUJBQW1CO0lBTC9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLFNBQVMsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLGlDQUFpQyxDQUFDO0tBQ3pGLENBQUM7cUNBc0I4QixlQUFNLEVBQWUsV0FBSSxFQUEyQix5QkFBZ0I7R0FyQnZGLG1CQUFtQixDQXdpQi9CO0FBeGlCWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL3VzZXJcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IExpc3RWaWV3SXRlbXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9saXN0dmlld2l0ZW1zXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlld1wiO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gXCJ1aS9kYXRlLXBpY2tlclwiO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2NyZWF0ZXRhc2svY3JlYXRldGFzay5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvY3JlYXRldGFzay9jcmVhdGV0YXNrLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9jcmVhdGV0YXNrL2NyZWF0ZXRhc2suY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIENyZWF0ZVRhc2tDb21wb25lbnRcbntcbiAgLy8gWW91ciBUeXBlU2NyaXB0IGxvZ2ljIGdvZXMgaGVyZVxuICAgdXNlcjogVXNlclxuICAgY29udGFjdExpc3Q9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICBzZWxlY3RlZEl0ZW1zOnN0cmluZ1tdPVtdO1xuICAgc2VsZWN0ZWRJdGVtc05hbWU6c3RyaW5nW109W107XG4gICBsaXN0Vmlld0l0ZW1zOkxpc3RWaWV3SXRlbXM7XG4gICAgb2JzZXJ2YWJsZTpPYnNlcnZhYmxlXG4gICAgY2hlY2tUcnk7XG4gICAgZGF0ZVBpY2tlclZpZXc6c3RyaW5nO1xuICAgIGJ1dHRvblZpZXc6c3RyaW5nO1xuICAgIFxuICAgIHNob3c6c3RyaW5nPVwiXCI7XG4gICAgZGF5OnN0cmluZz1cIlwiO1xuICAgIHllYXI6c3RyaW5nPVwiXCI7XG4gICAgbW90aDpzdHJpbmc9XCJcIjtcbiAgICBkYXRlUGlja2VydmFsdWU6c3RyaW5nO1xuICAgIHRhc2tGaWVsZDtcbiAgICB0b2RheT1uZXcgRGF0ZSgpO1xuICAgIHBhZ2VUaXRsZTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLHByaXZhdGUgcGFnZTogUGFnZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpXG4gICAge1xuICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xuICAgICAgICB0aGlzLm9ic2VydmFibGU9IG5ldyBPYnNlcnZhYmxlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5saXN0Vmlld0l0ZW1zPW5ldyBMaXN0Vmlld0l0ZW1zO1xuICAgICAgICB0aGlzLmNvbnRhY3RMaXN0PXRoaXMubGlzdFZpZXdJdGVtcy5nZXRDb250YWN0TGlzdCgpO1xuICAgICAgICB0aGlzLnNob3c9XCJjb2xsYXBzZVwiO1xuICAgICAgICB0aGlzLmRhdGVQaWNrZXJWaWV3PVwiY29sbGFwc2VcIjtcbiAgICAgICAgdGhpcy5idXR0b25WaWV3PVwidmlzaWJsZVwiO1xuICAgICAgICB0aGlzLmNoZWNrVHJ5PVwiY2hlY2tcIjtcbiAgICAgICAgdGhpcy5wYWdlVGl0bGU9XCJDcmVhdGUgVGFza1wiO1xuICAgICAgICBcbiAgICB9XG5cbiAgICAgcHVibGljIGdvQmFjaygpIHtcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFjayB0YXBwZWRcIik7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG5cbiAgICBoaWRlRGF0ZVBpY2tlcihhcmdzKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0YXBwZWQtLS1cIik7XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXcgPSAnY29sbGFwc2UnO1xuICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgXG4gICAgfVxuICAgIHNob3dEYXRlUGlja2VyKGFyZ3Mpe1xuICAgICAgIGlmKHRoaXMuZGF0ZVBpY2tlclZpZXc9PVwidmlzaWJsZVwiKXtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXcgPSAnY29sbGFwc2UnO1xuICAgICAgICAgICAgdGhpcy5idXR0b25WaWV3PVwidmlzaWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJWaWV3ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgdGhpcy5idXR0b25WaWV3PVwiY29sbGFwc2VcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGVTb2Z0S2V5cGFkKCk7XG5cbiAgICAgICAgXG4gICAgfVxuICAgIGhpZGVTb2Z0S2V5cGFkKCl7XG4gICAgICAgIHZhciBsYXlvdXQgPSB0aGlzLnBhZ2U7XG4gICAgICAgIHZhciBjYXRlZ29yeUZpZWxkID0gbGF5b3V0LmdldFZpZXdCeUlkKFwiY2F0ZWdvcnlcIik7XG4gICAgICAgIHZhciB0YXNrRmllbGQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJ0YXNrTmFtZVwiKTtcbiAgICAgICAgaWYgKGNhdGVnb3J5RmllbGQuaW9zIHx8IHRhc2tGaWVsZC5pb3MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3J5RmllbGQuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgICAgICB0YXNrRmllbGQuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgIGVsc2UgaWYgKGNhdGVnb3J5RmllbGQuYW5kcm9pZCB8fCB0YXNrRmllbGQuYW5kcm9pZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3J5RmllbGQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgICAgICB0YXNrRmllbGQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VsZWN0QXNzaWduZWUoKVxuICAgIHtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuc2hvdz09XCJ2aXNpYmxlXCIpe1xuICAgICAgICAgICAgdGhpcy5zaG93ID0gJ2NvbGxhcHNlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zaG93ID0gJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXc9XCJjb2xsYXBzZVwiO1xuICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgICAgIHRoaXMuaGlkZVNvZnRLZXlwYWQoKTtcbiAgICAgICAgXG4gICAgfVxuICAgIGNhbmNlbCgpe1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL21haW5mcmFnbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG91dGxldHM6IHsgbXl0YXNrb3V0bGV0OiBbJ215dGFzayddIH0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgIH1cbiAgICAgb25QaWNrZXJMb2FkZWQoYXJncykge1xuICAgICAgICBsZXQgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIFxuICAgICAgICAgbGV0IGRkPSB0aGlzLnRvZGF5LmdldERheSgpO1xuICAgICAgICBsZXQgIG1tID0gdGhpcy50b2RheS5nZXRNb250aCgpKzE7IC8vSmFudWFyeSBpcyAwIVxuICAgICAgICBsZXQgeXl5eSA9IHRoaXMudG9kYXkuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgRGF0ZSA9PT09PVwiK2RkKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IG1vbnRoID09PT09XCIrbW0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgeWVhciA9PT09PVwiK3l5eXkpO1xuXG4gICAgICAgIGRhdGVQaWNrZXIueWVhciA9IHl5eXk7XG4gICAgICAgICBkYXRlUGlja2VyLm1vbnRoID1tbTtcbiAgICAgICAgLy9kYXRlUGlja2VyLmRheSA9ZGQ7XG5cbiAgICAgICAgZGF0ZVBpY2tlci5taW5EYXRlID0gbmV3IERhdGUoMTk3NSwgMCwgMjkpO1xuICAgICAgICBkYXRlUGlja2VyLm1heERhdGUgPSBuZXcgRGF0ZSgyMDQ1LCA0LCAxMik7XG5cbiAgICAgICAgIHRoaXMuZGF0ZVBpY2tlcnZhbHVlPVwiU2VsZWN0IEVuZCBkYXRlXCI7XG4gICAgfVxuXG4gICAgb25EYXRlQ2hhbmdlZChhcmdzKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgZGF0ZVZhbHVlPTxEYXRlUGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLmRhdGVQaWNrZXJ2YWx1ZT1kYXRlVmFsdWUuZGF5K1wiL1wiK2RhdGVWYWx1ZS5tb250aCtcIi9cIitkYXRlVmFsdWUueWVhcjtcbiAgICAgIFxuICAgIH0gICAgXG4gICAgcHVibGljIGl0ZW1UYXAoaXRlbSlcbiAgICB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJJdGVtIHRhcD0tPT09PT09PT1cIitpdGVtLm5hbWUpO1xuICAgICAgICBpZihpdGVtLnNlbGVjdGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrQm94PVwiXFx1e2YwOTZ9XCI7XG5cbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGN1ckl0ZW09dGhpcy5zZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIC8vdmFyIGN1ckl0ZW1OYW1lPXRoaXMuc2VsZWN0ZWRJdGVtc05hbWVbaV1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY3VyIGl0ZW0tLS0tJytjdXJJdGVtKTtcbiAgICAgICAgICAgICAgICBpZihjdXJJdGVtPT1pdGVtLm51bWJlcilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmRleCA6Ojo6OjonK2kpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc05hbWUuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vdGhpcy5zZWxlY3RlZEl0ZW1zLnNwbGljZShpdGVtLm51bWJlciwxKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgYWZ0ZXIgc2xpY2U9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXMpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICBpdGVtLmNoZWNrQm94PVwiXFx1e2YwNDZ9XCI7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtLm51bWJlcik7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNOYW1lLnB1c2goaXRlbS5uYW1lTGFiZWwpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLnNlbGVjdGVkPSFpdGVtLnNlbGVjdGVkO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgXG5cblxuXG4gICAgfVxuICAgXG4gICAgXG5cbiAgcHVibGljIGFzc2lnblRhc2soKSBcbiAge1xuXG4gICAgdmFyIHg9dGhpcztcbiAgICB2YXIgdGFza05hbWU9dGhpcy51c2VyLnRhc2tOYW1lO1xuICAgIHZhciBjYXRlZ29yeT10aGlzLnVzZXIuY2F0ZWdvcnk7XG4gICAgdmFyIGRhdGVUaW1lPXRoaXMudXNlci5kYXRlVGltZTtcbiAgIC8vIHZhciBhc3NpZ25lZT10aGlzLnVzZXIuYXNzaWduZWU7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlRhc2sgbmFtZS0tLVwiK3Rhc2tOYW1lKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNhdGVnb3J5LS0tXCIrY2F0ZWdvcnkpO1xuICAgICAvL2NvbnNvbGUubG9nKFwiRGF0ZSB0aW1lLS0tXCIrZGF0ZVRpbWUpO1xuICAgIC8vY29uc29sZS5sb2coXCJBc3NpZ25lZS0tLVwiK2Fzc2lnbmVlKTtcblxuICAgIC8vY2hlY2sgdGhlIGxhc3Qga2V5IGluIFRhc2tEZXRhaWxzIHRhYmxlXG4gICAgaWYodGFza05hbWU9PW51bGwgfHwgY2F0ZWdvcnk9PW51bGwgfHwgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDwxIHx8IGRhdGVUaW1lPT1cIlNlbGVjdCBFbmQgZGF0ZVwiKVxuICAgIHtcbiAgICBjb25zb2xlLmxvZyhcIkVtcHR5ID09PT09XCIpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICB2YXIgZ2V0TGFzdEtleUluVGFzS0RldGFpbHMgPSBmdW5jdGlvbihyZXN1bHQpIFxuICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKT09XCJudWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgeC5lbnRlckRhdGFJbnRvVGFza0RldGFpbHMoXCIxXCIsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseCk7XG4gICAgICAgICAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgeC5lbnRlckRhdGFJbnRvVGFza0RldGFpbHMoXCJudWxsXCIsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9O1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgICAgICAgICAgZ2V0TGFzdEtleUluVGFzS0RldGFpbHMsXG4gICAgICAgICAgICAgICAgJy9UYXNrRGV0YWlscy8nLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndGFza05hbWUnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgfVxuICAgIFxuXG4gIH1cbiAgICBwdWJsaWMgZW50ZXJEYXRhSW50b1Rhc2tEZXRhaWxzKGlkLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuICAgICAgICB2YXIgeT10aGlzO1xuICAgICAgICAgaWYoaWQ9PVwiMVwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICcvVGFza0RldGFpbHMvJytpZCxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yeSc6Y2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICdkdWVEYXRlJzpkYXRlVGltZSxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBkZXRhaWxzIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiB0YXNrIGRldGFpbHMgZmlyc3QgdGltZS0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJEYXRhSW50b015VGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJEYXRhSW50b090aGVyVGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseCk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbnRyeSBhbHJlYWR5IHRoZXJlIG5lZWQgdG8gZ2V0IGxhc3QgY291bnQgdmFsdWUnKVxuICAgICAgICAgICAgICAgIHkuZ2V0TGFzdENvdW50QW5kRW50ZXJEZXRhaXNJblRhc2tEZXRhaWxzUGFnZSh0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx5KTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBnZXRMYXN0Q291bnRBbmRFbnRlckRldGFpc0luVGFza0RldGFpbHNQYWdlKHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuICAgICAgICB2YXIgeT10aGlzO1xuICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbGFzdEtleT0wO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGFzdEtleT1wYXJzZUludChrZXkpO1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0S2V5PWxhc3RLZXkrMTtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAnL1Rhc2tEZXRhaWxzLycrbGFzdEtleSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgIHkuZW50ZXJEYXRhSW50b015VGFza0RldGFpbHMobGFzdEtleSx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx5KTtcbiAgICAgICAgICAgICAgICAgICAgICB5LmVudGVyRGF0YUludG9PdGhlclRhc2tEZXRhaWxzKGxhc3RLZXksdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseSk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9O1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9UYXNrRGV0YWlscy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGVudGVyRGF0YUludG9NeVRhc2tEZXRhaWxzKGlkLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuICAgICAgICB2YXIgeT10aGlzO1xuICAgICAgICAvKiogdGVtcG9yYXJ5IHZhbHVlcyBhc3NpZ25lZCBuZWVkIHRvIGNoYWduZSBsYXRlciAqL1xuICAgICAgICB2YXIgcmVjaXBlbnRzQ291bnQ9dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50PTA7XG4gICAgICAgIHZhciBjb21wbGV0aW9uQ291bnQ9MDtcbiAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cz1mYWxzZTtcbiAgICAgICAgdmFyIGlkVGVtcDtcbiAgICAgICBcbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICB2YXIgZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lPWdldFN0cmluZyhcImRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZVwiKTtcbiAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImkgdmFsdWUgaXRlbXM9PT09PWk9PT09PT09PT1cIitpK1wiPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKTtcblxuICAgICAgICAgICAgaWYoaWQ9PVwiMVwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICcvTXlUYXNrRGV0YWlscy8nK3RoaXMuc2VsZWN0ZWRJdGVtc1tpXSsnLycrXCIxXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdyZWNpcGVudHNDb3VudCc6cmVjaXBlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVJlZ0lkJzpkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6Y29tcGxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiBteSB0YXNrIGRldGFpbHMgZmlyc3QgdGltZS0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBteXRhc2tvdXRsZXQ6IFsnbXl0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJFbHNlICAgaSB2YWx1ZSBpdGVtcz09PT09aT09PT09PT09PVwiK2krXCI9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNbaV0pO1xuXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICcvTXlUYXNrRGV0YWlscy8nK3RoaXMuc2VsZWN0ZWRJdGVtc1tpXSsnLycraWQsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0YXNrTmFtZSc6dGFza05hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjYXRlZ29yeSc6Y2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICdkdWVEYXRlJzpkYXRlVGltZSxcbiAgICAgICAgICAgICAgICAgICAgJ3JlY2lwZW50c0NvdW50JzpyZWNpcGVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ3JlbWFpbmRlckNvdW50JzpyZW1haW5kZXJDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeSc6ZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5UmVnSWQnOmRldmljZVBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAnY29tcGxldGlvbkNvdW50Jzpjb21wbGV0aW9uQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdteUNvbXBsZXRpb25TdGF0dXMnOm15Q29tcGxldGlvblN0YXR1cyxcbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09SUY9PVwiKTtcbiAgICAgICAgICAgICAgICAgICAgeS5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAvLyB0aGlzLmdldExhc3RDb3VudEFuZEVudGVyRGV0YWlscyhpLHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGgsdGhpcy5zZWxlY3RlZEl0ZW1zW2ldLHJlY2lwZW50c0NvdW50LHJlbWFpbmRlckNvdW50LGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxkZXZpY2VQaG9uZU51bWJlcixjb21wbGV0aW9uQ291bnQsbXlDb21wbGV0aW9uU3RhdHVzLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpLGk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gXG4gICAgcHVibGljIGVudGVyRGF0YUludG9PdGhlclRhc2tEZXRhaWxzKGlkLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpXG4gICAge1xuICAgICAgICB2YXIgeT10aGlzO1xuICAgICAgICAvKiogdGVtcG9yYXJ5IHZhbHVlcyBhc3NpZ25lZCBuZWVkIHRvIGNoYWduZSBsYXRlciAqL1xuICAgICAgICB2YXIgcmVjaXBlbnRzQ291bnQ9dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50PTA7XG4gICAgICAgIHZhciBjb21wbGV0aW9uQ291bnQ9MDtcbiAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cz1mYWxzZTtcbiAgICAgICAgdmFyIGlkVGVtcDtcbiAgICAgICBcbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICB2YXIgZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lPWdldFN0cmluZyhcImRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZVwiKTtcbiAgICAgICAgdmFyIGRlbGV0aW9uQ291bnQ9MDtcbiAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vIGZvcih2YXIgaT0wO2k8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICAgIC8vIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImkgdmFsdWUgaXRlbXM9PT09PWk9PT09PT09PT1cIitpK1wiPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zW2ldKTtcblxuICAgICAgICAgICAgaWYoaWQ9PVwiMVwiKVxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK1wiMVwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAnZGVsZXRpb25Db3VudCc6ZGVsZXRpb25Db3VudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIG90aGVyIHRhc2sgZGV0YWlscyBmaXJzdCB0aW1lLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmb3IodmFyIGo9MDtqPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aisrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICdPdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8xL0Fzc2lnbmVlRGV0YWlscy8nK3RoaXMuc2VsZWN0ZWRJdGVtc1tqXSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Fzc2lnbmVlTmFtZSc6dGhpcy5zZWxlY3RlZEl0ZW1zTmFtZVtqXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkZWxldGlvbkNvdW50JzowXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuXG5cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkVsc2UgICBpIHZhbHVlIGl0ZW1zPT09PT1pPT09PT09PT09XCIraStcIj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1tpXSk7XG5cbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK2lkLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdyZWNpcGVudHNDb3VudCc6cmVjaXBlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVJlZ0lkJzpkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6Y29tcGxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICdkZWxldGlvbkNvdW50JzpkZWxldGlvbkNvdW50XG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiBvdGhlciB0YXNrIGRldGFpbHMtPT09PT09PT1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgLy8gdGhpcy5nZXRMYXN0Q291bnRBbmRFbnRlckRldGFpbHMoaSx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoLHRoaXMuc2VsZWN0ZWRJdGVtc1tpXSxyZWNpcGVudHNDb3VudCxyZW1haW5kZXJDb3VudCxkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsZGV2aWNlUGhvbmVOdW1iZXIsY29tcGxldGlvbkNvdW50LG15Q29tcGxldGlvblN0YXR1cyx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KSxpO1xuICAgICAgICAgICAgZm9yKHZhciBqPTA7ajx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO2orKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAnT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytpZCsnL0Fzc2lnbmVlRGV0YWlscy8nK3RoaXMuc2VsZWN0ZWRJdGVtc1tqXSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Fzc2lnbmVlTmFtZSc6dGhpcy5zZWxlY3RlZEl0ZW1zTmFtZVtqXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkZWxldGlvbkNvdW50JzowLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25TdGF0dXMnOmZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy99XG4gICAgfVxuICAgIHB1YmxpYyBnZXRMYXN0Q291bnRBbmRFbnRlckRldGFpbHMoaSxzZWxlZHRlZEl0ZW1zTGVuZ3RoLHNlbGVjdGVkQXNzaWduZWUscmVjaXBlbnRzQ291bnQscmVtYWluZGVyQ291bnQsZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLGRldmljZVBob25lTnVtYmVyLGNvbXBsZXRpb25Db3VudCxteUNvbXBsZXRpb25TdGF0dXMsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG5cbiAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsYXN0S2V5PTA7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGFzdEtleT1wYXJzZUludChrZXkpO1xuICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0S2V5PWxhc3RLZXkrMTtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICAgICAnL015VGFza0RldGFpbHMvJytzZWxlY3RlZEFzc2lnbmVlKycvJytsYXN0S2V5LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdyZWNpcGVudHNDb3VudCc6cmVjaXBlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVJlZ0lkJzpkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6Y29tcGxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHNhdmVkIHN1Y2Nlc3NmdWxseSBpbiBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICBpZihpPT1zZWxlZHRlZEl0ZW1zTGVuZ3RoLTEpe1xuICAgICAgICAgICAgICAgICAgICB4LnJvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL21haW5mcmFnbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG91dGxldHM6IHsgbXl0YXNrb3V0bGV0OiBbJ215dGFzayddIH0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiBzYXZpbmcgbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9O1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycrc2VsZWN0ZWRBc3NpZ25lZSsnLycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoaXMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBjaGVjayBpZiB0aGUgdmFsdWUgZXhpc3RzIG9yIGp1c3Qgd2FudCB0aGUgZXZlbnQgdG8gZmlyZSBvbmNlXG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBmYWxzZSwgc28gaXQgbGlzdGVucyBjb250aW51b3VzbHlcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAvLyBvcmRlciBieSBjb21wYW55LmNvdW50cnlcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICAgIC8vICAgIHZhbHVlOiAndGFza05hbWUnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG5cbn1cbiJdfQ==