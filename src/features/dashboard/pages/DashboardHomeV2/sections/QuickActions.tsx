import { usePreferences, type TranslationKey } from "@/modules/preferences";
import { quickActions } from "../constants/quick-actions.constant";
import type { QuickActionId } from "../types/home.type";

const labelKeys: Record<QuickActionId, TranslationKey> = {
  transfer: "home.quickAction.transfer",
  topUp: "home.quickAction.topUp",
  pay: "home.quickAction.pay",
  more: "home.quickAction.more",
};

export function QuickActions() {
  const { t } = usePreferences();

  return (
    <div
      className="mt-5.5 grid grid-cols-4 gap-2.5"
      style={{ animation: "fade-up 0.6s 0.15s ease both" }}
    >
      {quickActions.map((action) => (
        <button
          className="flex flex-col items-center gap-1.5 border-none bg-transparent p-0 transition-transform active:scale-90"
          key={action.id}
          type="button"
        >
          <span
            className="flex h-[54px] w-[54px] items-center justify-center rounded-[20px] text-xl shadow-[0_6px_16px_-8px_rgba(6,78,59,0.25)]"
            style={{ background: action.bg }}
          >
            {action.emoji}
          </span>
          <span className="text-[11.5px] font-medium text-text-secondary">
            {t(labelKeys[action.id])}
          </span>
        </button>
      ))}
    </div>
  );
}
