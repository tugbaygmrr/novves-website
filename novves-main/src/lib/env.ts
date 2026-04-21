/**
 * Type-safe environment variable access.
 * Throws at build/startup time if required vars are missing.
 */

function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  APP_URL: getEnvVar("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  NODE_ENV: getEnvVar("NODE_ENV", "development"),
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
} as const;
