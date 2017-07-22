"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var dataItem_service_1 = require("../../service/dataItem.service");
var MyTaskComponent = (function () {
    function MyTaskComponent(_dataItemService, router) {
        this._dataItemService = _dataItemService;
        this.router = router;
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
    MyTaskComponent.prototype.createTask = function () {
        this.router.navigate(["/createtask"]);
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
    __metadata("design:paramtypes", [dataItem_service_1.DataItemService, router_1.Router])
], MyTaskComponent);
exports.MyTaskComponent = MyTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXl0YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15dGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBeUM7QUFDekMsc0NBQWtEO0FBQ2xELDJFQUF5RTtBQUV6RSxtRUFBaUU7QUFXakUsSUFBYSxlQUFlO0lBSXhCLHlCQUFvQixnQkFBaUMsRUFBUyxNQUFjO1FBQXhELHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBRTVFLENBQUM7SUFFRCxzQkFBSSxzQ0FBUzthQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGtDQUFlLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNNLDRDQUFrQixHQUF6QixVQUEwQixJQUF1QjtRQUVqRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0IsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBTyxZQUFZLENBQUMsQ0FBQztRQUN6RCxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFPLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELFdBQVcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDL0MsV0FBVyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqRCxXQUFXLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBQ0Qsb0NBQVUsR0FBVjtRQUVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0osc0JBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLGVBQWU7SUFOM0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2pCLFNBQVMsRUFBRSxDQUFDLGtDQUFlLENBQUM7UUFDN0IsV0FBVyxFQUFFLDBCQUEwQjtRQUN2QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSx5QkFBeUIsQ0FBQztLQUN6RSxDQUFDO3FDQUt3QyxrQ0FBZSxFQUFpQixlQUFNO0dBSm5FLGVBQWUsQ0E2QjNCO0FBN0JZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBEYXRhSXRlbSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2RhdGFJdGVtXCI7XG5pbXBvcnQgeyBEYXRhSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9kYXRhSXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2xpc3R2aWV3XCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICAgcHJvdmlkZXJzOiBbRGF0YUl0ZW1TZXJ2aWNlXSxcbiAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbXl0YXNrL215dGFzay5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvbXl0YXNrL215dGFzay1jb21tb24uY3NzXCIsIFwicGFnZXMvbXl0YXNrL215dGFzay5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTXlUYXNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0XG57XG4gICAgcHJpdmF0ZSBfZGF0YUl0ZW1zOiBPYnNlcnZhYmxlQXJyYXk8RGF0YUl0ZW0+O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGFJdGVtU2VydmljZTogRGF0YUl0ZW1TZXJ2aWNlLHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZ2V0IGRhdGFJdGVtcygpOiBPYnNlcnZhYmxlQXJyYXk8RGF0YUl0ZW0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFJdGVtcztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fZGF0YUl0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLl9kYXRhSXRlbVNlcnZpY2UuZ2V0RGF0YUl0ZW1zKCkpO1xuICAgIH1cbiAgICBwdWJsaWMgb25Td2lwZUNlbGxTdGFydGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKVxuICAgIHtcbiAgICB2YXIgc3dpcGVMaW1pdHMgPSBhcmdzLmRhdGEuc3dpcGVMaW1pdHM7XG4gICAgdmFyIHN3aXBlVmlldyA9IGFyZ3NbJ29iamVjdCddO1xuICAgIHZhciBsZWZ0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZDxWaWV3PignZGVsZXRlVmlldycpO1xuICAgIHZhciByaWdodEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQ8Vmlldz4oJ2RvbmVWaWV3Jyk7XG4gICAgc3dpcGVMaW1pdHMubGVmdCA9IGxlZnRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICBzd2lwZUxpbWl0cy5yaWdodCA9IHJpZ2h0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgc3dpcGVMaW1pdHMudGhyZXNob2xkID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpIC8gMjtcbiAgIH1cbiAgIGNyZWF0ZVRhc2soKXtcblxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9jcmVhdGV0YXNrXCJdKTtcbiAgIH1cbn0iXX0=