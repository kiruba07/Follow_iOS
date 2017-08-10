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
        console.log("fNmae-//////----" + fName);
        console.log("lName-//////----" + lName);
        console.log("eMail-//////----" + eMail);
        console.log("password--/////--" + password);
        console.log("phone number-//////--" + phoneNumber);
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
