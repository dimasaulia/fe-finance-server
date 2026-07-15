import { usePreferences, type TranslationKey } from "@/modules/preferences";
import { GlassCard } from "@/shared/components/GlassCard";
import { weeklyCashFlow } from "../constants/cash-flow.constant";
import { mockUser } from "../constants/user.constant";
import type { WeekdayKey } from "../types/home.type";

const dayKeys: Record<WeekdayKey, TranslationKey> = {
  mon: "home.day.mon",
  tue: "home.day.tue",
  wed: "home.day.wed",
  thu: "home.day.thu",
  fri: "home.day.fri",
  sat: "home.day.sat",
  sun: "home.day.sun",
};

export function WeeklyCashFlowCard() {
  const { t } = usePreferences();

  return (
    <GlassCard animationDelay="0.18s" className="mt-5.5 p-4.5">
      <div className="flex items-baseline justify-between">
        <div className="text-[14.5px] font-bold font-heading text-text-primary">
          {t("home.cashflow.title")}
        </div>
        <div className="font-numeric text-xs font-bold text-brand-700">
          {mockUser.weeklyCashFlowTotal}
        </div>
      </div>
      <div className="mt-3.5 flex h-[74px] items-end gap-2">
        {weeklyCashFlow.map((bar) => (
          <div
            className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
            key={bar.dayKey}
          >
            <div
              className="w-full rounded-t-lg rounded-b-sm transition-[height] duration-400"
              style={{
                height: `${bar.heightPct}%`,
                background: bar.positive ? "var(--brand-500)" : "var(--info)",
              }}
            />
            <span className="text-[10px] font-semibold text-text-tertiary">
              {t(dayKeys[bar.dayKey])}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
