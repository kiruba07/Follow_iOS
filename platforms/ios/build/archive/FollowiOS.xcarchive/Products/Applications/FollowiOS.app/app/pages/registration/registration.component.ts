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
import { User } from "../../service/user";

@Component({
  selector: "my-app",
  templateUrl: "pages/registration/registration.html",
  styleUrls: ["pages/registration/registration-common.css", "pages/registration/registration.css"]
})
export class RegistrationComponent {
  // public noBoolKey: boolean;
   
   user:User
   constructor(private router: Router) {
    this.user = new User();
    
   }
  
  
  register(){
  
  console.log("tapped");
  console.log("User-----"+this.user.userName);
  console.log("password----"+this.user.password);
  console.log("phone number---"+this.user.phoneNumber);
  var uName=this.user.userName;
  var password=this.user.password;
  var phoneNumber=this.user.phoneNumber;
  
   console.log("User-//////----"+uName);
  console.log("password--/////--"+password);
  console.log("phone number-//////--"+phoneNumber);
  
//firebase.createUser({
  //  email: this.user.userName,
    //password: this.user.password
  //}).then(
    //  function (result) {
      //  console.log("Login success");
      //},
      //function (errorMessage) {
        //console.log("Login failrue");
      //}
  //);

  
   firebase.setValue(
      '/companies',
      {foo:'bar'}
  );
  //set db
        firebase.push(
        
              '/companies',
              {username:'test'}
        ).then(function(result){
            console.log("created key: " + result.key);
        },
        function(errorMessage){
        console.log("Failure"+errorMessage);
        }
        );
    
    //setBoolean("noBoolKey", true);
       // this.noBoolKey = hasKey("noBoolKey");
        //console.log("Bool Key---"this.noBoolKey);
        
        //this.router.navigate(["/mainfragment"]);
  }
}
