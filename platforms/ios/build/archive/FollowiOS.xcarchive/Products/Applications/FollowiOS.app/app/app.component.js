"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var firebase = require("nativescript-plugin-firebase");
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
        firebase.init({
            persist: false,
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
