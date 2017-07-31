"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("application-settings");
var listviewitems_1 = require("../../service/listviewitems");
var timerModule = require("tns-core-modules/timer");
var MyTaskComponent = (function () {
    function MyTaskComponent(router) {
        this.router = router;
        this.dataItems = new observable_array_1.ObservableArray([]);
        this.listViewItems = new listviewitems_1.ListViewItems;
    }
    MyTaskComponent.prototype.ngOnInit = function () {
        this.dataItems = this.listViewItems.getMyTaskdetails();
        //   console.log("Grid=="+this.gridLayout.page.getViewById("grid1"));
    };
    MyTaskComponent.prototype.onSwipeCellStarted = function (args) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];
        var leftItem = swipeView.getViewById('deleteView');
        var rightItem = swipeView.getViewById('doneView');
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    };
    MyTaskComponent.prototype.onPullToRefreshInitiated = function (args) {
        console.log("Pul to refresh");
        this.dataItems = this.listViewItems.getMyTaskdetails();
        timerModule.setTimeout(function () {
            var listView = args.object;
            listView.notifyPullToRefreshFinished();
        }, 1000);
    };
    MyTaskComponent.prototype.doneTask = function (args) {
        var _this = this;
        var tapIndex = this.dataItems.indexOf(args.object.bindingContext);
        var x = this;
        console.log("Item Kay======" + this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======" + this.dataItems.getItem(tapIndex).taskName);
        console.log("Created By Number======" + this.dataItems.getItem(tapIndex).createdByNumber);
        var createdByNumber = this.dataItems.getItem(tapIndex).createdByNumber;
        var key = this.dataItems.getItem(tapIndex).key;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        //update completion status in mytask details
        firebase.update('/MyTaskDetails/' + devicePhoneNumber + '/' + this.dataItems.getItem(tapIndex).key, {
            'myCompletionStatus': true,
        }).then(function (res) {
            console.log("Task has been upadates successfully in my task details---" + res);
            _this.dataItems = _this.listViewItems.getMyTaskdetails();
        }, function (res) {
            console.log("Problem in updating my task details---" + res);
        });
        //get the updation count and update completion status in other task details
        var onQueryEvent = function (result) {
            if (!result.error) {
                console.log("Get the current value===" + result.value);
                firebase.update('/OtherTaskDetails/' + createdByNumber + '/' + key, {
                    'completionCount': (result.value + 1),
                }).then(function (res) {
                    console.log("Completion count has been upadates successfully in other task details---" + res);
                    firebase.update('/MyTaskDetails/' + devicePhoneNumber + '/' + key, {
                        'completionCount': (result.value + 1),
                    }).then(function (res) {
                        console.log("Completion count has been upadates successfully in my task details---" + res);
                        x.dataItems = x.listViewItems.getMyTaskdetails();
                    }, function (res) {
                        console.log("Problem in updating completion count in my task details---" + res);
                    });
                }, function (res) {
                    console.log("Problem in updating completion count in other task details---" + res);
                });
            }
        };
        firebase.query(onQueryEvent, '/OtherTaskDetails/' + this.dataItems.getItem(tapIndex).createdByNumber + '/' + this.dataItems.getItem(tapIndex).key + '/completionCount', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
    };
    MyTaskComponent.prototype.deleteTask = function (args) {
        var _this = this;
        var tapIndex = this.dataItems.indexOf(args.object.bindingContext);
        console.log("Item Kay======" + this.dataItems.getItem(tapIndex).key);
        console.log("Task Name======" + this.dataItems.getItem(tapIndex).taskName);
        var createdByNumber = this.dataItems.getItem(tapIndex).createdByNumber;
        var key = this.dataItems.getItem(tapIndex).key;
        var devicePhoneNumber = application_settings_1.getString("devicePhoneNumber");
        firebase.remove('/MyTaskDetails/' + devicePhoneNumber + '/' + this.dataItems.getItem(tapIndex).key).then(function (res) {
            console.log("Task has been upadates successfully in my task details---" + res);
            _this.dataItems = _this.listViewItems.getMyTaskdetails();
        }, function (res) {
            console.log("Problem in updating my task details---" + res);
        });
        //update delete count in other task details page
        var onQueryEvent = function (result) {
            if (!result.error) {
                console.log("Get the current value===" + result.value);
                firebase.update('/OtherTaskDetails/' + createdByNumber + '/' + key, {
                    'deletionCount': (result.value + 1),
                }).then(function (res) {
                    console.log("Deletion count has been upadates successfully in other task details---" + res);
                }, function (res) {
                    console.log("Problem in updating deletion count in other task details---" + res);
                });
            }
        };
        firebase.query(onQueryEvent, '/OtherTaskDetails/' + this.dataItems.getItem(tapIndex).createdByNumber + '/' + this.dataItems.getItem(tapIndex).key + '/deletionCount', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
            },
        });
    };
    MyTaskComponent.prototype.createTask = function () {
        this.router.navigate(["/createtask"]);
    };
    return MyTaskComponent;
}());
MyTaskComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        // providers: [DataItemService],
        templateUrl: "pages/mytask/mytask.html",
        styleUrls: ["pages/mytask/mytask-common.css", "pages/mytask/mytask.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], MyTaskComponent);
exports.MyTaskComponent = MyTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXl0YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15dGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBeUM7QUFDekMsc0NBQTZEO0FBQzdELDJFQUF5RTtBQUd6RSx1REFBMEQ7QUFDMUQsNkRBVThCO0FBQzlCLDZEQUE0RDtBQUU1RCxvREFBdUQ7QUFTdkQsSUFBYSxlQUFlO0lBS3hCLHlCQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUZqQyxjQUFTLEdBQUMsSUFBSSxrQ0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRy9CLElBQUksQ0FBQyxhQUFhLEdBQUMsSUFBSSw2QkFBYSxDQUFDO0lBQ3pDLENBQUM7SUFDRCxrQ0FBUSxHQUFSO1FBRUksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEQscUVBQXFFO0lBS3RFLENBQUM7SUFDTSw0Q0FBa0IsR0FBekIsVUFBMEIsSUFBdUI7UUFFakQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQU8sWUFBWSxDQUFDLENBQUM7UUFDekQsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBTyxVQUFVLENBQUMsQ0FBQztRQUN4RCxXQUFXLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQy9DLFdBQVcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDakQsV0FBVyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNNLGtEQUF3QixH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bSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhLCBSYWRMaXN0VmlldyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS1wcm8vbGlzdHZpZXdcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0l0ZW1zIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvbGlzdHZpZXdpdGVtc1wiO1xuaW1wb3J0IHsgUmFkTGlzdFZpZXdDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3L2FuZ3VsYXJcIjtcbmltcG9ydCAqIGFzIHRpbWVyTW9kdWxlICBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy90aW1lclwiO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgLy8gcHJvdmlkZXJzOiBbRGF0YUl0ZW1TZXJ2aWNlXSxcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbXl0YXNrL215dGFzay5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvbXl0YXNrL215dGFzay1jb21tb24uY3NzXCIsIFwicGFnZXMvbXl0YXNrL215dGFzay5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTXlUYXNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0XG57XG5cbiAgICAgZGF0YUl0ZW1zPW5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICBsaXN0Vmlld0l0ZW1zOkxpc3RWaWV3SXRlbXNcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMubGlzdFZpZXdJdGVtcz1uZXcgTGlzdFZpZXdJdGVtcztcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgXG4gICAgICAgIHRoaXMuZGF0YUl0ZW1zPXRoaXMubGlzdFZpZXdJdGVtcy5nZXRNeVRhc2tkZXRhaWxzKCk7ICBcbiAgICAgLy8gICBjb25zb2xlLmxvZyhcIkdyaWQ9PVwiK3RoaXMuZ3JpZExheW91dC5wYWdlLmdldFZpZXdCeUlkKFwiZ3JpZDFcIikpO1xuICAgICAgICBcblxuXG4gICAgXG4gICAgfVxuICAgIHB1YmxpYyBvblN3aXBlQ2VsbFN0YXJ0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpXG4gICAge1xuICAgIHZhciBzd2lwZUxpbWl0cyA9IGFyZ3MuZGF0YS5zd2lwZUxpbWl0cztcbiAgICB2YXIgc3dpcGVWaWV3ID0gYXJnc1snb2JqZWN0J107XG4gICAgdmFyIGxlZnRJdGVtID0gc3dpcGVWaWV3LmdldFZpZXdCeUlkPFZpZXc+KCdkZWxldGVWaWV3Jyk7XG4gICAgdmFyIHJpZ2h0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZDxWaWV3PignZG9uZVZpZXcnKTtcbiAgICBzd2lwZUxpbWl0cy5sZWZ0ID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgIHN3aXBlTGltaXRzLnJpZ2h0ID0gcmlnaHRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICBzd2lwZUxpbWl0cy50aHJlc2hvbGQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCkgLyAyO1xuICAgfVxuICAgcHVibGljIG9uUHVsbFRvUmVmcmVzaEluaXRpYXRlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSl7XG5cbiAgICBjb25zb2xlLmxvZyhcIlB1bCB0byByZWZyZXNoXCIpXG5cbiAgICB0aGlzLmRhdGFJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0TXlUYXNrZGV0YWlscygpOyAgXG4gICAgdGltZXJNb2R1bGUuc2V0VGltZW91dChmdW5jdGlvbiAoKVxuICAgICB7XG4gICAgICAgICAgICB2YXIgbGlzdFZpZXcgPSBhcmdzLm9iamVjdDtcbiAgICAgICAgICAgIGxpc3RWaWV3Lm5vdGlmeVB1bGxUb1JlZnJlc2hGaW5pc2hlZCgpO1xuICAgICAgICB9LDEwMDApO1xuXG4gICB9XG4gICBkb25lVGFzayhhcmdzKVxuICAge1xuICAgIFxuICAgICAgICB2YXIgdGFwSW5kZXg9dGhpcy5kYXRhSXRlbXMuaW5kZXhPZihhcmdzLm9iamVjdC5iaW5kaW5nQ29udGV4dClcbiAgICAgICAgdmFyIHg9dGhpcztcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZW0gS2F5PT09PT09XCIrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIE5hbWU9PT09PT1cIit0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS50YXNrTmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRlZCBCeSBOdW1iZXI9PT09PT1cIit0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlOdW1iZXIpO1xuICAgICAgICB2YXIgY3JlYXRlZEJ5TnVtYmVyPXRoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmNyZWF0ZWRCeU51bWJlcjtcbiAgICAgICAgdmFyIGtleT10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5rZXk7XG5cbiAgICAgICAgdmFyIGRldmljZVBob25lTnVtYmVyPWdldFN0cmluZyhcImRldmljZVBob25lTnVtYmVyXCIpO1xuXG4gICAgICAgIC8vdXBkYXRlIGNvbXBsZXRpb24gc3RhdHVzIGluIG15dGFzayBkZXRhaWxzXG4gICAgICAgIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgICAgICAgICAnL015VGFza0RldGFpbHMvJytkZXZpY2VQaG9uZU51bWJlcisnLycrdGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ215Q29tcGxldGlvblN0YXR1cyc6dHJ1ZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHVwYWRhdGVzIHN1Y2Nlc3NmdWxseSBpbiBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0TXlUYXNrZGV0YWlscygpOyAgIFxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiB1cGRhdGluZyBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvL2dldCB0aGUgdXBkYXRpb24gY291bnQgYW5kIHVwZGF0ZSBjb21wbGV0aW9uIHN0YXR1cyBpbiBvdGhlciB0YXNrIGRldGFpbHNcbiAgICAgICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uKHJlc3VsdClcbiAgICAgICAge1xuICAgICAgICAgIGlmICghcmVzdWx0LmVycm9yKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldCB0aGUgY3VycmVudCB2YWx1ZT09PVwiK3Jlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgICAgICAgICAgICAgJy9PdGhlclRhc2tEZXRhaWxzLycrY3JlYXRlZEJ5TnVtYmVyKycvJytrZXksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAnY29tcGxldGlvbkNvdW50JzoocmVzdWx0LnZhbHVlKzEpLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbXBsZXRpb24gY291bnQgaGFzIGJlZW4gdXBhZGF0ZXMgc3VjY2Vzc2Z1bGx5IGluIG90aGVyIHRhc2sgZGV0YWlscy0tLVwiK3Jlcyk7XG5cblxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS51cGRhdGUoXG4gICAgICAgICAgICAgICAgICAgICcvTXlUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJytrZXksXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb21wbGV0aW9uQ291bnQnOihyZXN1bHQudmFsdWUrMSksXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb21wbGV0aW9uIGNvdW50IGhhcyBiZWVuIHVwYWRhdGVzIHN1Y2Nlc3NmdWxseSBpbiBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICAgIHguZGF0YUl0ZW1zPXgubGlzdFZpZXdJdGVtcy5nZXRNeVRhc2tkZXRhaWxzKCk7IFxuXG4gICAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gdXBkYXRpbmcgY29tcGxldGlvbiBjb3VudCBpbiBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIH0sKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIGluIHVwZGF0aW5nIGNvbXBsZXRpb24gY291bnQgaW4gb3RoZXIgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJyt0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlOdW1iZXIrJy8nK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmtleSsnL2NvbXBsZXRpb25Db3VudCcsXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgfVxuICAgICAgKTsgIFxuICAgICAgXG4gICB9XG4gICBkZWxldGVUYXNrKGFyZ3MpXG4gICB7XG4gICAgXG4gICAgICAgIHZhciB0YXBJbmRleD10aGlzLmRhdGFJdGVtcy5pbmRleE9mKGFyZ3Mub2JqZWN0LmJpbmRpbmdDb250ZXh0KVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSXRlbSBLYXk9PT09PT1cIit0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5rZXkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2sgTmFtZT09PT09PVwiK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLnRhc2tOYW1lKTtcbiAgICAgICAgdmFyIGNyZWF0ZWRCeU51bWJlcj10aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlOdW1iZXI7XG4gICAgICAgIHZhciBrZXk9dGhpcy5kYXRhSXRlbXMuZ2V0SXRlbSh0YXBJbmRleCkua2V5O1xuICAgICAgICB2YXIgZGV2aWNlUGhvbmVOdW1iZXI9Z2V0U3RyaW5nKFwiZGV2aWNlUGhvbmVOdW1iZXJcIik7XG5cbiAgICAgICAgZmlyZWJhc2UucmVtb3ZlKFxuICAgICAgICAgICAgICAgICcvTXlUYXNrRGV0YWlscy8nK2RldmljZVBob25lTnVtYmVyKycvJyt0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5rZXksXG4gICAgICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgICAgKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGhhcyBiZWVuIHVwYWRhdGVzIHN1Y2Nlc3NmdWxseSBpbiBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFJdGVtcz10aGlzLmxpc3RWaWV3SXRlbXMuZ2V0TXlUYXNrZGV0YWlscygpOyAgIFxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9LChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBpbiB1cGRhdGluZyBteSB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIC8vdXBkYXRlIGRlbGV0ZSBjb3VudCBpbiBvdGhlciB0YXNrIGRldGFpbHMgcGFnZVxuICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KVxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpXG4gICAgICAgICAge1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IHRoZSBjdXJyZW50IHZhbHVlPT09XCIrcmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKFxuICAgICAgICAgICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJytjcmVhdGVkQnlOdW1iZXIrJy8nK2tleSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICdkZWxldGlvbkNvdW50JzoocmVzdWx0LnZhbHVlKzEpLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlbGV0aW9uIGNvdW50IGhhcyBiZWVuIHVwYWRhdGVzIHN1Y2Nlc3NmdWxseSBpbiBvdGhlciB0YXNrIGRldGFpbHMtLS1cIityZXMpO1xuICAgICAgICAgICAgICAgICAgfSwocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gaW4gdXBkYXRpbmcgZGVsZXRpb24gY291bnQgaW4gb3RoZXIgdGFzayBkZXRhaWxzLS0tXCIrcmVzKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgICAnL090aGVyVGFza0RldGFpbHMvJyt0aGlzLmRhdGFJdGVtcy5nZXRJdGVtKHRhcEluZGV4KS5jcmVhdGVkQnlOdW1iZXIrJy8nK3RoaXMuZGF0YUl0ZW1zLmdldEl0ZW0odGFwSW5kZXgpLmtleSsnL2RlbGV0aW9uQ291bnQnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgICAgXG5cbiAgIH1cbiAgICBcblxuICAgY3JlYXRlVGFzaygpe1xuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2NyZWF0ZXRhc2tcIl0pO1xuICAgfVxufSJdfQ==