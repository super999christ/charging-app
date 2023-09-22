import { refreshToken } from "@root/helpers";
import { decodeToken, isExpiringIn5Minutes } from "@root/validations";
import axios from "axios";
import axiosRetry from "axios-retry";

export const setRequestHeader = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axiosRetry(axios);

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("appToken");

    if (!token) return config;

    const { userId, exp } = decodeToken(token);

    if (!isExpiringIn5Minutes(exp)) return config;

    const data = await refreshToken(userId)
      .then((res) => res.data)
      .catch((err) => {});

    if (!data) return config;

    localStorage.setItem("appToken", data.token);
    setRequestHeader(data.token);

    return config;
  },
  async (error) => Promise.reject(error)
);
