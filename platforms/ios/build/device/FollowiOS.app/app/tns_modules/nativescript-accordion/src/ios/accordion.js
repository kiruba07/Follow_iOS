"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var builder_1 = require("tns-core-modules/ui/builder");
var common = require("../accordion.common");
var types = require("tns-core-modules/utils/types");
var color_1 = require("tns-core-modules/color");
var utils = require("tns-core-modules/utils/utils");
var observable_1 = require("tns-core-modules/data/observable");
exports.ITEMSLOADING = "itemsLoading";
exports.HEADERLOADING = "headerLoading";
exports.FOOTERLOADING = "footerLoading";
exports.STARTHEADERLOADING = "startHeaderLoading";
exports.STARTITEMLOADING = "startItemLoading";
exports.STARTFOOTERLOADING = "startFooterLoading";
exports.ITEMTAP = "itemTap";
exports.LOADMOREITEMS = "loadMoreItems";
exports.ITEMHEIGHT = "itemHeight";
var NG_VIEW = "_ngViewRef";
global.moduleMerge(common, exports);
var DEFAULT_HEIGHT = 44;
var infinity = utils.layout.makeMeasureSpec(0, utils.layout.UNSPECIFIED);
function notifyForItemAtIndex(owner, nativeView, view, eventName, indexPath) {
    var args = { eventName: eventName, object: owner, parentIndex: indexPath.section, childIndex: indexPath.row, view: view, ios: nativeView, android: undefined };
    owner.notify(args);
    return args;
}
function notifyForHeaderOrFooterAtIndex(owner, nativeView, view, eventName, parentIndex) {
    var args = { eventName: eventName, object: owner, parentIndex: parentIndex, view: view, ios: nativeView, android: undefined };
    owner.notify(args);
    return args;
}
var AccordionViewCellReuseIdentifier = "AccordionCellReuseIdentifier";
var DefaultAccordionHeaderViewHeight = 44.0;
var AccordionHeaderViewReuseIdentifier = "AccordionHeaderViewReuseIdentifier";
var AccordionFooterViewReuseIdentifier = "AccordionFooterViewReuseIdentifier";
var Accordion = (function (_super) {
    __extends(Accordion, _super);
    function Accordion() {
        var _this = _super.call(this) || this;
        _this.left = 0;
        _this.top = 0;
        _this.right = 0;
        _this.bottom = 0;
        _this._ios = UITableView.new();
        return _this;
    }
    Accordion.prototype.headerTemplateUpdated = function (oldData, newData) {
        this.refresh();
    };
    Accordion.prototype.footerTemplateUpdated = function (oldData, newData) {
        this.refresh();
    };
    Accordion.prototype.templateUpdated = function (oldData, newData) {
        this.refresh();
    };
    Accordion.prototype.updateNativeItems = function (oldItems, newItems) {
        this._ios.reloadData();
    };
    Accordion.prototype.groupCollapsed = function (index) {
        this.notifyPropertyChange("groupCollapsed", index);
    };
    Accordion.prototype.groupExpanded = function (index) {
        this.notifyPropertyChange("groupExpanded", index);
    };
    Accordion.prototype.createNativeView = function () {
        this._ios.registerClassForCellReuseIdentifier(AccordionCell.class(), AccordionViewCellReuseIdentifier);
        this.ios.registerNibForHeaderFooterViewReuseIdentifier(UINib.nibWithNibNameBundle("AccordionHeaderView", null), AccordionHeaderViewReuseIdentifier);
        this.ios.registerNibForHeaderFooterViewReuseIdentifier(UINib.nibWithNibNameBundle("AccordionFooterView", null), AccordionFooterViewReuseIdentifier);
        this._ios.autoresizingMask = 0;
        this._ios.estimatedRowHeight = DEFAULT_HEIGHT;
        this._ios.rowHeight = UITableViewAutomaticDimension;
        this._dataSource = AccordionDataSource.initWithOwner(new WeakRef(this));
        this._delegate = UITableViewDelegateImpl.initWithOwner(new WeakRef(this));
        this._setNativeClipToBounds();
        this._expandedViews = new Map();
        this._itemsMap = new Map();
        this._indexSet = NSMutableIndexSet.alloc().init();
        return this._ios;
    };
    Accordion.prototype.initNativeView = function () {
        if (this._isDataDirty) {
            this.requestLayout();
            this.refresh();
        }
        this._ios.dataSource = this._dataSource;
        this._ios.delegate = this._delegate;
        if (this.separatorColor) {
            this.ios.separatorColor = new color_1.Color(this.separatorColor).ios;
        }
    };
    Accordion.prototype.disposeNativeView = function () {
        this._ios.delegate = null;
        if (this._indexSet) {
            this._indexSet.removeAllIndexes();
        }
    };
    Accordion.prototype._setNativeClipToBounds = function () {
        this._ios.clipsToBounds = true;
    };
    Object.defineProperty(Accordion.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Accordion.prototype.addItem = function (view) {
    };
    Accordion.prototype.refresh = function () {
        if (this.isLoaded) {
            this._ios.reloadData();
            this.requestLayout();
            this._isDataDirty = false;
        }
        else {
            this._isDataDirty = true;
        }
    };
    Accordion.prototype._selectedIndexUpdatedFromNative = function (newIndex) {
        if (this.selectedIndex !== newIndex) {
            common.selectedIndexProperty.nativeValueChange(this, newIndex);
        }
    };
    Accordion.prototype.scrollToIndex = function (index) {
        if (this._ios) {
            this._ios.scrollToRowAtIndexPathAtScrollPositionAnimated(NSIndexPath.indexPathForItemInSection(index, 0), 1, false);
        }
    };
    Accordion.prototype.measure = function (widthMeasureSpec, heightMeasureSpec) {
        this.widthMeasureSpec = widthMeasureSpec;
        var changed = this._setCurrentMeasureSpecs(widthMeasureSpec, heightMeasureSpec);
        _super.prototype.measure.call(this, widthMeasureSpec, heightMeasureSpec);
        if (changed) {
            this._ios.reloadData();
        }
    };
    Object.defineProperty(Accordion.prototype, "_childrenCount", {
        get: function () {
            return this.items ? this.items.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Accordion.prototype.updateNativeIndex = function (oldIndex, newIndex) {
        var _this = this;
        var reloadSection = function (index, sections) {
            var section = NSMutableIndexSet.alloc().initWithIndex(index);
            if (!sections) {
                _this._ios.reloadSectionsWithRowAnimation(section, 5);
            }
            else {
                _this._ios.reloadSectionsWithRowAnimation(sections, 100);
            }
        };
        if (this.allowMultiple) {
            if (!this._expandedViews.get(newIndex)) {
                this._expandedViews.set(newIndex, true);
                this._indexSet.addIndex(newIndex);
                this._selectedIndexUpdatedFromNative(newIndex);
            }
            this._ios.reloadData();
        }
        else {
            if (!this._expandedViews.get(newIndex)) {
                if (this._indexSet.count > 0) {
                    this._expandedViews.clear();
                    this._indexSet.removeAllIndexes();
                    this._selectedIndexUpdatedFromNative(newIndex);
                    this._expandedViews.set(newIndex, true);
                    this._indexSet.addIndex(newIndex);
                }
                else {
                    this._expandedViews.set(newIndex, true);
                    this._indexSet.addIndex(newIndex);
                }
                this._ios.reloadData();
            }
        }
    };
    return Accordion;
}(common.Accordion));
exports.Accordion = Accordion;
var AccordionHeaderViewCell = (function (_super) {
    __extends(AccordionHeaderViewCell, _super);
    function AccordionHeaderViewCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AccordionHeaderViewCell.prototype, "view", {
        get: function () {
            return this.owner ? this.owner.get() : null;
        },
        enumerable: true,
        configurable: true
    });
    return AccordionHeaderViewCell;
}(UITableViewCell));
exports.AccordionHeaderViewCell = AccordionHeaderViewCell;
var AccordionDataSource = (function (_super) {
    __extends(AccordionDataSource, _super);
    function AccordionDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionDataSource.initWithOwner = function (owner) {
        var dataSource = AccordionDataSource.new();
        dataSource._owner = owner;
        return dataSource;
    };
    AccordionDataSource.prototype.tableViewNumberOfRowsInSection = function (tableView, section) {
        var owner = this._owner.get();
        if (owner._expandedViews.has(section)) {
            return (owner && owner.items && owner._getParentData(section)['items']) ? owner._getParentData(section)['items'].length : 0;
        }
        else {
            return 0;
        }
    };
    AccordionDataSource.prototype.numberOfSectionsInTableView = function (tableView) {
        var owner = this._owner.get();
        return (owner && owner.items) ? owner.items.length : 0;
    };
    AccordionDataSource.prototype.tableViewTitleForHeaderInSection = function (tableView, section) {
        var owner = this._owner.get();
        return owner._getParentData(section).headerText;
    };
    AccordionDataSource.prototype.tableViewCellForRowAtIndexPath = function (tableView, indexPath) {
        var owner = this._owner.get();
        var cell;
        if (owner) {
            var has = owner._expandedViews.has(indexPath.section);
            var selected = owner._expandedViews.get(indexPath.section);
            if (has && !selected) {
                cell = AccordionCell.new();
            }
            else {
                cell = AccordionCell.new();
                owner._expandedViews.set(indexPath.section, true);
                var view = !types.isNullOrUndefined(owner.itemTemplate) ? builder_1.parse(owner.itemTemplate, this) : null;
                var _args = notifyForItemAtIndex(owner, null, view, exports.ITEMSLOADING, indexPath);
                view = view || _args.view;
                var prop = parseInt("" + (indexPath.section + 1) + indexPath.row);
                owner._itemsMap.set(prop, view);
                if (view) {
                    var data = owner._getChildData(indexPath.section, indexPath.row);
                    if (!types.isNullOrUndefined(data)) {
                        view.bindingContext = observable_1.fromObject(data);
                    }
                    if (!view.parent) {
                        owner._addView(view);
                    }
                    var rowHeight = owner._effectiveRowHeight;
                    var heightMeasureSpec = rowHeight >= 0 ? utils.layout.makeMeasureSpec(rowHeight, utils.layout.EXACTLY) : infinity;
                    var measuredSize = view_1.View.measureChild(owner, view, owner.widthMeasureSpec, heightMeasureSpec);
                    var height = measuredSize.measuredHeight;
                    var width = measuredSize.measuredWidth;
                    view_1.View.layoutChild(owner, view, 0, 0, width, height);
                    cell.contentView.addSubview(view.nativeView);
                }
            }
        }
        else {
            cell = AccordionCell.new();
        }
        cell.selectionStyle = 0;
        return cell;
    };
    return AccordionDataSource;
}(NSObject));
AccordionDataSource.ObjCProtocols = [UITableViewDataSource];
exports.AccordionDataSource = AccordionDataSource;
var AccordionCell = (function (_super) {
    __extends(AccordionCell, _super);
    function AccordionCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionCell.prototype.willMoveToSuperview = function (newSuperview) {
    };
    return AccordionCell;
}(UITableViewCell));
exports.AccordionCell = AccordionCell;
var UITableViewDelegateImpl = (function (_super) {
    __extends(UITableViewDelegateImpl, _super);
    function UITableViewDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UITableViewDelegateImpl.initWithOwner = function (owner) {
        var delegate = UITableViewDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    };
    UITableViewDelegateImpl.prototype.tableViewHeightForRowAtIndexPath = function (tableView, indexPath) {
        var owner = this._owner.get();
        if (owner._expandedViews.get(indexPath.section)) {
            var view = builder_1.parse(owner.itemTemplate, this);
            var data = owner._getChildData(indexPath.section, indexPath.row);
            if (!view) {
                var prop = parseInt("" + (indexPath.section + 1) + indexPath.row);
                view = owner._itemsMap.get(prop);
                return (view && view.ios) ? view.ios.frame.size.height : DEFAULT_HEIGHT;
            }
            if (view) {
                if (!types.isNullOrUndefined(data)) {
                    view.bindingContext = data;
                }
                if (!view.parent) {
                    owner._addView(view);
                }
                var rowHeight = owner._effectiveRowHeight;
                var heightMeasureSpec = rowHeight >= 0 ? utils.layout.makeMeasureSpec(rowHeight, utils.layout.EXACTLY) : infinity;
                var measuredSize = view_1.View.measureChild(owner, view, owner.widthMeasureSpec, heightMeasureSpec);
                var height = measuredSize.measuredHeight;
                var width = measuredSize.measuredWidth;
                view_1.View.layoutChild(owner, view, 0, 0, width, height);
            }
            return (view && view.ios) ? view.ios.frame.size.height : DEFAULT_HEIGHT;
        }
        return 0;
    };
    UITableViewDelegateImpl.prototype.tableViewEstimatedHeightForHeaderInSection = function (tableView, section) {
        return DEFAULT_HEIGHT;
    };
    UITableViewDelegateImpl.prototype.tableViewHeightForHeaderInSection = function (tableView, section) {
        var owner = this._owner.get();
        if (owner.headerHeight) {
            return owner.headerHeight;
        }
        return DEFAULT_HEIGHT;
    };
    UITableViewDelegateImpl.prototype.tableViewHeightForFooterInSection = function (tableView, section) {
        var owner = this._owner.get();
        if (owner.footerHeight) {
            return owner.footerHeight;
        }
        return -1;
    };
    ;
    UITableViewDelegateImpl.prototype.tableViewDidSelectRowAtIndexPath = function (tableView, indexPath) {
        var owner = this._owner.get();
        var data = owner._getChildData(indexPath.section, indexPath.row);
        var args = { eventName: "itemTapped", data: data, object: owner, childIndex: indexPath.row, parentIndex: indexPath.section, view: null, ios: null, android: undefined };
        owner.notify(args);
    };
    UITableViewDelegateImpl.prototype.tableViewWillDisplayHeaderViewForSection = function (tableView, view, section) {
        var owner = this._owner.get();
        if (view instanceof UITableViewHeaderFooterView) {
            var headerView = view;
            if (owner.headerTextColor) {
                headerView.textLabel.textColor = new color_1.Color(owner.headerTextColor).ios;
            }
            if (owner.headerTextSize) {
                headerView.textLabel.font = UIFont.systemFontOfSize(owner.headerTextSize);
            }
            if (owner.headerTextAlignment === "center") {
                headerView.textLabel.textAlignment = 1;
            }
            else if (owner.headerTextAlignment === "right") {
                headerView.textLabel.textAlignment = 2;
            }
            else if (owner.headerTextAlignment === "left") {
                headerView.textLabel.textAlignment = 0;
            }
            else {
                headerView.textLabel.textAlignment = 4;
            }
            if (owner.headerTextBold) {
                headerView.textLabel.font = UIFont.systemFontOfSizeWeight(UIFont.systemFontSize, UIFontWeightHeavy);
            }
        }
    };
    UITableViewDelegateImpl.prototype.tableViewWillDisplayFooterViewForSection = function (tableView, view, section) {
        var owner = this._owner.get();
        if (view instanceof UITableViewHeaderFooterView) {
            var headerView = view;
            if (owner.footerTextColor) {
                headerView.textLabel.textColor = new color_1.Color(owner.footerTextColor).ios;
            }
            if (owner.footerTextSize) {
                headerView.textLabel.font = UIFont.systemFontOfSize(owner.footerTextSize);
            }
            if (owner.footerTextAlignment === "center") {
                headerView.textLabel.textAlignment = 1;
            }
            else if (owner.footerTextAlignment === "right") {
                headerView.textLabel.textAlignment = 2;
            }
            else if (owner.footerTextAlignment === "left") {
                headerView.textLabel.textAlignment = 0;
            }
            else {
                headerView.textLabel.textAlignment = 4;
            }
            if (owner.footerTextBold) {
                headerView.textLabel.font = UIFont.systemFontOfSizeWeight(UIFont.systemFontSize, UIFontWeightHeavy);
            }
        }
    };
    ;
    UITableViewDelegateImpl.prototype.tableViewWillDisplayCellForRowAtIndexPath = function (tableView, cell, indexPath) { };
    UITableViewDelegateImpl.prototype.tableViewViewForHeaderInSection = function (tableView, section) {
        var owner = this._owner.get();
        var tapGesture = UITapGestureRecognizer.alloc().initWithTargetAction(AccordionHeaderTap.initWithOwner(this._owner), "tap");
        var view = !types.isNullOrUndefined(owner.headerTemplate) ? builder_1.parse(owner.headerTemplate, this) : null;
        var _args = notifyForHeaderOrFooterAtIndex(owner, view ? view._nativeView : null, view, exports.HEADERLOADING, section);
        view = view || _args.view;
        if (view) {
            var data = owner._getParentData(section);
            if (!types.isNullOrUndefined(data)) {
                view.bindingContext = observable_1.fromObject(data);
            }
            if (!view.parent) {
                owner._addView(view);
            }
            var rowHeight = owner._effectiveRowHeight;
            var heightMeasureSpec = rowHeight >= 0 ? utils.layout.makeMeasureSpec(rowHeight, utils.layout.EXACTLY) : infinity;
            var measuredSize = view_1.View.measureChild(owner, view, owner.widthMeasureSpec, heightMeasureSpec);
            var height = measuredSize.measuredHeight;
            var width = measuredSize.measuredWidth;
            view_1.View.layoutChild(owner, view, 0, 0, width, height);
            view.ios.tag = section;
            view.ios.addGestureRecognizer(tapGesture);
            return view.nativeView;
        }
        var hv = UITableViewHeaderFooterView.new();
        hv.tag = section;
        hv.textLabel.text = owner._getParentData(section) ? owner._getParentData(section).headerText : "";
        hv.userInteractionEnabled = true;
        hv.autoresizingMask = 0;
        if (owner.headerColor) {
            hv.contentView.backgroundColor = new color_1.Color(owner.headerColor).ios;
        }
        tapGesture.delegate = this;
        hv.addGestureRecognizer(tapGesture);
        return hv;
    };
    UITableViewDelegateImpl.prototype.tableViewViewForFooterInSection = function (tableView, section) {
        var owner = this._owner.get();
        var view = !types.isNullOrUndefined(owner.footerTemplate) ? builder_1.parse(owner.footerTemplate, this) : null;
        var _args = notifyForHeaderOrFooterAtIndex(owner, view ? view._nativeView : null, view, exports.FOOTERLOADING, section);
        view = view || _args.view;
        if (view) {
            var data = owner._getParentData(section);
            view.bindingContext = observable_1.fromObject(data);
            var rowHeight = owner._effectiveRowHeight;
            var heightMeasureSpec = rowHeight >= 0 ? utils.layout.makeMeasureSpec(rowHeight, utils.layout.EXACTLY) : infinity;
            var measuredSize = view_1.View.measureChild(owner, view, owner.widthMeasureSpec, heightMeasureSpec);
            var height = measuredSize.measuredHeight;
            var width = measuredSize.measuredWidth;
            view_1.View.layoutChild(owner, view, 0, 0, width, height);
            return view.nativeView;
        }
        if (owner._getParentData(section) && owner._getParentData(section).footerText) {
            var hv = UITableViewHeaderFooterView.new();
            hv.tag = section;
            hv.textLabel.text = owner._getParentData(section) ? owner._getParentData(section).footerText : "";
            if (owner.footerColor) {
                hv.contentView.backgroundColor = new color_1.Color(owner.footerColor).ios;
            }
            return hv;
        }
        return null;
    };
    return UITableViewDelegateImpl;
}(NSObject));
UITableViewDelegateImpl.ObjCProtocols = [UITableViewDelegate];
exports.UITableViewDelegateImpl = UITableViewDelegateImpl;
var AccordionHeaderTap = (function (_super) {
    __extends(AccordionHeaderTap, _super);
    function AccordionHeaderTap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionHeaderTap.initWithOwner = function (owner) {
        var tap = new AccordionHeaderTap();
        tap._owner = owner;
        return tap;
    };
    AccordionHeaderTap.prototype.tap = function (args) {
        var owner = this._owner.get();
        var current = args.view.tag;
        var reloadSection = function (index) {
            var section = NSMutableIndexSet.alloc().initWithIndex(index);
            owner.ios.reloadSectionsWithRowAnimation(section, 100);
        };
        if (owner.allowMultiple) {
            if (!owner._expandedViews.get(current)) {
                owner.groupExpanded(current);
                owner._expandedViews.set(current, true);
                owner._indexSet.addIndex(current);
            }
            else {
                owner._expandedViews.set(current, false);
                owner._indexSet.removeIndex(current);
                owner.groupCollapsed(current);
            }
            reloadSection(current);
        }
        else {
            if (!owner._expandedViews.get(current)) {
                if (owner._indexSet.count > 0) {
                    var previous = owner._indexSet.firstIndex;
                    owner._expandedViews.set(previous, false);
                    owner.groupCollapsed(previous);
                    owner._indexSet.removeAllIndexes();
                    reloadSection(previous);
                    owner._selectedIndexUpdatedFromNative(current);
                    owner._expandedViews.set(current, true);
                    owner._indexSet.addIndex(current);
                    owner.groupExpanded(current);
                }
                else {
                    owner._selectedIndexUpdatedFromNative(current);
                    owner._expandedViews.set(current, true);
                    owner._indexSet.addIndex(current);
                    owner.groupExpanded(current);
                }
                reloadSection(current);
            }
            else {
                owner._selectedIndexUpdatedFromNative(current);
                owner._expandedViews.set(current, false);
                owner._indexSet.removeIndex(current);
                owner.groupCollapsed(current);
                reloadSection(current);
            }
        }
    };
    return AccordionHeaderTap;
}(NSObject));
AccordionHeaderTap.ObjCExposedMethods = {
    "tap": { returns: interop.types.void, params: [interop.types.id] }
};
//# sourceMappingURL=accordion.js.map