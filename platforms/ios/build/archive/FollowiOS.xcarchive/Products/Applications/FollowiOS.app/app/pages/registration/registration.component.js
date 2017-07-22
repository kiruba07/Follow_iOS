"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var firebase = require("nativescript-plugin-firebase");
var user_1 = require("../../service/user");
var RegistrationComponent = (function () {
    function RegistrationComponent(router) {
        this.router = router;
        this.user = new user_1.User();
    }
    RegistrationComponent.prototype.register = function () {
        console.log("tapped");
        console.log("User-----" + this.user.userName);
        console.log("password----" + this.user.password);
        console.log("phone number---" + this.user.phoneNumber);
        var uName = this.user.userName;
        var password = this.user.password;
        var phoneNumber = this.user.phoneNumber;
        console.log("User-//////----" + uName);
        console.log("password--/////--" + password);
        console.log("phone number-//////--" + phoneNumber);
        //firebase.createUser({
        //  email: this.user.userName,
        //password: this.user.password
        //}).then(
        //  function (result) {
        //  console.log("Login success");
        //},
        //function (errorMessage) {
        //console.log("Login failrue");
        //}
        //);
        firebase.setValue('/companies', { foo: 'bar' });
        //set db
        firebase.push('/companies', { username: 'test' }).then(function (result) {
            console.log("created key: " + result.key);
        }, function (errorMessage) {
            console.log("Failure" + errorMessage);
        });
        //setBoolean("noBoolKey", true);
        // this.noBoolKey = hasKey("noBoolKey");
        //console.log("Bool Key---"this.noBoolKey);
        //this.router.navigate(["/mainfragment"]);
    };
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "pages/registration/registration.html",
        styleUrls: ["pages/registration/registration-common.css", "pages/registration/registration.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2lzdHJhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBWXpDLHVEQUEwRDtBQUMxRCwyQ0FBMEM7QUFPMUMsSUFBYSxxQkFBcUI7SUFJL0IsK0JBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztJQUV4QixDQUFDO0lBR0Ysd0NBQVEsR0FBUjtRQUVBLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRCxJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLFdBQVcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUVyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBQyxXQUFXLENBQUMsQ0FBQztRQUVuRCx1QkFBdUI7UUFDckIsOEJBQThCO1FBQzVCLDhCQUE4QjtRQUNoQyxVQUFVO1FBQ1IsdUJBQXVCO1FBQ3JCLGlDQUFpQztRQUNqQyxJQUFJO1FBQ0osMkJBQTJCO1FBQ3pCLCtCQUErQjtRQUNqQyxHQUFHO1FBQ1AsSUFBSTtRQUdILFFBQVEsQ0FBQyxRQUFRLENBQ2QsWUFBWSxFQUNaLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxDQUNkLENBQUM7UUFDRixRQUFRO1FBQ0YsUUFBUSxDQUFDLElBQUksQ0FFUCxZQUFZLEVBQ1osRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQ3RCLENBQUMsSUFBSSxDQUFDLFVBQVMsTUFBTTtZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUNELFVBQVMsWUFBWTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQ0EsQ0FBQztRQUVOLGdDQUFnQztRQUM3Qix3Q0FBd0M7UUFDdkMsMkNBQTJDO1FBRTNDLDBDQUEwQztJQUNoRCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBNURELElBNERDO0FBNURZLHFCQUFxQjtJQUxqQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxxQ0FBcUMsQ0FBQztLQUNqRyxDQUFDO3FDQUs2QixlQUFNO0dBSnhCLHFCQUFxQixDQTREakM7QUE1RFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gICAgZ2V0Qm9vbGVhbixcbiAgICBzZXRCb29sZWFuLFxuICAgIGdldE51bWJlcixcbiAgICBzZXROdW1iZXIsXG4gICAgZ2V0U3RyaW5nLFxuICAgIHNldFN0cmluZyxcbiAgICBoYXNLZXksXG4gICAgcmVtb3ZlLFxuICAgIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvdXNlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24tY29tbW9uLmNzc1wiLCBcInBhZ2VzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFJlZ2lzdHJhdGlvbkNvbXBvbmVudCB7XG4gIC8vIHB1YmxpYyBub0Jvb2xLZXk6IGJvb2xlYW47XG4gICBcbiAgIHVzZXI6VXNlclxuICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgXG4gICB9XG4gIFxuICBcbiAgcmVnaXN0ZXIoKXtcbiAgXG4gIGNvbnNvbGUubG9nKFwidGFwcGVkXCIpO1xuICBjb25zb2xlLmxvZyhcIlVzZXItLS0tLVwiK3RoaXMudXNlci51c2VyTmFtZSk7XG4gIGNvbnNvbGUubG9nKFwicGFzc3dvcmQtLS0tXCIrdGhpcy51c2VyLnBhc3N3b3JkKTtcbiAgY29uc29sZS5sb2coXCJwaG9uZSBudW1iZXItLS1cIit0aGlzLnVzZXIucGhvbmVOdW1iZXIpO1xuICB2YXIgdU5hbWU9dGhpcy51c2VyLnVzZXJOYW1lO1xuICB2YXIgcGFzc3dvcmQ9dGhpcy51c2VyLnBhc3N3b3JkO1xuICB2YXIgcGhvbmVOdW1iZXI9dGhpcy51c2VyLnBob25lTnVtYmVyO1xuICBcbiAgIGNvbnNvbGUubG9nKFwiVXNlci0vLy8vLy8tLS0tXCIrdU5hbWUpO1xuICBjb25zb2xlLmxvZyhcInBhc3N3b3JkLS0vLy8vLy0tXCIrcGFzc3dvcmQpO1xuICBjb25zb2xlLmxvZyhcInBob25lIG51bWJlci0vLy8vLy8tLVwiK3Bob25lTnVtYmVyKTtcbiAgXG4vL2ZpcmViYXNlLmNyZWF0ZVVzZXIoe1xuICAvLyAgZW1haWw6IHRoaXMudXNlci51c2VyTmFtZSxcbiAgICAvL3Bhc3N3b3JkOiB0aGlzLnVzZXIucGFzc3dvcmRcbiAgLy99KS50aGVuKFxuICAgIC8vICBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAvLyAgY29uc29sZS5sb2coXCJMb2dpbiBzdWNjZXNzXCIpO1xuICAgICAgLy99LFxuICAgICAgLy9mdW5jdGlvbiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJMb2dpbiBmYWlscnVlXCIpO1xuICAgICAgLy99XG4gIC8vKTtcblxuICBcbiAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgJy9jb21wYW5pZXMnLFxuICAgICAge2ZvbzonYmFyJ31cbiAgKTtcbiAgLy9zZXQgZGJcbiAgICAgICAgZmlyZWJhc2UucHVzaChcbiAgICAgICAgXG4gICAgICAgICAgICAgICcvY29tcGFuaWVzJyxcbiAgICAgICAgICAgICAge3VzZXJuYW1lOid0ZXN0J31cbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdC5rZXkpO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihlcnJvck1lc3NhZ2Upe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWx1cmVcIitlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgXG4gICAgLy9zZXRCb29sZWFuKFwibm9Cb29sS2V5XCIsIHRydWUpO1xuICAgICAgIC8vIHRoaXMubm9Cb29sS2V5ID0gaGFzS2V5KFwibm9Cb29sS2V5XCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQm9vbCBLZXktLS1cInRoaXMubm9Cb29sS2V5KTtcbiAgICAgICAgXG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL21haW5mcmFnbWVudFwiXSk7XG4gIH1cbn1cbiJdfQ==