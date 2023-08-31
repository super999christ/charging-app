import axios from "axios";
import axiosRetry from "axios-retry";

export const setRequestHeader = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axiosRetry(axios, { retries: 0 });
axiosRetry(axios, {
  retries: 10,
  retryDelay: (retryCount) => {
    return retryCount * 2000;
  },
});
