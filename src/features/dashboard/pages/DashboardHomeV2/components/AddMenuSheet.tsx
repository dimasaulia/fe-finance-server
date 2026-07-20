import { usePreferences } from "@/modules/preferences";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { ArrowRightIcon, CloseIcon } from "@/shared/components/icons";
import { IconButton } from "@/shared/components/IconButton";

type AddMenuSheetProps = {
  open: boolean;
  onClose: () => void;
  onOpenTransaction: () => void;
  onOpenAccount: () => void;
};

export function AddMenuSheet({
  open,
  onClose,
  onOpenTransaction,
  onOpenAccount,
}: AddMenuSheetProps) {
  const { t } = usePreferences();

  return (
    <BottomSheet
      onClose={onClose}
      open={open}
      panelClassName="inset-x-3 bottom-3 rounded-[32px] px-5 pb-5"
    >
      <div className="mt-4 flex items-center justify-between">
        <div className="text-[19px] font-bold text-text-primary">
          {t("home.addMenu.title")}
        </div>
        <IconButton ariaLabel="Close" onClick={onClose} size={36}>
          <CloseIcon size={14} />
        </IconButton>
      </div>

      <button
        className="mt-4 flex w-full items-center gap-3.5 rounded-[22px] bg-brand-500/10 p-4 text-left transition-transform active:scale-[0.97]"
        onClick={() => onOpenTransaction()}
        type="button"
      >
        <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-2xl bg-brand-500/18 text-xl">
          💸
        </span>
        <span className="flex-1">
          <span className="block text-[15px] font-bold text-text-primary">
            {t("home.addMenu.transaction.title")}
          </span>
          <span className="mt-0.5 block text-xs text-text-secondary">
            {t("home.addMenu.transaction.description")}
          </span>
        </span>
        <ArrowRightIcon className="text-brand-700" size={17} />
      </button>

      <button
        className="mt-2.5 flex w-full items-center gap-3.5 rounded-[22px] bg-brand-500/10 p-4 text-left transition-transform active:scale-[0.97]"
        onClick={() => onOpenAccount()}
        type="button"
      >
        <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-2xl bg-brand-500/18 text-xl">
          💳
        </span>
        <span className="flex-1">
          <span className="block text-[15px] font-bold text-text-primary">
            {t("home.addMenu.card.title")}
          </span>
          <span className="mt-0.5 block text-xs text-text-secondary">
            {t("home.addMenu.card.description")}
          </span>
        </span>
        <ArrowRightIcon className="text-brand-700" size={17} />
      </button>
    </BottomSheet>
  );
}
