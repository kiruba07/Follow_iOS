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
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewItems } from "../../service/listviewitems";
import { Observable } from "data/observable";
import { ListViewEventData, RadListView } from "nativescript-telerik-ui-pro/listview";
import { DatePicker } from "ui/date-picker";
import {TextField} from "ui/text-field";
import { Page } from "ui/page";

import { RouterExtensions } from "nativescript-angular/router";


@Component({
  selector: "my-app",
  templateUrl: "pages/createtask/createtask.html",
  styleUrls: ["pages/createtask/createtask-common.css", "pages/createtask/createtask.css"]
})
export class CreateTaskComponent
{
  // Your TypeScript logic goes here
   user: User
   contactList=new ObservableArray([]);
   selectedItems:string[]=[];
   listViewItems:ListViewItems;
    observable:Observable
    checkTry;
    datePickerView:string;
    buttonView:string;
    
    show:string="";
    day:string="";
    year:string="";
    moth:string="";
    datePickervalue:string;
    taskField;
    today=new Date();
    constructor(private router: Router,private page: Page,private routerExtensions: RouterExtensions)
    {
        this.user = new User();
        this.observable= new Observable;
        
        this.listViewItems=new ListViewItems;
        this.contactList=this.listViewItems.getContactList();
        this.show="collapse";
        this.datePickerView="collapse";
        this.buttonView="visible";
        this.checkTry="check";
        
    }

     public goBack() {
         console.log("Back tapped");
        this.routerExtensions.backToPreviousPage();
    }

    hideDatePicker(args){
        console.log("tapped---");
        this.datePickerView = 'collapse';
        this.buttonView="visible";
    
    }
    showDatePicker(args){
       if(this.datePickerView=="visible"){
            this.datePickerView = 'collapse';
            this.buttonView="visible";
        }
        else{
            this.datePickerView = 'visible';
            this.buttonView="collapse";
        }
        this.hideSoftKeypad();

        
    }
    hideSoftKeypad(){
        var layout = this.page;
        var categoryField = layout.getViewById("category");
        var taskField = layout.getViewById("taskName");
        if (categoryField.ios || taskField.ios)
        {
            categoryField.ios.endEditing(true);
            taskField.ios.endEditing(true);
        }
         else if (categoryField.android || taskField.android )
        {
            categoryField.android.clearFocus();
            taskField.android.clearFocus();
        }
    }
    selectAssignee()
    {
        
        if(this.show=="visible"){
            this.show = 'collapse';
        }
        else{
            this.show = 'visible';
        }
        this.datePickerView="collapse";
        this.buttonView="visible";
        this.hideSoftKeypad();
        
    }
     onPickerLoaded(args) {
        let datePicker = <DatePicker>args.object;

        
         let dd= this.today.getDay();
        let  mm = this.today.getMonth()+1; //January is 0!
        let yyyy = this.today.getFullYear();

        console.log("Current Date ====="+dd);
        console.log("Current month ====="+mm);
        console.log("Current year ====="+yyyy);

        datePicker.year = yyyy;
         datePicker.month =mm;
        //datePicker.day =dd;

        datePicker.minDate = new Date(1975, 0, 29);
        datePicker.maxDate = new Date(2045, 4, 12);

         this.datePickervalue="Select End date";
    }

    onDateChanged(args) {
        
        let dateValue=<DatePicker>args.object;
        this.datePickervalue=dateValue.day+"/"+dateValue.month+"/"+dateValue.year;
      
    }    
    public itemTap(item)
    {
        //console.log("Item tap=-========"+item.name);
        if(item.selected)
        {
            item.checkBox="\u{f096}";

            for(var i=0;i<this.selectedItems.length;i++)
            {
                var curItem=this.selectedItems[i];
                console.log('cur item----'+curItem);
                if(curItem==item.number)
                {
                    console.log('index ::::::'+i);
                    this.selectedItems.splice(i,1);
                }
            }


            //this.selectedItems.splice(item.number,1);
            console.log("Selected items after slice======"+this.selectedItems);

        }
        else{
             item.checkBox="\u{f046}";
            this.selectedItems.push(item.number);
        }

        item.selected=!item.selected;
        console.log("Selected items======"+this.selectedItems);
        



    }
   
    

