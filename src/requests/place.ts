import { Geolocation } from "@ionic-native/geolocation";

import { API_URL } from "../constants/api";

const placeRequest = async (q: string, maxDist: number | string) => {
  const {
    coords: { latitude, longitude },
  } = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
  return fetch(`${API_URL}/place?q=${q}&latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDist}`);
};

export { placeRequest };
