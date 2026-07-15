import { usePreferences } from "@/modules/preferences";
import { mockUser } from "../constants/user.constant";

export function NetWorthHero() {
  const { t } = usePreferences();

  return (
    <div
      className="mt-7"
      style={{ animation: "fade-up 0.6s 0.05s ease both" }}
    >
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-medium text-text-secondary">
          {t("home.netWorth.label")}
        </span>
        <span className="rounded-full bg-brand-500/15 px-2.5 py-1 font-numeric text-[11px] font-bold text-brand-700">
          ▲ {mockUser.netWorthGrowth}
        </span>
      </div>
      <div className="mt-1.5 font-numeric text-[34px] font-extrabold tracking-tight text-text-primary">
        {mockUser.netWorth}
      </div>
    </div>
  );
}
