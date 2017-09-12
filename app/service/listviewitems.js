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
                console.log("Category List==========" + categoryListItems);
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
    ListViewItems.prototype.getGroupList = function () {
        var groupListItems = new observable_array_1.ObservableArray([]);
        var onQueryEvent = function (result) {
            if (!result.error) {
                var resultJson = result.value;
                for (var key in resultJson) {
                    if (key == null || key == "null") { }
                    else {
                        console.log("[key]===" + key);
                        var group = void 0;
                        group = key;
                        groupListItems.push({
                            "group": group,
                        });
                    }
                }
                console.log("Group List==========" + groupListItems);
            }
        };
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        console.log("Device Phone Number----" + devicePhoneNumber);
        firebase.query(onQueryEvent, '/DeviceDetails/' + devicePhoneNumber + '/groupList/', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
        return groupListItems;
    };
    ListViewItems.prototype.getCategoryListForCreateTask = function () {
        var categoryListItems = [];
        var onQueryEvent = function (result) {
            if (!result.error) {
                var resultJson = result.value;
                for (var key in resultJson) {
                    if (resultJson[key] == null || resultJson[key] == "null") { }
                    else {
                        console.log("resultJson[key]===" + resultJson[key]);
                        var category = void 0;
                        category = resultJson[key];
                        categoryListItems.push(category);
                    }
                }
                console.log("Category List==== create task======" + categoryListItems);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHZpZXdpdGVtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3R2aWV3aXRlbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsNkRBVThCO0FBQzlCLDJFQUF5RTtBQUV6RTtJQUFBO0lBK3FCQSxDQUFDO0lBNXFCRyx1Q0FBZSxHQUFmO1FBR0ksSUFBSSxpQkFBaUIsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxZQUFZLEdBQUcsVUFBUyxNQUFNO1lBR2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRWhCLElBQUksVUFBVSxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBRXhCLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUMxQixDQUFDO29CQUVHLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBRSxJQUFJLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFFLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDO29CQUN0RCxJQUFJLENBQUEsQ0FBQzt3QkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUVsRCxJQUFJLFFBQVEsU0FBQSxDQUFDO3dCQUNiLFFBQVEsR0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3pCLGlCQUFpQixDQUFDLElBQUksQ0FDdEI7NEJBQ0ssVUFBVSxFQUFDLFFBQVE7eUJBQ3ZCLENBQ0EsQ0FBQztvQkFDTixDQUFDO2dCQUVMLENBQUM7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsR0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRTdELENBQUM7UUFDTCxDQUFDLENBQUM7UUFDRixJQUFJLGlCQUFpQixHQUFDLGdDQUFTLENB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Q0FBQyxJQUFJLENBQUM7Z0NBRWIsTUFBTSxFQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBQyxHQUFHLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQ0FDNUQsUUFBUSxFQUFDLEdBQUc7Z0NBQ1osVUFBVSxFQUFDLFFBQVU7Z0NBQ3JCLFVBQVUsRUFBQyxLQUFLO2dDQUNoQixXQUFXLEVBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQ0FDakYsYUFBYSxFQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUM7NkJBRS9DLENBQUMsQ0FBQzs0QkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNoRCxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztZQUVMLENBQUM7UUFFTCxDQUFDLENBQUE7UUFDRCxRQUFRLENBQUMsS0FBSyxDQUNWLFlBQVksRUFDaEIsaUJBQWlCLEVBQ2I7WUFFSSxXQUFXLEVBQUUsSUFBSTtZQUVqQixPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO2FBRXRDO1NBRUosQ0FDSixDQUFDO1FBRUwsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNwQixDQUFDO0lBRUwsb0JBQUM7QUFBRCxDQUFDLEFBL3FCRCxJQStxQkM7QUEvcUJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuXG5leHBvcnQgY2xhc3MgTGlzdFZpZXdJdGVtc1xue1xuXG4gICAgZ2V0Q2F0ZWdvcnlMaXN0KClcbiAgICB7XG5cbiAgICAgICAgbGV0IGNhdGVnb3J5TGlzdEl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdEpzb25ba2V5XT09PVwiK3Jlc3VsdEpzb25ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk9cmVzdWx0SnNvbltrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlMaXN0SXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOmNhdGVnb3J5ICxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICApOyAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgTGlzdD09PT09PT09PT1cIitjYXRlZ29yeUxpc3RJdGVtcyk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRldmljZSBQaG9uZSBOdW1iZXItLS0tXCIrZGV2aWNlUGhvbmVOdW1iZXIpO1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgICAgJy9EZXZpY2VEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy9jYXRlZ29yeUxpc3QvbGlzdC8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgXG4gICAgICAgIHJldHVybiBjYXRlZ29yeUxpc3RJdGVtcztcbiAgICB9XG4gICAgZ2V0R3JvdXBMaXN0KCl7XG5cbiAgICAgICAgbGV0IGdyb3VwTGlzdEl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKGtleT09bnVsbCB8fCBrZXk9PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltrZXldPT09XCIra2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncm91cDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwPWtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdEl0ZW1zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ3JvdXBcIjpncm91cCAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgKTsgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIExpc3Q9PT09PT09PT09XCIrZ3JvdXBMaXN0SXRlbXMpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGxldCBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJEZXZpY2UgUGhvbmUgTnVtYmVyLS0tLVwiK2RldmljZVBob25lTnVtYmVyKTtcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICAgICcvRGV2aWNlRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvZ3JvdXBMaXN0LycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICBcbiAgICAgICAgcmV0dXJuIGdyb3VwTGlzdEl0ZW1zO1xuICAgIH1cbiAgICBnZXRDYXRlZ29yeUxpc3RGb3JDcmVhdGVUYXNrKClcbiAgICB7XG5cbiAgICAgICAgbGV0IGNhdGVnb3J5TGlzdEl0ZW1zOnN0cmluZ1tdPVtdO1xuICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdEpzb25ba2V5XT09PVwiK3Jlc3VsdEpzb25ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhdGVnb3J5O1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk9cmVzdWx0SnNvbltrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlMaXN0SXRlbXMucHVzaChjYXRlZ29yeSk7ICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgTGlzdD09PT0gY3JlYXRlIHRhc2s9PT09PT1cIitjYXRlZ29yeUxpc3RJdGVtcyk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRldmljZSBQaG9uZSBOdW1iZXItLS0tXCIrZGV2aWNlUGhvbmVOdW1iZXIpO1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgICAgJy9EZXZpY2VEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy9jYXRlZ29yeUxpc3QvbGlzdC8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgXG4gICAgICAgIHJldHVybiBjYXRlZ29yeUxpc3RJdGVtcztcbiAgICB9XG4gICAgZ2V0TXlUYXNrZGV0YWlscygpXG4gICAge1xuICAgICAgICB2YXIgZGF0YUl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICBcblxuICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgLy9mb3Igbm90IGNvbWVwbGV0ZWQgaXRlbXNcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldPT1udWxsIHx8IHJlc3VsdEpzb25ba2V5XT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhc2tOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR1ZURhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVtYWluZGVyQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBteUNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjZXBpZW50c0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeU51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5VG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWVOdW1iZXI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdPT1udWxsICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVJlZ0lkXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVRva2VuXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJhc3NpZ25lZU5hbWVcIl09PW51bGxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5PXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTmFtZT1yZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWVEYXRlPXJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvblN0YXR1cz1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VwaWVudHNDb3VudD1yZXN1bHRKc29uW2tleV1bXCJyZWNpcGVudHNDb3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQnlOdW1iZXI9cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5UmVnSWRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvbkNvdW50PXJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25Db3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQnlUb2tlbj1yZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlUb2tlblwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZU51bWJlcj1yZXN1bHRKc29uW2tleV1bXCJhc3NpZ25lZU5hbWVcIl07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJteUNvbXBsZXRpb25TdGF0dXNcIl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUNvbXBsZXRpb25TdGF0dXM9XCJub3RDb21wbGV0ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUl0ZW1zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5XCI6Y3JlYXRlZEJ5ICwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhc2tOYW1lXCI6dGFza05hbWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkdWVEYXRlXCI6IGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlbWFpbmRlckNvdW50XCI6IHJlbWFpbmRlckNvdW50LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGlvblN0YXR1c1wiOiBjb21wbGV0aW9uQ291bnQrXCIvXCIrcmVjZXBpZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjprZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm15Q29tcGxldGlvblN0YXR1c1wiOm15Q29tcGxldGlvblN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5TnVtYmVyXCI6Y3JlYXRlZEJ5TnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlUb2tlblwiOmNyZWF0ZWRCeVRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhc3NpZ25lZU51bWJlclwiOmFzc2lnbmVlTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjpmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZvciAgY29tcGxldGVkIGl0ZW1zXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldPT1udWxsIHx8IHJlc3VsdEpzb25ba2V5XT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhc2tOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR1ZURhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVtYWluZGVyQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBteUNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjZXBpZW50c0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeU51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5VG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWVOdW1iZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdPT1udWxsICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZWNpcGVudHNDb3VudFwiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5UmVnSWRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25Db3VudFwiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5VG9rZW5cIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImFzc2lnbmVlTmFtZVwiXT09bnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQnk9cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tOYW1lPXJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1ZURhdGU9cmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1haW5kZXJDb3VudD1yZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uU3RhdHVzPXJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZXBpZW50c0NvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeU51bWJlcj1yZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlSZWdJZFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeVRva2VuPXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVRva2VuXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlTnVtYmVyPXJlc3VsdEpzb25ba2V5XVtcImFzc2lnbmVlTmFtZVwiXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15Q29tcGxldGlvblN0YXR1cz1cImNvbXBsZXRlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhSXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlcIjpjcmVhdGVkQnkgLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFza05hbWVcIjp0YXNrTmFtZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImR1ZURhdGVcIjogZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVtYWluZGVyQ291bnRcIjogcmVtYWluZGVyQ291bnQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGlvblN0YXR1c1wiOiBjb21wbGV0aW9uQ291bnQrXCIvXCIrcmVjZXBpZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjprZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm15Q29tcGxldGlvblN0YXR1c1wiOm15Q29tcGxldGlvblN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5TnVtYmVyXCI6Y3JlYXRlZEJ5TnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlUb2tlblwiOmNyZWF0ZWRCeVRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhc3NpZ25lZU51bWJlclwiOmFzc2lnbmVlTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZWRcIjp0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfTtcblxuICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICBjb25zb2xlLmxvZyhcIkRldmljZSBQaG9uZSBOdW1iZXItLS0tXCIrZGV2aWNlUGhvbmVOdW1iZXIpO1xuICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgJy9NeVRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICByZXR1cm4gZGF0YUl0ZW1zO1xuICAgIH1cbiAgICBnZXRPdGhlclRhc2tEZXRhaWxzRGV0YWlsZWREZXRhaWxzKGtleSlcbiAgICB7XG4gICAgICAgICAgICB2YXIgZGV0YWlsZWREYXRhSXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldPT1udWxsIHx8IHJlc3VsdEpzb25ba2V5XT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRUxTRT09PVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFzc2lnbmVlIE5hbWU9PT1cIityZXN1bHRKc29uW2tleV1bXCJhc3NpZ25lZU5hbWVcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZGVsZXRpb25Db3VudD09PVwiK3Jlc3VsdEpzb25ba2V5XVtcImRlbGV0aW9uQ291bnRcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVtYWluZGVyQ291bnQ9PT1cIityZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJhc3NpZ25lZU5hbWVcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImRlbGV0aW9uQ291bnRcIl09PW51bGwgICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImRldmljZVRva2VuXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl09PW51bGwpe31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIkVMU0U9PT1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yKHZhciBrZXkxIGluIHJlc3VsdEpzb25ba2V5XVtcIkFzc2lnbmVlRGV0YWlsc1wiXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRldGFpbGVkIEtleT09PVwiK2tleTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYU5hbWU9PVwiK3Jlc3VsdEpzb25ba2V5XVtcIkFzc2lnbmVlRGV0YWlsc1wiXVtrZXkxXVtcImFzc2lnbmVlTmFtZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJkQ291bnQ9PVwiK3Jlc3VsdEpzb25ba2V5XVtcIkFzc2lnbmVlRGV0YWlsc1wiXVtrZXkxXVtcImRlbGV0aW9uQ291bnRcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwickNvdW50PT1cIityZXN1bHRKc29uW2tleV1bXCJBc3NpZ25lZURldGFpbHNcIl1ba2V5MV1bXCJyZW1haW5kZXJDb3VudFwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlbGV0aW9uU3RhdHVzOm51bWJlcj1yZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb21wbGV0aW9uU3RhdHVzOmJvb2xlYW49cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlzaWJpbGl0eURlbGV0ZTpzdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpc2liaWxpdHlDb21wbGV0ZTpzdHJpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkZWxldGlvblN0YXR1cz4wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eURlbGV0ZT1cInZpc2libGVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eURlbGV0ZT1cImNvbGxhcHNlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb21wbGV0aW9uU3RhdHVzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eUNvbXBsZXRlPVwidmlzaWJsZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5Q29tcGxldGU9XCJjb2xsYXBzZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsZWREYXRhSXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVlTmFtZVwiOnJlc3VsdEpzb25ba2V5XVtcImFzc2lnbmVlTmFtZVwiXSAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZW1haW5kZXJDb3VudFwiOnJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVsZXRpb25Db3VudFwiOiByZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWxldGlvblN0YXR1c1wiOnZpc2liaWxpdHlEZWxldGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRpb25TdGF0dXNGbGFnXCI6dmlzaWJpbGl0eUNvbXBsZXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhc3NpZ25lZU51bWJlclwiOiBrZXksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0aW9uU3RhdHVzXCI6cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV2aWNlVG9rZW5cIjpyZXN1bHRKc29uW2tleV1bXCJkZXZpY2VUb2tlblwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFza05hbWVcIjpyZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5XCI6cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRm9yIGxvb3A9PT1cIitkZXRhaWxlZERhdGFJdGVtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRldmljZSBQaG9uZSBOdW1iZXItLS0tXCIrZGV2aWNlUGhvbmVOdW1iZXIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRldmljZSBQaG9uZSBOdW1iZXItLUtleS0tXCIra2V5KTtcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytrZXkrJy9Bc3NpZ25lZURldGFpbHMvJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJEZXRhaWxlZCBJdGVtcyBSZXR1cm49PT1cIitkZXRhaWxlZERhdGFJdGVtcyk7XG4gICAgICAgIHJldHVybiBkZXRhaWxlZERhdGFJdGVtcztcbiAgICB9XG4gICAgZ2V0T3RoZXJUYXNrRGV0YWlscygpXG4gICAge1xuICAgICAgICB2YXIgZGF0YUl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICB2YXIgeD10aGlzO1xuXG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAvL2ZvciBub3QgY29tZXBsZXRlZCBpdGVtc1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIil7fVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFza05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5kZXJDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWxldGlvbkNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY2VwaWVudHNDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXT09bnVsbCAgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJkdWVEYXRlXCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJteUNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImRlbGV0aW9uQ291bnRcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZWNpcGVudHNDb3VudFwiXT09bnVsbCAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25Db3VudFwiXT09bnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5PXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTmFtZT1yZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWVEYXRlPXJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvblN0YXR1cz1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0aW9uQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlcGllbnRzQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvbkNvdW50PXJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25Db3VudFwiXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15Q29tcGxldGlvblN0YXR1cz1cIm5vdENvbXBsZXRlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhSXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlcIjpjcmVhdGVkQnkgLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFza05hbWVcIjp0YXNrTmFtZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImR1ZURhdGVcIjogZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVtYWluZGVyQ291bnRcIjogcmVtYWluZGVyQ291bnQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0aW9uU3RhdHVzXCI6IGNvbXBsZXRpb25Db3VudCtcIi9cIityZWNlcGllbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibXlDb21wbGV0aW9uU3RhdHVzXCI6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWxldGlvbkNvdW50XCI6ZGVsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV0YWlsZWRWaWV3a2V5XCI6XCJ0YXNrRGV0YWlsZWRWaWV3XCIra2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZm9yICBjb21wbGV0ZWQgaXRlbXNcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIil7fVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFza05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5kZXJDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWxldGlvbkNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY2VwaWVudHNDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXT09bnVsbCAgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJkdWVEYXRlXCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJteUNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdPT1udWxsIFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeT1yZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza05hbWU9cmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVlRGF0ZT1yZXN1bHRKc29uW2tleV1bXCJkdWVEYXRlXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlckNvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25TdGF0dXM9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGlvbkNvdW50PXJlc3VsdEpzb25ba2V5XVtcImRlbGV0aW9uQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VwaWVudHNDb3VudD1yZXN1bHRKc29uW2tleV1bXCJyZWNpcGVudHNDb3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZXBpZW50c0NvdW50PXJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25Db3VudFwiXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15Q29tcGxldGlvblN0YXR1cz1cImNvbXBsZXRlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhSXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlcIjpjcmVhdGVkQnkgLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFza05hbWVcIjp0YXNrTmFtZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImR1ZURhdGVcIjogZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVtYWluZGVyQ291bnRcIjogcmVtYWluZGVyQ291bnQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0aW9uU3RhdHVzXCI6IGNvbXBsZXRpb25Db3VudCtcIi9cIityZWNlcGllbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibXlDb21wbGV0aW9uU3RhdHVzXCI6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWxldGlvbkNvdW50XCI6ZGVsZXRpb25Db3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRldGFpbGVkVmlld2tleVwiOlwidGFza0RldGFpbGVkVmlld1wiK2tleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9O1xuXG4gICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tLW90aGVydGFzaz09PT09LVwiK2RldmljZVBob25lTnVtYmVyKTtcbiAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICcvT3RoZXJUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyLFxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgcmV0dXJuIGRhdGFJdGVtcztcbiAgICB9XG4gICAgZ2V0Q29udGFjdExpc3QoKVxuICAgIHtcbiAgICAgICAgICAgIHZhciBjb250YWN0TGlzdD1uZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICAgICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2tleTo6Oicra2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldPT1udWxsIHx8IHJlc3VsdEpzb25ba2V5XT09XCJudWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiZk5hbWVcIl09PW51bGwgJiYgcmVzdWx0SnNvbltrZXldW1wibE5hbWVcIl09PW51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVmFsdWUgaXMgbm90IG51bGxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdExpc3QucHVzaCh7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6cmVzdWx0SnNvbltrZXldW1wiZk5hbWVcIl0rXCIgXCIrcmVzdWx0SnNvbltrZXldW1wibE5hbWVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoZWNrQm94XCI6XCJcXHV7ZjA5Nn1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZFwiOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVMYWJlbFwiOnJlc3VsdEpzb25ba2V5XVtcImZOYW1lXCJdLmNoYXJBdCgwKStyZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXS5jaGFyQXQoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV2aWNlVG9rZW5cIjpyZXN1bHRKc29uW2tleV1bXCJkZXZpY2VUb2tlblwiXSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29udGFjdCBsaXN0LS0tLVwiK2NvbnRhY3RMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAnL0RldmljZURldGFpbHMvJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICAgIC8vdmFsdWU6ICd0YXNrTmFtZScgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICBcbiAgICAgcmV0dXJuIGNvbnRhY3RMaXN0O1xuICAgIH1cblxufVxuXG4gICAgXG5cbiAiXX0=