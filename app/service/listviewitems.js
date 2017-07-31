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
    ListViewItems.prototype.getOtherTaskDetails = function () {
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
                                    "deletionCount": deletionCount
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
                                    "deletionCount": deletionCount
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
            // note that the query returns 1 match at a time
            // in the order specified in the query
            if (!result.error) {
                //   console.log("Event type: " + result.type);
                // console.log("Key: " + result.key);
                // console.log("Value contact list------: " + JSON.stringify(result.value));
                var resultJson = result.value;
                for (var key in resultJson) {
                    console.log('key:::' + key);
                    if (resultJson[key] == null || resultJson[key] == "null") {
                        //console.log("key is  null---");
                    }
                    else {
                        //console.log("key is not  null---");
                        if (resultJson[key]["fName"] == null && resultJson[key]["lName"] == null) {
                            //console.log("Value is null");
                        }
                        else {
                            //console.log("Value is not null");
                            contactList.push({
                                "name": resultJson[key]["fName"] + " " + resultJson[key]["lName"],
                                "number": key,
                                "checkBox": "\uF096",
                                "selected": false
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHZpZXdpdGVtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3R2aWV3aXRlbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsNkRBVThCO0FBQzlCLDJFQUF5RTtBQUV6RTtJQUFBO0lBNFpBLENBQUM7SUF4Wkcsd0NBQWdCLEdBQWhCO1FBRUksSUFBSSxTQUFTLEdBQUMsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBR3RDLElBQUksWUFBWSxHQUFHLFVBQVMsTUFBTTtZQUlsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUVoQixJQUFJLFVBQVUsR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUM1QiwwQkFBMEI7Z0JBQ3RCLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUMxQixDQUFDO29CQUNHLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBRSxJQUFJLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFFLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDO29CQUN0RCxJQUFJLENBQUEsQ0FBQzt3QkFFRCxJQUFJLFNBQVMsQ0FBQzt3QkFDZCxJQUFJLFFBQVEsQ0FBQzt3QkFDYixJQUFJLE9BQU8sQ0FBQzt3QkFDWixJQUFJLGNBQWMsQ0FBQzt3QkFDbkIsSUFBSSxnQkFBZ0IsQ0FBQzt3QkFDckIsSUFBSSxrQkFBa0IsQ0FBQzt3QkFDdkIsSUFBSSxlQUFlLENBQUM7d0JBQ3BCLElBQUksZUFBZSxDQUFDO3dCQUNwQixJQUFJLGVBQWUsQ0FBQzt3QkFFcEIsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFFLElBQUk7NEJBQ2pDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBRSxJQUFJOzRCQUNsQyxV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c2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7XG4gICAgZ2V0Qm9vbGVhbixcbiAgICBzZXRCb29sZWFuLFxuICAgIGdldE51bWJlcixcbiAgICBzZXROdW1iZXIsXG4gICAgZ2V0U3RyaW5nLFxuICAgIHNldFN0cmluZyxcbiAgICBoYXNLZXksXG4gICAgcmVtb3ZlLFxuICAgIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5cbmV4cG9ydCBjbGFzcyBMaXN0Vmlld0l0ZW1zXG57XG5cbiAgICBcbiAgICBnZXRNeVRhc2tkZXRhaWxzKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhSXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIFxuXG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAvL2ZvciBub3QgY29tZXBsZXRlZCBpdGVtc1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIil7fVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFza05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5kZXJDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNlcGllbnRzQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdPT1udWxsICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVJlZ0lkXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl09PW51bGwgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeT1yZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza05hbWU9cmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVlRGF0ZT1yZXN1bHRKc29uW2tleV1bXCJkdWVEYXRlXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlckNvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25TdGF0dXM9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlcGllbnRzQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5TnVtYmVyPXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVJlZ0lkXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25Db3VudD1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJteUNvbXBsZXRpb25TdGF0dXNcIl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUNvbXBsZXRpb25TdGF0dXM9XCJub3RDb21wbGV0ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUl0ZW1zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5XCI6Y3JlYXRlZEJ5ICwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhc2tOYW1lXCI6dGFza05hbWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkdWVEYXRlXCI6IGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlbWFpbmRlckNvdW50XCI6IHJlbWFpbmRlckNvdW50LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGlvblN0YXR1c1wiOiBjb21wbGV0aW9uQ291bnQrXCIvXCIrcmVjZXBpZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjprZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm15Q29tcGxldGlvblN0YXR1c1wiOm15Q29tcGxldGlvblN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5TnVtYmVyXCI6Y3JlYXRlZEJ5TnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZvciAgY29tcGxldGVkIGl0ZW1zXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldPT1udWxsIHx8IHJlc3VsdEpzb25ba2V5XT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhc2tOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR1ZURhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVtYWluZGVyQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBteUNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjZXBpZW50c0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeU51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXT09bnVsbCAgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJkdWVEYXRlXCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVJlZ0lkXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl09PW51bGwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeT1yZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza05hbWU9cmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVlRGF0ZT1yZXN1bHRKc29uW2tleV1bXCJkdWVEYXRlXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlckNvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25TdGF0dXM9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlcGllbnRzQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5TnVtYmVyPXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVJlZ0lkXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25Db3VudD1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJteUNvbXBsZXRpb25TdGF0dXNcIl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUNvbXBsZXRpb25TdGF0dXM9XCJjb21wbGV0ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUl0ZW1zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5XCI6Y3JlYXRlZEJ5ICwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhc2tOYW1lXCI6dGFza05hbWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkdWVEYXRlXCI6IGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlbWFpbmRlckNvdW50XCI6IHJlbWFpbmRlckNvdW50LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRpb25TdGF0dXNcIjogY29tcGxldGlvbkNvdW50K1wiL1wiK3JlY2VwaWVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJteUNvbXBsZXRpb25TdGF0dXNcIjpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeU51bWJlclwiOmNyZWF0ZWRCeU51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH07XG5cbiAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgY29uc29sZS5sb2coXCJEZXZpY2UgUGhvbmUgTnVtYmVyLS0tLVwiK2RldmljZVBob25lTnVtYmVyKTtcbiAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICcvTXlUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyLFxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgcmV0dXJuIGRhdGFJdGVtcztcbiAgICB9XG4gICAgZ2V0T3RoZXJUYXNrRGV0YWlscygpXG4gICAge1xuICAgICAgICB2YXIgZGF0YUl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICBcblxuICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgLy9mb3Igbm90IGNvbWVwbGV0ZWQgaXRlbXNcbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldPT1udWxsIHx8IHJlc3VsdEpzb25ba2V5XT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhc2tOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR1ZURhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVtYWluZGVyQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBteUNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVsZXRpb25Db3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNlcGllbnRzQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGxldGlvbkNvdW50O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl09PW51bGwgICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl09PW51bGwgICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl09PW51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeT1yZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza05hbWU9cmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVlRGF0ZT1yZXN1bHRKc29uW2tleV1bXCJkdWVEYXRlXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlckNvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25TdGF0dXM9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGlvbkNvdW50PXJlc3VsdEpzb25ba2V5XVtcImRlbGV0aW9uQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZXBpZW50c0NvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25Db3VudD1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJteUNvbXBsZXRpb25TdGF0dXNcIl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUNvbXBsZXRpb25TdGF0dXM9XCJub3RDb21wbGV0ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUl0ZW1zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5XCI6Y3JlYXRlZEJ5ICwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhc2tOYW1lXCI6dGFza05hbWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkdWVEYXRlXCI6IGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlbWFpbmRlckNvdW50XCI6IHJlbWFpbmRlckNvdW50LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGlvblN0YXR1c1wiOiBjb21wbGV0aW9uQ291bnQrXCIvXCIrcmVjZXBpZW50c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjprZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm15Q29tcGxldGlvblN0YXR1c1wiOm15Q29tcGxldGlvblN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVsZXRpb25Db3VudFwiOmRlbGV0aW9uQ291bnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBmb3IgIGNvbXBsZXRlZCBpdGVtc1xuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXNrTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjZXBpZW50c0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdPT1udWxsICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl09PW51bGwgXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5PXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTmFtZT1yZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWVEYXRlPXJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvblN0YXR1cz1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0aW9uQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZXBpZW50c0NvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlcGllbnRzQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDb21wbGV0aW9uU3RhdHVzPVwiY29tcGxldGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVwiOmNyZWF0ZWRCeSAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXNrTmFtZVwiOnRhc2tOYW1lLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZHVlRGF0ZVwiOiBkdWVEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZW1haW5kZXJDb3VudFwiOiByZW1haW5kZXJDb3VudCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRpb25TdGF0dXNcIjogY29tcGxldGlvbkNvdW50K1wiL1wiK3JlY2VwaWVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJteUNvbXBsZXRpb25TdGF0dXNcIjpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlbGV0aW9uQ291bnRcIjpkZWxldGlvbkNvdW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfTtcblxuICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICBjb25zb2xlLmxvZyhcIkRldmljZSBQaG9uZSBOdW1iZXItLS0tXCIrZGV2aWNlUGhvbmVOdW1iZXIpO1xuICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICByZXR1cm4gZGF0YUl0ZW1zO1xuICAgIH1cbiAgICBnZXRDb250YWN0TGlzdCgpXG4gICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhY3RMaXN0PW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIG5vdGUgdGhhdCB0aGUgcXVlcnkgcmV0dXJucyAxIG1hdGNoIGF0IGEgdGltZVxuICAgICAgICAgICAgLy8gaW4gdGhlIG9yZGVyIHNwZWNpZmllZCBpbiB0aGUgcXVlcnlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlZhbHVlIGNvbnRhY3QgbGlzdC0tLS0tLTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdrZXk6OjonK2tleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwia2V5IGlzICBudWxsLS0tXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwia2V5IGlzIG5vdCAgbnVsbC0tLVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiZk5hbWVcIl09PW51bGwgJiYgcmVzdWx0SnNvbltrZXldW1wibE5hbWVcIl09PW51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlZhbHVlIGlzIG51bGxcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVmFsdWUgaXMgbm90IG51bGxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdExpc3QucHVzaCh7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6cmVzdWx0SnNvbltrZXldW1wiZk5hbWVcIl0rXCIgXCIrcmVzdWx0SnNvbltrZXldW1wibE5hbWVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoZWNrQm94XCI6XCJcXHV7ZjA5Nn1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZFwiOmZhbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbnRhY3QgbGlzdC0tLS1cIitjb250YWN0TGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9EZXZpY2VEZXRhaWxzLycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICAvL3ZhbHVlOiAndGFza05hbWUnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgXG4gICAgIHJldHVybiBjb250YWN0TGlzdDtcbiAgICB9XG5cbn1cblxuICAgIFxuXG4gIl19