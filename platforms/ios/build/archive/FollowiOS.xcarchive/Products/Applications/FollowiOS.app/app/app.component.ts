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
import * as LocalNotifications from "nativescript-local-notifications";



@Component({
  selector: "main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {

 public noBoolKey: boolean;
 
 
  constructor(private router: Router){

   
    LocalNotifications.hasPermission().then(
      function(granted) {
        console.log("Permission granted? " + granted);
      }
    )

    firebase.init({
      
      persist: false,
      
      onPushTokenReceivedCallback: function (token) 
      {
        
        var tokenString=token.toString();
        console.log("Firebase plugin received a push token: " + tokenString);
        setString("deviceToken",tokenString);
        
      },
      onMessageReceivedCallback: function (message) {

        if (message.foreground) {
          console.log("App is in foreground");
         }
         else{
              console.log("App is in background");
            
            console.log("--- Message Title: " + message.title);  
            console.log("--- Message Body: " + message.body);  
            LocalNotifications.schedule([{
              id: 1,
              title: message.title,
              body: message.body,
              //ticker: 'The ticker',
            //  badge: 1,
              //groupedMessages:["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
              //groupSummary:"Summary of the grouped messages above", //android only
              //ongoing: true, // makes the notification ongoing (Android only)
              //smallIcon: 'res://heart',
              //interval: 'minute',
              //sound: require("application").ios ? "customsound-ios.wav" : "customsound-android", // can be also `null`, "default"
              at: new Date(new Date().getTime() + (0.001 * 1000)) // 10 seconds from now
            }]).then(
                function() {
                  console.log("Notification scheduled");
                },
                function(error) {
                  console.log("scheduling error: " + error);
                }
            )
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