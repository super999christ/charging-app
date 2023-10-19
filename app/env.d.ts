/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVICE_LOGGER_URL: string;
  readonly VITE_SERVICE_API_AUTH_URL: string;
  readonly VITE_SERVICE_NOTIFICATION_URL: string;
  readonly VITE_SERVICE_USER_MANAGEMENT_URL: string;
  readonly VITE_SERVICE_EVENT_CHARGING_URL: string;
  readonly VITE_AWS_RUM_GUEST_ROLE_ARN: string;
  readonly VITE_AWS_RUM_IDENTITY_POOL_ID: string;
  readonly VITE_AWS_RUM_APPLICATION_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
