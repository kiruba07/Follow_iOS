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
        this.categoryListItems = new observable_array_1.ObservableArray([]);
        this.user = new user_1.User();
        this.listViewItems = new listviewitems_1.ListViewItems;
    }
    MaintenanceComponent.prototype.ngOnInit = function () {
        this.categoryListItems = this.listViewItems.getCategoryList();
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
    MaintenanceComponent.prototype.showGroupList = function () {
        if (this.groupListVisibility == "visible") {
            this.groupListVisibility = 'collapse';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbnRlbmFuY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbnRlbmFuY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQTZEO0FBSTdELDJDQUEwQztBQUMxQyx1REFBMEQ7QUFDMUQsMkVBQXlFO0FBQ3pFLDZEQVU4QjtBQUM5Qiw2REFBNEQ7QUFDNUQsb0RBQXVEO0FBQ3ZELGdDQUErQjtBQU8vQixJQUFhLG9CQUFvQjtJQVUvQiw4QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFQdkIsd0JBQW1CLEdBQUMsV0FBVyxDQUFDO1FBQ2hDLDJCQUFzQixHQUFDLFdBQVcsQ0FBQztRQUNuQyx1QkFBa0IsR0FBQyxXQUFXLENBQUM7UUFFdEMsc0JBQWlCLEdBQUMsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBS3hDLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksNkJBQWEsQ0FBQztJQUV2QyxDQUFDO0lBQ0QsdUNBQVEsR0FBUjtRQUVHLElBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBRy9ELENBQUM7SUFDTSxpREFBa0IsR0FBekIsVUFBMEIsSUFBdUI7UUFFN0MsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQU8sV0FBVyxDQUFDLENBQUM7UUFDeEQsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBTyxZQUFZLENBQUMsQ0FBQztRQUMxRCxpREFBaUQ7UUFDakQsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7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QztLQUM3RixDQUFDO3FDQVcwQixXQUFJO0dBVm5CLG9CQUFvQixDQXNLaEM7QUF0S1ksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3Rpdml0eUluZGljYXRvciB9IGZyb20gXCJ1aS9hY3Rpdml0eS1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhLCBSYWRMaXN0VmlldyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vbGlzdHZpZXdcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vc2VydmljZS91c2VyXCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0l0ZW1zIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvbGlzdHZpZXdpdGVtc1wiO1xuaW1wb3J0ICogYXMgdGltZXJNb2R1bGUgIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3RpbWVyXCI7IFxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbWFpbnRlbmFuY2UvbWFpbnRlbmFuY2UuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL21haW50ZW5hbmNlL21haW50ZW5hbmNlLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9tYWludGVuYW5jZS9tYWludGVuYW5jZS5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTWFpbnRlbmFuY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXRcbntcbiAgIFxuICBwdWJsaWMgZ3JvdXBMaXN0VmlzaWJpbGl0eT1cImNvbGxhcHNlZFwiO1xuICBwdWJsaWMgY2F0ZWdvcnlMaXN0VmlzaWJpbGl0eT1cImNvbGxhcHNlZFwiO1xuICBwdWJsaWMgdGlja0ljb25WaXNpYmlsaXR5PVwiY29sbGFwc2VkXCI7XG4gIHVzZXI6IFVzZXI7XG4gIGNhdGVnb3J5TGlzdEl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICBsaXN0Vmlld0l0ZW1zOkxpc3RWaWV3SXRlbXNcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UpXG4gIHtcbiAgICB0aGlzLnVzZXI9bmV3IFVzZXIoKTtcbiAgICB0aGlzLmxpc3RWaWV3SXRlbXM9bmV3IExpc3RWaWV3SXRlbXM7XG5cbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICBcbiAgICAgdGhpcy5jYXRlZ29yeUxpc3RJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7ICBcbiAgICBcblxuICB9XG4gIHB1YmxpYyBvblN3aXBlQ2VsbFN0YXJ0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpXG4gIHtcbiAgICAgIHZhciBzd2lwZUxpbWl0cyA9IGFyZ3MuZGF0YS5zd2lwZUxpbWl0cztcbiAgICAgIHZhciBzd2lwZVZpZXcgPSBhcmdzWydvYmplY3QnXTtcbiAgICAgIHZhciBsZWZ0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZDxWaWV3PignZW1wdHlWaWV3Jyk7XG4gICAgICB2YXIgcmlnaHRJdGVtID0gc3dpcGVWaWV3LmdldFZpZXdCeUlkPFZpZXc+KCdkZWxldGVWaWV3Jyk7XG4gICAgICAvL3N3aXBlTGltaXRzLmxlZnQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgICBzd2lwZUxpbWl0cy5sZWZ0ID0gMDtcbiAgICAgIHN3aXBlTGltaXRzLnJpZ2h0ID0gcmlnaHRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICAgLy8gc3dpcGVMaW1pdHMucmlnaHQgPSAwO1xuICAgICAgc3dpcGVMaW1pdHMudGhyZXNob2xkID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpIC8gMjtcbiAgfVxuXG4gIHNob3dHcm91cExpc3QoKVxuICB7XG4gICBcbiAgICBpZih0aGlzLmdyb3VwTGlzdFZpc2liaWxpdHk9PVwidmlzaWJsZVwiKVxuICAgIHtcbiAgICAgIHRoaXMuZ3JvdXBMaXN0VmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0VmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICB9XG4gICBcblxuICB9XG4gIHNob3dDYXRlZ29yeUxpc3QoKVxuICB7XG4gICBcbiAgICBpZih0aGlzLmNhdGVnb3J5TGlzdFZpc2liaWxpdHk9PVwidmlzaWJsZVwiKVxuICAgIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnlMaXN0VmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7XG4gICAgICB0aGlzLnRpY2tJY29uVmlzaWJpbGl0eT0nY29sbGFwc2UnO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICB0aGlzLmNhdGVnb3J5TGlzdFZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIHRoaXMudGlja0ljb25WaXNpYmlsaXR5PSd2aXNpYmxlJztcbiAgICB9XG4gICBcblxuICB9XG4gIHB1YmxpYyBvblB1bGxUb1JlZnJlc2hJbml0aWF0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpXG4gIHtcblxuICAgIHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXM9dGhpcy5saXN0Vmlld0l0ZW1zLmdldENhdGVnb3J5TGlzdCgpOyBcbiAgIHRpbWVyTW9kdWxlLnNldFRpbWVvdXQoZnVuY3Rpb24gKClcbiAgICB7XG4gICAgICAgICAgIHZhciBsaXN0VmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICAgICBsaXN0Vmlldy5ub3RpZnlQdWxsVG9SZWZyZXNoRmluaXNoZWQoKTtcbiAgICAgICB9LDEwMDApO1xuXG4gIH1cbiAgcHVibGljIGRlbGV0ZUNhdGVnb3J5KGFyZ3MpXG4gIHtcbiAgICAgIGxldCB0YXBJbmRleD10aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmluZGV4T2YoYXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQpO1xuICAgICAgbGV0IGNhdGVnb3J5RGVsZXRlPXRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkuY2F0ZWdvcnk7XG4gICAgICBsZXQgbmV3Q2F0ZWdvcnlBcnJheTpzdHJpbmdbXT1bXTtcbiAgICAgIGxldCB4PXRoaXM7XG4gICAgICBsZXQgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG5cbiAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jYXRlZ29yeUxpc3RJdGVtcy5sZW5ndGg7aSsrKVxuICAgICAge1xuICAgICAgICBpZih0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmdldEl0ZW0oaSkuY2F0ZWdvcnk9PWNhdGVnb3J5RGVsZXRlKXt9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJlbHNlXCIpO1xuICAgICAgICAgIG5ld0NhdGVnb3J5QXJyYXkucHVzaCh0aGlzLmNhdGVnb3J5TGlzdEl0ZW1zLmdldEl0ZW0oaSkuY2F0ZWdvcnkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IGFmdGVyIGRlbGV0ZWQ9PT1cIituZXdDYXRlZ29yeUFycmF5KTtcbiAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAnL0RldmljZURldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnL2NhdGVnb3J5TGlzdCcsXG4gICAgICAgIHtcbiAgICAgICAgICBsaXN0Om5ld0NhdGVnb3J5QXJyYXksXG4gICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IGxpc3QgdXBkYXRlZCBzdWNjZXNzLi5cIik7XG4gICAgICAgICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgeC5jYXRlZ29yeUxpc3RJdGVtcz14Lmxpc3RWaWV3SXRlbXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgIH0sNTAwKTtcbiAgICAgICAgICAgXG4gICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IGxpc3QgdXBkYXRlZCBmYWlsdXJlLi5cIityZXMpO1xuICAgICAgICB9KTtcblxuICAgICAgLy8gdGhpcy5jYXRlZ29yeUxpc3RJdGVtcy5zcGxpY2UodGFwSW5kZXgsY2F0ZWdvcnlEZWxldGUpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJDYXRlZ29yeSBhZnRlciBkZWxldGVkPT09XCIrdGhpcy5jYXRlZ29yeUxpc3RJdGVtcyk7XG5cbiAgfVxuICBjcmVhdGVOZXdDYXRlZ29yeSgpXG4gIHtcbiAgIFxuICAgIGxldCBuZXdDYXRlZ29yeT10aGlzLnVzZXIubmV3Q2F0ZWdvcnk7XG4gICAgbGV0IG5ld0NhdGVnb3J5QXJyYXk6c3RyaW5nW109W107XG4gICAgbGV0IGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuICAgIGxldCB4PXRoaXM7XG4gICAgaWYobmV3Q2F0ZWdvcnk9PW51bGwpe31cbiAgICBlbHNlXG4gICAge1xuICAgICAgdGhpcy51c2VyLm5ld0NhdGVnb3J5PVwiXCI7XG4gICAgICB2YXIgbGF5b3V0ID0gdGhpcy5wYWdlO1xuICAgICAgdmFyIGNhdGVnb3J5SWQgPSBsYXlvdXQuZ2V0Vmlld0J5SWQoXCJuZXdDYXRlZ29yeVwiKTtcbiAgICAgIGlmIChjYXRlZ29yeUlkLmlvcylcbiAgICAgIHtcbiAgICAgICAgY2F0ZWdvcnlJZC5pb3MuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgdGhpcy50aWNrSWNvblZpc2liaWxpdHk9J2NvbGxhcHNlJztcbiAgICAgICAgICBcbiAgICAgIH1cbiAgICAgICBlbHNlIGlmIChjYXRlZ29yeUlkLmFuZHJvaWQpXG4gICAgICB7XG4gICAgICAgIGNhdGVnb3J5SWQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgICAgXG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jYXRlZ29yeUxpc3RJdGVtcy5sZW5ndGg7aSsrKXtcbiAgICAgICAgbmV3Q2F0ZWdvcnlBcnJheS5wdXNoKHRoaXMuY2F0ZWdvcnlMaXN0SXRlbXMuZ2V0SXRlbShpKS5jYXRlZ29yeSk7XG4gICAgICB9XG5cbiAgICAgIG5ld0NhdGVnb3J5QXJyYXkucHVzaChuZXdDYXRlZ29yeSk7XG4gICAgICBcbiAgICAgIGNvbnNvbGUubG9nKFwiTmV3IEl0ZW1zIEFycmF0PT09XCIrbmV3Q2F0ZWdvcnlBcnJheSk7XG4gICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFxuICAgICAgICAgICcvRGV2aWNlRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvY2F0ZWdvcnlMaXN0JyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsaXN0Om5ld0NhdGVnb3J5QXJyYXksXG4gICAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYXRlZ29yeSBsaXN0IHVwZGF0ZWQgc3VjY2Vzcy4uXCIpO1xuICAgICAgICAgICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgeC5jYXRlZ29yeUxpc3RJdGVtcz14Lmxpc3RWaWV3SXRlbXMuZ2V0Q2F0ZWdvcnlMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgeC50aWNrSWNvblZpc2liaWxpdHk9J3Zpc2libGUnO1xuICAgICAgICAgICAgICAgfSwxNTAwKTtcbiAgICAgICAgICAgICBcbiAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IGxpc3QgdXBkYXRlZCBmYWlsdXJlLi5cIityZXMpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgXG4gICAgfVxuICB9XG5cbiAgXG59XG4iXX0=