import type { TransactionRecord } from "@/features/dashboard/types/transaction.type";
import { usePreferences } from "@/modules/preferences";
import { GlassCard } from "@/shared/components/GlassCard";
import { InfoIcon, PlusIcon } from "@/shared/components/icons";
import { formatCompactCurrency } from "@/shared/utils/currency";
import { formatDateTime } from "@/shared/utils/date";

type TransactionRowProps = {
  transaction: TransactionRecord;
  onAddSubTransaction: () => void;
};

function amountClassName(transactionType: "DEBIT" | "CREDIT") {
  return transactionType === "CREDIT" ? "text-brand-700" : "text-danger";
}

function amountSign(transactionType: "DEBIT" | "CREDIT") {
  return transactionType === "CREDIT" ? "+" : "-";
}

export function TransactionRow({
  transaction,
  onAddSubTransaction,
}: TransactionRowProps) {
  const { t } = usePreferences();
  const hasExtraDetail = transaction.is_have_child_transaction === 1;

  return (
    <GlassCard className="p-4">
      <div className="flex items-start gap-3">
        <span
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-2xl font-numeric text-base font-bold ${
            transaction.transaction_type === "CREDIT"
              ? "bg-brand-500/14 text-brand-700"
              : "bg-danger-bg text-danger"
          }`}
        >
          {amountSign(transaction.transaction_type)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[14.5px] font-bold text-text-primary">
              {transaction.description}
            </span>
            <span
              className={`flex-none font-numeric text-[14px] font-bold ${amountClassName(transaction.transaction_type)}`}
            >
              {amountSign(transaction.transaction_type)}
              {formatCompactCurrency(transaction.amount)}
            </span>
          </div>
          <div className="mt-0.5 text-xs text-text-secondary">
            {transaction.transaction_name} · {formatDateTime(transaction.created_at)}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 pl-[52px]">
        <button
          className="flex items-center gap-1 text-[11.5px] font-semibold text-brand-600 transition-transform active:scale-95"
          onClick={onAddSubTransaction}
          type="button"
        >
          <PlusIcon size={12} />
          {t("account.detail.action.addSub")}
        </button>
        <button
          aria-label={t("account.detail.action.detail")}
          className={`flex items-center gap-1 text-[11.5px] font-semibold transition-transform ${
            hasExtraDetail
              ? "text-brand-600 active:scale-95"
              : "cursor-default text-text-tertiary opacity-60"
          }`}
          type="button"
        >
          <InfoIcon size={12} />
          {t("account.detail.action.detail")}
        </button>
      </div>
    </GlassCard>
  );
}
