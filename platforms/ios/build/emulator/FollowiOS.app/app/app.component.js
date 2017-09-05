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
            onPushTokenReceivedCallback: function (token) {
                console.log("Firebase plugin received a push token: " + token);
            },
            onMessageReceivedCallback: function (message) {
                console.log("--- message received: " + message.title);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLDZEQVU4QjtBQUM5Qix1REFBMEQ7QUFRMUQsSUFBYSxZQUFZO0lBS3ZCLHNCQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUloQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBRVosT0FBTyxFQUFFLEtBQUs7WUFFZCwyQkFBMkIsRUFBRSxVQUFVLEtBQUs7Z0JBRTFDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFFakUsQ0FBQztZQUNELHlCQUF5QixFQUFFLFVBQVUsT0FBTztnQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEQsQ0FBQztTQUVGLENBQUMsQ0FBQyxJQUFJLENBQ0wsVUFBQyxRQUFRO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FDRixDQUFDO1FBQ04sb0JBQW9CO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsNkJBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVyQyxxREFBcUQ7UUFDckQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUNsQixDQUFDO1lBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsSUFBSSxDQUNKLENBQUM7WUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7SUFHSCxDQUFDO0lBTUgsbUJBQUM7QUFBRCxDQUFDLEFBcERELElBb0RDO0FBcERZLFlBQVk7SUFKeEIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFFBQVEsRUFBRSwyQ0FBMkM7S0FDdEQsQ0FBQztxQ0FNNEIsZUFBTTtHQUx2QixZQUFZLENBb0R4QjtBQXBEWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm1haW5cIixcbiAgdGVtcGxhdGU6IFwiPHBhZ2Utcm91dGVyLW91dGxldD48L3BhZ2Utcm91dGVyLW91dGxldD5cIlxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuXG4gcHVibGljIG5vQm9vbEtleTogYm9vbGVhbjtcbiBcbiBcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcil7XG5cbiAgIFxuICAgIFxuICAgIGZpcmViYXNlLmluaXQoe1xuICAgICAgXG4gICAgICBwZXJzaXN0OiBmYWxzZSxcbiAgICAgIFxuICAgICAgb25QdXNoVG9rZW5SZWNlaXZlZENhbGxiYWNrOiBmdW5jdGlvbiAodG9rZW4pIFxuICAgICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZpcmViYXNlIHBsdWdpbiByZWNlaXZlZCBhIHB1c2ggdG9rZW46IFwiICsgdG9rZW4pO1xuICAgICAgICBcbiAgICAgIH0sXG4gICAgICBvbk1lc3NhZ2VSZWNlaXZlZENhbGxiYWNrOiBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLSBtZXNzYWdlIHJlY2VpdmVkOiBcIiArIG1lc3NhZ2UudGl0bGUpOyAgICAgIFxuICAgICAgfVxuICAgICAgXG4gICAgfSkudGhlbihcbiAgICAgIChpbnN0YW5jZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlLmluaXQgZG9uZVwiKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJmaXJlYmFzZS5pbml0IGVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuLy9maXJlYmFzZS5sb2dvdXQoKTtcbiAgICB0aGlzLm5vQm9vbEtleSA9IGhhc0tleShcIm5vQm9vbEtleVwiKTtcblxuICAgIC8vY29uc29sZS5sb2coXCJCb29sIHZhbC0tLVwiK2dldEJvb2xlYW4oXCJub0Jvb2xLZXlcIikpO1xuICAgIGlmKHRoaXMubm9Cb29sS2V5KVxuICAgIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQWxyZWRheSByZWdpc3RlcmVkIC0tLS1cIik7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbWFpbmZyYWdtZW50XCJdKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRmlyc3QgVGltZS0tLS0tLS0tXCIpO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3JlZ2lzdHJhdGlvblwiXSk7XG4gICAgfVxuXG4gIFxuICB9XG4gIFxuICBcbiAgICBcbiAgXG5cbn0iXX0=