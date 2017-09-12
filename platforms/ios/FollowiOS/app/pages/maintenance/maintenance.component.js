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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbnRlbmFuY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbnRlbmFuY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQTZEO0FBSTdELDJDQUEwQztBQUMxQyx1REFBMEQ7QUFDMUQsMkVBQXlFO0FBQ3pFLDZEQVU4QjtBQUM5Qiw2REFBNEQ7QUFDNUQsb0RBQXVEO0FBQ3ZELGdDQUErQjtBQU8vQixJQUFhLG9CQUFvQjtJQW9CL0IsOEJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBakJ2Qix3QkFBbUIsR0FBQyxXQUFXLENBQUM7UUFDaEMsMkJBQXNCLEdBQUMsV0FBVyxDQUFDO1FBQ25DLHVCQUFrQixHQUFDLFdBQVcsQ0FBQztRQUMvQiw2QkFBd0IsR0FBQyxXQUFXLENBQUM7UUFDckMsdUJBQWtCLEdBQUMsU0FBUyxDQUFDO1FBQzdCLDRCQUF1QixHQUFDLFdBQVcsQ0FBQztRQUczQyxzQkFBaUIsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsbUJBQWMsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdkMsZ0JBQVcsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFDMUIsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1FBQzlCLHVCQUFrQixHQUFVLEVBQUUsQ0FBQztRQUMvQixzQkFBaUIsR0FBQyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFJeEMsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUMsSUFBSSw2QkFBYSxDQUFDO1FBQ3JDLHVEQUF1RDtJQUV6RCxDQUFDO0lBQ0QsdUNBQVEsR0FBUjtRQUVHLElBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENB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aUJBQWlCLEdBQUMsYUFBYSxHQUFDLFlBQVksRUFDOUQ7Z0JBQ0UsaUJBQWlCLEVBQUMsSUFBSSxDQUFDLGFBQWE7Z0JBQ3BDLFdBQVcsRUFBQyxJQUFJLENBQUMsa0JBQWtCO2FBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztnQkFDNUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztvQkFHakIsQ0FBQyxDQUFDLGNBQWMsR0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNoRCxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ2xCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO29CQUMxQiwyQkFBMkI7Z0JBR2hDLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztZQUVWLENBQUMsRUFBQyxVQUFDLEdBQUc7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FBQztRQUlQLENBQUM7SUFHSCxDQUFDO0lBR0gsMkJBQUM7QUFBRCxDQUFDLEFBalhELElBaVhDO0FBalhZLG9CQUFvQjtJQUxoQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsV0FBVyxFQUFFLG9DQUFvQztRQUNqRCxTQUFTLEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxtQ0FBbUMsQ0FBQztLQUM3RixDQUFDO3FDQXFCMEIsV0FBSTtHQXBCbkIsb0JBQW9CLENBaVhoQztBQWpYWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2aXR5SW5kaWNhdG9yIH0gZnJvbSBcInVpL2FjdGl2aXR5LWluZGljYXRvclwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlld1wiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL3VzZXJcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IExpc3RWaWV3SXRlbXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9saXN0dmlld2l0ZW1zXCI7XG5pbXBvcnQgKiBhcyB0aW1lck1vZHVsZSAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdGltZXJcIjsgXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9tYWludGVuYW5jZS9tYWludGVuYW5jZS5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvbWFpbnRlbmFuY2UvbWFpbnRlbmFuY2UtY29tbW9uLmNzc1wiLCBcInBhZ2VzL21haW50ZW5hbmNlL21haW50ZW5hbmNlLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBNYWludGVuYW5jZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxue1xuICAgXG4gIHB1YmxpYyBncm91cExpc3RWaXNpYmlsaXR5PVwiY29sbGFwc2VkXCI7XG4gIHB1YmxpYyBjYXRlZ29yeUxpc3RWaXNpYmlsaXR5PVwiY29sbGFwc2VkXCI7XG4gIHB1YmxpYyB0aWNrSWNvblZpc2liaWxpdHk9XCJjb2xsYXBzZWRcIjtcbiAgcHVibGljIG5ld0dyb3VwQ3JlYXRlVmlzaWJpbGl0eT1cImNvbGxhcHNlZFwiO1xuICBwdWJsaWMgY2F0ZWdvcnlWaXNpYmlsaXR5PVwidmlzaWJsZVwiO1xuICBwdWJsaWMgdGlja0ljb25Hcm91cFZpc2liaWxpdHk9XCJjb2xsYXBzZWRcIjtcblxuICB1c2VyOiBVc2VyO1xuICBjYXRlZ29yeUxpc3RJdGVtcz1uZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgZ3JvdXBMaXN0SXRlbXM9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gIGxpc3RWaWV3SXRlbXM6TGlzdFZpZXdJdGVtc1xuICBjb250YWN0TGlzdD1uZXcgT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgc2VsZWN0ZWRJdGVtczpzdHJpbmdbXT1bXTtcbiAgc2VsZWN0ZWRJdGVtc05hbWU6c3RyaW5nW109W107XG4gIHNlbGVjdGVkSXRlbXNUb2tlbjpzdHJpbmdbXT1bXTtcbiAgY29udGFjdExpc3RVcGRhdGU9bmV3IE9ic2VydmFibGVBcnJheShbXSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKVxuICB7XG4gICAgdGhpcy51c2VyPW5ldyBVc2VyKCk7XG4gICAgdGhpcy5saXN0Vmlld0l0ZW1zPW5ldyBMaXN0Vmlld0l0ZW1zO1xuICAgIC8vdGhpcy5jb250YWN0TGlzdD10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0Q29udGFjdExpc3QoKTtcblxuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIFxuICAgICB0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zPXRoaXMubGlzdFZpZXdJdGVtcy5nZXRDYXRlZ29yeUxpc3QoKTsgIFxuICAgICB0aGlzLmdyb3VwTGlzdEl0ZW1zPXRoaXMubGlzdFZpZXdJdGVtcy5nZXRHcm91cExpc3QoKTsgIFxuICAgIFxuXG4gIH1cbiAgXG4gIHB1YmxpYyBvblN3aXBlQ2VsbFN0YXJ0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpXG4gIHtcbiAgICAgIHZhciBzd2lwZUxpbWl0cyA9IGFyZ3MuZGF0YS5zd2lwZUxpbWl0cztcbiAgICAgIHZhciBzd2lwZVZpZXcgPSBhcmdzWydvYmplY3QnXTtcbiAgICAgIHZhciBsZWZ0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZDxWaWV3PignZW1wdHlWaWV3Jyk7XG4gICAgICB2YXIgcmlnaHRJdGVtID0gc3dpcGVWaWV3LmdldFZpZXdCeUlkPFZpZXc+KCdkZWxldGVWaWV3Jyk7XG4gICAgICAvL3N3aXBlTGltaXRzLmxlZnQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgICBzd2lwZUxpbWl0cy5sZWZ0ID0gMDtcbiAgICAgIHN3aXBlTGltaXRzLnJpZ2h0ID0gcmlnaHRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICAgLy8gc3dpcGVMaW1pdHMucmlnaHQgPSAwO1xuICAgICAgc3dpcGVMaW1pdHMudGhyZXNob2xkID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpIC8gMjtcbiAgfVxuICBwdWJsaWMgY3JlYXRlR3JvdXBCdXR0b24oKVxuICB7XG4gICAgXG4gICAgdGhpcy5uZXdHcm91cENyZWF0ZVZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgdGhpcy5jYXRlZ29yeUxpc3RWaXNpYmlsaXR5ID0gJ2NvbGxhcHNlZCc7XG4gICAgdGhpcy5jYXRlZ29yeVZpc2liaWxpdHk9XCJjb2xsYXBzZWRcIjtcbiAgICB0aGlzLnRpY2tJY29uR3JvdXBWaXNpYmlsaXR5PVwidmlzaWJsZVwiO1xuXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aD0wXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZS5sZW5ndGg9MDtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbi5sZW5ndGg9MDtcblxuICAgIFxuXG4gICAgaWYodGhpcy5ncm91cExpc3RWaXNpYmlsaXR5PT1cInZpc2libGVcIilcbiAgICB7XG4gICAgICB0aGlzLmdyb3VwTGlzdFZpc2liaWxpdHkgPSAnY29sbGFwc2VkJztcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdGhpcy5ncm91cExpc3RWaXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgIH1cbiAgICB0aGlzLmNvbnRhY3RMaXN0PXRoaXMubGlzdFZpZXdJdGVtcy5nZXRDb250YWN0TGlzdCgpO1xuXG4gIH1cbiAgc2hvd0dyb3VwTGlzdCgpXG4gIHtcbiAgIFxuICAgIHRoaXMubmV3R3JvdXBDcmVhdGVWaXNpYmlsaXR5ID0gJ2NvbGxhcHNlZCc7XG4gICAgdGhpcy51c2VyLm5ld0dyb3VwPVwiXCI7XG4gICBcbiAgICB0aGlzLmNhdGVnb3J5VmlzaWJpbGl0eT1cInZpc2libGVcIjtcblxuICAgIGlmKHRoaXMuZ3JvdXBMaXN0VmlzaWJpbGl0eT09XCJ2aXNpYmxlXCIpXG4gICAge1xuICAgICAgdGhpcy5ncm91cExpc3RWaXNpYmlsaXR5ID0gJ2NvbGxhcHNlZCc7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0VmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICB9XG4gICBcblxuICB9XG4gIHNob3dDYXRlZ29yeUxpc3QoKVxuICB7XG4gICBcbiAgICBpZih0aGlzLmNhdGVnb3J5TGlzdFZpc2liaWxpdHk9PVwidmlzaWJsZVwiKVxuICAgIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnlMaXN0VmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7XG4gICAgICB0aGlzLnRpY2tJY29uVmlzaWJpbGl0eT0nY29sbGFwc2UnO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICB0aGlzLmNhdGVnb3J5TGlzdFZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIHRoaXMudGlja0ljb25WaXNpYmlsaXR5PSd2aXNpYmxlJztcbiAgICB9XG4gICBcblxuICB9XG4gIHB1YmxpYyBpdGVtVGFwKGl0ZW0pXG4gIHtcbiAgICAgIC8vY29uc29sZS5sb2coXCJJdGVtIHRhcD0tPT09PT09PT1cIitpdGVtLm5hbWUpO1xuICAgICAgY29uc29sZS5sb2coXCJJdGVtIHRhcD0tPT09PT09PT1cIitpdGVtLm5hbWUpO1xuICAgICAgY29uc29sZS5sb2coXCJJdGVtIHRhcCBzZWxlY3RlZC09PT09PT09PVwiK2l0ZW0uc2VsZWN0ZWQpO1xuXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXM9dGhpcy5saXN0Vmlld0l0ZW1zLnNlbGVjdGVkSXRlbXM7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXNOYW1lPXRoaXMubGlzdFZpZXdJdGVtcy5zZWxlY3RlZEl0ZW1zTmFtZTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuPXRoaXMubGlzdFZpZXdJdGVtcy5zZWxlY3RlZEl0ZW1zVG9rZW47XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXM9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcyBuYW1lcz09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc05hbWUpO1xuICAgICAgXG4gICAgICAvLyBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zIHRva2VuPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zVG9rZW4pO1xuXG4gICAgICBpZihpdGVtLnNlbGVjdGVkKVxuICAgICAge1xuICAgICAgICAgIGl0ZW0uY2hlY2tCb3g9XCJcXHV7ZjA5Nn1cIjtcblxuICAgICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgICB2YXIgY3VySXRlbT10aGlzLnNlbGVjdGVkSXRlbXNbaV07XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY3VyIGl0ZW0tLS0tJytjdXJJdGVtKTtcbiAgICAgICAgICAgICAgaWYoY3VySXRlbT09aXRlbS5udW1iZXIpXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmRleCA6Ojo6OjonK2kpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZS5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcyBhZnRlciBzbGljZT09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtcyk7XG5cbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgICAgIGl0ZW0uY2hlY2tCb3g9XCJcXHV7ZjA0Nn1cIjtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtLm51bWJlcik7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zTmFtZS5wdXNoKGl0ZW0ubmFtZUxhYmVsKTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUb2tlbi5wdXNoKGl0ZW0uZGV2aWNlVG9rZW4pO1xuICAgICAgICAgIFxuICAgICAgfVxuXG4gICAgICBpdGVtLnNlbGVjdGVkPSFpdGVtLnNlbGVjdGVkO1xuICAgICAgXG4gICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGl0ZW1zPT09PT09XCIrdGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgaXRlbXMgbmFtZXM9PT09PT1cIit0aGlzLnNlbGVjdGVkSXRlbXNOYW1lKTtcbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBpdGVtcyB0b2tlbj09PT09PVwiK3RoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuKTtcbiAgICAgIFxuXG5cblxuICB9XG5cbiAgcHVibGljIG9uUHVsbFRvUmVmcmVzaEluaXRpYXRlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSlcbiAge1xuXG4gICAgdGhpcy5jYXRlZ29yeUxpc3RJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7IFxuICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgIHtcbiAgICAgICAgICAgdmFyIGxpc3RWaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgICAgICAgIGxpc3RWaWV3Lm5vdGlmeVB1bGxUb1JlZnJlc2hGaW5pc2hlZCgpO1xuICAgICAgIH0sMTAwMCk7XG5cbiAgfVxuICBwdWJsaWMgZGVsZXRlQ2F0ZWdvcnkoYXJncylcbiAge1xuICAgICAgbGV0IHRhcEluZGV4PXRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMuaW5kZXhPZihhcmdzLm9iamVjdC5iaW5kaW5nQ29udGV4dCk7XG4gICAgICBsZXQgY2F0ZWdvcnlEZWxldGU9dGhpcy5jYXRlZ29yeUxpc3RJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jYXRlZ29yeTtcbiAgICAgIGxldCBuZXdDYXRlZ29yeUFycmF5OnN0cmluZ1tdPVtdO1xuICAgICAgbGV0IHg9dGhpcztcbiAgICAgIGxldCBkZXZpY2VQaG9uZU51bWJlcj1nZXRTdHJpbmcoXCJkZXZpY2VQaG9uZU51bWJlclwiKTtcblxuICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmxlbmd0aDtpKyspXG4gICAgICB7XG4gICAgICAgIGlmKHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMuZ2V0SXRlbShpKS5jYXRlZ29yeT09Y2F0ZWdvcnlEZWxldGUpe31cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVsc2VcIik7XG4gICAgICAgICAgbmV3Q2F0ZWdvcnlBcnJheS5wdXNoKHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMuZ2V0SXRlbShpKS5jYXRlZ29yeSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgYWZ0ZXIgZGVsZXRlZD09PVwiK25ld0NhdGVnb3J5QXJyYXkpO1xuICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXG4gICAgICAgICcvRGV2aWNlRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvY2F0ZWdvcnlMaXN0JyxcbiAgICAgICAge1xuICAgICAgICAgIGxpc3Q6bmV3Q2F0ZWdvcnlBcnJheSxcbiAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgbGlzdCB1cGRhdGVkIHN1Y2Nlc3MuLlwiKTtcbiAgICAgICAgICB0aW1lck1vZHVsZS5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpXG4gICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICB4LmNhdGVnb3J5TGlzdEl0ZW1zPXgubGlzdFZpZXdJdGVtcy5nZXRDYXRlZ29yeUxpc3QoKTtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgfSw1MDApO1xuICAgICAgICAgICBcbiAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgbGlzdCB1cGRhdGVkIGZhaWx1cmUuLlwiK3Jlcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLnNwbGljZSh0YXBJbmRleCxjYXRlZ29yeURlbGV0ZSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IGFmdGVyIGRlbGV0ZWQ9PT1cIit0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zKTtcblxuICB9XG4gIHB1YmxpYyBkZWxldGVHcm91cChhcmdzKVxuICB7XG4gICAgICBsZXQgdGFwSW5kZXg9dGhpcy5ncm91cExpc3RJdGVtcy5pbmRleE9mKGFyZ3Mub2JqZWN0LmJpbmRpbmdDb250ZXh0KTtcbiAgICAgIGxldCBncm91cERlbGV0ZT10aGlzLmdyb3VwTGlzdEl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmdyb3VwO1xuICAgICAgXG4gICAgICBsZXQgeD10aGlzO1xuICAgICAgbGV0IGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuXG4gICAgICBcbiAgICAgIGNvbnNvbGUubG9nKFwiR3JvdXAgdG8gZGVsZXRlPT09XCIrZ3JvdXBEZWxldGUpO1xuICAgICAgZmlyZWJhc2UucmVtb3ZlKFxuICAgICAgICAnL0RldmljZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnL2dyb3VwTGlzdC8nK2dyb3VwRGVsZXRlLFxuICAgICAgICApLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGxpc3QgZGVsZXRlZCBzdWNjZXNzLi5cIik7XG4gICAgICAgICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgeC5ncm91cExpc3RJdGVtcz14Lmxpc3RWaWV3SXRlbXMuZ2V0R3JvdXBMaXN0KCk7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgIH0sNTAwKTtcbiAgICAgICAgICAgXG4gICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGxpc3QgZGVsZXRlZCBmYWlsdXJlLi5cIityZXMpO1xuICAgICAgICB9KTtcblxuXG4gIH1cbiAgZ3JvdXBUYXAoaXRlbSl7XG5cbiAgICBjb25zb2xlLmxvZyhcIkdyb3VwIFRhcHBlZD09XCIraXRlbS5ncm91cCk7XG4gICAgdGhpcy51c2VyLm5ld0dyb3VwPWl0ZW0uZ3JvdXA7XG5cbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoPTBcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXNOYW1lLmxlbmd0aD0wO1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuLmxlbmd0aD0wO1xuXG4gICAgdGhpcy5jcmVhdGVHcm91cEJ1dHRvbigpO1xuXG4gICAgXG4gICAgdGhpcy5jb250YWN0TGlzdD10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0Q29udGFjdExpc3RGb3JVcGRhdGUoaXRlbS5ncm91cCk7XG5cbiAgICBcbiAgICAvL2NvbnNvbGUubG9nKFwiQ29udGFjdCBMaXN0IEluIGdyb3VwIHRhcD09PT1cIit0aGlzLmNvbnRhY3RMaXN0KTtcblxuXG5cbiAgfVxuICBjcmVhdGVOZXdDYXRlZ29yeSgpXG4gIHtcbiAgIFxuICAgIGxldCBuZXdDYXRlZ29yeT10aGlzLnVzZXIubmV3Q2F0ZWdvcnk7XG4gICAgbGV0IG5ld0NhdGVnb3J5QXJyYXk6c3RyaW5nW109W107XG4gICAgbGV0IGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgIGxldCB4PXRoaXM7XG4gICAgaWYobmV3Q2F0ZWdvcnk9PW51bGwpe31cbiAgICBlbHNlXG4gICAge1xuICAgICAgdGhpcy51c2VyLm5ld0NhdGVnb3J5PVwiXCI7XG4gICAgICB2YXIgbGF5b3V0ID0gdGhpcy5wYWdlO1xuICAgICAgdmFyIGNhdGVnb3J5SWQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJuZXdDYXRlZ29yeVwiKTtcbiAgICAgIGlmIChjYXRlZ29yeUlkLmlvcylcbiAgICAgIHtcbiAgICAgICAgY2F0ZWdvcnlJZC5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgdGhpcy50aWNrSWNvblZpc2liaWxpdHk9J2NvbGxhcHNlJztcbiAgICAgICAgICBcbiAgICAgIH1cbiAgICAgICBlbHNlIGlmIChjYXRlZ29yeUlkLmFuZHJvaWQpXG4gICAgICB7XG4gICAgICAgIGNhdGVnb3J5SWQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgICAgXG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jYXRlZ29yeUxpc3RJdGVtcy5sZW5ndGg7aSsrKXtcbiAgICAgICAgbmV3Q2F0ZWdvcnlBcnJheS5wdXNoKHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMuZ2V0SXRlbShpKS5jYXRlZ29yeSk7XG4gICAgICB9XG5cbiAgICAgIG5ld0NhdGVnb3J5QXJyYXkucHVzaChuZXdDYXRlZ29yeSk7XG4gICAgICBcbiAgICAgIGNvbnNvbGUubG9nKFwiTmV3IEl0ZW1zIEFycmF0PT09XCIrbmV3Q2F0ZWdvcnlBcnJheSk7XG4gICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICcvRGV2aWNlRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvY2F0ZWdvcnlMaXN0JyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsaXN0Om5ld0NhdGVnb3J5QXJyYXksXG4gICAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYXRlZ29yeSBsaXN0IHVwZGF0ZWQgc3VjY2Vzcy4uXCIpO1xuICAgICAgICAgICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgeC5jYXRlZ29yeUxpc3RJdGVtcz14Lmxpc3RWaWV3SXRlbXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgeC50aWNrSWNvblZpc2liaWxpdHk9J3Zpc2libGUnO1xuICAgICAgICAgICAgICAgfSwxNTAwKTtcbiAgICAgICAgICAgICBcbiAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IGxpc3QgdXBkYXRlZCBmYWlsdXJlLi5cIityZXMpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgXG4gICAgfVxuICB9XG4gIGNyZWF0ZU5ld0dyb3VwKCl7XG5cbiAgICBsZXQgbmV3R3JvdXBOYW1lPXRoaXMudXNlci5uZXdHcm91cDtcbiAgICBsZXQgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG4gICAgbGV0IHg9dGhpcztcblxuICAgIGNvbnNvbGUubG9nKFwiTmV3IEdyb3VwIE5hbWU9PT1cIituZXdHcm91cE5hbWUpO1xuICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSXRlbXM9PT1cIit0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgIGlmKG5ld0dyb3VwTmFtZT09bnVsbCB8fCB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoPDEpe1xuICAgICAgY29uc29sZS5sb2coXCJWYWxpZGF0aW9uIEZhaWxzPT1cIik7XG4gICAgfVxuICAgIGVsc2V7XG5cbiAgICAgXG4gICAgICAgIFxuICAgICAgICB2YXIgbGF5b3V0ID0gdGhpcy5wYWdlO1xuICAgICAgICB0aGlzLnVzZXIubmV3R3JvdXA9XCJcIjtcbiAgICAgICAgdmFyIGdyb3VwSWQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJuZXdHcm91cENyZWF0aW9uXCIpO1xuICAgICAgICBpZiAoZ3JvdXBJZC5pb3MpXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cElkLmlvcy5lbmRFZGl0aW5nKHRydWUpO1xuICAgICAgICAgIHRoaXMudGlja0ljb25Hcm91cFZpc2liaWxpdHk9J2NvbGxhcHNlJztcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICBlbHNlIGlmIChncm91cElkLmFuZHJvaWQpXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cElkLmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgICcvRGV2aWNlRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvZ3JvdXBMaXN0LycrbmV3R3JvdXBOYW1lLFxuICAgICAgICAge1xuICAgICAgICAgICBkZXZpY2VQaG9uZU51bWJlcjp0aGlzLnNlbGVjdGVkSXRlbXMsXG4gICAgICAgICAgIGRldmljZVRva2VuOnRoaXMuc2VsZWN0ZWRJdGVtc1Rva2VuLFxuICAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGxpc3QgdXBkYXRlZCBzdWNjZXNzLi5cIik7XG4gICAgICAgICAgIHRpbWVyTW9kdWxlLnNldFRpbWVvdXQoZnVuY3Rpb24gKClcbiAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICB4Lmdyb3VwTGlzdEl0ZW1zPXgubGlzdFZpZXdJdGVtcy5nZXRHcm91cExpc3QoKTsgXG4gICAgICAgICAgICAgICAgIHguc2hvd0dyb3VwTGlzdCgpO1xuICAgICAgICAgICAgICAgICAvLyB4LnNlbGVjdGVkSXRlbXM9W107XG4gICAgICAgICAgICAgICAgIC8vIHguc2VsZWN0ZWRJdGVtc05hbWU9W107XG4gICAgICAgICAgICAgICAgIC8vIHguc2VsZWN0ZWRJdGVtc1Rva2VuPVtdO1xuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LDMwMCk7XG4gICAgICAgICAgIFxuICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdyb3VwIGxpc3QgdXBkYXRlZCBmYWlsdXJlLi5cIityZXMpO1xuICAgICAgICB9KTtcbiAgICAgIFxuXG5cbiAgICB9XG5cblxuICB9XG5cbiAgXG59XG4iXX0=