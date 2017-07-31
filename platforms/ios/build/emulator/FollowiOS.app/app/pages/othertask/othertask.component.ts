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
  templateUrl: "pages/othertask/othertask.html",
  styleUrls: ["pages/othertask/othertask-common.css", "pages/othertask/othertask.css"]
})
export class OtherTaskComponent implements OnInit
{
    private _dataItems: ObservableArray<DataItem>;

    constructor(private _dataItemService: DataItemService,private router: Router) {
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
    var leftItem = swipeView.getViewById<View>('emptyView');
    var rightItem = swipeView.getViewById<View>('deleteView');
    swipeLimits.left = leftItem.getMeasuredWidth();
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    }
    createTask(){
            this.router.navigate(["/createtask"]);

    }
   
}
