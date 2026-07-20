"use client";

import { useCallback, useSyncExternalStore } from "react";
import { login as loginRequest, logout as logoutRequest } from "@/modules/auth/services/auth.service";
import { getAuthToken } from "@/modules/auth/services/session.service";
import { getUserProfile } from "@/modules/auth/services/user-profile.service";

const listeners = new Set<() => void>();

function emitSessionChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

export function useSession() {
  const token = useSyncExternalStore(subscribe, getAuthToken, () => null);
  const profile = useSyncExternalStore(subscribe, getUserProfile, () => null);

  const login = useCallback(async (usernameOrEmail: string, password: string) => {
    const nextProfile = await loginRequest(usernameOrEmail, password);
    emitSessionChange();

    return nextProfile;
  }, []);

  const logout = useCallback(() => {
    logoutRequest();
    emitSessionChange();
  }, []);

  return {
    token,
    profile,
    isAuthenticated: token !== null,
    login,
    logout,
  };
}
