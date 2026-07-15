"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { HomeSheet, TxType } from "../types/home.type";

const VIEW_PARAM = "view";
const TYPE_PARAM = "type";
const DEFAULT_TX_TYPE: TxType = "expense";

type SheetKey = Exclude<HomeSheet, null>;

const viewToSheet: Record<string, HomeSheet> = {
  profile: "profile",
  "chose-add": "menu",
  "add-transaction": "transaction",
};

const sheetToView: Record<SheetKey, string> = {
  profile: "profile",
  menu: "chose-add",
  transaction: "add-transaction",
};

function isTxType(value: string | null): value is TxType {
  return (
    value === "expense" ||
    value === "income" ||
    value === "transfer" ||
    value === "receivable"
  );
}

/**
 * Keeps which bottom sheet is open (and, for the transaction sheet, which
 * type tab) in the URL — `?view=profile`, `?view=chose-add`,
 * `?view=add-transaction&type=income` — so the state survives a refresh or a
 * shared link.
 */
export function useHomeSheets() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSheet = viewToSheet[searchParams.get(VIEW_PARAM) ?? ""] ?? null;
  const txType = isTxType(searchParams.get(TYPE_PARAM))
    ? (searchParams.get(TYPE_PARAM) as TxType)
    : DEFAULT_TX_TYPE;

  const navigate = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname],
  );

  const openSheet = useCallback(
    (sheet: SheetKey, extra?: Record<string, string>) => {
      const params = new URLSearchParams();
      params.set(VIEW_PARAM, sheetToView[sheet]);
      for (const [key, value] of Object.entries(extra ?? {})) {
        params.set(key, value);
      }
      navigate(params);
    },
    [navigate],
  );

  const close = useCallback(() => {
    navigate(new URLSearchParams());
  }, [navigate]);

  const setTxType = useCallback(
    (nextType: TxType) => {
      openSheet("transaction", { type: nextType });
    },
    [openSheet],
  );

  return {
    activeSheet,
    txType,
    setTxType,
    openMenu: () => openSheet("menu"),
    openProfile: () => openSheet("profile"),
    openTransaction: (initialType: TxType = DEFAULT_TX_TYPE) =>
      openSheet("transaction", { type: initialType }),
    close,
  };
}
