// >> add-items-code
import { Component } from "@angular/core";
import { StackLayout } from "ui/layouts/stack-layout";

import { TabView, SelectedIndexChangedEventData, TabViewItem } from "ui/tab-view";
import { Router } from '@angular/router';
import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "application-settings";

@Component({
    selector: "mainfragment",
    templateUrl: "pages/mainfragment/mainfragment.html",
    styleUrls: ["pages/mainfragment/mainfragment-common.css", "pages/mainfragment/mainfragment.css"]
})
export class MainFragmentComponent {
    public titleAndIcon2: any = { title: "Other Task" };
    public titleAndIcon3: any = { title: "Performance" };
    public titleAndIcon4: any = { title: "Maintenance" };
    
    constructor(private router: Router) {}
    public onIndexChanged(args) {
            let tabView = <TabView>args.object;
            console.log("Selected index changed! New inxed: " + tabView.selectedIndex);
            switch(tabView.selectedIndex) 
            {
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
           
            }
            navigateToMyTask() {
                this.router.navigate([
                  '/mainfragment',
                  { outlets: { mytaskoutlet: ['mytask'] } }
                ]);
              }
              navigateToOtherTask() {
                this.router.navigate([
                  '/mainfragment',
                  { outlets: { othertaskoutlet: ['othertask'] } }
                ]);
              }
              navigateToPerformance() {
                this.router.navigate([
                  '/mainfragment',
                  { outlets: { performancekoutlet: ['performance'] } }
                ]);
              }
              navigateToMaintenance() {
                this.router.navigate([
                  '/mainfragment',
                  { outlets: { maintenanceoutlet: ['maintenance'] } }
                ]);
              }
              
              logout(){
                console.log("Log out tapped---");
                 clear();//clear all application settings
                this.router.navigate(["/login"]);
              }
    
    
}
// << add-items-code