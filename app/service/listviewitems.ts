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

    getCategoryList()
    {

        let categoryListItems=new ObservableArray([]);
        var onQueryEvent = function(result)
        {
        
        if (!result.error) {
         
            var resultJson=result.value;
            
                for(var key in resultJson)
                {
                    
                    if(resultJson[key]==null || resultJson[key]=="null"){}
                    else{
                        console.log("resultJson[key]==="+resultJson[key]);
                       
                        let category;
                        category=resultJson[key];
                        categoryListItems.push(
                        {
                             "category":category ,
                        },
                        );         
                    }
 
                }
                console.log("Category List=========="+categoryListItems);

            }
        };
        let devicePhoneNumber=getString("devicePhoneNumber");
        console.log("Device Phone Number----"+devicePhoneNumber);
        firebase.query(
            onQueryEvent,
           '/DeviceDetails/'+devicePhoneNumber+'/categoryList/list/',
            {
                
                singleEvent: true,
                
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                },
                
            }
        );
                                
       
        return categoryListItems;
    }
    getGroupList(){

        let groupListItems=new ObservableArray([]);
        var onQueryEvent = function(result)
        {
        
        if (!result.error) {
         
            var resultJson=result.value;
            
                for(var key in resultJson)
                {
                    
                    if(key==null || key=="null"){}
                    else{
                        console.log("[key]==="+key);
                        
                       
                        let group;
                        group=key;
                        groupListItems.push(
                        {
                             "group":group ,
                        },
                        );         
                    }
 
                }
                console.log("Group List=========="+groupListItems);

            }
        };
        let devicePhoneNumber=getString("devicePhoneNumber");
        console.log("Device Phone Number----"+devicePhoneNumber);
        firebase.query(
            onQueryEvent,
           '/DeviceDetails/'+devicePhoneNumber+'/groupList/',
            {
                
                singleEvent: true,
                
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                },
                
            }
        );
                                
       
        return groupListItems;
    }
    getCategoryListForCreateTask()
    {

        let categoryListItems:string[]=[];
        var onQueryEvent = function(result)
        {
        
        if (!result.error) {
         
            var resultJson=result.value;
            
                for(var key in resultJson)
                {
                    
                    if(resultJson[key]==null || resultJson[key]=="null"){}
                    else{
                        console.log("resultJson[key]==="+resultJson[key]);
                       
                        let category;
                        category=resultJson[key];
                        categoryListItems.push(category);       
                    }
 
                }
                console.log("Category List==== create task======"+categoryListItems);

            }
        };
        let devicePhoneNumber=getString("devicePhoneNumber");
        console.log("Device Phone Number----"+devicePhoneNumber);
        firebase.query(
            onQueryEvent,
           '/DeviceDetails/'+devicePhoneNumber+'/categoryList/list/',
            {
                
                singleEvent: true,
                
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                },
                
            }
        );
                                
       
        return categoryListItems;
    }
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
                        var createdByToken;
                        var assigneeNumber;
            
                        
                        if(resultJson[key]["createdBy"]==null && 
                            resultJson[key]["taskName"]==null  && 
                           resultJson[key]["dueDate"]==null && 
                        resultJson[key]["remainderCount"]==null && 
                        resultJson[key]["completionStatus"]==null &&
                        resultJson[key]["myCompletionStatus"]==null &&
                        resultJson[key]["recipentsCount"]==null &&
                        resultJson[key]["createdByRegId"]==null &&
                        resultJson[key]["completionCount"]==null &&
                        resultJson[key]["createdByToken"]==null &&
                        resultJson[key]["assigneeName"]==null
                    
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
                            createdByToken=resultJson[key]["createdByToken"];
                            assigneeNumber=resultJson[key]["assigneeName"];

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
                                    "createdByToken":createdByToken,
                                    "assigneeNumber":assigneeNumber,
                                    "completed":false
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
                        var createdByToken;
                        var assigneeNumber;

                        
                        if(resultJson[key]["createdBy"]==null && 
                            resultJson[key]["taskName"]==null  && 
                           resultJson[key]["dueDate"]==null && 
                        resultJson[key]["remainderCount"]==null && 
                        resultJson[key]["completionStatus"]==null &&
                       resultJson[key]["myCompletionStatus"]==null &&
                        resultJson[key]["recipentsCount"]==null &&
                        resultJson[key]["createdByRegId"]==null &&
                        resultJson[key]["completionCount"]==null &&
                        resultJson[key]["createdByToken"]==null &&
                        resultJson[key]["assigneeName"]==null
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
                            createdByToken=resultJson[key]["createdByToken"];
                            assigneeNumber=resultJson[key]["assigneeName"];

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
                                    "createdByNumber":createdByNumber,
                                    "createdByToken":createdByToken,
                                    "assigneeNumber":assigneeNumber,
                                    "completed":true
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
    getOtherTaskDetailsDetailedDetails(key)
    {
            var detailedDataItems=new ObservableArray([]);
            var onQueryEvent = function(result)
            {
            

            if (!result.error)
            {
                
            
                var resultJson=result.value;
                
                    for(var key in resultJson)
                    {
                       
                        if(resultJson[key]==null || resultJson[key]=="null"){}
                        else
                        {
                        
                            // console.log("ELSE===");
                            // console.log("Assignee Name==="+resultJson[key]["assigneeName"]);
                            // console.log("deletionCount==="+resultJson[key]["deletionCount"]);
                            // console.log("remainderCount==="+resultJson[key]["remainderCount"]);

                            if(resultJson[key]["assigneeName"]==null && 
                                resultJson[key]["deletionCount"]==null  && 
                            resultJson[key]["remainderCount"]==null &&
                            resultJson[key]["completionStatus"]==null &&
                            resultJson[key]["deviceToken"]==null &&
                            resultJson[key]["taskName"]==null &&
                            resultJson[key]["createdBy"]==null){}
                            else
                            {    
                                //   console.log("ELSE===");
                                
                                    // for(var key1 in resultJson[key]["AssigneeDetails"])
                                    // {
                                        // console.log("Detailed Key==="+key1);
                                        // console.log("aName=="+resultJson[key]["AssigneeDetails"][key1]["assigneeName"]);
                                        // console.log("dCount=="+resultJson[key]["AssigneeDetails"][key1]["deletionCount"]);
                                        // console.log("rCount=="+resultJson[key]["AssigneeDetails"][key1]["remainderCount"]);
                                        let deletionStatus:number=resultJson[key]["deletionCount"];
                                        let completionStatus:boolean=resultJson[key]["completionStatus"];
                                        let visibilityDelete:string;
                                        let visibilityComplete:string;

                                        if(deletionStatus>0){
                                            visibilityDelete="visible";
                                        }
                                        else{
                                            visibilityDelete="collapsed";
                                        }
                                        if(completionStatus){
                                            visibilityComplete="visible";
                                        }
                                        else{
                                            visibilityComplete="collapsed";
                                        }
                                        detailedDataItems.push(
                                        {
                                                "assigneeName":resultJson[key]["assigneeName"] , 
                                                "remainderCount":resultJson[key]["remainderCount"], 
                                                "deletionCount": resultJson[key]["deletionCount"],
                                                "deletionStatus":visibilityDelete,
                                                "completionStatusFlag":visibilityComplete,
                                                "assigneeNumber": key, 
                                                "completionStatus":resultJson[key]["completionStatus"],
                                                "deviceToken":resultJson[key]["deviceToken"],
                                                "taskName":resultJson[key]["taskName"],
                                                "createdBy":resultJson[key]["createdBy"]

                                            },
                                        );
                                        // console.log("For loop==="+detailedDataItems);
                                    // }
                                    
                               
                            
                            }
                        }
    
                    }
            } 
        };

        var devicePhoneNumber=getString("devicePhoneNumber");
        console.log("Device Phone Number----"+devicePhoneNumber);
        // console.log("Device Phone Number--Key--"+key);
        firebase.query(
            onQueryEvent,
        '/OtherTaskDetails/'+devicePhoneNumber+'/'+key+'/AssigneeDetails/',
            {
                
                singleEvent: true,
                
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                },
                
            }
        );
        //console.log("Detailed Items Return==="+detailedDataItems);
        return detailedDataItems;
    }
    getOtherTaskDetails()
    {
        var dataItems=new ObservableArray([]);
        var x=this;

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
                                    "deletionCount":deletionCount,
                                    "detailedViewkey":"taskDetailedView"+key
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
                                    "deletionCount":deletionCount,
                                     "detailedViewkey":"taskDetailedView"+key
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
    console.log("Device Phone Number---othertask=====-"+devicePhoneNumber);
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
            
            if (!result.error)
            {
                
                var resultJson=result.value;
                for(var key in resultJson)
                {
                    console.log('key:::'+key);
                    if(resultJson[key]==null || resultJson[key]=="null")
                    {
                        
                        
                    }
                    else
                    {
                        

                        if(resultJson[key]["fName"]==null && resultJson[key]["lName"]==null)
                        {
                            

                        }
                        else
                        {
                            //console.log("Value is not null");
                            contactList.push({

                                "name":resultJson[key]["fName"]+" "+resultJson[key]["lName"],
                                "number":key,
                                "checkBox":"\u{f096}",
                                "selected":false,
                                "nameLabel":resultJson[key]["fName"].charAt(0)+resultJson[key]["lName"].charAt(0),
                                "deviceToken":resultJson[key]["deviceToken"],

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

    

 