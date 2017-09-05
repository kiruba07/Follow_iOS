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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2lzdHJhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQVU4QjtBQUU5QiwyQ0FBMEM7QUFDMUMsK0RBQThEO0FBQzlELGdDQUErQjtBQU8vQixJQUFhLHFCQUFxQjtJQUsvQiwrQkFBbUIsTUFBYyxFQUFTLElBQVU7UUFBakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUUsSUFBSSwrQkFBYyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUdILHdDQUFRLEdBQVI7UUFBQSxpQkE2RUM7UUEzRUQsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFMUIsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxXQUFXLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBQyxRQUFRLENBQUMsQ0FB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UyxDQUFDLG1CQUFtQixFQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUUzQyxnQ0FBUyxDQUFDLDBCQUEwQixFQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxLQUFJLENBQUMsU0FBUyxHQUFHLDZCQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDMUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDLEVBQ0QsVUFBQyxHQUFHO29CQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEdBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pELENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxFQUNELFVBQUMsR0FBRztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixHQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQztJQUNELENBQUM7SUFFSCw0QkFBQztBQUFELENBQUMsQUExRkQsSUEwRkM7QUExRlkscUJBQXFCO0lBTGpDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLHFDQUFxQyxDQUFDO0tBQ2pHLENBQUM7cUNBTTRCLGVBQU0sRUFBZSxXQUFJO0dBTDFDLHFCQUFxQixDQTBGakM7QUExRlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gICAgZ2V0Qm9vbGVhbixcbiAgICBzZXRCb29sZWFuLFxuICAgIGdldE51bWJlcixcbiAgICBzZXROdW1iZXIsXG4gICAgZ2V0U3RyaW5nLFxuICAgIHNldFN0cmluZyxcbiAgICBoYXNLZXksXG4gICAgcmVtb3ZlLFxuICAgIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvdXNlclwiO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tIFwiLi4vLi4vc2VydmljZS9hdXRoZW50aWNhdGlvblwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi1jb21tb24uY3NzXCIsIFwicGFnZXMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgUmVnaXN0cmF0aW9uQ29tcG9uZW50IHtcbiAgIHB1YmxpYyBub0Jvb2xLZXk6IGJvb2xlYW47XG4gICB1c2VyOlVzZXJcbiAgIGF1dGhlbnRpY2F0aW9uOkF1dGhlbnRpY2F0aW9uXG4gICBcbiAgIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZXI6IFJvdXRlcixwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgICAgdGhpcy5hdXRoZW50aWNhdGlvbj0gbmV3IEF1dGhlbnRpY2F0aW9uKCk7XG4gICAgfVxuICBcbiAgXG4gIHJlZ2lzdGVyKClcbiAge1xuICB2YXIgZk5hbWU9dGhpcy51c2VyLmZOYW1lO1xuICB2YXIgbE5hbWU9dGhpcy51c2VyLmxOYW1lO1xuICB2YXIgZU1haWw9dGhpcy51c2VyLmVNYWlsO1xuXG4gIHZhciBwYXNzd29yZD10aGlzLnVzZXIucGFzc3dvcmQ7XG4gIHZhciBwaG9uZU51bWJlcj10aGlzLnVzZXIucGhvbmVOdW1iZXI7XG4gIFxuICAgY29uc29sZS5sb2coXCJmTm1hZS0vLy8vLy8tLS0tXCIrZk5hbWUpO1xuICAgY29uc29sZS5sb2coXCJsTmFtZS0vLy8vLy8tLS0tXCIrbE5hbWUpO1xuICAgY29uc29sZS5sb2coXCJlTWFpbC0vLy8vLy8tLS0tXCIrZU1haWwpO1xuICBjb25zb2xlLmxvZyhcInBhc3N3b3JkLS0vLy8vLy0tXCIrcGFzc3dvcmQpO1xuICBjb25zb2xlLmxvZyhcInBob25lIG51bWJlci0vLy8vLy8tLVwiK3Bob25lTnVtYmVyKTtcblxuICBpZihmTmFtZT09bnVsbCB8fCBsTmFtZT09bnVsbCB8fCBlTWFpbD09bnVsbCB8fCBwYXNzd29yZCA9PSBudWxsIHx8IHBob25lTnVtYmVyID09bnVsbCl7XG5cbiAgICBjb25zb2xlLmxvZyhcIlZhbGlkYXRpb24gZmFpbFwiKTtcblxuICB9XG4gIGVsc2VcbiAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhbGlkYXRpb24gcGFzc1wiKTtcbiAgICAgICAgdmFyIGxheW91dCA9IHRoaXMucGFnZTtcbiAgICAgICAgdmFyIGZOYW1lVmlldyA9IGxheW91dC5nZXRWaWV3QnlJZChcImZOYW1lXCIpO1xuICAgICAgICB2YXIgbE5hbWVWaWV3ID0gbGF5b3V0LmdldFZpZXdCeUlkKFwibE5hbWVcIik7XG4gICAgICAgIHZhciBlTWFpbFZpZXcgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJlTWFpbFwiKTtcbiAgICAgICAgdmFyIHBhc3N3b3JkVmlldyA9IGxheW91dC5nZXRWaWV3QnlJZChcIlBhc3N3b3JkXCIpO1xuICAgICAgICB2YXIgY29udGFjdE51bWJlciA9IGxheW91dC5nZXRWaWV3QnlJZChcImNvbnRhY3ROdW1iZXJcIik7XG4gICAgXG5cbiAgICAgICAgaWYgKGZOYW1lVmlldy5pb3MgfHwgbE5hbWVWaWV3LmlvcyB8fCBlTWFpbFZpZXcuaW9zIHx8IHBhc3N3b3JkVmlldy5pb3MgfHwgY29udGFjdE51bWJlci5pb3MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZOYW1lVmlldy5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICAgIGxOYW1lVmlldy5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICAgIGVNYWlsVmlldy5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICAgIHBhc3N3b3JkVmlldy5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnRhY3ROdW1iZXIuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgIGVsc2UgaWYgKGZOYW1lVmlldy5hbmRyb2lkIHx8IGxOYW1lVmlldy5hbmRyb2lkIHx8IGVNYWlsVmlldy5hbmRyb2lkIHx8IHBhc3N3b3JkVmlldy5hbmRyb2lkIHx8IGNvbnRhY3ROdW1iZXIuYW5kcm9pZClcbiAgICAgICAge1xuICAgICAgICAgICAgZk5hbWVWaWV3LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICAgICAgbE5hbWVWaWV3LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICAgICAgZU1haWxWaWV3LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICAgICAgcGFzc3dvcmRWaWV3LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICAgICAgY29udGFjdE51bWJlci5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uLnVzZXJBdXRoKGZOYW1lLGxOYW1lLGVNYWlsLHBhc3N3b3JkLHBob25lTnVtYmVyKS50aGVuKFxuICAgICAgKHJlcyk9PlxuICAgICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkF1dGhlbnRpY2F0aW9uIFN1Y2Nlc3MtLS1cIityZXMpO1xuXG4gICAgICAgIC8vb24gYXV0aGVudGljYXRpb24gc3VjY2VzcyBzYXZlIHRoZSBkZXZpY2UgZGV0YWlscyBpbiB0aGUgZGF0YWJhc2VcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvbi5zYXZlRGV2aWNlRGV0YWlscyhmTmFtZSxsTmFtZSxlTWFpbCxwYXNzd29yZCxwaG9uZU51bWJlcikudGhlbihcbiAgICAgICAgKHJlcyk9PlxuICAgICAgICB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJEZXZpY2UgZGV0YWlscyBzYXZlZCBpbiBEQi0tLVwiK3Jlcyk7XG5cbiAgICAgICAgICAvL3N0b3JlIHRoZSBzZXNzaW9uIGZvciB0aGUgcmVnaXN0cmF0aW9uXG4gICAgICAgICAgc2V0Qm9vbGVhbihcIm5vQm9vbEtleVwiLCB0cnVlKTtcbiAgICAgICAgICBzZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiLHBob25lTnVtYmVyKTtcblxuICAgICAgICAgIHNldFN0cmluZyhcImRldmljZVJlZ2lzdGVyZWRVc2VyTmFtZVwiLGZOYW1lLmNoYXJBdCgwKStsTmFtZS5jaGFyQXQoMCkpO1xuICAgICAgICAgIHRoaXMubm9Cb29sS2V5ID0gaGFzS2V5KFwibm9Cb29sS2V5XCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQm9vbCBLZXktLS1cIit0aGlzLm5vQm9vbEtleSk7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL21haW5mcmFnbWVudFwiXSk7XG4gICAgICAgIH0sXG4gICAgICAgIChyZXMpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIHNhdmluZyBkZXZpY2UgZGV0YWlscy0tLVwiK3Jlcyk7XG4gICAgICAgIH0pOyBcbiAgICAgIH0sIFxuICAgICAgKHJlcyk9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXV0aGVudGljYXRpb24gRmFpbHVyZS0tLVwiK3Jlcyk7XG4gICAgICB9KTtcbiAgXG4gIH1cbiAgfVxuICBcbn1cbiJdfQ==