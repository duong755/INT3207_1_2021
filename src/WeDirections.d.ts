/// <reference types="mapbox-gl" />

import { Control, IControl, Point } from "mapbox-gl";

interface WeDirectionsOptions {
  /**
   * @description API key
   * @requires
   */
  key: string;
  engine?: "default" | "osrm" | "graphhopper" | "mapbox";
  styles?: any[];
  interactive?: boolean;
  mode?: "traffic" | "driving" | "walking" | "cycling";
  alternatives?: boolean;
  congestion?: boolean;
  unit?: "imperial" | "metric";
  compile?: Function | null;
  geocoder?: "default" | "pelias";
  controls?: {
    inputs?: boolean;
    instructions?: boolean;
    profileSwitcher?: boolean;
  };
  zoom?: number;
  placeholderOrigin?: string;
  placeholderDestination?: string;
  flyTo?: boolean;
  exclude?: "ferry" | "toll" | "motorway" | null;
}

declare class WeDirections extends Control implements IControl {
  constructor(options: WeDirectionsOptions);

  interactive(state: boolean): WeDirections;

  getOrigin(): Object;

  setOrigin(query: number[] | string): WeDirections;

  getDestination(): Object;

  setDestination(query: number[] | string): WeDirections;

  reverse(): WeDirections;

  addWayPoint(index: number, waypoint: number[] | Point): WeDirections;

  setWayPoint(index: number, waypoint: number[] | Point): WeDirections;

  removeWayPoint(index: number): WeDirections;

  getWayPoints(): (number[] | Point)[];

  removeRoutes(): WeDirections;

  on(
    event: "clear" | "loading" | "profile" | "origin" | "destination" | "route" | "error",
    callback: Function
  ): WeDirections;

  onAdd(map: Map): HTMLElement;

  onRemove(map: Map): void;
}
