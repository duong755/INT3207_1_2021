/// <reference types="mapbox-gl" />

import { IControl } from "mapbox-gl";

declare interface WeFilterOptions {
  filters: {
    [category: string]: {
      text: string;
      "fa-icon": string;
      color: string;
      featureClasses: string[];
      layers: string[];
    };
  }[];
};

declare class WeFilterControl implements IControl {
  public constructor(filterOptions: FilterOptions);
}
