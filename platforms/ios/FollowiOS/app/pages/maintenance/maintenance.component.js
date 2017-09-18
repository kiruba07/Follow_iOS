"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_1 = require("../../service/user");
var firebase = require("nativescript-plugin-firebase");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var application_settings_1 = require("application-settings");
var listviewitems_1 = require("../../service/listviewitems");
var timerModule = require("tns-core-modules/timer");
var page_1 = require("ui/page");
var MaintenanceComponent = (function () {
    function MaintenanceComponent(page) {
        this.page = page;
        this.groupListVisibility = "collapsed";
        this.categoryListVisibility = "collapsed";
        this.tickIconVisibility = "collapsed";
        this.newGroupCreateVisibility = "collapsed";
        this.categoryVisibility = "visible";
        this.tickIconGroupVisibility = "collapsed";
        this.categoryListItems = new observable_array_1.ObservableArray([]);
        this.groupListItems = new observable_array_1.ObservableArray([]);
        this.contactList = new observable_array_1.ObservableArray([]);
        this.selectedItems = [];
        this.selectedItemsName = [];
        this.selectedItemsToken = [];
        this.contactListUpdate = new observable_array_1.ObservableArray([]);
        this.user = new user_1.User();
        this.listViewItems = new listviewitems_1.ListViewItems;
        //this.contactList=this.listViewItems.getContactList();
    }
    MaintenanceComponent.prototype.ngOnInit = function () {
        this.categoryListItems = this.listViewItems.getCategoryList();
        this.groupListItems = this.listViewItems.getGroupList();
    };
    MaintenanceComponent.prototype.onSwipeCellStarted = function (args) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];
        var leftItem = swipeView.getViewById('emptyView');
        var rightItem = swipeView.getViewById('deleteView');
        //swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.left = 0;
        swipeLimits.right = rightItem.getMeasuredWidth();
        // swipeLimits.right = 0;
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    };
    MaintenanceComponent.prototype.createGroupButton = function () {
        this.newGroupCreateVisibility = 'visible';
        this.categoryListVisibility = 'collapsed';
        this.categoryVisibility = "collapsed";
        this.tickIconGroupVisibility = "visible";
        this.selectedItems.length = 0;
        this.selectedItemsName.length = 0;
        this.selectedItemsToken.length = 0;
        if (this.groupListVisibility == "visible") {
            this.groupListVisibility = 'collapsed';
        }
        else {
            this.groupListVisibility = 'visible';
        }
        this.contactList = this.listViewItems.getContactList();
    };
    MaintenanceComponent.prototype.showGroupList = function () {
        this.newGroupCreateVisibility = 'collapsed';
        this.user.newGroup = "";
        this.categoryVisibility = "visible";
        if (this.groupListVisibility == "visible") {
            this.groupListVisibility = 'collapsed';
        }
        else {
            this.groupListVisibility = 'visible';
        }
    };
    MaintenanceComponent.prototype.showCategoryList = function () {
        if (this.categoryListVisibility == "visible") {
            this.categoryListVisibility = 'collapse';
            this.tickIconVisibility = 'collapse';
        }
        else {
            this.categoryListVisibility = 'visible';
            this.tickIconVisibility = 'visible';
        }
    };
    MaintenanceComponent.prototype.itemTap = function (item) {
        //console.log("Item tap=-========"+item.name);
        console.log("Item tap=-========" + item.name);
        console.log("Item tap selected-========" + item.selected);
        this.selectedItems = this.listViewItems.selectedItems;
        this.selectedItemsName = this.listViewItems.selectedItemsName;
        this.selectedItemsToken = this.listViewItems.selectedItemsToken;
        // console.log("Selected items======"+this.selectedItems);
        // console.log("Selected items names======"+this.selectedItemsName);
        // console.log("Selected items token======"+this.selectedItemsToken);
        if (item.selected) {
            item.checkBox = "\uF096";
            for (var i = 0; i < this.selectedItems.length; i++) {
                var curItem = this.selectedItems[i];
                console.log('cur item----' + curItem);
                if (curItem == item.number) {
                    console.log('index ::::::' + i);
                    this.selectedItems.splice(i, 1);
                    this.selectedItemsName.splice(i, 1);
                    this.selectedItemsToken.splice(i, 1);
                }
            }
            console.log("Selected items after slice======" + this.selectedItems);
        }
        else {
            item.checkBox = "\uF046";
            this.selectedItems.push(item.number);
            this.selectedItemsName.push(item.nameLabel);
            this.selectedItemsToken.push(item.deviceToken);
        }
        item.selected = !item.selected;
        console.log("Selected items======" + this.selectedItems);
        console.log("Selected items names======" + this.selectedItemsName);
        console.log("Selected items token======" + this.selectedItemsToken);
    };
    MaintenanceComponent.prototype.onPullToRefreshInitiated = function (args) {
        this.categoryListItems = this.listViewItems.getCategoryList();
        timerModule.setTimeout(function () {
            var listView = args.object;
            listView.notifyPullToRefreshFinished();
        }, 1000);
    };
    MaintenanceComponent.prototype.deleteCategory = function (args) {
        var tapIndex = this.categoryListItems.indexOf(args.object.bindingContext);
        var categoryDelete = this.categoryListItems.getItem(tapIndex).category;
        var newCategoryArray = [];
        var x = this;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        for (var i = 0; i < this.categoryListItems.length; i++) {
            if (this.categoryListItems.getItem(i).category == categoryDelete) { }
            else {
                console.log("else");
                newCategoryArray.push(this.categoryListItems.getItem(i).category);
            }
        }
        console.log("Category after deleted===" + newCategoryArray);
        firebase.setValue('/DeviceDetails/' + devicePhoneNumber + '/categoryList', {
            list: newCategoryArray,
        }).then(function (res) {
            console.log("Category list updated success..");
            timerModule.setTimeout(function () {
                x.categoryListItems = x.listViewItems.getCategoryList();
            }, 500);
        }, function (res) {
            console.log("Category list updated failure.." + res);
        });
        // this.categoryListItems.splice(tapIndex,categoryDelete);
        // console.log("Category after deleted==="+this.categoryListItems);
    };
    MaintenanceComponent.prototype.deleteGroup = function (args) {
        var tapIndex = this.groupListItems.indexOf(args.object.bindingContext);
        var groupDelete = this.groupListItems.getItem(tapIndex).group;
        var x = this;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        console.log("Group to delete===" + groupDelete);
        firebase.remove('/DeviceDetails/' + devicePhoneNumber + '/groupList/' + groupDelete).then(function (res) {
            console.log("Group list deleted success..");
            timerModule.setTimeout(function () {
                x.groupListItems = x.listViewItems.getGroupList();
            }, 500);
        }, function (res) {
            console.log("Group list deleted failure.." + res);
        });
    };
    MaintenanceComponent.prototype.groupTap = function (item) {
        console.log("Group Tapped==" + item.group);
        this.user.newGroup = item.group;
        this.selectedItems.length = 0;
        this.selectedItemsName.length = 0;
        this.selectedItemsToken.length = 0;
        this.createGroupButton();
        this.contactList = this.listViewItems.getContactListForUpdate(item.group);
        //console.log("Contact List In group tap===="+this.contactList);
    };
    MaintenanceComponent.prototype.createNewCategory = function () {
        var newCategory = this.user.newCategory;
        var newCategoryArray = [];
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var x = this;
        if (newCategory == null) { }
        else {
            this.user.newCategory = "";
            var layout = this.page;
            var categoryId = layout.getViewById("newCategory");
            if (categoryId.ios) {
                categoryId.ios.endEditing(true);
                this.tickIconVisibility = 'collapse';
            }
            else if (categoryId.android) {
                categoryId.android.clearFocus();
            }
            for (var i = 0; i < this.categoryListItems.length; i++) {
                newCategoryArray.push(this.categoryListItems.getItem(i).category);
            }
            newCategoryArray.push(newCategory);
            console.log("New Items Arrat===" + newCategoryArray);
            firebase.setValue('/DeviceDetails/' + devicePhoneNumber + '/categoryList', {
                list: newCategoryArray,
            }).then(function (res) {
                console.log("Category list updated success..");
                timerModule.setTimeout(function () {
                    x.categoryListItems = x.listViewItems.getCategoryList();
                    x.tickIconVisibility = 'visible';
                }, 1500);
            }, function (res) {
                console.log("Category list updated failure.." + res);
            });
        }
    };
    MaintenanceComponent.prototype.createNewGroup = function () {
        var newGroupName = this.user.newGroup;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        var x = this;
        console.log("New Group Name===" + newGroupName);
        console.log("Selected Items===" + this.selectedItems);
        if (newGroupName == null || this.selectedItems.length < 1) {
            console.log("Validation Fails==");
        }
        else {
            var layout = this.page;
            this.user.newGroup = "";
            var groupId = layout.getViewById("newGroupCreation");
            if (groupId.ios) {
                groupId.ios.endEditing(true);
                this.tickIconGroupVisibility = 'collapse';
            }
            else if (groupId.android) {
                groupId.android.clearFocus();
            }
            firebase.update('/DeviceDetails/' + devicePhoneNumber + '/groupList/' + newGroupName, {
                devicePhoneNumber: this.selectedItems,
                deviceToken: this.selectedItemsToken,
                deviceName: this.selectedItemsName
            }).then(function (res) {
                console.log("Group list updated success..");
                timerModule.setTimeout(function () {
                    x.groupListItems = x.listViewItems.getGroupList();
                    x.showGroupList();
                    // x.selectedItems=[];
                    // x.selectedItemsName=[];
                    // x.selectedItemsToken=[];
                }, 300);
            }, function (res) {
                console.log("Group list updated failure.." + res);
            });
        }
    };
    return MaintenanceComponent;
}());
MaintenanceComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "pages/maintenance/maintenance.html",
        styleUrls: ["pages/maintenance/maintenance-common.css", "pages/maintenance/maintenance.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page])
], MaintenanceComponent);
exports.MaintenanceComponent = MaintenanceComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbnRlbmFuY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbnRlbmFuY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQTZEO0FBSTdELDJDQUEwQztBQUMxQyx1REFBMEQ7QUFDMUQsMkVBQXlFO0FBQ3pFLDZEQVU4QjtBQUM5Qiw2REFBNEQ7QUFDNUQsb0RBQXVEO0FBQ3ZELGdDQUErQjtBQU8vQixJQUFhLG9CQUFvQjtJQW9CL0IsOEJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBakJ2Qix3QkFBbUIsR0FBQyxXQUFXLENBQUM7UUFDaEMsMkJBQXNCLEdBQUMsV0FBVyxDQUFDO1FBQ25DLHVCQUFrQixHQUFDLFdBQVcsQ0FBQztRQUMvQiw2QkFBd0IsR0FBQyxXQUFXLENBQUM7UUFDckMsdUJBQWtCLEdBQUMsU0FBUyxDQUFDO1FBQzdCLDRCQUF1QixHQUFDLFdBQVcsQ0FBQztRQUczQyxzQkFBaUIsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsbUJBQWMsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdkMsZ0JBQVcsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFDMUIsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1FBQzlCLHVCQUFrQixHQUFVLEVBQUUsQ0FBQztRQUMvQixzQkFBaUIsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFJeEMsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUMsSUFBSSw2QkFBYSxDQUFDO1FBQ3JDLHVEQUF1RDtJQUV6RCxDQUFDO0lBQ0QsdUNBQVEsR0FBUjtRQUVHLElBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENB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aUJBQWlCLEdBQUMsYUFBYSxHQUFDLFlBQVksRUFDOUQ7Z0JBQ0UsaUJBQWlCLEVBQUMsSUFBSSxDQUFDLGFBQWE7Z0JBQ3BDLFdBQVcsRUFBQyxJQUFJLENBQUMsa0JBQWtCO2dCQUNuQyxVQUFVLEVBQUMsSUFBSSxDQUFDLGlCQUFpQjthQUVsQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7Z0JBQzVDLFdBQVcsQ0FBQyxVQUFVLENBQUM7b0JBR2pCLENBQUMsQ0FBQyxjQUFjLEdBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDaEQsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNsQixzQkFBc0I7b0JBQ3RCLDBCQUEwQjtvQkFDMUIsMkJBQTJCO2dCQUdoQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFFVixDQUFDLEVBQUMsVUFBQyxHQUFHO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEdBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFJUCxDQUFDO0lBR0gsQ0FBQztJQUdILDJCQUFDO0FBQUQsQ0FBQyxBQW5YRCxJQW1YQztBQW5YWSxvQkFBb0I7SUFMaEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxvQ0FBb0M7UUFDakQsU0FBUyxFQUFFLENBQUMsMENBQTBDLEVBQUUsbUNBQW1DLENBQUM7S0FDN0YsQ0FBQztxQ0FxQjBCLFdBQUk7R0FwQm5CLG9CQUFvQixDQW1YaEM7QUFuWFksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3Rpdml0eUluZGljYXRvciB9IGZyb20gXCJ1aS9hY3Rpdml0eS1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhLCBSYWRMaXN0VmlldyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vbGlzdHZpZXdcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vc2VydmljZS91c2VyXCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0l0ZW1zIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvbGlzdHZpZXdpdGVtc1wiO1xuaW1wb3J0ICogYXMgdGltZXJNb2R1bGUgIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3RpbWVyXCI7IFxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbWFpbnRlbmFuY2UvbWFpbnRlbmFuY2UuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL21haW50ZW5hbmNlL21haW50ZW5hbmNlLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9tYWludGVuYW5jZS9tYWludGVuYW5jZS5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTWFpbnRlbmFuY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXRcbntcbiAgIFxuICBwdWJsaWMgZ3JvdXBMaXN0VmlzaWJpbGl0eT1cImNvbGxhcHNlZFwiO1xuICBwdWJsaWMgY2F0ZWdvcnlMaXN0VmlzaWJpbGl0eT1cImNvbGxhcHNlZFwiO1xuICBwdWJsaWMgdGlja0ljb25WaXNpYmlsaXR5PVwiY29sbGFwc2VkXCI7XG4gIHB1YmxpYyBuZXdHcm91cENyZWF0ZVZpc2liaWxpdHk9XCJjb2xsYXBzZWRcIjtcbiAgcHVibGljIGNhdGVnb3J5VmlzaWJpbGl0eT1cInZpc2libGVcIjtcbiAgcHVibGljIHRpY2tJY29uR3JvdXBWaXNpYmlsaXR5PVwiY29sbGFwc2VkXCI7XG5cbiAgdXNlcjogVXNlcjtcbiAgY2F0ZWdvcnlMaXN0SXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gIGdyb3VwTGlzdEl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICBsaXN0Vmlld0l0ZW1zOkxpc3RWaWV3SXRlbXNcbiAgY29udGFjdExpc3Q9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gIHNlbGVjdGVkSXRlbXM6c3RyaW5nW109W107XG4gIHNlbGVjdGVkSXRlbXNOYW1lOnN0cmluZ1tdPVtdO1xuICBzZWxlY3RlZEl0ZW1zVG9rZW46c3RyaW5nW109W107XG4gIGNvbnRhY3RMaXN0VXBkYXRlPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSlcbiAge1xuICAgIHRoaXMudXNlcj1uZXcgVXNlcigpO1xuICAgIHRoaXMubGlzdFZpZXdJdGVtcz1uZXcgTGlzdFZpZXdJdGVtcztcbiAgICAvL3RoaXMuY29udGFjdExpc3Q9dGhpcy5saXN0Vmlld0l0ZW1zLmdldENvbnRhY3RMaXN0KCk7XG5cbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICBcbiAgICAgdGhpcy5jYXRlZ29yeUxpc3RJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7ICBcbiAgICAgdGhpcy5ncm91cExpc3RJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0R3JvdXBMaXN0KCk7ICBcbiAgICBcblxuICB9XG4gIFxuICBwdWJsaWMgb25Td2lwZUNlbGxTdGFydGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKVxuICB7XG4gICAgICB2YXIgc3dpcGVMaW1pdHMgPSBhcmdzLmRhdGEuc3dpcGVMaW1pdHM7XG4gICAgICB2YXIgc3dpcGVWaWV3ID0gYXJnc1snb2JqZWN0J107XG4gICAgICB2YXIgbGVmdEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQ8Vmlldz4oJ2VtcHR5VmlldycpO1xuICAgICAgdmFyIHJpZ2h0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZDxWaWV3PignZGVsZXRlVmlldycpO1xuICAgICAgLy9zd2lwZUxpbWl0cy5sZWZ0ID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgICAgc3dpcGVMaW1pdHMubGVmdCA9IDA7XG4gICAgICBzd2lwZUxpbWl0cy5yaWdodCA9IHJpZ2h0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgIC8vIHN3aXBlTGltaXRzLnJpZ2h0ID0gMDtcbiAgICAgIHN3aXBlTGltaXRzLnRocmVzaG9sZCA9IGxlZnRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKSAvIDI7XG4gIH1cbiAgcHVibGljIGNyZWF0ZUdyb3VwQnV0dG9uKClcbiAge1xuICAgIFxuICAgIHRoaXMubmV3R3JvdXBDcmVhdGVWaXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgIHRoaXMuY2F0ZWdvcnlMaXN0VmlzaWJpbGl0eSA9ICdjb2xsYXBzZWQnO1xuICAgIHRoaXMuY2F0ZWdvcnlWaXNpYmlsaXR5PVwiY29sbGFwc2VkXCI7XG4gICAgdGhpcy50aWNrSWNvbkdyb3VwVmlzaWJpbGl0eT1cInZpc2libGVcIjtcblxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg9MFxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtc05hbWUubGVuZ3RoPTA7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW4ubGVuZ3RoPTA7XG5cbiAgICBcblxuICAgIGlmKHRoaXMuZ3JvdXBMaXN0VmlzaWJpbGl0eT09XCJ2aXNpYmxlXCIpXG4gICAge1xuICAgICAgdGhpcy5ncm91cExpc3RWaXNpYmlsaXR5ID0gJ2NvbGxhcHNlZCc7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0VmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICB9XG4gICAgdGhpcy5jb250YWN0TGlzdD10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0Q29udGFjdExpc3QoKTtcblxuICB9XG4gIHNob3dHcm91cExpc3QoKVxuICB7XG4gICBcbiAgICB0aGlzLm5ld0dyb3VwQ3JlYXRlVmlzaWJpbGl0eSA9ICdjb2xsYXBzZWQnO1xuICAgIHRoaXMudXNlci5uZXdHcm91cD1cIlwiO1xuICAgXG4gICAgdGhpcy5jYXRlZ29yeVZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XG5cbiAgICBpZih0aGlzLmdyb3VwTGlzdFZpc2liaWxpdHk9PVwidmlzaWJsZVwiKVxuICAgIHtcbiAgICAgIHRoaXMuZ3JvdXBMaXN0VmlzaWJpbGl0eSA9ICdjb2xsYXBzZWQnO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICB0aGlzLmdyb3VwTGlzdFZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgfVxuICAgXG5cbiAgfVxuICBzaG93Q2F0ZWdvcnlMaXN0KClcbiAge1xuICAgXG4gICAgaWYodGhpcy5jYXRlZ29yeUxpc3RWaXNpYmlsaXR5PT1cInZpc2libGVcIilcbiAgICB7XG4gICAgICB0aGlzLmNhdGVnb3J5TGlzdFZpc2liaWxpdHkgPSAnY29sbGFwc2UnO1xuICAgICAgdGhpcy50aWNrSWNvblZpc2liaWxpdHk9J2NvbGxhcHNlJztcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3RWaXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB0aGlzLnRpY2tJY29uVmlzaWJpbGl0eT0ndmlzaWJsZSc7XG4gICAgfVxuICAgXG5cbiAgfVxuICBwdWJsaWMgaXRlbVRhcChpdGVtKVxuICB7XG4gICAgICAvL2NvbnNvbGUubG9nKFwiSXRlbSB0YXA9LT09PT09PT09XCIraXRlbS5uYW1lKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiSXRlbSB0YXA9LT09PT09PT09XCIraXRlbS5uYW1lKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiSXRlbSB0YXAgc2VsZWN0ZWQtPT09PT09PT1cIitpdGVtLnNlbGVjdGVkKTtcblxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zPXRoaXMubGlzdFZpZXdJdGVtcy5zZWxlY3RlZEl0ZW1zO1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZT10aGlzLmxpc3RWaWV3SXRlbXMuc2VsZWN0ZWRJdGVtc05hbWU7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbj10aGlzLmxpc3RWaWV3SXRlbXMuc2VsZWN0ZWRJdGVtc1Rva2VuO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgbmFtZXM9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNOYW1lKTtcbiAgICAgIFxuICAgICAgLy8gY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcyB0b2tlbj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuKTtcblxuICAgICAgaWYoaXRlbS5zZWxlY3RlZClcbiAgICAgIHtcbiAgICAgICAgICBpdGVtLmNoZWNrQm94PVwiXFx1e2YwOTZ9XCI7XG5cbiAgICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIGN1ckl0ZW09dGhpcy5zZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2N1ciBpdGVtLS0tLScrY3VySXRlbSk7XG4gICAgICAgICAgICAgIGlmKGN1ckl0ZW09PWl0ZW0ubnVtYmVyKVxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW5kZXggOjo6Ojo6JytpKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc05hbWUuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbi5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgYWZ0ZXIgc2xpY2U9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXMpO1xuXG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICAgICBpdGVtLmNoZWNrQm94PVwiXFx1e2YwNDZ9XCI7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbS5udW1iZXIpO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc05hbWUucHVzaChpdGVtLm5hbWVMYWJlbCk7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW4ucHVzaChpdGVtLmRldmljZVRva2VuKTtcbiAgICAgICAgICBcbiAgICAgIH1cblxuICAgICAgaXRlbS5zZWxlY3RlZD0haXRlbS5zZWxlY3RlZDtcbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcz09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zIG5hbWVzPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZSk7XG4gICAgICBcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgdG9rZW49PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbik7XG4gICAgICBcblxuXG5cbiAgfVxuXG4gIHB1YmxpYyBvblB1bGxUb1JlZnJlc2hJbml0aWF0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpXG4gIHtcblxuICAgIHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXM9dGhpcy5saXN0Vmlld0l0ZW1zLmdldENhdGVnb3J5TGlzdCgpOyBcbiAgIHRpbWVyTW9kdWxlLnNldFRpbWVvdXQoZnVuY3Rpb24gKClcbiAgICB7XG4gICAgICAgICAgIHZhciBsaXN0VmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICAgICBsaXN0Vmlldy5ub3RpZnlQdWxsVG9SZWZyZXNoRmluaXNoZWQoKTtcbiAgICAgICB9LDEwMDApO1xuXG4gIH1cbiAgcHVibGljIGRlbGV0ZUNhdGVnb3J5KGFyZ3MpXG4gIHtcbiAgICAgIGxldCB0YXBJbmRleD10aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmluZGV4T2YoYXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQpO1xuICAgICAgbGV0IGNhdGVnb3J5RGVsZXRlPXRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkuY2F0ZWdvcnk7XG4gICAgICBsZXQgbmV3Q2F0ZWdvcnlBcnJheTpzdHJpbmdbXT1bXTtcbiAgICAgIGxldCB4PXRoaXM7XG4gICAgICBsZXQgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG5cbiAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jYXRlZ29yeUxpc3RJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAge1xuICAgICAgICBpZih0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmdldEl0ZW0oaSkuY2F0ZWdvcnk9PWNhdGVnb3J5RGVsZXRlKXt9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJlbHNlXCIpO1xuICAgICAgICAgIG5ld0NhdGVnb3J5QXJyYXkucHVzaCh0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmdldEl0ZW0oaSkuY2F0ZWdvcnkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IGFmdGVyIGRlbGV0ZWQ9PT1cIituZXdDYXRlZ29yeUFycmF5KTtcbiAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAnL0RldmljZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnL2NhdGVnb3J5TGlzdCcsXG4gICAgICAgIHtcbiAgICAgICAgICBsaXN0Om5ld0NhdGVnb3J5QXJyYXksXG4gICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IGxpc3QgdXBkYXRlZCBzdWNjZXNzLi5cIik7XG4gICAgICAgICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgeC5jYXRlZ29yeUxpc3RJdGVtcz14Lmxpc3RWaWV3SXRlbXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgIH0sNTAwKTtcbiAgICAgICAgICAgXG4gICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IGxpc3QgdXBkYXRlZCBmYWlsdXJlLi5cIityZXMpO1xuICAgICAgICB9KTtcblxuICAgICAgLy8gdGhpcy5jYXRlZ29yeUxpc3RJdGVtcy5zcGxpY2UodGFwSW5kZXgsY2F0ZWdvcnlEZWxldGUpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJDYXRlZ29yeSBhZnRlciBkZWxldGVkPT09XCIrdGhpcy5jYXRlZ29yeUxpc3RJdGVtcyk7XG5cbiAgfVxuICBwdWJsaWMgZGVsZXRlR3JvdXAoYXJncylcbiAge1xuICAgICAgbGV0IHRhcEluZGV4PXRoaXMuZ3JvdXBMaXN0SXRlbXMuaW5kZXhPZihhcmdzLm9iamVjdC5iaW5kaW5nQ29udGV4dCk7XG4gICAgICBsZXQgZ3JvdXBEZWxldGU9dGhpcy5ncm91cExpc3RJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5ncm91cDtcbiAgICAgIFxuICAgICAgbGV0IHg9dGhpcztcbiAgICAgIGxldCBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcblxuICAgICAgXG4gICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIHRvIGRlbGV0ZT09PVwiK2dyb3VwRGVsZXRlKTtcbiAgICAgIGZpcmViYXNlLnJlbW92ZShcbiAgICAgICAgJy9EZXZpY2VEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy9ncm91cExpc3QvJytncm91cERlbGV0ZSxcbiAgICAgICAgKS50aGVuKChyZXMpPT57XG4gICAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBsaXN0IGRlbGV0ZWQgc3VjY2Vzcy4uXCIpO1xuICAgICAgICAgIHRpbWVyTW9kdWxlLnNldFRpbWVvdXQoZnVuY3Rpb24gKClcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIHguZ3JvdXBMaXN0SXRlbXM9eC5saXN0Vmlld0l0ZW1zLmdldEdyb3VwTGlzdCgpO1xuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICB9LDUwMCk7XG4gICAgICAgICAgIFxuICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBsaXN0IGRlbGV0ZWQgZmFpbHVyZS4uXCIrcmVzKTtcbiAgICAgICAgfSk7XG5cblxuICB9XG4gIGdyb3VwVGFwKGl0ZW0pe1xuXG4gICAgY29uc29sZS5sb2coXCJHcm91cCBUYXBwZWQ9PVwiK2l0ZW0uZ3JvdXApO1xuICAgIHRoaXMudXNlci5uZXdHcm91cD1pdGVtLmdyb3VwO1xuXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aD0wXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZS5sZW5ndGg9MDtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbi5sZW5ndGg9MDtcblxuICAgIHRoaXMuY3JlYXRlR3JvdXBCdXR0b24oKTtcblxuICAgIFxuICAgIHRoaXMuY29udGFjdExpc3Q9dGhpcy5saXN0Vmlld0l0ZW1zLmdldENvbnRhY3RMaXN0Rm9yVXBkYXRlKGl0ZW0uZ3JvdXApO1xuXG4gICAgXG4gICAgLy9jb25zb2xlLmxvZyhcIkNvbnRhY3QgTGlzdCBJbiBncm91cCB0YXA9PT09XCIrdGhpcy5jb250YWN0TGlzdCk7XG5cblxuXG4gIH1cbiAgY3JlYXRlTmV3Q2F0ZWdvcnkoKVxuICB7XG4gICBcbiAgICBsZXQgbmV3Q2F0ZWdvcnk9dGhpcy51c2VyLm5ld0NhdGVnb3J5O1xuICAgIGxldCBuZXdDYXRlZ29yeUFycmF5OnN0cmluZ1tdPVtdO1xuICAgIGxldCBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICBsZXQgeD10aGlzO1xuICAgIGlmKG5ld0NhdGVnb3J5PT1udWxsKXt9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHRoaXMudXNlci5uZXdDYXRlZ29yeT1cIlwiO1xuICAgICAgdmFyIGxheW91dCA9IHRoaXMucGFnZTtcbiAgICAgIHZhciBjYXRlZ29yeUlkID0gbGF5b3V0LmdldFZpZXdCeUlkKFwibmV3Q2F0ZWdvcnlcIik7XG4gICAgICBpZiAoY2F0ZWdvcnlJZC5pb3MpXG4gICAgICB7XG4gICAgICAgIGNhdGVnb3J5SWQuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgIHRoaXMudGlja0ljb25WaXNpYmlsaXR5PSdjb2xsYXBzZSc7XG4gICAgICAgICAgXG4gICAgICB9XG4gICAgICAgZWxzZSBpZiAoY2F0ZWdvcnlJZC5hbmRyb2lkKVxuICAgICAge1xuICAgICAgICBjYXRlZ29yeUlkLmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICAgIFxuICAgICAgfVxuXG4gICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMubGVuZ3RoO2krKyl7XG4gICAgICAgIG5ld0NhdGVnb3J5QXJyYXkucHVzaCh0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmdldEl0ZW0oaSkuY2F0ZWdvcnkpO1xuICAgICAgfVxuXG4gICAgICBuZXdDYXRlZ29yeUFycmF5LnB1c2gobmV3Q2F0ZWdvcnkpO1xuICAgICAgXG4gICAgICBjb25zb2xlLmxvZyhcIk5ldyBJdGVtcyBBcnJhdD09PVwiK25ld0NhdGVnb3J5QXJyYXkpO1xuICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAnL0RldmljZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnL2NhdGVnb3J5TGlzdCcsXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGlzdDpuZXdDYXRlZ29yeUFycmF5LFxuICAgICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgbGlzdCB1cGRhdGVkIHN1Y2Nlc3MuLlwiKTtcbiAgICAgICAgICAgIHRpbWVyTW9kdWxlLnNldFRpbWVvdXQoZnVuY3Rpb24gKClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIHguY2F0ZWdvcnlMaXN0SXRlbXM9eC5saXN0Vmlld0l0ZW1zLmdldENhdGVnb3J5TGlzdCgpO1xuICAgICAgICAgICAgICAgICAgIHgudGlja0ljb25WaXNpYmlsaXR5PSd2aXNpYmxlJztcbiAgICAgICAgICAgICAgIH0sMTUwMCk7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYXRlZ29yeSBsaXN0IHVwZGF0ZWQgZmFpbHVyZS4uXCIrcmVzKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIFxuICAgIH1cbiAgfVxuICBjcmVhdGVOZXdHcm91cCgpe1xuXG4gICAgbGV0IG5ld0dyb3VwTmFtZT10aGlzLnVzZXIubmV3R3JvdXA7XG4gICAgbGV0IGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgIGxldCB4PXRoaXM7XG5cbiAgICBjb25zb2xlLmxvZyhcIk5ldyBHcm91cCBOYW1lPT09XCIrbmV3R3JvdXBOYW1lKTtcbiAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIEl0ZW1zPT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICBpZihuZXdHcm91cE5hbWU9PW51bGwgfHwgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDwxKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiVmFsaWRhdGlvbiBGYWlscz09XCIpO1xuICAgIH1cbiAgICBlbHNle1xuXG4gICAgIFxuICAgICAgICBcbiAgICAgICAgdmFyIGxheW91dCA9IHRoaXMucGFnZTtcbiAgICAgICAgdGhpcy51c2VyLm5ld0dyb3VwPVwiXCI7XG4gICAgICAgIHZhciBncm91cElkID0gbGF5b3V0LmdldFZpZXdCeUlkKFwibmV3R3JvdXBDcmVhdGlvblwiKTtcbiAgICAgICAgaWYgKGdyb3VwSWQuaW9zKVxuICAgICAgICB7XG4gICAgICAgICAgZ3JvdXBJZC5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICB0aGlzLnRpY2tJY29uR3JvdXBWaXNpYmlsaXR5PSdjb2xsYXBzZSc7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAgZWxzZSBpZiAoZ3JvdXBJZC5hbmRyb2lkKVxuICAgICAgICB7XG4gICAgICAgICAgZ3JvdXBJZC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICBmaXJlYmFzZS51cGRhdGUoXG4gICAgICAgICAnL0RldmljZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnL2dyb3VwTGlzdC8nK25ld0dyb3VwTmFtZSxcbiAgICAgICAgIHtcbiAgICAgICAgICAgZGV2aWNlUGhvbmVOdW1iZXI6dGhpcy5zZWxlY3RlZEl0ZW1zLFxuICAgICAgICAgICBkZXZpY2VUb2tlbjp0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbixcbiAgICAgICAgICAgZGV2aWNlTmFtZTp0aGlzLnNlbGVjdGVkSXRlbXNOYW1lXG5cbiAgICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBsaXN0IHVwZGF0ZWQgc3VjY2Vzcy4uXCIpO1xuICAgICAgICAgICB0aW1lck1vZHVsZS5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpXG4gICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgeC5ncm91cExpc3RJdGVtcz14Lmxpc3RWaWV3SXRlbXMuZ2V0R3JvdXBMaXN0KCk7IFxuICAgICAgICAgICAgICAgICB4LnNob3dHcm91cExpc3QoKTtcbiAgICAgICAgICAgICAgICAgLy8geC5zZWxlY3RlZEl0ZW1zPVtdO1xuICAgICAgICAgICAgICAgICAvLyB4LnNlbGVjdGVkSXRlbXNOYW1lPVtdO1xuICAgICAgICAgICAgICAgICAvLyB4LnNlbGVjdGVkSXRlbXNUb2tlbj1bXTtcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSwzMDApO1xuICAgICAgICAgICBcbiAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBsaXN0IHVwZGF0ZWQgZmFpbHVyZS4uXCIrcmVzKTtcbiAgICAgICAgfSk7XG4gICAgICBcblxuXG4gICAgfVxuXG5cbiAgfVxuXG4gIFxufVxuIl19