/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVICE_LOGGER_URL: string;
  readonly VITE_SERVICE_API_AUTH_URL: string;
  readonly VITE_SERVICE_NOTIFICATION_URL: string;
  readonly VITE_SERVICE_USER_MANAGEMENT_URL: string;
  readonly VITE_SERVICE_EVENT_CHARGING_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
