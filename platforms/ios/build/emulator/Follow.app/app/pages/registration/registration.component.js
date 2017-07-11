"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var RegistrationComponent = (function () {
    function RegistrationComponent(router) {
        this.router = router;
    }
    RegistrationComponent.prototype.register = function () {
        //setBoolean("noBoolKey", true);
        //    this.noBoolKey = hasKey("noBoolKey");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2lzdHJhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBa0J6QyxJQUFhLHFCQUFxQjtJQUkvQiwrQkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFFbkMsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFFQSxnQ0FBZ0M7UUFDOUIsMkNBQTJDO1FBQ3ZDLDJDQUEyQztRQUUzQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWhCWSxxQkFBcUI7SUFMakMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsU0FBUyxFQUFFLENBQUMsNENBQTRDLEVBQUUscUNBQXFDLENBQUM7S0FDakcsQ0FBQztxQ0FLNkIsZUFBTTtHQUp4QixxQkFBcUIsQ0FnQmpDO0FBaEJZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBSZWdpc3RyYXRpb25Db21wb25lbnQge1xuICAvLyBZb3VyIFR5cGVTY3JpcHQgbG9naWMgZ29lcyBoZXJlXG4gICBwdWJsaWMgbm9Cb29sS2V5OiBib29sZWFuO1xuICAgXG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgXG4gIH1cbiAgXG4gIHJlZ2lzdGVyKCl7XG4gIFxuICAvL3NldEJvb2xlYW4oXCJub0Jvb2xLZXlcIiwgdHJ1ZSk7XG4gICAgLy8gICAgdGhpcy5ub0Jvb2xLZXkgPSBoYXNLZXkoXCJub0Jvb2xLZXlcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJCb29sIEtleS0tLVwidGhpcy5ub0Jvb2xLZXkpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL21haW5mcmFnbWVudFwiXSk7XG4gIH1cbn1cbiJdfQ==