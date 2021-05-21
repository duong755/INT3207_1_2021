import axios from "axios";

import { API_URL } from "../constants/api";

const rate = axios.create({
  baseURL: API_URL,
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  responseType: "json",
  url: "/rate",
});

export { rate };
