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
var CreateTaskComponent = (function () {
    function CreateTaskComponent(router, page) {
        this.router = router;
        this.page = page;
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
        // console.log("Date changed");
        // console.log("New value==================: " + args.value);
        // console.log("Old value: " + args.oldValue);
        // console.log("Day value=====: " + args.Day);
        // console.log("Year value=====: " + args.Year);
        // console.log("Month value=====: " + args.moth);
        var dateValue = args.object;
        //console.log("Day===Month===Year===="+dateValue.day+" "+dateValue.month+" "+dateValue.year);
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
        var onQueryEvent = function (result) {
            if (!result.error) {
                //console.log("Event type: " + result.type);
                //console.log("Key: " + result.key);
                //console.log("Value: " + JSON.stringify(result.value));
                if (JSON.stringify(result.value) == "null") {
                    // console.log("Create new table::");
                    //console.log("This---"+this);
                    x.enterDataIntoMyTaskDetails("1", taskName, category, dateTime, x);
                }
                else {
                    //console.log("Enter details in the existing table::");
                    //console.log("This---"+this);
                    x.enterDataIntoMyTaskDetails("null", taskName, category, dateTime, x);
                }
            }
        };
        if (taskName == null || category == null || this.selectedItems.length < 1 || dateTime == "Select End date") {
            console.log("Empty =====");
        }
        else {
            firebase.query(onQueryEvent, '/MyTaskDetails/', {
                // set this to true if you want to check if the value exists or just want the event to fire once
                // default false, so it listens continuously
                singleEvent: true,
                // order by company.country
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'taskName' // mandatory when type is 'child'
                },
            });
        }
    };
    CreateTaskComponent.prototype.enterDataIntoMyTaskDetails = function (id, taskName, category, dateTime, x) {
        var _this = this;
        /** temporary values assigned need to chagne later */
        var recipentsCount = 1;
        var remainderCount = 0;
        var completionCount = 0;
        var myCompletionStatus = 0;
        var idTemp;
        //var assigneesSelected=["123456789","12345"];
        //var assigneesSelected=this.selectedItems;
        // assigneesSelected.push(this.selectedItems);
        // for(var i=0;i<this.selectedItems.length;i++){
        //     assigneesSelected.push(this.selectedItems.getItem(i));
        // }
        //console.log("Assignesss selected in assign task========"+this.selectedItems);
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var deviceRegisteredUserName = application_settings_1.getString("deviceRegisteredUserName");
        //var assigneearray=assigneesSelected.toString.
        for (var i = 0; i < this.selectedItems.length; i++) {
            console.log("i value==============" + i);
            console.log("i value==============" + this.selectedItems[i]);
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
                    console.log("Task has been saved successfully in my task details first time---" + res);
                    _this.router.navigate([
                        '/mainfragment',
                        { outlets: { mytaskoutlet: ['mytask'] } }
                    ]);
                }, function (res) {
                    console.log("Problem in saving my task details---" + res);
                });
            }
            else {
                console.log('entry already there need to get last count value');
                this.getLastCountAndEnterDetails(i, this.selectedItems.length, this.selectedItems[i], recipentsCount, remainderCount, deviceRegisteredUserName, devicePhoneNumber, completionCount, myCompletionStatus, taskName, category, dateTime, x), i;
            }
        }
    };
    CreateTaskComponent.prototype.getLastCountAndEnterDetails = function (i, seledtedItemsLength, selectedAssignee, recipentsCount, remainderCount, deviceRegisteredUserName, devicePhoneNumber, completionCount, myCompletionStatus, taskName, category, dateTime, x) {
        var onQueryEvent = function (result) {
            var lastKey = 0;
            if (!result.error) {
                //console.log("Event type: " + result.type);
                //console.log("Key: " + JSON.stringify(result.key));
                //console.log("Value: " + result.value);
                //console.log("Value next ::::;: " + JSON.stringify(result.value));
                var resultJson = result.value;
                for (var key in resultJson) {
                    //console.log('key:::'+key);
                    lastKey = parseInt(key);
                    //console.log('lastKey ::'+lastKey);
                }
                lastKey = lastKey + 1;
                //console.log('lastKey ::'+lastKey);
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
    __metadata("design:paramtypes", [router_1.Router, page_1.Page])
], CreateTaskComponent);
exports.CreateTaskComponent = CreateTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRldGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGV0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBeUM7QUFDekMsMkNBQTBDO0FBQzFDLHVEQUEwRDtBQUMxRCw2REFVOEI7QUFDOUIsMkVBQXlFO0FBQ3pFLDZEQUE0RDtBQUM1RCw4Q0FBNkM7QUFJN0MsZ0NBQStCO0FBVS9CLElBQWEsbUJBQW1CO0lBbUI1Qiw2QkFBb0IsTUFBYyxFQUFTLElBQVU7UUFBakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFmdEQsZ0JBQVcsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFPekIsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUNmLFFBQUcsR0FBUSxFQUFFLENBQUM7UUFDZCxTQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ2YsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUdmLFVBQUssR0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBR2IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUUsSUFBSSx1QkFBVSxDQUFDO1FBRWhDLElBQUksQ0FBQyxhQUFhLEdBQUMsSUFBSSw2QkFBYSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxHQUFDLFVBQVUsQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFDLFVBQVUsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFDLFNBQVMsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFDLE9BQU8sQ0FBQztJQUUxQixDQUFDO0lBQ0Qs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QUFDLEVBQUMsVUFBQyxHQUFHO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLEdBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFELENBQUMsQ0FBQyxDQUFDO1lBR2IsQ0FBQztRQUVELENBQUMsQ0FBQztRQUNGLFFBQVEsQ0FBQyxLQUFLLENBQ1YsWUFBWSxFQUNoQixpQkFBaUIsR0FBQyxnQkFBZ0IsR0FBQyxHQUFHLEVBQ2xDO1lBQ0ksZ0dBQWdHO1lBQ2hHLDRDQUE0QztZQUM1QyxXQUFXLEVBQUUsSUFBSTtZQUNqQiwyQkFBMkI7WUFDM0IsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRzthQUV0QztTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFHTCwwQkFBQztBQUFELENBQUMsQUF2VkQsSUF1VkM7QUF2VlksbUJBQW1CO0lBTC9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLFNBQVMsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLGlDQUFpQyxDQUFDO0tBQ3pGLENBQUM7cUNBb0I4QixlQUFNLEVBQWUsV0FBSTtHQW5CNUMsbUJBQW1CLENBdVYvQjtBQXZWWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL3VzZXJcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IExpc3RWaWV3SXRlbXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9saXN0dmlld2l0ZW1zXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlld1wiO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gXCJ1aS9kYXRlLXBpY2tlclwiO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9jcmVhdGV0YXNrL2NyZWF0ZXRhc2suaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2NyZWF0ZXRhc2svY3JlYXRldGFzay1jb21tb24uY3NzXCIsIFwicGFnZXMvY3JlYXRldGFzay9jcmVhdGV0YXNrLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBDcmVhdGVUYXNrQ29tcG9uZW50XG57XG4gIC8vIFlvdXIgVHlwZVNjcmlwdCBsb2dpYyBnb2VzIGhlcmVcbiAgIHVzZXI6IFVzZXJcbiAgIGNvbnRhY3RMaXN0PW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgc2VsZWN0ZWRJdGVtczpzdHJpbmdbXT1bXTtcbiAgIGxpc3RWaWV3SXRlbXM6TGlzdFZpZXdJdGVtcztcbiAgICBvYnNlcnZhYmxlOk9ic2VydmFibGVcbiAgICBjaGVja1RyeTtcbiAgICBkYXRlUGlja2VyVmlldzpzdHJpbmc7XG4gICAgYnV0dG9uVmlldzpzdHJpbmc7XG4gICAgXG4gICAgc2hvdzpzdHJpbmc9XCJcIjtcbiAgICBkYXk6c3RyaW5nPVwiXCI7XG4gICAgeWVhcjpzdHJpbmc9XCJcIjtcbiAgICBtb3RoOnN0cmluZz1cIlwiO1xuICAgIGRhdGVQaWNrZXJ2YWx1ZTpzdHJpbmc7XG4gICAgdGFza0ZpZWxkO1xuICAgIHRvZGF5PW5ldyBEYXRlKCk7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixwcml2YXRlIHBhZ2U6IFBhZ2UpXG4gICAge1xuICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xuICAgICAgICB0aGlzLm9ic2VydmFibGU9IG5ldyBPYnNlcnZhYmxlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5saXN0Vmlld0l0ZW1zPW5ldyBMaXN0Vmlld0l0ZW1zO1xuICAgICAgICB0aGlzLmNvbnRhY3RMaXN0PXRoaXMubGlzdFZpZXdJdGVtcy5nZXRDb250YWN0TGlzdCgpO1xuICAgICAgICB0aGlzLnNob3c9XCJjb2xsYXBzZVwiO1xuICAgICAgICB0aGlzLmRhdGVQaWNrZXJWaWV3PVwiY29sbGFwc2VcIjtcbiAgICAgICAgdGhpcy5idXR0b25WaWV3PVwidmlzaWJsZVwiO1xuICAgICAgICB0aGlzLmNoZWNrVHJ5PVwiY2hlY2tcIjtcbiAgICAgICAgXG4gICAgfVxuICAgIGhpZGVEYXRlUGlja2VyKGFyZ3Mpe1xuICAgICAgICBjb25zb2xlLmxvZyhcInRhcHBlZC0tLVwiKTtcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyVmlldyA9ICdjb2xsYXBzZSc7XG4gICAgICAgIHRoaXMuYnV0dG9uVmlldz1cInZpc2libGVcIjtcbiAgICBcbiAgICB9XG4gICAgc2hvd0RhdGVQaWNrZXIoYXJncyl7XG4gICAgICAgaWYodGhpcy5kYXRlUGlja2VyVmlldz09XCJ2aXNpYmxlXCIpe1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyVmlldyA9ICdjb2xsYXBzZSc7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJ2aXNpYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclZpZXcgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvblZpZXc9XCJjb2xsYXBzZVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZVNvZnRLZXlwYWQoKTtcblxuICAgICAgICBcbiAgICB9XG4gICAgaGlkZVNvZnRLZXlwYWQoKXtcbiAgICAgICAgdmFyIGxheW91dCA9IHRoaXMucGFnZTtcbiAgICAgICAgdmFyIGNhdGVnb3J5RmllbGQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJjYXRlZ29yeVwiKTtcbiAgICAgICAgdmFyIHRhc2tGaWVsZCA9IGxheW91dC5nZXRWaWV3QnlJZChcInRhc2tOYW1lXCIpO1xuICAgICAgICBpZiAoY2F0ZWdvcnlGaWVsZC5pb3MgfHwgdGFza0ZpZWxkLmlvcylcbiAgICAgICAge1xuICAgICAgICAgICAgY2F0ZWdvcnlGaWVsZC5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICAgIHRhc2tGaWVsZC5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICAgZWxzZSBpZiAoY2F0ZWdvcnlGaWVsZC5hbmRyb2lkIHx8IHRhc2tGaWVsZC5hbmRyb2lkIClcbiAgICAgICAge1xuICAgICAgICAgICAgY2F0ZWdvcnlGaWVsZC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgICAgIHRhc2tGaWVsZC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3RBc3NpZ25lZSgpXG4gICAge1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5zaG93PT1cInZpc2libGVcIil7XG4gICAgICAgICAgICB0aGlzLnNob3cgPSAnY29sbGFwc2UnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnNob3cgPSAndmlzaWJsZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRlUGlja2VyVmlldz1cImNvbGxhcHNlXCI7XG4gICAgICAgIHRoaXMuYnV0dG9uVmlldz1cInZpc2libGVcIjtcbiAgICAgICAgdGhpcy5oaWRlU29mdEtleXBhZCgpO1xuICAgICAgICBcbiAgICB9XG4gICAgIG9uUGlja2VyTG9hZGVkKGFyZ3MpIHtcbiAgICAgICAgbGV0IGRhdGVQaWNrZXIgPSA8RGF0ZVBpY2tlcj5hcmdzLm9iamVjdDtcblxuICAgICAgICBcbiAgICAgICAgIGxldCBkZD0gdGhpcy50b2RheS5nZXREYXkoKTtcbiAgICAgICAgbGV0ICBtbSA9IHRoaXMudG9kYXkuZ2V0TW9udGgoKSsxOyAvL0phbnVhcnkgaXMgMCFcbiAgICAgICAgbGV0IHl5eXkgPSB0aGlzLnRvZGF5LmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJDdXJyZW50IERhdGUgPT09PT1cIitkZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBtb250aCA9PT09PVwiK21tKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXJyZW50IHllYXIgPT09PT1cIit5eXl5KTtcblxuICAgICAgICBkYXRlUGlja2VyLnllYXIgPSB5eXl5O1xuICAgICAgICAgZGF0ZVBpY2tlci5tb250aCA9bW07XG4gICAgICAgIC8vZGF0ZVBpY2tlci5kYXkgPWRkO1xuXG4gICAgICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IG5ldyBEYXRlKDE5NzUsIDAsIDI5KTtcbiAgICAgICAgZGF0ZVBpY2tlci5tYXhEYXRlID0gbmV3IERhdGUoMjA0NSwgNCwgMTIpO1xuXG4gICAgICAgICB0aGlzLmRhdGVQaWNrZXJ2YWx1ZT1cIlNlbGVjdCBFbmQgZGF0ZVwiO1xuICAgIH1cblxuICAgIG9uRGF0ZUNoYW5nZWQoYXJncykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRhdGUgY2hhbmdlZFwiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJOZXcgdmFsdWU9PT09PT09PT09PT09PT09PT06IFwiICsgYXJncy52YWx1ZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiT2xkIHZhbHVlOiBcIiArIGFyZ3Mub2xkVmFsdWUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRheSB2YWx1ZT09PT09OiBcIiArIGFyZ3MuRGF5KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJZZWFyIHZhbHVlPT09PT06IFwiICsgYXJncy5ZZWFyKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJNb250aCB2YWx1ZT09PT09OiBcIiArIGFyZ3MubW90aCk7XG4gICAgICAgIGxldCBkYXRlVmFsdWU9PERhdGVQaWNrZXI+YXJncy5vYmplY3Q7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJEYXk9PT1Nb250aD09PVllYXI9PT09XCIrZGF0ZVZhbHVlLmRheStcIiBcIitkYXRlVmFsdWUubW9udGgrXCIgXCIrZGF0ZVZhbHVlLnllYXIpO1xuICAgICAgICB0aGlzLmRhdGVQaWNrZXJ2YWx1ZT1kYXRlVmFsdWUuZGF5K1wiL1wiK2RhdGVWYWx1ZS5tb250aCtcIi9cIitkYXRlVmFsdWUueWVhcjtcbiAgICAgIFxuICAgIH0gICAgXG4gICAgcHVibGljIGl0ZW1UYXAoaXRlbSlcbiAgICB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJJdGVtIHRhcD0tPT09PT09PT1cIitpdGVtLm5hbWUpO1xuICAgICAgICBpZihpdGVtLnNlbGVjdGVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrQm94PVwiXFx1e2YwOTZ9XCI7XG5cbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGN1ckl0ZW09dGhpcy5zZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjdXIgaXRlbS0tLS0nK2N1ckl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmKGN1ckl0ZW09PWl0ZW0ubnVtYmVyKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZGV4IDo6Ojo6OicraSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy90aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKGl0ZW0ubnVtYmVyLDEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcyBhZnRlciBzbGljZT09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtcyk7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgIGl0ZW0uY2hlY2tCb3g9XCJcXHV7ZjA0Nn1cIjtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0ubnVtYmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQ9IWl0ZW0uc2VsZWN0ZWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXM9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgICAgICBcblxuXG5cbiAgICB9XG4gICBcbiAgICBcblxuICBwdWJsaWMgYXNzaWduVGFzaygpIFxuICB7XG5cbiAgICB2YXIgeD10aGlzO1xuICAgIHZhciB0YXNrTmFtZT10aGlzLnVzZXIudGFza05hbWU7XG4gICAgdmFyIGNhdGVnb3J5PXRoaXMudXNlci5jYXRlZ29yeTtcbiAgICB2YXIgZGF0ZVRpbWU9dGhpcy51c2VyLmRhdGVUaW1lO1xuICAgLy8gdmFyIGFzc2lnbmVlPXRoaXMudXNlci5hc3NpZ25lZTtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiVGFzayBuYW1lLS0tXCIrdGFza05hbWUpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnktLS1cIitjYXRlZ29yeSk7XG4gICAgIC8vY29uc29sZS5sb2coXCJEYXRlIHRpbWUtLS1cIitkYXRlVGltZSk7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFzc2lnbmVlLS0tXCIrYXNzaWduZWUpO1xuXG4gICAgXG4gICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdCkgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpPT1cIm51bGxcIilcbiAgICAgICAgICAgICAgICB7Ly8gY3JlYXRlIE15VGFza0RldGFpbHMsY3JlYXRlIHJlZ0tleSxjcmVhdGUgdGFzayBpZCxpbnNlcnQgdGFzayBkZXRhaWxzXG4gICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDcmVhdGUgbmV3IHRhYmxlOjpcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUaGlzLS0tXCIrdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHguZW50ZXJEYXRhSW50b015VGFza0RldGFpbHMoXCIxXCIsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJFbnRlciBkZXRhaWxzIGluIHRoZSBleGlzdGluZyB0YWJsZTo6XCIpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhpcy0tLVwiK3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICB4LmVudGVyRGF0YUludG9NeVRhc2tEZXRhaWxzKFwibnVsbFwiLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKHRhc2tOYW1lPT1udWxsIHx8IGNhdGVnb3J5PT1udWxsIHx8IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg8MSB8fCBkYXRlVGltZT09XCJTZWxlY3QgRW5kIGRhdGVcIil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVtcHR5ID09PT09XCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdGhpcyB0byB0cnVlIGlmIHlvdSB3YW50IHRvIGNoZWNrIGlmIHRoZSB2YWx1ZSBleGlzdHMgb3IganVzdCB3YW50IHRoZSBldmVudCB0byBmaXJlIG9uY2VcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBmYWxzZSwgc28gaXQgbGlzdGVucyBjb250aW51b3VzbHlcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yZGVyIGJ5IGNvbXBhbnkuY291bnRyeVxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd0YXNrTmFtZScgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gIH1cbiAgICBcbiAgICBwdWJsaWMgZW50ZXJEYXRhSW50b015VGFza0RldGFpbHMoaWQsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG4gICAgICAgIC8qKiB0ZW1wb3JhcnkgdmFsdWVzIGFzc2lnbmVkIG5lZWQgdG8gY2hhZ25lIGxhdGVyICovXG4gICAgICAgIHZhciByZWNpcGVudHNDb3VudD0xO1xuICAgICAgICB2YXIgcmVtYWluZGVyQ291bnQ9MDtcbiAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudD0wO1xuICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzPTA7XG4gICAgICAgIHZhciBpZFRlbXA7XG4gICAgICAgLy92YXIgYXNzaWduZWVzU2VsZWN0ZWQ9W1wiMTIzNDU2Nzg5XCIsXCIxMjM0NVwiXTtcbiAgICAgICAgLy92YXIgYXNzaWduZWVzU2VsZWN0ZWQ9dGhpcy5zZWxlY3RlZEl0ZW1zO1xuICAgICAgIC8vIGFzc2lnbmVlc1NlbGVjdGVkLnB1c2godGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGZvcih2YXIgaT0wO2k8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgYXNzaWduZWVzU2VsZWN0ZWQucHVzaCh0aGlzLnNlbGVjdGVkSXRlbXMuZ2V0SXRlbShpKSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFzc2lnbmVzc3Mgc2VsZWN0ZWQgaW4gYXNzaWduIHRhc2s9PT09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgdmFyIGRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZT1nZXRTdHJpbmcoXCJkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcIik7XG4gICAgICAgXG4gICAgICAgIC8vdmFyIGFzc2lnbmVlYXJyYXk9YXNzaWduZWVzU2VsZWN0ZWQudG9TdHJpbmcuXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaSB2YWx1ZT09PT09PT09PT09PT09XCIraSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImkgdmFsdWU9PT09PT09PT09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1tpXSk7XG5cbiAgICAgICAgICAgIGlmKGlkPT1cIjFcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAnL015VGFza0RldGFpbHMvJyt0aGlzLnNlbGVjdGVkSXRlbXNbaV0rJy8nK1wiMVwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgaGFzIGJlZW4gc2F2ZWQgc3VjY2Vzc2Z1bGx5IGluIG15IHRhc2sgZGV0YWlscyBmaXJzdCB0aW1lLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudHJ5IGFscmVhZHkgdGhlcmUgbmVlZCB0byBnZXQgbGFzdCBjb3VudCB2YWx1ZScpXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMYXN0Q291bnRBbmRFbnRlckRldGFpbHMoaSx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoLHRoaXMuc2VsZWN0ZWRJdGVtc1tpXSxyZWNpcGVudHNDb3VudCxyZW1haW5kZXJDb3VudCxkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsZGV2aWNlUGhvbmVOdW1iZXIsY29tcGxldGlvbkNvdW50LG15Q29tcGxldGlvblN0YXR1cyx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KSxpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IFxuICAgIHB1YmxpYyBnZXRMYXN0Q291bnRBbmRFbnRlckRldGFpbHMoaSxzZWxlZHRlZEl0ZW1zTGVuZ3RoLHNlbGVjdGVkQXNzaWduZWUscmVjaXBlbnRzQ291bnQscmVtYWluZGVyQ291bnQsZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLGRldmljZVBob25lTnVtYmVyLGNvbXBsZXRpb25Db3VudCxteUNvbXBsZXRpb25TdGF0dXMsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG5cbiAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsYXN0S2V5PTA7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIktleTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQua2V5KSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlZhbHVlIG5leHQgOjo6Ojs6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdrZXk6OjonK2tleSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsYXN0S2V5PXBhcnNlSW50KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2xhc3RLZXkgOjonK2xhc3RLZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0S2V5PWxhc3RLZXkrMTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdsYXN0S2V5IDo6JytsYXN0S2V5KTtcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycrc2VsZWN0ZWRBc3NpZ25lZSsnLycrbGFzdEtleSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaT09c2VsZWR0ZWRJdGVtc0xlbmd0aC0xKXtcbiAgICAgICAgICAgICAgICAgICAgeC5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvTXlUYXNrRGV0YWlscy8nK3NlbGVjdGVkQXNzaWduZWUrJy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGV4aXN0cyBvciBqdXN0IHdhbnQgdGhlIGV2ZW50IHRvIGZpcmUgb25jZVxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgZmFsc2UsIHNvIGl0IGxpc3RlbnMgY29udGludW91c2x5XG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICAvLyAgICB2YWx1ZTogJ3Rhc2tOYW1lJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuXG59XG4iXX0=