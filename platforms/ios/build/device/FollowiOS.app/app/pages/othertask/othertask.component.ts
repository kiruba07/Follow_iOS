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
import { Page } from "ui/page";
// import { View } from "ui/core/view";

@Component({
  selector: "my-app",
  providers: [DataItemService],
  templateUrl: "pages/othertask/othertask.html",
  styleUrls: ["pages/othertask/othertask-common.css", "pages/othertask/othertask.css"]
})
export class OtherTaskComponent implements OnInit
{
    dataItems=new ObservableArray([]);
    detailedDataItems= new ObservableArray([]);
    listViewItems:ListViewItems;
    
    showView: boolean = true;

    constructor(private router: Router,private page: Page) {
        this.listViewItems=new ListViewItems;
        this.showView=false;
        
    }

    ngOnInit() {
        this.dataItems=this.listViewItems.getOtherTaskDetails();  
        //this.detailedDataItems=this.listViewItems.getOtherTaskDetailsDetailedDetails(); 
       // console.log("Detailed Items in other task component=="+this.detailedDataItems);
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
    itemTap(item)
    {
        
        console.log("ITem Key=="+item.key);
        this.detailedDataItems=this.listViewItems.getOtherTaskDetailsDetailedDetails(item.key);
    
         

        var layout = this.page;
        var classLayout=this.page;
        layout.className="taskDetailedView";
        layout.set("class","taskDetailedView hide");


        var idName="taskDetailedView"+item.key;
        var detailedViewLayout = layout.getViewById(idName);
        console.log("ID==="+detailedViewLayout);
        console.log(" class=="+detailedViewLayout.className.split(" ")[1]);

      //  layout.className="taskDetailedView";
        //var classLayout=layout.className="taskDetailedView";
       // console.log("Calss Layout=="+classLayout);
       // layout.set("class","taskDetailedView hide");


        if(detailedViewLayout.className.split(" ")[1]=='show')
        {
            // console.log("IF==");
            detailedViewLayout.set("class","taskDetailedView hide");
            
        }
        else{
            
            // console.log("ELSE==");
            detailedViewLayout.set("class","taskDetailedView show");
            
        }
        
        
        //detailedViewLayout.set("visibility","visible");
        //var taskField = layout.getViewById("taskName");
        
    }

    createTask(){
            this.router.navigate(["/createtask"]);

    }
   
}
