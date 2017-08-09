"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var view_2 = require("tns-core-modules/ui/core/view");
var types = require("utils/types");
var autoEffectiveRowHeight = -1;
var knownCollections;
(function (knownCollections) {
    knownCollections.items = "items";
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = "itemTemplate";
    knownTemplates.headerTemplate = "headerTemplate";
    knownTemplates.footerTemplate = "footerTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
var knownMultiTemplates;
(function (knownMultiTemplates) {
    knownMultiTemplates.itemTemplates = "itemTemplates";
})(knownMultiTemplates = exports.knownMultiTemplates || (exports.knownMultiTemplates = {}));
function onHeaderTemplateChanged(accordion, oldValue, newValue) {
    accordion.headerTemplateUpdated(oldValue, newValue);
}
function onItemTemplateChanged(accordion, oldValue, newValue) {
    accordion.templateUpdated(oldValue, newValue);
}
function onFooterTemplateChanged(accordion, oldValue, newValue) {
    accordion.footerTemplateUpdated(oldValue, newValue);
}
function onItemsChanged(accordion, oldValue, newValue) {
    accordion.updateNativeItems(oldValue, newValue);
}
function onSelectedIndexChanged(accordion, oldValue, newValue) {
    if (accordion && accordion.items && types.isNumber(newValue)) {
        accordion.updateNativeIndex(oldValue, newValue);
        accordion.notify({
            eventName: Accordion.selectedIndexChangedEvent,
            object: accordion,
            oldIndex: oldValue,
            newIndex: newValue
        });
    }
}
var Accordion = (function (_super) {
    __extends(Accordion, _super);
    function Accordion() {
        var _this = _super.call(this) || this;
        _this._effectiveRowHeight = autoEffectiveRowHeight;
        return _this;
    }
    Accordion.prototype._getParentData = function (parentIndex) {
        var items = this.items;
        return items.getItem ? items.getItem(parentIndex) : items[parentIndex];
    };
    Accordion.prototype._getChildData = function (parentIndex, childIndex) {
        var items = this.items;
        return items.getItem ? items.getItem(parentIndex)['items'][childIndex] : items[parentIndex]['items'][childIndex];
    };
    Object.defineProperty(Accordion.prototype, "headerTextBold", {
        get: function () {
            return this.style.headerTextBold;
        },
        set: function (value) {
            this.style.headerTextBold = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "headerHeight", {
        get: function () {
            return this.style.headerHeight;
        },
        set: function (value) {
            this.style.headerHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "headerTextColor", {
        get: function () {
            return this.style.headerTextColor;
        },
        set: function (value) {
            this.style.headerTextColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "headerColor", {
        get: function () {
            return this.style.headerColor;
        },
        set: function (value) {
            this.style.headerColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "headerTextAlignment", {
        get: function () {
            return this.style.headerTextAlignment;
        },
        set: function (value) {
            this.style.headerTextAlignment = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "headerTextSize", {
        get: function () {
            return this.style.headerTextSize;
        },
        set: function (value) {
            this.style.headerTextSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "footerTextBold", {
        get: function () {
            return this.style.footerTextBold;
        },
        set: function (value) {
            this.style.footerTextBold = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "footerHeight", {
        get: function () {
            return this.style.footerHeight;
        },
        set: function (value) {
            this.style.footerHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "footerTextColor", {
        get: function () {
            return this.style.footerTextColor;
        },
        set: function (value) {
            this.style.footerTextColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "footerColor", {
        get: function () {
            return this.style.footerColor;
        },
        set: function (value) {
            this.style.footerColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "footerTextAlignment", {
        get: function () {
            return this.style.footerTextAlignment;
        },
        set: function (value) {
            this.style.footerTextAlignment = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "footerTextSize", {
        get: function () {
            return this.style.footerTextSize;
        },
        set: function (value) {
            this.style.footerTextSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "selectedIndexes", {
        get: function () {
            return this._selectedIndexes;
        },
        set: function (indexes) {
            this._selectedIndexes = indexes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "allowMultiple", {
        get: function () {
            return this._allowMultiple;
        },
        set: function (value) {
            this._allowMultiple = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "separatorColor", {
        get: function () {
            return this.style.separatorColor;
        },
        set: function (value) {
            this.style.separatorColor = value;
        },
        enumerable: true,
        configurable: true
    });
    return Accordion;
}(view_1.View));
Accordion.selectedIndexChangedEvent = "selectedIndexChanged";
exports.Accordion = Accordion;
exports.footerTextSizeProperty = new view_1.CssProperty({
    name: 'footerTextSize',
    cssName: 'footer-text-size',
    valueConverter: function (v) { return parseInt(v); }
});
exports.footerTextSizeProperty.register(view_1.Style);
exports.footerTextAlignmentProperty = new view_1.CssProperty({
    name: 'footerTextAlignment',
    cssName: 'footer-text-align'
});
exports.footerTextAlignmentProperty.register(view_1.Style);
exports.footerColorProperty = new view_1.CssProperty({
    name: 'footerColor',
    cssName: 'footer-color'
});
exports.footerColorProperty.register(view_1.Style);
exports.footerTextColorProperty = new view_1.CssProperty({
    name: 'footerTextColor',
    cssName: 'footer-text-color'
});
exports.footerTextColorProperty.register(view_1.Style);
exports.footerHeightProperty = new view_1.CssProperty({
    name: 'footerHeight',
    cssName: 'footer-height',
    valueConverter: function (v) { return parseInt(v); }
});
exports.footerHeightProperty.register(view_1.Style);
exports.footerTextBoldProperty = new view_1.CssProperty({
    name: 'footerTextBold',
    cssName: 'footer-text-bold',
    valueConverter: function (v) { return Boolean(v); }
});
exports.footerTextBoldProperty.register(view_1.Style);
exports.separatorColorProperty = new view_1.CssProperty({
    name: 'separatorColor',
    cssName: 'separator-color',
    valueConverter: function (v) { return String(v); }
});
exports.separatorColorProperty.register(view_1.Style);
exports.headerTextSizeProperty = new view_1.CssProperty({
    name: 'headerTextSize',
    cssName: 'header-text-size',
    valueConverter: function (v) { return parseInt(v); }
});
exports.headerTextSizeProperty.register(view_1.Style);
exports.headerTextAlignmentProperty = new view_1.CssProperty({
    name: 'headerTextAlignment',
    cssName: 'header-text-align'
});
exports.headerTextAlignmentProperty.register(view_1.Style);
exports.headerColorProperty = new view_1.CssProperty({
    name: 'headerColor',
    cssName: 'header-color'
});
exports.headerColorProperty.register(view_1.Style);
exports.headerTextColorProperty = new view_1.CssProperty({
    name: 'headerTextColor',
    cssName: 'header-text-color'
});
exports.headerTextColorProperty.register(view_1.Style);
exports.headerHeightProperty = new view_1.CssProperty({
    name: 'headerHeight',
    cssName: 'header-height',
    valueConverter: function (v) { return parseInt(v); }
});
exports.headerHeightProperty.register(view_1.Style);
exports.headerTextBoldProperty = new view_1.CssProperty({
    name: 'headerTextBold',
    cssName: 'header-text-bold',
    valueConverter: function (v) { return Boolean(v); }
});
exports.headerTextBoldProperty.register(view_1.Style);
exports.headerTemplateProperty = new view_2.Property({
    name: "headerTemplate",
    affectsLayout: true,
    valueChanged: onHeaderTemplateChanged
});
exports.headerTemplateProperty.register(Accordion);
exports.itemTemplateProperty = new view_2.Property({
    name: "itemTemplate",
    affectsLayout: true,
    valueChanged: onItemTemplateChanged
});
exports.itemTemplateProperty.register(Accordion);
exports.footerTemplateProperty = new view_2.Property({
    name: "footerTemplate",
    affectsLayout: true,
    valueChanged: onFooterTemplateChanged
});
exports.footerTemplateProperty.register(Accordion);
exports.itemsProperty = new view_2.Property({
    name: "items",
    affectsLayout: true,
    valueChanged: onItemsChanged
});
exports.itemsProperty.register(Accordion);
exports.selectedIndexProperty = new view_2.CoercibleProperty({
    name: "selectedIndex",
    defaultValue: 0,
    valueChanged: onSelectedIndexChanged,
    coerceValue: function (target, value) {
        var max = target.items ? target.items.length - 1 : 0;
        value = Math.min(value, max);
        value = Math.max(value, 0);
        return value;
    },
    valueConverter: function (v) { return parseInt(v); }
});
exports.selectedIndexProperty.register(Accordion);
//# sourceMappingURL=accordion.common.js.map