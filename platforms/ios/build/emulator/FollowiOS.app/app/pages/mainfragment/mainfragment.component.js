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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbmZyYWdtZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW5mcmFnbWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQkFBb0I7QUFDcEIsc0NBQTBDO0FBSTFDLDBDQUF5QztBQUN6Qyw2REFVOEI7QUFPOUIsSUFBYSxxQkFBcUI7SUFLOUIsK0JBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSjNCLGtCQUFhLEdBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUM7UUFDN0Msa0JBQWEsR0FBUSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQztRQUM5QyxrQkFBYSxHQUFRLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDO0lBRWhCLENBQUM7SUFDL0IsOENBQWMsR0FBckIsVUFBc0IsSUFBSTtRQUNsQixJQUFJLE9BQU8sR0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sQ0FBQSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FDN0IsQ0FBQztZQUNPLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMzQixLQUFLLENBQUM7WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQzdCLEtBQUssQ0FBQztZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDN0IsS0FBSyxDQUFDO1FBQ1YsQ0FBQztJQUVULENBQUM7SUFDRCxnREFBZ0IsR0FBaEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNuQixlQUFlO1lBQ2YsRUFBRSxPQUFPLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO1NBQzFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxtREFBbUIsR0FBbkI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNuQixlQUFlO1lBQ2YsRUFBRSxPQUFPLEVBQUUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFO1NBQ2hELENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxxREFBcUIsR0FBckI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNuQixlQUFlO1lBQ2YsRUFBRSxPQUFPLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUU7U0FDckQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELHFEQUFxQixHQUFyQjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ25CLGVBQWU7WUFDZixFQUFFLE9BQU8sRUFBRSxFQUFFLGlCQUFpQixFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRTtTQUNwRCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0NBQU0sR0FBTjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNoQyw0QkFBSyxFQUFFLENBQUMsQ0FBQSxnQ0FBZ0M7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFHZiw0QkFBQztBQUFELENBQUMsQUExREQsSUEwREM7QUExRFkscUJBQXFCO0lBTGpDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLHFDQUFxQyxDQUFDO0tBQ25HLENBQUM7cUNBTThCLGVBQU07R0FMekIscUJBQXFCLENBMERqQztBQTFEWSxzREFBcUI7QUEyRGxDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8vID4+IGFkZC1pdGVtcy1jb2RlXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcblxuaW1wb3J0IHsgVGFiVmlldywgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEsIFRhYlZpZXdJdGVtIH0gZnJvbSBcInVpL3RhYi12aWV3XCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm1haW5mcmFnbWVudFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL21haW5mcmFnbWVudC9tYWluZnJhZ21lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvbWFpbmZyYWdtZW50L21haW5mcmFnbWVudC1jb21tb24uY3NzXCIsIFwicGFnZXMvbWFpbmZyYWdtZW50L21haW5mcmFnbWVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTWFpbkZyYWdtZW50Q29tcG9uZW50IHtcbiAgICBwdWJsaWMgdGl0bGVBbmRJY29uMjogYW55ID0geyB0aXRsZTogXCJPdGhlciBUYXNrXCIgfTtcbiAgICBwdWJsaWMgdGl0bGVBbmRJY29uMzogYW55ID0geyB0aXRsZTogXCJQZXJmb3JtYW5jZVwiIH07XG4gICAgcHVibGljIHRpdGxlQW5kSWNvbjQ6IGFueSA9IHsgdGl0bGU6IFwiTWFpbnRlbmFuY2VcIiB9O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG4gICAgcHVibGljIG9uSW5kZXhDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgICAgIGxldCB0YWJWaWV3ID0gPFRhYlZpZXc+YXJncy5vYmplY3Q7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGluZGV4IGNoYW5nZWQhIE5ldyBpbnhlZDogXCIgKyB0YWJWaWV3LnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgc3dpdGNoKHRhYlZpZXcuc2VsZWN0ZWRJbmRleCkgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9NeVRhc2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9PdGhlclRhc2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9QZXJmb3JtYW5jZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb01haW50ZW5hbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hdmlnYXRlVG9NeVRhc2soKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG15dGFza291dGxldDogWydteXRhc2snXSB9IH1cbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBuYXZpZ2F0ZVRvT3RoZXJUYXNrKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBvdGhlcnRhc2tvdXRsZXQ6IFsnb3RoZXJ0YXNrJ10gfSB9XG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbmF2aWdhdGVUb1BlcmZvcm1hbmNlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICcvbWFpbmZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICAgIHsgb3V0bGV0czogeyBwZXJmb3JtYW5jZWtvdXRsZXQ6IFsncGVyZm9ybWFuY2UnXSB9IH1cbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBuYXZpZ2F0ZVRvTWFpbnRlbmFuY2UoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgJy9tYWluZnJhZ21lbnQnLFxuICAgICAgICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG1haW50ZW5hbmNlb3V0bGV0OiBbJ21haW50ZW5hbmNlJ10gfSB9XG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGxvZ291dCgpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nIG91dCB0YXBwZWQtLS1cIik7XG4gICAgICAgICAgICAgICAgIGNsZWFyKCk7Ly9jbGVhciBhbGwgYXBwbGljYXRpb24gc2V0dGluZ3NcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICAgICAgICB9XG4gICAgXG4gICAgXG59XG4vLyA8PCBhZGQtaXRlbXMtY29kZSJdfQ==