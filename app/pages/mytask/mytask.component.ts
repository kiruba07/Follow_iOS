import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewEventData, RadListView } from "nativescript-telerik-ui-pro/listview";
import { View } from "tns-core-modules/ui/core/view";
import { Page } from "ui/page";
import { LayoutBase } from "ui/layouts/layout-base";
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
import { ListViewItems } from "../../service/listviewitems";
import { RadListViewComponent } from "nativescript-telerik-ui-pro/listview/angular";
import * as timerModule  from "tns-core-modules/timer";
import { MyHttpPostService } from "../../service/http-post.services";

import { SwipeGestureEventData } from "ui/gestures";


@Component({
  selector: "my-app",
  providers: [MyHttpPostService],
  templateUrl: "pages/mytask/mytask.html",
  styleUrls: ["pages/mytask/mytask-common.css", "pages/mytask/mytask.css"]
})
export class MyTaskComponent implements OnInit
{

     dataItems=new ObservableArray([]);
     listViewItems:ListViewItems
     pageTitle;
    layout=new Page();
    constructor(private router: Router,private myPostService: MyHttpPostService,private page: Page) {
      this.listViewItems=new ListViewItems;
        this.pageTitle="My Task";
        
        
        
    }
    ngOnInit() {
       
        this.dataItems=this.listViewItems.getMyTaskdetails();  
        // this.layout = this.page;
        // let grid = this.layout.getViewById("myTaskDetailsDock");
        // console.log("Grid layout==="+grid);
        // let layoutBase = <LayoutBase>grid;
        // layoutBase.isUserInteractionEnabled=true;

    
    }
    
    onSwipeCellStarted(args: ListViewEventData)
    {


      console.log("Index key==="+args.index);
     
      let completionStatus:boolean=this.dataItems.getItem(args.index).completed;
      console.log("Completed======"+completionStatus);

    var swipeLimits = args.data.swipeLimits;
    var swipeView = args['object'] as RadListView;

   

    var leftItem = swipeView.getViewById<View>('deleteView');
    var rightItem = swipeView.getViewById<View>('doneView');

      if(completionStatus){
        swipeLimits.left = 0;
        swipeLimits.right = 0;
      }
      else{
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
        
      }
   }


