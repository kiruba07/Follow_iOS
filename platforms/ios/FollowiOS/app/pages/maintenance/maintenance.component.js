"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MaintenanceComponent = (function () {
    function MaintenanceComponent() {
    }
    MaintenanceComponent.prototype.onBusyChanged = function (args) {
        var indicator = args.object;
        console.log("indicator.busy changed to: " + indicator.busy);
    };
    return MaintenanceComponent;
}());
MaintenanceComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "pages/maintenance/maintenance.html",
        styleUrls: ["pages/maintenance/maintenance-common.css", "pages/maintenance/maintenance.css"]
    })
], MaintenanceComponent);
exports.MaintenanceComponent = MaintenanceComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbnRlbmFuY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbnRlbmFuY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBUzFDLElBQWEsb0JBQW9CO0lBQWpDO0lBT0EsQ0FBQztJQU5FLDRDQUFhLEdBQWIsVUFBYyxJQUFJO1FBQ2IsSUFBSSxTQUFTLEdBQXNCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUdMLDJCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFQWSxvQkFBb0I7SUFMaEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxvQ0FBb0M7UUFDakQsU0FBUyxFQUFFLENBQUMsMENBQTBDLEVBQUUsbUNBQW1DLENBQUM7S0FDN0YsQ0FBQztHQUNXLG9CQUFvQixDQU9oQztBQVBZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBBY3Rpdml0eUluZGljYXRvciB9IGZyb20gXCJ1aS9hY3Rpdml0eS1pbmRpY2F0b3JcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9tYWludGVuYW5jZS9tYWludGVuYW5jZS5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvbWFpbnRlbmFuY2UvbWFpbnRlbmFuY2UtY29tbW9uLmNzc1wiLCBcInBhZ2VzL21haW50ZW5hbmNlL21haW50ZW5hbmNlLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBNYWludGVuYW5jZUNvbXBvbmVudCB7XG4gICBvbkJ1c3lDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgbGV0IGluZGljYXRvciA9IDxBY3Rpdml0eUluZGljYXRvcj5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbmRpY2F0b3IuYnVzeSBjaGFuZ2VkIHRvOiBcIiArIGluZGljYXRvci5idXN5KTtcbiAgICB9XG5cbiAgXG59XG4iXX0=