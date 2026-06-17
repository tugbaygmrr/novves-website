export function hasDatabaseUrl(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function isDatabaseUnavailable(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const name = "name" in error ? String((error as { name?: string }).name) : "";
  const code = "code" in error ? String((error as { code?: string }).code) : "";
  const message = "message" in error ? String((error as { message?: string }).message) : "";
  return (
    name === "PrismaClientInitializationError" ||
    code === "P1001" ||
    code === "P1017" ||
    message.includes("Can't reach database server") ||
    message.includes("Environment variable not found: DATABASE_URL")
  );
}
