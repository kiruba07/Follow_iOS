"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var Authentication = (function () {
    function Authentication() {
    }
    Authentication.prototype.userAuth = function (fName, lName, eMail, password, phoneNumber) {
        return firebase.createUser({
            email: eMail,
            password: password
        });
    };
    Authentication.prototype.saveDeviceDetails = function (fName, lName, eMail, password, phoneNumber, deviceToken) {
        return firebase.setValue('/DeviceDetails/' + phoneNumber + '/', {
            'fName': fName,
            'lName': lName,
            'password': password,
            'deviceToken': deviceToken
        });
    };
    return Authentication;
}());
exports.Authentication = Authentication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRoZW50aWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUEwRDtBQUUxRDtJQUFBO0lBd0JBLENBQUM7SUF0QkcsaUNBQVEsR0FBUixVQUFTLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxXQUFXO1FBRTdDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ3pCLEtBQUssRUFBRSxLQUFLO1lBQ1osUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELDBDQUFpQixHQUFqQixVQUFrQixLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsV0FBVyxFQUFDLFdBQVc7UUFDOUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3RCLGlCQUFpQixHQUFDLFdBQVcsR0FBQyxHQUFHLEVBQ2pDO1lBQ0ksT0FBTyxFQUFDLEtBQUs7WUFDYixPQUFPLEVBQUMsS0FBSztZQUNiLFVBQVUsRUFBQyxRQUFRO1lBQ25CLGFBQWEsRUFBQyxXQUFXO1NBQzVCLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFLTCxxQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9ue1xuIFxuICAgIHVzZXJBdXRoKGZOYW1lLGxOYW1lLGVNYWlsLHBhc3N3b3JkLHBob25lTnVtYmVyKXtcblxuICAgICAgcmV0dXJuIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xuICAgICAgICBlbWFpbDogZU1haWwsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgfSlcbiAgICB9XG4gICAgc2F2ZURldmljZURldGFpbHMoZk5hbWUsbE5hbWUsZU1haWwscGFzc3dvcmQscGhvbmVOdW1iZXIsZGV2aWNlVG9rZW4pe1xuICAgICAgICAgIHJldHVybiBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICcvRGV2aWNlRGV0YWlscy8nK3Bob25lTnVtYmVyKycvJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnZk5hbWUnOmZOYW1lLFxuICAgICAgICAgICAgICAgICdsTmFtZSc6bE5hbWUsXG4gICAgICAgICAgICAgICAgJ3Bhc3N3b3JkJzpwYXNzd29yZCxcbiAgICAgICAgICAgICAgICAnZGV2aWNlVG9rZW4nOmRldmljZVRva2VuXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBcblxuXG59Il19