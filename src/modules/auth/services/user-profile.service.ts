export const USER_PROFILE_STORAGE_KEY = "opensuite.user";

export type UserProfile = {
  username: string;
  fullname: string;
  email: string;
  role: string;
};

// useSyncExternalStore requires getSnapshot to return a referentially
// stable value when nothing changed — re-parsing localStorage into a fresh
// object on every call would make React think the store changes on every
// render and loop forever (see session.service's earlier fix). Cache
// against the raw stored string instead.
let cachedRawValue: string | null = null;
let cachedProfile: UserProfile | null = null;

export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(USER_PROFILE_STORAGE_KEY);

  if (rawValue === cachedRawValue) {
    return cachedProfile;
  }

  cachedRawValue = rawValue;

  if (!rawValue) {
    cachedProfile = null;
    return cachedProfile;
  }

  try {
    cachedProfile = JSON.parse(rawValue) as UserProfile;
  } catch {
    cachedProfile = null;
  }

  return cachedProfile;
}

export function setUserProfile(profile: UserProfile) {
  window.localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export function clearUserProfile() {
  window.localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
}

export function getInitials(fullname: string): string {
  const initials = fullname
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "?";
}
