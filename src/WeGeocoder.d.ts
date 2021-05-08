/// <reference types="mapbox-gl" />

import { Marker } from "mapbox-gl";

declare interface WeGeocoderOptions {
  /**
   * @description API key
   * @requires
   */
  key: string;
  /**
   * @description Search engine. Available values: `"default"`, `"pelias"`
   * @defaultValue `default`
   */
  engine?: "default" | "pelias";
  suggesstion?: {
    /**
     * @description Minimum characters to begin to auto-complete
     */
    min_char: number;
  };
  /**
   * @description Remove duplicated places, based on coordinates
   */
  removeDuplicates?: boolean;
  /**
   * @description Fly-to or Jump-to places after selecting places
   */
  flyTo?: boolean | "hybrid";
  /**
   * @description Server URL of Geocoder
   */
  url?: string;
  /**
   * @description Placeholder of input (I don't know which input)
   */
  placeholder?: string;
  /**
   * @description Send request only on press Enter
   */
  onSubmitOnly?: boolean;
  customAttribution?: string;
  /**
   * @description Optional parameters for request
   */
  params?: {
    [key: string]: any;
  };
  /**
   * @description Specific sources to send request
   */
  sources?: WeGeocoderSource | WeGeocoderSource[];
  /**
   * @description Add marker to show results
   */
  marker?: boolean | Marker;
  wof?: boolean | Object;
}

declare type WeGeocoderSource = "oa" | "osm" | "wof" | "gn";

declare class WeGeocoder {
  public constructor(options: WeGeocoderOptions);
}
