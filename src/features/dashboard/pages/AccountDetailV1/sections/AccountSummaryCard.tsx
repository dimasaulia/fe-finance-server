import { accountTypeVisuals } from "@/features/dashboard/constants/account-type.constant";
import type { AccountRecord } from "@/features/dashboard/types/account.type";
import { usePreferences } from "@/modules/preferences";
import { GlassCard } from "@/shared/components/GlassCard";
import { formatCurrency } from "@/shared/utils/currency";

type AccountSummaryCardProps = {
  account: AccountRecord;
};

export function AccountSummaryCard({ account }: AccountSummaryCardProps) {
  const { t } = usePreferences();
  const visuals = accountTypeVisuals[account.type];

  return (
    <GlassCard
      animationDelay="0.05s"
      className="mt-6 flex flex-col items-center p-6 text-center"
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-3xl text-3xl"
        style={{ background: visuals.iconBg }}
      >
        {visuals.emoji}
      </div>
      <div className="mt-3.5 font-heading text-lg font-bold text-text-primary">
        {account.name}
      </div>
      <div className="mt-0.5 text-xs text-text-secondary">
        {t(`home.portfolio.type.${account.type}`)}
      </div>
      <div className="mt-4 text-[11px] font-bold tracking-[2px] text-text-tertiary">
        {t("account.detail.balance")}
      </div>
      <div className="mt-1 font-numeric text-[30px] font-extrabold tracking-tight text-text-primary">
        {formatCurrency(account.balance)}
      </div>
    </GlassCard>
  );
}
