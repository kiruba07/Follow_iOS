import firebase = require("nativescript-plugin-firebase");

export class Authentication{
 
    userAuth(fName,lName,eMail,password,phoneNumber){

      return firebase.createUser({
        email: eMail,
        password: password
      })
    }
    saveDeviceDetails(fName,lName,eMail,password,phoneNumber){
          return firebase.setValue(
            '/DeviceDetails/'+phoneNumber+'/',
            {
                'fName':fName,
                'lName':lName,
                'password':password,
            }
        )
    }

    


}