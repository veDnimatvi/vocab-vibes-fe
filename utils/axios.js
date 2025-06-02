import axios from "axios";
import { removeCookie, getCookie, KEY } from "./cookie";

const RESPONSE_CODE = {
  NOT_SIGNED_IN: 401,
};

const service = (config) => {
  return new Promise((resolve, reject) => {
    const _config = {
      ...config,
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: {
        ...(config.headers || {
          "Content-Type": "application/json",
        }),
        Authorization: getCookie(KEY.TOKEN)
          ? `Bearer ${getCookie(KEY.TOKEN)}`
          : undefined,
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios(_config)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        if (
          error?.response?.status === RESPONSE_CODE.NOT_SIGNED_IN &&
          window.location.pathname !== "/"
        ) {
          removeCookie(KEY.TOKEN);
          removeCookie(KEY.NAME);
          removeCookie(KEY.PICTURE);
          window.location.href = "/";
        }
        return reject(error);
      });
  });
};

export default service;
