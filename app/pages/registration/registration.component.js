"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
var RegistrationComponent = (function () {
    function RegistrationComponent(router) {
        this.router = router;
    }
    RegistrationComponent.prototype.register = function () {
        application_settings_1.setBoolean("noBoolKey", true);
        this.noBoolKey = application_settings_1.hasKey("noBoolKey");
        //console.log("Bool Key---"this.noBoolKey);
        this.router.navigate(["/mainfragment"]);
    };
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "pages/registration/registration.html",
        styleUrls: ["pages/registration/registration-common.css", "pages/registration/registration.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2lzdHJhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQVU4QjtBQU85QixJQUFhLHFCQUFxQjtJQUkvQiwrQkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFFbkMsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFFQSxpQ0FBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLDZCQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsMkNBQTJDO1FBRTNDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBaEJZLHFCQUFxQjtJQUxqQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxxQ0FBcUMsQ0FBQztLQUNqRyxDQUFDO3FDQUs2QixlQUFNO0dBSnhCLHFCQUFxQixDQWdCakM7QUFoQlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gICAgZ2V0Qm9vbGVhbixcbiAgICBzZXRCb29sZWFuLFxuICAgIGdldE51bWJlcixcbiAgICBzZXROdW1iZXIsXG4gICAgZ2V0U3RyaW5nLFxuICAgIHNldFN0cmluZyxcbiAgICBoYXNLZXksXG4gICAgcmVtb3ZlLFxuICAgIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24tY29tbW9uLmNzc1wiLCBcInBhZ2VzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFJlZ2lzdHJhdGlvbkNvbXBvbmVudCB7XG4gIC8vIFlvdXIgVHlwZVNjcmlwdCBsb2dpYyBnb2VzIGhlcmVcbiAgIHB1YmxpYyBub0Jvb2xLZXk6IGJvb2xlYW47XG4gICBcbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICBcbiAgfVxuICBcbiAgcmVnaXN0ZXIoKXtcbiAgXG4gIHNldEJvb2xlYW4oXCJub0Jvb2xLZXlcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubm9Cb29sS2V5ID0gaGFzS2V5KFwibm9Cb29sS2V5XCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQm9vbCBLZXktLS1cInRoaXMubm9Cb29sS2V5KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9tYWluZnJhZ21lbnRcIl0pO1xuICB9XG59XG4iXX0=