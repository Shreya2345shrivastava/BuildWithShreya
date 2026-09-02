export const logger = {
  error: (error: unknown, context?: Record<string, unknown>) => {
    // In a real app, this would send to Sentry/Datadog
    console.error(`[PRODUCTION_ERROR_TRACKING] ${new Date().toISOString()}`, error, context || "");
  },
  info: (msg: string, context?: Record<string, unknown>) => {
    console.info(`[PRODUCTION_INFO] ${new Date().toISOString()} ${msg}`, context || "");
  },
  warn: (msg: string, context?: Record<string, unknown>) => {
    console.warn(`[PRODUCTION_WARN] ${new Date().toISOString()} ${msg}`, context || "");
  }
};
