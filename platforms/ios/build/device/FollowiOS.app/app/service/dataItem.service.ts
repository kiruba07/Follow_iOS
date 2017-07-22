import { Injectable } from '@angular/core';
import { DATAITEMS } from "./mock-dataItems";

import { DataItem } from "./dataItem";

@Injectable()
export class DataItemService {
    

    getDataItems(): DataItem[] {
        return DATAITEMS;
    }
}