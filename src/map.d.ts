/// <reference path="./WeMap.d.ts" />
/// <reference path="./WeGeocoder.d.ts" />
/// <reference path="./WeFilterControl.d.ts" />

import {
  GeolocateControl,
  FullscreenControl,
  AttributionControl,
  Marker,
  MarkerOptions,
  PositionOptions,
  FitBoundsOptions,
  FullscreenControlOptions,
  LngLat,
  LngLatLike,
  LngLatBounds,
  Evented,
  Map,
  Point,
  MapboxOptions,
  MercatorCoordinate,
  NavigationControl,
  ScaleControl,
  Popup,
  PopupOptions,
} from "mapbox-gl";

import { WeMap, WeMapOptions } from "./WeMap";
import { WeGeocoder, WeGeocoderOptions } from "./WeGeocoder";
import { WeFilterControl, WeFilterOptions } from "./WeFilterControl";
import { WeDirections, WeDirectionsOptions } from "./WeDirections";

declare global {
  interface Window {
    wemapgl: {
      version: string;
      WeMap: new (options: WeMapOptions) => WeMap;
      WeGeocoder: new (options: WeGeocoderOptions) => WeGeocoder;
      Marker: new (options?: MarkerOptions, legacyOptions?: any) => Marker;
      WeFilterControl: new (options: WeFilterOptions) => WeFilterControl;
      WeDirections: new (options: WeDirectionsOptions) => WeDirections;
      WeGeolocateControl: new (options: {
        positionOptions?: PositionOptions;
        fitBoundsOptions?: FitBoundsOptions;
        trackUserLocation?: boolean;
        showAccuracyCircle?: boolean;
        showUserLocation?: boolean;
      }) => GeolocateControl;
      AttributionControl: new (options?: {
        compact?: boolean;
        customAttribution?: string | string[];
      }) => AttributionControl;
      FullscreenControl: new (options?: FullscreenControlOptions | null) => FullscreenControl;
      LngLat: new (lng: number, lat: number) => LngLat;
      LngLatBounds:
        | ((boundsLike?: [LngLatLike, LngLatLike] | [number, number, number, number]) => LngLatBounds)
        | ((sw: LngLatLike, ne: LngLatLike) => LngLatBounds);
      Evented: new () => Evented;
      Map: new (options?: MapboxOptions) => Map;
      MercatorCoordinate: new (x: number, y: number, z?: number) => MercatorCoordinate;
      NavigationControl: new (options?: {
        showCompass?: boolean;
        showZoom?: boolean;
        visualizePitch?: boolean;
      }) => NavigationControl;
      Point: new (x: number, y: number) => Point;
      ScaleControl: new (options?: { maxWidth?: number; unit?: string }) => ScaleControl;
      Popup: new (options?: PopupOptions) => Popup;
    };
  }
}
