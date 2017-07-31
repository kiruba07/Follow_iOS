import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { DataItem } from "../../service/dataItem";
import { DataItemService } from "../../service/dataItem.service";
import { ListViewEventData, RadListView } from "nativescript-telerik-ui-pro/listview";
import { View } from "tns-core-modules/ui/core/view";
import { ListViewItems } from "../../service/listviewitems";
import { RadListViewComponent } from "nativescript-telerik-ui-pro/listview/angular";
import * as timerModule  from "tns-core-modules/timer";
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
  providers: [DataItemService],
  templateUrl: "pages/othertask/othertask.html",
  styleUrls: ["pages/othertask/othertask-common.css", "pages/othertask/othertask.css"]
})
export class OtherTaskComponent implements OnInit
{
    dataItems=new ObservableArray([]);
    listViewItems:ListViewItems;

    constructor(private router: Router) {
        this.listViewItems=new ListViewItems;
    }

    ngOnInit() {
        this.dataItems=this.listViewItems.getOtherTaskDetails();  
    }
    public onSwipeCellStarted(args: ListViewEventData)
    {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];
        var leftItem = swipeView.getViewById<View>('emptyView');
        var rightItem = swipeView.getViewById<View>('deleteView');
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    }

    public onPullToRefreshInitiated(args: ListViewEventData)
    {
        this.dataItems=this.listViewItems.getOtherTaskDetails();    
        timerModule.setTimeout(function ()
        {
                var listView = args.object;
                listView.notifyPullToRefreshFinished();
            },1000);    

   }
   deleteTask(args)
   {
    
        var tapIndex=this.dataItems.indexOf(args.object.bindingContext)

        console.log("Item Kay======"+this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======"+this.dataItems.getItem(tapIndex).taskName);
        var createdByNumber=this.dataItems.getItem(tapIndex).createdByNumber;
        var key=this.dataItems.getItem(tapIndex).key;
        var devicePhoneNumber=getString("devicePhoneNumber");

        //delete task in other task details page
        firebase.remove(
                '/OtherTaskDetails/'+devicePhoneNumber+'/'+this.dataItems.getItem(tapIndex).key,
                ).then(
                  (res)=>{
                    console.log("Task has been deleted successfully in other task details---"+res);
                    this.dataItems=this.listViewItems.getOtherTaskDetails();   
                  
                  },(res)=>{
                    console.log("Problem in deleting other task details---"+res);
                  });
        //delete task in my task details page
       
   }

    createTask(){
            this.router.navigate(["/createtask"]);

    }
   
}
