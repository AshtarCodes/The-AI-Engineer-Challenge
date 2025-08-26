export function getServerURL() {
  const fallback = "http://localhost:8000";
  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL ?? fallback;
  }

  return fallback;
}
