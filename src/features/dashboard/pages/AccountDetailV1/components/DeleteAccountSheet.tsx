import type { AccountRecord } from "@/features/dashboard/types/account.type";
import { usePreferences } from "@/modules/preferences";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { TrashIcon } from "@/shared/components/icons";
import { useDeleteAccount } from "../hooks/useDeleteAccount";

type DeleteAccountSheetProps = {
  account: AccountRecord;
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
};

export function DeleteAccountSheet({
  account,
  open,
  onClose,
  onDeleted,
}: DeleteAccountSheetProps) {
  const { t } = usePreferences();
  const { isDeleting, error, submit } = useDeleteAccount(
    account.id_account,
    onDeleted,
  );

  return (
    <BottomSheet
      onClose={onClose}
      open={open}
      panelClassName="inset-x-3 bottom-3 rounded-[32px] px-5 pb-5"
    >
      <div className="mt-5 flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-danger-bg text-danger">
          <TrashIcon size={22} />
        </span>
        <div className="mt-3.5 text-[17px] font-bold text-text-primary">
          {t("account.delete.title")}
        </div>
        <div className="mt-1.5 text-[13px] text-text-secondary">
          {t("account.delete.description")} &ldquo;{account.name}&rdquo;
        </div>

        {error && (
          <div className="mt-3 text-xs text-danger">
            {t("account.delete.error")}
          </div>
        )}

        <div className="mt-5 flex w-full gap-2.5">
          <button
            className="flex-1 rounded-full border border-border-subtle bg-surface p-4 text-[14px] font-bold text-text-primary transition-transform active:scale-[0.97]"
            onClick={onClose}
            type="button"
          >
            {t("account.delete.cancel")}
          </button>
          <button
            className="flex-1 rounded-full bg-danger p-4 text-[14px] font-bold text-white transition-transform active:scale-[0.97] disabled:opacity-50"
            disabled={isDeleting}
            onClick={() => submit()}
            type="button"
          >
            {isDeleting ? t("account.delete.deleting") : t("account.delete.confirm")}
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
