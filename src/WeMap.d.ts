/// <reference types="mapbox-gl" />

import { LngLatLike, Map } from "mapbox-gl";

declare interface WeMapOptions {
  /**
   * @requires
   * @description API key
   */
  key: string;
  /**
   * @requires
   * @description HTML element that contains the map, or the id of that element
   */
  container: string | HTMLElement;
  /**
   * @description Style of the map, available values are "default", "bright", "dark"
   */
  style?: "default" | "bright" | "dark";
  /**
   * @description The coordinates of the center of the map when first initialized
   * @defaultValue `[105.8550736, 21.0283243]`
   */
  center?: LngLatLike;
  /**
   * @description Zoom factor of the map
   * https://docs.mapbox.com/help/glossary/zoom-level/
   * @defaultValue `10`
   */
  zoom?: number;
  /**
   * @description If `true`, reverse when click and open menu when right-click
   * @defaultValue `false`
   */
  reverse?: boolean;
  /**
   * @description If `true`, turn on traffic layer
   * @defaultValue `false`
   */
  traffic?: boolean;
  /**
   * @description If true, the URL query parameters will be updated while using the map
   * @defaultValue `true`
   */
  urlControlLayer?: boolean;
}

declare class WeMap extends Map {
  public constructor({
    style = "default",
    center = [105.8550736, 21.0283243],
    zoom = 10,
    reverse = false,
    traffic = false,
    urlControlLayer = true,
  }: WeMapOptions);
}
