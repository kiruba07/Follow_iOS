"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("application-settings");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var ListViewItems = (function () {
    function ListViewItems() {
    }
    ListViewItems.prototype.getCategoryList = function () {
        var categoryListItems = new observable_array_1.ObservableArray([]);
        var onQueryEvent = function (result) {
            if (!result.error) {
                var resultJson = result.value;
                for (var key in resultJson) {
                    if (resultJson[key] == null || resultJson[key] == "null") { }
                    else {
                        console.log("resultJson[key]===" + resultJson[key]);
                        var category = void 0;
                        category = resultJson[key];
                        categoryListItems.push({
                            "category": category,
                        });
                    }
                }
            }
        };
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        console.log("Device Phone Number----" + devicePhoneNumber);
        firebase.query(onQueryEvent, '/DeviceDetails/' + devicePhoneNumber + '/categoryList/list/', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
        return categoryListItems;
    };
    ListViewItems.prototype.getMyTaskdetails = function () {
        var dataItems = new observable_array_1.ObservableArray([]);
        var onQueryEvent = function (result) {
            if (!result.error) {
                var resultJson = result.value;
                //for not comepleted items
                for (var key in resultJson) {
                    if (resultJson[key] == null || resultJson[key] == "null") { }
                    else {
                        var createdBy;
                        var taskName;
                        var dueDate;
                        var remainderCount;
                        var completionStatus;
                        var myCompletionStatus;
                        var recepientsCount;
                        var createdByNumber;
                        var completionCount;
                        var createdByToken;
                        var assigneeNumber;
                        if (resultJson[key]["createdBy"] == null &&
                            resultJson[key]["taskName"] == null &&
                            resultJson[key]["dueDate"] == null &&
                            resultJson[key]["remainderCount"] == null &&
                            resultJson[key]["completionStatus"] == null &&
                            resultJson[key]["myCompletionStatus"] == null &&
                            resultJson[key]["recipentsCount"] == null &&
                            resultJson[key]["createdByRegId"] == null &&
                            resultJson[key]["completionCount"] == null &&
                            resultJson[key]["createdByToken"] == null &&
                            resultJson[key]["assigneeName"] == null) {
                        }
                        else {
                            createdBy = resultJson[key]["createdBy"];
                            taskName = resultJson[key]["taskName"];
                            dueDate = resultJson[key]["dueDate"];
                            remainderCount = resultJson[key]["remainderCount"];
                            completionStatus = resultJson[key]["completionStatus"];
                            recepientsCount = resultJson[key]["recipentsCount"];
                            createdByNumber = resultJson[key]["createdByRegId"];
                            completionCount = resultJson[key]["completionCount"];
                            createdByToken = resultJson[key]["createdByToken"];
                            assigneeNumber = resultJson[key]["assigneeName"];
                            if (resultJson[key]["myCompletionStatus"]) {
                            }
                            else {
                                myCompletionStatus = "notCompleted";
                                dataItems.push({
                                    "createdBy": createdBy,
                                    "taskName": taskName,
                                    "dueDate": dueDate,
                                    "remainderCount": remainderCount,
                                    "completionStatus": completionCount + "/" + recepientsCount,
                                    "key": key,
                                    "myCompletionStatus": myCompletionStatus,
                                    "createdByNumber": createdByNumber,
                                    "createdByToken": createdByToken,
                                    "assigneeNumber": assigneeNumber,
                                    "completed": false
                                });
                            }
                        }
                    }
                }
                // for  completed items
                for (var key in resultJson) {
                    if (resultJson[key] == null || resultJson[key] == "null") { }
                    else {
                        var createdBy;
                        var taskName;
                        var dueDate;
                        var remainderCount;
                        var completionStatus;
                        var myCompletionStatus;
                        var recepientsCount;
                        var createdByNumber;
                        var completionCount;
                        var createdByToken;
                        var assigneeNumber;
                        if (resultJson[key]["createdBy"] == null &&
                            resultJson[key]["taskName"] == null &&
                            resultJson[key]["dueDate"] == null &&
                            resultJson[key]["remainderCount"] == null &&
                            resultJson[key]["completionStatus"] == null &&
                            resultJson[key]["myCompletionStatus"] == null &&
                            resultJson[key]["recipentsCount"] == null &&
                            resultJson[key]["createdByRegId"] == null &&
                            resultJson[key]["completionCount"] == null &&
                            resultJson[key]["createdByToken"] == null &&
                            resultJson[key]["assigneeName"] == null) {
                        }
                        else {
                            createdBy = resultJson[key]["createdBy"];
                            taskName = resultJson[key]["taskName"];
                            dueDate = resultJson[key]["dueDate"];
                            remainderCount = resultJson[key]["remainderCount"];
                            completionStatus = resultJson[key]["completionStatus"];
                            recepientsCount = resultJson[key]["recipentsCount"];
                            createdByNumber = resultJson[key]["createdByRegId"];
                            completionCount = resultJson[key]["completionCount"];
                            createdByToken = resultJson[key]["createdByToken"];
                            assigneeNumber = resultJson[key]["assigneeName"];
                            if (resultJson[key]["myCompletionStatus"]) {
                                myCompletionStatus = "completed";
                                dataItems.push({
                                    "createdBy": createdBy,
                                    "taskName": taskName,
                                    "dueDate": dueDate,
                                    "remainderCount": remainderCount,
                                    "completionStatus": completionCount + "/" + recepientsCount,
                                    "key": key,
                                    "myCompletionStatus": myCompletionStatus,
                                    "createdByNumber": createdByNumber,
                                    "createdByToken": createdByToken,
                                    "assigneeNumber": assigneeNumber,
                                    "completed": true
                                });
                            }
                            else {
                            }
                        }
                    }
                }
            }
        };
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        console.log("Device Phone Number----" + devicePhoneNumber);
        firebase.query(onQueryEvent, '/MyTaskDetails/' + devicePhoneNumber, {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
        return dataItems;
    };
    ListViewItems.prototype.getOtherTaskDetailsDetailedDetails = function (key) {
        var detailedDataItems = new observable_array_1.ObservableArray([]);
        var onQueryEvent = function (result) {
            if (!result.error) {
                var resultJson = result.value;
                for (var key in resultJson) {
                    if (resultJson[key] == null || resultJson[key] == "null") { }
                    else {
                        // console.log("ELSE===");
                        // console.log("Assignee Name==="+resultJson[key]["assigneeName"]);
                        // console.log("deletionCount==="+resultJson[key]["deletionCount"]);
                        // console.log("remainderCount==="+resultJson[key]["remainderCount"]);
                        if (resultJson[key]["assigneeName"] == null &&
                            resultJson[key]["deletionCount"] == null &&
                            resultJson[key]["remainderCount"] == null &&
                            resultJson[key]["completionStatus"] == null &&
                            resultJson[key]["deviceToken"] == null &&
                            resultJson[key]["taskName"] == null &&
                            resultJson[key]["createdBy"] == null) { }
                        else {
                            //   console.log("ELSE===");
                            // for(var key1 in resultJson[key]["AssigneeDetails"])
                            // {
                            // console.log("Detailed Key==="+key1);
                            // console.log("aName=="+resultJson[key]["AssigneeDetails"][key1]["assigneeName"]);
                            // console.log("dCount=="+resultJson[key]["AssigneeDetails"][key1]["deletionCount"]);
                            // console.log("rCount=="+resultJson[key]["AssigneeDetails"][key1]["remainderCount"]);
                            var deletionStatus = resultJson[key]["deletionCount"];
                            var completionStatus = resultJson[key]["completionStatus"];
                            var visibilityDelete = void 0;
                            var visibilityComplete = void 0;
                            if (deletionStatus > 0) {
                                visibilityDelete = "visible";
                            }
                            else {
                                visibilityDelete = "collapsed";
                            }
                            if (completionStatus) {
                                visibilityComplete = "visible";
                            }
                            else {
                                visibilityComplete = "collapsed";
                            }
                            detailedDataItems.push({
                                "assigneeName": resultJson[key]["assigneeName"],
                                "remainderCount": resultJson[key]["remainderCount"],
                                "deletionCount": resultJson[key]["deletionCount"],
                                "deletionStatus": visibilityDelete,
                                "completionStatusFlag": visibilityComplete,
                                "assigneeNumber": key,
                                "completionStatus": resultJson[key]["completionStatus"],
                                "deviceToken": resultJson[key]["deviceToken"],
                                "taskName": resultJson[key]["taskName"],
                                "createdBy": resultJson[key]["createdBy"]
                            });
                            // console.log("For loop==="+detailedDataItems);
                            // }
                        }
                    }
                }
            }
        };
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        console.log("Device Phone Number----" + devicePhoneNumber);
        // console.log("Device Phone Number--Key--"+key);
        firebase.query(onQueryEvent, '/OtherTaskDetails/' + devicePhoneNumber + '/' + key + '/AssigneeDetails/', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
        //console.log("Detailed Items Return==="+detailedDataItems);
        return detailedDataItems;
    };
    ListViewItems.prototype.getOtherTaskDetails = function () {
        var dataItems = new observable_array_1.ObservableArray([]);
        var x = this;
        var onQueryEvent = function (result) {
            if (!result.error) {
                var resultJson = result.value;
                //for not comepleted items
                for (var key in resultJson) {
                    if (resultJson[key] == null || resultJson[key] == "null") { }
                    else {
                        var createdBy;
                        var taskName;
                        var dueDate;
                        var remainderCount;
                        var completionStatus;
                        var myCompletionStatus;
                        var deletionCount;
                        var recepientsCount;
                        var completionCount;
                        if (resultJson[key]["createdBy"] == null &&
                            resultJson[key]["taskName"] == null &&
                            resultJson[key]["dueDate"] == null &&
                            resultJson[key]["remainderCount"] == null &&
                            resultJson[key]["completionStatus"] == null &&
                            resultJson[key]["myCompletionStatus"] == null &&
                            resultJson[key]["deletionCount"] == null &&
                            resultJson[key]["recipentsCount"] == null &&
                            resultJson[key]["completionCount"] == null) {
                        }
                        else {
                            createdBy = resultJson[key]["createdBy"];
                            taskName = resultJson[key]["taskName"];
                            dueDate = resultJson[key]["dueDate"];
                            remainderCount = resultJson[key]["remainderCount"];
                            completionStatus = resultJson[key]["completionStatus"];
                            deletionCount = resultJson[key]["deletionCount"];
                            recepientsCount = resultJson[key]["recipentsCount"];
                            completionCount = resultJson[key]["completionCount"];
                            if (resultJson[key]["myCompletionStatus"]) {
                            }
                            else {
                                myCompletionStatus = "notCompleted";
                                dataItems.push({
                                    "createdBy": createdBy,
                                    "taskName": taskName,
                                    "dueDate": dueDate,
                                    "remainderCount": remainderCount,
                                    "completionStatus": completionCount + "/" + recepientsCount,
                                    "key": key,
                                    "myCompletionStatus": myCompletionStatus,
                                    "deletionCount": deletionCount,
                                    "detailedViewkey": "taskDetailedView" + key
                                });
                            }
                        }
                    }
                }
                // for  completed items
                for (var key in resultJson) {
                    if (resultJson[key] == null || resultJson[key] == "null") { }
                    else {
                        var createdBy;
                        var taskName;
                        var dueDate;
                        var remainderCount;
                        var completionStatus;
                        var myCompletionStatus;
                        var deletionCount;
                        var recepientsCount;
                        var completionCount;
                        if (resultJson[key]["createdBy"] == null &&
                            resultJson[key]["taskName"] == null &&
                            resultJson[key]["dueDate"] == null &&
                            resultJson[key]["remainderCount"] == null &&
                            resultJson[key]["completionStatus"] == null &&
                            resultJson[key]["myCompletionStatus"] == null &&
                            resultJson[key]["deletionCount"] == null &&
                            resultJson[key]["recipentsCount"] == null &&
                            resultJson[key]["completionCount"] == null) {
                        }
                        else {
                            createdBy = resultJson[key]["createdBy"];
                            taskName = resultJson[key]["taskName"];
                            dueDate = resultJson[key]["dueDate"];
                            remainderCount = resultJson[key]["remainderCount"];
                            completionStatus = resultJson[key]["completionStatus"];
                            deletionCount = resultJson[key]["deletionCount"];
                            recepientsCount = resultJson[key]["recipentsCount"];
                            recepientsCount = resultJson[key]["completionCount"];
                            if (resultJson[key]["myCompletionStatus"]) {
                                myCompletionStatus = "completed";
                                dataItems.push({
                                    "createdBy": createdBy,
                                    "taskName": taskName,
                                    "dueDate": dueDate,
                                    "remainderCount": remainderCount,
                                    "completionStatus": completionCount + "/" + recepientsCount,
                                    "key": key,
                                    "myCompletionStatus": myCompletionStatus,
                                    "deletionCount": deletionCount,
                                    "detailedViewkey": "taskDetailedView" + key
                                });
                            }
                            else {
                            }
                        }
                    }
                }
            }
        };
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        console.log("Device Phone Number---othertask=====-" + devicePhoneNumber);
        firebase.query(onQueryEvent, '/OtherTaskDetails/' + devicePhoneNumber, {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
        return dataItems;
    };
    ListViewItems.prototype.getContactList = function () {
        var contactList = new observable_array_1.ObservableArray([]);
        var onQueryEvent = function (result) {
            if (!result.error) {
                var resultJson = result.value;
                for (var key in resultJson) {
                    console.log('key:::' + key);
                    if (resultJson[key] == null || resultJson[key] == "null") {
                    }
                    else {
                        if (resultJson[key]["fName"] == null && resultJson[key]["lName"] == null) {
                        }
                        else {
                            //console.log("Value is not null");
                            contactList.push({
                                "name": resultJson[key]["fName"] + " " + resultJson[key]["lName"],
                                "number": key,
                                "checkBox": "\uF096",
                                "selected": false,
                                "nameLabel": resultJson[key]["fName"].charAt(0) + resultJson[key]["lName"].charAt(0),
                                "deviceToken": resultJson[key]["deviceToken"],
                            });
                            console.log("Contact list----" + contactList);
                        }
                    }
                }
            }
        };
        firebase.query(onQueryEvent, '/DeviceDetails/', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
        return contactList;
    };
    return ListViewItems;
}());
exports.ListViewItems = ListViewItems;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHZpZXdpdGVtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3R2aWV3aXRlbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsNkRBVThCO0FBQzlCLDJFQUF5RTtBQUV6RTtJQUFBO0lBMmtCQSxDQUFDO0lBeGtCRyx1Q0FBZSxHQUFmO1FBR0ksSUFBSSxpQkFBaUIsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxZQUFZLEdBQUcsVUFBUyxNQUFNO1lBR2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRWhCLElBQUksVUFBVSxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBRXhCLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUMxQixDQUFDO29CQUVHLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBRSxJQUFJLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFFLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDO29CQUN0RCxJQUFJLENBQUEsQ0FBQzt3QkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUVsRCxJQUFJLFFBQVEsU0FBQSxDQUFDO3dCQUNiLFFBQVEsR0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3pCLGlCQUFpQixDQUFDLElBQUksQ0FDdEI7NEJBQ0ssVUFBVSxFQUFDLFFBQVE7eUJBQ3ZCLENBQ0EsQ0FBQztvQkFDTixDQUFDO2dCQUVMLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxpQkFBaUIsR0FBQyxnQ0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsR0FB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LFVBQVUsRUFBQyxLQUFLO2dDQUNoQixXQUFXLEVBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQ0FDakYsYUFBYSxFQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUM7NkJBRS9DLENBQUMsQ0FBQzs0QkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNoRCxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztZQUVMLENBQUM7UUFFTCxDQUFDLENBQUE7UUFDRCxRQUFRLENBQUMsS0FBSyxDQUNWLFlBQVksRUFDaEIsaUJBQWlCLEVBQ2I7WUFFSSxXQUFXLEVBQUUsSUFBSTtZQUVqQixPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO2FBRXRDO1NBRUosQ0FDSixDQUFDO1FBRUwsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNwQixDQUFDO0lBRUwsb0JBQUM7QUFBRCxDQUFDLEFBM2tCRCxJQTJrQkM7QUEza0JZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuXG5leHBvcnQgY2xhc3MgTGlzdFZpZXdJdGVtc1xue1xuXG4gICAgZ2V0Q2F0ZWdvcnlMaXN0KClcbiAgICB7XG5cbiAgICAgICAgbGV0IGNhdGVnb3J5TGlzdEl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdEpzb25ba2V5XT09PVwiK3Jlc3VsdEpzb25ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk9cmVzdWx0SnNvbltrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlMaXN0SXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOmNhdGVnb3J5ICxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICApOyAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tLS1cIitkZXZpY2VQaG9uZU51bWJlcik7XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAgICAnL0RldmljZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnL2NhdGVnb3J5TGlzdC9saXN0LycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBcbiAgICAgICAgcmV0dXJuIGNhdGVnb3J5TGlzdEl0ZW1zO1xuICAgIH1cbiAgICBnZXRNeVRhc2tkZXRhaWxzKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhSXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIFxuXG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAvL2ZvciBub3QgY29tZXBsZXRlZCBpdGVtc1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIil7fVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFza05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5kZXJDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNlcGllbnRzQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnlUb2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZU51bWJlcjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl09PW51bGwgICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZWNpcGVudHNDb3VudFwiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5UmVnSWRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25Db3VudFwiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5VG9rZW5cIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImFzc2lnbmVlTmFtZVwiXT09bnVsbFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQnk9cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tOYW1lPXJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1ZURhdGU9cmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1haW5kZXJDb3VudD1yZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uU3RhdHVzPXJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZXBpZW50c0NvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeU51bWJlcj1yZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlSZWdJZFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeVRva2VuPXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVRva2VuXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlTnVtYmVyPXJlc3VsdEpzb25ba2V5XVtcImFzc2lnbmVlTmFtZVwiXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15Q29tcGxldGlvblN0YXR1cz1cIm5vdENvbXBsZXRlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhSXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlcIjpjcmVhdGVkQnkgLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFza05hbWVcIjp0YXNrTmFtZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImR1ZURhdGVcIjogZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVtYWluZGVyQ291bnRcIjogcmVtYWluZGVyQ291bnQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0aW9uU3RhdHVzXCI6IGNvbXBsZXRpb25Db3VudCtcIi9cIityZWNlcGllbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibXlDb21wbGV0aW9uU3RhdHVzXCI6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlOdW1iZXJcIjpjcmVhdGVkQnlOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVRva2VuXCI6Y3JlYXRlZEJ5VG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVlTnVtYmVyXCI6YXNzaWduZWVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOmZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZm9yICBjb21wbGV0ZWQgaXRlbXNcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIil7fVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFza05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5kZXJDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNlcGllbnRzQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnlUb2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZU51bWJlcjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl09PW51bGwgICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJteUNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlSZWdJZFwiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlUb2tlblwiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiYXNzaWduZWVOYW1lXCJdPT1udWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeT1yZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza05hbWU9cmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVlRGF0ZT1yZXN1bHRKc29uW2tleV1bXCJkdWVEYXRlXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlckNvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25TdGF0dXM9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlcGllbnRzQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5TnVtYmVyPXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVJlZ0lkXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25Db3VudD1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5VG9rZW49cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5VG9rZW5cIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWVOdW1iZXI9cmVzdWx0SnNvbltrZXldW1wiYXNzaWduZWVOYW1lXCJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDb21wbGV0aW9uU3RhdHVzPVwiY29tcGxldGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVwiOmNyZWF0ZWRCeSAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXNrTmFtZVwiOnRhc2tOYW1lLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZHVlRGF0ZVwiOiBkdWVEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZW1haW5kZXJDb3VudFwiOiByZW1haW5kZXJDb3VudCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0aW9uU3RhdHVzXCI6IGNvbXBsZXRpb25Db3VudCtcIi9cIityZWNlcGllbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibXlDb21wbGV0aW9uU3RhdHVzXCI6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlOdW1iZXJcIjpjcmVhdGVkQnlOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVRva2VuXCI6Y3JlYXRlZEJ5VG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVlTnVtYmVyXCI6YXNzaWduZWVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOnRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9O1xuXG4gICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tLS1cIitkZXZpY2VQaG9uZU51bWJlcik7XG4gICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAnL015VGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgIHJldHVybiBkYXRhSXRlbXM7XG4gICAgfVxuICAgIGdldE90aGVyVGFza0RldGFpbHNEZXRhaWxlZERldGFpbHMoa2V5KVxuICAgIHtcbiAgICAgICAgICAgIHZhciBkZXRhaWxlZERhdGFJdGVtcz1uZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICAgICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIil7fVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJFTFNFPT09XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQXNzaWduZWUgTmFtZT09PVwiK3Jlc3VsdEpzb25ba2V5XVtcImFzc2lnbmVlTmFtZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJkZWxldGlvbkNvdW50PT09XCIrcmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZW1haW5kZXJDb3VudD09PVwiK3Jlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcImFzc2lnbmVlTmFtZVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXT09bnVsbCAgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZGV2aWNlVG9rZW5cIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXT09bnVsbCl7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwiRUxTRT09PVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IodmFyIGtleTEgaW4gcmVzdWx0SnNvbltrZXldW1wiQXNzaWduZWVEZXRhaWxzXCJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRGV0YWlsZWQgS2V5PT09XCIra2V5MSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJhTmFtZT09XCIrcmVzdWx0SnNvbltrZXldW1wiQXNzaWduZWVEZXRhaWxzXCJdW2tleTFdW1wiYXNzaWduZWVOYW1lXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRDb3VudD09XCIrcmVzdWx0SnNvbltrZXldW1wiQXNzaWduZWVEZXRhaWxzXCJdW2tleTFdW1wiZGVsZXRpb25Db3VudFwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyQ291bnQ9PVwiK3Jlc3VsdEpzb25ba2V5XVtcIkFzc2lnbmVlRGV0YWlsc1wiXVtrZXkxXVtcInJlbWFpbmRlckNvdW50XCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVsZXRpb25TdGF0dXM6bnVtYmVyPXJlc3VsdEpzb25ba2V5XVtcImRlbGV0aW9uQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBsZXRpb25TdGF0dXM6Ym9vbGVhbj1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aXNpYmlsaXR5RGVsZXRlOnN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlzaWJpbGl0eUNvbXBsZXRlOnN0cmluZztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRlbGV0aW9uU3RhdHVzPjApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5RGVsZXRlPVwidmlzaWJsZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5RGVsZXRlPVwiY29sbGFwc2VkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvbXBsZXRpb25TdGF0dXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5Q29tcGxldGU9XCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHlDb21wbGV0ZT1cImNvbGxhcHNlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxlZERhdGFJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXNzaWduZWVOYW1lXCI6cmVzdWx0SnNvbltrZXldW1wiYXNzaWduZWVOYW1lXCJdICwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlbWFpbmRlckNvdW50XCI6cmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWxldGlvbkNvdW50XCI6IHJlc3VsdEpzb25ba2V5XVtcImRlbGV0aW9uQ291bnRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlbGV0aW9uU3RhdHVzXCI6dmlzaWJpbGl0eURlbGV0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGlvblN0YXR1c0ZsYWdcIjp2aXNpYmlsaXR5Q29tcGxldGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVlTnVtYmVyXCI6IGtleSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRpb25TdGF0dXNcIjpyZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXZpY2VUb2tlblwiOnJlc3VsdEpzb25ba2V5XVtcImRldmljZVRva2VuXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXNrTmFtZVwiOnJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlcIjpyZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGb3IgbG9vcD09PVwiK2RldGFpbGVkRGF0YUl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tLS1cIitkZXZpY2VQaG9uZU51bWJlcik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tS2V5LS1cIitrZXkpO1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK2tleSsnL0Fzc2lnbmVlRGV0YWlscy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRldGFpbGVkIEl0ZW1zIFJldHVybj09PVwiK2RldGFpbGVkRGF0YUl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIGRldGFpbGVkRGF0YUl0ZW1zO1xuICAgIH1cbiAgICBnZXRPdGhlclRhc2tEZXRhaWxzKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhSXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIHZhciB4PXRoaXM7XG5cbiAgICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAge1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XG4gICAgICAgICBcbiAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgIC8vZm9yIG5vdCBjb21lcGxldGVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXNrTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjZXBpZW50c0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdPT1udWxsICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdPT1udWxsICAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdPT1udWxsXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQnk9cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tOYW1lPXJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1ZURhdGU9cmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1haW5kZXJDb3VudD1yZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uU3RhdHVzPXJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRpb25Db3VudD1yZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VwaWVudHNDb3VudD1yZXN1bHRKc29uW2tleV1bXCJyZWNpcGVudHNDb3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDb21wbGV0aW9uU3RhdHVzPVwibm90Q29tcGxldGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVwiOmNyZWF0ZWRCeSAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXNrTmFtZVwiOnRhc2tOYW1lLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZHVlRGF0ZVwiOiBkdWVEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZW1haW5kZXJDb3VudFwiOiByZW1haW5kZXJDb3VudCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRpb25TdGF0dXNcIjogY29tcGxldGlvbkNvdW50K1wiL1wiK3JlY2VwaWVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJteUNvbXBsZXRpb25TdGF0dXNcIjpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlbGV0aW9uQ291bnRcIjpkZWxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXRhaWxlZFZpZXdrZXlcIjpcInRhc2tEZXRhaWxlZFZpZXdcIitrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBmb3IgIGNvbXBsZXRlZCBpdGVtc1xuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXNrTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjZXBpZW50c0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdPT1udWxsICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl09PW51bGwgXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5PXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTmFtZT1yZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWVEYXRlPXJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvblN0YXR1cz1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0aW9uQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZXBpZW50c0NvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlcGllbnRzQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDb21wbGV0aW9uU3RhdHVzPVwiY29tcGxldGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVwiOmNyZWF0ZWRCeSAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXNrTmFtZVwiOnRhc2tOYW1lLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZHVlRGF0ZVwiOiBkdWVEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZW1haW5kZXJDb3VudFwiOiByZW1haW5kZXJDb3VudCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRpb25TdGF0dXNcIjogY29tcGxldGlvbkNvdW50K1wiL1wiK3JlY2VwaWVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJteUNvbXBsZXRpb25TdGF0dXNcIjpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlbGV0aW9uQ291bnRcIjpkZWxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV0YWlsZWRWaWV3a2V5XCI6XCJ0YXNrRGV0YWlsZWRWaWV3XCIra2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH07XG5cbiAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgY29uc29sZS5sb2coXCJEZXZpY2UgUGhvbmUgTnVtYmVyLS0tb3RoZXJ0YXNrPT09PT0tXCIrZGV2aWNlUGhvbmVOdW1iZXIpO1xuICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICByZXR1cm4gZGF0YUl0ZW1zO1xuICAgIH1cbiAgICBnZXRDb250YWN0TGlzdCgpXG4gICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhY3RMaXN0PW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygna2V5Ojo6JytrZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIilcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJmTmFtZVwiXT09bnVsbCAmJiByZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXT09bnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJWYWx1ZSBpcyBub3QgbnVsbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0TGlzdC5wdXNoKHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpyZXN1bHRKc29uW2tleV1bXCJmTmFtZVwiXStcIiBcIityZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjprZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hlY2tCb3hcIjpcIlxcdXtmMDk2fVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkXCI6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZUxhYmVsXCI6cmVzdWx0SnNvbltrZXldW1wiZk5hbWVcIl0uY2hhckF0KDApK3Jlc3VsdEpzb25ba2V5XVtcImxOYW1lXCJdLmNoYXJBdCgwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXZpY2VUb2tlblwiOnJlc3VsdEpzb25ba2V5XVtcImRldmljZVRva2VuXCJdLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb250YWN0IGxpc3QtLS0tXCIrY29udGFjdExpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvRGV2aWNlRGV0YWlscy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgLy92YWx1ZTogJ3Rhc2tOYW1lJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIFxuICAgICByZXR1cm4gY29udGFjdExpc3Q7XG4gICAgfVxuXG59XG5cbiAgICBcblxuICJdfQ==