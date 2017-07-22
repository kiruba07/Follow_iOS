"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var dataItem_service_1 = require("../../service/dataItem.service");
var OtherTaskComponent = (function () {
    function OtherTaskComponent(_dataItemService, router) {
        this._dataItemService = _dataItemService;
        this.router = router;
    }
    Object.defineProperty(OtherTaskComponent.prototype, "dataItems", {
        get: function () {
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    OtherTaskComponent.prototype.ngOnInit = function () {
        this._dataItems = new observable_array_1.ObservableArray(this._dataItemService.getDataItems());
    };
    OtherTaskComponent.prototype.onSwipeCellStarted = function (args) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];
        var leftItem = swipeView.getViewById('emptyView');
        var rightItem = swipeView.getViewById('deleteView');
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    };
    OtherTaskComponent.prototype.createTask = function () {
        this.router.navigate(["/createtask"]);
    };
    return OtherTaskComponent;
}());
OtherTaskComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        providers: [dataItem_service_1.DataItemService],
        templateUrl: "pages/othertask/othertask.html",
        styleUrls: ["pages/othertask/othertask-common.css", "pages/othertask/othertask.css"]
    }),
    __metadata("design:paramtypes", [dataItem_service_1.DataItemService, router_1.Router])
], OtherTaskComponent);
exports.OtherTaskComponent = OtherTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RoZXJ0YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm90aGVydGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBeUM7QUFDekMsc0NBQWtEO0FBQ2xELDJFQUF5RTtBQUV6RSxtRUFBaUU7QUFVakUsSUFBYSxrQkFBa0I7SUFJM0IsNEJBQW9CLGdCQUFpQyxFQUFTLE1BQWM7UUFBeEQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDNUUsQ0FBQztJQUVELHNCQUFJLHlDQUFTO2FBQWI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELHFDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksa0NBQWUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ00sK0NBQWtCLEdBQXpCLFVBQTBCLElBQXVCO1FBRWpELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFPLFdBQVcsQ0FBQyxDQUFDO1FBQ3hELElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQU8sWUFBWSxDQUFDLENBQUM7UUFDMUQsV0FBVyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMvQyxXQUFXLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pELFdBQVcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRCx1Q0FBVSxHQUFWO1FBQ1EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRTlDLENBQUM7SUFFTCx5QkFBQztBQUFELENBQUMsQUE3QkQsSUE2QkM7QUE3Qlksa0JBQWtCO0lBTjlCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO1FBQzVCLFdBQVcsRUFBRSxnQ0FBZ0M7UUFDN0MsU0FBUyxFQUFFLENBQUMsc0NBQXNDLEVBQUUsK0JBQStCLENBQUM7S0FDckYsQ0FBQztxQ0FLd0Msa0NBQWUsRUFBaUIsZUFBTTtHQUpuRSxrQkFBa0IsQ0E2QjlCO0FBN0JZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgRGF0YUl0ZW0gfSBmcm9tIFwiLi4vLi4vc2VydmljZS9kYXRhSXRlbVwiO1xuaW1wb3J0IHsgRGF0YUl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvZGF0YUl0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlld1wiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHByb3ZpZGVyczogW0RhdGFJdGVtU2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL290aGVydGFzay9vdGhlcnRhc2suaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL290aGVydGFzay9vdGhlcnRhc2stY29tbW9uLmNzc1wiLCBcInBhZ2VzL290aGVydGFzay9vdGhlcnRhc2suY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIE90aGVyVGFza0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxue1xuICAgIHByaXZhdGUgX2RhdGFJdGVtczogT2JzZXJ2YWJsZUFycmF5PERhdGFJdGVtPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGFJdGVtU2VydmljZTogRGF0YUl0ZW1TZXJ2aWNlLHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB9XG5cbiAgICBnZXQgZGF0YUl0ZW1zKCk6IE9ic2VydmFibGVBcnJheTxEYXRhSXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YUl0ZW1zO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9kYXRhSXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuX2RhdGFJdGVtU2VydmljZS5nZXREYXRhSXRlbXMoKSk7XG4gICAgfVxuICAgIHB1YmxpYyBvblN3aXBlQ2VsbFN0YXJ0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpXG4gICAge1xuICAgIHZhciBzd2lwZUxpbWl0cyA9IGFyZ3MuZGF0YS5zd2lwZUxpbWl0cztcbiAgICB2YXIgc3dpcGVWaWV3ID0gYXJnc1snb2JqZWN0J107XG4gICAgdmFyIGxlZnRJdGVtID0gc3dpcGVWaWV3LmdldFZpZXdCeUlkPFZpZXc+KCdlbXB0eVZpZXcnKTtcbiAgICB2YXIgcmlnaHRJdGVtID0gc3dpcGVWaWV3LmdldFZpZXdCeUlkPFZpZXc+KCdkZWxldGVWaWV3Jyk7XG4gICAgc3dpcGVMaW1pdHMubGVmdCA9IGxlZnRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICBzd2lwZUxpbWl0cy5yaWdodCA9IHJpZ2h0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgc3dpcGVMaW1pdHMudGhyZXNob2xkID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpIC8gMjtcbiAgICB9XG4gICAgY3JlYXRlVGFzaygpe1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2NyZWF0ZXRhc2tcIl0pO1xuXG4gICAgfVxuICAgXG59XG4iXX0=