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
        

        var onQueryEvent = function(result)
        {
        
        
        if (!result.error) {
         
            var resultJson=result.value;
            //for not comepleted items
                for(var key in resultJson)
                {
                    if(resultJson[key]==null || resultJson[key]=="null"){}
                    else{
                       
                        var createdBy;
                        var taskName;
                        var dueDate;
                        var remainderCount;
                        var completionStatus;
                        var myCompletionStatus;
                        var recepientsCount;
                        var createdByNumber;
                        var completionCount;
            
                        if(resultJson[key]["createdBy"]==null && 
                            resultJson[key]["taskName"]==null  && 
                           resultJson[key]["dueDate"]==null && 
                        resultJson[key]["remainderCount"]==null && 
                        resultJson[key]["completionStatus"]==null &&
                        resultJson[key]["myCompletionStatus"]==null &&
                        resultJson[key]["recipentsCount"]==null &&
                        resultJson[key]["createdByRegId"]==null &&
                        resultJson[key]["completionCount"]==null 
                    
                        )
                        { 
                        }
                        else
                        {

                            createdBy=resultJson[key]["createdBy"];
                            taskName=resultJson[key]["taskName"];
                            dueDate=resultJson[key]["dueDate"];
                            remainderCount=resultJson[key]["remainderCount"];
                            completionStatus=resultJson[key]["completionStatus"];
                            recepientsCount=resultJson[key]["recipentsCount"];
                            createdByNumber=resultJson[key]["createdByRegId"];
                            completionCount=resultJson[key]["completionCount"];

                            if(resultJson[key]["myCompletionStatus"])
                            {
                            }
                            else
                            {
                                myCompletionStatus="notCompleted";
                                dataItems.push(
                                {
                                    "createdBy":createdBy , 
                                    "taskName":taskName, 
                                    "dueDate": dueDate,
                                    "remainderCount": remainderCount, 
                                    "completionStatus": completionCount+"/"+recepientsCount,
                                    "key":key,
                                    "myCompletionStatus":myCompletionStatus,
                                    "createdByNumber":createdByNumber,
                                },
                            );
                            }
                            

                        
                        }
                    }
 
                }
            // for  completed items
            for(var key in resultJson)
                {
                    if(resultJson[key]==null || resultJson[key]=="null"){}
                    else{
                       
                        var createdBy;
                        var taskName;
                        var dueDate;
                        var remainderCount;
                        var completionStatus;
                        var myCompletionStatus;
                        var recepientsCount;
                        var createdByNumber;
                        var completionCount;
            
                        if(resultJson[key]["createdBy"]==null && 
                            resultJson[key]["taskName"]==null  && 
                           resultJson[key]["dueDate"]==null && 
                        resultJson[key]["remainderCount"]==null && 
                        resultJson[key]["completionStatus"]==null &&
                       resultJson[key]["myCompletionStatus"]==null &&
                        resultJson[key]["recipentsCount"]==null &&
                        resultJson[key]["createdByRegId"]==null &&
                        resultJson[key]["completionCount"]==null 
                         )
                        { 
                        }
                        else
                        {

                            createdBy=resultJson[key]["createdBy"];
                            taskName=resultJson[key]["taskName"];
                            dueDate=resultJson[key]["dueDate"];
                            remainderCount=resultJson[key]["remainderCount"];
                            completionStatus=resultJson[key]["completionStatus"];
                            recepientsCount=resultJson[key]["recipentsCount"];
                            createdByNumber=resultJson[key]["createdByRegId"];
                            completionCount=resultJson[key]["completionCount"];

                            if(resultJson[key]["myCompletionStatus"])
                            {
                                myCompletionStatus="completed";
                                dataItems.push(
                                {
                                    "createdBy":createdBy , 
                                    "taskName":taskName, 
                                    "dueDate": dueDate,
                                    "remainderCount": remainderCount, 
                                     "completionStatus": completionCount+"/"+recepientsCount,
                                    "key":key,
                                    "myCompletionStatus":myCompletionStatus,
                                    "createdByNumber":createdByNumber
                                },
                            );
                            }
                            else
                            {
                            }
                            

                        
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
            },
            
        }
    );
                            

    return dataItems;
    }
    getOtherTaskDetails()
    {
        var dataItems=new ObservableArray([]);
        

        var onQueryEvent = function(result)
        {
        
        
        if (!result.error) {
         
            var resultJson=result.value;
            //for not comepleted items
                for(var key in resultJson)
                {
                    if(resultJson[key]==null || resultJson[key]=="null"){}
                    else{
                       
                        var createdBy;
                        var taskName;
                        var dueDate;
                        var remainderCount;
                        var completionStatus;
                        var myCompletionStatus;
                        var deletionCount;
                        var recepientsCount;
                        var completionCount;
            
                        if(resultJson[key]["createdBy"]==null && 
                            resultJson[key]["taskName"]==null  && 
                           resultJson[key]["dueDate"]==null && 
                        resultJson[key]["remainderCount"]==null && 
                        resultJson[key]["completionStatus"]==null &&
                        resultJson[key]["myCompletionStatus"]==null &&
                        resultJson[key]["deletionCount"]==null && 
                        resultJson[key]["recipentsCount"]==null  &&
                        resultJson[key]["completionCount"]==null
                        
                        )
                        { 
                        }
                        else
                        {

                            createdBy=resultJson[key]["createdBy"];
                            taskName=resultJson[key]["taskName"];
                            dueDate=resultJson[key]["dueDate"];
                            remainderCount=resultJson[key]["remainderCount"];
                            completionStatus=resultJson[key]["completionStatus"];
                            deletionCount=resultJson[key]["deletionCount"];
                            recepientsCount=resultJson[key]["recipentsCount"];
                            completionCount=resultJson[key]["completionCount"];

                            if(resultJson[key]["myCompletionStatus"])
                            {
                            }
                            else
                            {
                                myCompletionStatus="notCompleted";
                                dataItems.push(
                                {
                                    "createdBy":createdBy , 
                                    "taskName":taskName, 
                                    "dueDate": dueDate,
                                    "remainderCount": remainderCount, 
                                    "completionStatus": completionCount+"/"+recepientsCount,
                                    "key":key,
                                    "myCompletionStatus":myCompletionStatus,
                                    "deletionCount":deletionCount
                                },
                            );
                            }
                            

                        
                        }
                    }
 
                }
            // for  completed items
            for(var key in resultJson)
                {
                    if(resultJson[key]==null || resultJson[key]=="null"){}
                    else{
                       
                        var createdBy;
                        var taskName;
                        var dueDate;
                        var remainderCount;
                        var completionStatus;
                        var myCompletionStatus;
                        var deletionCount;
                        var recepientsCount;
                        var completionCount;
            
                        if(resultJson[key]["createdBy"]==null && 
                            resultJson[key]["taskName"]==null  && 
                           resultJson[key]["dueDate"]==null && 
                        resultJson[key]["remainderCount"]==null && 
                        resultJson[key]["completionStatus"]==null &&
                        resultJson[key]["myCompletionStatus"]==null &&
                       resultJson[key]["deletionCount"]==null && 
                        resultJson[key]["recipentsCount"]==null && 
                        resultJson[key]["completionCount"]==null 
                        )
                        { 
                        }
                        else
                        {

                            createdBy=resultJson[key]["createdBy"];
                            taskName=resultJson[key]["taskName"];
                            dueDate=resultJson[key]["dueDate"];
                            remainderCount=resultJson[key]["remainderCount"];
                            completionStatus=resultJson[key]["completionStatus"];
                            deletionCount=resultJson[key]["deletionCount"];
                             recepientsCount=resultJson[key]["recipentsCount"];
                             recepientsCount=resultJson[key]["completionCount"];

                            if(resultJson[key]["myCompletionStatus"])
                            {
                                myCompletionStatus="completed";
                                dataItems.push(
                                {
                                    "createdBy":createdBy , 
                                    "taskName":taskName, 
                                    "dueDate": dueDate,
                                    "remainderCount": remainderCount, 
                                    "completionStatus": completionCount+"/"+recepientsCount,
                                    "key":key,
                                    "myCompletionStatus":myCompletionStatus,
                                    "deletionCount":deletionCount
                                },
                            );
                            }
                            else
                            {
                            }
                            

                        
                        }
                    }
 
                }
                
            
        }
        
    };

    var devicePhoneNumber=getString("devicePhoneNumber");
    console.log("Device Phone Number----"+devicePhoneNumber);
    firebase.query(
        onQueryEvent,
       '/OtherTaskDetails/'+devicePhoneNumber,
        {
            
            singleEvent: true,
            
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
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
               // console.log("Value contact list------: " + JSON.stringify(result.value));
                var resultJson=result.value;
                for(var key in resultJson)
                {
                    console.log('key:::'+key);
                    if(resultJson[key]==null || resultJson[key]=="null")
                    {
                        //console.log("key is  null---");
                        
                    }
                    else
                    {
                        //console.log("key is not  null---");

                        if(resultJson[key]["fName"]==null && resultJson[key]["lName"]==null)
                        {
                            //console.log("Value is null");

                        }
                        else
                        {
                            //console.log("Value is not null");
                            contactList.push({

                                "name":resultJson[key]["fName"]+" "+resultJson[key]["lName"],
                                "number":key,
                                "checkBox":"\u{f096}",
                                "selected":false

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

    

 