"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("application-settings");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var ListViewItems = (function () {
    function ListViewItems() {
    }
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
                        if (resultJson[key]["createdBy"] == null &&
                            resultJson[key]["taskName"] == null &&
                            resultJson[key]["dueDate"] == null &&
                            resultJson[key]["remainderCount"] == null &&
                            resultJson[key]["completionStatus"] == null &&
                            resultJson[key]["myCompletionStatus"] == null &&
                            resultJson[key]["recipentsCount"] == null &&
                            resultJson[key]["createdByRegId"] == null &&
                            resultJson[key]["completionCount"] == null) {
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
                        if (resultJson[key]["createdBy"] == null &&
                            resultJson[key]["taskName"] == null &&
                            resultJson[key]["dueDate"] == null &&
                            resultJson[key]["remainderCount"] == null &&
                            resultJson[key]["completionStatus"] == null &&
                            resultJson[key]["myCompletionStatus"] == null &&
                            resultJson[key]["recipentsCount"] == null &&
                            resultJson[key]["createdByRegId"] == null &&
                            resultJson[key]["completionCount"] == null) {
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
                                    "createdByNumber": createdByNumber
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
                            resultJson[key]["remainderCount"] == null) { }
                        else {
                            //   console.log("ELSE===");
                            // for(var key1 in resultJson[key]["AssigneeDetails"])
                            // {
                            // console.log("Detailed Key==="+key1);
                            // console.log("aName=="+resultJson[key]["AssigneeDetails"][key1]["assigneeName"]);
                            // console.log("dCount=="+resultJson[key]["AssigneeDetails"][key1]["deletionCount"]);
                            // console.log("rCount=="+resultJson[key]["AssigneeDetails"][key1]["remainderCount"]);
                            detailedDataItems.push({
                                "assigneeName": resultJson[key]["assigneeName"],
                                "remainderCount": resultJson[key]["remainderCount"],
                                "deletionCount": resultJson[key]["deletionCount"],
                                "assigneeNumber": key,
                                "completionStatus": resultJson[key]["completionStatus"],
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
