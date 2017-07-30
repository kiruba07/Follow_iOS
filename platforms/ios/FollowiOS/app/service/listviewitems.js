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
        //this.dataItems;
        var onQueryEvent = function (result) {
            // note that the query returns 1 match at a time
            // in the order specified in the query
            if (!result.error) {
                //   console.log("Event type: " + result.type);
                // console.log("Key: " + result.key);
                //console.log("Value: " + JSON.stringify(result.value));
                var resultJson = result.value;
                for (var key in resultJson) {
                    //console.log('key:::'+key);
                    // console.log('key:::'+resultJson[key]);
                    if (resultJson[key] == null || resultJson[key] == "null") {
                        //  console.log("key is  null---");
                    }
                    else {
                        // console.log("key is not  null---");
                        var createdBy;
                        var taskName;
                        var dueDate;
                        var remainderCount;
                        var completionStatus;
                        // console.log("value::::---createdBy------:::1------"+resultJson[key]["createdBy"]);
                        //console.log('key--------------'+key);
                        if (resultJson[key]["createdBy"] == null &&
                            resultJson[key]["taskName"] == null &&
                            resultJson[key]["dueDate"] == null &&
                            resultJson[key]["remainderCount"] == null &&
                            resultJson[key]["completionStatus"] == null) {
                            //console.log("value is null---");
                            //     console.log('key:::'+key);
                            // console.log("value::::---createdBy------:::"+key+'------'+createdBy);
                            // console.log("value::::----taskName-----:::"+key+'------'+taskName);
                            // console.log("value::::----dueDate-----:::"+key+'------'+dueDate);
                            // console.log("value::::----remainderCount-----:::"+key+'------'+remainderCount);
                            // console.log("value::::----completionStatus-----:::"+key+'------'+completionStatus);
                        }
                        else {
                            //console.log("value is not null---");
                            createdBy = resultJson[key]["createdBy"];
                            taskName = resultJson[key]["taskName"];
                            dueDate = resultJson[key]["dueDate"];
                            remainderCount = resultJson[key]["remainderCount"];
                            completionStatus = resultJson[key]["completionStatus"];
                            //console.log('key:::'+key);
                            // console.log("value::::---createdBy------:::"+key+'------'+createdBy);
                            // console.log("value::::----taskName-----:::"+key+'------'+taskName);
                            // console.log("value::::----dueDate-----:::"+key+'------'+dueDate);
                            // console.log("value::::----remainderCount-----:::"+key+'------'+remainderCount);
                            // console.log("value::::----completionStatus-----:::"+key+'------'+completionStatus);
                            dataItems.push({
                                "createdBy": createdBy,
                                "taskName": taskName,
                                "dueDate": dueDate,
                                "remainderCount": remainderCount,
                                "completionStatus": "2/10",
                                "key": key
                            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHZpZXdpdGVtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3R2aWV3aXRlbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsNkRBVThCO0FBQzlCLDJFQUF5RTtBQUV6RTtJQUFBO0lBaUxBLENBQUM7SUEvS0csd0NBQWdCLEdBQWhCO1FBRUksSUFBSSxTQUFTLEdBQUMsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLGlCQUFpQjtRQUNqQixJQUFJLFlBQVksR0FBRyxVQUFTLE1BQU07WUFDbEMsZ0RBQWdEO1lBQ2hELHNDQUFzQztZQUV0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQiwrQ0FBK0M7Z0JBQzdDLHFDQUFxQztnQkFDcEMsd0RBQXdEO2dCQUd4RCxJQUFJLFVBQVUsR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUN4QixHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FDMUIsQ0FBQztvQkFDRyw0QkFBNEI7b0JBQzdCLHlDQUF5QztvQkFFeEMsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFFLElBQUksSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUUsTUFBTSxDQUFDLENBQUEsQ0FBQzt3QkFDbkQsbUNBQW1DO29CQUNyQyxDQUFDO29CQUNELElBQUksQ0FBQSxDQUFDO3dCQUNGLHNDQUFzQzt3QkFDckMsSUFBSSxTQUFTLENBQUM7d0JBQ2QsSUFBSSxRQUFRLENBQUM7d0JBQ2IsSUFBSSxPQUFPLENBQUM7d0JBQ1osSUFBSSxjQUFjLENBQUM7d0JBQ25CLElBQUksZ0JBQWdCLENBQUM7d0JBRXRCLHFGQUFxRjt3QkFDcEYsdUNBQXVDO3dCQUV2QyxFQUFFLENBQUEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUUsSUFBSTs0QkFDakMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFFLElBQUk7NEJBQ2xDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBRSxJQUFJOzRCQUNuQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBRSxJQUFJOzRCQUN2QyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FDMUMsQ0FBQzs0QkFDRyxrQ0FBa0M7NEJBQ2xDLGlDQUFpQzs0QkFDckMsd0VBQXdFOzRCQUN4RSxzRUFBc0U7NEJBQ3RFLG9FQUFvRTs0QkFDcEUsa0ZBQWtGOzRCQUNsRixzRkFBc0Y7d0JBRXRGLENBQUM7d0JBQ0QsSUFBSSxDQUFBLENBQUM7NEJBSUwsc0NBQXNDOzRCQUNsQyxTQUFTLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUN2QyxRQUFRLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUNyQyxPQUFPLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUNuQyxjQUFjLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7NEJBQ2pELGdCQUFnQixHQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzRCQUd6RCw0QkFBNEI7NEJBQzVCLHdFQUF3RTs0QkFDeEUsc0VBQXNFOzRCQUN0RSxvRUFBb0U7NEJBQ3BFLGtGQUFrRjs0QkFDbEYsc0ZBQXNGOzRCQUVsRixTQUFTLENBQUMsSUFBSSxDQUNWO2dDQUNJLFdBQVcsRUFBQyxTQUFTO2dDQUNyQixVQUFVLEVBQUMsUUFBUTtnQ0FDbkIsU0FBUyxFQUFFLE9BQU87Z0NBQ2xCLGdCQUFnQixFQUFFLGNBQWM7Z0NBQ2hDLGtCQUFrQixFQUFFLE1BQU07Z0NBQzFCLEtBQUssRUFBQyxHQUFHOzZCQUNaLENBQ0osQ0FBQzt3QkFDTixDQUFDO29CQUNMLENBQUM7Z0JBRUwsQ0FBQztZQUdULENBQUM7UUFFTCxDQUFDLENBQUM7UUFFRixJQUFJLGlCQUFpQixHQUFDLGdDQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixHQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekQsUUFBUSxDQUFDLEtBQUssQ0FDVixZQUFZLEVBQ2IsaUJBQWlCLEdBQUMsaUJBQWlCLEVBQ2xDO1lBRUksV0FBVyxFQUFFLElBQUk7WUFFakIsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRzthQUV0QztTQUVKLENBQ0osQ0FBQztRQUNGLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDakIsQ0FBQztJQUVELHNDQUFjLEdBQWQ7UUFFUSxJQUFJLFdBQVcsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxZQUFZLEdBQUcsVUFBUyxNQUFNO1lBRWxDLGdEQUFnRDtZQUNoRCxzQ0FBc0M7WUFFdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQ2xCLENBQUM7Z0JBQ0csK0NBQStDO2dCQUNuRCxxQ0FBcUM7Z0JBQ2xDLDRFQUE0RTtnQkFDM0UsSUFBSSxVQUFVLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDNUIsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLENBQzFCLENBQUM7b0JBQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzFCLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBRSxJQUFJLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFFLE1BQU0sQ0FBQyxDQUNwRCxDQUFDO3dCQUNHLGlDQUFpQztvQkFFckMsQ0FBQztvQkFDRCxJQUFJLENBQ0osQ0FBQzt3QkFDRyxxQ0FBcUM7d0JBRXJDLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBRSxJQUFJLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUNwRSxDQUFDOzRCQUNHLCtCQUErQjt3QkFFbkMsQ0FBQzt3QkFDRCxJQUFJLENBQ0osQ0FBQzs0QkFDRyxtQ0FBbUM7NEJBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0NBRWIsTUFBTSxFQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBQyxHQUFHLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQ0FDNUQsUUFBUSxFQUFDLEdBQUc7Z0NBQ1osVUFBVSxFQUFDLFFBQVU7Z0NBQ3JCLFVBQVUsRUFBQyxLQUFLOzZCQUVuQixDQUFDLENBQUM7NEJBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDaEQsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7WUFFTCxDQUFDO1FBRUwsQ0FBQyxDQUFBO1FBQ0QsUUFBUSxDQUFDLEtBQUssQ0FDVixZQUFZLEVBQ2hCLGlCQUFpQixFQUNiO1lBRUksV0FBVyxFQUFFLElBQUk7WUFFakIsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRzthQUV0QztTQUVKLENBQ0osQ0FBQztRQUVMLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDcEIsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQWpMRCxJQWlMQztBQWpMWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcblxuZXhwb3J0IGNsYXNzIExpc3RWaWV3SXRlbXNcbntcbiAgICBnZXRNeVRhc2tkZXRhaWxzKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhSXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIC8vdGhpcy5kYXRhSXRlbXM7XG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgLy8gbm90ZSB0aGF0IHRoZSBxdWVyeSByZXR1cm5zIDEgbWF0Y2ggYXQgYSB0aW1lXG4gICAgICAgIC8vIGluIHRoZSBvcmRlciBzcGVjaWZpZWQgaW4gdGhlIHF1ZXJ5XG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2tleTo6Oicra2V5KTtcbiAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygna2V5Ojo6JytyZXN1bHRKc29uW2tleV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgY29uc29sZS5sb2coXCJrZXkgaXMgIG51bGwtLS1cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJrZXkgaXMgbm90ICBudWxsLS0tXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXNrTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWx1ZTo6OjotLS1jcmVhdGVkQnktLS0tLS06OjoxLS0tLS0tXCIrcmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2tleS0tLS0tLS0tLS0tLS0tJytrZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl09PW51bGwgICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXT09bnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidmFsdWUgaXMgbnVsbC0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ2tleTo6Oicra2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tY3JlYXRlZEJ5LS0tLS0tOjo6XCIra2V5KyctLS0tLS0nK2NyZWF0ZWRCeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZhbHVlOjo6Oi0tLS10YXNrTmFtZS0tLS0tOjo6XCIra2V5KyctLS0tLS0nK3Rhc2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tLWR1ZURhdGUtLS0tLTo6OlwiK2tleSsnLS0tLS0tJytkdWVEYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tLXJlbWFpbmRlckNvdW50LS0tLS06OjpcIitrZXkrJy0tLS0tLScrcmVtYWluZGVyQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWx1ZTo6OjotLS0tY29tcGxldGlvblN0YXR1cy0tLS0tOjo6XCIra2V5KyctLS0tLS0nK2NvbXBsZXRpb25TdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidmFsdWUgaXMgbm90IG51bGwtLS1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5PXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTmFtZT1yZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWVEYXRlPXJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvblN0YXR1cz1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2tleTo6Oicra2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tY3JlYXRlZEJ5LS0tLS0tOjo6XCIra2V5KyctLS0tLS0nK2NyZWF0ZWRCeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZhbHVlOjo6Oi0tLS10YXNrTmFtZS0tLS0tOjo6XCIra2V5KyctLS0tLS0nK3Rhc2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tLWR1ZURhdGUtLS0tLTo6OlwiK2tleSsnLS0tLS0tJytkdWVEYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tLXJlbWFpbmRlckNvdW50LS0tLS06OjpcIitrZXkrJy0tLS0tLScrcmVtYWluZGVyQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWx1ZTo6OjotLS0tY29tcGxldGlvblN0YXR1cy0tLS0tOjo6XCIra2V5KyctLS0tLS0nK2NvbXBsZXRpb25TdGF0dXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUl0ZW1zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5XCI6Y3JlYXRlZEJ5ICwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhc2tOYW1lXCI6dGFza05hbWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkdWVEYXRlXCI6IGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlbWFpbmRlckNvdW50XCI6IHJlbWFpbmRlckNvdW50LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGlvblN0YXR1c1wiOiBcIjIvMTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6a2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfTtcblxuICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICBjb25zb2xlLmxvZyhcIkRldmljZSBQaG9uZSBOdW1iZXItLS0tXCIrZGV2aWNlUGhvbmVOdW1iZXIpO1xuICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgJy9NeVRhc2tEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIsXG4gICAgICAgIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgIC8vdmFsdWU6ICd0YXNrTmFtZScgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiBkYXRhSXRlbXM7XG4gICAgfVxuXG4gICAgZ2V0Q29udGFjdExpc3QoKVxuICAgIHtcbiAgICAgICAgICAgIHZhciBjb250YWN0TGlzdD1uZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICAgICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBub3RlIHRoYXQgdGhlIHF1ZXJ5IHJldHVybnMgMSBtYXRjaCBhdCBhIHRpbWVcbiAgICAgICAgICAgIC8vIGluIHRoZSBvcmRlciBzcGVjaWZpZWQgaW4gdGhlIHF1ZXJ5XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2coXCJFdmVudCB0eXBlOiBcIiArIHJlc3VsdC50eXBlKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5OiBcIiArIHJlc3VsdC5rZXkpO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJWYWx1ZSBjb250YWN0IGxpc3QtLS0tLS06IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygna2V5Ojo6JytrZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV09PW51bGwgfHwgcmVzdWx0SnNvbltrZXldPT1cIm51bGxcIilcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImtleSBpcyAgbnVsbC0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImtleSBpcyBub3QgIG51bGwtLS1cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XVtcImZOYW1lXCJdPT1udWxsICYmIHJlc3VsdEpzb25ba2V5XVtcImxOYW1lXCJdPT1udWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJWYWx1ZSBpcyBudWxsXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlZhbHVlIGlzIG5vdCBudWxsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RMaXN0LnB1c2goe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOnJlc3VsdEpzb25ba2V5XVtcImZOYW1lXCJdK1wiIFwiK3Jlc3VsdEpzb25ba2V5XVtcImxOYW1lXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiOmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGVja0JveFwiOlwiXFx1e2YwOTZ9XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZWN0ZWRcIjpmYWxzZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb250YWN0IGxpc3QtLS0tXCIrY29udGFjdExpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvRGV2aWNlRGV0YWlscy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgLy92YWx1ZTogJ3Rhc2tOYW1lJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIFxuICAgICByZXR1cm4gY29udGFjdExpc3Q7XG4gICAgfVxuXG59XG5cbiAgICBcblxuICJdfQ==