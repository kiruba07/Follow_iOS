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
                        var createdByToken;
                        if (resultJson[key]["createdBy"] == null &&
                            resultJson[key]["taskName"] == null &&
                            resultJson[key]["dueDate"] == null &&
                            resultJson[key]["remainderCount"] == null &&
                            resultJson[key]["completionStatus"] == null &&
                            resultJson[key]["myCompletionStatus"] == null &&
                            resultJson[key]["recipentsCount"] == null &&
                            resultJson[key]["createdByRegId"] == null &&
                            resultJson[key]["completionCount"] == null &&
                            resultJson[key]["createdByToken"] == null) {
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
                        if (resultJson[key]["createdBy"] == null &&
                            resultJson[key]["taskName"] == null &&
                            resultJson[key]["dueDate"] == null &&
                            resultJson[key]["remainderCount"] == null &&
                            resultJson[key]["completionStatus"] == null &&
                            resultJson[key]["myCompletionStatus"] == null &&
                            resultJson[key]["recipentsCount"] == null &&
                            resultJson[key]["createdByRegId"] == null &&
                            resultJson[key]["completionCount"] == null &&
                            resultJson[key]["createdByToken"] == null) {
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
                                    "createdByToken": createdByToken
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHZpZXdpdGVtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3R2aWV3aXRlbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsNkRBVThCO0FBQzlCLDJFQUF5RTtBQUV6RTtJQUFBO0lBc2ZBLENBQUM7SUFsZkcsd0NBQWdCLEdBQWhCO1FBRUksSUFBSSxTQUFTLEdBQUMsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBR3RDLElBQUksWUFBWSxHQUFHLFVBQVMsTUFBTTtZQUlsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUVoQixJQUFJLFVBQVUsR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUM1QiwwQkFBMEI7Z0JBQ3RCLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUMxQixDQUFDO29CQUNHLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBRSxJQUFJLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFFLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDO29CQUN0RCxJQUFJLENBQUEsQ0FBQzt3QkFFRCxJQUFJLFNBQVMsQ0FBQzt3QkFDZCxJQUFJLFFBQVEsQ0FBQzt3QkFDYixJQUFJLE9BQU8sQ0FBQzt3QkFDWixJQUFJLGNBQWMsQ0FBQzt3QkFDbkIsSUFBSSxnQkFBZ0IsQ0FBQzt3QkFDckIsSUFBSSxrQkFBa0IsQ0FBQzt3QkFDdkIsSUFBSSxlQUFlLENBQUM7d0JBQ3BCLElBQUksZUFBZSxDQUFDO3dCQUNwQixJQUFJLGVBQWUsQ0FBQzt3QkFDcEIsSUFBSSxjQUFjLENBQUM7d0JBRW5CLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBRSxJQUFJOzRCQUNqQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxD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QUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO2FBRXRDO1NBRUosQ0FDSixDQUFDO1FBRUwsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNwQixDQUFDO0lBRUwsb0JBQUM7QUFBRCxDQUFDLEFBdGZELElBc2ZDO0FBdGZZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuXG5leHBvcnQgY2xhc3MgTGlzdFZpZXdJdGVtc1xue1xuXG4gICAgICBcbiAgICBnZXRNeVRhc2tkZXRhaWxzKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhSXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIFxuXG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAvL2ZvciBub3QgY29tZXBsZXRlZCBpdGVtc1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIil7fVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFza05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5kZXJDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNlcGllbnRzQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnlUb2tlbjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdPT1udWxsICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVJlZ0lkXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVRva2VuXCJdPT1udWxsXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeT1yZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza05hbWU9cmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVlRGF0ZT1yZXN1bHRKc29uW2tleV1bXCJkdWVEYXRlXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlckNvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25TdGF0dXM9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlcGllbnRzQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5TnVtYmVyPXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVJlZ0lkXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25Db3VudD1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5VG9rZW49cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5VG9rZW5cIl07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJteUNvbXBsZXRpb25TdGF0dXNcIl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUNvbXBsZXRpb25TdGF0dXM9XCJub3RDb21wbGV0ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUl0ZW1zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5XCI6Y3JlYXRlZEJ5ICwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhc2tOYW1lXCI6dGFza05hbWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkdWVEYXRlXCI6IGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlbWFpbmRlckNvdW50XCI6IHJlbWFpbmRlckNvdW50LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGlvblN0YXR1c1wiOiBjb21wbGV0aW9uQ291bnQrXCIvXCIrcmVjZXBpZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjprZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm15Q29tcGxldGlvblN0YXR1c1wiOm15Q29tcGxldGlvblN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5TnVtYmVyXCI6Y3JlYXRlZEJ5TnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlUb2tlblwiOmNyZWF0ZWRCeVRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZvciAgY29tcGxldGVkIGl0ZW1zXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldPT1udWxsIHx8IHJlc3VsdEpzb25ba2V5XT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhc2tOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR1ZURhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVtYWluZGVyQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBteUNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjZXBpZW50c0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeU51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5VG9rZW47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXT09bnVsbCAgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJkdWVEYXRlXCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVJlZ0lkXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVRva2VuXCJdPT1udWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeT1yZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza05hbWU9cmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVlRGF0ZT1yZXN1bHRKc29uW2tleV1bXCJkdWVEYXRlXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlckNvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25TdGF0dXM9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlcGllbnRzQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5TnVtYmVyPXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVJlZ0lkXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25Db3VudD1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5VG9rZW49cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5VG9rZW5cIl07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJteUNvbXBsZXRpb25TdGF0dXNcIl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUNvbXBsZXRpb25TdGF0dXM9XCJjb21wbGV0ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUl0ZW1zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5XCI6Y3JlYXRlZEJ5ICwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhc2tOYW1lXCI6dGFza05hbWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkdWVEYXRlXCI6IGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlbWFpbmRlckNvdW50XCI6IHJlbWFpbmRlckNvdW50LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRpb25TdGF0dXNcIjogY29tcGxldGlvbkNvdW50K1wiL1wiK3JlY2VwaWVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJteUNvbXBsZXRpb25TdGF0dXNcIjpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeU51bWJlclwiOmNyZWF0ZWRCeU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5VG9rZW5cIjpjcmVhdGVkQnlUb2tlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH07XG5cbiAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgY29uc29sZS5sb2coXCJEZXZpY2UgUGhvbmUgTnVtYmVyLS0tLVwiK2RldmljZVBob25lTnVtYmVyKTtcbiAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICcvTXlUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyLFxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgcmV0dXJuIGRhdGFJdGVtcztcbiAgICB9XG4gICAgZ2V0T3RoZXJUYXNrRGV0YWlsc0RldGFpbGVkRGV0YWlscyhrZXkpXG4gICAge1xuICAgICAgICAgICAgdmFyIGRldGFpbGVkRGF0YUl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkVMU0U9PT1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJBc3NpZ25lZSBOYW1lPT09XCIrcmVzdWx0SnNvbltrZXldW1wiYXNzaWduZWVOYW1lXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRlbGV0aW9uQ291bnQ9PT1cIityZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlbWFpbmRlckNvdW50PT09XCIrcmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiYXNzaWduZWVOYW1lXCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdPT1udWxsICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXT09bnVsbCApe31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIkVMU0U9PT1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yKHZhciBrZXkxIGluIHJlc3VsdEpzb25ba2V5XVtcIkFzc2lnbmVlRGV0YWlsc1wiXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRldGFpbGVkIEtleT09PVwiK2tleTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYU5hbWU9PVwiK3Jlc3VsdEpzb25ba2V5XVtcIkFzc2lnbmVlRGV0YWlsc1wiXVtrZXkxXVtcImFzc2lnbmVlTmFtZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJkQ291bnQ9PVwiK3Jlc3VsdEpzb25ba2V5XVtcIkFzc2lnbmVlRGV0YWlsc1wiXVtrZXkxXVtcImRlbGV0aW9uQ291bnRcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwickNvdW50PT1cIityZXN1bHRKc29uW2tleV1bXCJBc3NpZ25lZURldGFpbHNcIl1ba2V5MV1bXCJyZW1haW5kZXJDb3VudFwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsZWREYXRhSXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVlTmFtZVwiOnJlc3VsdEpzb25ba2V5XVtcImFzc2lnbmVlTmFtZVwiXSAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZW1haW5kZXJDb3VudFwiOnJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVsZXRpb25Db3VudFwiOiByZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhc3NpZ25lZU51bWJlclwiOiBrZXksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0aW9uU3RhdHVzXCI6cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGb3IgbG9vcD09PVwiK2RldGFpbGVkRGF0YUl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tLS1cIitkZXZpY2VQaG9uZU51bWJlcik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tS2V5LS1cIitrZXkpO1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK2tleSsnL0Fzc2lnbmVlRGV0YWlscy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRldGFpbGVkIEl0ZW1zIFJldHVybj09PVwiK2RldGFpbGVkRGF0YUl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIGRldGFpbGVkRGF0YUl0ZW1zO1xuICAgIH1cbiAgICBnZXRPdGhlclRhc2tEZXRhaWxzKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhSXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIHZhciB4PXRoaXM7XG5cbiAgICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAge1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XG4gICAgICAgICBcbiAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgIC8vZm9yIG5vdCBjb21lcGxldGVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXNrTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjZXBpZW50c0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdPT1udWxsICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdPT1udWxsICAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdPT1udWxsXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQnk9cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tOYW1lPXJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1ZURhdGU9cmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1haW5kZXJDb3VudD1yZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uU3RhdHVzPXJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRpb25Db3VudD1yZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VwaWVudHNDb3VudD1yZXN1bHRKc29uW2tleV1bXCJyZWNpcGVudHNDb3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDb21wbGV0aW9uU3RhdHVzPVwibm90Q29tcGxldGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVwiOmNyZWF0ZWRCeSAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXNrTmFtZVwiOnRhc2tOYW1lLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZHVlRGF0ZVwiOiBkdWVEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZW1haW5kZXJDb3VudFwiOiByZW1haW5kZXJDb3VudCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRpb25TdGF0dXNcIjogY29tcGxldGlvbkNvdW50K1wiL1wiK3JlY2VwaWVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJteUNvbXBsZXRpb25TdGF0dXNcIjpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlbGV0aW9uQ291bnRcIjpkZWxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXRhaWxlZFZpZXdrZXlcIjpcInRhc2tEZXRhaWxlZFZpZXdcIitrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBmb3IgIGNvbXBsZXRlZCBpdGVtc1xuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXNrTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjZXBpZW50c0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdPT1udWxsICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl09PW51bGwgXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5PXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTmFtZT1yZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWVEYXRlPXJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvblN0YXR1cz1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0aW9uQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZXBpZW50c0NvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlcGllbnRzQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDb21wbGV0aW9uU3RhdHVzPVwiY29tcGxldGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVwiOmNyZWF0ZWRCeSAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXNrTmFtZVwiOnRhc2tOYW1lLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZHVlRGF0ZVwiOiBkdWVEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZW1haW5kZXJDb3VudFwiOiByZW1haW5kZXJDb3VudCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRpb25TdGF0dXNcIjogY29tcGxldGlvbkNvdW50K1wiL1wiK3JlY2VwaWVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJteUNvbXBsZXRpb25TdGF0dXNcIjpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlbGV0aW9uQ291bnRcIjpkZWxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV0YWlsZWRWaWV3a2V5XCI6XCJ0YXNrRGV0YWlsZWRWaWV3XCIra2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH07XG5cbiAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgY29uc29sZS5sb2coXCJEZXZpY2UgUGhvbmUgTnVtYmVyLS0tb3RoZXJ0YXNrPT09PT0tXCIrZGV2aWNlUGhvbmVOdW1iZXIpO1xuICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICByZXR1cm4gZGF0YUl0ZW1zO1xuICAgIH1cbiAgICBnZXRDb250YWN0TGlzdCgpXG4gICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhY3RMaXN0PW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygna2V5Ojo6JytrZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIilcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJmTmFtZVwiXT09bnVsbCAmJiByZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXT09bnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJWYWx1ZSBpcyBub3QgbnVsbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0TGlzdC5wdXNoKHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpyZXN1bHRKc29uW2tleV1bXCJmTmFtZVwiXStcIiBcIityZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjprZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hlY2tCb3hcIjpcIlxcdXtmMDk2fVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkXCI6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZUxhYmVsXCI6cmVzdWx0SnNvbltrZXldW1wiZk5hbWVcIl0uY2hhckF0KDApK3Jlc3VsdEpzb25ba2V5XVtcImxOYW1lXCJdLmNoYXJBdCgwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXZpY2VUb2tlblwiOnJlc3VsdEpzb25ba2V5XVtcImRldmljZVRva2VuXCJdLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb250YWN0IGxpc3QtLS0tXCIrY29udGFjdExpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvRGV2aWNlRGV0YWlscy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgLy92YWx1ZTogJ3Rhc2tOYW1lJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIFxuICAgICByZXR1cm4gY29udGFjdExpc3Q7XG4gICAgfVxuXG59XG5cbiAgICBcblxuICJdfQ==