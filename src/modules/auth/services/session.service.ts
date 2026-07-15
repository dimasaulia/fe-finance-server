export const SESSION_COOKIE_NAME = "opensuite.session";

const SESSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8;

// Demo-only credentials. Swap this check for a real Auth.js/Keycloak call
// once an identity provider is wired in — see AGENTS.md "Auth and
// Authorization".
const DEMO_CREDENTIALS = {
  username: "dimas",
  password: "123456",
};

export type Session = {
  username: string;
};

export function validateCredentials(
  username: string,
  password: string,
): boolean {
  return (
    username === DEMO_CREDENTIALS.username &&
    password === DEMO_CREDENTIALS.password
  );
}

// useSyncExternalStore requires getSnapshot to return a referentially
// stable value when nothing changed — re-parsing the cookie into a fresh
// object on every call would make React think the store changes on every
// render and loop forever. Cache against the raw cookie string instead.
let cachedRawValue: string | null = null;
let cachedSession: Session | null = null;

export function getSessionCookie(): Session | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${SESSION_COOKIE_NAME}=([^;]*)`),
  );
  const rawValue = match ? match[1] : null;

  if (rawValue === cachedRawValue) {
    return cachedSession;
  }

  cachedRawValue = rawValue;

  if (!rawValue) {
    cachedSession = null;
    return cachedSession;
  }

  try {
    cachedSession = JSON.parse(decodeURIComponent(rawValue)) as Session;
  } catch {
    cachedSession = null;
  }

  return cachedSession;
}

// Intentionally NOT httpOnly — the app reads this cookie directly from
// client components (see usePreferences-style hooks) instead of going
// through an API route.
export function setSessionCookie(session: Session) {
  const value = encodeURIComponent(JSON.stringify(session));
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${SESSION_COOKIE_NAME}=${value}; path=/; max-age=${SESSION_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function clearSessionCookie() {
  document.cookie = `${SESSION_COOKIE_NAME}=; path=/; max-age=0`;
}
