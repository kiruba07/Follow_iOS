"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("tns-core-modules/color");
var builder_1 = require("tns-core-modules/ui/builder");
var types = require("tns-core-modules/utils/types");
var utils = require("tns-core-modules/utils/utils");
var common = require("../accordion.common");
var observable_1 = require("tns-core-modules/data/observable");
var label_1 = require("tns-core-modules/ui/label");
exports.ITEMSLOADING = "itemsLoading";
exports.HEADERLOADING = "headerLoading";
exports.FOOTERLOADING = "footerLoading";
exports.STARTHEADERLOADING = "startHeaderLoading";
exports.STARTITEMLOADING = "startItemLoading";
exports.STARTFOOTERLOADING = "startFooterLoading";
var NG_VIEW = "_ngViewRef";
global.moduleMerge(common, exports);
function notifyForItemAtIndex(owner, nativeView, view, eventName, parentIndex, childIndex) {
    var args = { eventName: eventName, object: owner, parentIndex: parentIndex, childIndex: childIndex, view: view, ios: undefined, android: nativeView };
    owner.notify(args);
    return args;
}
function notifyForHeaderOrFooterAtIndex(owner, nativeView, view, eventName, parentIndex) {
    var args = { eventName: eventName, object: owner, parentIndex: parentIndex, view: view, ios: undefined, android: nativeView };
    owner.notify(args);
    return args;
}
function notifyForHeaderOrFooterStartAtIndex(owner, eventName, parentIndex) {
    var args = { eventName: eventName, object: owner, parentIndex: parentIndex };
    owner.notify(args);
    return args;
}
function notifyForItemStartAtIndex(owner, eventName, parentIndex, childIndex) {
    var args = { eventName: eventName, object: owner, parentIndex: parentIndex, childIndex: childIndex };
    owner.notify(args);
    return args;
}
var Accordion = (function (_super) {
    __extends(Accordion, _super);
    function Accordion() {
        var _this = _super.call(this) || this;
        _this._previousGroup = -1;
        _this._views = [];
        _this.selectedIndexes = [];
        _this._itemsMap = new Map();
        _this._headerMap = new Map();
        _this._itemsMap = new Map();
        _this._expandedViews = new Map();
        return _this;
    }
    Accordion.prototype.headerTemplateUpdated = function (oldData, newData) {
    };
    Accordion.prototype.footerTemplateUpdated = function (oldData, newData) {
    };
    Accordion.prototype.templateUpdated = function (oldData, newData) {
    };
    Accordion.prototype.updateNativeItems = function (oldItems, newItems) {
        var _this = this;
        if (oldItems) {
            if (this._listAdapter) {
                this._listAdapter.notifyDataSetChanged();
            }
        }
        if (newItems) {
            if (Array.isArray(newItems)) {
                if (this._listAdapter) {
                    this._listAdapter.notifyDataSetChanged();
                }
            }
            else {
                if (newItems && newItems.on) {
                    newItems.on("change", function (args) {
                        if (_this._listAdapter) {
                            _this._listAdapter.notifyDataSetChanged();
                        }
                    });
                }
            }
        }
    };
    Object.defineProperty(Accordion.prototype, "android", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    Accordion.prototype.addToView = function (view) {
        this._addView(view);
    };
    Accordion.prototype.createNativeView = function () {
        var _this = this;
        this._android = new android.widget.ExpandableListView(utils.ad.getApplicationContext());
        var that = new WeakRef(this);
        if (this.separatorColor) {
            this._android.setDivider(new android.graphics.drawable.ColorDrawable(new color_1.Color(this.separatorColor).android));
            this._android.setDividerHeight(1);
        }
        this._android.setGroupIndicator(null);
        this._android.setOnGroupExpandListener(new android.widget.ExpandableListView.OnGroupExpandListener({
            onGroupExpand: function (groupPosition) {
                var owner = that.get();
                owner._expandedViews.set(groupPosition, true);
                owner.groupExpanded(groupPosition);
                if (!owner.allowMultiple) {
                    owner._selectedIndexUpdatedFromNative(groupPosition);
                    if ((owner._previousGroup != -1) && (groupPosition != owner._previousGroup)) {
                        owner.android.collapseGroup(owner._previousGroup);
                    }
                    owner._previousGroup = groupPosition;
                }
                owner.selectedIndexes.forEach(function (item, index, arr) {
                    if (item === groupPosition) {
                        owner.selectedIndexes.slice(index, 1);
                    }
                    if (index === arr.length) {
                        owner.selectedIndexes.push(groupPosition);
                    }
                });
            }
        }));
        this._android.setOnGroupCollapseListener(new android.widget.ExpandableListView.OnGroupCollapseListener({
            onGroupCollapse: function (groupPosition) {
                var owner = that.get();
                owner._expandedViews.set(groupPosition, false);
                var items = owner.selectedIndexes;
                owner.groupCollapsed(groupPosition);
                owner.selectedIndexes = owner.selectedIndexes.map(function (item) {
                    if (item != groupPosition) {
                        return item;
                    }
                });
            }
        }));
        this._listAdapter = new AccordionListAdapter(this);
        this._android.setAdapter(this._listAdapter);
        if (this.selectedIndexes) {
            this.selectedIndexes.forEach(function (item) {
                _this._android.expandGroup(item);
            });
        }
        return this._android;
    };
    Accordion.prototype.addItem = function (view) {
        this.items.push(view);
        this._addView(view);
        this._listAdapter.notifyDataSetChanged();
    };
    Accordion.prototype.refresh = function () {
        if (!this._android || !this._android.getExpandableListAdapter()) {
            return;
        }
        if (this._headerMap) {
            this._headerMap.forEach(function (view, id) {
                if (!(view.bindingContext instanceof observable_1.Observable)) {
                    view.bindingContext = null;
                }
            });
        }
        if (this._itemsMap) {
            this._itemsMap.forEach(function (view, id) {
                if (!(view.bindingContext instanceof observable_1.Observable)) {
                    view.bindingContext = null;
                }
            });
        }
        if (this._footerMap) {
            this._footerMap.forEach(function (view, id) {
                if (!(view.bindingContext instanceof observable_1.Observable)) {
                    view.bindingContext = null;
                }
            });
        }
        this._listAdapter.notifyDataSetChanged();
    };
    Accordion.prototype.updateNativeIndex = function (oldIndex, newIndex) {
        if (this._android) {
            if (newIndex >= 0) {
                this._android.expandGroup(newIndex);
            }
        }
    };
    Accordion.prototype._selectedIndexUpdatedFromNative = function (newIndex) {
        if (this.selectedIndex !== newIndex) {
            var old = this._previousGroup;
            common.selectedIndexProperty.nativeValueChange(this, newIndex);
            this.notify({ eventName: common.Accordion.selectedIndexChangedEvent, object: this, old: old, newIndex: newIndex });
        }
    };
    Accordion.prototype.groupExpanded = function (index) {
        this.notifyPropertyChange("groupExpanded", index);
    };
    Accordion.prototype.groupCollapsed = function (index) {
        this.notifyPropertyChange("groupCollapsed", index);
    };
    Accordion.prototype.expandItem = function (id) {
        if (id) {
            this._android.expandGroup(id);
        }
    };
    Accordion.prototype.isItemExpanded = function (id) {
        return this._android.isGroupExpanded(id);
    };
    return Accordion;
}(common.Accordion));
exports.Accordion = Accordion;
var AccordionListAdapter = (function (_super) {
    __extends(AccordionListAdapter, _super);
    function AccordionListAdapter(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    AccordionListAdapter.prototype.getChild = function (groupPosition, childPosition) {
        return null;
    };
    AccordionListAdapter.prototype.getGroup = function (groupPosition) {
        return null;
    };
    AccordionListAdapter.prototype.hasStableIds = function () {
        return true;
    };
    AccordionListAdapter.prototype.getGroupView = function (groupPosition, isExpanded, convertView, parent) {
        var owner = this.owner;
        var view = !types.isNullOrUndefined(owner.headerTemplate) ? builder_1.parse(owner.headerTemplate, this) : null;
        var _args = notifyForHeaderOrFooterAtIndex(owner, view ? view.nativeView : null, view, exports.HEADERLOADING, groupPosition);
        view = view || _args.view;
        if (view) {
            var data = owner._getParentData(groupPosition);
            view.bindingContext = observable_1.fromObject(data);
            if (!view.parent) {
                owner._addView(view);
            }
            owner._headerMap.set(groupPosition, view);
            return view.nativeView;
        }
        var header = new label_1.Label();
        header.text = owner._getParentData(groupPosition) ? owner._getParentData(groupPosition).headerText : "";
        if (owner.headerTextAlignment === "center") {
            header.nativeView.setTextAlignment(android.view.View.TEXT_ALIGNMENT_CENTER);
        }
        else if (owner.headerTextAlignment === "right") {
            header.android.setTextAlignment(android.view.View.TEXT_ALIGNMENT_VIEW_END);
        }
        else if (owner.headerTextAlignment === "left") {
            header.nativeView.setTextAlignment(android.view.View.TEXT_ALIGNMENT_VIEW_START);
        }
        if (owner.headerHeight) {
            header.nativeView.setHeight(owner.headerHeight);
        }
        if (owner.headerColor) {
            header.nativeView.setBackgroundColor(new color_1.Color(owner.headerColor).android);
        }
        if (owner.headerTextColor) {
            header.nativeView.setTextColor(new color_1.Color(owner.headerTextColor).android);
        }
        if (owner.headerTextSize) {
            header.nativeView.setTextSize(this.owner.headerTextSize);
        }
        owner._addView(header);
        owner._headerMap.set(groupPosition, header);
        return header;
    };
    AccordionListAdapter.prototype.getGroupCount = function () {
        return this.owner.items && this.owner.items.length ? this.owner.items.length : 0;
    };
    AccordionListAdapter.prototype.getGroupId = function (groupPosition) {
        return groupPosition;
    };
    AccordionListAdapter.prototype.getChildView = function (groupPosition, childPosition, isLastChild, convertView, parent) {
        var owner = this.owner;
        var prop = parseInt("" + (groupPosition + 1) + childPosition);
        var view = !types.isNullOrUndefined(owner.itemTemplate) ? builder_1.parse(owner.itemTemplate, this) : null;
        var _args = notifyForItemAtIndex(owner, view ? view.nativeView : null, view, exports.ITEMSLOADING, groupPosition, childPosition);
        view = view || _args.view;
        owner._itemsMap.set(prop, view);
        if (view) {
            var data = owner._getChildData(groupPosition, childPosition);
            view.bindingContext = observable_1.fromObject(data);
            if (!view.parent) {
                owner._addView(view);
            }
            return view.nativeView;
        }
        return null;
    };
    AccordionListAdapter.prototype.getChildId = function (groupPosition, childPosition) {
        return childPosition;
    };
    AccordionListAdapter.prototype.getChildrenCount = function (groupPosition) {
        var owner = this.owner;
        if (owner && owner.items && owner._getParentData(groupPosition)) {
            if (typeof owner._getParentData(groupPosition).get === "function") {
                return owner._getParentData(groupPosition).get('items').length;
            }
            else {
                return owner._getParentData(groupPosition)['items'].length;
            }
        }
        else {
            return 0;
        }
    };
    AccordionListAdapter.prototype.isChildSelectable = function (groupPosition, childPosition) {
        return true;
    };
    return AccordionListAdapter;
}(android.widget.BaseExpandableListAdapter));
exports.AccordionListAdapter = AccordionListAdapter;
//# sourceMappingURL=accordion.js.map