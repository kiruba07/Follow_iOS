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
        this.user = new user_1.User();
        this.listViewItems = new listviewitems_1.ListViewItems;
        this.contactList = this.listViewItems.getContactList();
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
        if (this.groupListVisibility == "visible") {
            this.groupListVisibility = 'collapsed';
        }
        else {
            this.groupListVisibility = 'visible';
        }
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
        if (item.selected) {
            item.checkBox = "\uF096";
            for (var i = 0; i < this.selectedItems.length; i++) {
                var curItem = this.selectedItems[i];
                //var curItemName=this.selectedItemsName[i]
                console.log('cur item----' + curItem);
                if (curItem == item.number) {
                    console.log('index ::::::' + i);
                    this.selectedItems.splice(i, 1);
                    this.selectedItemsName.splice(i, 1);
                    this.selectedItemsToken.splice(i, 1);
                }
            }
            //this.selectedItems.splice(item.number,1);
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
        //let newCategoryArray:string[]=[];
        var x = this;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        // for(let i=0;i<this.categoryListItems.length;i++)
        // {
        //   if(this.categoryListItems.getItem(i).category==categoryDelete){}
        //   else{
        //     console.log("else");
        //     newCategoryArray.push(this.categoryListItems.getItem(i).category);
        //   }
        // }
        console.log("Group to delete===" + groupDelete);
        firebase.remove('/DeviceDetails/' + devicePhoneNumber + '/groupList/' + groupDelete).then(function (res) {
            console.log("Group list deleted success..");
            timerModule.setTimeout(function () {
                x.groupListItems = x.listViewItems.getGroupList();
            }, 500);
        }, function (res) {
            console.log("Group list deleted failure.." + res);
        });
        // this.categoryListItems.splice(tapIndex,categoryDelete);
        // console.log("Category after deleted==="+this.categoryListItems);
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
            // for(let i=0;i<this.selectedItems.length;i++){
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
            firebase.setValue('/DeviceDetails/' + devicePhoneNumber + '/groupList/' + newGroupName, {
                devicePhoneNumber: this.selectedItems,
                deviceToken: this.selectedItemsToken,
            }).then(function (res) {
                console.log("Group list updated success..");
                timerModule.setTimeout(function () {
                    x.groupListItems = x.listViewItems.getGroupList();
                    x.showGroupList();
                }, 300);
            }, function (res) {
                console.log("Group list updated failure.." + res);
            });
            // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbnRlbmFuY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbnRlbmFuY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQTZEO0FBSTdELDJDQUEwQztBQUMxQyx1REFBMEQ7QUFDMUQsMkVBQXlFO0FBQ3pFLDZEQVU4QjtBQUM5Qiw2REFBNEQ7QUFDNUQsb0RBQXVEO0FBQ3ZELGdDQUErQjtBQU8vQixJQUFhLG9CQUFvQjtJQW1CL0IsOEJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBaEJ2Qix3QkFBbUIsR0FBQyxXQUFXLENBQUM7UUFDaEMsMkJBQXNCLEdBQUMsV0FBVyxDQUFDO1FBQ25DLHVCQUFrQixHQUFDLFdBQVcsQ0FBQztRQUMvQiw2QkFBd0IsR0FBQyxXQUFXLENBQUM7UUFDckMsdUJBQWtCLEdBQUMsU0FBUyxDQUFDO1FBQzdCLDRCQUF1QixHQUFDLFdBQVcsQ0FBQztRQUczQyxzQkFBaUIsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsbUJBQWMsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdkMsZ0JBQVcsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFDMUIsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1FBQzlCLHVCQUFrQixHQUFVLEVBQUUsQ0FBQztRQUk3QixJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksV0FBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBQyxJQUFJLDZCQUFhLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBRXZELENBQUM7SUFDRCx1Q0FBUSxHQUFSO1FBRUcsSUFBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDNUQsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBR3pELENBQUM7SUFFTSxpREFBa0IsR0FBekIsVUFBMEIsSUFBdUI7UUFFN0MsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQU8sV0FBVyxDQUFDLENBQUM7UUFDeEQsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBTyxZQUFZLENBQUMsQ0FBQztRQUMxRCxpREFBaUQ7UUFDakQsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDckIsV0FBVyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNsRCx5QkFBeUI7UUFDeEIsV0FBVyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUNNLGdEQUFpQixHQUF4QjtRQUdFLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxTQUFTLENBQUM7UUFDMUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFdBQVcsQ0FBQztRQUMxQyxJQUFJLENBQUMsa0JBQWtCLEdBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyx1QkFBdUIsR0FBQyxTQUFTLENBQUM7UUFFdkMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFFLFNBQVMsQ0FBQyxDQUN2QyxDQUFDO1lBQ0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsSUFBSSxDQUFBLENBQUM7WUFDRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO1FBQ3pDLENBQUM7SUFFSCxDQUFDO0lBQ0QsNENBQWEsR0FBYjtRQUdFLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxXQUFXLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsRUFBRSxDQUFDO1FBRXRCLElBQUksQ0FBQyxrQkFBa0IsR0FBQyxTQUFTLENBQUM7UUFFbEMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFFLFNBQVMsQ0FBQyxDQUN2QyxDQUFDO1lBQ0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsSUFBSSxDQUFBLENBQUM7WUFDRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO1FBQ3pDLENBQUM7SUFHSCxDQUFDO0lBQ0QsK0NBQWdCLEdBQWhCO1FBR0UsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLHNCQUFzQixJQUFFLFNBQVMsQ0FBQyxDQUMxQyxDQUFDO1lBQ0MsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFVBQVUsQ0FBQztZQUN6QyxJQUFJLENBQUMsa0JBQWtCLEdBQUMsVUFBVSxDQUFDO1FBQ3JDLENBQUM7UUFDRCxJQUFJLENBQUEsQ0FBQztZQUNELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxTQUFTLENBQUM7WUFDeEMsSUFBSSxDQUFDLGtCQUFrQixHQUFDLFNBQVMsQ0FBQztRQUN0QyxDQUFDO0lBR0gsQ0FBQztJQUNNLHNDQUFPLEdBQWQsVUFBZSxJQUFJO1FBRWYsOENBQThDO1FBQzlDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDakIsQ0FBQztZQUNHLElBQUksQ0FBQyxRQUFRLEdBQUMsUUFBVSxDQUFDO1lBRXpCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQzNDLENBQUM7Z0JBQ0csSUFBSSxPQUFPLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsMkNBQTJDO2dCQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEMsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDeEIsQ0FBQztvQkFDRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXhDLENBQUM7WUFDTCxDQUFDO1lBR0QsMkNBQTJDO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXZFLENBQUM7UUFDRCxJQUFJLENBQUEsQ0FBQztZQUNBLElBQUksQ0FBQyxRQUFRLEdBQUMsUUFBVSxDQUFDO1lBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVuRCxDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsR0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVqRSxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixHQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBS3RFLENBQUM7SUFFTSx1REFBd0IsR0FBL0IsVUFBZ0MsSUFBdUI7UUFHckQsSUFBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDN0QsV0FBVyxDQUFDLFVBQVUsQ0FBQztZQUVmLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDM0IsUUFBUSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDM0MsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBRWIsQ0FBQztJQUNNLDZDQUFjLEdBQXJCLFVBQXNCLElBQUk7UUFFdEIsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksY0FBYyxHQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3JFLElBQUksZ0JBQWdCLEdBQVUsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQztRQUNYLElBQUksaUJBQWlCLEdBQUMsZ0NBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRXJELEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDL0MsQ0FBQztZQUNDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFFLGNBQWMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDO1lBQ2hFLElBQUksQ0FBQSxDQUFDO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BFLENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsR0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzFELFFBQVEsQ0FBQyxRQUFRLENBQ2YsaUJBQWlCLEdBQUMsaUJBQWlCLEdBQUMsZUFBZSxFQUNuRDtZQUNFLElBQUksRUFBQyxnQkFBZ0I7U0FDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDL0MsV0FBVyxDQUFDLFVBQVUsQ0FBQztnQkFHaEIsQ0FBQyxDQUFDLGlCQUFpQixHQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFMUQsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRVosQ0FBQyxFQUFDLFVBQUMsR0FBRztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7UUFFTCwwREFBMEQ7UUFDMUQsbUVBQW1FO0lBRXZFLENBQUM7SUFDTSwwQ0FBVyxHQUFsQixVQUFtQixJQUFJO1FBRW5CLElBQUksUUFBUSxHQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckUsSUFBSSxXQUFXLEdBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzVELG1DQUFtQztRQUNuQyxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUM7UUFDWCxJQUFJLGlCQUFpQixHQUFDLGdDQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVyRCxtREFBbUQ7UUFDbkQsSUFBSTtRQUNKLHFFQUFxRTtRQUNyRSxVQUFVO1FBQ1YsMkJBQTJCO1FBQzNCLHlFQUF5RTtRQUN6RSxNQUFNO1FBQ04sSUFBSTtRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUMsUUFBUSxDQUFDLE1BQU0sQ0FDYixpQkFBaUIsR0FBQyxpQkFBaUIsR0FBQyxhQUFhLEdBQUMsV0FBVyxDQUM1RCxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDNUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztnQkFHaEIsQ0FBQyxDQUFDLGNBQWMsR0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRXBELENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUVaLENBQUMsRUFBQyxVQUFDLEdBQUc7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBRUwsMERBQTBEO1FBQzFELG1FQUFtRTtJQUV2RSxDQUFDO0lBQ0QsZ0RBQWlCLEdBQWpCO1FBR0UsSUFBSSxXQUFXLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdEMsSUFBSSxnQkFBZ0IsR0FBVSxFQUFFLENBQUM7UUFDakMsSUFBSSxpQkFBaUIsR0FBQyxnQ0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDO1FBQ1gsRUFBRSxDQUFBLENBQUMsV0FBVyxJQUFFLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDO1FBQ3ZCLElBQUksQ0FDSixDQUFDO1lBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsRUFBRSxDQUFDO1lBQ3pCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdkIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNuRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQ25CLENBQUM7Z0JBQ0MsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxrQkFBa0IsR0FBQyxVQUFVLENBQUM7WUFFckMsQ0FBQztZQUNBLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQzdCLENBQUM7Z0JBQ0MsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVsQyxDQUFDO1lBRUQsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7Z0JBQy9DLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BFLENBQUM7WUFFRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pELFFBQVEsQ0FBQyxRQUFRLENBQ2YsaUJBQWlCLEdBQUMsaUJBQWlCLEdBQUMsZUFBZSxFQUNuRDtnQkFDRSxJQUFJLEVBQUMsZ0JBQWdCO2FBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztnQkFDL0MsV0FBVyxDQUFDLFVBQVUsQ0FBQztvQkFHaEIsQ0FBQyxDQUFDLGlCQUFpQixHQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ3RELENBQUMsQ0FBQyxrQkFBa0IsR0FBQyxTQUFTLENBQUM7Z0JBQ25DLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztZQUViLENBQUMsRUFBQyxVQUFDLEdBQUc7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsR0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztRQUdULENBQUM7SUFDSCxDQUFDO0lBQ0QsNkNBQWMsR0FBZDtRQUVFLElBQUksWUFBWSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksaUJBQWlCLEdBQUMsZ0NBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQztRQUVYLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEQsRUFBRSxDQUFBLENBQUMsWUFBWSxJQUFFLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsSUFBSSxDQUFBLENBQUM7WUFFSCxnREFBZ0Q7WUFHOUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxFQUFFLENBQUM7WUFDdEIsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3JELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDaEIsQ0FBQztnQkFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLHVCQUF1QixHQUFDLFVBQVUsQ0FBQztZQUUxQyxDQUFDO1lBQ0EsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDMUIsQ0FBQztnQkFDQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRS9CLENBQUM7WUFFSCxRQUFRLENBQUMsUUFBUSxDQUNmLGlCQUFpQixHQUFDLGlCQUFpQixHQUFDLGFBQWEsR0FBQyxZQUFZLEVBQzlEO2dCQUNFLGlCQUFpQixFQUFDLElBQUksQ0FBQyxhQUFhO2dCQUNwQyxXQUFXLEVBQUMsSUFBSSxDQUFDLGtCQUFrQjthQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7Z0JBQzVDLFdBQVcsQ0FBQyxVQUFVLENBQUM7b0JBR2pCLENBQUMsQ0FBQyxjQUFjLEdBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDaEQsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUVyQixDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFFWixDQUFDLEVBQUMsVUFBQyxHQUFHO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEdBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFDTCxJQUFJO1FBR04sQ0FBQztJQUdILENBQUM7SUFHSCwyQkFBQztBQUFELENBQUMsQUFqVkQsSUFpVkM7QUFqVlksb0JBQW9CO0lBTGhDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELFNBQVMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLG1DQUFtQyxDQUFDO0tBQzdGLENBQUM7cUNBb0IwQixXQUFJO0dBbkJuQixvQkFBb0IsQ0FpVmhDO0FBalZZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZpdHlJbmRpY2F0b3IgfSBmcm9tIFwidWkvYWN0aXZpdHktaW5kaWNhdG9yXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3XCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvdXNlclwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7XG4gICAgZ2V0Qm9vbGVhbixcbiAgICBzZXRCb29sZWFuLFxuICAgIGdldE51bWJlcixcbiAgICBzZXROdW1iZXIsXG4gICAgZ2V0U3RyaW5nLFxuICAgIHNldFN0cmluZyxcbiAgICBoYXNLZXksXG4gICAgcmVtb3ZlLFxuICAgIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgTGlzdFZpZXdJdGVtcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2xpc3R2aWV3aXRlbXNcIjtcbmltcG9ydCAqIGFzIHRpbWVyTW9kdWxlICBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy90aW1lclwiOyBcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL21haW50ZW5hbmNlL21haW50ZW5hbmNlLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9tYWludGVuYW5jZS9tYWludGVuYW5jZS1jb21tb24uY3NzXCIsIFwicGFnZXMvbWFpbnRlbmFuY2UvbWFpbnRlbmFuY2UuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIE1haW50ZW5hbmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0XG57XG4gICBcbiAgcHVibGljIGdyb3VwTGlzdFZpc2liaWxpdHk9XCJjb2xsYXBzZWRcIjtcbiAgcHVibGljIGNhdGVnb3J5TGlzdFZpc2liaWxpdHk9XCJjb2xsYXBzZWRcIjtcbiAgcHVibGljIHRpY2tJY29uVmlzaWJpbGl0eT1cImNvbGxhcHNlZFwiO1xuICBwdWJsaWMgbmV3R3JvdXBDcmVhdGVWaXNpYmlsaXR5PVwiY29sbGFwc2VkXCI7XG4gIHB1YmxpYyBjYXRlZ29yeVZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XG4gIHB1YmxpYyB0aWNrSWNvbkdyb3VwVmlzaWJpbGl0eT1cImNvbGxhcHNlZFwiO1xuXG4gIHVzZXI6IFVzZXI7XG4gIGNhdGVnb3J5TGlzdEl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICBncm91cExpc3RJdGVtcz1uZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgbGlzdFZpZXdJdGVtczpMaXN0Vmlld0l0ZW1zXG4gIGNvbnRhY3RMaXN0PW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICBzZWxlY3RlZEl0ZW1zOnN0cmluZ1tdPVtdO1xuICBzZWxlY3RlZEl0ZW1zTmFtZTpzdHJpbmdbXT1bXTtcbiAgc2VsZWN0ZWRJdGVtc1Rva2VuOnN0cmluZ1tdPVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSlcbiAge1xuICAgIHRoaXMudXNlcj1uZXcgVXNlcigpO1xuICAgIHRoaXMubGlzdFZpZXdJdGVtcz1uZXcgTGlzdFZpZXdJdGVtcztcbiAgICB0aGlzLmNvbnRhY3RMaXN0PXRoaXMubGlzdFZpZXdJdGVtcy5nZXRDb250YWN0TGlzdCgpO1xuXG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgXG4gICAgIHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXM9dGhpcy5saXN0Vmlld0l0ZW1zLmdldENhdGVnb3J5TGlzdCgpOyAgXG4gICAgIHRoaXMuZ3JvdXBMaXN0SXRlbXM9dGhpcy5saXN0Vmlld0l0ZW1zLmdldEdyb3VwTGlzdCgpOyAgXG4gICAgXG5cbiAgfVxuICBcbiAgcHVibGljIG9uU3dpcGVDZWxsU3RhcnRlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSlcbiAge1xuICAgICAgdmFyIHN3aXBlTGltaXRzID0gYXJncy5kYXRhLnN3aXBlTGltaXRzO1xuICAgICAgdmFyIHN3aXBlVmlldyA9IGFyZ3NbJ29iamVjdCddO1xuICAgICAgdmFyIGxlZnRJdGVtID0gc3dpcGVWaWV3LmdldFZpZXdCeUlkPFZpZXc+KCdlbXB0eVZpZXcnKTtcbiAgICAgIHZhciByaWdodEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQ8Vmlldz4oJ2RlbGV0ZVZpZXcnKTtcbiAgICAgIC8vc3dpcGVMaW1pdHMubGVmdCA9IGxlZnRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICAgIHN3aXBlTGltaXRzLmxlZnQgPSAwO1xuICAgICAgc3dpcGVMaW1pdHMucmlnaHQgPSByaWdodEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgICAvLyBzd2lwZUxpbWl0cy5yaWdodCA9IDA7XG4gICAgICBzd2lwZUxpbWl0cy50aHJlc2hvbGQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCkgLyAyO1xuICB9XG4gIHB1YmxpYyBjcmVhdGVHcm91cEJ1dHRvbigpXG4gIHtcbiAgICBcbiAgICB0aGlzLm5ld0dyb3VwQ3JlYXRlVmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICB0aGlzLmNhdGVnb3J5TGlzdFZpc2liaWxpdHkgPSAnY29sbGFwc2VkJztcbiAgICB0aGlzLmNhdGVnb3J5VmlzaWJpbGl0eT1cImNvbGxhcHNlZFwiO1xuICAgIHRoaXMudGlja0ljb25Hcm91cFZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XG4gICAgXG4gICAgaWYodGhpcy5ncm91cExpc3RWaXNpYmlsaXR5PT1cInZpc2libGVcIilcbiAgICB7XG4gICAgICB0aGlzLmdyb3VwTGlzdFZpc2liaWxpdHkgPSAnY29sbGFwc2VkJztcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdGhpcy5ncm91cExpc3RWaXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgIH1cblxuICB9XG4gIHNob3dHcm91cExpc3QoKVxuICB7XG4gICBcbiAgICB0aGlzLm5ld0dyb3VwQ3JlYXRlVmlzaWJpbGl0eSA9ICdjb2xsYXBzZWQnO1xuICAgIHRoaXMudXNlci5uZXdHcm91cD1cIlwiO1xuICAgXG4gICAgdGhpcy5jYXRlZ29yeVZpc2liaWxpdHk9XCJ2aXNpYmxlXCI7XG5cbiAgICBpZih0aGlzLmdyb3VwTGlzdFZpc2liaWxpdHk9PVwidmlzaWJsZVwiKVxuICAgIHtcbiAgICAgIHRoaXMuZ3JvdXBMaXN0VmlzaWJpbGl0eSA9ICdjb2xsYXBzZWQnO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICB0aGlzLmdyb3VwTGlzdFZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgfVxuICAgXG5cbiAgfVxuICBzaG93Q2F0ZWdvcnlMaXN0KClcbiAge1xuICAgXG4gICAgaWYodGhpcy5jYXRlZ29yeUxpc3RWaXNpYmlsaXR5PT1cInZpc2libGVcIilcbiAgICB7XG4gICAgICB0aGlzLmNhdGVnb3J5TGlzdFZpc2liaWxpdHkgPSAnY29sbGFwc2UnO1xuICAgICAgdGhpcy50aWNrSWNvblZpc2liaWxpdHk9J2NvbGxhcHNlJztcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3RWaXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB0aGlzLnRpY2tJY29uVmlzaWJpbGl0eT0ndmlzaWJsZSc7XG4gICAgfVxuICAgXG5cbiAgfVxuICBwdWJsaWMgaXRlbVRhcChpdGVtKVxuICB7XG4gICAgICAvL2NvbnNvbGUubG9nKFwiSXRlbSB0YXA9LT09PT09PT09XCIraXRlbS5uYW1lKTtcbiAgICAgIGlmKGl0ZW0uc2VsZWN0ZWQpXG4gICAgICB7XG4gICAgICAgICAgaXRlbS5jaGVja0JveD1cIlxcdXtmMDk2fVwiO1xuXG4gICAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO2krKylcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhciBjdXJJdGVtPXRoaXMuc2VsZWN0ZWRJdGVtc1tpXTtcbiAgICAgICAgICAgICAgLy92YXIgY3VySXRlbU5hbWU9dGhpcy5zZWxlY3RlZEl0ZW1zTmFtZVtpXVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY3VyIGl0ZW0tLS0tJytjdXJJdGVtKTtcbiAgICAgICAgICAgICAgaWYoY3VySXRlbT09aXRlbS5udW1iZXIpXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmRleCA6Ojo6OjonK2kpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZS5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIC8vdGhpcy5zZWxlY3RlZEl0ZW1zLnNwbGljZShpdGVtLm51bWJlciwxKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zIGFmdGVyIHNsaWNlPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zKTtcblxuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgICAgaXRlbS5jaGVja0JveD1cIlxcdXtmMDQ2fVwiO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0ubnVtYmVyKTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNOYW1lLnB1c2goaXRlbS5uYW1lTGFiZWwpO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuLnB1c2goaXRlbS5kZXZpY2VUb2tlbik7XG4gICAgICAgICAgXG4gICAgICB9XG5cbiAgICAgIGl0ZW0uc2VsZWN0ZWQ9IWl0ZW0uc2VsZWN0ZWQ7XG4gICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgbmFtZXM9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNOYW1lKTtcbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcyB0b2tlbj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuKTtcbiAgICAgIFxuXG5cblxuICB9XG5cbiAgcHVibGljIG9uUHVsbFRvUmVmcmVzaEluaXRpYXRlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSlcbiAge1xuXG4gICAgdGhpcy5jYXRlZ29yeUxpc3RJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7IFxuICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgIHtcbiAgICAgICAgICAgdmFyIGxpc3RWaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgICAgICAgIGxpc3RWaWV3Lm5vdGlmeVB1bGxUb1JlZnJlc2hGaW5pc2hlZCgpO1xuICAgICAgIH0sMTAwMCk7XG5cbiAgfVxuICBwdWJsaWMgZGVsZXRlQ2F0ZWdvcnkoYXJncylcbiAge1xuICAgICAgbGV0IHRhcEluZGV4PXRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMuaW5kZXhPZihhcmdzLm9iamVjdC5iaW5kaW5nQ29udGV4dCk7XG4gICAgICBsZXQgY2F0ZWdvcnlEZWxldGU9dGhpcy5jYXRlZ29yeUxpc3RJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jYXRlZ29yeTtcbiAgICAgIGxldCBuZXdDYXRlZ29yeUFycmF5OnN0cmluZ1tdPVtdO1xuICAgICAgbGV0IHg9dGhpcztcbiAgICAgIGxldCBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcblxuICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICB7XG4gICAgICAgIGlmKHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMuZ2V0SXRlbShpKS5jYXRlZ29yeT09Y2F0ZWdvcnlEZWxldGUpe31cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVsc2VcIik7XG4gICAgICAgICAgbmV3Q2F0ZWdvcnlBcnJheS5wdXNoKHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMuZ2V0SXRlbShpKS5jYXRlZ29yeSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgYWZ0ZXIgZGVsZXRlZD09PVwiK25ld0NhdGVnb3J5QXJyYXkpO1xuICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICcvRGV2aWNlRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvY2F0ZWdvcnlMaXN0JyxcbiAgICAgICAge1xuICAgICAgICAgIGxpc3Q6bmV3Q2F0ZWdvcnlBcnJheSxcbiAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgbGlzdCB1cGRhdGVkIHN1Y2Nlc3MuLlwiKTtcbiAgICAgICAgICB0aW1lck1vZHVsZS5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpXG4gICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICB4LmNhdGVnb3J5TGlzdEl0ZW1zPXgubGlzdFZpZXdJdGVtcy5nZXRDYXRlZ29yeUxpc3QoKTtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgfSw1MDApO1xuICAgICAgICAgICBcbiAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgbGlzdCB1cGRhdGVkIGZhaWx1cmUuLlwiK3Jlcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLnNwbGljZSh0YXBJbmRleCxjYXRlZ29yeURlbGV0ZSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IGFmdGVyIGRlbGV0ZWQ9PT1cIit0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zKTtcblxuICB9XG4gIHB1YmxpYyBkZWxldGVHcm91cChhcmdzKVxuICB7XG4gICAgICBsZXQgdGFwSW5kZXg9dGhpcy5ncm91cExpc3RJdGVtcy5pbmRleE9mKGFyZ3Mub2JqZWN0LmJpbmRpbmdDb250ZXh0KTtcbiAgICAgIGxldCBncm91cERlbGV0ZT10aGlzLmdyb3VwTGlzdEl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmdyb3VwO1xuICAgICAgLy9sZXQgbmV3Q2F0ZWdvcnlBcnJheTpzdHJpbmdbXT1bXTtcbiAgICAgIGxldCB4PXRoaXM7XG4gICAgICBsZXQgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG5cbiAgICAgIC8vIGZvcihsZXQgaT0wO2k8dGhpcy5jYXRlZ29yeUxpc3RJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAgLy8ge1xuICAgICAgLy8gICBpZih0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmdldEl0ZW0oaSkuY2F0ZWdvcnk9PWNhdGVnb3J5RGVsZXRlKXt9XG4gICAgICAvLyAgIGVsc2V7XG4gICAgICAvLyAgICAgY29uc29sZS5sb2coXCJlbHNlXCIpO1xuICAgICAgLy8gICAgIG5ld0NhdGVnb3J5QXJyYXkucHVzaCh0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmdldEl0ZW0oaSkuY2F0ZWdvcnkpO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9XG4gICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIHRvIGRlbGV0ZT09PVwiK2dyb3VwRGVsZXRlKTtcbiAgICAgIGZpcmViYXNlLnJlbW92ZShcbiAgICAgICAgJy9EZXZpY2VEZXRhaWxzLycrZGV2aWNlUGhvbmVOdW1iZXIrJy9ncm91cExpc3QvJytncm91cERlbGV0ZSxcbiAgICAgICAgKS50aGVuKChyZXMpPT57XG4gICAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBsaXN0IGRlbGV0ZWQgc3VjY2Vzcy4uXCIpO1xuICAgICAgICAgIHRpbWVyTW9kdWxlLnNldFRpbWVvdXQoZnVuY3Rpb24gKClcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIHguZ3JvdXBMaXN0SXRlbXM9eC5saXN0Vmlld0l0ZW1zLmdldEdyb3VwTGlzdCgpO1xuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICB9LDUwMCk7XG4gICAgICAgICAgIFxuICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBsaXN0IGRlbGV0ZWQgZmFpbHVyZS4uXCIrcmVzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMuc3BsaWNlKHRhcEluZGV4LGNhdGVnb3J5RGVsZXRlKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgYWZ0ZXIgZGVsZXRlZD09PVwiK3RoaXMuY2F0ZWdvcnlMaXN0SXRlbXMpO1xuXG4gIH1cbiAgY3JlYXRlTmV3Q2F0ZWdvcnkoKVxuICB7XG4gICBcbiAgICBsZXQgbmV3Q2F0ZWdvcnk9dGhpcy51c2VyLm5ld0NhdGVnb3J5O1xuICAgIGxldCBuZXdDYXRlZ29yeUFycmF5OnN0cmluZ1tdPVtdO1xuICAgIGxldCBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcbiAgICBsZXQgeD10aGlzO1xuICAgIGlmKG5ld0NhdGVnb3J5PT1udWxsKXt9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHRoaXMudXNlci5uZXdDYXRlZ29yeT1cIlwiO1xuICAgICAgdmFyIGxheW91dCA9IHRoaXMucGFnZTtcbiAgICAgIHZhciBjYXRlZ29yeUlkID0gbGF5b3V0LmdldFZpZXdCeUlkKFwibmV3Q2F0ZWdvcnlcIik7XG4gICAgICBpZiAoY2F0ZWdvcnlJZC5pb3MpXG4gICAgICB7XG4gICAgICAgIGNhdGVnb3J5SWQuaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgIHRoaXMudGlja0ljb25WaXNpYmlsaXR5PSdjb2xsYXBzZSc7XG4gICAgICAgICAgXG4gICAgICB9XG4gICAgICAgZWxzZSBpZiAoY2F0ZWdvcnlJZC5hbmRyb2lkKVxuICAgICAge1xuICAgICAgICBjYXRlZ29yeUlkLmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICAgIFxuICAgICAgfVxuXG4gICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMubGVuZ3RoO2krKyl7XG4gICAgICAgIG5ld0NhdGVnb3J5QXJyYXkucHVzaCh0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmdldEl0ZW0oaSkuY2F0ZWdvcnkpO1xuICAgICAgfVxuXG4gICAgICBuZXdDYXRlZ29yeUFycmF5LnB1c2gobmV3Q2F0ZWdvcnkpO1xuICAgICAgXG4gICAgICBjb25zb2xlLmxvZyhcIk5ldyBJdGVtcyBBcnJhdD09PVwiK25ld0NhdGVnb3J5QXJyYXkpO1xuICAgICAgICBmaXJlYmFzZS5zZXRWYWx1ZShcbiAgICAgICAgICAnL0RldmljZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnL2NhdGVnb3J5TGlzdCcsXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGlzdDpuZXdDYXRlZ29yeUFycmF5LFxuICAgICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgbGlzdCB1cGRhdGVkIHN1Y2Nlc3MuLlwiKTtcbiAgICAgICAgICAgIHRpbWVyTW9kdWxlLnNldFRpbWVvdXQoZnVuY3Rpb24gKClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIHguY2F0ZWdvcnlMaXN0SXRlbXM9eC5saXN0Vmlld0l0ZW1zLmdldENhdGVnb3J5TGlzdCgpO1xuICAgICAgICAgICAgICAgICAgIHgudGlja0ljb25WaXNpYmlsaXR5PSd2aXNpYmxlJztcbiAgICAgICAgICAgICAgIH0sMTUwMCk7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYXRlZ29yeSBsaXN0IHVwZGF0ZWQgZmFpbHVyZS4uXCIrcmVzKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIFxuICAgIH1cbiAgfVxuICBjcmVhdGVOZXdHcm91cCgpe1xuXG4gICAgbGV0IG5ld0dyb3VwTmFtZT10aGlzLnVzZXIubmV3R3JvdXA7XG4gICAgbGV0IGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgIGxldCB4PXRoaXM7XG5cbiAgICBjb25zb2xlLmxvZyhcIk5ldyBHcm91cCBOYW1lPT09XCIrbmV3R3JvdXBOYW1lKTtcbiAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIEl0ZW1zPT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICBpZihuZXdHcm91cE5hbWU9PW51bGwgfHwgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDwxKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiVmFsaWRhdGlvbiBGYWlscz09XCIpO1xuICAgIH1cbiAgICBlbHNle1xuXG4gICAgICAvLyBmb3IobGV0IGk9MDtpPHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7aSsrKXtcblxuICAgICAgICBcbiAgICAgICAgdmFyIGxheW91dCA9IHRoaXMucGFnZTtcbiAgICAgICAgdGhpcy51c2VyLm5ld0dyb3VwPVwiXCI7XG4gICAgICAgIHZhciBncm91cElkID0gbGF5b3V0LmdldFZpZXdCeUlkKFwibmV3R3JvdXBDcmVhdGlvblwiKTtcbiAgICAgICAgaWYgKGdyb3VwSWQuaW9zKVxuICAgICAgICB7XG4gICAgICAgICAgZ3JvdXBJZC5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICB0aGlzLnRpY2tJY29uR3JvdXBWaXNpYmlsaXR5PSdjb2xsYXBzZSc7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAgZWxzZSBpZiAoZ3JvdXBJZC5hbmRyb2lkKVxuICAgICAgICB7XG4gICAgICAgICAgZ3JvdXBJZC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAnL0RldmljZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnL2dyb3VwTGlzdC8nK25ld0dyb3VwTmFtZSxcbiAgICAgICAge1xuICAgICAgICAgIGRldmljZVBob25lTnVtYmVyOnRoaXMuc2VsZWN0ZWRJdGVtcyxcbiAgICAgICAgICBkZXZpY2VUb2tlbjp0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbixcbiAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiR3JvdXAgbGlzdCB1cGRhdGVkIHN1Y2Nlc3MuLlwiKTtcbiAgICAgICAgICB0aW1lck1vZHVsZS5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpXG4gICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHguZ3JvdXBMaXN0SXRlbXM9eC5saXN0Vmlld0l0ZW1zLmdldEdyb3VwTGlzdCgpOyBcbiAgICAgICAgICAgICAgICB4LnNob3dHcm91cExpc3QoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICB9LDMwMCk7XG4gICAgICAgICAgIFxuICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgY29uc29sZS5sb2coXCJHcm91cCBsaXN0IHVwZGF0ZWQgZmFpbHVyZS4uXCIrcmVzKTtcbiAgICAgICAgfSk7XG4gICAgICAvLyB9XG5cblxuICAgIH1cblxuXG4gIH1cblxuICBcbn1cbiJdfQ==