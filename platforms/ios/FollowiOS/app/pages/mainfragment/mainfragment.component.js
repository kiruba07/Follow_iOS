"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// >> add-items-code
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var MainFragmentComponent = (function () {
    function MainFragmentComponent(router) {
        this.router = router;
        this.titleAndIcon2 = { title: "Other Task" };
        this.titleAndIcon3 = { title: "Performance" };
        this.titleAndIcon4 = { title: "Maintenance" };
    }
    MainFragmentComponent.prototype.onIndexChanged = function (args) {
        var tabView = args.object;
        console.log("Selected index changed! New inxed: " + tabView.selectedIndex);
        switch (tabView.selectedIndex) {
            case 0:
                this.navigateToMyTask();
                break;
            case 1:
                this.navigateToOtherTask();
                break;
            case 2:
                this.navigateToPerformance();
                break;
            case 3:
                this.navigateToMaintenance();
                break;
        }
    };
    MainFragmentComponent.prototype.navigateToMyTask = function () {
        this.router.navigate([
            '/mainfragment',
            { outlets: { mytaskoutlet: ['mytask'] } }
        ]);
    };
    MainFragmentComponent.prototype.navigateToOtherTask = function () {
        this.router.navigate([
            '/mainfragment',
            { outlets: { othertaskoutlet: ['othertask'] } }
        ]);
    };
    MainFragmentComponent.prototype.navigateToPerformance = function () {
        this.router.navigate([
            '/mainfragment',
            { outlets: { performancekoutlet: ['performance'] } }
        ]);
    };
    MainFragmentComponent.prototype.navigateToMaintenance = function () {
        this.router.navigate([
            '/mainfragment',
            { outlets: { maintenanceoutlet: ['maintenance'] } }
        ]);
    };
    MainFragmentComponent.prototype.logout = function () {
        console.log("Log out tapped---");
        application_settings_1.clear(); //clear all application settings
        this.router.navigate(["/login"]);
    };
    return MainFragmentComponent;
}());
MainFragmentComponent = __decorate([
    core_1.Component({
        selector: "mainfragment",
        templateUrl: "pages/mainfragment/mainfragment.html",
        styleUrls: ["pages/mainfragment/mainfragment-common.css", "pages/mainfragment/mainfragment.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], MainFragmentComponent);
exports.MainFragmentComponent = MainFragmentComponent;
// << add-items-code 
