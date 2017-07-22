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
import firebase = require("nativescript-plugin-firebase");

@Component({
  selector: "main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {

 public noBoolKey: boolean;
 
  constructor(private router: Router){
    
    firebase.init({
    persist: true,
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
    onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
      console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
      if (data.loggedIn) {
        console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
      }
    }
    }).then(
      (instance) => {
        console.log("firebase.init done");
      },
      (error) => {
        console.log("firebase.init error: " + error);
      }
    );
    
  // firebase.logout();

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