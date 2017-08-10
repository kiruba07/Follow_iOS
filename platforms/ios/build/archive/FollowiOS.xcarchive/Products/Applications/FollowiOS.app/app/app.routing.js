"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var registration_component_1 = require("./pages/registration/registration.component");
var mainfragment_component_1 = require("./pages/mainfragment/mainfragment.component");
var createtask_component_1 = require("./pages/createtask/createtask.component");
var mytask_component_1 = require("./pages/mytask/mytask.component");
var othertask_component_1 = require("./pages/othertask/othertask.component");
var performance_component_1 = require("./pages/performance/performance.component");
var maintenance_component_1 = require("./pages/maintenance/maintenance.component");
exports.routes = [
    { path: "registration", component: registration_component_1.RegistrationComponent },
    { path: "createtask", component: createtask_component_1.CreateTaskComponent },
    { path: 'mainfragment', component: mainfragment_component_1.MainFragmentComponent, children: [
            { path: 'mytask', component: mytask_component_1.MyTaskComponent, outlet: 'mytaskoutlet' },
            { path: 'othertask', component: othertask_component_1.OtherTaskComponent, outlet: 'othertaskoutlet' },
            { path: 'performance', component: performance_component_1.PerformanceComponent, outlet: 'performancekoutlet' },
            { path: 'maintenance', component: maintenance_component_1.MaintenanceComponent, outlet: 'maintenanceoutlet' },
        ] }
];
exports.navigatableComponents = [
    registration_component_1.RegistrationComponent,
    mainfragment_component_1.MainFragmentComponent,
    createtask_component_1.CreateTaskComponent,
    mytask_component_1.MyTaskComponent,
    othertask_component_1.OtherTaskComponent,
    performance_component_1.PerformanceComponent,
    maintenance_component_1.MaintenanceComponent
];
