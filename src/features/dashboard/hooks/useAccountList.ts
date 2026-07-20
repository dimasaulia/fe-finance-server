"use client";

import { useEffect, useState } from "react";
import { getAccountList } from "../services/account.service";
import type { AccountRecord } from "../types/account.type";

type AccountListState = {
  accounts: AccountRecord[];
  isLoading: boolean;
  error: string | null;
};

/** `refreshKey` lets callers force a refetch (e.g. after creating an account) by bumping it. */
export function useAccountList(refreshKey = 0) {
  const [state, setState] = useState<AccountListState>({
    accounts: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    getAccountList({ record: 4 })
      .then((accounts) => {
        if (!cancelled) {
          setState({ accounts, isLoading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            accounts: [],
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to load accounts",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return state;
}
