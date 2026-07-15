import { useRouter } from "next/navigation";
import { routes } from "@/config/routes.config";
import { useSession } from "@/modules/auth/hooks/useSession";
import { usePreferences, type Language, type Theme } from "@/modules/preferences";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { Avatar } from "@/shared/components/Avatar";
import { ChevronRightIcon, CloseIcon } from "@/shared/components/icons";
import { IconButton } from "@/shared/components/IconButton";
import { SegmentedControl } from "@/shared/components/SegmentedControl";
import { mockUser } from "../constants/user.constant";

type ProfileSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function ProfileSheet({ open, onClose }: ProfileSheetProps) {
  const { language, setLanguage, theme, setTheme, t } = usePreferences();
  const { logout } = useSession();
  const router = useRouter();

  function handleSignOut() {
    logout();
    router.replace(routes.login);
  }

  const languageOptions: { value: Language; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "id", label: "ID" },
  ];

  const themeOptions: { value: Theme; label: string; icon: string }[] = [
    { value: "light", label: t("home.profile.theme.light"), icon: "☀️" },
    { value: "dark", label: t("home.profile.theme.dark"), icon: "🌙" },
    { value: "auto", label: t("home.profile.theme.auto"), icon: "⚙️" },
  ];

  return (
    <BottomSheet
      onClose={onClose}
      open={open}
      panelClassName="inset-x-0 bottom-0 max-h-[88vh] rounded-t-[36px] rounded-b-[44px]"
      showHandle={false}
    >
      <div className="flex-none px-5 pt-3.5">
        <div className="mx-auto h-[5px] w-11 rounded-full bg-border-glass" />
        <div className="mt-4 flex items-center gap-3.5">
          <Avatar initials={mockUser.initials} size={54} />
          <div className="min-w-0 flex-1">
            <div className="text-[19px] font-bold text-text-primary">
              {mockUser.fullName}
            </div>
            <div className="mt-0.5 font-numeric text-[10.5px] font-bold tracking-[2px] text-brand-700">
              {t("home.profile.plan")}
            </div>
          </div>
          <IconButton ariaLabel="Close" onClick={onClose} size={38}>
            <CloseIcon size={15} />
          </IconButton>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6.5">
        <div className="mt-4.5 text-[11px] font-bold tracking-[2px] text-text-tertiary">
          {t("home.profile.accountSettings")}
        </div>
        <div className="mt-2.5 rounded-[22px] border border-border-subtle bg-surface p-1.5 shadow-[0_6px_16px_-12px_rgba(6,78,59,0.2)]">
          <button
            className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors active:bg-brand-500/8"
            type="button"
          >
            <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-xl bg-brand-500/14">
              <svg
                fill="none"
                height="17"
                stroke="var(--brand-700)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
                width="17"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
              </svg>
            </span>
            <span className="flex-1 text-[14.5px] font-semibold text-text-primary">
              {t("home.profile.personalInfo")}
            </span>
            <ChevronRightIcon className="text-text-tertiary" />
          </button>
          <button
            className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors active:bg-brand-500/8"
            type="button"
          >
            <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-xl bg-info/12">
              <svg
                fill="none"
                height="17"
                stroke="var(--info)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
                width="17"
              >
                <path d="M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <span className="flex-1 text-[14.5px] font-semibold text-text-primary">
              {t("home.profile.security")}
            </span>
            <ChevronRightIcon className="text-text-tertiary" />
          </button>
        </div>

        <div className="mt-6 text-[11px] font-bold tracking-[2px] text-text-tertiary">
          {t("home.profile.preferences")}
        </div>
        <div className="mt-2.5 rounded-[22px] border border-border-subtle bg-surface p-1.5 shadow-[0_6px_16px_-12px_rgba(6,78,59,0.2)]">
          <div className="flex items-center gap-3 p-3">
            <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-xl bg-brand-300/25">
              <svg
                fill="none"
                height="17"
                stroke="var(--brand-600)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
                width="17"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" />
              </svg>
            </span>
            <span className="flex-1 text-[14.5px] font-semibold text-text-primary">
              {t("home.profile.language")}
            </span>
            <SegmentedControl
              className="w-auto bg-border-subtle"
              numeric
              onChange={setLanguage}
              options={languageOptions}
              value={language}
            />
          </div>
          <div className="p-3 pt-1">
            <div className="flex items-center gap-3">
              <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-xl bg-warning/18 text-base">
                🎨
              </span>
              <span className="flex-1 text-[14.5px] font-semibold text-text-primary">
                {t("home.profile.appearance")}
              </span>
            </div>
            <SegmentedControl
              className="mt-3"
              numeric
              onChange={setTheme}
              options={themeOptions.map(({ value, label, icon }) => ({
                value,
                label: `${icon} ${label}`,
              }))}
              value={theme}
            />
          </div>
        </div>

        <div className="mt-6 text-[11px] font-bold tracking-[2px] text-text-tertiary">
          {t("home.profile.portfolio")}
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <button
            className="flex items-center gap-3 rounded-[22px] border border-border-subtle bg-surface p-3.5 text-left shadow-[0_6px_16px_-12px_rgba(6,78,59,0.2)] transition-transform active:scale-[0.96]"
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
              <path d="M12 3v12M7 10l5 5 5-5" />
              <path d="M4 21h16" />
            </svg>
            <span>
              <span className="block text-sm font-bold text-text-primary">
                {t("home.profile.export.title")}
              </span>
              <span className="mt-0.5 block font-numeric text-[10px] tracking-wide text-text-tertiary">
                {t("home.profile.export.description")}
              </span>
            </span>
          </button>
          <button
            className="flex items-center gap-3 rounded-[22px] border border-border-subtle bg-surface p-3.5 text-left shadow-[0_6px_16px_-12px_rgba(6,78,59,0.2)] transition-transform active:scale-[0.96]"
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
              <path d="M12 15V3M7 8l5-5 5 5" />
              <path d="M4 21h16" />
            </svg>
            <span>
              <span className="block text-sm font-bold text-text-primary">
                {t("home.profile.import.title")}
              </span>
              <span className="mt-0.5 block font-numeric text-[10px] tracking-wide text-text-tertiary">
                {t("home.profile.import.description")}
              </span>
            </span>
          </button>
        </div>

        <button
          className="mt-5.5 flex w-full items-center justify-center gap-2.5 rounded-full border border-danger-border bg-danger-bg p-4 text-[14.5px] font-bold text-danger transition-transform active:scale-[0.97]"
          onClick={handleSignOut}
          type="button"
        >
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
            width="16"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M16 17l5-5-5-5M21 12H9" />
          </svg>
          {t("home.profile.signOut")}
        </button>
      </div>
    </BottomSheet>
  );
}
