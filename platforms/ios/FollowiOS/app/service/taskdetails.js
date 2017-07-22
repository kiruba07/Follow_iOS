"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("application-settings");
var TaskDetails = (function () {
    function TaskDetails() {
        this.onQueryEvent = function (result) {
            // note that the query returns 1 match at a time
            // in the order specified in the query
            if (!result.error) {
                //console.log("Event type: " + result.length);
                //console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value.length));
            }
        };
    }
    TaskDetails.prototype.saveOtherTaskDetails = function (taskName, category, dateTime, assigneeName) {
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var deviceRegisteredUserName = application_settings_1.getString("deviceRegisteredUserName");
        var remainderCount = 0;
        var deletionCount = 0;
        var completedAssignee = 0;
        var totalAssignee = 0;
        console.log("Device Phone Number" + devicePhoneNumber);
        var taskCount = 3;
        taskCount = this.getTotalTaskCount(devicePhoneNumber);
        return firebase.push('/OtherTask/' + devicePhoneNumber + '/' + taskCount + '/', {
            'tasknmae': taskName,
            'category': category,
            'assigneename': deviceRegisteredUserName,
            'remaindercount': remainderCount,
            'deleteioncount': deletionCount,
            'completedassignee': completedAssignee,
            'totalassignee': totalAssignee,
        });
    };
    TaskDetails.prototype.getTotalTaskCount = function (devicePhoneNumber) {
        firebase.query(this.onQueryEvent, '/OtherTask/' + devicePhoneNumber + '/', {
            // set this to true if you want to check if the value exists or just want the event to fire once
            // default false, so it listens continuously.
            // Only when true, this function will return the data in the promise as well!
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
            // but only companies 'since' a certain year (Telerik's value is 2000, which is imaginary btw)
            // use either a 'range'
            //range: {
            //    type: firebase.QueryRangeType.EQUAL_TO,
            //    value: 2000
            ///},
            // .. or 'chain' ranges like this:
            // ranges: [
            // {
            //     type: firebase.QueryRangeType.START_AT,
            //     value: 1999
            // },
            // {
            //     type: firebase.QueryRangeType.END_AT,
            //     value: 2000
            // }
            // ],
            // only the first 2 matches
            // (note that there's only 1 in this case anyway)
            limit: {
                type: firebase.QueryLimitType.LAST,
                value: 2
            }
        });
        return 2;
    };
    return TaskDetails;
}());
exports.TaskDetails = TaskDetails;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2RldGFpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrZGV0YWlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUEwRDtBQUMxRCw2REFVOEI7QUFFOUI7SUFBQTtRQXlFUSxpQkFBWSxHQUFHLFVBQVMsTUFBTTtZQUMxQixnREFBZ0Q7WUFDaEQsc0NBQXNDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLDhDQUE4QztnQkFDOUMsb0NBQW9DO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqRSxDQUFDO1FBQ0osQ0FBQyxDQUFDO0lBS1gsQ0FBQztJQW5GTywwQ0FBb0IsR0FBcEIsVUFBcUIsUUFBUSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsWUFBWTtRQUd4RCxJQUFJLGlCQUFpQixHQUFDLGdDQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyRCxJQUFJLHdCQUF3QixHQUFDLGdDQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNuRSxJQUFJLGNBQWMsR0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxhQUFhLEdBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksaUJBQWlCLEdBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksYUFBYSxHQUFDLENBQUMsQ0FBQztRQUVwQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDckQsSUFBSSxTQUFTLEdBQUUsQ0FBQyxDQUFDO1FBQ2pCLFNBQVMsR0FBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDWixhQUFhLEdBQUMsaUJBQWlCLEdBQUMsR0FBRyxHQUFDLFNBQVMsR0FBQyxHQUFHLEVBQ2pEO1lBQ0ksVUFBVSxFQUFDLFFBQVE7WUFDbkIsVUFBVSxFQUFDLFFBQVE7WUFDbkIsY0FBYyxFQUFDLHdCQUF3QjtZQUN2QyxnQkFBZ0IsRUFBQyxjQUFjO1lBQy9CLGdCQUFnQixFQUFDLGFBQWE7WUFDOUIsbUJBQW1CLEVBQUMsaUJBQWlCO1lBQ3JDLGVBQWUsRUFBQyxhQUFhO1NBRWhDLENBQ0osQ0FBQTtJQUVULENBQUM7SUFDRCx1Q0FBaUIsR0FBakIsVUFBa0IsaUJBQWlCO1FBRS9CLFFBQVEsQ0FBQyxLQUFLLENBQ2QsSUFBSSxDQUFDLFlBQVksRUFDbEIsYUFBYSxHQUFDLGlCQUFpQixHQUFDLEdBQUcsRUFDbEM7WUFDSSxnR0FBZ0c7WUFDaEcsNkNBQTZDO1lBQzdDLDZFQUE2RTtZQUM3RSxXQUFXLEVBQUUsSUFBSTtZQUNqQiwyQkFBMkI7WUFDM0IsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSztnQkFDckMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxpQ0FBaUM7YUFDbkQ7WUFDRCw4RkFBOEY7WUFDOUYsdUJBQXVCO1lBQ3ZCLFVBQVU7WUFDViw2Q0FBNkM7WUFDN0MsaUJBQWlCO1lBQ2pCLEtBQUs7WUFDTCxrQ0FBa0M7WUFDbEMsWUFBWTtZQUNaLElBQUk7WUFDSiw4Q0FBOEM7WUFDOUMsa0JBQWtCO1lBQ2xCLEtBQUs7WUFDTCxJQUFJO1lBQ0osNENBQTRDO1lBQzVDLGtCQUFrQjtZQUNsQixJQUFJO1lBQ0osS0FBSztZQUNMLDJCQUEyQjtZQUMzQixpREFBaUQ7WUFDakQsS0FBSyxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUk7Z0JBQ2xDLEtBQUssRUFBRSxDQUFDO2FBQ1g7U0FDTCxDQUNKLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQWNULGtCQUFDO0FBQUQsQ0FBQyxBQXRGRCxJQXNGQztBQXRGWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrRGV0YWlsc3tcblxuICAgICAgICBcbiAgICAgICAgc2F2ZU90aGVyVGFza0RldGFpbHModGFza05hbWUsY2F0ZWdvcnksZGF0ZVRpbWUsYXNzaWduZWVOYW1lKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIHZhciBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICAgICAgICAgIHZhciBkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWU9Z2V0U3RyaW5nKFwiZGV2aWNlUmVnaXN0ZXJlZFVzZXJOYW1lXCIpO1xuICAgICAgICAgICAgdmFyIHJlbWFpbmRlckNvdW50PTA7XG4gICAgICAgICAgICB2YXIgZGVsZXRpb25Db3VudD0wO1xuICAgICAgICAgICAgdmFyIGNvbXBsZXRlZEFzc2lnbmVlPTA7XG4gICAgICAgICAgICB2YXIgdG90YWxBc3NpZ25lZT0wO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRldmljZSBQaG9uZSBOdW1iZXJcIitkZXZpY2VQaG9uZU51bWJlcik7XG4gICAgICAgICAgICB2YXIgdGFza0NvdW50ID0zO1xuICAgICAgICAgICAgdGFza0NvdW50PSB0aGlzLmdldFRvdGFsVGFza0NvdW50KGRldmljZVBob25lTnVtYmVyKTtcbiAgICAgICAgICAgIHJldHVybiBmaXJlYmFzZS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAnL090aGVyVGFzay8nK2RldmljZVBob25lTnVtYmVyKycvJyt0YXNrQ291bnQrJy8nLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAndGFza25tYWUnOnRhc2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NhdGVnb3J5JzpjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdhc3NpZ25lZW5hbWUnOmRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZW1haW5kZXJjb3VudCc6cmVtYWluZGVyQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGVsZXRlaW9uY291bnQnOmRlbGV0aW9uQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29tcGxldGVkYXNzaWduZWUnOmNvbXBsZXRlZEFzc2lnbmVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RvdGFsYXNzaWduZWUnOnRvdGFsQXNzaWduZWUsXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcblxuICAgICAgICB9XG4gICAgICAgIGdldFRvdGFsVGFza0NvdW50KGRldmljZVBob25lTnVtYmVyKTogbnVtYmVyXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgdGhpcy5vblF1ZXJ5RXZlbnQsXG4gICAgICAgICAgICcvT3RoZXJUYXNrLycrZGV2aWNlUGhvbmVOdW1iZXIrJy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGV4aXN0cyBvciBqdXN0IHdhbnQgdGhlIGV2ZW50IHRvIGZpcmUgb25jZVxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgZmFsc2UsIHNvIGl0IGxpc3RlbnMgY29udGludW91c2x5LlxuICAgICAgICAgICAgICAgIC8vIE9ubHkgd2hlbiB0cnVlLCB0aGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSBkYXRhIGluIHRoZSBwcm9taXNlIGFzIHdlbGwhXG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3NpbmNlJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vIGJ1dCBvbmx5IGNvbXBhbmllcyAnc2luY2UnIGEgY2VydGFpbiB5ZWFyIChUZWxlcmlrJ3MgdmFsdWUgaXMgMjAwMCwgd2hpY2ggaXMgaW1hZ2luYXJ5IGJ0dylcbiAgICAgICAgICAgICAgICAvLyB1c2UgZWl0aGVyIGEgJ3JhbmdlJ1xuICAgICAgICAgICAgICAgIC8vcmFuZ2U6IHtcbiAgICAgICAgICAgICAgICAvLyAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcbiAgICAgICAgICAgICAgICAvLyAgICB2YWx1ZTogMjAwMFxuICAgICAgICAgICAgICAgIC8vL30sXG4gICAgICAgICAgICAgICAgLy8gLi4gb3IgJ2NoYWluJyByYW5nZXMgbGlrZSB0aGlzOlxuICAgICAgICAgICAgICAgIC8vIHJhbmdlczogW1xuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuU1RBUlRfQVQsXG4gICAgICAgICAgICAgICAgLy8gICAgIHZhbHVlOiAxOTk5XG4gICAgICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVORF9BVCxcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFsdWU6IDIwMDBcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgLy8gXSxcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHRoZSBmaXJzdCAyIG1hdGNoZXNcbiAgICAgICAgICAgICAgICAvLyAobm90ZSB0aGF0IHRoZXJlJ3Mgb25seSAxIGluIHRoaXMgY2FzZSBhbnl3YXkpXG4gICAgICAgICAgICAgICAgbGltaXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5TGltaXRUeXBlLkxBU1QsXG4gICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMlxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgfVxuICAgICAgICBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIG5vdGUgdGhhdCB0aGUgcXVlcnkgcmV0dXJucyAxIG1hdGNoIGF0IGEgdGltZVxuICAgICAgICAgICAgLy8gaW4gdGhlIG9yZGVyIHNwZWNpZmllZCBpbiB0aGUgcXVlcnlcbiAgICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkV2ZW50IHR5cGU6IFwiICsgcmVzdWx0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIktleTogXCIgKyByZXN1bHQua2V5KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC52YWx1ZS5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH07XG4gICAgICAgIFxuXG5cblxufSJdfQ==