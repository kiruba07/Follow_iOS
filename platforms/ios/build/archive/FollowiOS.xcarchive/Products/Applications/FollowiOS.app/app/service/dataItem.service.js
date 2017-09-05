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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YUl0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFJdGVtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsbURBQTZDO0FBSzdDLElBQWEsZUFBZTtJQUE1QjtJQU1BLENBQUM7SUFIRyxzQ0FBWSxHQUFaO1FBQ0ksTUFBTSxDQUFDLDBCQUFTLENBQUM7SUFDckIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSxlQUFlO0lBRDNCLGlCQUFVLEVBQUU7R0FDQSxlQUFlLENBTTNCO0FBTlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEQVRBSVRFTVMgfSBmcm9tIFwiLi9tb2NrLWRhdGFJdGVtc1wiO1xuXG5pbXBvcnQgeyBEYXRhSXRlbSB9IGZyb20gXCIuL2RhdGFJdGVtXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhSXRlbVNlcnZpY2Uge1xuICAgIFxuXG4gICAgZ2V0RGF0YUl0ZW1zKCk6IERhdGFJdGVtW10ge1xuICAgICAgICByZXR1cm4gREFUQUlURU1TO1xuICAgIH1cbn0iXX0=