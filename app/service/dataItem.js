"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// >> listview-angular-data-item
var DataItem = (function () {
    function DataItem(id, name, description, title, text, image, selected, type) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.title = title;
        this.text = text;
        this.image = image;
        this.selected = selected;
        this.type = type;
    }
    return DataItem;
}());
exports.DataItem = DataItem;
// << listview-angular-data-item
