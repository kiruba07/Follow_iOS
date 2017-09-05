"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var firebase = require("nativescript-plugin-firebase");
var LocalNotifications = require("nativescript-local-notifications");
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
        LocalNotifications.hasPermission().then(function (granted) {
            console.log("Permission granted? " + granted);
        });
        firebase.init({
            persist: false,
            onPushTokenReceivedCallback: function (token) {
                console.log("Firebase plugin received a push token: " + token);
            },
            onMessageReceivedCallback: function (message) {
                console.log("--- message received: " + message.title);
                LocalNotifications.schedule([{
                        id: 1,
                        title: 'The title',
                        body: 'Recurs every minute until cancelled',
                        //ticker: 'The ticker',
                        badge: 1,
                        //groupedMessages:["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
                        //groupSummary:"Summary of the grouped messages above", //android only
                        //ongoing: true, // makes the notification ongoing (Android only)
                        //smallIcon: 'res://heart',
                        //interval: 'minute',
                        //sound: require("application").ios ? "customsound-ios.wav" : "customsound-android", // can be also `null`, "default"
                        at: new Date(new Date().getTime() + (0.5 * 1000)) // 10 seconds from now
                    }]).then(function () {
                    console.log("Notification scheduled");
                }, function (error) {
                    console.log("scheduling error: " + error);
                });
            }
        }).then(function (instance) {
            console.log("firebase.init done");
        }, function (error) {
            console.log("firebase.init error: " + error);
        });
        //firebase.logout();
        this.noBoolKey = application_settings_1.hasKey("noBoolKey");
        //console.log("Bool val---"+getBoolean("noBoolKey"));
        if (this.noBoolKey) {
            console.log("Alreday registered ----");
            this.router.navigate(["/mainfragment"]);
        }
        else {
            console.log("First Time--------");
            this.router.navigate(["/registration"]);
        }
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "main",
        template: "<page-router-outlet></page-router-outlet>"
    }),
    __metadata("design:paramtypes", [router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQVU4QjtBQUM5Qix1REFBMEQ7QUFDMUQscUVBQXVFO0FBUXZFLElBQWEsWUFBWTtJQUt2QixzQkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFHaEMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUNyQyxVQUFTLE9BQU87WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FDRixDQUFBO1FBRUQsUUFBUSxDQUFDLElBQUksQ0FBQztZQUVaLE9BQU8sRUFBRSxLQUFLO1lBRWQsMkJBQTJCLEVBQUUsVUFBVSxLQUFLO2dCQUUxQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBRWpFLENBQUM7WUFDRCx5QkFBeUIsRUFBRSxVQUFVLE9BQU87Z0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0RCxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDM0IsRUFBRSxFQUFFLENBQUM7d0JBQ0wsS0FBSyxFQUFFLFdBQVc7d0JBQ2xCLElBQUksRUFBRSxxQ0FBcUM7d0JBQzNDLHVCQUF1Qjt3QkFDdkIsS0FBSyxFQUFFLENBQUM7d0JBQ1IsZ0dBQWdHO3dCQUNoRyxzRUFBc0U7d0JBQ3RFLGlFQUFpRTt3QkFDakUsMkJBQTJCO3dCQUMzQixxQkFBcUI7d0JBQ3JCLHFIQUFxSDt3QkFDckgsRUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7cUJBQ3pFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDSjtvQkFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQ3hDLENBQUMsRUFDRCxVQUFTLEtBQUs7b0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDNUMsQ0FBQyxDQUNKLENBQUE7WUFFSCxDQUFDO1NBRUYsQ0FBQyxDQUFDLElBQUksQ0FDTCxVQUFDLFFBQVE7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDcEMsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUNGLENBQUM7UUFDTixvQkFBb0I7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyw2QkFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXJDLHFEQUFxRDtRQUNyRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQ2xCLENBQUM7WUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDRCxJQUFJLENBQ0osQ0FBQztZQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUdILENBQUM7SUFNSCxtQkFBQztBQUFELENBQUMsQUEvRUQsSUErRUM7QUEvRVksWUFBWTtJQUp4QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLE1BQU07UUFDaEIsUUFBUSxFQUFFLDJDQUEyQztLQUN0RCxDQUFDO3FDQU00QixlQUFNO0dBTHZCLFlBQVksQ0ErRXhCO0FBL0VZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gICAgZ2V0Qm9vbGVhbixcbiAgICBzZXRCb29sZWFuLFxuICAgIGdldE51bWJlcixcbiAgICBzZXROdW1iZXIsXG4gICAgZ2V0U3RyaW5nLFxuICAgIHNldFN0cmluZyxcbiAgICBoYXNLZXksXG4gICAgcmVtb3ZlLFxuICAgIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgKiBhcyBMb2NhbE5vdGlmaWNhdGlvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhbC1ub3RpZmljYXRpb25zXCI7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibWFpblwiLFxuICB0ZW1wbGF0ZTogXCI8cGFnZS1yb3V0ZXItb3V0bGV0PjwvcGFnZS1yb3V0ZXItb3V0bGV0PlwiXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cbiBwdWJsaWMgbm9Cb29sS2V5OiBib29sZWFuO1xuIFxuIFxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKXtcblxuICAgXG4gICAgTG9jYWxOb3RpZmljYXRpb25zLmhhc1Blcm1pc3Npb24oKS50aGVuKFxuICAgICAgZnVuY3Rpb24oZ3JhbnRlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBlcm1pc3Npb24gZ3JhbnRlZD8gXCIgKyBncmFudGVkKTtcbiAgICAgIH1cbiAgICApXG5cbiAgICBmaXJlYmFzZS5pbml0KHtcbiAgICAgIFxuICAgICAgcGVyc2lzdDogZmFsc2UsXG4gICAgICBcbiAgICAgIG9uUHVzaFRva2VuUmVjZWl2ZWRDYWxsYmFjazogZnVuY3Rpb24gKHRva2VuKSBcbiAgICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJGaXJlYmFzZSBwbHVnaW4gcmVjZWl2ZWQgYSBwdXNoIHRva2VuOiBcIiArIHRva2VuKTtcbiAgICAgICAgXG4gICAgICB9LFxuICAgICAgb25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjazogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0gbWVzc2FnZSByZWNlaXZlZDogXCIgKyBtZXNzYWdlLnRpdGxlKTsgIFxuICAgICAgICBMb2NhbE5vdGlmaWNhdGlvbnMuc2NoZWR1bGUoW3tcbiAgICAgICAgICBpZDogMSxcbiAgICAgICAgICB0aXRsZTogJ1RoZSB0aXRsZScsXG4gICAgICAgICAgYm9keTogJ1JlY3VycyBldmVyeSBtaW51dGUgdW50aWwgY2FuY2VsbGVkJyxcbiAgICAgICAgICAvL3RpY2tlcjogJ1RoZSB0aWNrZXInLFxuICAgICAgICAgIGJhZGdlOiAxLFxuICAgICAgICAgIC8vZ3JvdXBlZE1lc3NhZ2VzOltcIlRoZSBmaXJzdFwiLCBcIlNlY29uZFwiLCBcIktlZXAgZ29pbmdcIiwgXCJvbmUgbW9yZS4uXCIsIFwiT0sgU3RvcFwiXSwgLy9hbmRyb2lkIG9ubHlcbiAgICAgICAgICAvL2dyb3VwU3VtbWFyeTpcIlN1bW1hcnkgb2YgdGhlIGdyb3VwZWQgbWVzc2FnZXMgYWJvdmVcIiwgLy9hbmRyb2lkIG9ubHlcbiAgICAgICAgICAvL29uZ29pbmc6IHRydWUsIC8vIG1ha2VzIHRoZSBub3RpZmljYXRpb24gb25nb2luZyAoQW5kcm9pZCBvbmx5KVxuICAgICAgICAgIC8vc21hbGxJY29uOiAncmVzOi8vaGVhcnQnLFxuICAgICAgICAgIC8vaW50ZXJ2YWw6ICdtaW51dGUnLFxuICAgICAgICAgIC8vc291bmQ6IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKS5pb3MgPyBcImN1c3RvbXNvdW5kLWlvcy53YXZcIiA6IFwiY3VzdG9tc291bmQtYW5kcm9pZFwiLCAvLyBjYW4gYmUgYWxzbyBgbnVsbGAsIFwiZGVmYXVsdFwiXG4gICAgICAgICAgYXQ6IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDAuNSAqIDEwMDApKSAvLyAxMCBzZWNvbmRzIGZyb20gbm93XG4gICAgICAgIH1dKS50aGVuKFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uIHNjaGVkdWxlZFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNjaGVkdWxpbmcgZXJyb3I6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApXG5cbiAgICAgIH1cbiAgICAgIFxuICAgIH0pLnRoZW4oXG4gICAgICAoaW5zdGFuY2UpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmaXJlYmFzZS5pbml0IGRvbmVcIik7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmlyZWJhc2UuaW5pdCBlcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbi8vZmlyZWJhc2UubG9nb3V0KCk7XG4gICAgdGhpcy5ub0Jvb2xLZXkgPSBoYXNLZXkoXCJub0Jvb2xLZXlcIik7XG5cbiAgICAvL2NvbnNvbGUubG9nKFwiQm9vbCB2YWwtLS1cIitnZXRCb29sZWFuKFwibm9Cb29sS2V5XCIpKTtcbiAgICBpZih0aGlzLm5vQm9vbEtleSlcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZyhcIkFscmVkYXkgcmVnaXN0ZXJlZCAtLS0tXCIpO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL21haW5mcmFnbWVudFwiXSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZyhcIkZpcnN0IFRpbWUtLS0tLS0tLVwiKTtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9yZWdpc3RyYXRpb25cIl0pO1xuICAgIH1cblxuICBcbiAgfVxuICBcbiAgXG4gICAgXG4gIFxuXG59Il19