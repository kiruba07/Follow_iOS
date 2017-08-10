"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mock_dataItems_1 = require("./mock-dataItems");
var DataItemService = (function () {
    function DataItemService() {
    }
    DataItemService.prototype.getDataItems = function () {
        return mock_dataItems_1.DATAITEMS;
    };
    return DataItemService;
}());
DataItemService = __decorate([
    core_1.Injectable()
], DataItemService);
exports.DataItemService = DataItemService;
