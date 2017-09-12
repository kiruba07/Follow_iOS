import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivityIndicator } from "ui/activity-indicator";
import { ListViewEventData, RadListView } from "nativescript-telerik-ui-pro/listview";
import { View } from "tns-core-modules/ui/core/view";
import { User } from "../../service/user";
import firebase = require("nativescript-plugin-firebase");
import { ObservableArray } from "tns-core-modules/data/observable-array";
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
import * as timerModule  from "tns-core-modules/timer"; 
import { Page } from "ui/page";

@Component({
  selector: "my-app",
  templateUrl: "pages/maintenance/maintenance.html",
  styleUrls: ["pages/maintenance/maintenance-common.css", "pages/maintenance/maintenance.css"]
})
export class MaintenanceComponent implements OnInit
{
   
  public groupListVisibility="collapsed";
  public categoryListVisibility="collapsed";
  public tickIconVisibility="collapsed";
  user: User;
  categoryListItems=new ObservableArray([]);
  listViewItems:ListViewItems

  constructor(private page: Page)
  {
    this.user=new User();
    this.listViewItems=new ListViewItems;

  }
  ngOnInit() {
    
     this.categoryListItems=this.listViewItems.getCategoryList();  
    

  }
  public onSwipeCellStarted(args: ListViewEventData)
  {
      var swipeLimits = args.data.swipeLimits;
      var swipeView = args['object'];
      var leftItem = swipeView.getViewById<View>('emptyView');
      var rightItem = swipeView.getViewById<View>('deleteView');
      //swipeLimits.left = leftItem.getMeasuredWidth();
      swipeLimits.left = 0;
      swipeLimits.right = rightItem.getMeasuredWidth();
     // swipeLimits.right = 0;
      swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
  }

  showGroupList()
  {
   
    if(this.groupListVisibility=="visible")
    {
      this.groupListVisibility = 'collapse';
    }
    else{
        this.groupListVisibility = 'visible';
    }
   

  }
  showCategoryList()
  {
   
    if(this.categoryListVisibility=="visible")
    {
      this.categoryListVisibility = 'collapse';
      this.tickIconVisibility='collapse';
    }
    else{
        this.categoryListVisibility = 'visible';
        this.tickIconVisibility='visible';
    }
   

  }
  public onPullToRefreshInitiated(args: ListViewEventData)
  {

    this.categoryListItems=this.listViewItems.getCategoryList(); 
   timerModule.setTimeout(function ()
    {
           var listView = args.object;
           listView.notifyPullToRefreshFinished();
       },1000);

  }
  public deleteCategory(args)
  {
      let tapIndex=this.categoryListItems.indexOf(args.object.bindingContext);
      let categoryDelete=this.categoryListItems.getItem(tapIndex).category;
      let newCategoryArray:string[]=[];
      let x=this;
      let devicePhoneNumber=getString("devicePhoneNumber");

      for(let i=0;i<this.categoryListItems.length;i++)
      {
        if(this.categoryListItems.getItem(i).category==categoryDelete){}
        else{
          console.log("else");
          newCategoryArray.push(this.categoryListItems.getItem(i).category);
        }
      }
      console.log("Category after deleted==="+newCategoryArray);
      firebase.setValue(
        '/DeviceDetails/'+devicePhoneNumber+'/categoryList',
        {
          list:newCategoryArray,
        }).then((res)=>{
          console.log("Category list updated success..");
          timerModule.setTimeout(function ()
          {
                
                 x.categoryListItems=x.listViewItems.getCategoryList();
                 
             },500);
           
        },(res)=>{
          console.log("Category list updated failure.."+res);
        });

      // this.categoryListItems.splice(tapIndex,categoryDelete);
      // console.log("Category after deleted==="+this.categoryListItems);

  }
  createNewCategory()
  {
   
    let newCategory=this.user.newCategory;
    let newCategoryArray:string[]=[];
    let devicePhoneNumber=getString("devicePhoneNumber");
    let x=this;
    if(newCategory==null){}
    else
    {
      this.user.newCategory="";
      var layout = this.page;
      var categoryId = layout.getViewById("newCategory");
      if (categoryId.ios)
      {
        categoryId.ios.endEditing(true);
        this.tickIconVisibility='collapse';
          
      }
       else if (categoryId.android)
      {
        categoryId.android.clearFocus();
          
      }

      for(let i=0;i<this.categoryListItems.length;i++){
        newCategoryArray.push(this.categoryListItems.getItem(i).category);
      }

      newCategoryArray.push(newCategory);
      
      console.log("New Items Arrat==="+newCategoryArray);
        firebase.setValue(
          '/DeviceDetails/'+devicePhoneNumber+'/categoryList',
          {
            list:newCategoryArray,
          }).then((res)=>{
            console.log("Category list updated success..");
            timerModule.setTimeout(function ()
            {
                  
                   x.categoryListItems=x.listViewItems.getCategoryList();
                   x.tickIconVisibility='visible';
               },1500);
             
          },(res)=>{
            console.log("Category list updated failure.."+res);
          });

          
    }
  }

  
}
