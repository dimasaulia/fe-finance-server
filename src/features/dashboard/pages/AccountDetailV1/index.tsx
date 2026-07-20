"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes.config";
import { usePreferences } from "@/modules/preferences";
import { DeleteAccountSheet } from "./components/DeleteAccountSheet";
import { EditAccountSheet } from "./components/EditAccountSheet";
import { useAccountDetail } from "./hooks/useAccountDetail";
import { AccountDetailHeader } from "./sections/AccountDetailHeader";
import { AccountSummaryCard } from "./sections/AccountSummaryCard";
import { TransactionListSection } from "./sections/TransactionListSection";

type AccountDetailV1Props = {
  accountId: string;
};

export function AccountDetailV1({ accountId }: AccountDetailV1Props) {
  const { t } = usePreferences();
  const router = useRouter();
  const numericId = Number(accountId);
  const { account, isLoading, error, refetch } = useAccountDetail(numericId);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-app-bg font-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-16 h-[300px] w-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(52,211,153,0.45), rgba(52,211,153,0) 70%)",
          animation: "blob-float 9s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 -right-24 h-[280px] w-[280px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(45,212,191,0.38), rgba(45,212,191,0) 70%)",
          animation: "blob-float-alt 11s ease-in-out infinite",
        }}
      />

      <div className="relative mx-auto max-w-[420px] px-5 pt-6 pb-16">
        <AccountDetailHeader
          onBack={() => router.push(routes.financeHome)}
          onDelete={() => setDeleteOpen(true)}
          onEdit={() => setEditOpen(true)}
        />

        {isLoading && (
          <div className="mt-16 text-center text-xs text-text-secondary">
            {t("home.portfolio.loading")}
          </div>
        )}
        {!isLoading && (error || !account) && (
          <div className="mt-16 text-center text-xs text-danger">
            {t("account.detail.notFound")}
          </div>
        )}
        {!isLoading && account && (
          <>
            <AccountSummaryCard account={account} />
            <TransactionListSection accountId={numericId} />
          </>
        )}
      </div>

      {account && (
        <>
          <EditAccountSheet
            account={account}
            onClose={() => setEditOpen(false)}
            onUpdated={() => {
              setEditOpen(false);
              refetch();
            }}
            open={editOpen}
          />
          <DeleteAccountSheet
            account={account}
            onClose={() => setDeleteOpen(false)}
            onDeleted={() => router.push(routes.financeHome)}
            open={deleteOpen}
          />
        </>
      )}
    </div>
  );
}
