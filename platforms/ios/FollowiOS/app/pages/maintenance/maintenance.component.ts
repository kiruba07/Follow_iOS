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
  public newGroupCreateVisibility="collapsed";
  public categoryVisibility="visible";
  public tickIconGroupVisibility="collapsed";

  user: User;
  categoryListItems=new ObservableArray([]);
  groupListItems=new ObservableArray([]);
  listViewItems:ListViewItems
  contactList=new ObservableArray([]);
  selectedItems:string[]=[];
  selectedItemsName:string[]=[];
  selectedItemsToken:string[]=[];

  constructor(private page: Page)
  {
    this.user=new User();
    this.listViewItems=new ListViewItems;
    this.contactList=this.listViewItems.getContactList();

  }
  ngOnInit() {
    
     this.categoryListItems=this.listViewItems.getCategoryList();  
     this.groupListItems=this.listViewItems.getGroupList();  
    

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
  public createGroupButton()
  {
    
    this.newGroupCreateVisibility = 'visible';
    this.categoryListVisibility = 'collapsed';
    this.categoryVisibility="collapsed";
    this.tickIconGroupVisibility="visible";
    
    if(this.groupListVisibility=="visible")
    {
      this.groupListVisibility = 'collapsed';
    }
    else{
        this.groupListVisibility = 'visible';
    }

  }
  showGroupList()
  {
   
    this.newGroupCreateVisibility = 'collapsed';
    this.user.newGroup="";
   
    this.categoryVisibility="visible";

    if(this.groupListVisibility=="visible")
    {
      this.groupListVisibility = 'collapsed';
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
  public itemTap(item)
  {
      //console.log("Item tap=-========"+item.name);
      if(item.selected)
      {
          item.checkBox="\u{f096}";

          for(var i=0;i<this.selectedItems.length;i++)
          {
              var curItem=this.selectedItems[i];
              //var curItemName=this.selectedItemsName[i]
              console.log('cur item----'+curItem);
              if(curItem==item.number)
              {
                  console.log('index ::::::'+i);
                  this.selectedItems.splice(i,1);
                  this.selectedItemsName.splice(i,1);
                  this.selectedItemsToken.splice(i,1);
                  
              }
          }


          //this.selectedItems.splice(item.number,1);
          console.log("Selected items after slice======"+this.selectedItems);

      }
      else{
           item.checkBox="\u{f046}";
          this.selectedItems.push(item.number);
          this.selectedItemsName.push(item.nameLabel);
          this.selectedItemsToken.push(item.deviceToken);
          
      }

      item.selected=!item.selected;
      console.log("Selected items======"+this.selectedItems);
      console.log("Selected items names======"+this.selectedItemsName);
      
      console.log("Selected items token======"+this.selectedItemsToken);
      



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
  public deleteGroup(args)
  {
      let tapIndex=this.groupListItems.indexOf(args.object.bindingContext);
      let groupDelete=this.groupListItems.getItem(tapIndex).group;
      //let newCategoryArray:string[]=[];
      let x=this;
      let devicePhoneNumber=getString("devicePhoneNumber");

      // for(let i=0;i<this.categoryListItems.length;i++)
      // {
      //   if(this.categoryListItems.getItem(i).category==categoryDelete){}
      //   else{
      //     console.log("else");
      //     newCategoryArray.push(this.categoryListItems.getItem(i).category);
      //   }
      // }
      console.log("Group to delete==="+groupDelete);
      firebase.remove(
        '/DeviceDetails/'+devicePhoneNumber+'/groupList/'+groupDelete,
        ).then((res)=>{
          console.log("Group list deleted success..");
          timerModule.setTimeout(function ()
          {
                
                 x.groupListItems=x.listViewItems.getGroupList();
                 
             },500);
           
        },(res)=>{
          console.log("Group list deleted failure.."+res);
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
  createNewGroup(){

    let newGroupName=this.user.newGroup;
    let devicePhoneNumber=getString("devicePhoneNumber");
    let x=this;

    console.log("New Group Name==="+newGroupName);
    console.log("Selected Items==="+this.selectedItems);
    if(newGroupName==null || this.selectedItems.length<1){
      console.log("Validation Fails==");
    }
    else{

      // for(let i=0;i<this.selectedItems.length;i++){

        
        var layout = this.page;
        this.user.newGroup="";
        var groupId = layout.getViewById("newGroupCreation");
        if (groupId.ios)
        {
          groupId.ios.endEditing(true);
          this.tickIconGroupVisibility='collapse';
            
        }
         else if (groupId.android)
        {
          groupId.android.clearFocus();
            
        }

      firebase.setValue(
        '/DeviceDetails/'+devicePhoneNumber+'/groupList/'+newGroupName,
        {
          devicePhoneNumber:this.selectedItems,
          deviceToken:this.selectedItemsToken,
        }).then((res)=>{
          console.log("Group list updated success..");
          timerModule.setTimeout(function ()
          {
                
                x.groupListItems=x.listViewItems.getGroupList(); 
                x.showGroupList();
                
             },300);
           
        },(res)=>{
          console.log("Group list updated failure.."+res);
        });
      // }


    }


  }

  
}
