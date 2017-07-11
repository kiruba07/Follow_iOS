"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
        this.noBoolKey = application_settings_1.hasKey("noBoolKey");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQVU4QjtBQU85QixJQUFhLFlBQVk7SUFHdkIsc0JBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRWhDLElBQUksQ0FBQyxTQUFTLEdBQUcsNkJBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQ2xCLENBQUM7WUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDRCxJQUFJLENBQ0osQ0FBQztZQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUdILENBQUM7SUFFSCxtQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksWUFBWTtJQUp4QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLE1BQU07UUFDaEIsUUFBUSxFQUFFLDJDQUEyQztLQUN0RCxDQUFDO3FDQUk0QixlQUFNO0dBSHZCLFlBQVksQ0FvQnhCO0FBcEJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gICAgZ2V0Qm9vbGVhbixcbiAgICBzZXRCb29sZWFuLFxuICAgIGdldE51bWJlcixcbiAgICBzZXROdW1iZXIsXG4gICAgZ2V0U3RyaW5nLFxuICAgIHNldFN0cmluZyxcbiAgICBoYXNLZXksXG4gICAgcmVtb3ZlLFxuICAgIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJtYWluXCIsXG4gIHRlbXBsYXRlOiBcIjxwYWdlLXJvdXRlci1vdXRsZXQ+PC9wYWdlLXJvdXRlci1vdXRsZXQ+XCJcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcblxuIHB1YmxpYyBub0Jvb2xLZXk6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpe1xuICAgIFxuICAgIHRoaXMubm9Cb29sS2V5ID0gaGFzS2V5KFwibm9Cb29sS2V5XCIpO1xuICAgIGlmKHRoaXMubm9Cb29sS2V5KVxuICAgIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQWxyZWRheSByZWdpc3RlcmVkIC0tLS1cIik7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbWFpbmZyYWdtZW50XCJdKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRmlyc3QgVGltZS0tLS0tLS0tXCIpO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3JlZ2lzdHJhdGlvblwiXSk7XG4gICAgfVxuIFxuICBcbiAgfVxuXG59Il19