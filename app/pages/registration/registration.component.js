"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var user_1 = require("../../service/user");
var authentication_1 = require("../../service/authentication");
var page_1 = require("ui/page");
var RegistrationComponent = (function () {
    function RegistrationComponent(router, page) {
        this.router = router;
        this.page = page;
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
        var deviceToken = application_settings_1.getString("deviceToken");
        console.log("fNmae-//////----" + fName);
        console.log("lName-//////----" + lName);
        console.log("eMail-//////----" + eMail);
        console.log("password--/////--" + password);
        console.log("phone number-//////--" + phoneNumber);
        console.log("deviceToken-//////--" + deviceToken);
        if (fName == null || lName == null || eMail == null || password == null || phoneNumber == null) {
            console.log("Validation fail");
        }
        else {
            console.log("Validation pass");
            var layout = this.page;
            var fNameView = layout.getViewById("fName");
            var lNameView = layout.getViewById("lName");
            var eMailView = layout.getViewById("eMail");
            var passwordView = layout.getViewById("Password");
            var contactNumber = layout.getViewById("contactNumber");
            if (fNameView.ios || lNameView.ios || eMailView.ios || passwordView.ios || contactNumber.ios) {
                fNameView.ios.endEditing(true);
                lNameView.ios.endEditing(true);
                eMailView.ios.endEditing(true);
                passwordView.ios.endEditing(true);
                contactNumber.ios.endEditing(true);
            }
            else if (fNameView.android || lNameView.android || eMailView.android || passwordView.android || contactNumber.android) {
                fNameView.android.clearFocus();
                lNameView.android.clearFocus();
                eMailView.android.clearFocus();
                passwordView.android.clearFocus();
                contactNumber.android.clearFocus();
            }
            this.authentication.userAuth(fName, lName, eMail, password, phoneNumber).then(function (res) {
                console.log("Authentication Success---" + res);
                //on authentication success save the device details in the database
                _this.authentication.saveDeviceDetails(fName, lName, eMail, password, phoneNumber, deviceToken).then(function (res) {
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
        }
    };
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "pages/registration/registration.html",
        styleUrls: ["pages/registration/registration-common.css", "pages/registration/registration.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page])
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2lzdHJhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQVU4QjtBQUU5QiwyQ0FBMEM7QUFDMUMsK0RBQThEO0FBQzlELGdDQUErQjtBQU8vQixJQUFhLHFCQUFxQjtJQUsvQiwrQkFBbUIsTUFBYyxFQUFTLElBQVU7UUFBakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUUsSUFBSSwrQkFBYyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUdILHdDQUFRLEdBQVI7UUFBQSxpQkFnRkM7UUE3RUQsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFMUIsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxXQUFXLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdEMsSUFBSSxXQUFXLEdBQUMsZ0NBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV4QyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2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bnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vc2VydmljZS91c2VyXCI7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2F1dGhlbnRpY2F0aW9uXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBSZWdpc3RyYXRpb25Db21wb25lbnQge1xuICAgcHVibGljIG5vQm9vbEtleTogYm9vbGVhbjtcbiAgIHVzZXI6VXNlclxuICAgYXV0aGVudGljYXRpb246QXV0aGVudGljYXRpb25cbiAgIFxuICAgY29uc3RydWN0b3IocHVibGljIHJvdXRlcjogUm91dGVyLHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xuICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uPSBuZXcgQXV0aGVudGljYXRpb24oKTtcbiAgICB9XG4gIFxuICBcbiAgcmVnaXN0ZXIoKVxuICB7XG4gICAgXG4gIHZhciBmTmFtZT10aGlzLnVzZXIuZk5hbWU7XG4gIHZhciBsTmFtZT10aGlzLnVzZXIubE5hbWU7XG4gIHZhciBlTWFpbD10aGlzLnVzZXIuZU1haWw7XG5cbiAgdmFyIHBhc3N3b3JkPXRoaXMudXNlci5wYXNzd29yZDtcbiAgdmFyIHBob25lTnVtYmVyPXRoaXMudXNlci5waG9uZU51bWJlcjtcbiAgdmFyIGRldmljZVRva2VuPWdldFN0cmluZyhcImRldmljZVRva2VuXCIpO1xuICBcbiAgIGNvbnNvbGUubG9nKFwiZk5tYWUtLy8vLy8vLS0tLVwiK2ZOYW1lKTtcbiAgIGNvbnNvbGUubG9nKFwibE5hbWUtLy8vLy8vLS0tLVwiK2xOYW1lKTtcbiAgIGNvbnNvbGUubG9nKFwiZU1haWwtLy8vLy8vLS0tLVwiK2VNYWlsKTtcbiAgY29uc29sZS5sb2coXCJwYXNzd29yZC0tLy8vLy8tLVwiK3Bhc3N3b3JkKTtcbiAgY29uc29sZS5sb2coXCJwaG9uZSBudW1iZXItLy8vLy8vLS1cIitwaG9uZU51bWJlcik7XG4gIGNvbnNvbGUubG9nKFwiZGV2aWNlVG9rZW4tLy8vLy8vLS1cIitkZXZpY2VUb2tlbik7XG5cbiAgaWYoZk5hbWU9PW51bGwgfHwgbE5hbWU9PW51bGwgfHwgZU1haWw9PW51bGwgfHwgcGFzc3dvcmQgPT0gbnVsbCB8fCBwaG9uZU51bWJlciA9PW51bGwpe1xuXG4gICAgY29uc29sZS5sb2coXCJWYWxpZGF0aW9uIGZhaWxcIik7XG5cbiAgfVxuICBlbHNlXG4gIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYWxpZGF0aW9uIHBhc3NcIik7XG4gICAgICAgIHZhciBsYXlvdXQgPSB0aGlzLnBhZ2U7XG4gICAgICAgIHZhciBmTmFtZVZpZXcgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJmTmFtZVwiKTtcbiAgICAgICAgdmFyIGxOYW1lVmlldyA9IGxheW91dC5nZXRWaWV3QnlJZChcImxOYW1lXCIpO1xuICAgICAgICB2YXIgZU1haWxWaWV3ID0gbGF5b3V0LmdldFZpZXdCeUlkKFwiZU1haWxcIik7XG4gICAgICAgIHZhciBwYXNzd29yZFZpZXcgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJQYXNzd29yZFwiKTtcbiAgICAgICAgdmFyIGNvbnRhY3ROdW1iZXIgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJjb250YWN0TnVtYmVyXCIpO1xuICAgIFxuXG4gICAgICAgIGlmIChmTmFtZVZpZXcuaW9zIHx8IGxOYW1lVmlldy5pb3MgfHwgZU1haWxWaWV3LmlvcyB8fCBwYXNzd29yZFZpZXcuaW9zIHx8IGNvbnRhY3ROdW1iZXIuaW9zKVxuICAgICAgICB7XG4gICAgICAgICAgICBmTmFtZVZpZXcuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgICAgICBsTmFtZVZpZXcuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgICAgICBlTWFpbFZpZXcuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgICAgICBwYXNzd29yZFZpZXcuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgICAgICBjb250YWN0TnVtYmVyLmlvcy5lbmRFZGl0aW5nKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgICBlbHNlIGlmIChmTmFtZVZpZXcuYW5kcm9pZCB8fCBsTmFtZVZpZXcuYW5kcm9pZCB8fCBlTWFpbFZpZXcuYW5kcm9pZCB8fCBwYXNzd29yZFZpZXcuYW5kcm9pZCB8fCBjb250YWN0TnVtYmVyLmFuZHJvaWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZOYW1lVmlldy5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgICAgIGxOYW1lVmlldy5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgICAgIGVNYWlsVmlldy5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgICAgIHBhc3N3b3JkVmlldy5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgICAgIGNvbnRhY3ROdW1iZXIuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgdGhpcy5hdXRoZW50aWNhdGlvbi51c2VyQXV0aChmTmFtZSxsTmFtZSxlTWFpbCxwYXNzd29yZCxwaG9uZU51bWJlcikudGhlbihcbiAgICAgIChyZXMpPT5cbiAgICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBdXRoZW50aWNhdGlvbiBTdWNjZXNzLS0tXCIrcmVzKTtcblxuICAgICAgICAvL29uIGF1dGhlbnRpY2F0aW9uIHN1Y2Nlc3Mgc2F2ZSB0aGUgZGV2aWNlIGRldGFpbHMgaW4gdGhlIGRhdGFiYXNlXG4gICAgICAgIHRoaXMuYXV0aGVudGljYXRpb24uc2F2ZURldmljZURldGFpbHMoZk5hbWUsbE5hbWUsZU1haWwscGFzc3dvcmQscGhvbmVOdW1iZXIsZGV2aWNlVG9rZW4pLnRoZW4oXG4gICAgICAgIChyZXMpPT5cbiAgICAgICAge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIGRldGFpbHMgc2F2ZWQgaW4gREItLS1cIityZXMpO1xuXG4gICAgICAgICAgLy9zdG9yZSB0aGUgc2Vzc2lvbiBmb3IgdGhlIHJlZ2lzdHJhdGlvblxuICAgICAgICAgIHNldEJvb2xlYW4oXCJub0Jvb2xLZXlcIiwgdHJ1ZSk7XG4gICAgICAgICAgc2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIixwaG9uZU51bWJlcik7XG5cbiAgICAgICAgICBzZXRTdHJpbmcoXCJkZXZpY2VSZWdpc3RlcmVkVXNlck5hbWVcIixmTmFtZS5jaGFyQXQoMCkrbE5hbWUuY2hhckF0KDApKTtcbiAgICAgICAgICB0aGlzLm5vQm9vbEtleSA9IGhhc0tleShcIm5vQm9vbEtleVwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkJvb2wgS2V5LS0tXCIrdGhpcy5ub0Jvb2xLZXkpO1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9tYWluZnJhZ21lbnRcIl0pO1xuICAgICAgICB9LFxuICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBzYXZpbmcgZGV2aWNlIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICB9KTsgXG4gICAgICB9LCBcbiAgICAgIChyZXMpPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkF1dGhlbnRpY2F0aW9uIEZhaWx1cmUtLS1cIityZXMpO1xuICAgICAgfSk7XG4gIFxuICB9XG4gIH1cbiAgXG59XG4iXX0=