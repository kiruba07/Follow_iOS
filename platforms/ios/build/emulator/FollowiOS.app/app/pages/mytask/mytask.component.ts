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

        console.log("Item Kay======"+this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======"+this.dataItems.getItem(tapIndex).taskName);

        var devicePhoneNumber=getString("devicePhoneNumber");

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
        
        

   }
   deleteTask(args)
   {
    
        var tapIndex=this.dataItems.indexOf(args.object.bindingContext)

        console.log("Item Kay======"+this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======"+this.dataItems.getItem(tapIndex).taskName);

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
        
        

   }
    

   createTask(){

    this.router.navigate(["/createtask"]);
   }
}