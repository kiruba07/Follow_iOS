"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("application-settings");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var ListViewItems = (function () {
    function ListViewItems() {
        this.selectedItems = [];
        this.selectedItemsName = [];
        this.selectedItemsToken = [];
    }
    //maintenanceComponent:MaintenanceComponent;
    // maintenanceComponent=new MaintenanceComponent();
    // constructor()
    // {
    //   //this.maintenanceComponent=new MaintenanceComponent();
    // }
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
    ListViewItems.prototype.getContactListWithGroup = function () {
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var x = this;
        var contactList = new observable_array_1.ObservableArray([]);
        var contactGroupListArray = [];
        var contactGroupListStringArray = [];
        //get group contact list
        var getGroupContactList = function (result) {
            if (!result.error) {
                var resultJson = result.value;
                for (var key in resultJson) {
                    if (key == null || key == "null") { }
                    else {
                        console.log("Group list Name==" + key);
                        console.log("Group list DEVCE PHONE==" + resultJson[key]["devicePhoneNumber"]);
                        console.log("Group list DEVICE TOKEN==" + resultJson[key]["deviceToken"]);
                        console.log("Group list DEVICE Names==" + resultJson[key]["deviceName"]);
                        var deviceStingNumberArray = null;
                        var deviceStingNameLabelArray = null;
                        var deviceStingTokenArray = null;
                        for (var i = 0; i < resultJson[key]["devicePhoneNumber"].length; i++) {
                            if (deviceStingNumberArray == null)
                                deviceStingNumberArray = "G" + resultJson[key]["devicePhoneNumber"][i];
                            else
                                deviceStingNumberArray = deviceStingNumberArray + ",G" + resultJson[key]["devicePhoneNumber"][i];
                        }
                        for (var i = 0; i < resultJson[key]["deviceName"].length; i++) {
                            if (deviceStingNameLabelArray == null)
                                deviceStingNameLabelArray = resultJson[key]["deviceName"][i];
                            else
                                deviceStingNameLabelArray = deviceStingNameLabelArray + "," + resultJson[key]["deviceName"][i];
                        }
                        for (var i = 0; i < resultJson[key]["deviceToken"].length; i++) {
                            if (deviceStingTokenArray == null)
                                deviceStingTokenArray = resultJson[key]["deviceToken"][i];
                            else
                                deviceStingTokenArray = deviceStingTokenArray + "," + resultJson[key]["deviceToken"][i];
                        }
                        console.log("Split==" + deviceStingNumberArray);
                        console.log("Split==" + deviceStingNameLabelArray);
                        console.log("Split==" + deviceStingTokenArray);
                        contactGroupListArray.push({
                            "name": key,
                            "number": deviceStingNumberArray,
                            "checkBox": "\uF096",
                            "selected": false,
                            "nameLabel": deviceStingNameLabelArray,
                            "deviceToken": deviceStingTokenArray,
                        });
                    }
                }
                console.log("contactGroupListArray==" + contactGroupListArray);
            }
        };
        firebase.query(getGroupContactList, '/DeviceDetails/' + devicePhoneNumber + '/groupList/', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
        //get normal contact list
        var onQueryEvent = function (result) {
            contactList.push(contactGroupListArray);
            if (!result.error) {
                var resultJson = result.value;
                for (var key in resultJson) {
                    if (resultJson[key] == null || resultJson[key] == "null") { }
                    else {
                        if (resultJson[key]["fName"] == null && resultJson[key]["lName"] == null && resultJson[key]["deviceToken"]) { }
                        else {
                            contactList.push({
                                "name": resultJson[key]["fName"] + " " + resultJson[key]["lName"],
                                "number": key,
                                "checkBox": "\uF096",
                                "selected": false,
                                "nameLabel": resultJson[key]["fName"].charAt(0) + resultJson[key]["lName"].charAt(0),
                                "deviceToken": resultJson[key]["deviceToken"],
                            });
                        }
                    }
                    console.log("Contact list final list---" + contactList);
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
    ListViewItems.prototype.getContactListForUpdate = function (groupName) {
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var x = this;
        //get group Name contact list
        var contactGroupList = [];
        var getGroupContactList = function (result) {
            if (!result.error) {
                var resultJson = result.value;
                for (var key in resultJson) {
                    if (key == null || key == "null") { }
                    else {
                        console.log("Group list Name==" + resultJson[key]);
                        contactGroupList.push(resultJson[key]);
                    }
                }
            }
        };
        firebase.query(getGroupContactList, '/DeviceDetails/' + devicePhoneNumber + '/groupList/' + groupName + '/devicePhoneNumber', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
        //get all contact list
        var contactList = new observable_array_1.ObservableArray([]);
        var onQueryEvent = function (result) {
            if (!result.error) {
                var resultJson = result.value;
                //store only items already in the list
                for (var key in resultJson) {
                    if (resultJson[key] == null || resultJson[key] == "null") { }
                    else {
                        if (resultJson[key]["fName"] == null && resultJson[key]["lName"] == null && resultJson[key]["deviceToken"]) { }
                        else {
                            if (contactGroupList.indexOf(key) > -1) {
                                console.log("Key IF===" + key);
                                contactList.push({
                                    "name": resultJson[key]["fName"] + " " + resultJson[key]["lName"],
                                    "number": key,
                                    "checkBox": "\uF046",
                                    "selected": true,
                                    "nameLabel": resultJson[key]["fName"].charAt(0) + resultJson[key]["lName"].charAt(0),
                                    "deviceToken": resultJson[key]["deviceToken"],
                                });
                                x.selectedItems.push(key);
                                x.selectedItemsName.push(resultJson[key]["fName"].charAt(0) + resultJson[key]["lName"].charAt(0));
                                x.selectedItemsToken.push(resultJson[key]["deviceToken"]);
                            }
                            else {
                                console.log("Key else===" + key);
                            }
                        }
                    }
                    console.log("Contact list----" + contactList);
                }
                //store only items not in the list
                for (var key in resultJson) {
                    if (resultJson[key] == null || resultJson[key] == "null") { }
                    else {
                        if (resultJson[key]["fName"] == null && resultJson[key]["lName"] == null && resultJson[key]["deviceToken"]) { }
                        else {
                            if (contactGroupList.indexOf(key) > -1) {
                                console.log("Key IF===" + key);
                            }
                            else {
                                console.log("Key else===" + key);
                                contactList.push({
                                    "name": resultJson[key]["fName"] + " " + resultJson[key]["lName"],
                                    "number": key,
                                    "checkBox": "\uF096",
                                    "selected": false,
                                    "nameLabel": resultJson[key]["fName"].charAt(0) + resultJson[key]["lName"].charAt(0),
                                    "deviceToken": resultJson[key]["deviceToken"],
                                });
                            }
                        }
                    }
                    console.log("Contact list- sort---" + contactList);
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
    ListViewItems.prototype.dynamicSort = function (property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    };
    return ListViewItems;
}());
exports.ListViewItems = ListViewItems;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHZpZXdpdGVtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3R2aWV3aXRlbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsNkRBVThCO0FBQzlCLDJFQUF5RTtBQUl6RTtJQUFBO1FBR0ksa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFDMUIsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1FBQzlCLHVCQUFrQixHQUFVLEVBQUUsQ0FBQztJQWsvQm5DLENBQUM7SUFqL0JHLDRDQUE0QztJQUM3QyxtREFBbUQ7SUFFbEQsZ0JBQWdCO0lBQ2hCLElBQUk7SUFFSiw0REFBNEQ7SUFFNUQsSUFBSTtJQUVKLHVDQUFlLEdBQWY7UUFHSSxJQUFJLGlCQUFpQixHQUFDLElBQUksa0NBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLFlBQVksR0FBRyxVQUFTLE1BQU07WUFHbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFFaEIsSUFBSSxVQUFVLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFFeEIsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLENBQzFCLENBQUM7b0JBRUcsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFFLElBQUksSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUUsTUFBTSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUM7b0JBQ3RELElBQUksQ0FBQSxDQUFDO3dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBRWxELElBQUksUUFBUSxTQUFBLENBQUM7d0JBQ2IsUUFBUSxHQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDekIsaUJBQWlCLENBQUMsSUFBSSxDQUN0Qjs0QkFDSyxVQUFVLEVBQUMs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LENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUM5QixDQUFDLENBQUE7SUFDTCxDQUFDO0lBRUwsb0JBQUM7QUFBRCxDQUFDLEFBdi9CRCxJQXUvQkM7QUF2L0JZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgTWFpbnRlbmFuY2VDb21wb25lbnQgfSBmcm9tIFwiLi4vcGFnZXMvbWFpbnRlbmFuY2UvbWFpbnRlbmFuY2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIExpc3RWaWV3SXRlbXNcbntcblxuICAgIHNlbGVjdGVkSXRlbXM6c3RyaW5nW109W107XG4gICAgc2VsZWN0ZWRJdGVtc05hbWU6c3RyaW5nW109W107XG4gICAgc2VsZWN0ZWRJdGVtc1Rva2VuOnN0cmluZ1tdPVtdO1xuICAgIC8vbWFpbnRlbmFuY2VDb21wb25lbnQ6TWFpbnRlbmFuY2VDb21wb25lbnQ7XG4gICAvLyBtYWludGVuYW5jZUNvbXBvbmVudD1uZXcgTWFpbnRlbmFuY2VDb21wb25lbnQoKTtcblxuICAgIC8vIGNvbnN0cnVjdG9yKClcbiAgICAvLyB7XG4gICAgIFxuICAgIC8vICAgLy90aGlzLm1haW50ZW5hbmNlQ29tcG9uZW50PW5ldyBNYWludGVuYW5jZUNvbXBvbmVudCgpO1xuICBcbiAgICAvLyB9XG5cbiAgICBnZXRDYXRlZ29yeUxpc3QoKVxuICAgIHtcblxuICAgICAgICBsZXQgY2F0ZWdvcnlMaXN0SXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XG4gICAgICAgICBcbiAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldPT1udWxsIHx8IHJlc3VsdEpzb25ba2V5XT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0SnNvbltrZXldPT09XCIrcmVzdWx0SnNvbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeT1yZXN1bHRKc29uW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeUxpc3RJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNhdGVnb3J5XCI6Y2F0ZWdvcnkgLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7ICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYXRlZ29yeSBMaXN0PT09PT09PT09PVwiK2NhdGVnb3J5TGlzdEl0ZW1zKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tLS1cIitkZXZpY2VQaG9uZU51bWJlcik7XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAgICAnL0RldmljZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnL2NhdGVnb3J5TGlzdC9saXN0LycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICBcbiAgICAgICAgcmV0dXJuIGNhdGVnb3J5TGlzdEl0ZW1zO1xuICAgIH1cbiAgICBnZXRHcm91cExpc3QoKXtcblxuICAgICAgICBsZXQgZ3JvdXBMaXN0SXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XG4gICAgICAgICBcbiAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoa2V5PT1udWxsIHx8IGtleT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW2tleV09PT1cIitrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyb3VwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA9a2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBMaXN0SXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJncm91cFwiOmdyb3VwICxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICApOyAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR3JvdXAgTGlzdD09PT09PT09PT1cIitncm91cExpc3RJdGVtcyk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRldmljZSBQaG9uZSBOdW1iZXItLS0tXCIrZGV2aWNlUGhvbmVOdW1iZXIpO1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgICAgJy9EZXZpY2VEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy9ncm91cExpc3QvJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgIFxuICAgICAgICByZXR1cm4gZ3JvdXBMaXN0SXRlbXM7XG4gICAgfVxuICAgIGdldENhdGVnb3J5TGlzdEZvckNyZWF0ZVRhc2soKVxuICAgIHtcblxuICAgICAgICBsZXQgY2F0ZWdvcnlMaXN0SXRlbXM6c3RyaW5nW109W107XG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XG4gICAgICAgICBcbiAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldPT1udWxsIHx8IHJlc3VsdEpzb25ba2V5XT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0SnNvbltrZXldPT09XCIrcmVzdWx0SnNvbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeT1yZXN1bHRKc29uW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeUxpc3RJdGVtcy5wdXNoKGNhdGVnb3J5KTsgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYXRlZ29yeSBMaXN0PT09PSBjcmVhdGUgdGFzaz09PT09PVwiK2NhdGVnb3J5TGlzdEl0ZW1zKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tLS1cIitkZXZpY2VQaG9uZU51bWJlcik7XG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAgICAnL0RldmljZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnL2NhdGVnb3J5TGlzdC9saXN0LycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICBcbiAgICAgICAgcmV0dXJuIGNhdGVnb3J5TGlzdEl0ZW1zO1xuICAgIH1cbiAgICBnZXRNeVRhc2tkZXRhaWxzKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhSXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIFxuXG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAvL2ZvciBub3QgY29tZXBsZXRlZCBpdGVtc1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIil7fVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFza05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5kZXJDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNlcGllbnRzQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnlUb2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZU51bWJlcjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl09PW51bGwgICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZWNpcGVudHNDb3VudFwiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5UmVnSWRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25Db3VudFwiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5VG9rZW5cIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImFzc2lnbmVlTmFtZVwiXT09bnVsbFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQnk9cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tOYW1lPXJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1ZURhdGU9cmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1haW5kZXJDb3VudD1yZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uU3RhdHVzPXJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZXBpZW50c0NvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeU51bWJlcj1yZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlSZWdJZFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeVRva2VuPXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVRva2VuXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlTnVtYmVyPXJlc3VsdEpzb25ba2V5XVtcImFzc2lnbmVlTmFtZVwiXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15Q29tcGxldGlvblN0YXR1cz1cIm5vdENvbXBsZXRlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhSXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlcIjpjcmVhdGVkQnkgLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFza05hbWVcIjp0YXNrTmFtZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImR1ZURhdGVcIjogZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVtYWluZGVyQ291bnRcIjogcmVtYWluZGVyQ291bnQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0aW9uU3RhdHVzXCI6IGNvbXBsZXRpb25Db3VudCtcIi9cIityZWNlcGllbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibXlDb21wbGV0aW9uU3RhdHVzXCI6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlOdW1iZXJcIjpjcmVhdGVkQnlOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVRva2VuXCI6Y3JlYXRlZEJ5VG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVlTnVtYmVyXCI6YXNzaWduZWVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOmZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZm9yICBjb21wbGV0ZWQgaXRlbXNcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIil7fVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFza05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5kZXJDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG15Q29tcGxldGlvblN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNlcGllbnRzQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJ5TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnlUb2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZU51bWJlcjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl09PW51bGwgICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJteUNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlSZWdJZFwiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlUb2tlblwiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiYXNzaWduZWVOYW1lXCJdPT1udWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCeT1yZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza05hbWU9cmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVlRGF0ZT1yZXN1bHRKc29uW2tleV1bXCJkdWVEYXRlXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlckNvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25TdGF0dXM9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlcGllbnRzQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5TnVtYmVyPXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVJlZ0lkXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25Db3VudD1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5VG9rZW49cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5VG9rZW5cIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWVOdW1iZXI9cmVzdWx0SnNvbltrZXldW1wiYXNzaWduZWVOYW1lXCJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDb21wbGV0aW9uU3RhdHVzPVwiY29tcGxldGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVwiOmNyZWF0ZWRCeSAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXNrTmFtZVwiOnRhc2tOYW1lLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZHVlRGF0ZVwiOiBkdWVEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZW1haW5kZXJDb3VudFwiOiByZW1haW5kZXJDb3VudCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0aW9uU3RhdHVzXCI6IGNvbXBsZXRpb25Db3VudCtcIi9cIityZWNlcGllbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibXlDb21wbGV0aW9uU3RhdHVzXCI6bXlDb21wbGV0aW9uU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlOdW1iZXJcIjpjcmVhdGVkQnlOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVRva2VuXCI6Y3JlYXRlZEJ5VG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVlTnVtYmVyXCI6YXNzaWduZWVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFwiOnRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9O1xuXG4gICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tLS1cIitkZXZpY2VQaG9uZU51bWJlcik7XG4gICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAnL015VGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgIHJldHVybiBkYXRhSXRlbXM7XG4gICAgfVxuICAgIGdldE90aGVyVGFza0RldGFpbHNEZXRhaWxlZERldGFpbHMoa2V5KVxuICAgIHtcbiAgICAgICAgICAgIHZhciBkZXRhaWxlZERhdGFJdGVtcz1uZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICAgICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIil7fVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJFTFNFPT09XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQXNzaWduZWUgTmFtZT09PVwiK3Jlc3VsdEpzb25ba2V5XVtcImFzc2lnbmVlTmFtZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJkZWxldGlvbkNvdW50PT09XCIrcmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZW1haW5kZXJDb3VudD09PVwiK3Jlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcImFzc2lnbmVlTmFtZVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXT09bnVsbCAgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdPT1udWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZGV2aWNlVG9rZW5cIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXT09bnVsbCl7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwiRUxTRT09PVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IodmFyIGtleTEgaW4gcmVzdWx0SnNvbltrZXldW1wiQXNzaWduZWVEZXRhaWxzXCJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRGV0YWlsZWQgS2V5PT09XCIra2V5MSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJhTmFtZT09XCIrcmVzdWx0SnNvbltrZXldW1wiQXNzaWduZWVEZXRhaWxzXCJdW2tleTFdW1wiYXNzaWduZWVOYW1lXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRDb3VudD09XCIrcmVzdWx0SnNvbltrZXldW1wiQXNzaWduZWVEZXRhaWxzXCJdW2tleTFdW1wiZGVsZXRpb25Db3VudFwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJyQ291bnQ9PVwiK3Jlc3VsdEpzb25ba2V5XVtcIkFzc2lnbmVlRGV0YWlsc1wiXVtrZXkxXVtcInJlbWFpbmRlckNvdW50XCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVsZXRpb25TdGF0dXM6bnVtYmVyPXJlc3VsdEpzb25ba2V5XVtcImRlbGV0aW9uQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBsZXRpb25TdGF0dXM6Ym9vbGVhbj1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aXNpYmlsaXR5RGVsZXRlOnN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlzaWJpbGl0eUNvbXBsZXRlOnN0cmluZztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRlbGV0aW9uU3RhdHVzPjApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5RGVsZXRlPVwidmlzaWJsZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5RGVsZXRlPVwiY29sbGFwc2VkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvbXBsZXRpb25TdGF0dXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5Q29tcGxldGU9XCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHlDb21wbGV0ZT1cImNvbGxhcHNlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxlZERhdGFJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXNzaWduZWVOYW1lXCI6cmVzdWx0SnNvbltrZXldW1wiYXNzaWduZWVOYW1lXCJdICwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlbWFpbmRlckNvdW50XCI6cmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWxldGlvbkNvdW50XCI6IHJlc3VsdEpzb25ba2V5XVtcImRlbGV0aW9uQ291bnRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlbGV0aW9uU3RhdHVzXCI6dmlzaWJpbGl0eURlbGV0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGlvblN0YXR1c0ZsYWdcIjp2aXNpYmlsaXR5Q29tcGxldGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVlTnVtYmVyXCI6IGtleSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRpb25TdGF0dXNcIjpyZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXZpY2VUb2tlblwiOnJlc3VsdEpzb25ba2V5XVtcImRldmljZVRva2VuXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXNrTmFtZVwiOnJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlcIjpyZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGb3IgbG9vcD09PVwiK2RldGFpbGVkRGF0YUl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tLS1cIitkZXZpY2VQaG9uZU51bWJlcik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tS2V5LS1cIitrZXkpO1xuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nK2tleSsnL0Fzc2lnbmVlRGV0YWlscy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRldGFpbGVkIEl0ZW1zIFJldHVybj09PVwiK2RldGFpbGVkRGF0YUl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIGRldGFpbGVkRGF0YUl0ZW1zO1xuICAgIH1cbiAgICBnZXRPdGhlclRhc2tEZXRhaWxzKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhSXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIHZhciB4PXRoaXM7XG5cbiAgICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAge1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XG4gICAgICAgICBcbiAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgIC8vZm9yIG5vdCBjb21lcGxldGVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXNrTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjZXBpZW50c0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdPT1udWxsICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdPT1udWxsICAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdPT1udWxsXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQnk9cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tOYW1lPXJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1ZURhdGU9cmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1haW5kZXJDb3VudD1yZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uU3RhdHVzPXJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRpb25Db3VudD1yZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VwaWVudHNDb3VudD1yZXN1bHRKc29uW2tleV1bXCJyZWNpcGVudHNDb3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDb21wbGV0aW9uU3RhdHVzPVwibm90Q29tcGxldGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVwiOmNyZWF0ZWRCeSAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXNrTmFtZVwiOnRhc2tOYW1lLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZHVlRGF0ZVwiOiBkdWVEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZW1haW5kZXJDb3VudFwiOiByZW1haW5kZXJDb3VudCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRpb25TdGF0dXNcIjogY29tcGxldGlvbkNvdW50K1wiL1wiK3JlY2VwaWVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJteUNvbXBsZXRpb25TdGF0dXNcIjpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlbGV0aW9uQ291bnRcIjpkZWxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXRhaWxlZFZpZXdrZXlcIjpcInRhc2tEZXRhaWxlZFZpZXdcIitrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBmb3IgIGNvbXBsZXRlZCBpdGVtc1xuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXNrTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlDb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0aW9uQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjZXBpZW50c0NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25Db3VudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdPT1udWxsICAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl09PW51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcIm15Q29tcGxldGlvblN0YXR1c1wiXT09bnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJkZWxldGlvbkNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wicmVjaXBlbnRzQ291bnRcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uQ291bnRcIl09PW51bGwgXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5PXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTmFtZT1yZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWVEYXRlPXJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvblN0YXR1cz1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0aW9uQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiZGVsZXRpb25Db3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZXBpZW50c0NvdW50PXJlc3VsdEpzb25ba2V5XVtcInJlY2lwZW50c0NvdW50XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlcGllbnRzQ291bnQ9cmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvbkNvdW50XCJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wibXlDb21wbGV0aW9uU3RhdHVzXCJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDb21wbGV0aW9uU3RhdHVzPVwiY29tcGxldGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWRCeVwiOmNyZWF0ZWRCeSAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXNrTmFtZVwiOnRhc2tOYW1lLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZHVlRGF0ZVwiOiBkdWVEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZW1haW5kZXJDb3VudFwiOiByZW1haW5kZXJDb3VudCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRpb25TdGF0dXNcIjogY29tcGxldGlvbkNvdW50K1wiL1wiK3JlY2VwaWVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJteUNvbXBsZXRpb25TdGF0dXNcIjpteUNvbXBsZXRpb25TdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlbGV0aW9uQ291bnRcIjpkZWxldGlvbkNvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV0YWlsZWRWaWV3a2V5XCI6XCJ0YXNrRGV0YWlsZWRWaWV3XCIra2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH07XG5cbiAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgY29uc29sZS5sb2coXCJEZXZpY2UgUGhvbmUgTnVtYmVyLS0tb3RoZXJ0YXNrPT09PT0tXCIrZGV2aWNlUGhvbmVOdW1iZXIpO1xuICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICByZXR1cm4gZGF0YUl0ZW1zO1xuICAgIH1cbiAgICBnZXRDb250YWN0TGlzdCgpXG4gICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhY3RMaXN0PW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygna2V5Ojo6JytrZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIilcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJmTmFtZVwiXT09bnVsbCAmJiByZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXT09bnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJWYWx1ZSBpcyBub3QgbnVsbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0TGlzdC5wdXNoKHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpyZXN1bHRKc29uW2tleV1bXCJmTmFtZVwiXStcIiBcIityZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjprZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hlY2tCb3hcIjpcIlxcdXtmMDk2fVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkXCI6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZUxhYmVsXCI6cmVzdWx0SnNvbltrZXldW1wiZk5hbWVcIl0uY2hhckF0KDApK3Jlc3VsdEpzb25ba2V5XVtcImxOYW1lXCJdLmNoYXJBdCgwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXZpY2VUb2tlblwiOnJlc3VsdEpzb25ba2V5XVtcImRldmljZVRva2VuXCJdLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb250YWN0IGxpc3QtLS0tXCIrY29udGFjdExpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvRGV2aWNlRGV0YWlscy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgLy92YWx1ZTogJ3Rhc2tOYW1lJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIFxuICAgICByZXR1cm4gY29udGFjdExpc3Q7XG4gICAgfVxuICAgIGdldENvbnRhY3RMaXN0V2l0aEdyb3VwKClcbiAgICB7XG5cbiAgICAgICAgbGV0IGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgICAgICBsZXQgeD10aGlzO1xuICAgICAgICBsZXQgY29udGFjdExpc3Q9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIGxldCBjb250YWN0R3JvdXBMaXN0QXJyYXk6YW55W109W107XG4gICAgICAgIGxldCBjb250YWN0R3JvdXBMaXN0U3RyaW5nQXJyYXk6c3RyaW5nW109W107XG5cbiAgICAgICAgLy9nZXQgZ3JvdXAgY29udGFjdCBsaXN0XG4gICAgICAgIGxldCBnZXRHcm91cENvbnRhY3RMaXN0PWZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAge1xuXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKGtleT09bnVsbCB8fCBrZXk9PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGxpc3QgTmFtZT09XCIra2V5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBsaXN0IERFVkNFIFBIT05FPT1cIityZXN1bHRKc29uW2tleV1bXCJkZXZpY2VQaG9uZU51bWJlclwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGxpc3QgREVWSUNFIFRPS0VOPT1cIityZXN1bHRKc29uW2tleV1bXCJkZXZpY2VUb2tlblwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGxpc3QgREVWSUNFIE5hbWVzPT1cIityZXN1bHRKc29uW2tleV1bXCJkZXZpY2VOYW1lXCJdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGV2aWNlU3RpbmdOdW1iZXJBcnJheTpzdHJpbmc9bnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZXZpY2VTdGluZ05hbWVMYWJlbEFycmF5OnN0cmluZz1udWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRldmljZVN0aW5nVG9rZW5BcnJheTpzdHJpbmc9bnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxyZXN1bHRKc29uW2tleV1bXCJkZXZpY2VQaG9uZU51bWJlclwiXS5sZW5ndGg7aSsrKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRldmljZVN0aW5nTnVtYmVyQXJyYXk9PW51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlU3RpbmdOdW1iZXJBcnJheT1cIkdcIityZXN1bHRKc29uW2tleV1bXCJkZXZpY2VQaG9uZU51bWJlclwiXVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlU3RpbmdOdW1iZXJBcnJheT1kZXZpY2VTdGluZ051bWJlckFycmF5K1wiLEdcIityZXN1bHRKc29uW2tleV1bXCJkZXZpY2VQaG9uZU51bWJlclwiXVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxyZXN1bHRKc29uW2tleV1bXCJkZXZpY2VOYW1lXCJdLmxlbmd0aDtpKyspXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGV2aWNlU3RpbmdOYW1lTGFiZWxBcnJheT09bnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICBkZXZpY2VTdGluZ05hbWVMYWJlbEFycmF5PXJlc3VsdEpzb25ba2V5XVtcImRldmljZU5hbWVcIl1baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXZpY2VTdGluZ05hbWVMYWJlbEFycmF5PWRldmljZVN0aW5nTmFtZUxhYmVsQXJyYXkrXCIsXCIrcmVzdWx0SnNvbltrZXldW1wiZGV2aWNlTmFtZVwiXVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHJlc3VsdEpzb25ba2V5XVtcImRldmljZVRva2VuXCJdLmxlbmd0aDtpKyspXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRldmljZVN0aW5nVG9rZW5BcnJheT09bnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldmljZVN0aW5nVG9rZW5BcnJheT1yZXN1bHRKc29uW2tleV1bXCJkZXZpY2VUb2tlblwiXVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldmljZVN0aW5nVG9rZW5BcnJheT1kZXZpY2VTdGluZ1Rva2VuQXJyYXkrXCIsXCIrcmVzdWx0SnNvbltrZXldW1wiZGV2aWNlVG9rZW5cIl1baV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTcGxpdD09XCIrZGV2aWNlU3RpbmdOdW1iZXJBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNwbGl0PT1cIitkZXZpY2VTdGluZ05hbWVMYWJlbEFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3BsaXQ9PVwiK2RldmljZVN0aW5nVG9rZW5BcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0R3JvdXBMaXN0QXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6ZGV2aWNlU3RpbmdOdW1iZXJBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoZWNrQm94XCI6XCJcXHV7ZjA5Nn1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkXCI6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lTGFiZWxcIjpkZXZpY2VTdGluZ05hbWVMYWJlbEFycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV2aWNlVG9rZW5cIjpkZXZpY2VTdGluZ1Rva2VuQXJyYXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbnRhY3RHcm91cExpc3RBcnJheT09XCIrY29udGFjdEdyb3VwTGlzdEFycmF5KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG4gICAgICAgXG4gICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgZ2V0R3JvdXBDb250YWN0TGlzdCxcbiAgICAgICAgJy9EZXZpY2VEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy9ncm91cExpc3QvJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgLy9nZXQgbm9ybWFsIGNvbnRhY3QgbGlzdFxuICAgICAgICBsZXQgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgIFxuICAgICAgICAgICAgY29udGFjdExpc3QucHVzaChjb250YWN0R3JvdXBMaXN0QXJyYXkpO1xuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldPT1udWxsIHx8IHJlc3VsdEpzb25ba2V5XT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcImZOYW1lXCJdPT1udWxsICYmIHJlc3VsdEpzb25ba2V5XVtcImxOYW1lXCJdPT1udWxsICYmIHJlc3VsdEpzb25ba2V5XVtcImRldmljZVRva2VuXCJdKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RMaXN0LnB1c2goe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6cmVzdWx0SnNvbltrZXldW1wiZk5hbWVcIl0rXCIgXCIrcmVzdWx0SnNvbltrZXldW1wibE5hbWVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjprZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGVja0JveFwiOlwiXFx1e2YwOTZ9XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZFwiOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZUxhYmVsXCI6cmVzdWx0SnNvbltrZXldW1wiZk5hbWVcIl0uY2hhckF0KDApK3Jlc3VsdEpzb25ba2V5XVtcImxOYW1lXCJdLmNoYXJBdCgwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXZpY2VUb2tlblwiOnJlc3VsdEpzb25ba2V5XVtcImRldmljZVRva2VuXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb250YWN0IGxpc3QgZmluYWwgbGlzdC0tLVwiK2NvbnRhY3RMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9EZXZpY2VEZXRhaWxzLycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICAvL3ZhbHVlOiAndGFza05hbWUnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhY3RMaXN0O1xuXG4gICAgfVxuICAgIGdldENvbnRhY3RMaXN0Rm9yVXBkYXRlKGdyb3VwTmFtZSlcbiAgICB7XG5cbiAgICAgICAgXG4gICAgICAgIGxldCBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgbGV0IHg9dGhpcztcblxuICAgICAgICAvL2dldCBncm91cCBOYW1lIGNvbnRhY3QgbGlzdFxuICAgICAgIFxuICAgICAgICBsZXQgY29udGFjdEdyb3VwTGlzdDpzdHJpbmdbXT1bXTtcbiAgICAgICAgXG4gICAgICAgIGxldCBnZXRHcm91cENvbnRhY3RMaXN0PWZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihrZXk9PW51bGwgfHwga2V5PT1cIm51bGxcIil7fVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBsaXN0IE5hbWU9PVwiK3Jlc3VsdEpzb25ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0R3JvdXBMaXN0LnB1c2gocmVzdWx0SnNvbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBnZXRHcm91cENvbnRhY3RMaXN0LFxuICAgICAgICAnL0RldmljZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnL2dyb3VwTGlzdC8nK2dyb3VwTmFtZSsnL2RldmljZVBob25lTnVtYmVyJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgLy9nZXQgYWxsIGNvbnRhY3QgbGlzdFxuICAgICAgICBsZXQgY29udGFjdExpc3Q9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIGxldCBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIGlmICghcmVzdWx0LmVycm9yKVxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByZXN1bHRKc29uPXJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgIC8vc3RvcmUgb25seSBpdGVtcyBhbHJlYWR5IGluIHRoZSBsaXN0XG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiByZXN1bHRKc29uKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXt9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJmTmFtZVwiXT09bnVsbCAmJiByZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXT09bnVsbCAmJiByZXN1bHRKc29uW2tleV1bXCJkZXZpY2VUb2tlblwiXSl7fVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29udGFjdEdyb3VwTGlzdC5pbmRleE9mKGtleSkgPiAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIktleSBJRj09PVwiK2tleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdExpc3QucHVzaCh7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpyZXN1bHRKc29uW2tleV1bXCJmTmFtZVwiXStcIiBcIityZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiOmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoZWNrQm94XCI6XCJcXHV7ZjA0Nn1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVMYWJlbFwiOnJlc3VsdEpzb25ba2V5XVtcImZOYW1lXCJdLmNoYXJBdCgwKStyZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXS5jaGFyQXQoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV2aWNlVG9rZW5cIjpyZXN1bHRKc29uW2tleV1bXCJkZXZpY2VUb2tlblwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHguc2VsZWN0ZWRJdGVtcy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5zZWxlY3RlZEl0ZW1zTmFtZS5wdXNoKHJlc3VsdEpzb25ba2V5XVtcImZOYW1lXCJdLmNoYXJBdCgwKStyZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXS5jaGFyQXQoMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHguc2VsZWN0ZWRJdGVtc1Rva2VuLnB1c2gocmVzdWx0SnNvbltrZXldW1wiZGV2aWNlVG9rZW5cIl0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIktleSBlbHNlPT09XCIra2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29udGFjdCBsaXN0LS0tLVwiK2NvbnRhY3RMaXN0KTtcbiAgICAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vc3RvcmUgb25seSBpdGVtcyBub3QgaW4gdGhlIGxpc3RcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldPT1udWxsIHx8IHJlc3VsdEpzb25ba2V5XT09XCJudWxsXCIpe31cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcImZOYW1lXCJdPT1udWxsICYmIHJlc3VsdEpzb25ba2V5XVtcImxOYW1lXCJdPT1udWxsICYmIHJlc3VsdEpzb25ba2V5XVtcImRldmljZVRva2VuXCJdKXt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjb250YWN0R3JvdXBMaXN0LmluZGV4T2Yoa2V5KSA+IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiS2V5IElGPT09XCIra2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIktleSBlbHNlPT09XCIra2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0TGlzdC5wdXNoKHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOnJlc3VsdEpzb25ba2V5XVtcImZOYW1lXCJdK1wiIFwiK3Jlc3VsdEpzb25ba2V5XVtcImxOYW1lXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hlY2tCb3hcIjpcIlxcdXtmMDk2fVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZWN0ZWRcIjpmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVMYWJlbFwiOnJlc3VsdEpzb25ba2V5XVtcImZOYW1lXCJdLmNoYXJBdCgwKStyZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXS5jaGFyQXQoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV2aWNlVG9rZW5cIjpyZXN1bHRKc29uW2tleV1bXCJkZXZpY2VUb2tlblwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29udGFjdCBsaXN0LSBzb3J0LS0tXCIrY29udGFjdExpc3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICB9XG4gICBcbiAgICAgICAgfVxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9EZXZpY2VEZXRhaWxzLycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICAvL3ZhbHVlOiAndGFza05hbWUnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29udGFjdExpc3Q7XG4gICAgfVxuICAgIGR5bmFtaWNTb3J0KHByb3BlcnR5KVxuICAgICB7XG4gICAgICAgIHZhciBzb3J0T3JkZXIgPSAxO1xuICAgICAgICBpZihwcm9wZXJ0eVswXSA9PT0gXCItXCIpIHtcbiAgICAgICAgICAgIHNvcnRPcmRlciA9IC0xO1xuICAgICAgICAgICAgcHJvcGVydHkgPSBwcm9wZXJ0eS5zdWJzdHIoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLGIpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAoYVtwcm9wZXJ0eV0gPCBiW3Byb3BlcnR5XSkgPyAtMSA6IChhW3Byb3BlcnR5XSA+IGJbcHJvcGVydHldKSA/IDEgOiAwO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCAqIHNvcnRPcmRlcjtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG4gICAgXG5cbiAiXX0=