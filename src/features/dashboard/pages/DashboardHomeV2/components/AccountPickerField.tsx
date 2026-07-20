import { usePreferences } from "@/modules/preferences";
import { ChevronDownIcon } from "@/shared/components/icons";
import { formatCompactCurrency } from "@/shared/utils/currency";
import { accountTypeVisuals } from "../constants/account-type.constant";
import type { AccountRecord } from "../types/home.type";

type AccountPickerFieldProps = {
  labelKey: "home.tx.fromAccount" | "home.tx.toAccount" | "home.tx.targetAccount";
  accounts: AccountRecord[];
  selected: AccountRecord | null;
  open: boolean;
  onToggle: () => void;
  onSelect: (id: number) => void;
};

export function AccountPickerField({
  labelKey,
  accounts,
  selected,
  open,
  onToggle,
  onSelect,
}: AccountPickerFieldProps) {
  const { t } = usePreferences();

  return (
    <div className="mt-7">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-[2px] text-text-secondary">
          {t(labelKey)}
        </span>
        <span className="rounded-full bg-brand-500/14 px-2.5 py-1 font-numeric text-[9.5px] font-bold text-brand-700">
          {t("home.tx.required")}
        </span>
      </div>
      <button
        className="mt-2.5 flex w-full items-center gap-3 rounded-[20px] border border-border-subtle bg-surface p-3.5 text-left shadow-[0_6px_16px_-12px_rgba(6,78,59,0.25)] transition-transform active:scale-[0.98] disabled:opacity-60"
        disabled={!selected}
        onClick={onToggle}
        type="button"
      >
        {selected ? (
          <>
            <span
              className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-2xl text-lg"
              style={{ background: accountTypeVisuals[selected.type].iconBg }}
            >
              {accountTypeVisuals[selected.type].emoji}
            </span>
            <span className="flex-1">
              <span className="block text-sm font-bold text-text-primary">
                {selected.name}
              </span>
              <span className="mt-0.5 block font-numeric text-[11px] text-text-secondary">
                {formatCompactCurrency(selected.balance)}
              </span>
            </span>
          </>
        ) : (
          <span className="flex-1 text-sm text-text-tertiary">
            {t("home.portfolio.loading")}
          </span>
        )}
        <ChevronDownIcon
          className={`text-text-tertiary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="mt-2 flex flex-col gap-0.5 rounded-[20px] border border-border-subtle bg-surface p-1.5 shadow-[0_10px_24px_-14px_rgba(6,78,59,0.3)]">
          {accounts.map((account) => (
            <button
              className="flex items-center gap-2.5 rounded-2xl p-2.5 text-left transition-transform active:scale-[0.98]"
              key={account.id_account}
              onClick={() => onSelect(account.id_account)}
              type="button"
            >
              <span
                className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-xl text-sm"
                style={{ background: accountTypeVisuals[account.type].iconBg }}
              >
                {accountTypeVisuals[account.type].emoji}
              </span>
              <span className="flex-1 text-[13.5px] font-semibold text-text-primary">
                {account.name}
              </span>
              <span className="font-numeric text-[11px] text-text-secondary">
                {formatCompactCurrency(account.balance)}
              </span>
              <span className="w-3.5 font-bold text-brand-700">
                {account.id_account === selected?.id_account ? "✓" : ""}
              </span>
            </button>
          ))}
          {accounts.length === 0 && (
            <div className="p-2.5 text-center text-xs text-text-tertiary">
              {t("home.portfolio.empty")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
