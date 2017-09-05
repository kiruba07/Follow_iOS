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
    Authentication.prototype.saveDeviceDetails = function (fName, lName, eMail, password, phoneNumber) {
        return firebase.setValue('/DeviceDetails/' + phoneNumber + '/', {
            'fName': fName,
            'lName': lName,
            'password': password,
        });
    };
    return Authentication;
}());
exports.Authentication = Authentication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRoZW50aWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUEwRDtBQUUxRDtJQUFBO0lBdUJBLENBQUM7SUFyQkcsaUNBQVEsR0FBUixVQUFTLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxXQUFXO1FBRTdDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ3pCLEtBQUssRUFBRSxLQUFLO1lBQ1osUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELDBDQUFpQixHQUFqQixVQUFrQixLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsV0FBVztRQUNsRCxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDdEIsaUJBQWlCLEdBQUMsV0FBVyxHQUFDLEdBQUcsRUFDakM7WUFDSSxPQUFPLEVBQUMsS0FBSztZQUNiLE9BQU8sRUFBQyxLQUFLO1lBQ2IsVUFBVSxFQUFDLFFBQVE7U0FDdEIsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQUtMLHFCQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb257XG4gXG4gICAgdXNlckF1dGgoZk5hbWUsbE5hbWUsZU1haWwscGFzc3dvcmQscGhvbmVOdW1iZXIpe1xuXG4gICAgICByZXR1cm4gZmlyZWJhc2UuY3JlYXRlVXNlcih7XG4gICAgICAgIGVtYWlsOiBlTWFpbCxcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICB9KVxuICAgIH1cbiAgICBzYXZlRGV2aWNlRGV0YWlscyhmTmFtZSxsTmFtZSxlTWFpbCxwYXNzd29yZCxwaG9uZU51bWJlcil7XG4gICAgICAgICAgcmV0dXJuIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICAgJy9EZXZpY2VEZXRhaWxzLycrcGhvbmVOdW1iZXIrJy8nLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdmTmFtZSc6Zk5hbWUsXG4gICAgICAgICAgICAgICAgJ2xOYW1lJzpsTmFtZSxcbiAgICAgICAgICAgICAgICAncGFzc3dvcmQnOnBhc3N3b3JkLFxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxuXG4gICAgXG5cblxufSJdfQ==