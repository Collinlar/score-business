/**
 * Shared checks for .env tutorial strings so integrations fail loudly in development.
 */

export function isTutorialEnvValue(value: string | undefined): boolean {
  if (value === undefined) return true;
  const v = value.trim();
  if (!v) return true;
  const lower = v.toLowerCase();
  return lower === "placeholder" || lower.startsWith("your_");
}

/** Errors thrown when required env vars are missing or still template values */
export function isEnvConfigurationError(err: unknown): err is Error {
  if (!(err instanceof Error)) return false;
  const m = err.message;
  return (
    m.includes("NEXT_PUBLIC_SUPABASE_URL") ||
    m.includes("NEXT_PUBLIC_SUPABASE_ANON_KEY") ||
    m.includes("SUPABASE_SERVICE_ROLE_KEY") ||
    m.includes("GROQ_API_KEY")
  );
}
