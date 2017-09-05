import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ActivityIndicator } from "ui/activity-indicator";

@Component({
  selector: "my-app",
  templateUrl: "pages/maintenance/maintenance.html",
  styleUrls: ["pages/maintenance/maintenance-common.css", "pages/maintenance/maintenance.css"]
})
export class MaintenanceComponent {
   onBusyChanged(args) {
        let indicator = <ActivityIndicator>args.object;
        console.log("indicator.busy changed to: " + indicator.busy);
    }

  
}
