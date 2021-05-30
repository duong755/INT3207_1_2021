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

export { rateRequest };
