const Environment = {
  VITE_SERVICE_LOGGER_URL: String(import.meta.env.VITE_SERVICE_LOGGER_URL),
  VITE_SERVICE_API_AUTH_URL: String(import.meta.env.VITE_SERVICE_API_AUTH_URL),
  VITE_SERVICE_NOTIFICATION_URL: String(import.meta.env.VITE_SERVICE_NOTIFICATION_URL),
  VITE_SERVICE_USER_MANAGEMENT_URL: String(import.meta.env.VITE_SERVICE_USER_MANAGEMENT_URL),
  VITE_SERVICE_CHARGING_EVENT_URL: String(import.meta.env.VITE_SERVICE_CHARGING_EVENT_URL),
  VITE_SERVICE_PAYMENT_URL: String(import.meta.env.VITE_SERVICE_PAYMENT_URL),
  VITE_CHARGE_STATUS_INTERVAL: Number(import.meta.env.VITE_CHARGE_STATUS_INTERVAL),
};

export default Environment;