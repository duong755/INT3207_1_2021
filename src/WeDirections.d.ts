/// <reference types="mapbox-gl" />
/// <reference types="geojson" />

import { Control, IControl, Point } from "mapbox-gl";
import { Feature, Position } from "geojson";

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

interface ProfileData {
  profile: string;
}

interface LoadingData {
  type: "origin" | "destination";
}

interface ClearData {
  type: "origin" | "destination";
}

interface OriginData {
  feature: Feature;
}

interface DestinationData {
  feature: Feature;
}

interface ErrorData {
  error: string;
}

type RouteDetail = {
  distance: number;
  duration: number;
  geometry: string;
  legs: {
    steps: {
      intersections: any[];
      driving_side: string;
      duration: number;
      geometry: Position[];
      distance: number;
      maneuver: {
        type: string;
        location: Position;
        instruction: string;
        modifier?: string;
      };
      mode: string;
      name: string;
    }[] & { distance: number; duration: number; summary: string; weight: number };
  }[];
  weight: number;
  weight_name: string;
};

interface RouteData {
  route: [RouteDetail];
}

declare class WeDirections extends Control implements IControl {
  /**
   * @description I only define type for functions that I need
   */
  actions: {
    reverse(): void;
    clearOrigin(): void;
    clearDestination(): void;
    setOrigin(address: string): void;
    setDestination(address: string): void;
    setOriginFromCoordinates(coords: Position): void;
    setDestinationFromCoordinates(coords: Position): void;
    queryOrigin(text: string): { type: "ORIGIN_QUERY"; query: string };
    queryDestination(text: string): { type: "DESTINATION_QUERY"; query: string };
    queryOriginCoordinates(coords: Position): { type: "ORIGIN_FROM_COORDINATES"; coordinates: Position };
    queryDestinationCoordinates(coords: Position): { type: "DESTINATION_FROM_COORDINATES"; coordinates: Position };
  };
  container: HTMLElement;

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

  on(event: "clear", callback: (this: WeDirections, clearData?: ClearData) => void): WeDirections;
  on(event: "loading", callback: (this: WeDirections, loadingData?: LoadingData) => void): WeDirections;
  on(event: "profile", callback: (this: WeDirections, profileData?: ProfileData) => void): WeDirections;
  on(event: "origin", callback: (this: WeDirections, originData?: OriginData) => void): WeDirections;
  on(event: "destination", callback: (this: WeDirections, destinationData?: DestinationData) => void): WeDirections;
  on(event: "route", callback: (this: WeDirections, routeData?: RouteData) => void): WeDirections;
  on(event: "error", callback: (this: WeDirections, errorData?: ErrorData) => void): WeDirections;

  onRemove(map: Map): Control;
}
