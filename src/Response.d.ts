declare type PlaceResponse = {
  success: boolean;
  count: number;
  docs: {
    location: {
      coordinates: [number, number];
      type: string;
    };
    rate: number;
    rate_times: number;
    _id: string;
    place_name: string;
    place_info_url: string;
    place_address: string;
    longitude: number;
    latitude: number;
    contact: string;
  }[];
};
