"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getTransactionList } from "@/features/dashboard/services/transaction.service";
import type { TransactionRecord } from "@/features/dashboard/types/transaction.type";

const PAGE_SIZE = 10;

type TransactionListFilters = {
  startDate?: string;
  endDate?: string;
};

type TransactionListState = {
  transactions: TransactionRecord[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
};

/** `refreshKey` lets callers force a refetch (e.g. after adding a sub-transaction) by bumping it. */
export function useTransactionList(
  accountId: number,
  filters: TransactionListFilters = {},
  refreshKey = 0,
) {
  const { startDate, endDate } = filters;
  const [state, setState] = useState<TransactionListState>({
    transactions: [],
    page: 1,
    hasMore: true,
    isLoading: true,
    isLoadingMore: false,
    error: null,
  });
  const isFetchingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    isFetchingRef.current = true;

    getTransactionList({
      idAccount: accountId,
      page: 1,
      record: PAGE_SIZE,
      startDate,
      endDate,
    })
      .then((transactions) => {
        if (!cancelled) {
          setState({
            transactions,
            page: 1,
            hasMore: transactions.length === PAGE_SIZE,
            isLoading: false,
            isLoadingMore: false,
            error: null,
          });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            transactions: [],
            page: 1,
            hasMore: false,
            isLoading: false,
            isLoadingMore: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to load transactions",
          });
        }
      })
      .finally(() => {
        isFetchingRef.current = false;
      });

    return () => {
      cancelled = true;
    };
  }, [accountId, startDate, endDate, refreshKey]);

  const loadMore = useCallback(() => {
    if (isFetchingRef.current || !state.hasMore) {
      return;
    }

    isFetchingRef.current = true;
    const nextPage = state.page + 1;
    setState((prev) => ({ ...prev, isLoadingMore: true }));

    getTransactionList({
      idAccount: accountId,
      page: nextPage,
      record: PAGE_SIZE,
      startDate,
      endDate,
    })
      .then((transactions) => {
        setState((prev) => ({
          ...prev,
          transactions: [...prev.transactions, ...transactions],
          page: nextPage,
          hasMore: transactions.length === PAGE_SIZE,
          isLoadingMore: false,
        }));
      })
      .catch(() => {
        setState((prev) => ({ ...prev, isLoadingMore: false }));
      })
      .finally(() => {
        isFetchingRef.current = false;
      });
  }, [accountId, startDate, endDate, state.hasMore, state.page]);

  return { ...state, loadMore };
}
