import Link from "next/link";
import { routes } from "@/config/routes.config";
import { usePreferences } from "@/modules/preferences";
import { PlusIcon } from "@/shared/components/icons";

type HomeBottomNavProps = {
  onAdd: () => void;
};

export function HomeBottomNav({ onAdd }: HomeBottomNavProps) {
  const { t } = usePreferences();

  return (
    <div className="fixed inset-x-4 bottom-4 z-10 mx-auto flex h-[68px] max-w-[420px] items-center justify-around rounded-full border border-border-glass bg-surface-glass px-2.5 shadow-[0_14px_34px_-12px_rgba(6,78,59,0.3)] backdrop-blur-xl">
      <button
        className="flex items-center gap-1.5 rounded-full bg-brand-500/12 px-4.5 py-2.5 transition-transform active:scale-95"
        type="button"
      >
        <svg
          fill="none"
          height="18"
          stroke="var(--brand-700)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
          width="18"
        >
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
        </svg>
        <span className="text-[12.5px] font-semibold text-brand-700">
          {t("home.nav.home")}
        </span>
      </button>
      <button
        aria-label={t("home.nav.add")}
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(6,78,59,0.35),0_12px_24px_-8px_rgba(13,148,136,0.55)] transition-transform active:scale-90"
        onClick={onAdd}
        type="button"
      >
        <PlusIcon size={22} />
      </button>
      <Link
        className="flex items-center gap-1.5 rounded-full px-4.5 py-2.5 transition-transform active:scale-95"
        href={routes.dashboard}
      >
        <svg
          fill="none"
          height="18"
          stroke="var(--text-tertiary)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
          width="18"
        >
          <rect height="7" rx="2" width="7" x="3" y="3" />
          <rect height="7" rx="2" width="7" x="14" y="3" />
          <rect height="7" rx="2" width="7" x="3" y="14" />
          <rect height="7" rx="2" width="7" x="14" y="14" />
        </svg>
        <span className="text-[12.5px] font-semibold text-text-tertiary">
          {t("home.nav.dashboard")}
        </span>
      </Link>
    </div>
  );
}
