"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var angular_1 = require("nativescript-telerik-ui-pro/calendar/angular");
var angular_2 = require("nativescript-telerik-ui-pro/listview/angular");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
//import { AccordionModule } from "nativescript-accordion/angular";
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent
        ].concat(app_routing_1.navigatableComponents),
        bootstrap: [app_component_1.AppComponent],
        imports: [
            //AccordionModule,
            nativescript_module_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            http_1.NativeScriptHttpModule,
            router_1.NativeScriptRouterModule,
            angular_1.NativeScriptUICalendarModule,
            angular_2.NativeScriptUIListViewModule,
            router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes)
        ],
        schemas: [core_1.NO_ERRORS_SCHEMA],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLHdFQUE0RjtBQUM1Rix3RUFBNEY7QUFDNUYsaURBQStDO0FBQy9DLDZDQUE4RDtBQUM5RCxtRUFBbUU7QUF3Qm5FLElBQWEsU0FBUztJQUF0QjtJQUlBLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksU0FBUztJQXBCckIsZUFBUSxDQUFDO1FBQ1IsWUFBWTtZQUNWLDRCQUFZO2lCQUNULG1DQUFxQixDQUN2QjtRQUVILFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7UUFFekIsT0FBTyxFQUFFO1lBQ1Asa0JBQWtCO1lBQ2xCLHdDQUFrQjtZQUNsQiwrQkFBdUI7WUFDdkIsNkJBQXNCO1lBQ3RCLGlDQUF3QjtZQUN4QixzQ0FBNEI7WUFDNUIsc0NBQTRCO1lBQzVCLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxvQkFBTSxDQUFDO1NBQUM7UUFFM0MsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7S0FDNUIsQ0FBQztHQUNXLFNBQVMsQ0FJckI7QUFKWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUNhbGVuZGFyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9jYWxlbmRhci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlldy9hbmd1bGFyXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyByb3V0ZXMsIG5hdmlnYXRhYmxlQ29tcG9uZW50cyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG4vL2ltcG9ydCB7IEFjY29yZGlvbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYWNjb3JkaW9uL2FuZ3VsYXJcIjtcblxuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICAuLi5uYXZpZ2F0YWJsZUNvbXBvbmVudHNcbiAgICBdLFxuXG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF0sXG5cbiAgaW1wb3J0czogW1xuICAgIC8vQWNjb3JkaW9uTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRVSUNhbGVuZGFyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKV0sXG4gICAgXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHtcblxuXG5cbn1cbiJdfQ==