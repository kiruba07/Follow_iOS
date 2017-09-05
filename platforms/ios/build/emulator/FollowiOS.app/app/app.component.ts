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
      
      persist: false,
      
      onPushTokenReceivedCallback: function (token) 
      {
        console.log("Firebase plugin received a push token: " + token);
        
      },
      onMessageReceivedCallback: function (message) {
        console.log("--- message received: " + message.title);      
      }
      
    }).then(
      (instance) => {
        console.log("firebase.init done");
      },
      (error) => {
        console.log("firebase.init error: " + error);
      }
    );
//firebase.logout();
    this.noBoolKey = hasKey("noBoolKey");

    //console.log("Bool val---"+getBoolean("noBoolKey"));
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