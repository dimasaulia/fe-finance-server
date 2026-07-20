"use client";

import { useEffect, useState } from "react";
import { getAccountDetail } from "@/features/dashboard/services/account.service";
import type { AccountRecord } from "@/features/dashboard/types/account.type";

type AccountDetailState = {
  account: AccountRecord | null;
  isLoading: boolean;
  error: string | null;
};

export function useAccountDetail(accountId: number) {
  const [state, setState] = useState<AccountDetailState>({
    account: null,
    isLoading: true,
    error: null,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    getAccountDetail(accountId)
      .then((account) => {
        if (!cancelled) {
          setState({ account, isLoading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            account: null,
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to load account",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [accountId, refreshKey]);

  return { ...state, refetch: () => setRefreshKey((key) => key + 1) };
}
