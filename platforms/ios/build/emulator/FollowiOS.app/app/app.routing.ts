import { RegistrationComponent } from "./pages/registration/registration.component";
import { MainFragmentComponent } from "./pages/mainfragment/mainfragment.component";
import { CreateTaskComponent } from "./pages/createtask/createtask.component";
import { MyTaskComponent } from "./pages/mytask/mytask.component";
import { OtherTaskComponent } from "./pages/othertask/othertask.component";

import { PerformanceComponent } from "./pages/performance/performance.component";

import { MaintenanceComponent } from "./pages/maintenance/maintenance.component";

export const routes = [
  { path: "registration", component: RegistrationComponent },
  { path: "createtask", component: CreateTaskComponent },
  
  
  { path: 'mainfragment', component: MainFragmentComponent, children: [
    { path: 'mytask', component: MyTaskComponent, outlet: 'mytaskoutlet'},
    { path: 'othertask', component: OtherTaskComponent, outlet: 'othertaskoutlet'},
    
    { path: 'performance', component: PerformanceComponent, outlet: 'performancekoutlet'},
    { path: 'maintenance', component: MaintenanceComponent, outlet: 'maintenanceoutlet'},
     
    
  ]}
];

export const navigatableComponents = [
  RegistrationComponent,
  MainFragmentComponent,
  CreateTaskComponent,
  MyTaskComponent,
  OtherTaskComponent,
  PerformanceComponent,
  MaintenanceComponent
  
  
];