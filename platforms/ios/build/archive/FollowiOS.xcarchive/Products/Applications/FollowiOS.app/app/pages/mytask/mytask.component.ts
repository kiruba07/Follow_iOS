import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { DataItem } from "../../service/dataItem";
import { DataItemService } from "../../service/dataItem.service";
import { ListViewEventData, RadListView } from "nativescript-telerik-ui-pro/listview";
import { View } from "tns-core-modules/ui/core/view";

@Component({
  selector: "my-app",
   providers: [DataItemService],
  templateUrl: "pages/mytask/mytask.html",
  styleUrls: ["pages/mytask/mytask-common.css", "pages/mytask/mytask.css"]
})
export class MyTaskComponent implements OnInit
{
    private _dataItems: ObservableArray<DataItem>;

    constructor(private _dataItemService: DataItemService) {
    }

    get dataItems(): ObservableArray<DataItem> {
        return this._dataItems;
    }

    ngOnInit() {
        this._dataItems = new ObservableArray(this._dataItemService.getDataItems());
    }
    public onSwipeCellStarted(args: ListViewEventData)
    {
    var swipeLimits = args.data.swipeLimits;
    var swipeView = args['object'];
    var leftItem = swipeView.getViewById<View>('deleteView');
    var rightItem = swipeView.getViewById<View>('doneView');
    swipeLimits.left = leftItem.getMeasuredWidth();
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
}
}