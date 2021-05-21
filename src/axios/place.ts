import axios from "axios";

import { API_URL } from "../constants/api";

const place = axios.create({
  baseURL: API_URL,
  method: "GET",
  responseType: "json",
  url: "/place",
});

export { place };
