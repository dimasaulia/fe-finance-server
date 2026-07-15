import { usePreferences } from "@/modules/preferences";
import { GlassCard } from "@/shared/components/GlassCard";
import { mockUser } from "../constants/user.constant";

export function LiquidityChips() {
  const { t } = usePreferences();

  return (
    <div
      className="mt-4.5 grid grid-cols-2 gap-3"
      style={{ animation: "fade-up 0.6s 0.1s ease both" }}
    >
      <GlassCard className="p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/15">
          <svg
            fill="none"
            height="17"
            stroke="#059669"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
            width="17"
          >
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <circle cx="16" cy="14" fill="#059669" r="1.5" stroke="none" />
          </svg>
        </div>
        <div className="mt-2.5 text-xs text-text-secondary">
          {t("home.liquidity.available")}
        </div>
        <div className="mt-0.5 font-numeric text-[17px] font-bold text-text-primary">
          {mockUser.availableBalance}
        </div>
      </GlassCard>
      <GlassCard className="p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-info/15">
          <svg
            fill="none"
            height="17"
            stroke="#0284C7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
            width="17"
          >
            <path d="M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <div className="mt-2.5 text-xs text-text-secondary">
          {t("home.liquidity.locked")}
        </div>
        <div className="mt-0.5 font-numeric text-[17px] font-bold text-text-primary">
          {mockUser.lockedBalance}
        </div>
      </GlassCard>
    </div>
  );
}
