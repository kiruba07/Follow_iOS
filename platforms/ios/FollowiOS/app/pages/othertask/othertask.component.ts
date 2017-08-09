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
    tappedItemKey;
    
   
    showDetailedView;

    constructor(private router: Router,private page: Page) {
        this.listViewItems=new ListViewItems;
        this.showDetailedView="collapse";

        
    }

    ngOnInit() 
    {
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
        //var key=this.dataItems.getItem(tapIndex).key;
        var itemKey=this.dataItems.getItem(tapIndex).key;
        var devicePhoneNumber=getString("devicePhoneNumber");

        var x=this;
        var onQueryEvent=function(result)
        {
            console.log("Delete My task");
            if (!result.error)
            {
                console.log("IF");
                var resultJson=result.value;
                console.log("Result=="+resultJson);
                for(var key1 in resultJson)
                {
                    console.log("Assignee Number"+key1);
                    if(key1==null || key1=="null"){}
                    else
                    {
                        //delete the task in my task details
                        firebase.remove(
                        '/MyTaskDetails/'+key1+'/'+itemKey,
                        )

                    }
                    
                }  
                x.deleteOtherTask(devicePhoneNumber,tapIndex,itemKey);   
                                
            }
              
        }   
        firebase.query(
          onQueryEvent,
        '/OtherTaskDetails/'+devicePhoneNumber+'/'+itemKey+'/AssigneeDetails',
          {
              
              singleEvent: true,
              
              orderBy: {
                  type: firebase.QueryOrderByType.KEY,
              },
              
          }
        );
        timerModule.setTimeout(function ()
        {

               x.dataItems=x.listViewItems.getOtherTaskDetails();
        },1000);
        


        
       
   }
   public deleteOtherTask(devicePhoneNumber,tapIndex,itemKey)
    {
                //delete task in other task details page
                 firebase.remove(
                '/OtherTaskDetails/'+devicePhoneNumber+'/'+itemKey,
                ).then(
                  (res)=>{
                    console.log("Task has been deleted successfully in other task details---");
                  },(res)=>{
                    console.log("Problem in deleting other task details---"+res);
                  });
    }   
    cancel()
    {
        this.showDetailedView="collapse";
    }
    public getRemainderCountAndUpdate(number,cStatus,rCount)
    {
        var devicePhoneNumber=getString("devicePhoneNumber");
        firebase.update(
        '/MyTaskDetails/'+number+'/'+this.tappedItemKey,
        {
            'remainderCount':rCount+1,
        }
        );
        firebase.update(
        '/OtherTaskDetails/'+devicePhoneNumber+'/'+this.tappedItemKey+'/AssigneeDetails/'+number,
        {
            'remainderCount':rCount+1,
        }
        );
    }
    sendReminder()
    {
        
        console.log("tappedItemKey==="+this.tappedItemKey); 
        let tappedItemKey=this.tappedItemKey;
        let reminderSendDetails=new ObservableArray([]);
         var x=this;
        var devicePhoneNumber=getString("devicePhoneNumber");
         console.log("Length==="+this.detailedDataItems.length);
        for(var i=0;i<this.detailedDataItems.length;i++)
        {
           
           
            var number=this.detailedDataItems.getItem(i).assigneeNumber;
            var cStatus=this.detailedDataItems.getItem(i).completionStatus;
            var rCount=this.detailedDataItems.getItem(i).remainderCount;
            console.log("Number===="+number);
            console.log("cStatus===="+cStatus);
            console.log("rCount===="+rCount);
            if(!cStatus)
            this.getRemainderCountAndUpdate(number,cStatus,rCount);
            
            
            
        }

        // var tapIndex=this.dataItems.indexOf(tappedItemKey);
        // console.log("Index==="+tapIndex);
        // let overAllRemainderCount=this.dataItems.getItem(tapIndex).remainderCount;
        // console.log("overAllRemainderCount====="+overAllRemainderCount);
        // firebase.update(
        // '/OtherTaskDetails/'+devicePhoneNumber+'/'+tappedItemKey,
        // {
        //     'remainderCount':overAllRemainderCount+1,
        // });

        var onQueryEvent=function(result){
            if(!result.error)
            {
                firebase.update(
                '/OtherTaskDetails/'+devicePhoneNumber+'/'+tappedItemKey,
                {
                    'remainderCount':result.value+1,
                });
            }
        }
        firebase.query(
          onQueryEvent,
        '/OtherTaskDetails/'+devicePhoneNumber+'/'+tappedItemKey+'/remainderCount',
          {
              
              singleEvent: true,
              
              orderBy: {
                  type: firebase.QueryOrderByType.KEY,
              },
              
          }
        );
        

        
       


    }
    itemTap(item)
    {
        
        console.log("ITem Key=="+item.key);
        this.tappedItemKey=item.key;
        console.log("tappedItemKey==="+this.tappedItemKey);
        
        this.detailedDataItems=this.listViewItems.getOtherTaskDetailsDetailedDetails(item.key);
        
        this.showDetailedView="visible";

        
        
         

        // var layout = this.page;
        


        // var idName="taskDetailedView"+item.key;
        // var detailedViewLayout = layout.getViewById(idName);
        // console.log("ID==="+detailedViewLayout);
        // console.log(" class=="+detailedViewLayout.className.split(" ")[1]);

      //  layout.className="taskDetailedView";
        //var classLayout=layout.className="taskDetailedView";
       // console.log("Calss Layout=="+classLayout);
       // layout.set("class","taskDetailedView hide");


        // if(detailedViewLayout.className.split(" ")[1]=='show')
        // {
        //     // console.log("IF==");
        //     detailedViewLayout.set("class","taskDetailedView hide");
            
        // }
        // else{
            
        //     // console.log("ELSE==");
        //     detailedViewLayout.set("class","taskDetailedView show");
            
        // }
        
        
        //detailedViewLayout.set("visibility","visible");
        //var taskField = layout.getViewById("taskName");
        
    }

    createTask(){
            this.router.navigate(["/createtask"]);

    }
   
}



