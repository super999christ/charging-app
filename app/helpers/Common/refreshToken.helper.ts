import axios from "axios";
import axiosRetry from "axios-retry";

import Environment from "@root/configs/env";

const url = `${Environment.VITE_SERVICE_API_AUTH_URL}/request-user-token`;

const client = axios.create();

axiosRetry(client);

export async function refreshToken(userId: string) {
  return client.post<{ token: string }>(
    url,
    { appName: "charging", userId },
    {
      "axios-retry": {
        retries: 5,
        retryCondition: (err) => true,
        retryDelay: (retryCount) => retryCount * 2000,
      },
    }
  );
}
