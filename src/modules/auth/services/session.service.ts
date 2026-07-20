export const SESSION_COOKIE_NAME = "opensuite.session";

const SESSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8;

// Holds the raw JWT returned by POST /api/user/v1/login. A primitive string
// is naturally referentially stable across reads (unlike a re-parsed JSON
// object), so useSyncExternalStore-based hooks can consume this directly.
export function getAuthToken(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${SESSION_COOKIE_NAME}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
}

// Intentionally NOT httpOnly — the app reads this cookie directly from
// client components instead of going through an API route.
export function setAuthToken(token: string) {
  const value = encodeURIComponent(token);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${SESSION_COOKIE_NAME}=${value}; path=/; max-age=${SESSION_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function clearAuthToken() {
  document.cookie = `${SESSION_COOKIE_NAME}=; path=/; max-age=0`;
}
