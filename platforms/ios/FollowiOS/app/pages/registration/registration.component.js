"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var user_1 = require("../../service/user");
var authentication_1 = require("../../service/authentication");
var RegistrationComponent = (function () {
    function RegistrationComponent(router) {
        this.router = router;
        this.user = new user_1.User();
        this.authentication = new authentication_1.Authentication();
    }
    RegistrationComponent.prototype.register = function () {
        var _this = this;
        var fName = this.user.fName;
        var lName = this.user.lName;
        var eMail = this.user.eMail;
        var password = this.user.password;
        var phoneNumber = this.user.phoneNumber;
        console.log("fNmae-//////----" + fName);
        console.log("lName-//////----" + lName);
        console.log("eMail-//////----" + eMail);
        console.log("password--/////--" + password);
        console.log("phone number-//////--" + phoneNumber);
        this.authentication.userAuth(fName, lName, eMail, password, phoneNumber).then(function (res) {
            console.log("Authentication Success---" + res);
            //on authentication success save the device details in the database
            _this.authentication.saveDeviceDetails(fName, lName, eMail, password, phoneNumber).then(function (res) {
                console.log("Device details saved in DB---" + res);
                //store the session for the registration
                application_settings_1.setBoolean("noBoolKey", true);
                application_settings_1.setString("devicePhoneNumber", phoneNumber);
                application_settings_1.setString("deviceRegisteredUserName", fName.charAt(0) + lName.charAt(0));
                _this.noBoolKey = application_settings_1.hasKey("noBoolKey");
                console.log("Bool Key---" + _this.noBoolKey);
                _this.router.navigate(["/mainfragment"]);
            }, function (res) {
                console.log("Error in saving device details---" + res);
            });
        }, function (res) {
            console.log("Authentication Failure---" + res);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2lzdHJhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQVU4QjtBQUU5QiwyQ0FBMEM7QUFDMUMsK0RBQThEO0FBTzlELElBQWEscUJBQXFCO0lBSy9CLCtCQUFtQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRSxJQUFJLCtCQUFjLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBR0gsd0NBQVEsR0FBUjtRQUFBLGlCQTJDQztRQXpDRCxJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUUxQixJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLFdBQVcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUVyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUMsV0FBVyxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDekUsVUFBQyxHQUFHO1lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsR0FBQyxHQUFHLENBQUMsQ0FBQztZQUU3QyxtRUFBbUU7WUFDbkUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUNsRixVQUFDLEdBQUc7Z0JBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFakQsd0NBQXdDO2dCQUN4QyxpQ0FBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDOUIsZ0NBQVMsQ0FBQyxtQkFBbUIsRUFBQyxXQUFXLENBQUMsQ0FBQztnQkFFM0MsZ0NBQVMsQ0FBQywwQkFBMEIsRUFBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsS0FBSSxDQUFDLFNBQVMsR0FBRyw2QkFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMxQyxDQUFDLEVBQ0QsVUFBQyxHQUFHO2dCQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEdBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQ0QsVUFBQyxHQUFHO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsR0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUVILENBQUM7SUFFSCw0QkFBQztBQUFELENBQUMsQUF4REQsSUF3REM7QUF4RFkscUJBQXFCO0lBTGpDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLHFDQUFxQyxDQUFDO0tBQ2pHLENBQUM7cUNBTTRCLGVBQU07R0FMdkIscUJBQXFCLENBd0RqQztBQXhEWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vc2VydmljZS91c2VyXCI7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2F1dGhlbnRpY2F0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi1jb21tb24uY3NzXCIsIFwicGFnZXMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgUmVnaXN0cmF0aW9uQ29tcG9uZW50IHtcbiAgIHB1YmxpYyBub0Jvb2xLZXk6IGJvb2xlYW47XG4gICB1c2VyOlVzZXJcbiAgIGF1dGhlbnRpY2F0aW9uOkF1dGhlbnRpY2F0aW9uXG4gICBcbiAgIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZXI6IFJvdXRlcikge1xuICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xuICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uPSBuZXcgQXV0aGVudGljYXRpb24oKTtcbiAgICB9XG4gIFxuICBcbiAgcmVnaXN0ZXIoKVxuICB7XG4gIHZhciBmTmFtZT10aGlzLnVzZXIuZk5hbWU7XG4gIHZhciBsTmFtZT10aGlzLnVzZXIubE5hbWU7XG4gIHZhciBlTWFpbD10aGlzLnVzZXIuZU1haWw7XG5cbiAgdmFyIHBhc3N3b3JkPXRoaXMudXNlci5wYXNzd29yZDtcbiAgdmFyIHBob25lTnVtYmVyPXRoaXMudXNlci5waG9uZU51bWJlcjtcbiAgXG4gICBjb25zb2xlLmxvZyhcImZObWFlLS8vLy8vLy0tLS1cIitmTmFtZSk7XG4gICBjb25zb2xlLmxvZyhcImxOYW1lLS8vLy8vLy0tLS1cIitsTmFtZSk7XG4gICBjb25zb2xlLmxvZyhcImVNYWlsLS8vLy8vLy0tLS1cIitlTWFpbCk7XG4gICAgY29uc29sZS5sb2coXCJwYXNzd29yZC0tLy8vLy8tLVwiK3Bhc3N3b3JkKTtcbiAgY29uc29sZS5sb2coXCJwaG9uZSBudW1iZXItLy8vLy8vLS1cIitwaG9uZU51bWJlcik7XG5cbiAgdGhpcy5hdXRoZW50aWNhdGlvbi51c2VyQXV0aChmTmFtZSxsTmFtZSxlTWFpbCxwYXNzd29yZCxwaG9uZU51bWJlcikudGhlbihcbiAgKHJlcyk9PlxuICB7XG4gICAgY29uc29sZS5sb2coXCJBdXRoZW50aWNhdGlvbiBTdWNjZXNzLS0tXCIrcmVzKTtcblxuICAgIC8vb24gYXV0aGVudGljYXRpb24gc3VjY2VzcyBzYXZlIHRoZSBkZXZpY2UgZGV0YWlscyBpbiB0aGUgZGF0YWJhc2VcbiAgICB0aGlzLmF1dGhlbnRpY2F0aW9uLnNhdmVEZXZpY2VEZXRhaWxzKGZOYW1lLGxOYW1lLGVNYWlsLHBhc3N3b3JkLHBob25lTnVtYmVyKS50aGVuKFxuICAgIChyZXMpPT5cbiAgICB7XG4gICAgICBjb25zb2xlLmxvZyhcIkRldmljZSBkZXRhaWxzIHNhdmVkIGluIERCLS0tXCIrcmVzKTtcblxuICAgICAgLy9zdG9yZSB0aGUgc2Vzc2lvbiBmb3IgdGhlIHJlZ2lzdHJhdGlvblxuICAgICAgc2V0Qm9vbGVhbihcIm5vQm9vbEtleVwiLCB0cnVlKTtcbiAgICAgIHNldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIscGhvbmVOdW1iZXIpO1xuXG4gICAgICBzZXRTdHJpbmcoXCJkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcIixmTmFtZS5jaGFyQXQoMCkrbE5hbWUuY2hhckF0KDApKTtcbiAgICAgIHRoaXMubm9Cb29sS2V5ID0gaGFzS2V5KFwibm9Cb29sS2V5XCIpO1xuICAgICAgY29uc29sZS5sb2coXCJCb29sIEtleS0tLVwiK3RoaXMubm9Cb29sS2V5KTtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9tYWluZnJhZ21lbnRcIl0pO1xuICAgIH0sXG4gICAgKHJlcyk9PntcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gc2F2aW5nIGRldmljZSBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICB9KTsgXG4gIH0sIFxuICAocmVzKT0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkF1dGhlbnRpY2F0aW9uIEZhaWx1cmUtLS1cIityZXMpO1xuICB9KTtcbiAgXG4gIH1cbiAgXG59XG4iXX0=