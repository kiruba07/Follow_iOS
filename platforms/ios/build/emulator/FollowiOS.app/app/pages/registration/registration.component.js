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
        //set db
        firebase.push('/gfsfg', { 'username': uName }).then(function (result) {
            console.log("created key: " + result.key);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2lzdHJhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBWXpDLHVEQUEwRDtBQUMxRCwyQ0FBMEM7QUFPMUMsSUFBYSxxQkFBcUI7SUFJL0IsK0JBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUYsd0NBQVEsR0FBUjtRQUVBLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRCxJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLFdBQVcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUVyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBQyxXQUFXLENBQUMsQ0FBQztRQUVuRCx1QkFBdUI7UUFDckIsOEJBQThCO1FBQzVCLDhCQUE4QjtRQUNoQyxVQUFVO1FBQ1IsdUJBQXVCO1FBQ3JCLGlDQUFpQztRQUNqQyxJQUFJO1FBQ0osMkJBQTJCO1FBQ3pCLCtCQUErQjtRQUNqQyxHQUFHO1FBQ1AsSUFBSTtRQUVKLFFBQVE7UUFDRixRQUFRLENBQUMsSUFBSSxDQUNQLFFBQVEsRUFDUixFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsQ0FDdkIsQ0FBQyxJQUFJLENBQUMsVUFBUyxNQUFNO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztRQUVQLGdDQUFnQztRQUM3Qix3Q0FBd0M7UUFDdkMsMkNBQTJDO1FBRTNDLDBDQUEwQztJQUNoRCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBaERELElBZ0RDO0FBaERZLHFCQUFxQjtJQUxqQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxxQ0FBcUMsQ0FBQztLQUNqRyxDQUFDO3FDQUs2QixlQUFNO0dBSnhCLHFCQUFxQixDQWdEakM7QUFoRFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gICAgZ2V0Qm9vbGVhbixcbiAgICBzZXRCb29sZWFuLFxuICAgIGdldE51bWJlcixcbiAgICBzZXROdW1iZXIsXG4gICAgZ2V0U3RyaW5nLFxuICAgIHNldFN0cmluZyxcbiAgICBoYXNLZXksXG4gICAgcmVtb3ZlLFxuICAgIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvdXNlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24tY29tbW9uLmNzc1wiLCBcInBhZ2VzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFJlZ2lzdHJhdGlvbkNvbXBvbmVudCB7XG4gIC8vIHB1YmxpYyBub0Jvb2xLZXk6IGJvb2xlYW47XG4gICBcbiAgIHVzZXI6VXNlclxuICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICB9XG4gIFxuICByZWdpc3Rlcigpe1xuICBcbiAgY29uc29sZS5sb2coXCJ0YXBwZWRcIik7XG4gIGNvbnNvbGUubG9nKFwiVXNlci0tLS0tXCIrdGhpcy51c2VyLnVzZXJOYW1lKTtcbiAgY29uc29sZS5sb2coXCJwYXNzd29yZC0tLS1cIit0aGlzLnVzZXIucGFzc3dvcmQpO1xuICBjb25zb2xlLmxvZyhcInBob25lIG51bWJlci0tLVwiK3RoaXMudXNlci5waG9uZU51bWJlcik7XG4gIHZhciB1TmFtZT10aGlzLnVzZXIudXNlck5hbWU7XG4gIHZhciBwYXNzd29yZD10aGlzLnVzZXIucGFzc3dvcmQ7XG4gIHZhciBwaG9uZU51bWJlcj10aGlzLnVzZXIucGhvbmVOdW1iZXI7XG4gIFxuICAgY29uc29sZS5sb2coXCJVc2VyLS8vLy8vLy0tLS1cIit1TmFtZSk7XG4gIGNvbnNvbGUubG9nKFwicGFzc3dvcmQtLS8vLy8vLS1cIitwYXNzd29yZCk7XG4gIGNvbnNvbGUubG9nKFwicGhvbmUgbnVtYmVyLS8vLy8vLy0tXCIrcGhvbmVOdW1iZXIpO1xuICBcbi8vZmlyZWJhc2UuY3JlYXRlVXNlcih7XG4gIC8vICBlbWFpbDogdGhpcy51c2VyLnVzZXJOYW1lLFxuICAgIC8vcGFzc3dvcmQ6IHRoaXMudXNlci5wYXNzd29yZFxuICAvL30pLnRoZW4oXG4gICAgLy8gIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIC8vICBjb25zb2xlLmxvZyhcIkxvZ2luIHN1Y2Nlc3NcIik7XG4gICAgICAvL30sXG4gICAgICAvL2Z1bmN0aW9uIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkxvZ2luIGZhaWxydWVcIik7XG4gICAgICAvL31cbiAgLy8pO1xuICBcbiAgLy9zZXQgZGJcbiAgICAgICAgZmlyZWJhc2UucHVzaChcbiAgICAgICAgICAgICAgJy9nZnNmZycsXG4gICAgICAgICAgICAgIHsndXNlcm5hbWUnOnVOYW1lfVxuICAgICAgICApLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0LmtleSk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgIC8vc2V0Qm9vbGVhbihcIm5vQm9vbEtleVwiLCB0cnVlKTtcbiAgICAgICAvLyB0aGlzLm5vQm9vbEtleSA9IGhhc0tleShcIm5vQm9vbEtleVwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkJvb2wgS2V5LS0tXCJ0aGlzLm5vQm9vbEtleSk7XG4gICAgICAgIFxuICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9tYWluZnJhZ21lbnRcIl0pO1xuICB9XG59XG4iXX0=