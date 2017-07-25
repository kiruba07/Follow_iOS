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
                console.log("Value: " + JSON.stringify(result.value));
                var resultJson = result.value;
                for (var key in resultJson) {
                    console.log('key:::' + key);
                    // console.log('key:::'+resultJson[key]);
                    if (resultJson[key] == null || resultJson[key] == "null") {
                        console.log("key is  null---");
                    }
                    else {
                        console.log("key is not  null---");
                        var createdBy;
                        var taskName;
                        var dueDate;
                        var remainderCount;
                        var completionStatus;
                        console.log("value::::---createdBy------:::1------" + resultJson[key]["createdBy"]);
                        console.log('key--------------' + key);
                        if (resultJson[key]["createdBy"] == null &&
                            resultJson[key]["taskName"] == null &&
                            resultJson[key]["dueDate"] == null &&
                            resultJson[key]["remainderCount"] == null &&
                            resultJson[key]["completionStatus"] == null) {
                            console.log("value is null---");
                            //     console.log('key:::'+key);
                            // console.log("value::::---createdBy------:::"+key+'------'+createdBy);
                            // console.log("value::::----taskName-----:::"+key+'------'+taskName);
                            // console.log("value::::----dueDate-----:::"+key+'------'+dueDate);
                            // console.log("value::::----remainderCount-----:::"+key+'------'+remainderCount);
                            // console.log("value::::----completionStatus-----:::"+key+'------'+completionStatus);
                        }
                        else {
                            console.log("value is not null---");
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
                                "dueDate": "03-08-2017 10:00AM",
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
                console.log("Value contact list------: " + JSON.stringify(result.value));
                var resultJson = result.value;
                for (var key in resultJson) {
                    console.log('key:::' + key);
                    if (resultJson[key] == null || resultJson[key] == "null") {
                        console.log("key is  null---");
                    }
                    else {
                        console.log("key is not  null---");
                        if (resultJson[key]["fName"] == null && resultJson[key]["lName"] == null) {
                            console.log("Value is null");
                        }
                        else {
                            console.log("Value is not null");
                            contactList.push({
                                "name": resultJson[key]["fName"] + " " + resultJson[key]["lName"],
                                "number": key
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHZpZXdpdGVtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3R2aWV3aXRlbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFDMUQsNkRBVThCO0FBQzlCLDJFQUF5RTtBQUV6RTtJQUFBO0lBOEtBLENBQUM7SUE1S0csd0NBQWdCLEdBQWhCO1FBRUksSUFBSSxTQUFTLEdBQUMsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLGlCQUFpQjtRQUNqQixJQUFJLFlBQVksR0FBRyxVQUFTLE1BQU07WUFDbEMsZ0RBQWdEO1lBQ2hELHNDQUFzQztZQUV0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQiwrQ0FBK0M7Z0JBQzdDLHFDQUFxQztnQkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFHdEQsSUFBSSxVQUFVLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDeEIsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLENBQzFCLENBQUM7b0JBQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzNCLHlDQUF5QztvQkFFeEMsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFFLElBQUksSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUUsTUFBTSxDQUFDLENBQUEsQ0FBQzt3QkFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUNuQyxDQUFDO29CQUNELElBQUksQ0FBQSxDQUFDO3dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQzt3QkFDbkMsSUFBSSxTQUFTLENBQUM7d0JBQ2QsSUFB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T0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDaEQsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7WUFFTCxDQUFDO1FBRUwsQ0FBQyxDQUFBO1FBQ0QsUUFBUSxDQUFDLEtBQUssQ0FDVixZQUFZLEVBQ2hCLGlCQUFpQixFQUNiO1lBRUksV0FBVyxFQUFFLElBQUk7WUFFakIsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRzthQUV0QztTQUVKLENBQ0osQ0FBQztRQUVMLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDcEIsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQTlLRCxJQThLQztBQTlLWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcblxuZXhwb3J0IGNsYXNzIExpc3RWaWV3SXRlbXNcbntcbiAgICBnZXRNeVRhc2tkZXRhaWxzKClcbiAgICB7XG4gICAgICAgIHZhciBkYXRhSXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIC8vdGhpcy5kYXRhSXRlbXM7XG4gICAgICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgLy8gbm90ZSB0aGF0IHRoZSBxdWVyeSByZXR1cm5zIDEgbWF0Y2ggYXQgYSB0aW1lXG4gICAgICAgIC8vIGluIHRoZSBvcmRlciBzcGVjaWZpZWQgaW4gdGhlIHF1ZXJ5XG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0LnR5cGUpO1xuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmFsdWU6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnZhbHVlKSk7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgdmFyIHJlc3VsdEpzb249cmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHJlc3VsdEpzb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygna2V5Ojo6JytrZXkpO1xuICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdrZXk6OjonK3Jlc3VsdEpzb25ba2V5XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0SnNvbltrZXldPT1udWxsIHx8IHJlc3VsdEpzb25ba2V5XT09XCJudWxsXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJrZXkgaXMgIG51bGwtLS1cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwia2V5IGlzIG5vdCAgbnVsbC0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFza05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5kZXJDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0aW9uU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZhbHVlOjo6Oi0tLWNyZWF0ZWRCeS0tLS0tLTo6OjEtLS0tLS1cIityZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2tleS0tLS0tLS0tLS0tLS0tJytrZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJjcmVhdGVkQnlcIl09PW51bGwgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1widGFza05hbWVcIl09PW51bGwgICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXT09bnVsbCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEpzb25ba2V5XVtcInJlbWFpbmRlckNvdW50XCJdPT1udWxsICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SnNvbltrZXldW1wiY29tcGxldGlvblN0YXR1c1wiXT09bnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZhbHVlIGlzIG51bGwtLS1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdrZXk6OjonK2tleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZhbHVlOjo6Oi0tLWNyZWF0ZWRCeS0tLS0tLTo6OlwiK2tleSsnLS0tLS0tJytjcmVhdGVkQnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWx1ZTo6OjotLS0tdGFza05hbWUtLS0tLTo6OlwiK2tleSsnLS0tLS0tJyt0YXNrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZhbHVlOjo6Oi0tLS1kdWVEYXRlLS0tLS06OjpcIitrZXkrJy0tLS0tLScrZHVlRGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZhbHVlOjo6Oi0tLS1yZW1haW5kZXJDb3VudC0tLS0tOjo6XCIra2V5KyctLS0tLS0nK3JlbWFpbmRlckNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tLWNvbXBsZXRpb25TdGF0dXMtLS0tLTo6OlwiK2tleSsnLS0tLS0tJytjb21wbGV0aW9uU3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2YWx1ZSBpcyBub3QgbnVsbC0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQnk9cmVzdWx0SnNvbltrZXldW1wiY3JlYXRlZEJ5XCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tOYW1lPXJlc3VsdEpzb25ba2V5XVtcInRhc2tOYW1lXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1ZURhdGU9cmVzdWx0SnNvbltrZXldW1wiZHVlRGF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1haW5kZXJDb3VudD1yZXN1bHRKc29uW2tleV1bXCJyZW1haW5kZXJDb3VudFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0aW9uU3RhdHVzPXJlc3VsdEpzb25ba2V5XVtcImNvbXBsZXRpb25TdGF0dXNcIl07XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygna2V5Ojo6JytrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWx1ZTo6OjotLS1jcmVhdGVkQnktLS0tLS06OjpcIitrZXkrJy0tLS0tLScrY3JlYXRlZEJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidmFsdWU6Ojo6LS0tLXRhc2tOYW1lLS0tLS06OjpcIitrZXkrJy0tLS0tLScrdGFza05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWx1ZTo6OjotLS0tZHVlRGF0ZS0tLS0tOjo6XCIra2V5KyctLS0tLS0nK2R1ZURhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2YWx1ZTo6OjotLS0tcmVtYWluZGVyQ291bnQtLS0tLTo6OlwiK2tleSsnLS0tLS0tJytyZW1haW5kZXJDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInZhbHVlOjo6Oi0tLS1jb21wbGV0aW9uU3RhdHVzLS0tLS06OjpcIitrZXkrJy0tLS0tLScrY29tcGxldGlvblN0YXR1cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhSXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkQnlcIjpjcmVhdGVkQnkgLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFza05hbWVcIjp0YXNrTmFtZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImR1ZURhdGVcIjogXCIwMy0wOC0yMDE3IDEwOjAwQU1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVtYWluZGVyQ291bnRcIjogcmVtYWluZGVyQ291bnQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0aW9uU3RhdHVzXCI6IFwiMi8xMFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH07XG5cbiAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgY29uc29sZS5sb2coXCJEZXZpY2UgUGhvbmUgTnVtYmVyLS0tLVwiK2RldmljZVBob25lTnVtYmVyKTtcbiAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICcvTXlUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyLFxuICAgICAgICB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAvL3ZhbHVlOiAndGFza05hbWUnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gZGF0YUl0ZW1zO1xuICAgIH1cblxuICAgIGdldENvbnRhY3RMaXN0KClcbiAgICB7XG4gICAgICAgICAgICB2YXIgY29udGFjdExpc3Q9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgLy8gbm90ZSB0aGF0IHRoZSBxdWVyeSByZXR1cm5zIDEgbWF0Y2ggYXQgYSB0aW1lXG4gICAgICAgICAgICAvLyBpbiB0aGUgb3JkZXIgc3BlY2lmaWVkIGluIHRoZSBxdWVyeVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwiRXZlbnQgdHlwZTogXCIgKyByZXN1bHQudHlwZSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlIGNvbnRhY3QgbGlzdC0tLS0tLTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0SnNvbj1yZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmVzdWx0SnNvbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdrZXk6OjonK2tleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdEpzb25ba2V5XT09bnVsbCB8fCByZXN1bHRKc29uW2tleV09PVwibnVsbFwiKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImtleSBpcyAgbnVsbC0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJrZXkgaXMgbm90ICBudWxsLS0tXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRKc29uW2tleV1bXCJmTmFtZVwiXT09bnVsbCAmJiByZXN1bHRKc29uW2tleV1bXCJsTmFtZVwiXT09bnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlIGlzIG51bGxcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlIGlzIG5vdCBudWxsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RMaXN0LnB1c2goe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOnJlc3VsdEpzb25ba2V5XVtcImZOYW1lXCJdK1wiIFwiK3Jlc3VsdEpzb25ba2V5XVtcImxOYW1lXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiOmtleVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb250YWN0IGxpc3QtLS0tXCIrY29udGFjdExpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICAgICcvRGV2aWNlRGV0YWlscy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgICAgLy92YWx1ZTogJ3Rhc2tOYW1lJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIFxuICAgICByZXR1cm4gY29udGFjdExpc3Q7XG4gICAgfVxuXG59XG5cbiAgICBcblxuICJdfQ==