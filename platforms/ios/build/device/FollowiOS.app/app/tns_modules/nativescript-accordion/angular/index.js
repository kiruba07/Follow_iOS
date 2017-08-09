"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var layout_base_1 = require("ui/layouts/layout-base");
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var collection_facade_1 = require("nativescript-angular/collection-facade");
var lang_facade_1 = require("nativescript-angular/lang-facade");
var utils_1 = require("nativescript-angular/common/utils");
var NG_VIEW = "_ngViewRef";
var ITEMSLOADING = "itemsLoading";
var HEADERLOADING = "headerLoading";
var FOOTERLOADING = "footerLoading";
var STARTHEADERLOADING = "startHeaderLoading";
var STARTITEMLOADING = "startItemLoading";
var STARTFOOTERLOADING = "startFooterLoading";
;
function getSingleViewRecursive(nodes, nestLevel) {
    var actualNodes = nodes.filter(function (n) { return !!n && n.nodeName !== "#text"; });
    if (actualNodes.length === 0) {
        throw new Error("No suitable views found in list template! Nesting level: " + nestLevel);
    }
    else if (actualNodes.length > 1) {
        throw new Error("More than one view found in list template! Nesting level: " + nestLevel);
    }
    else {
        if (actualNodes[0]) {
            var parentLayout = actualNodes[0].parent;
            if (parentLayout instanceof layout_base_1.LayoutBase) {
                parentLayout.removeChild(actualNodes[0]);
            }
            return actualNodes[0];
        }
        else {
            return getSingleViewRecursive(actualNodes[0].children, nestLevel + 1);
        }
    }
}
function getItemViewRoot(viewRef, rootLocator) {
    if (rootLocator === void 0) { rootLocator = getSingleViewRecursive; }
    var rootView = rootLocator(viewRef.rootNodes, 0);
    rootView.on("unloaded", function () {
        viewRef.destroy();
    });
    return rootView;
}
exports.getItemViewRoot = getItemViewRoot;
element_registry_1.registerElement("Accordion", function () { return require("../").Accordion; });
var AccordionHeaderDirective = (function () {
    function AccordionHeaderDirective(owner, templateRef) {
        this.owner = owner;
        this.templateRef = templateRef;
        owner.headerTemplate = templateRef;
    }
    return AccordionHeaderDirective;
}());
AccordionHeaderDirective = __decorate([
    core_1.Directive({
        selector: "[accordionHeaderTemplate]"
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return AccordionComponent; }))),
    __metadata("design:paramtypes", [AccordionComponent,
        core_1.TemplateRef])
], AccordionHeaderDirective);
exports.AccordionHeaderDirective = AccordionHeaderDirective;
var AccordionItemDirective = (function () {
    function AccordionItemDirective(owner, templateRef) {
        this.owner = owner;
        this.templateRef = templateRef;
        owner.itemTemplate = templateRef;
    }
    return AccordionItemDirective;
}());
AccordionItemDirective = __decorate([
    core_1.Directive({
        selector: "[accordionItemTemplate]"
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return AccordionComponent; }))),
    __metadata("design:paramtypes", [AccordionComponent,
        core_1.TemplateRef])
], AccordionItemDirective);
exports.AccordionItemDirective = AccordionItemDirective;
var AccordionFooterDirective = (function () {
    function AccordionFooterDirective(owner, templateRef) {
        this.owner = owner;
        this.templateRef = templateRef;
        owner.footerTemplate = templateRef;
    }
    return AccordionFooterDirective;
}());
AccordionFooterDirective = __decorate([
    core_1.Directive({
        selector: "[accordionFooterTemplate]"
    }),
    __param(0, core_1.Inject(core_1.forwardRef(function () { return AccordionComponent; }))),
    __metadata("design:paramtypes", [AccordionComponent,
        core_1.TemplateRef])
], AccordionFooterDirective);
exports.AccordionFooterDirective = AccordionFooterDirective;
var AccordionComponent = (function () {
    function AccordionComponent(el, _iterableDiffers, _cdr, loader) {
        this._iterableDiffers = _iterableDiffers;
        this._cdr = _cdr;
        this.loader = loader;
        this.accordion = el.nativeElement;
        this.accordion.on(HEADERLOADING, this.headerLoading, this);
        this.accordion.on(ITEMSLOADING, this.itemsLoading, this);
        this.accordion.on(FOOTERLOADING, this.footerLoading, this);
    }
    Object.defineProperty(AccordionComponent.prototype, "nativeElement", {
        get: function () {
            return this.accordion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            this._items = value;
            var needDiffer = true;
            if (value instanceof observable_array_1.ObservableArray) {
                needDiffer = false;
            }
            if (needDiffer && !this._differ && collection_facade_1.isListLikeIterable(value)) {
                this._differ = this._iterableDiffers.find(this._items)
                    .create(this._cdr, function (_index, item) { return item; });
            }
            this.accordion.items = this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionComponent.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            this._selectedIndex = utils_1.convertToInt(value);
            if (this.viewInitialized) {
                this.accordion.selectedIndex = this._selectedIndex;
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionComponent.prototype.ngAfterViewInit = function () {
        this.viewInitialized = true;
        if (!lang_facade_1.isBlank(this._selectedIndex)) {
            this.accordion.selectedIndex = this._selectedIndex;
        }
    };
    AccordionComponent.prototype.headerLoading = function (args) {
        if (this.headerTemplate) {
            var data = this.accordion._getParentData(args.parentIndex);
            var viewRef = this.loader.createEmbeddedView(this.headerTemplate, new AccordionHeaderContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
            this.setupViewRefHeaderOrFooter(viewRef, data, args.parentIndex);
            this.detectChangesOnChild(viewRef, args.parentIndex);
        }
    };
    AccordionComponent.prototype.itemsLoading = function (args) {
        if (this.itemTemplate) {
            var data = observable_1.fromObject(this.accordion._getChildData(args.parentIndex, args.childIndex));
            var viewRef = this.loader.createEmbeddedView(this.itemTemplate, new AccordionItemContext(), args.childIndex);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
            this.setupViewRefItem(viewRef, data, args.parentIndex, args.childIndex);
            this.detectChangesOnChild(viewRef, args.parentIndex);
        }
    };
    AccordionComponent.prototype.footerLoading = function (args) {
        if (this.footerTemplate) {
            var data = this.accordion._getParentData(args.parentIndex);
            var viewRef = this.loader.createEmbeddedView(this.footerTemplate, new AccordionFooterContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
            this.setupViewRefHeaderOrFooter(viewRef, data, args.parentIndex);
            this.detectChangesOnChild(viewRef, args.parentIndex);
        }
    };
    AccordionComponent.prototype.setupViewRefHeaderOrFooter = function (viewRef, data, index) {
        if (lang_facade_1.isBlank(viewRef)) {
            return;
        }
        var context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.items = ((data && (typeof data.get === "function")) ? data.get("items") : data["items"]);
        context.index = index;
        context.even = (index % 2 === 0);
        context.odd = !context.even;
    };
    AccordionComponent.prototype.setupViewRefItem = function (viewRef, data, parentIndex, childIndex) {
        if (lang_facade_1.isBlank(viewRef)) {
            return;
        }
        var context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.index = childIndex;
        context.parentIndex = parentIndex;
        context.childIndex = childIndex;
        context.even = (childIndex % 2 === 0);
        context.odd = !context.even;
    };
    AccordionComponent.prototype.detectChangesOnChild = function (viewRef, index) {
        var childChangeDetector = viewRef;
        childChangeDetector.markForCheck();
        childChangeDetector.detectChanges();
    };
    AccordionComponent.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this._items);
            if (changes) {
                if (this.accordion) {
                    if (typeof this.accordion.refresh === "function") {
                        this.accordion.refresh();
                    }
                }
            }
        }
    };
    return AccordionComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AccordionComponent.prototype, "items", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Object])
], AccordionComponent.prototype, "selectedIndex", null);
AccordionComponent = __decorate([
    core_1.Component({
        selector: "Accordion",
        template: "",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.IterableDiffers,
        core_1.ChangeDetectorRef,
        core_1.ViewContainerRef])
], AccordionComponent);
exports.AccordionComponent = AccordionComponent;
var AccordionItemContext = (function () {
    function AccordionItemContext($implicit, item, parentIndex, childIndex, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.parentIndex = parentIndex;
        this.childIndex = childIndex;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
    return AccordionItemContext;
}());
exports.AccordionItemContext = AccordionItemContext;
var AccordionHeaderContext = (function () {
    function AccordionHeaderContext($implicit, item, items, parentindex, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.items = items;
        this.parentindex = parentindex;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
    return AccordionHeaderContext;
}());
exports.AccordionHeaderContext = AccordionHeaderContext;
var AccordionFooterContext = (function () {
    function AccordionFooterContext($implicit, item, items, parentindex, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.items = items;
        this.parentindex = parentindex;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
    return AccordionFooterContext;
}());
exports.AccordionFooterContext = AccordionFooterContext;
var AccordionModule = (function () {
    function AccordionModule() {
    }
    return AccordionModule;
}());
AccordionModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        declarations: [
            AccordionComponent,
            AccordionHeaderDirective,
            AccordionItemDirective,
            AccordionFooterDirective
        ],
        exports: [
            AccordionComponent,
            AccordionHeaderDirective,
            AccordionItemDirective,
            AccordionFooterDirective
        ]
    })
], AccordionModule);
exports.AccordionModule = AccordionModule;
//# sourceMappingURL=index.js.map