import { Component, OnInit, ViewChild } from "@angular/core";
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
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { RouterExtensions } from "nativescript-angular/router";
import { MyHttpPostService } from "../../service/http-post.services";

@Component({
  selector: "my-app",
  providers: [MyHttpPostService],
  templateUrl: "pages/createtask/createtask.html",
  styleUrls: ["pages/createtask/createtask-common.css", "pages/createtask/createtask.css"]
})
export class CreateTaskComponent implements OnInit

{
  // Your TypeScript logic goes here
   user: User
   contactList=new ObservableArray([]);
   contactGroupList=new ObservableArray([]);
   selectedItems:string[]=[];
   selectedItemsName:string[]=[];
   selectedItemsToken:string[]=[];
   selectedItemsGroupArray:string[]=[];
   selectedItemsIndividualArray:string[]=[];
   categoryListItems=new ObservableArray([]);
   categoryListArray:string[]=[];
   listViewItems:ListViewItems;
    observable:Observable
    checkTry;
    datePickerView:string;
    buttonView:string;
    selectedCategory:string;
    
    show:string="";
    day:string="";
    year:string="";
    moth:string="";
    datePickervalue:string;
    taskField;
    today=new Date();
    pageTitle;
    constructor(private router: Router,private page: Page,private routerExtensions: RouterExtensions,private myPostService: MyHttpPostService)
    {
        this.user = new User();
        this.observable= new Observable;
        this.selectedCategory="";
        
        this.listViewItems=new ListViewItems;
       // this.contactList=this.listViewItems.getContactList();
        this.contactList=this.listViewItems.getContactListWithGroup();

        this.show="collapse";
        this.datePickerView="collapse";
        this.buttonView="visible";
        this.checkTry="check";
        this.pageTitle="Create Task";
        
    }
    ngOnInit() {
        console.log("onit");
        this.categoryListArray=this.listViewItems.getCategoryListForCreateTask();
        this.categoryListArray.push("Default");
        // for(let i=0;i<this.categoryListItems.length;i++)
        // {
        //     console.log("this.categoryListItems.getItem(i).category===="+this.categoryListItems.getItem(i).category);
        //     this.categoryListArray.push(this.categoryListItems.getItem(i).category);
          
        // }
        // console.log("Category List Array========"+this.categoryListArray);
    }


