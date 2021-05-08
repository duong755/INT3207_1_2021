/// <reference path="./WeMap.d.ts" />
/// <reference path="./WeGeocoder.d.ts" />
/// <reference path="./WeFilterControl.d.ts" />

import { WeMap, WeMapOptions } from "./WeMap";
import { WeGeocoder, WeGeocoderOptions } from "./WeGeocoder";

declare global {
  interface Window {
    wemapgl: {
      WeMap: new (weMapOptions: WeMapOptions) => WeMap;
      WeGeocoder: new (weGeocoderOptions: WeGeocoderOptions) => WeGeocoder;
    };
  }
}
