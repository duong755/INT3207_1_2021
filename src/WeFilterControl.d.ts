/// <reference types="mapbox-gl" />

type WeFilterOptions = {
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

declare class WeFilterControl {
  public constructor(filterOptions: FilterOptions);
}
