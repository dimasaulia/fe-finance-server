import { useRouter } from "next/navigation";
import { accountTypeVisuals } from "@/features/dashboard/constants/account-type.constant";
import { useAccountList } from "@/features/dashboard/hooks/useAccountList";
import { usePreferences } from "@/modules/preferences";
import { routes } from "@/config/routes.config";
import { GlassCard } from "@/shared/components/GlassCard";
import { formatCompactCurrency } from "@/shared/utils/currency";

type PortfolioListProps = {
  refreshKey?: number;
};

export function PortfolioList({ refreshKey = 0 }: PortfolioListProps) {
  const { t } = usePreferences();
  const router = useRouter();
  const { accounts, isLoading, error } = useAccountList(refreshKey);

  return (
    <div>
      <div
        className="mt-6.5 flex items-baseline justify-between"
        style={{ animation: "fade-up 0.6s 0.2s ease both" }}
      >
        <div className="text-lg font-bold font-heading text-text-primary">
          {t("home.portfolio.title")}
        </div>
        <a className="text-[13px] font-semibold text-brand-600" href="#">
          {t("home.portfolio.viewAll")} →
        </a>
      </div>
      <div className="mt-3.5 flex flex-col gap-3">
        {isLoading && (
          <div className="text-xs text-text-secondary">
            {t("home.portfolio.loading")}
          </div>
        )}
        {!isLoading && error && (
          <div className="text-xs text-danger">{t("home.portfolio.error")}</div>
        )}
        {!isLoading && !error && accounts.length === 0 && (
          <div className="text-xs text-text-secondary">
            {t("home.portfolio.empty")}
          </div>
        )}
        {!isLoading &&
          !error &&
          accounts.map((account) => {
            const visuals = accountTypeVisuals[account.type];

            return (
              <GlassCard
                className="flex w-full items-center gap-3.5 p-4"
                key={account.id_account}
                onClick={() =>
                  router.push(routes.accountDetail(account.id_account))
                }
              >
                <div
                  className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl text-xl"
                  style={{ background: visuals.iconBg }}
                >
                  {visuals.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-heading text-[15px] font-bold text-text-primary">
                    {account.name}
                  </div>
                  <div className="mt-0.5 text-xs text-text-secondary">
                    {t(`home.portfolio.type.${account.type}`)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-numeric text-[14.5px] font-bold text-text-primary">
                    {formatCompactCurrency(account.balance)}
                  </div>
                </div>
              </GlassCard>
            );
          })}
      </div>
    </div>
  );
}
