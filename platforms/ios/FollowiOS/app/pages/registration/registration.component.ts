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
  selector: "my-app",
  templateUrl: "pages/registration/registration.html",
  styleUrls: ["pages/registration/registration-common.css", "pages/registration/registration.css"]
})
export class RegistrationComponent {
  // Your TypeScript logic goes here
   public noBoolKey: boolean;
   
   constructor(private router: Router) {
    
  }
  
  register(){
  
  setBoolean("noBoolKey", true);
        this.noBoolKey = hasKey("noBoolKey");
        //console.log("Bool Key---"this.noBoolKey);
        
        this.router.navigate(["/mainfragment"]);
  }
}
