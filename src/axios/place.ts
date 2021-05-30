import axios from "axios";
import { Geolocation } from "@ionic-native/geolocation";

import { API_URL } from "../constants/api";

const place = axios.create({
  baseURL: API_URL,
  method: "GET",
  responseType: "json",
  url: "/place",
  timeout: 5000,
});

place.interceptors.request.use(async (config) => {
  const {
    coords: { latitude, longitude },
  } = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
  config.params["latitude"] = latitude;
  config.params["longitude"] = longitude;
  return config;
}, undefined);

export { place };
