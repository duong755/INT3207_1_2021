import axios from "axios";

import { API_URL } from "../constants/api";

const rateRequest = (placeId: string, uniqueDeviceId: string, point: number) => {
  return fetch(`${API_URL}/rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      placeId: placeId,
      deviceId: uniqueDeviceId,
      rate: point,
    }),
  });
};

const rate = axios.create({
  baseURL: API_URL,
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  responseType: "json",
  url: "/rate",
  timeout: 5000,
});

export { rate, rateRequest };
