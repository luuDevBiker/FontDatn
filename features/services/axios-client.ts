import axios from "axios";
import { store } from "@/app/store";
const https = require("https");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const storage =
  typeof window !== "undefined" ? localStorage.getItem("u") : undefined;
let AccessToken = "";
let RefreshToken = "";
if (storage) {
  let loginInfo = JSON.parse(storage);
  if (loginInfo) {
    AccessToken = loginInfo.AccessToken;
    RefreshToken = loginInfo.RefreshToken;
  }
}

const axiosClient = axios.create({
  baseURL: "https://localhost:44321",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    "Content-Type": "application/json",
    Authorization: `Bearer ${storage ? JSON.parse(storage).AccessToken : null}`,
  },  
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

const axiosClient2 = axios.create({
  baseURL: "https://localhost:44321",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      storage ? JSON.parse(storage).AccessToken : null
    }`,
  },
});
axiosClient2.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosClient2.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export { axiosClient, axiosClient2 };
