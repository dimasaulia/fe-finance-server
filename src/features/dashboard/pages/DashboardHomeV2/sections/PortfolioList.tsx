import { usePreferences } from "@/modules/preferences";
import { GlassCard } from "@/shared/components/GlassCard";
import { portfolios } from "../constants/portfolios.constant";

function trendClassName(trendUp: boolean | null) {
  if (trendUp === true) {
    return "text-brand-700";
  }

  if (trendUp === false) {
    return "text-danger";
  }

  return "text-text-tertiary";
}

export function PortfolioList() {
  const { t } = usePreferences();

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
        {portfolios.map((portfolio) => (
          <GlassCard
            className="flex w-full items-center gap-3.5 p-4"
            key={portfolio.id}
          >
            <div
              className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl text-xl"
              style={{ background: portfolio.iconBg }}
            >
              {portfolio.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-heading text-[15px] font-bold text-text-primary">
                {portfolio.name}
              </div>
              <div className="mt-0.5 text-xs text-text-secondary">
                {portfolio.sub}
              </div>
            </div>
            <div className="text-right">
              <div className="font-numeric text-[14.5px] font-bold text-text-primary">
                {portfolio.amount}
              </div>
              <div
                className={`mt-0.5 font-numeric text-[11.5px] font-bold ${trendClassName(portfolio.trendUp)}`}
              >
                {portfolio.trend}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
