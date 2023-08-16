import axios from "axios";

import { setRequestHeader } from "../../utils";
import Environment from "@root/configs/env";

export const getAppToken = async () => {
  try {
    const url = `${
      Environment.VITE_SERVICE_API_AUTH_URL
    }/request-app-token`;
    const body = {
      appName: "charging",
    };
    const { data } = await axios.post(url, body);
    const { token } = data;
    setRequestHeader(token);
    localStorage.setItem("appToken", token);
    return true;
  } catch (err) {
    return false;
  }
};