     public goBack() {
         console.log("Back tapped");
        this.routerExtensions.backToPreviousPage();
    }
    public onchange(args: SelectedIndexChangedEventData)
    {

        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
        let newIndex:number=args.newIndex;
        this.selectedCategory=this.categoryListArray[newIndex];
        console.log("selectedCategory++++++"+this.selectedCategory);


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
    cancel(){
        this.router.navigate([
                              '/mainfragment',
                              { outlets: { mytaskoutlet: ['mytask'] } }
                            ]);
    }
     onPickerLoaded(args) {
        let datePicker = <DatePicker>args.object;

        
         let dd= this.today.getDay();
        let  mm = this.today.getMonth()+1; //January is 0!
        let yyyy = this.today.getFullYear();

        // console.log("Current Date ====="+dd);
        // console.log("Current month ====="+mm);
        // console.log("Current year ====="+yyyy);

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
        
        let currentItemArray:string[]=[];
        if(item.selected)
        {
            item.checkBox="\u{f096}";

            //new code starts
            for(let i=0;i<item.number.split(",").length;i++)
            {
                if(item.number.split(",")[i].split("G")[1])
                {
                    //this.selectedItems.push(item.number.split(",")[i].split("G")[1]);
                    
                   // currentItemArray.push(item.number.split(",")[i].split("G")[1]);


                        for(var j=0;j<this.selectedItems.length;j++)
                        {
                            var loopNumber=this.selectedItems[j];
                            
                            //console.log('cur item----'+loopNumber);
                            
                            if(this.selectedItemsIndividualArray.indexOf(loopNumber)>-1){
                                this.selectedItemsGroupArray.splice(j,1);
                            }
                            else
                            if(loopNumber==item.number.split(",")[i].split("G")[1])
                            {
                                this.selectedItems.splice(j,1);
                                this.selectedItemsName.splice(j,1);
                                this.selectedItemsToken.splice(j,1);

                                this.selectedItemsGroupArray.splice(j,1);
                                
                            }
                        }   
                }
                else
                {
                    
                    //this.selectedItems.push(item.number.split(",")[i]);
                   // currentItemArray.push(item.number.split(",")[i]);
                        for(var j=0;j<this.selectedItems.length;j++)
                        {
                            var loopNumber=this.selectedItems[j];
                            
                            //console.log('cur item----'+loopNumber);
                            if(this.selectedItemsGroupArray.indexOf(loopNumber)>-1){
                                this.selectedItemsIndividualArray.splice(j,1);
                            }
                            else
                            if(loopNumber==item.number)
                            {
                                this.selectedItems.splice(j,1);
                                this.selectedItemsName.splice(j,1);
                                this.selectedItemsToken.splice(j,1);
                              
                                this.selectedItemsIndividualArray.splice(j,1);

                                
                            }
                        } 

                }
                
            }
            //new code ends
            


            // original code starts
            // for(var i=0;i<this.selectedItems.length;i++)
            // {
            //     var loopNumber=this.selectedItems[i];
            //     //new code starts
            //     console.log('cur item----'+loopNumber);
            //     if(currentItemArray.indexOf(loopNumber) > -1){
            //         console.log("IF");
            //     }
            //     else{
            //         console.log("ELSE");
            //     }
            //     //new code ends

            //     if(loopNumber==item.number)
            //     {
            //         this.selectedItems.splice(i,1);
            //         this.selectedItemsName.splice(i,1);
            //         this.selectedItemsToken.splice(i,1);
                    
            //     }
            // }

            // original code ends


            //this.selectedItems.splice(item.number,1);
            //console.log("Selected items after slice======"+this.selectedItems);

        }
        else{
             item.checkBox="\u{f046}";

             
             for(let i=0;i<item.number.split(",").length;i++)
             {
                 if(item.number.split(",")[i].split("G")[1])
                 {
                     this.selectedItems.push(item.number.split(",")[i].split("G")[1]);
                     this.selectedItemsGroupArray.push(item.number.split(",")[i].split("G")[1]);
                 }
                 else
                 {
                     
                     this.selectedItems.push(item.number.split(",")[i]);
                     this.selectedItemsIndividualArray.push(item.number.split(",")[i]);
                 }
                 
             }
            
              for(let i=0;i<item.nameLabel.split(",").length;i++){
                  
                  this.selectedItemsName.push(item.nameLabel.split(",")[i]);
              }
           
             for(let i=0;i<item.deviceToken.split(",").length;i++){
                 
                 this.selectedItemsToken.push(item.deviceToken.split(",")[i]);
             }
            
            
            //original code starts
           // this.selectedItems.push(item.number);
            //this.selectedItemsName.push(item.nameLabel);
            //this.selectedItemsToken.push(item.deviceToken);
            //original code ends

            
            
            
        }

        item.selected=!item.selected;

       
        //new code starts
         this.selectedItems = this.selectedItems.filter(function(elem, index, self) {
             return index == self.indexOf(elem);
         })

         this.selectedItemsName = this.selectedItemsName.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        })

         this.selectedItemsToken = this.selectedItemsToken.filter(function(elem, index, self) {
             return index == self.indexOf(elem);
         })
         //new code ends


