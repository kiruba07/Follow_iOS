Object.defineProperty(exports, "__esModule", { value: true });
var trackBallModule = require("./chart-track-ball-common");
var chart_public_enum_1 = require("../../misc/chart-public-enum");
var Trackball = (function (_super) {
    __extends(Trackball, _super);
    function Trackball() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Trackball.prototype, "android", {
        //private _android: com.telerik.widget.chart.visualization.behaviors.ChartTrackBallBehavior;
        get: function () {
            return this._android;
        },
        set: function (value) {
            this._android = value;
            this.updateTrackballSnapMode(this.snapMode);
            this.updateShowIntrsectionPoints(this.showIntersectionPoints);
        },
        enumerable: true,
        configurable: true
    });
    Trackball.prototype.onSnapModeChanged = function (oldValue, newValue) {
        if (!this._android) {
            return;
        }
        this.updateTrackballSnapMode(newValue);
    };
    Trackball.prototype.onShowIntersectionPointsChanged = function (oldValue, newValue) {
        if (!this._android) {
            return;
        }
        this.updateShowIntrsectionPoints(newValue);
    };
    Trackball.prototype.updateShowIntrsectionPoints = function (value) {
        this._android.setShowIntersectionPoints(value);
    };
    Trackball.prototype.updateTrackballSnapMode = function (snapMode) {
        if (snapMode.toLowerCase() === chart_public_enum_1.TrackballSnapMode.ClosestPoint.toLowerCase()) {
            this.android.setSnapMode(com.telerik.widget.chart.visualization.behaviors.TrackBallSnapMode.CLOSEST_POINT);
        }
        else if (snapMode.toLowerCase() === chart_public_enum_1.TrackballSnapMode.AllClosestPoints.toLowerCase()) {
            this.android.setSnapMode(com.telerik.widget.chart.visualization.behaviors.TrackBallSnapMode.ALL_CLOSE_POINTS);
        }
        else {
            console.log("WARNING: Unsupported trackball snap mode set: " + snapMode);
        }
    };
    return Trackball;
}(trackBallModule.Trackball));
exports.Trackball = Trackball;
