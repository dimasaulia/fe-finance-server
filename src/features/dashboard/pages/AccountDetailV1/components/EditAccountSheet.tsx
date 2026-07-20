import { accountTypeVisuals } from "@/features/dashboard/constants/account-type.constant";
import type { AccountApiType, AccountRecord } from "@/features/dashboard/types/account.type";
import { usePreferences, type TranslationKey } from "@/modules/preferences";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { CloseIcon } from "@/shared/components/icons";
import { IconButton } from "@/shared/components/IconButton";
import { useEditAccountForm } from "../hooks/useEditAccountForm";

type EditAccountSheetProps = {
  account: AccountRecord;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
};

const accountTypeOrder: AccountApiType[] = [
  "BANK",
  "EWALLET",
  "INVESTATION",
  "OTHER",
];

const accountTypeLabelKeys: Record<AccountApiType, TranslationKey> = {
  BANK: "home.portfolio.type.BANK",
  EWALLET: "home.portfolio.type.EWALLET",
  INVESTATION: "home.portfolio.type.INVESTATION",
  OTHER: "home.portfolio.type.OTHER",
};

export function EditAccountSheet({
  account,
  open,
  onClose,
  onUpdated,
}: EditAccountSheetProps) {
  const { t } = usePreferences();
  const form = useEditAccountForm(account, onUpdated);

  return (
    <BottomSheet
      onClose={onClose}
      open={open}
      panelClassName="inset-x-3 bottom-3 rounded-[32px] px-5 pb-5"
    >
      <div className="mt-4 flex items-center justify-between">
        <div className="text-[19px] font-bold text-text-primary">
          {t("account.edit.title")}
        </div>
        <IconButton ariaLabel="Close" onClick={onClose} size={36}>
          <CloseIcon size={14} />
        </IconButton>
      </div>

      <div className="mt-5 text-[11px] font-bold tracking-[2px] text-text-secondary">
        {t("home.addAccount.name")}
      </div>
      <div className="mt-2.5 flex items-center gap-2.5 rounded-[20px] border border-border-subtle bg-surface px-3.5">
        <input
          className="flex-1 border-none bg-transparent py-3.5 font-numeric text-[13px] text-text-primary outline-none"
          onChange={(event) => form.setName(event.target.value)}
          placeholder={t("home.addAccount.namePlaceholder")}
          value={form.name}
        />
      </div>

      <div className="mt-5 text-[11px] font-bold tracking-[2px] text-text-secondary">
        {t("home.addAccount.balance")}
      </div>
      <div className="mt-2.5 flex items-center gap-2.5 rounded-[20px] border border-border-subtle bg-surface px-3.5">
        <span className="font-numeric text-[13px] font-bold text-text-tertiary">
          Rp
        </span>
        <input
          className="flex-1 border-none bg-transparent py-3.5 font-numeric text-[13px] text-text-primary outline-none"
          inputMode="numeric"
          onChange={(event) =>
            form.setBalance(event.target.value.replace(/[^0-9]/g, ""))
          }
          placeholder="0"
          value={form.balance}
        />
      </div>

      <div className="mt-5 text-[11px] font-bold tracking-[2px] text-text-secondary">
        {t("home.addAccount.type")}
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        {accountTypeOrder.map((type) => {
          const visuals = accountTypeVisuals[type];
          const active = type === form.type;

          return (
            <button
              className={`flex items-center gap-2.5 rounded-[18px] border-[1.5px] p-3 text-left transition-transform active:scale-[0.97] ${
                active
                  ? "border-brand-500 bg-brand-500/10"
                  : "border-border-subtle bg-surface"
              }`}
              key={type}
              onClick={() => form.setType(type)}
              type="button"
            >
              <span
                className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-xl text-sm"
                style={{ background: visuals.iconBg }}
              >
                {visuals.emoji}
              </span>
              <span className="text-[12.5px] font-semibold text-text-primary">
                {t(accountTypeLabelKeys[type])}
              </span>
            </button>
          );
        })}
      </div>

      {form.error && (
        <div className="mt-3 text-xs text-danger">
          {t("account.edit.error")}
        </div>
      )}

      <button
        className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-brand-500 to-brand-600 p-4.5 text-[15px] font-bold text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.45),inset_0_-3px_6px_rgba(6,78,59,0.35),0_16px_32px_-10px_rgba(13,148,136,0.55)] transition-transform active:scale-[0.97] disabled:opacity-50"
        disabled={!form.canSubmit || form.isSubmitting}
        onClick={() => form.submit()}
        type="button"
      >
        {form.isSubmitting ? t("account.edit.submitting") : t("account.edit.submit")}
      </button>
    </BottomSheet>
  );
}
