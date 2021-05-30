declare type PlaceResponse = {
  success: boolean;
  count: number;
  docs: PlaceDetail[];
};

declare type PlaceDetail = {
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
  product: string;
  product_price: number;
  prodct_image: string;
  product_category: string;
};

declare type PlaceDetailProps = {
  detail?: PlaceDetail;
  onDismiss: () => void;
};
