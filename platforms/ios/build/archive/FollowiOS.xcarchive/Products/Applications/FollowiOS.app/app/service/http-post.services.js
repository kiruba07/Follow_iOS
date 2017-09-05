"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// >> http-post-service
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var MyHttpPostService = (function () {
    function MyHttpPostService(http) {
        this.http = http;
        this.serverUrl = "https://fcm.googleapis.com/fcm/send";
    }
    MyHttpPostService.prototype.postData = function (data) {
        console.log("POST");
        console.log("Data" + data);
        var options = this.createRequestOptions();
        return this.http.post(this.serverUrl, data, options)
            .map(function (res) { return res.json(); });
        // var headers = {
        //     'Authorization': 'key=YOUR-SERVER-KEY',
        //     'Content-Type': 'application/json'
        // };
        // var dataString = {
        //   "notification": {
        //     "title": "Portugal vs. Denmark",
        //     "body": "5 to 1",
        //     "icon": "firebase-logo.png",
        //     "click_action": "http://localhost:8081"
        //   },
        //   "to": "DEVICE_REGISTRATION_TOKEN"
        // };
        // var options = {
        //     url: 'https://fcm.googleapis.com/fcm/send',
        //     method: 'POST',
        //     headers: headers,
        //     body: dataString
        // };
        // function callback(error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         console.log(body);
        //     }
        // }
        // request(options, callback);
    };
    MyHttpPostService.prototype.createRequestOptions = function () {
        var headers = new http_1.Headers();
        headers.append("Authorization", "key=AAAAhbsxMHI:APA91bGfBpwM-gxUBkWV0Rodt2RPgUAV43fk1Rm77hK2LOZaNhB7vw2mf9-vqbiTwVp-P03vfzwBI6bREfqMbRsbSS4PnUkFvO2xMgm6bs7BiGolCxytABKjAevSfz2b9cyVIhIq6xlk");
        headers.append("Content-Type", "application/json");
        var options = new http_1.RequestOptions({ headers: headers });
        console.log("Options--" + options);
        return options;
    };
    return MyHttpPostService;
}());
MyHttpPostService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MyHttpPostService);
exports.MyHttpPostService = MyHttpPostService;
// << http-post-service
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1wb3N0LnNlcnZpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaHR0cC1wb3N0LnNlcnZpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUJBQXVCO0FBQ3ZCLHNDQUEyQztBQUMzQyxzQ0FBd0U7QUFFeEUsaUNBQStCO0FBSy9CLElBQWEsaUJBQWlCO0lBRzFCLDJCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUZ0QixjQUFTLEdBQUcscUNBQXFDLENBQUM7SUFFeEIsQ0FBQztJQUVuQyxvQ0FBUSxHQUFSLFVBQVMsSUFBUztRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQzthQUMvQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQUM7UUFFNUIsa0JBQWtCO1FBQ2xCLDhDQUE4QztRQUM5Qyx5Q0FBeUM7UUFDekMsS0FBSztRQUVMLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsdUNBQXVDO1FBQ3ZDLHdCQUF3QjtRQUN4QixtQ0FBbUM7UUFDbkMsOENBQThDO1FBQzlDLE9BQU87UUFDUCxzQ0FBc0M7UUFDdEMsS0FBSztRQUVMLGtCQUFrQjtRQUNsQixrREFBa0Q7UUFDbEQsc0JBQXNCO1FBQ3RCLHdCQUF3QjtRQUN4Qix1QkFBdUI7UUFDdkIsS0FBSztRQUVMLDZDQUE2QztRQUM3QyxrREFBa0Q7UUFDbEQsNkJBQTZCO1FBQzdCLFFBQVE7UUFDUixJQUFJO1FBRUosOEJBQThCO0lBRWxDLENBQUM7SUFFTyxnREFBb0IsR0FBNUI7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLDhKQUE4SixDQUFDLENBQUM7UUFDaE0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFwREQsSUFvREM7QUFwRFksaUJBQWlCO0lBRDdCLGlCQUFVLEVBQUU7cUNBSWlCLFdBQUk7R0FIckIsaUJBQWlCLENBb0Q3QjtBQXBEWSw4Q0FBaUI7QUFxRDlCLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8vID4+IGh0dHAtcG9zdC1zZXJ2aWNlXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuXG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE15SHR0cFBvc3RTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9mY20uZ29vZ2xlYXBpcy5jb20vZmNtL3NlbmRcIjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XG5cbiAgICBwb3N0RGF0YShkYXRhOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQT1NUXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRhdGFcIitkYXRhKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RPcHRpb25zKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZlclVybCwgZGF0YSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xuXG4gICAgICAgIC8vIHZhciBoZWFkZXJzID0ge1xuICAgICAgICAvLyAgICAgJ0F1dGhvcml6YXRpb24nOiAna2V5PVlPVVItU0VSVkVSLUtFWScsXG4gICAgICAgIC8vICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIC8vIH07XG4gICAgICAgIFxuICAgICAgICAvLyB2YXIgZGF0YVN0cmluZyA9IHtcbiAgICAgICAgLy8gICBcIm5vdGlmaWNhdGlvblwiOiB7XG4gICAgICAgIC8vICAgICBcInRpdGxlXCI6IFwiUG9ydHVnYWwgdnMuIERlbm1hcmtcIixcbiAgICAgICAgLy8gICAgIFwiYm9keVwiOiBcIjUgdG8gMVwiLFxuICAgICAgICAvLyAgICAgXCJpY29uXCI6IFwiZmlyZWJhc2UtbG9nby5wbmdcIixcbiAgICAgICAgLy8gICAgIFwiY2xpY2tfYWN0aW9uXCI6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgxXCJcbiAgICAgICAgLy8gICB9LFxuICAgICAgICAvLyAgIFwidG9cIjogXCJERVZJQ0VfUkVHSVNUUkFUSU9OX1RPS0VOXCJcbiAgICAgICAgLy8gfTtcbiAgICAgICAgXG4gICAgICAgIC8vIHZhciBvcHRpb25zID0ge1xuICAgICAgICAvLyAgICAgdXJsOiAnaHR0cHM6Ly9mY20uZ29vZ2xlYXBpcy5jb20vZmNtL3NlbmQnLFxuICAgICAgICAvLyAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIC8vICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICAvLyAgICAgYm9keTogZGF0YVN0cmluZ1xuICAgICAgICAvLyB9O1xuICAgICAgICBcbiAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGJhY2soZXJyb3IsIHJlc3BvbnNlLCBib2R5KSB7XG4gICAgICAgIC8vICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjAwKSB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgXG4gICAgICAgIC8vIHJlcXVlc3Qob3B0aW9ucywgY2FsbGJhY2spO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0T3B0aW9ucygpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJrZXk9QUFBQWhic3hNSEk6QVBBOTFiR2ZCcHdNLWd4VUJrV1YwUm9kdDJSUGdVQVY0M2ZrMVJtNzdoSzJMT1phTmhCN3Z3Mm1mOS12cWJpVHdWcC1QMDN2Znp3Qkk2YlJFZnFNYlJzYlNTNFBuVWtGdk8yeE1nbTZiczdCaUdvbEN4eXRBQktqQWV2U2Z6MmI5Y3lWSWhJcTZ4bGtcIik7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9wdGlvbnMtLVwiK29wdGlvbnMpO1xuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG59XG4vLyA8PCBodHRwLXBvc3Qtc2VydmljZVxuXG5cblxuXG5cbiJdfQ==