        //console.log("Check======"+arr);
        console.log("Selected items======"+this.selectedItems);
        console.log("Selected items Name======"+this.selectedItemsName);
        console.log("Selected items token======"+this.selectedItemsToken);
        



    }
   
    

  public assignTask() 
  {

    var x=this;
    var taskName=this.user.taskName;
    var category=this.selectedCategory;
    var dateTime=this.user.dateTime;
   // var assignee=this.user.assignee;

    // console.log("Task name---"+taskName);
    console.log("Category---"+category);
     //console.log("Date time---"+dateTime);
    //console.log("Assignee---"+assignee);

    
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
       
        console.log("Selected items token======"+this.selectedItemsToken);

        var devicePhoneNumber=getString("devicePhoneNumber");
        var deviceRegisteredUserName=getString("deviceRegisteredUserName");
        var deviceToken=getString("deviceToken"); 
       
        
        for(var i=0;i<this.selectedItems.length;i++)
        {
            
            //console.log("i value items=====i========="+i+"======"+this.selectedItems[i]);
            let index=i;
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
                    'createdByToken':deviceToken,
                    'assigneeName':this.selectedItems,
                }
                ).then(
                  (res)=>{
                   // console.log("Task has been saved successfully in my task details first time---"+res);
                   console.log("Selected items token======"+this.selectedItemsToken[index]);
                    this.sendPushNotification(this.selectedItemsToken[index],deviceRegisteredUserName,taskName);

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
                    'createdByToken':deviceToken,
                    'assigneeName':this.selectedItems,
            }).then(
                  (res)=>{
                    
                        console.log("===IF==");
                        console.log("Selected items token======"+this.selectedItemsToken[index]);
                        y.sendPushNotification(this.selectedItemsToken[index],deviceRegisteredUserName,taskName);
                    y.router.navigate([
                              '/mainfragment',
                              { outlets: { mytaskoutlet: ['mytask'] } }
                            ]);
                    
                  },(res)=>{
                    console.log("Problem in saving my task details---"+res);
                  });

               
            
            }
        
        }
    } 
    public sendPushNotification(assigneeDeviceToken,deviceRegisteredUserName,taskName){
        console.log("Checking");
        console.log("Token===="+assigneeDeviceToken);
        //send push notification
        let data={
            "notification": {
                "title": "New Task Received!",
                "body": deviceRegisteredUserName+" has assigned "+taskName,
                "priority": "high"
                
              },
              "to":assigneeDeviceToken
            };
            console.log("data=="+JSON.stringify(data));
        this.myPostService
        .postData(data).subscribe((res)=>{
  
            console.log("Reminder Success");
        },(error)=>{
            console.log("Reminder Failure==="+error);
        });
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
        var deviceToken=getString("deviceToken"); 
       
        
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
                    'deletionCount':deletionCount,
                    'createdByToken':deviceToken 
                }
                ).then(
                  (res)=>{
                    console.log("Task has been saved successfully in other task details first time---"+res);
                    // this.router.navigate([
                    //           '/mainfragment',
                    //           { outlets: { mytaskoutlet: ['mytask'] } }
                    //         ]);
                  },(res)=>{
                    console.log("Problem in saving my task details---"+res);
                  });

                for(var j=0;j<this.selectedItems.length;j++)
                {
                    firebase.setValue(
                    'OtherTaskDetails/'+devicePhoneNumber+'/1/AssigneeDetails/'+this.selectedItems[j],
                    {
                        'assigneeName':this.selectedItemsName[j],
                        'remainderCount':0,
                        'deletionCount':0,
                        "deviceToken":this.selectedItemsToken[j],
                        'completionStatus':false,
                        'taskName':taskName,
                        'createdBy':deviceRegisteredUserName
                    });
                }





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
                    'deletionCount':deletionCount,
                    'createdByToken':deviceToken 
            }).then(
                  (res)=>{
                    console.log("Task has been saved successfully in other task details-========"+res);
                  },(res)=>{
                    console.log("Problem in saving my task details---"+res);
                  });

               // this.getLastCountAndEnterDetails(i,this.selectedItems.length,this.selectedItems[i],recipentsCount,remainderCount,deviceRegisteredUserName,devicePhoneNumber,completionCount,myCompletionStatus,taskName,category,dateTime,x),i;


            
            for(var j=0;j<this.selectedItems.length;j++)
                {
                   // console.log("======================Device Token==============="+this.selectedItemsToken[j]);
                    firebase.setValue(
                    'OtherTaskDetails/'+devicePhoneNumber+'/'+id+'/AssigneeDetails/'+this.selectedItems[j],
                    {
                        'assigneeName':this.selectedItemsName[j],
                        'remainderCount':0,
                        'deletionCount':0,
                        "deviceToken":this.selectedItemsToken[j],
                        'completionStatus':false,
                        'taskName':taskName,
                        'createdBy':deviceRegisteredUserName
                    });
                }
            
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
