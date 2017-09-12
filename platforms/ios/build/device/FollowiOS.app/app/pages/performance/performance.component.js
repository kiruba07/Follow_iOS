"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PerformanceComponent = (function () {
    function PerformanceComponent() {
        this.selectedIndex = 1;
        this.items = [];
        for (var i = 0; i < 5; i++) {
            this.items.push("data item " + i);
        }
    }
    PerformanceComponent.prototype.onchange = function (args) {
        console.log("Drop Down selected index changed from " + args.oldIndex + " to " + args.newIndex);
    };
    PerformanceComponent.prototype.onopen = function () {
        console.log("Drop Down opened.");
    };
    PerformanceComponent.prototype.onclose = function () {
        console.log("Drop Down closed.");
    };
    return PerformanceComponent;
}());
PerformanceComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "pages/performance/performance.html",
        styleUrls: ["pages/performance/performance-common.css", "pages/performance/performance.css"]
    }),
    __metadata("design:paramtypes", [])
], PerformanceComponent);
exports.PerformanceComponent = PerformanceComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybWFuY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGVyZm9ybWFuY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBUzFDLElBQWEsb0JBQW9CO0lBSS9CO1FBSE8sa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFJckIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQztJQUNMLENBQUM7SUFFTSx1Q0FBUSxHQUFmLFVBQWdCLElBQW1DO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQXlDLElBQUksQ0FBQyxRQUFRLFlBQU8sSUFBSSxDQUFDLFFBQVUsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFTSxxQ0FBTSxHQUFiO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxzQ0FBTyxHQUFkO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFSCwyQkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2Qlksb0JBQW9CO0lBTGhDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELFNBQVMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLG1DQUFtQyxDQUFDO0tBQzdGLENBQUM7O0dBQ1csb0JBQW9CLENBdUJoQztBQXZCWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL3BlcmZvcm1hbmNlL3BlcmZvcm1hbmNlLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9wZXJmb3JtYW5jZS9wZXJmb3JtYW5jZS1jb21tb24uY3NzXCIsIFwicGFnZXMvcGVyZm9ybWFuY2UvcGVyZm9ybWFuY2UuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFBlcmZvcm1hbmNlQ29tcG9uZW50IHtcbiAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAxO1xuICBwdWJsaWMgaXRlbXM6IEFycmF5PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChcImRhdGEgaXRlbSBcIiArIGkpO1xuICAgICAgfVxuICB9XG5cbiAgcHVibGljIG9uY2hhbmdlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgZnJvbSAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH1gKTtcbiAgfVxuXG4gIHB1YmxpYyBvbm9wZW4oKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkRyb3AgRG93biBvcGVuZWQuXCIpO1xuICB9XG5cbiAgcHVibGljIG9uY2xvc2UoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkRyb3AgRG93biBjbG9zZWQuXCIpO1xuICB9XG4gIFxufVxuIl19