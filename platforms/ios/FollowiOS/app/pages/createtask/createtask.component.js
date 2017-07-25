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
var CreateTaskComponent = (function () {
    function CreateTaskComponent(router) {
        this.router = router;
        this.contactList = new observable_array_1.ObservableArray([]);
        this.user = new user_1.User();
        this.observable = new observable_1.Observable;
        this.listViewItems = new listviewitems_1.ListViewItems;
        this.contactList = this.listViewItems.getContactList();
        this.show = "collapse";
    }
    CreateTaskComponent.prototype.selectAssignee = function () {
        console.log("Tapped----");
        if (this.show == "visible") {
            this.show = 'collapse';
        }
        else {
            this.show = 'visible';
        }
    };
    CreateTaskComponent.prototype.assignTask = function () {
        var x = this;
        var taskName = this.user.taskName;
        var category = this.user.category;
        var dateTime = this.user.dateTime;
        var assignee = this.user.assignee;
        console.log("Task name---" + taskName);
        console.log("Category---" + category);
        console.log("Date time---" + dateTime);
        console.log("Assignee---" + assignee);
        var onQueryEvent = function (result) {
            if (!result.error) {
                //console.log("Event type: " + result.type);
                //console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value));
                if (JSON.stringify(result.value) == "null") {
                    console.log("Create new table::");
                    console.log("This---" + this);
                    x.enterDataIntoMyTaskDetails("1", taskName, category, dateTime, assignee, x);
                }
                else {
                    console.log("Enter details in the existing table::");
                    console.log("This---" + this);
                    x.enterDataIntoMyTaskDetails("null", taskName, category, dateTime, assignee, x);
                }
            }
        };
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
    };
    CreateTaskComponent.prototype.enterDataIntoMyTaskDetails = function (id, taskName, category, dateTime, assigneeName, x) {
        var _this = this;
        /** temporary values assigned need to chagne later */
        var recipentsCount = 1;
        var remainderCount = 0;
        var completionCount = 0;
        var myCompletionStatus = 0;
        var idTemp;
        var assigneesSelected = ["123456789", "12345"];
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var deviceRegisteredUserName = application_settings_1.getString("deviceRegisteredUserName");
        /** temporary values assigned need to chagne later */
        for (var i = 0; i < assigneesSelected.length; i++) {
            if (id == "1") {
                firebase.setValue('/MyTaskDetails/' + assigneesSelected[i] + '/' + "1", {
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
                this.getLastCountAndEnterDetails(assigneesSelected[i], recipentsCount, remainderCount, deviceRegisteredUserName, devicePhoneNumber, completionCount, myCompletionStatus, taskName, category, dateTime, x);
            }
        }
    };
    CreateTaskComponent.prototype.getLastCountAndEnterDetails = function (selectedAssignee, recipentsCount, remainderCount, deviceRegisteredUserName, devicePhoneNumber, completionCount, myCompletionStatus, taskName, category, dateTime, x) {
        var onQueryEvent = function (result) {
            var lastKey = 0;
            if (!result.error) {
                //console.log("Event type: " + result.type);
                //console.log("Key: " + JSON.stringify(result.key));
                //console.log("Value: " + result.value);
                //console.log("Value next ::::;: " + JSON.stringify(result.value));
                var resultJson = result.value;
                for (var key in resultJson) {
                    console.log('key:::' + key);
                    lastKey = parseInt(key);
                    console.log('lastKey ::' + lastKey);
                }
                lastKey = lastKey + 1;
                console.log('lastKey ::' + lastKey);
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
                    x.router.navigate([
                        '/mainfragment',
                        { outlets: { mytaskoutlet: ['mytask'] } }
                    ]);
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
    __metadata("design:paramtypes", [router_1.Router])
], CreateTaskComponent);
exports.CreateTaskComponent = CreateTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRldGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGV0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBeUM7QUFDekMsMkNBQTBDO0FBQzFDLHVEQUEwRDtBQUMxRCw2REFVOEI7QUFDOUIsMkVBQXlFO0FBQ3pFLDZEQUE0RDtBQUM1RCw4Q0FBNkM7QUFRN0MsSUFBYSxtQkFBbUI7SUFTNUIsNkJBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBTG5DLGdCQUFXLEdBQUMsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBTy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFFLElBQUksdUJBQVUsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksNkJBQWEsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLElBQUksR0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUlELDRDQUFjLEdBQWQ7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUUsU0FBUyxDQUFDLENBQUEsQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSSxDQUFBLENBQUM7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUMxQixDQUFDO0lBR0wsQ0FBQztJQUVJLHdDQUFVLEdBQWpCO1FBR0UsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDO1FBQ1gsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUMsUUFBUSxDQUFDLENBQUM7UUFHcEMsSUFBSSxZQUFZLEdBQUcsVUFBUyxNQUFNO1lBRTFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLDRDQUE0QztnQkFDNUMsb0NBQW9DO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUV0RCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBRSxNQUFNLENBQUMsQ0FDeEMsQ0FBQztvQkFDRyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7b0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QixDQUFDLENBQUMsMEJBQTBCLENBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUUsQ0FBQztnQkFDRCxJQUFJLENBQUEsQ0FBQztvQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7b0JBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QixDQUFDLENBQUMsMEJBQTBCLENBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0UsQ0FBQztZQUNMLENBQUM7UUFFTCxDQUFDLENBQUM7UUFDRixRQUFRLENBQUMsS0FBSyxDQUNWLFlBQVksRUFDaEIsaUJBQWlCLEVBQ2I7WUFDSSxnR0FBZ0c7WUFDaEcsNENBQTRDO1lBQzVDLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLDJCQUEyQjtZQUMzQixPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO2dCQUNyQyxLQUFLLEVBQUUsVUFBVSxDQUFDLGlDQUFpQzthQUN0RDtTQUNKLENBQ0osQ0FBQztJQUVSLENBQUM7SUFFUSx3REFBMEIsR0FBakMsVUFBa0MsRUFBRSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxDQUFDO1FBQTlFLGlCQWlEQztRQS9DRyxxREFBcUQ7UUFDckQsSUFBSSxjQUFjLEdBQUMsQ0FBQyxDQUFDO1FBQ3JCLElBQUksY0FBYyxHQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLGVBQWUsR0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxrQkFBa0IsR0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxNQUFNLENBQUM7UUFDWCxJQUFJLGlCQUFpQixHQUFDLENBQUMsV0FBVyxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksaUJBQWlCLEdBQUMsZ0NBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3JELElBQUksd0JBQXdCLEdBQUMsZ0NBQVMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ25FLHFEQUFxRDtRQUNyRCxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDMUMsQ0FBQztZQUNHLEVBQUUsQ0FBQSxDQUFDLEVBQUUsSUFBRSxHQUFHLENBQUMsQ0FDWCxDQUFDO2dCQUNHLFFBQVEsQ0FBQyxRQUFRLENBQ2pCLGlCQUFpQixHQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsR0FBQyxHQUFHLEVBQzlDO29CQUNJLFVBQVUsRUFBQyxRQUFRO29CQUNuQixVQUFVLEVBQUMsUUFBUTtvQkFDbkIsU0FBUyxFQUFDLFFBQVE7b0JBQ2xCLGdCQUFnQixFQUFDLGNBQWM7b0JBQy9CLGdCQUFnQixFQUFDLGNBQWM7b0JBQy9CLFdBQVcsRUFBQyx3QkFBd0I7b0JBQ3BDLGdCQUFnQixFQUFDLGlCQUFpQjtvQkFDbEMsaUJBQWlCLEVBQUMsZUFBZTtvQkFDakMsb0JBQW9CLEVBQUMsa0JBQWtCO2lCQUMxQyxDQUNBLENBQUMsSUFBSSxDQUNKLFVBQUMsR0FBRztvQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLG1FQUFtRSxHQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyRixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzt3QkFDWCxlQUFlO3dCQUNmLEVBQUUsT0FBTyxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtxQkFDMUMsQ0FBQyxDQUFDO2dCQUNiLENBQUMsRUFBQyxVQUFDLEdBQUc7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsR0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUQsQ0FBQyxDQUFDLENBQUM7WUFDVCxDQUFDO1lBQ0QsSUFBSSxDQUNKLENBQUM7Z0JBQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO2dCQUMvRCxJQUFJLENBQUMsMkJBQTJCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUMsY0FBYyxFQUFDLGNBQWMsRUFBQyx3QkFBd0IsRUFBQyxpQkFBaUIsRUFBQyxlQUFlLEVBQUMsa0JBQWtCLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFHcE0sQ0FBQztRQUVMLENBQUM7SUFDTCxDQUFDO0lBQ00seURBQTJCLEdBQWxDLFVBQW1DLGdCQUFnQixFQUFDLGNBQWMsRUFBQyxjQUFjLEVBQUMsd0JBQXdCLEVBQUMsaUJBQWlCLEVBQUMsZUFBZSxFQUFDLGtCQUFrQixFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLENBQUM7UUFHMUwsSUFBSSxZQUFZLEdBQUcsVUFBUyxNQUFNO1lBRTVCLElBQUksT0FBTyxHQUFDLENBQUMsQ0FBQztZQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUNsQixDQUFDO2dCQUNHLDRDQUE0QztnQkFDNUMsb0RBQW9EO2dCQUNwRCx3Q0FBd0M7Z0JBQ3hDLG1FQUFtRTtnQkFDbkUsSUFBSSxVQUFVLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDNUIsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLENBQzFCLENBQUM7b0JBQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDLENBQUM7b0JBRTFCLE9BQU8sR0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUd0QyxDQUFDO2dCQUNELE9BQU8sR0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEMsUUFBUSxDQUFDLFFBQVEsQ0FDakIsaUJBQWlCLEdBQUMsZ0JBQWdCLEdBQUMsR0FBRyxHQUFDLE9BQU8sRUFDOUM7b0JBQ1EsVUFBVSxFQUFDLFFBQVE7b0JBQ25CLFVBQVUsRUFBQyxRQUFRO29CQUNuQixTQUFTLEVBQUMsUUFBUTtvQkFDbEIsZ0JBQWdCLEVBQUMsY0FBYztvQkFDL0IsZ0JBQWdCLEVBQUMsY0FBYztvQkFDL0IsV0FBVyxFQUFDLHdCQUF3QjtvQkFDcEMsZ0JBQWdCLEVBQUMsaUJBQWlCO29CQUNsQyxpQkFBaUIsRUFBQyxlQUFlO29CQUNqQyxvQkFBb0IsRUFBQyxrQkFBa0I7aUJBQzlDLENBQUMsQ0FBQyxJQUFJLENBQ0QsVUFBQyxHQUFHO29CQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELEdBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO3dCQUNSLGVBQWU7d0JBQ2YsRUFBRSxPQUFPLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO3FCQUMxQyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxFQUFDLFVBQUMsR0FBRztvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxRCxDQUFDLENBQUMsQ0FBQztZQUdiLENBQUM7UUFFRCxDQUFDLENBQUM7UUFDRixRQUFRLENBQUMsS0FBSyxDQUNWLFlBQVksRUFDaEIsaUJBQWlCLEdBQUMsZ0JBQWdCLEdBQUMsR0FBRyxFQUNsQztZQUNJLGdHQUFnRztZQUNoRyw0Q0FBNEM7WUFDNUMsV0FBVyxFQUFFLElBQUk7WUFDakIsMkJBQTJCO1lBQzNCLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUc7YUFFdEM7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0lBR0wsMEJBQUM7QUFBRCxDQUFDLEFBM01ELElBMk1DO0FBM01ZLG1CQUFtQjtJQUwvQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsV0FBVyxFQUFFLGtDQUFrQztRQUMvQyxTQUFTLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxpQ0FBaUMsQ0FBQztLQUN6RixDQUFDO3FDQVU4QixlQUFNO0dBVHpCLG1CQUFtQixDQTJNL0I7QUEzTVksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vc2VydmljZS91c2VyXCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7XG4gICAgZ2V0Qm9vbGVhbixcbiAgICBzZXRCb29sZWFuLFxuICAgIGdldE51bWJlcixcbiAgICBzZXROdW1iZXIsXG4gICAgZ2V0U3RyaW5nLFxuICAgIHNldFN0cmluZyxcbiAgICBoYXNLZXksXG4gICAgcmVtb3ZlLFxuICAgIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBMaXN0Vmlld0l0ZW1zIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvbGlzdHZpZXdpdGVtc1wiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2NyZWF0ZXRhc2svY3JlYXRldGFzay5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvY3JlYXRldGFzay9jcmVhdGV0YXNrLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9jcmVhdGV0YXNrL2NyZWF0ZXRhc2suY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIENyZWF0ZVRhc2tDb21wb25lbnQgXG57XG4gIC8vIFlvdXIgVHlwZVNjcmlwdCBsb2dpYyBnb2VzIGhlcmVcbiAgIHVzZXI6IFVzZXJcbiAgIGNvbnRhY3RMaXN0PW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgbGlzdFZpZXdJdGVtczpMaXN0Vmlld0l0ZW1zO1xuICAgIG9ic2VydmFibGU6T2JzZXJ2YWJsZVxuICAgIHNob3c6c3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcilcbiAgICB7XG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgICAgIHRoaXMub2JzZXJ2YWJsZT0gbmV3IE9ic2VydmFibGU7XG4gICAgICAgIHRoaXMubGlzdFZpZXdJdGVtcz1uZXcgTGlzdFZpZXdJdGVtcztcbiAgICAgICAgdGhpcy5jb250YWN0TGlzdD10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0Q29udGFjdExpc3QoKTtcbiAgICAgICAgdGhpcy5zaG93PVwiY29sbGFwc2VcIjtcbiAgICB9XG5cblxuXG4gICAgc2VsZWN0QXNzaWduZWUoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJUYXBwZWQtLS0tXCIpO1xuICAgICAgICBpZih0aGlzLnNob3c9PVwidmlzaWJsZVwiKXtcbiAgICAgICAgICAgIHRoaXMuc2hvdyA9ICdjb2xsYXBzZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc2hvdyA9ICd2aXNpYmxlJztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuXG4gIHB1YmxpYyBhc3NpZ25UYXNrKCkgXG4gIHtcblxuICAgIHZhciB4PXRoaXM7XG4gICAgdmFyIHRhc2tOYW1lPXRoaXMudXNlci50YXNrTmFtZTtcbiAgICB2YXIgY2F0ZWdvcnk9dGhpcy51c2VyLmNhdGVnb3J5O1xuICAgIHZhciBkYXRlVGltZT10aGlzLnVzZXIuZGF0ZVRpbWU7XG4gICAgdmFyIGFzc2lnbmVlPXRoaXMudXNlci5hc3NpZ25lZTtcblxuICAgIGNvbnNvbGUubG9nKFwiVGFzayBuYW1lLS0tXCIrdGFza05hbWUpO1xuICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnktLS1cIitjYXRlZ29yeSk7XG4gICAgY29uc29sZS5sb2coXCJEYXRlIHRpbWUtLS1cIitkYXRlVGltZSk7XG4gICAgY29uc29sZS5sb2coXCJBc3NpZ25lZS0tLVwiK2Fzc2lnbmVlKTtcblxuICAgIFxuICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZSk9PVwibnVsbFwiKVxuICAgICAgICAgICAgICAgIHsvLyBjcmVhdGUgTXlUYXNrRGV0YWlscyxjcmVhdGUgcmVnS2V5LGNyZWF0ZSB0YXNrIGlkLGluc2VydCB0YXNrIGRldGFpbHNcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDcmVhdGUgbmV3IHRhYmxlOjpcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcy0tLVwiK3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICB4LmVudGVyRGF0YUludG9NeVRhc2tEZXRhaWxzKFwiMVwiLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLGFzc2lnbmVlLHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVudGVyIGRldGFpbHMgaW4gdGhlIGV4aXN0aW5nIHRhYmxlOjpcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcy0tLVwiK3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICB4LmVudGVyRGF0YUludG9NeVRhc2tEZXRhaWxzKFwibnVsbFwiLHRhc2tOYW1lLGNhdGVnb3J5LGRhdGVUaW1lLGFzc2lnbmVlLHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9O1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoaXMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBjaGVjayBpZiB0aGUgdmFsdWUgZXhpc3RzIG9yIGp1c3Qgd2FudCB0aGUgZXZlbnQgdG8gZmlyZSBvbmNlXG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBmYWxzZSwgc28gaXQgbGlzdGVucyBjb250aW51b3VzbHlcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAvLyBvcmRlciBieSBjb21wYW55LmNvdW50cnlcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuQ0hJTEQsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndGFza05hbWUnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgfVxuICAgIFxuICAgIHB1YmxpYyBlbnRlckRhdGFJbnRvTXlUYXNrRGV0YWlscyhpZCx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSxhc3NpZ25lZU5hbWUseClcbiAgICB7XG4gICAgICAgIC8qKiB0ZW1wb3JhcnkgdmFsdWVzIGFzc2lnbmVkIG5lZWQgdG8gY2hhZ25lIGxhdGVyICovXG4gICAgICAgIHZhciByZWNpcGVudHNDb3VudD0xO1xuICAgICAgICB2YXIgcmVtYWluZGVyQ291bnQ9MDtcbiAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudD0wO1xuICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzPTA7XG4gICAgICAgIHZhciBpZFRlbXA7XG4gICAgICAgIHZhciBhc3NpZ25lZXNTZWxlY3RlZD1bXCIxMjM0NTY3ODlcIixcIjEyMzQ1XCJdO1xuICAgICAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgICAgIHZhciBkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWU9Z2V0U3RyaW5nKFwiZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lXCIpO1xuICAgICAgICAvKiogdGVtcG9yYXJ5IHZhbHVlcyBhc3NpZ25lZCBuZWVkIHRvIGNoYWduZSBsYXRlciAqL1xuICAgICAgICBmb3IodmFyIGk9MDtpPGFzc2lnbmVlc1NlbGVjdGVkLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGlkPT1cIjFcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAnL015VGFza0RldGFpbHMvJythc3NpZ25lZXNTZWxlY3RlZFtpXSsnLycrXCIxXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGFza05hbWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcnknOmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAnZHVlRGF0ZSc6ZGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdyZWNpcGVudHNDb3VudCc6cmVjaXBlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJDb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnknOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWF0ZWRCeVJlZ0lkJzpkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRpb25Db3VudCc6Y29tcGxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnbXlDb21wbGV0aW9uU3RhdHVzJzpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzIGZpcnN0IHRpbWUtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL21haW5mcmFnbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG91dGxldHM6IHsgbXl0YXNrb3V0bGV0OiBbJ215dGFzayddIH0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gc2F2aW5nIG15IHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZW50cnkgYWxyZWFkeSB0aGVyZSBuZWVkIHRvIGdldCBsYXN0IGNvdW50IHZhbHVlJylcbiAgICAgICAgICAgICAgICB0aGlzLmdldExhc3RDb3VudEFuZEVudGVyRGV0YWlscyhhc3NpZ25lZXNTZWxlY3RlZFtpXSxyZWNpcGVudHNDb3VudCxyZW1haW5kZXJDb3VudCxkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsZGV2aWNlUGhvbmVOdW1iZXIsY29tcGxldGlvbkNvdW50LG15Q29tcGxldGlvblN0YXR1cyx0YXNrTmFtZSxjYXRlZ29yeSxkYXRlVGltZSx4KTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB9XG4gICAgfSBcbiAgICBwdWJsaWMgZ2V0TGFzdENvdW50QW5kRW50ZXJEZXRhaWxzKHNlbGVjdGVkQXNzaWduZWUscmVjaXBlbnRzQ291bnQscmVtYWluZGVyQ291bnQsZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lLGRldmljZVBob25lTnVtYmVyLGNvbXBsZXRpb25Db3VudCxteUNvbXBsZXRpb25TdGF0dXMsdGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUseClcbiAgICB7XG5cbiAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsYXN0S2V5PTA7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIktleTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQua2V5KSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlZhbHVlIG5leHQgOjo6Ojs6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygna2V5Ojo6JytrZXkpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGFzdEtleT1wYXJzZUludChrZXkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbGFzdEtleSA6OicrbGFzdEtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3RLZXk9bGFzdEtleSsxO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsYXN0S2V5IDo6JytsYXN0S2V5KTtcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgJy9NeVRhc2tEZXRhaWxzLycrc2VsZWN0ZWRBc3NpZ25lZSsnLycrbGFzdEtleSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Rhc2tOYW1lJzp0YXNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgJ2R1ZURhdGUnOmRhdGVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAncmVjaXBlbnRzQ291bnQnOnJlY2lwZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAncmVtYWluZGVyQ291bnQnOnJlbWFpbmRlckNvdW50LFxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlZEJ5JzpkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdjcmVhdGVkQnlSZWdJZCc6ZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOmNvbXBsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBoYXMgYmVlbiBzYXZlZCBzdWNjZXNzZnVsbHkgaW4gbXkgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgeC5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHNhdmluZyBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAnL015VGFza0RldGFpbHMvJytzZWxlY3RlZEFzc2lnbmVlKycvJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhpcyB0byB0cnVlIGlmIHlvdSB3YW50IHRvIGNoZWNrIGlmIHRoZSB2YWx1ZSBleGlzdHMgb3IganVzdCB3YW50IHRoZSBldmVudCB0byBmaXJlIG9uY2VcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IGZhbHNlLCBzbyBpdCBsaXN0ZW5zIGNvbnRpbnVvdXNseVxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIC8vIG9yZGVyIGJ5IGNvbXBhbnkuY291bnRyeVxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgLy8gICAgdmFsdWU6ICd0YXNrTmFtZScgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cblxufVxuIl19