  public assignTask() 
  {

    var x=this;
    var taskName=this.user.taskName;
    var category=this.user.category;
    var dateTime=this.user.dateTime;
   // var assignee=this.user.assignee;

    // console.log("Task name---"+taskName);
    // console.log("Category---"+category);
     //console.log("Date time---"+dateTime);
    //console.log("Assignee---"+assignee);

    //check the last key in TaskDetails table
    if(taskName==null || category==null || this.selectedItems.length<1 || dateTime=="Select End date")
    {
    console.log("Empty =====");
    }
    else
    {
        var getLastKeyInTasKDetails = function(result) 
        {

                if (!result.error) 
                {
                    
                    if(JSON.stringify(result.value)=="null")
                    {
                        
                        x.enterDataIntoTaskDetails("1",taskName,category,dateTime,x);
                    }   
                    else
                    {
                    
                        x.enterDataIntoTaskDetails("null",taskName,category,dateTime,x);
                    }
                }
                
            };
        firebase.query(
                    getLastKeyInTasKDetails,
                '/TaskDetails/',
                    {
                        
                        singleEvent: true,
                    
                        orderBy: {
                            type: firebase.QueryOrderByType.CHILD,
                            value: 'taskName' // mandatory when type is 'child'
                        },
                    }
                );
    }
    

  }
    public enterDataIntoTaskDetails(id,taskName,category,dateTime,x)
    {
        var y=this;
         if(id=="1")
            {
                firebase.setValue(
                '/TaskDetails/'+id,
                {
                    'taskName':taskName,
                    'category':category,
                    'dueDate':dateTime,
                    
                }
                ).then(
                  (res)=>{
                    console.log("Task details has been saved successfully in task details first time---"+res);
                    this.enterDataIntoMyTaskDetails(id,taskName,category,dateTime,x);
                    this.enterDataIntoOtherTaskDetails(id,taskName,category,dateTime,x);
                  },(res)=>{
                    console.log("Problem in saving task details---"+res);
                  });
            }
            else
            {
                console.log('entry already there need to get last count value')
                y.getLastCountAndEnterDetaisInTaskDetailsPage(taskName,category,dateTime,y);

            
            }
    }
    public getLastCountAndEnterDetaisInTaskDetailsPage(taskName,category,dateTime,x)
    {
        var y=this;
        var onQueryEvent = function(result)
        {
            var lastKey=0;
            if (!result.error)
            {
                var resultJson=result.value;
                for(var key in resultJson)
                {
                    
                    lastKey=parseInt(key);
                   
                }
                lastKey=lastKey+1;
               
            firebase.setValue(
            '/TaskDetails/'+lastKey,
            {
                    'taskName':taskName,
                    'category':category,
                    'dueDate':dateTime,
            }).then(
                  (res)=>{
                    console.log("Task has been saved successfully in task details---"+res);
                     y.enterDataIntoMyTaskDetails(lastKey,taskName,category,dateTime,y);
                      y.enterDataIntoOtherTaskDetails(lastKey,taskName,category,dateTime,y);
                  },(res)=>{
                    console.log("Problem in saving task details---"+res);
                  });
            
                
        }
            
        };
        firebase.query(
            onQueryEvent,
        '/TaskDetails/',
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                },
            }
        );
    }
    
    public enterDataIntoMyTaskDetails(id,taskName,category,dateTime,x)
    {
        var y=this;
        /** temporary values assigned need to chagne later */
        var recipentsCount=this.selectedItems.length;
        var remainderCount=0;
        var completionCount=0;
        var myCompletionStatus=false;
        var idTemp;
       
        var devicePhoneNumber=getString("devicePhoneNumber");
        var deviceRegisteredUserName=getString("deviceRegisteredUserName");
       
        
        for(var i=0;i<this.selectedItems.length;i++)
        {
            
            //console.log("i value items=====i========="+i+"======"+this.selectedItems[i]);

            if(id=="1")
            {
                firebase.setValue(
                '/MyTaskDetails/'+this.selectedItems[i]+'/'+"1",
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
                   // console.log("Task has been saved successfully in my task details first time---"+res);
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
                //console.log("Else   i value items=====i========="+i+"======"+this.selectedItems[i]);

            firebase.setValue(
            '/MyTaskDetails/'+this.selectedItems[i]+'/'+id,
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
                    // console.log("Task has been saved successfully in my task details-===i==--"+i+"==="+res);
                    // console.log("Length===i=="+i+"====="+(y.selectedItems.length-1));
                    // if(i==(y.selectedItems.length-1))
                    // {
                        console.log("===IF==");
                    y.router.navigate([
                              '/mainfragment',
                              { outlets: { mytaskoutlet: ['mytask'] } }
                            ]);
                    // }
                    // else{
                    //     console.log("===Else==");
                    // }
                  },(res)=>{
                    console.log("Problem in saving my task details---"+res);
                  });

               // this.getLastCountAndEnterDetails(i,this.selectedItems.length,this.selectedItems[i],recipentsCount,remainderCount,deviceRegisteredUserName,devicePhoneNumber,completionCount,myCompletionStatus,taskName,category,dateTime,x),i;

            
            }
        
        }
    } 
    public enterDataIntoOtherTaskDetails(id,taskName,category,dateTime,x)
    {
        var y=this;
        /** temporary values assigned need to chagne later */
        var recipentsCount=this.selectedItems.length;
        var remainderCount=0;
        var completionCount=0;
        var myCompletionStatus=false;
        var idTemp;
       
        var devicePhoneNumber=getString("devicePhoneNumber");
        var deviceRegisteredUserName=getString("deviceRegisteredUserName");
        var deletionCount=0;
       
        
        // for(var i=0;i<this.selectedItems.length;i++)
        // {
            
            //console.log("i value items=====i========="+i+"======"+this.selectedItems[i]);

            if(id=="1")
            {
                firebase.setValue(
                '/OtherTaskDetails/'+devicePhoneNumber+'/'+"1",
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
                    'deletionCount':deletionCount
                }
                ).then(
                  (res)=>{
                    console.log("Task has been saved successfully in other task details first time---"+res);
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
                //console.log("Else   i value items=====i========="+i+"======"+this.selectedItems[i]);

            firebase.setValue(
            '/OtherTaskDetails/'+devicePhoneNumber+'/'+id,
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
                    'deletionCount':deletionCount
            }).then(
                  (res)=>{
                    console.log("Task has been saved successfully in other task details-========"+res);
                    // console.log("Length===i=="+i+"====="+(y.selectedItems.length-1));
                    // if(i==(y.selectedItems.length-1))
                    // {
                        console.log("===IF==");
                    // y.router.navigate([
                    //           '/mainfragment',
                    //           { outlets: { mytaskoutlet: ['mytask'] } }
                    //         ]);
                    // }
                    // else{
                    //     console.log("===Else==");
                    // }
                  },(res)=>{
                    console.log("Problem in saving my task details---"+res);
                  });

               // this.getLastCountAndEnterDetails(i,this.selectedItems.length,this.selectedItems[i],recipentsCount,remainderCount,deviceRegisteredUserName,devicePhoneNumber,completionCount,myCompletionStatus,taskName,category,dateTime,x),i;

            
            }
        
        //}
    }
    public getLastCountAndEnterDetails(i,seledtedItemsLength,selectedAssignee,recipentsCount,remainderCount,deviceRegisteredUserName,devicePhoneNumber,completionCount,myCompletionStatus,taskName,category,dateTime,x)
    {

      var onQueryEvent = function(result)
        {
            var lastKey=0;
            if (!result.error)
            {
                var resultJson=result.value;
                for(var key in resultJson)
                {
                    
                    
                    lastKey=parseInt(key);
                   

                    
                }
                lastKey=lastKey+1;
               
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
                    if(i==seledtedItemsLength-1){
                    x.router.navigate([
                              '/mainfragment',
                              { outlets: { mytaskoutlet: ['mytask'] } }
                            ]);
                    }
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
