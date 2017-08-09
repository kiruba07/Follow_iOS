import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewEventData, RadListView } from "nativescript-telerik-ui-pro/listview";
import { View } from "tns-core-modules/ui/core/view";
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


@Component({
  selector: "my-app",
  // providers: [DataItemService],
  templateUrl: "pages/mytask/mytask.html",
  styleUrls: ["pages/mytask/mytask-common.css", "pages/mytask/mytask.css"]
})
export class MyTaskComponent implements OnInit
{

     dataItems=new ObservableArray([]);
     listViewItems:ListViewItems
    constructor(private router: Router) {
        this.listViewItems=new ListViewItems;
    }
    ngOnInit() {
       
        this.dataItems=this.listViewItems.getMyTaskdetails();  
     //   console.log("Grid=="+this.gridLayout.page.getViewById("grid1"));
        


    
    }
    public onSwipeCellStarted(args: ListViewEventData)
    {
    var swipeLimits = args.data.swipeLimits;
    var swipeView = args['object'];
    var leftItem = swipeView.getViewById<View>('deleteView');
    var rightItem = swipeView.getViewById<View>('doneView');
    swipeLimits.left = leftItem.getMeasuredWidth();
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
   }
   public onPullToRefreshInitiated(args: ListViewEventData){

    console.log("Pul to refresh")

    this.dataItems=this.listViewItems.getMyTaskdetails();  
    timerModule.setTimeout(function ()
     {
            var listView = args.object;
            listView.notifyPullToRefreshFinished();
        },1000);

   }
   doneTask(args)
   {
    
        var tapIndex=this.dataItems.indexOf(args.object.bindingContext)
        var x=this;

        console.log("Item Kay======"+this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======"+this.dataItems.getItem(tapIndex).taskName);
        console.log("Created By Number======"+this.dataItems.getItem(tapIndex).createdByNumber);
        var createdByNumber=this.dataItems.getItem(tapIndex).createdByNumber;
        var key=this.dataItems.getItem(tapIndex).key;

        var devicePhoneNumber=getString("devicePhoneNumber");

        //update completion status in mytask details
        firebase.update(
                '/MyTaskDetails/'+devicePhoneNumber+'/'+this.dataItems.getItem(tapIndex).key,
                {
                    'myCompletionStatus':true,
                }
                ).then(
                  (res)=>{
                    console.log("Task has been upadates successfully in my task details---"+res);
                    this.dataItems=this.listViewItems.getMyTaskdetails();   
                  
                  },(res)=>{
                    console.log("Problem in updating my task details---"+res);
                  });
        
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
                    '/MyTaskDetails/'+devicePhoneNumber+'/'+key,
                    {
                        'completionCount':(result.value+1),
                    }
                    ).then((res)=>{
                      console.log("Completion count has been upadates successfully in my task details---"+res);
                      x.dataItems=x.listViewItems.getMyTaskdetails(); 

                    },(res)=>{
                      console.log("Problem in updating completion count in my task details---"+res);
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
      
   }
   deleteTask(args)
   {
    
        var tapIndex=this.dataItems.indexOf(args.object.bindingContext)

        console.log("Item Kay======"+this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======"+this.dataItems.getItem(tapIndex).taskName);
        var createdByNumber=this.dataItems.getItem(tapIndex).createdByNumber;
        var key=this.dataItems.getItem(tapIndex).key;
        var devicePhoneNumber=getString("devicePhoneNumber");

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

        

   }
    

   createTask(){

    this.router.navigate(["/createtask"]);
   }
}