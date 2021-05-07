interface WeMapOptions {
  key: string;
  container: string | HTMLElement;
  style?: "default" | "bright" | "dark";
  center?: [number, number];
  zoom?: number;
  reverse?: boolean;
  traffic?: boolean;
  urlControlLayer?: boolean;
}

declare class WeMap {
  public constructor({
    style = "default",
    center = [105.8550736, 21.0283243],
    zoom = 10,
    reverse = false,
    traffic = false,
    urlControlLayer = true,
  }: WeMapOptions);

  public addControl(control: any, position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"): WeMap;
  public removeControl(control: any): WeMap;
  public addImage(
    id: string,
    image:
      | HTMLImageElement
      | ImageBitmap
      | ImageData
      | { width: number; height: number; data: Uint8Array | Uint8ClampedArray }
  ): void;
  public loadImage(url: string, callback: (error: Error, image: any) => void): void;
}

interface WeGeocoderOptions {
  key: string;
  engine?: "default" | "pelias";
  suggesstion?: {
    min_char: number;
  };
  removeDuplicates?: boolean;
  flyTo?: boolean | "hybrid";
  url?: string;
  placeholder?: string;
  onSubmitOnly?: boolean;
  customAttribution?: string;
  params?: {
    [key: string]: any;
  };
  sources?: WeGeocoderSource | WeGeocoderSource[];
  marker?: boolean | Object;
  wof?: boolean | Object;
}

type WeGeocoderSource = "oa" | "osm" | "wof" | "gn";

declare class WeGeocoder {
  public constructor(options: WeGeocoderOptions);
}

declare interface Window {
  wemapgl: {
    WeMap: new ({
      style = "default",
      center = [105.8550736, 21.0283243],
      zoom = 10,
      reverse = false,
      traffic = false,
      urlControlLayer = true,
    }: WeMapOptions) => WeMap;
    WeGeocoder: new(weGeocoderOptions: WeGeocoderOptions) => WeGeocoder;
  };
}
