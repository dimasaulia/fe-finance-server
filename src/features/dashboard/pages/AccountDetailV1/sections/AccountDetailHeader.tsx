import { usePreferences } from "@/modules/preferences";
import { ChevronRightIcon, EditIcon, TrashIcon } from "@/shared/components/icons";
import { IconButton } from "@/shared/components/IconButton";

type AccountDetailHeaderProps = {
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function AccountDetailHeader({
  onBack,
  onEdit,
  onDelete,
}: AccountDetailHeaderProps) {
  const { t } = usePreferences();

  return (
    <div
      className="flex items-center justify-between"
      style={{ animation: "fade-up 0.5s ease both" }}
    >
      <IconButton ariaLabel="Back" onClick={onBack} variant="glass">
        <ChevronRightIcon className="rotate-180" size={16} />
      </IconButton>
      <div className="text-base font-bold font-heading text-text-primary">
        {t("account.detail.title")}
      </div>
      <div className="flex items-center gap-2">
        <IconButton ariaLabel="Edit account" onClick={onEdit} variant="glass">
          <EditIcon size={15} />
        </IconButton>
        <IconButton ariaLabel="Delete account" onClick={onDelete} variant="glass">
          <TrashIcon size={15} />
        </IconButton>
      </div>
    </div>
  );
}