   public onPullToRefreshInitiated(args: ListViewEventData)
   {

    this.dataItems=this.listViewItems.getMyTaskdetails();  
    timerModule.setTimeout(function ()
     {
            var listView = args.object;
            listView.notifyPullToRefreshFinished();
        },1000);

   }
   doneTask(args)
   {
    
    
      // this.layout = this.page;
      // let grid = this.layout.getViewById("myTaskDetailsDock");
      // console.log("Grid layout==="+grid);
      // let layoutBase = <LayoutBase>grid;
      // layoutBase.isUserInteractionEnabled=true;

        var tapIndex=this.dataItems.indexOf(args.object.bindingContext)
        var x=this;

        // var swipeView = args['object'] as RadListView;
        // var leftItem = swipeView.getViewById<View>('grid');
        // console.log("Left Item=="+leftItem);
        
        // var layout = this.page;
        // var left = layout.getViewById(this.dataItems.getItem(tapIndex).taskName);
        // console.log("Left Item=="+left);
        //  let layoutBase = <LayoutBase>grid;
        // layoutBase.isUserInteractionEnabled=true;
        // left.isUserInteractionEnabled=true;
        
        


        console.log("Item Kay======"+this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======"+this.dataItems.getItem(tapIndex).taskName);
        console.log("Created By Number======"+this.dataItems.getItem(tapIndex).createdByNumber);
        console.log("Created By Token======"+this.dataItems.getItem(tapIndex).createdByToken);
        console.log("Assigne Numbers======"+this.dataItems.getItem(tapIndex).assigneeNumber);
        
        var createdByNumber=this.dataItems.getItem(tapIndex).createdByNumber;
        var key=this.dataItems.getItem(tapIndex).key;

        var devicePhoneNumber=getString("devicePhoneNumber");
        var deviceRegisteredUserName=getString("deviceRegisteredUserName");
        var taskName=this.dataItems.getItem(tapIndex).taskName;
        var createdByToken=this.dataItems.getItem(tapIndex).createdByToken;


        //update completion status in mytask details
        //let numberString=this.dataItems.getItem(tapIndex).assigneeNumber;
        let assigneeNumbers:string[]=this.dataItems.getItem(tapIndex).assigneeNumber;
        

        // firebase.update(
        //         '/MyTaskDetails/'+devicePhoneNumber+'/'+this.dataItems.getItem(tapIndex).key,
        //         {
        //             'myCompletionStatus':true,
        //         }
        //         ).then(
        //           (res)=>{
        //             console.log("Task has been upadates successfully in my task details---"+res);
        //            // this.dataItems=this.listViewItems.getMyTaskdetails();   
                  
        //           },(res)=>{
        //             console.log("Problem in updating my task details---"+res);
        //           });
        

        //get the updation count and update completion status in other task details
        var onQueryEvent = function(result)
        {
          if (!result.error)
          {
             
             console.log("Get the current value==="+result.value);
              firebase.update(
                 '/OtherTaskDetails/'+createdByNumber+'/'+key,
                {
                    'completionCount':(result.value+1),
                }
                ).then(
                  (res)=>{
                    console.log("Completion count has been upadates successfully in other task details---"+res);


                    firebase.update(
                      '/MyTaskDetails/'+devicePhoneNumber+'/'+x.dataItems.getItem(tapIndex).key,
                      {
                          'myCompletionStatus':true,
                      }
                    ).then((res)=>{
                      console.log("Completion status has been upadates successfully in my task details---"+res);
                     // x.dataItems=x.listViewItems.getMyTaskdetails(); 
                      x.updateCompletionCountInMyTaskDetailsForAllAssignees(result.value,assigneeNumbers,key);

                    },(res)=>{
                      console.log("Problem in updating completion status in my task details---"+res);
                    });


                  
                  },(res)=>{
                    console.log("Problem in updating completion count in other task details---"+res);
                  });


          }
        }
        firebase.query(
          onQueryEvent,
        '/OtherTaskDetails/'+this.dataItems.getItem(tapIndex).createdByNumber+'/'+this.dataItems.getItem(tapIndex).key+'/completionCount',
          {
              
              singleEvent: true,
              
              orderBy: {
                  type: firebase.QueryOrderByType.KEY,
              },
              
          }
      ); 
        
      //update individual completion stats in other task details
              firebase.update(
                '/OtherTaskDetails/'+this.dataItems.getItem(tapIndex).createdByNumber+'/'+this.dataItems.getItem(tapIndex).key+'/AssigneeDetails/'+devicePhoneNumber,
                {
                    'completionStatus':true,
                }
                );

      //send push notification
        let data={
          "notification": {
              "title": "Task Completed!",
              "body": deviceRegisteredUserName+" has completed "+taskName,
              "priority": "high"
              
            },
            "to":createdByToken
          };
          console.log("data=="+JSON.stringify(data));
      this.myPostService
      .postData(data).subscribe((res)=>{

          console.log("Reminder Success");
      },(error)=>{
          console.log("Reminder Failure==="+error);
      });
   }
   updateCompletionCountInMyTaskDetailsForAllAssignees(count,assigneeNumbers,key)
   {
     let x=this;
    for(let i=0;i<assigneeNumbers.length;i++)
      {
        console.log("Numbers===i==="+assigneeNumbers[i]);

        firebase.update(
          '/MyTaskDetails/'+assigneeNumbers[i]+'/'+key,
            {
              'completionCount':(count+1),
            }
            ).then((res)=>{
              console.log("Completion count has been upadates successfully in my task details---"+res);
              //x.dataItems=x.listViewItems.getMyTaskdetails();

            },(res)=>{
               console.log("Problem in updating completion count in my task details---"+res);
            });
      }
      x.dataItems=x.listViewItems.getMyTaskdetails();
      
   }
   deleteTask(args)
   {
    
        var tapIndex=this.dataItems.indexOf(args.object.bindingContext)

        console.log("Item Kay======"+this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======"+this.dataItems.getItem(tapIndex).taskName);
        var createdByNumber=this.dataItems.getItem(tapIndex).createdByNumber;
        var key=this.dataItems.getItem(tapIndex).key;
        var devicePhoneNumber=getString("devicePhoneNumber");
        var taskName=this.dataItems.getItem(tapIndex).taskName;
        var createdByToken=this.dataItems.getItem(tapIndex).createdByToken;
        var deviceRegisteredUserName=getString("deviceRegisteredUserName");

        firebase.remove(
                '/MyTaskDetails/'+devicePhoneNumber+'/'+this.dataItems.getItem(tapIndex).key,
                ).then(
                  (res)=>{
                    console.log("Task has been upadates successfully in my task details---"+res);
                    this.dataItems=this.listViewItems.getMyTaskdetails();   
                  
                  },(res)=>{
                    console.log("Problem in updating my task details---"+res);
                  });
        //update delete count in other task details page
        var onQueryEvent = function(result)
        {
          if (!result.error)
          {
             
             console.log("Get the current value==="+result.value);
              firebase.update(
                 '/OtherTaskDetails/'+createdByNumber+'/'+key,
                {
                    'deletionCount':(result.value+1),
                }
                ).then(
                  (res)=>{
                    console.log("Deletion count has been upadates successfully in other task details---"+res);
                  },(res)=>{
                    console.log("Problem in updating deletion count in other task details---"+res);
                  });


          }
        }
        firebase.query(
          onQueryEvent,
        '/OtherTaskDetails/'+this.dataItems.getItem(tapIndex).createdByNumber+'/'+this.dataItems.getItem(tapIndex).key+'/deletionCount',
          {
              
              singleEvent: true,
              
              orderBy: {
                  type: firebase.QueryOrderByType.KEY,
              },
              
          }
        );

        //update individual deletion count in other task details
              firebase.update(
                '/OtherTaskDetails/'+this.dataItems.getItem(tapIndex).createdByNumber+'/'+this.dataItems.getItem(tapIndex).key+'/AssigneeDetails/'+devicePhoneNumber,
                {
                    'deletionCount':1,
                }
                );
                
        //send push notification
        let data={
          "notification": {
              "title": "Task Declined!",
              "body": deviceRegisteredUserName+" has declined "+taskName,
              "priority": "high"
              
            },
            "to":createdByToken
          };
          console.log("data=="+JSON.stringify(data));
      this.myPostService
      .postData(data).subscribe((res)=>{

          console.log("Reminder Success");
      },(error)=>{
          console.log("Reminder Failure==="+error);
      });

   }
    

   createTask(){

    this.router.navigate(["/createtask"]);
   }
}