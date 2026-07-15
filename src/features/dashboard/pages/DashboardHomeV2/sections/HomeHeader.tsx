import { usePreferences } from "@/modules/preferences";
import { Avatar } from "@/shared/components/Avatar";
import { IconButton } from "@/shared/components/IconButton";
import { mockUser } from "../constants/user.constant";

type HomeHeaderProps = {
  onOpenProfile: () => void;
};

export function HomeHeader({ onOpenProfile }: HomeHeaderProps) {
  const { t } = usePreferences();

  return (
    <div
      className="flex items-center justify-between"
      style={{ animation: "fade-up 0.5s ease both" }}
    >
      <div className="flex items-center gap-3">
        <Avatar
          ariaLabel={mockUser.fullName}
          initials={mockUser.initials}
          onClick={onOpenProfile}
        />
        <div>
          <div className="text-xs text-text-secondary">
            {t("home.greeting")} 🌿
          </div>
          <div className="text-base font-bold font-heading text-text-primary">
            {mockUser.firstName}
          </div>
        </div>
      </div>
      <IconButton ariaLabel="Notifications" variant="glass">
        <svg
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="18"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
      </IconButton>
    </div>
  );
}
