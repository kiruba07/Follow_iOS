import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../service/user";
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

@Component({
  selector: "my-app",
  templateUrl: "pages/createtask/createtask.html",
  styleUrls: ["pages/createtask/createtask-common.css", "pages/createtask/createtask.css"]
})
export class CreateTaskComponent {
  // Your TypeScript logic goes here
  user: User
  constructor(private router: Router){

    this.user = new User();
   
  }
  public assignTask() 
  {

    var x=this;
    var taskName=this.user.taskName;
    var category=this.user.category;
    var dateTime=this.user.dateTime;
    var assignee=this.user.assignee;

    console.log("Task name---"+taskName);
    console.log("Category---"+category);
    console.log("Date time---"+dateTime);
    console.log("Assignee---"+assignee);

    
    var onQueryEvent = function(result) 
            {
            if (!result.error) {
                //console.log("Event type: " + result.type);
                //console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value));
                
                if(JSON.stringify(result.value)=="null")
                {// create MyTaskDetails,create regKey,create task id,insert task details
                    console.log("Create new table::");
                    console.log("This---"+this);
                    x.enterDataIntoMyTaskDetails("1",taskName,category,dateTime,assignee,x);
                }
                else{
                    console.log("Enter details in the existing table::");
                    console.log("This---"+this);
                    x.enterDataIntoMyTaskDetails("null",taskName,category,dateTime,assignee,x);
                }
            }
            
        };
        firebase.query(
            onQueryEvent,
        '/MyTaskDetails/',
            {
                // set this to true if you want to check if the value exists or just want the event to fire once
                // default false, so it listens continuously
                singleEvent: true,
                // order by company.country
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'taskName' // mandatory when type is 'child'
                },
            }
        );

  }
    
    public enterDataIntoMyTaskDetails(id,taskName,category,dateTime,assigneeName,x)
    {
        /** temporary values assigned need to chagne later */
        var recipentsCount=1;
        var remainderCount=0;
        var completionCount=0;
        var myCompletionStatus=0;
        var idTemp;
        var assigneesSelected=["1234","7777"];
        var devicePhoneNumber=getString("devicePhoneNumber");
        var deviceRegisteredUserName=getString("deviceRegisteredUserName");
        /** temporary values assigned need to chagne later */
        for(var i=0;i<assigneesSelected.length;i++)
        {
            if(id=="1")
            {
                firebase.setValue(
                '/MyTaskDetails/'+assigneesSelected[i]+'/'+"1",
                {
                    'taskName':taskName,
                    'category':category,
                    'dueDate':dateTime,
                    'recipentsCount':recipentsCount,
                    'remainderCount':remainderCount,
                    'createdBy':deviceRegisteredUserName,
                    'createdByRegId':devicePhoneNumber,
                    'completionCount':completionCount,
                    'myCompletionStatus':myCompletionStatus,
                }
                ).then(
                  (res)=>{
                    console.log("Task has been saved successfully in my task details first time---"+res);
                    this.router.navigate([
                              '/mainfragment',
                              { outlets: { mytaskoutlet: ['mytask'] } }
                            ]);
                  },(res)=>{
                    console.log("Problem in saving my task details---"+res);
                  });
            }
            else
            {
                console.log('entry already there need to get last count value')
                this.getLastCountAndEnterDetails(assigneesSelected[i],recipentsCount,remainderCount,deviceRegisteredUserName,devicePhoneNumber,completionCount,myCompletionStatus,taskName,category,dateTime,x);

            
            }
        
        }
    } 
    public getLastCountAndEnterDetails(selectedAssignee,recipentsCount,remainderCount,deviceRegisteredUserName,devicePhoneNumber,completionCount,myCompletionStatus,taskName,category,dateTime,x)
    {

      var onQueryEvent = function(result)
        {
            var lastKey=0;
            if (!result.error)
            {
                //console.log("Event type: " + result.type);
                //console.log("Key: " + JSON.stringify(result.key));
                //console.log("Value: " + result.value);
                //console.log("Value next ::::;: " + JSON.stringify(result.value));
                var resultJson=result.value;
                for(var key in resultJson)
                {
                    console.log('key:::'+key);
                    
                    lastKey=parseInt(key);
                    console.log('lastKey ::'+lastKey);

                    
                }
                lastKey=lastKey+1;
                console.log('lastKey ::'+lastKey);
            firebase.setValue(
            '/MyTaskDetails/'+selectedAssignee+'/'+lastKey,
            {
                    'taskName':taskName,
                    'category':category,
                    'dueDate':dateTime,
                    'recipentsCount':recipentsCount,
                    'remainderCount':remainderCount,
                    'createdBy':deviceRegisteredUserName,
                    'createdByRegId':devicePhoneNumber,
                    'completionCount':completionCount,
                    'myCompletionStatus':myCompletionStatus,
            }).then(
                  (res)=>{
                    console.log("Task has been saved successfully in my task details---"+res);
                    x.router.navigate([
                              '/mainfragment',
                              { outlets: { mytaskoutlet: ['mytask'] } }
                            ]);
                  },(res)=>{
                    console.log("Problem in saving my task details---"+res);
                  });
            
                
        }
            
        };
        firebase.query(
            onQueryEvent,
        '/MyTaskDetails/'+selectedAssignee+'/',
            {
                // set this to true if you want to check if the value exists or just want the event to fire once
                // default false, so it listens continuously
                singleEvent: true,
                // order by company.country
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                //    value: 'taskName' // mandatory when type is 'child'
                },
            }
        );
    }


}
