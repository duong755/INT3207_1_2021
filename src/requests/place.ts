import axios from "axios";
import { Geolocation } from "@ionic-native/geolocation";

import { API_URL } from "../constants/api";

const placeRequest = async (q: string, maxDist: number | string) => {
  const {
    coords: { latitude, longitude },
  } = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
  return fetch(`${API_URL}/place?q=${q}&latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDist}`);
};

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

place.interceptors.response.use(undefined, (err) => {
  throw err;
});

export { place, placeRequest };
