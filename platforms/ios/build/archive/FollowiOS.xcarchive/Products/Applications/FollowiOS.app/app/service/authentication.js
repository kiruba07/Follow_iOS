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
