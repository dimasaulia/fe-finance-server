"use client";

import { useEffect, useRef, useState } from "react";
import { usePreferences } from "@/modules/preferences";
import { CalendarIcon, CloseIcon } from "@/shared/components/icons";
import { getDefaultDateRange } from "@/shared/utils/date";
import { AddSubTransactionSheet } from "../components/AddSubTransactionSheet";
import { TransactionRow } from "../components/TransactionRow";
import { useTransactionList } from "../hooks/useTransactionList";

type TransactionListSectionProps = {
  accountId: number;
};

export function TransactionListSection({
  accountId,
}: TransactionListSectionProps) {
  const { t } = usePreferences();
  const [refreshKey, setRefreshKey] = useState(0);
  const [startDate, setStartDate] = useState(
    () => getDefaultDateRange().startDate,
  );
  const [endDate, setEndDate] = useState(() => getDefaultDateRange().endDate);
  const {
    transactions,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadMore,
  } = useTransactionList(accountId, { startDate, endDate }, refreshKey);
  const [activeParentId, setActiveParentId] = useState<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasFilter = startDate.length > 0 || endDate.length > 0;

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || isLoading || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [isLoading, hasMore, loadMore]);

  return (
    <div className="mt-7">
      <div
        className="flex items-center justify-between"
        style={{ animation: "fade-up 0.6s 0.1s ease both" }}
      >
        <div className="text-lg font-bold font-heading text-text-primary">
          {t("account.detail.transactions")}
        </div>
        {hasFilter && (
          <button
            className="flex items-center gap-1 text-[11.5px] font-semibold text-text-tertiary"
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            type="button"
          >
            <CloseIcon size={11} />
            {t("account.detail.filter.clear")}
          </button>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <div>
          <div className="text-[10px] font-bold tracking-[2px] text-text-tertiary">
            {t("account.detail.filter.startDate")}
          </div>
          <div className="mt-1.5 flex items-center gap-2 rounded-[16px] border border-border-subtle bg-surface px-3 py-2.5">
            <CalendarIcon className="text-text-tertiary" size={14} />
            <input
              className="w-full border-none bg-transparent font-numeric text-[12px] text-text-primary outline-none"
              max={endDate || undefined}
              onChange={(event) => setStartDate(event.target.value)}
              type="date"
              value={startDate}
            />
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold tracking-[2px] text-text-tertiary">
            {t("account.detail.filter.endDate")}
          </div>
          <div className="mt-1.5 flex items-center gap-2 rounded-[16px] border border-border-subtle bg-surface px-3 py-2.5">
            <CalendarIcon className="text-text-tertiary" size={14} />
            <input
              className="w-full border-none bg-transparent font-numeric text-[12px] text-text-primary outline-none"
              min={startDate || undefined}
              onChange={(event) => setEndDate(event.target.value)}
              type="date"
              value={endDate}
            />
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex flex-col gap-3">
        {isLoading && (
          <div className="text-xs text-text-secondary">
            {t("home.portfolio.loading")}
          </div>
        )}
        {!isLoading && error && (
          <div className="text-xs text-danger">{t("account.detail.error")}</div>
        )}
        {!isLoading && !error && transactions.length === 0 && (
          <div className="text-xs text-text-secondary">
            {t("account.detail.empty")}
          </div>
        )}
        {!isLoading &&
          !error &&
          transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id_transaction}
              onAddSubTransaction={() =>
                setActiveParentId(transaction.id_transaction)
              }
              transaction={transaction}
            />
          ))}

        {!isLoading && !error && transactions.length > 0 && (
          <div className="h-1" ref={sentinelRef} />
        )}

        {isLoadingMore && (
          <div className="text-center text-xs text-text-secondary">
            {t("account.detail.loadingMore")}
          </div>
        )}
      </div>

      <AddSubTransactionSheet
        onClose={() => setActiveParentId(null)}
        onCreated={() => {
          setActiveParentId(null);
          setRefreshKey((key) => key + 1);
        }}
        open={activeParentId !== null}
        parentTransactionId={activeParentId}
      />
    </div>
  );
}
