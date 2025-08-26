export function getServerURL() {
  const fallback = "http://localhost:8000";

  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) {
    return process.env.IS_LOCAL === "true"
      ? fallback
      : process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`;
  }

  return fallback;
}
