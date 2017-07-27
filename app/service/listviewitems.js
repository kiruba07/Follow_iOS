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
                                "completionStatus": "2/10"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHZpZXdpdGVtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3R2aWV3aXRlbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsNkRBVThCO0FBQzlCLDJFQUF5RTtBQUV6RTtJQUFBO0lBZ0xBLENBQUM7SUE5S0csd0NBQWdCLEdBQWhCO1FBRUksSUFBSSxTQUFTLEdBQUMsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLGlCQUFpQjtRQUNqQixJQUFJLFlBQVksR0FBRyxVQUFTLE1BQU07WUFDbEMsZ0RBQWdEO1lBQ2hELHNDQUFzQztZQUV0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQiwrQ0FBK0M7Z0JBQzdDLHFDQUFxQztnQkFDcEMsd0RBQXdEO2dCQUd4RCxJQUFJLFVBQVUsR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUN4QixHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FDMUIsQ0FBQztvQkFDRyw0QkFBNEI7b0JBQzdCLHlDQUF5QztvQkFFeEMsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFFLElBQUksSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUUsTUFBTSxDQUFDLENBQUEsQ0FBQzt3QkFDbkQsbUNBQW1DO29CQUNyQyxDQUFDO29CQUNELElBQUksQ0FBQSxDQUFDO3dCQUNGLHNDQUFzQzt3QkFDckMsSUFBSSxTQUFTLENBQUM7d0JBQ2QsSUFBSSxRQUFRLENBQUM7d0JBQ2IsSUFBSSxPQUFPLENBQUM7d0JBQ1osSUFBSSxjQUFjLENBQUM7d0JBQ25CLElBQUksZ0JBQWdCLENBQUM7d0JBRXRCLHFGQUFxRjt3QkFDcEYsdUNBQXVDO3dCQUV2QyxFQUFFLENBQUEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUUsSUFBSTs0QkFDakMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFFLElBQUk7NEJBQ2xDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBRSxJQUFJOzRCQUNuQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBRSxJQUFJOzRCQUN2QyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FDMUMsQ0FBQzs0QkFDRyxrQ0FBa0M7NEJBQ2xDLGlDQUFpQzs0QkFDckMsd0VBQXdFOzRCQUN4RSxzRUFBc0U7NEJBQ3RFLG9FQUFvRTs0QkFDcEUsa0ZBQWtGOzRCQUNsRixzRkFBc0Y7d0JBRXRGLENBQUM7d0JBQ0QsSUFBSSxDQUFBLENBQUM7NEJBSUwsc0NBQXNDOzRCQUNsQyxTQUFTLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUN2QyxRQUFRLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUNyQyxPQUFPLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUNuQyxjQUFjLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7NEJBQ2pELGdCQUFnQixHQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzRCQUd6RCw0QkFBNEI7NEJBQzVCLHdFQUF3RTs0QkFDeEUsc0VBQXNFOzRCQUN0RSxvRUFBb0U7NEJBQ3BFLGtGQUFrRjs0QkFDbEYsc0ZBQXNGOzRCQUVsRixTQUFTLENBQUMsSUFBSSxDQUNWO2dDQUNJLFdBQVcsRUFBQyxTQUFTO2dDQUNyQixVQUFVLEVBQUMsUUFBUTtnQ0FDbkIsU0FBUyxFQUFFLE9BQU87Z0NBQ2xCLGdCQUFnQixFQUFFLGNBQWM7Z0NBQ2hDLGtCQUFrQixFQUFFLE1BQU07NkJBQzdCLENBQ0osQ0FBQzt3QkFDTixDQUFDO29CQUNMLENBQUM7Z0JBRUwsQ0FBQztZQUdULENBQUM7UUFFTCxDQUFDLENBQUM7UUFFRixJQUFJLGlCQUFpQixHQUFDLGdDQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixHQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekQsUUFBUSxDQUFDLEtBQUssQ0FDVixZQUFZLEVBQ2IsaUJBQWlCLEdBQUMsaUJBQWlCLEVBQ2xDO1lBRUksV0FBVyxFQUFFLElBQUk7WUFFakIsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRzthQUV0QztTQUVKLENBQ0osQ0FBQztRQUNGLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDakIsQ0FBQztJQUVELHNDQUFjLEdBQWQ7UUFFUSxJQUFJLFdBQVcsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxZQUFZLEdBQUcsVUFBUyxNQUFNO1lBRWxDLGdEQUFnRDtZQUNoRCxzQ0FBc0M7WUFFdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQ2xCLENBQUM7Z0JBQ0csK0NBQStDO2dCQUNuRCxxQ0FBcUM7Z0JBQ2xDLDRFQUE0RTtnQkFDM0UsSUFBSSxVQUFVLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDNUIsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLENBQzFCLENBQUM7b0JBQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzFCLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBRSxJQUFJLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFFLE1BQU0sQ0FBQyxDQUNwRCxDQUFDO3dCQUNHLGlDQUFpQztvQkFFckMsQ0FBQztvQkFDRCxJQUFJLENBQ0osQ0FBQzt3QkFDRyxxQ0FBcUM7d0JBRXJDLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBRSxJQUFJLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUNwRSxDQUFDOzRCQUNHLCtCQUErQjt3QkFFbkMsQ0FBQzt3QkFDRCxJQUFJLENBQ0osQ0FBQzs0QkFDRyxtQ0FBbUM7NEJBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0NBRWIsTUFBTSxFQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBQyxHQUFHLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQ0FDNUQsUUFBUSxFQUFDLEdBQUc7Z0NBQ1osVUFBVSxFQUFDLFFBQVU7Z0NBQ3JCLFVBQVUsRUFBQyxLQUFLOzZCQUVuQixDQUFDLENBQUM7NEJBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDaEQsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7WUFFTCxDQUFDO1FBRUwsQ0FBQyxDQUFBO1FBQ0QsUUFBUSxDQUFDLEtBQUssQ0FDVixZQUFZLEVBQ2hCLGlCQUFpQixFQUNiO1lBRUksV0FBVyxFQUFFLElBQUk7WUFFakIsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRzthQUV0QztTQUVKLENBQ0osQ0FBQztRQUVMLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDcEIsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQWhMRCxJQWdMQztBQWhMWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcblxuZXhwb3J0IGNsYXNzIExpc3RWaWV3SXRlbXNcbntcbiAgICBnZXRNeVRhc2tkZXRhaWxzKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhSXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIC8vdGhpcy5kYXRhSXRlbXM7XG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgLy8gbm90ZSB0aGF0IHRoZSBxdWVyeSByZXR1cm5zIDEgbWF0Y2ggYXQgYSB0aW1lXG4gICAgICAgIC8vIGluIHRoZSBvcmRlciBzcGVjaWZpZWQgaW4gdGhlIHF1ZXJ5XG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJWYWx1ZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2tleTo6Oicra2V5KTtcbiAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygna2V5Ojo6JytyZXN1bHRKc29uW2tleV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgY29uc29sZS5sb2coXCJrZXkgaXMgIG51bGwtLS1cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJrZXkgaXMgbm90ICBudWxsLS0tXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWRCeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXNrTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25TdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWx1ZTo6OjotLS1jcmVhdGVkQnktLS0tLS06OjoxLS0tLS0tXCIrcmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2tleS0tLS0tLS0tLS0tLS0tJytrZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl09PW51bGwgICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXT09bnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidmFsdWUgaXMgbnVsbC0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ2tleTo6Oicra2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tY3JlYXRlZEJ5LS0tLS0tOjo6XCIra2V5KyctLS0tLS0nK2NyZWF0ZWRCeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZhbHVlOjo6Oi0tLS10YXNrTmFtZS0tLS0tOjo6XCIra2V5KyctLS0tLS0nK3Rhc2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tLWR1ZURhdGUtLS0tLTo6OlwiK2tleSsnLS0tLS0tJytkdWVEYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tLXJlbWFpbmRlckNvdW50LS0tLS06OjpcIitrZXkrJy0tLS0tLScrcmVtYWluZGVyQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWx1ZTo6OjotLS0tY29tcGxldGlvblN0YXR1cy0tLS0tOjo6XCIra2V5KyctLS0tLS0nK2NvbXBsZXRpb25TdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidmFsdWUgaXMgbm90IG51bGwtLS1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJ5PXJlc3VsdEpzb25ba2V5XVtcImNyZWF0ZWRCeVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTmFtZT1yZXN1bHRKc29uW2tleV1bXCJ0YXNrTmFtZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWVEYXRlPXJlc3VsdEpzb25ba2V5XVtcImR1ZURhdGVcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyQ291bnQ9cmVzdWx0SnNvbltrZXldW1wicmVtYWluZGVyQ291bnRcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGlvblN0YXR1cz1yZXN1bHRKc29uW2tleV1bXCJjb21wbGV0aW9uU3RhdHVzXCJdO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2tleTo6Oicra2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tY3JlYXRlZEJ5LS0tLS0tOjo6XCIra2V5KyctLS0tLS0nK2NyZWF0ZWRCeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZhbHVlOjo6Oi0tLS10YXNrTmFtZS0tLS0tOjo6XCIra2V5KyctLS0tLS0nK3Rhc2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tLWR1ZURhdGUtLS0tLTo6OlwiK2tleSsnLS0tLS0tJytkdWVEYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tLXJlbWFpbmRlckNvdW50LS0tLS06OjpcIitrZXkrJy0tLS0tLScrcmVtYWluZGVyQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWx1ZTo6OjotLS0tY29tcGxldGlvblN0YXR1cy0tLS0tOjo6XCIra2V5KyctLS0tLS0nK2NvbXBsZXRpb25TdGF0dXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUl0ZW1zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZEJ5XCI6Y3JlYXRlZEJ5ICwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhc2tOYW1lXCI6dGFza05hbWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkdWVEYXRlXCI6IGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlbWFpbmRlckNvdW50XCI6IHJlbWFpbmRlckNvdW50LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGlvblN0YXR1c1wiOiBcIjIvMTBcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9O1xuXG4gICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIFBob25lIE51bWJlci0tLS1cIitkZXZpY2VQaG9uZU51bWJlcik7XG4gICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAnL015VGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcixcbiAgICAgICAge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZLFxuICAgICAgICAgICAgICAgLy92YWx1ZTogJ3Rhc2tOYW1lJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIGRhdGFJdGVtcztcbiAgICB9XG5cbiAgICBnZXRDb250YWN0TGlzdCgpXG4gICAge1xuICAgICAgICAgICAgdmFyIGNvbnRhY3RMaXN0PW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIG5vdGUgdGhhdCB0aGUgcXVlcnkgcmV0dXJucyAxIG1hdGNoIGF0IGEgdGltZVxuICAgICAgICAgICAgLy8gaW4gdGhlIG9yZGVyIHNwZWNpZmllZCBpbiB0aGUgcXVlcnlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJLZXk6IFwiICsgcmVzdWx0LmtleSk7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlZhbHVlIGNvbnRhY3QgbGlzdC0tLS0tLTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdrZXk6OjonK2tleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwia2V5IGlzICBudWxsLS0tXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwia2V5IGlzIG5vdCAgbnVsbC0tLVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldW1wiZk5hbWVcIl09PW51bGwgJiYgcmVzdWx0SnNvbltrZXldW1wibE5hbWVcIl09PW51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlZhbHVlIGlzIG51bGxcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVmFsdWUgaXMgbm90IG51bGxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdExpc3QucHVzaCh7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6cmVzdWx0SnNvbltrZXldW1wiZk5hbWVcIl0rXCIgXCIrcmVzdWx0SnNvbltrZXldW1wibE5hbWVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6a2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoZWNrQm94XCI6XCJcXHV7ZjA5Nn1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZFwiOmZhbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbnRhY3QgbGlzdC0tLS1cIitjb250YWN0TGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgJy9EZXZpY2VEZXRhaWxzLycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgICAvL3ZhbHVlOiAndGFza05hbWUnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgXG4gICAgIHJldHVybiBjb250YWN0TGlzdDtcbiAgICB9XG5cbn1cblxuICAgIFxuXG4gIl19