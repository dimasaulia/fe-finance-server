import { usePreferences } from "@/modules/preferences";
import { Avatar } from "@/shared/components/Avatar";
import { appConfig } from "@/config/app.config";

export function LoginHeroSection() {
  const { t } = usePreferences();

  return (
    <div
      className="flex flex-col items-center text-center"
      style={{ animation: "fade-up 0.5s ease both" }}
    >
      <Avatar ariaLabel={appConfig.name} initials="OS" size={56} />
      <h1 className="mt-5 text-2xl font-bold text-text-primary">
        {t("login.title")}
      </h1>
      <p className="mt-2 max-w-xs text-sm leading-6 text-text-secondary">
        {t("login.subtitle")}
      </p>
    </div>
  );
}
