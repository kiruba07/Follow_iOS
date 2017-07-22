Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var chart_public_enum_1 = require("../../misc/chart-public-enum");
var RadLegendView = (function (_super) {
    __extends(RadLegendView, _super);
    function RadLegendView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadLegendView.prototype.onPositionPropertyChanged = function (oldValue, newValue) {
        this.onPositionChanged(oldValue, newValue);
    };
    RadLegendView.prototype.onPositionChanged = function (oldValue, newValue) {
    };
    RadLegendView.prototype.onOffsetOriginPropertyChanged = function (oldValue, newValue) {
        this.onOffsetOriginChanged(oldValue, newValue);
    };
    RadLegendView.prototype.onOffsetOriginChanged = function (oldValue, newValue) {
    };
    RadLegendView.prototype.onHorizontalOffsetPropertyChanged = function (oldValue, newValue) {
        this.onHorizontalOffsetChanged(oldValue, newValue);
    };
    RadLegendView.prototype.onHorizontalOffsetChanged = function (oldValue, newValue) {
    };
    RadLegendView.prototype.onVerticalOffsetPropertyChanged = function (oldValue, newValue) {
        this.onVerticalOffsetChanged(oldValue, newValue);
    };
    RadLegendView.prototype.onVerticalOffsetChanged = function (oldValue, newValue) {
    };
    RadLegendView.prototype.onTitlePropertyChanged = function (oldValue, newValue) {
        this.onTitleChanged(oldValue, newValue);
    };
    RadLegendView.prototype.onTitleChanged = function (oldValue, newValue) {
    };
    RadLegendView.prototype.updateLegendView = function (chartView) {
    };
    return RadLegendView;
}(view_1.View));
RadLegendView.positionProperty = new view_1.Property({
    name: "position",
    defaultValue: chart_public_enum_1.ChartLegendPosition.Bottom,
    valueChanged: function (target, oldValue, newValue) {
        target.onPositionPropertyChanged(oldValue, newValue);
    },
});
RadLegendView.offsetOriginProperty = new view_1.Property({
    name: "offsetOrigin",
    defaultValue: chart_public_enum_1.ChartLegendOffsetOrigin.TopLeft,
    valueChanged: function (target, oldValue, newValue) {
        target.onOffsetOriginPropertyChanged(oldValue, newValue);
    },
});
RadLegendView.horizontalOffsetProperty = new view_1.Property({
    name: "horizontalOffset",
    defaultValue: 0,
    valueConverter: parseFloat,
    valueChanged: function (target, oldValue, newValue) {
        target.onHorizontalOffsetPropertyChanged(oldValue, newValue);
    },
});
RadLegendView.verticalOffsetProperty = new view_1.Property({
    name: "verticalOffset",
    defaultValue: 0,
    valueConverter: parseFloat,
    valueChanged: function (target, oldValue, newValue) {
        target.onVerticalOffsetPropertyChanged(oldValue, newValue);
    },
});
RadLegendView.titleProperty = new view_1.Property({
    name: "title",
    defaultValue: undefined,
    valueChanged: function (target, oldValue, newValue) {
        target.onTitlePropertyChanged(oldValue, newValue);
    },
});
exports.RadLegendView = RadLegendView;
RadLegendView.positionProperty.register(RadLegendView);
RadLegendView.offsetOriginProperty.register(RadLegendView);
RadLegendView.horizontalOffsetProperty.register(RadLegendView);
RadLegendView.verticalOffsetProperty.register(RadLegendView);
RadLegendView.titleProperty.register(RadLegendView);
