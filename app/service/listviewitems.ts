import firebase = require("nativescript-plugin-firebase");
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
import { ObservableArray } from "tns-core-modules/data/observable-array";

export class ListViewItems
{
    getMyTaskdetails()
    {
        var dataItems=new ObservableArray([]);
        //this.dataItems;
        var onQueryEvent = function(result) {
        // note that the query returns 1 match at a time
        // in the order specified in the query
        
        if (!result.error) {
         //   console.log("Event type: " + result.type);
           // console.log("Key: " + result.key);
            console.log("Value: " + JSON.stringify(result.value));
            

            var resultJson=result.value;
                for(var key in resultJson)
                {
                    console.log('key:::'+key);
                   // console.log('key:::'+resultJson[key]);

                    if(resultJson[key]==null || resultJson[key]=="null"){
                        console.log("key is  null---");
                    }
                    else{
                        console.log("key is not  null---");
                        var createdBy;
                        var taskName;
                        var dueDate;
                        var remainderCount;
                        var completionStatus;
                        
                        console.log("value::::---createdBy------:::1------"+resultJson[key]["createdBy"]);
                        console.log('key--------------'+key);

                        if(resultJson[key]["createdBy"]==null && 
                            resultJson[key]["taskName"]==null  && 
                           resultJson[key]["dueDate"]==null && 
                        resultJson[key]["remainderCount"]==null && 
                        resultJson[key]["completionStatus"]==null)
                        {
                            console.log("value is null---");
                            //     console.log('key:::'+key);
                        // console.log("value::::---createdBy------:::"+key+'------'+createdBy);
                        // console.log("value::::----taskName-----:::"+key+'------'+taskName);
                        // console.log("value::::----dueDate-----:::"+key+'------'+dueDate);
                        // console.log("value::::----remainderCount-----:::"+key+'------'+remainderCount);
                        // console.log("value::::----completionStatus-----:::"+key+'------'+completionStatus);
                            
                        }
                        else{
                            
                        

                        console.log("value is not null---");
                            createdBy=resultJson[key]["createdBy"];
                            taskName=resultJson[key]["taskName"];
                            dueDate=resultJson[key]["dueDate"];
                            remainderCount=resultJson[key]["remainderCount"];
                            completionStatus=resultJson[key]["completionStatus"];


                        //console.log('key:::'+key);
                        // console.log("value::::---createdBy------:::"+key+'------'+createdBy);
                        // console.log("value::::----taskName-----:::"+key+'------'+taskName);
                        // console.log("value::::----dueDate-----:::"+key+'------'+dueDate);
                        // console.log("value::::----remainderCount-----:::"+key+'------'+remainderCount);
                        // console.log("value::::----completionStatus-----:::"+key+'------'+completionStatus);

                            dataItems.push(
                                {
                                    "createdBy":createdBy , 
                                    "taskName":taskName, 
                                    "dueDate": "03-08-2017 10:00AM",
                                    "remainderCount": remainderCount, 
                                    "completionStatus": "2/10" 
                                },
                            );
                        }
                    }
 
                }

            
        }
        
    };

    var devicePhoneNumber=getString("devicePhoneNumber");
    console.log("Device Phone Number----"+devicePhoneNumber);
    firebase.query(
        onQueryEvent,
       '/MyTaskDetails/'+devicePhoneNumber,
        {
            
            singleEvent: true,
            
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
               //value: 'taskName' // mandatory when type is 'child'
            },
            
        }
    );
    return dataItems;
    }

    getContactList()
    {
            var contactList=new ObservableArray([]);
            var onQueryEvent = function(result)
            {
            // note that the query returns 1 match at a time
            // in the order specified in the query
            
            if (!result.error)
            {
                //   console.log("Event type: " + result.type);
            // console.log("Key: " + result.key);
                console.log("Value contact list------: " + JSON.stringify(result.value));
                var resultJson=result.value;
                for(var key in resultJson)
                {
                    console.log('key:::'+key);
                    if(resultJson[key]==null || resultJson[key]=="null")
                    {
                        console.log("key is  null---");
                        
                    }
                    else
                    {
                        console.log("key is not  null---");

                        if(resultJson[key]["fName"]==null && resultJson[key]["lName"]==null)
                        {
                            console.log("Value is null");

                        }
                        else
                        {
                            console.log("Value is not null");
                            contactList.push({

                                "name":resultJson[key]["fName"]+" "+resultJson[key]["lName"],
                                "number":key

                            });
                            console.log("Contact list----"+contactList);
                        }
                    }
                }

            }
       
        }
        firebase.query(
            onQueryEvent,
        '/DeviceDetails/',
            {
                
                singleEvent: true,
                
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                //value: 'taskName' // mandatory when type is 'child'
                },
                
            }
        );
    
     return contactList;
    }

}

    

 