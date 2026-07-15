"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  clearSessionCookie,
  getSessionCookie,
  setSessionCookie,
  type Session,
} from "@/modules/auth/services/session.service";

const listeners = new Set<() => void>();

function emitSessionChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

export function useSession() {
  const session = useSyncExternalStore(
    subscribe,
    getSessionCookie,
    () => null,
  );

  const login = useCallback((nextSession: Session) => {
    setSessionCookie(nextSession);
    emitSessionChange();
  }, []);

  const logout = useCallback(() => {
    clearSessionCookie();
    emitSessionChange();
  }, []);

  return {
    session,
    isAuthenticated: session !== null,
    login,
    logout,
  };
}
