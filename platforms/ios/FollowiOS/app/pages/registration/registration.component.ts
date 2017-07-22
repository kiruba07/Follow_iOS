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
import { Authentication } from "../../service/authentication";

@Component({
  selector: "my-app",
  templateUrl: "pages/registration/registration.html",
  styleUrls: ["pages/registration/registration-common.css", "pages/registration/registration.css"]
})
export class RegistrationComponent {
   public noBoolKey: boolean;
   user:User
   authentication:Authentication
   
   constructor(public router: Router) {
     this.user = new User();
     this.authentication= new Authentication();
    }
  
  
  register()
  {
  var fName=this.user.fName;
  var lName=this.user.lName;
  var eMail=this.user.eMail;

  var password=this.user.password;
  var phoneNumber=this.user.phoneNumber;
  
   console.log("fNmae-//////----"+fName);
   console.log("lName-//////----"+lName);
   console.log("eMail-//////----"+eMail);
    console.log("password--/////--"+password);
  console.log("phone number-//////--"+phoneNumber);

  this.authentication.userAuth(fName,lName,eMail,password,phoneNumber).then(
  (res)=>
  {
    console.log("Authentication Success---"+res);

    //on authentication success save the device details in the database
    this.authentication.saveDeviceDetails(fName,lName,eMail,password,phoneNumber).then(
    (res)=>
    {
      console.log("Device details saved in DB---"+res);

      //store the session for the registration
      setBoolean("noBoolKey", true);
      setString("devicePhoneNumber",phoneNumber);

      setString("deviceRegisteredUserName",fName.charAt(0)+lName.charAt(0));
      this.noBoolKey = hasKey("noBoolKey");
      console.log("Bool Key---"+this.noBoolKey);
      this.router.navigate(["/mainfragment"]);
    },
    (res)=>{
         console.log("Error in saving device details---"+res);
    }); 
  }, 
  (res)=> {
    console.log("Authentication Failure---"+res);
  });
  
  }
  
}
