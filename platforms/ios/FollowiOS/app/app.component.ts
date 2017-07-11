import { Component } from "@angular/core";
import { Router } from "@angular/router";
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
  selector: "main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {

 public noBoolKey: boolean;
  constructor(private router: Router){
    
    this.noBoolKey = hasKey("noBoolKey");
    if(this.noBoolKey)
    {
      console.log("Alreday registered ----");
      this.router.navigate(["/mainfragment"]);
    }
    else
    {
      console.log("First Time--------");
      this.router.navigate(["/registration"]);
    }
 
  
  }

}