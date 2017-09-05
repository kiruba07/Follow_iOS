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
                var tokenString = token.toString();
                console.log("Firebase plugin received a push token: " + tokenString);
                application_settings_1.setString("deviceToken", tokenString);
            },
            onMessageReceivedCallback: function (message) {
                if (message.foreground) {
                    console.log("App is in foreground");
                }
                else {
                    console.log("App is in background");
                    console.log("--- Message Title: " + message.title);
                    console.log("--- Message Body: " + message.body);
                    LocalNotifications.schedule([{
                            id: 1,
                            title: message.title,
                            body: message.body,
                            //ticker: 'The ticker',
                            //  badge: 1,
                            //groupedMessages:["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
                            //groupSummary:"Summary of the grouped messages above", //android only
                            //ongoing: true, // makes the notification ongoing (Android only)
                            //smallIcon: 'res://heart',
                            //interval: 'minute',
                            //sound: require("application").ios ? "customsound-ios.wav" : "customsound-android", // can be also `null`, "default"
                            at: new Date(new Date().getTime() + (0.001 * 1000)) // 10 seconds from now
                        }]).then(function () {
                        console.log("Notification scheduled");
                    }, function (error) {
                        console.log("scheduling error: " + error);
                    });
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQVU4QjtBQUM5Qix1REFBMEQ7QUFDMUQscUVBQXVFO0FBUXZFLElBQWEsWUFBWTtJQUt2QixzQkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFHaEMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUNyQyxVQUFTLE9BQU87WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FDRixDQUFBO1FBRUQsUUFBUSxDQUFDLElBQUksQ0FBQztZQUVaLE9BQU8sRUFBRSxLQUFLO1lBRWQsMkJBQTJCLEVBQUUsVUFBVSxLQUFLO2dCQUcxQyxJQUFJLFdBQVcsR0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEdBQUcsV0FBVyxDQUFDLENBQUM7Z0JBQ3JFLGdDQUFTLENBQUMsYUFBYSxFQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXZDLENBQUM7WUFDRCx5QkFBeUIsRUFBRSxVQUFVLE9BQU87Z0JBRTFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQ0QsSUFBSSxDQUFBLENBQUM7b0JBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUV0QyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2pELGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUMzQixFQUFFLEVBQUUsQ0FBQzs0QkFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7NEJBQ3BCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTs0QkFDbEIsdUJBQXVCOzRCQUN6QixhQUFhOzRCQUNYLGdHQUFnRzs0QkFDaEcsc0VBQXNFOzRCQUN0RSxpRUFBaUU7NEJBQ2pFLDJCQUEyQjs0QkFDM0IscUJBQXFCOzRCQUNyQixxSEFBcUg7NEJBQ3JILEVBQUUsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsc0JBQXNCO3lCQUMzRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0o7d0JBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO29CQUN4QyxDQUFDLEVBQ0QsVUFBUyxLQUFLO3dCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBQzVDLENBQUMsQ0FDSixDQUFBO2dCQUNILENBQUM7WUFDTCxDQUFDO1NBRUYsQ0FBQyxDQUFDLElBQUksQ0FDTCxVQUFDLFFBQVE7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDcEMsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUNGLENBQUM7UUFDTixvQkFBb0I7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyw2QkFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXJDLHFEQUFxRDtRQUNyRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQ2xCLENBQUM7WUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDRCxJQUFJLENBQ0osQ0FBQztZQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUdILENBQUM7SUFNSCxtQkFBQztBQUFELENBQUMsQUExRkQsSUEwRkM7QUExRlksWUFBWTtJQUp4QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLE1BQU07UUFDaEIsUUFBUSxFQUFFLDJDQUEyQztLQUN0RCxDQUFDO3FDQU00QixlQUFNO0dBTHZCLFlBQVksQ0EwRnhCO0FBMUZZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gICAgZ2V0Qm9vbGVhbixcbiAgICBzZXRCb29sZWFuLFxuICAgIGdldE51bWJlcixcbiAgICBzZXROdW1iZXIsXG4gICAgZ2V0U3RyaW5nLFxuICAgIHNldFN0cmluZyxcbiAgICBoYXNLZXksXG4gICAgcmVtb3ZlLFxuICAgIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgKiBhcyBMb2NhbE5vdGlmaWNhdGlvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhbC1ub3RpZmljYXRpb25zXCI7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibWFpblwiLFxuICB0ZW1wbGF0ZTogXCI8cGFnZS1yb3V0ZXItb3V0bGV0PjwvcGFnZS1yb3V0ZXItb3V0bGV0PlwiXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cbiBwdWJsaWMgbm9Cb29sS2V5OiBib29sZWFuO1xuIFxuIFxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKXtcblxuICAgXG4gICAgTG9jYWxOb3RpZmljYXRpb25zLmhhc1Blcm1pc3Npb24oKS50aGVuKFxuICAgICAgZnVuY3Rpb24oZ3JhbnRlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBlcm1pc3Npb24gZ3JhbnRlZD8gXCIgKyBncmFudGVkKTtcbiAgICAgIH1cbiAgICApXG5cbiAgICBmaXJlYmFzZS5pbml0KHtcbiAgICAgIFxuICAgICAgcGVyc2lzdDogZmFsc2UsXG4gICAgICBcbiAgICAgIG9uUHVzaFRva2VuUmVjZWl2ZWRDYWxsYmFjazogZnVuY3Rpb24gKHRva2VuKSBcbiAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIHZhciB0b2tlblN0cmluZz10b2tlbi50b1N0cmluZygpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZpcmViYXNlIHBsdWdpbiByZWNlaXZlZCBhIHB1c2ggdG9rZW46IFwiICsgdG9rZW5TdHJpbmcpO1xuICAgICAgICBzZXRTdHJpbmcoXCJkZXZpY2VUb2tlblwiLHRva2VuU3RyaW5nKTtcbiAgICAgICAgXG4gICAgICB9LFxuICAgICAgb25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjazogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcblxuICAgICAgICBpZiAobWVzc2FnZS5mb3JlZ3JvdW5kKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJBcHAgaXMgaW4gZm9yZWdyb3VuZFwiKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXBwIGlzIGluIGJhY2tncm91bmRcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tIE1lc3NhZ2UgVGl0bGU6IFwiICsgbWVzc2FnZS50aXRsZSk7ICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tIE1lc3NhZ2UgQm9keTogXCIgKyBtZXNzYWdlLmJvZHkpOyAgXG4gICAgICAgICAgICBMb2NhbE5vdGlmaWNhdGlvbnMuc2NoZWR1bGUoW3tcbiAgICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICAgIHRpdGxlOiBtZXNzYWdlLnRpdGxlLFxuICAgICAgICAgICAgICBib2R5OiBtZXNzYWdlLmJvZHksXG4gICAgICAgICAgICAgIC8vdGlja2VyOiAnVGhlIHRpY2tlcicsXG4gICAgICAgICAgICAvLyAgYmFkZ2U6IDEsXG4gICAgICAgICAgICAgIC8vZ3JvdXBlZE1lc3NhZ2VzOltcIlRoZSBmaXJzdFwiLCBcIlNlY29uZFwiLCBcIktlZXAgZ29pbmdcIiwgXCJvbmUgbW9yZS4uXCIsIFwiT0sgU3RvcFwiXSwgLy9hbmRyb2lkIG9ubHlcbiAgICAgICAgICAgICAgLy9ncm91cFN1bW1hcnk6XCJTdW1tYXJ5IG9mIHRoZSBncm91cGVkIG1lc3NhZ2VzIGFib3ZlXCIsIC8vYW5kcm9pZCBvbmx5XG4gICAgICAgICAgICAgIC8vb25nb2luZzogdHJ1ZSwgLy8gbWFrZXMgdGhlIG5vdGlmaWNhdGlvbiBvbmdvaW5nIChBbmRyb2lkIG9ubHkpXG4gICAgICAgICAgICAgIC8vc21hbGxJY29uOiAncmVzOi8vaGVhcnQnLFxuICAgICAgICAgICAgICAvL2ludGVydmFsOiAnbWludXRlJyxcbiAgICAgICAgICAgICAgLy9zb3VuZDogcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpLmlvcyA/IFwiY3VzdG9tc291bmQtaW9zLndhdlwiIDogXCJjdXN0b21zb3VuZC1hbmRyb2lkXCIsIC8vIGNhbiBiZSBhbHNvIGBudWxsYCwgXCJkZWZhdWx0XCJcbiAgICAgICAgICAgICAgYXQ6IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDAuMDAxICogMTAwMCkpIC8vIDEwIHNlY29uZHMgZnJvbSBub3dcbiAgICAgICAgICAgIH1dKS50aGVuKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb24gc2NoZWR1bGVkXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2NoZWR1bGluZyBlcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgIH0pLnRoZW4oXG4gICAgICAoaW5zdGFuY2UpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmaXJlYmFzZS5pbml0IGRvbmVcIik7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmlyZWJhc2UuaW5pdCBlcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbi8vZmlyZWJhc2UubG9nb3V0KCk7XG4gICAgdGhpcy5ub0Jvb2xLZXkgPSBoYXNLZXkoXCJub0Jvb2xLZXlcIik7XG5cbiAgICAvL2NvbnNvbGUubG9nKFwiQm9vbCB2YWwtLS1cIitnZXRCb29sZWFuKFwibm9Cb29sS2V5XCIpKTtcbiAgICBpZih0aGlzLm5vQm9vbEtleSlcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZyhcIkFscmVkYXkgcmVnaXN0ZXJlZCAtLS0tXCIpO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL21haW5mcmFnbWVudFwiXSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZyhcIkZpcnN0IFRpbWUtLS0tLS0tLVwiKTtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9yZWdpc3RyYXRpb25cIl0pO1xuICAgIH1cblxuICBcbiAgfVxuICBcbiAgXG4gICAgXG4gIFxuXG59Il19