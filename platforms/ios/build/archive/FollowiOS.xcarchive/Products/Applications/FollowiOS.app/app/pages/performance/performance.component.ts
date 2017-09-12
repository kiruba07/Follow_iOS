import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
  selector: "my-app",
  templateUrl: "pages/performance/performance.html",
  styleUrls: ["pages/performance/performance-common.css", "pages/performance/performance.css"]
})
export class PerformanceComponent {
  public selectedIndex = 1;
  public items: Array<string>;

  constructor() {
      this.items = [];
      for (var i = 0; i < 5; i++) {
          this.items.push("data item " + i);
      }
  }

  public onchange(args: SelectedIndexChangedEventData) {
      console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
  }

  public onopen() {
      console.log("Drop Down opened.");
  }

  public onclose() {
      console.log("Drop Down closed.");
  }
  
}
