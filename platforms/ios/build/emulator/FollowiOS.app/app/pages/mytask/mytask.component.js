"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var dataItem_service_1 = require("../../service/dataItem.service");
var MyTaskComponent = (function () {
    function MyTaskComponent(_dataItemService) {
        this._dataItemService = _dataItemService;
    }
    Object.defineProperty(MyTaskComponent.prototype, "dataItems", {
        get: function () {
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    MyTaskComponent.prototype.ngOnInit = function () {
        this._dataItems = new observable_array_1.ObservableArray(this._dataItemService.getDataItems());
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
    return MyTaskComponent;
}());
MyTaskComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        providers: [dataItem_service_1.DataItemService],
        templateUrl: "pages/mytask/mytask.html",
        styleUrls: ["pages/mytask/mytask-common.css", "pages/mytask/mytask.css"]
    }),
    __metadata("design:paramtypes", [dataItem_service_1.DataItemService])
], MyTaskComponent);
exports.MyTaskComponent = MyTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXl0YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15dGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBa0Q7QUFDbEQsMkVBQXlFO0FBRXpFLG1FQUFpRTtBQVVqRSxJQUFhLGVBQWU7SUFJeEIseUJBQW9CLGdCQUFpQztRQUFqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO0lBQ3JELENBQUM7SUFFRCxzQkFBSSxzQ0FBUzthQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGtDQUFlLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNNLDRDQUFrQixHQUF6QixVQUEwQixJQUF1QjtRQUVqRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0IsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBTyxZQUFZLENBQUMsQ0FBQztRQUN6RCxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFPLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELFdBQVcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDL0MsV0FBVyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqRCxXQUFXLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBQ0Qsc0JBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBeEJZLGVBQWU7SUFOM0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2pCLFNBQVMsRUFBRSxDQUFDLGtDQUFlLENBQUM7UUFDN0IsV0FBVyxFQUFFLDBCQUEwQjtRQUN2QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSx5QkFBeUIsQ0FBQztLQUN6RSxDQUFDO3FDQUt3QyxrQ0FBZTtHQUo1QyxlQUFlLENBd0IzQjtBQXhCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgRGF0YUl0ZW0gfSBmcm9tIFwiLi4vLi4vc2VydmljZS9kYXRhSXRlbVwiO1xuaW1wb3J0IHsgRGF0YUl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvZGF0YUl0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpLXByby9saXN0dmlld1wiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gICBwcm92aWRlcnM6IFtEYXRhSXRlbVNlcnZpY2VdLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9teXRhc2svbXl0YXNrLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9teXRhc2svbXl0YXNrLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9teXRhc2svbXl0YXNrLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBNeVRhc2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXRcbntcbiAgICBwcml2YXRlIF9kYXRhSXRlbXM6IE9ic2VydmFibGVBcnJheTxEYXRhSXRlbT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRhSXRlbVNlcnZpY2U6IERhdGFJdGVtU2VydmljZSkge1xuICAgIH1cblxuICAgIGdldCBkYXRhSXRlbXMoKTogT2JzZXJ2YWJsZUFycmF5PERhdGFJdGVtPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhSXRlbXM7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX2RhdGFJdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5fZGF0YUl0ZW1TZXJ2aWNlLmdldERhdGFJdGVtcygpKTtcbiAgICB9XG4gICAgcHVibGljIG9uU3dpcGVDZWxsU3RhcnRlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSlcbiAgICB7XG4gICAgdmFyIHN3aXBlTGltaXRzID0gYXJncy5kYXRhLnN3aXBlTGltaXRzO1xuICAgIHZhciBzd2lwZVZpZXcgPSBhcmdzWydvYmplY3QnXTtcbiAgICB2YXIgbGVmdEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQ8Vmlldz4oJ2RlbGV0ZVZpZXcnKTtcbiAgICB2YXIgcmlnaHRJdGVtID0gc3dpcGVWaWV3LmdldFZpZXdCeUlkPFZpZXc+KCdkb25lVmlldycpO1xuICAgIHN3aXBlTGltaXRzLmxlZnQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgc3dpcGVMaW1pdHMucmlnaHQgPSByaWdodEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgIHN3aXBlTGltaXRzLnRocmVzaG9sZCA9IGxlZnRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKSAvIDI7XG59XG59Il19