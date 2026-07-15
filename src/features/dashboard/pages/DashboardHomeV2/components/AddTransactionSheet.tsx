import { usePreferences, type TranslationKey } from "@/modules/preferences";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { CloseIcon } from "@/shared/components/icons";
import { IconButton } from "@/shared/components/IconButton";
import { SegmentedControl } from "@/shared/components/SegmentedControl";
import { categoryChips } from "../constants/accounts.constant";
import { useAddTransactionForm } from "../hooks/useAddTransactionForm";
import type { TxType } from "../types/home.type";
import { AccountPickerField } from "./AccountPickerField";

type AddTransactionSheetProps = {
  open: boolean;
  onClose: () => void;
  txType: TxType;
  onTxTypeChange: (type: TxType) => void;
};

const txTypeLabelKeys: Record<TxType, TranslationKey> = {
  expense: "home.tx.type.expense",
  income: "home.tx.type.income",
  transfer: "home.tx.type.transfer",
  receivable: "home.tx.type.receivable",
};

const txTitleKeys: Record<TxType, TranslationKey> = {
  expense: "home.tx.title.expense",
  income: "home.tx.title.income",
  transfer: "home.tx.title.transfer",
  receivable: "home.tx.title.receivable",
};

export function AddTransactionSheet({
  open,
  onClose,
  txType,
  onTxTypeChange,
}: AddTransactionSheetProps) {
  const { t } = usePreferences();
  const form = useAddTransactionForm(txType, onTxTypeChange);

  const txTypeOptions = (Object.keys(txTypeLabelKeys) as TxType[]).map(
    (value) => ({ value, label: t(txTypeLabelKeys[value]) }),
  );

  function handleClose() {
    form.reset();
    onClose();
  }

  return (
    <BottomSheet
      onClose={handleClose}
      open={open}
      panelClassName="inset-x-0 bottom-0 top-16 rounded-t-[36px]"
      showHandle={false}
    >
      <div className="flex-none px-5 pt-3.5">
        <div className="mx-auto h-[5px] w-11 rounded-full bg-border-glass" />
        <div className="mt-3.5 flex items-center justify-between">
          <div className="text-[22px] font-bold text-text-primary">
            {t(txTitleKeys[form.txType])}
          </div>
          <IconButton ariaLabel="Close" onClick={handleClose} size={38}>
            <CloseIcon size={15} />
          </IconButton>
        </div>
        <SegmentedControl
          className="mt-3.5"
          onChange={form.selectTxType}
          options={txTypeOptions}
          value={form.txType}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5.5 pb-27.5">
        <div className="text-center">
          <div className="text-[10.5px] font-bold tracking-[3px] text-text-tertiary">
            {t("home.tx.totalAmount")}
          </div>
          <div className="mt-2 flex items-baseline justify-center gap-2">
            <span className="font-numeric text-[17px] font-bold text-text-tertiary">
              IDR
            </span>
            <input
              className="w-[220px] border-none bg-transparent p-0 text-center font-numeric text-4xl font-extrabold text-brand-700 outline-none"
              inputMode="numeric"
              onChange={(event) => form.setAmount(event.target.value)}
              placeholder="0"
              value={form.amount}
            />
          </div>
          <div className="mx-auto mt-2 h-[3px] w-[110px] rounded-full bg-brand-500/35" />
        </div>

        {form.showFromAccount && (
          <AccountPickerField
            labelKey={
              form.txType === "income" ? "home.tx.toAccount" : "home.tx.fromAccount"
            }
            onSelect={form.selectFromAccount}
            onToggle={() => form.setFromPickerOpen(!form.fromPickerOpen)}
            open={form.fromPickerOpen}
            selected={form.fromAccount}
          />
        )}

        {form.showTargetAccount && form.isReceivableTarget && (
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-[2px] text-text-secondary">
                {t("home.tx.targetAccount")}
              </span>
              <span className="rounded-full bg-brand-500/14 px-2.5 py-1 font-numeric text-[9.5px] font-bold text-brand-700">
                {t("home.tx.required")}
              </span>
            </div>
            <div className="mt-2.5 flex items-center gap-3 rounded-[20px] border-[1.5px] border-dashed border-brand-300 bg-surface p-3.5">
              <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-2xl bg-info/14 text-lg">
                🧾
              </span>
              <span className="flex-1 text-sm font-bold text-text-primary">
                {t("home.tx.receivableTarget")}
              </span>
            </div>
          </div>
        )}

        {form.showTargetAccount && !form.isReceivableTarget && (
          <AccountPickerField
            labelKey="home.tx.targetAccount"
            onSelect={form.selectTargetAccount}
            onToggle={() => form.setTargetPickerOpen(!form.targetPickerOpen)}
            open={form.targetPickerOpen}
            selected={form.targetAccount}
          />
        )}

        {form.isReceivable && (
          <>
            <div className="mt-7 text-[11px] font-bold tracking-[2px] text-text-secondary">
              {t("home.tx.borrower")}
            </div>
            <div className="mt-2.5 flex items-center gap-2.5 rounded-[20px] border border-border-subtle bg-surface px-3.5">
              <svg
                fill="none"
                height="16"
                stroke="var(--text-tertiary)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
                width="16"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
              </svg>
              <input
                className="flex-1 border-none bg-transparent py-3.5 font-numeric text-[13px] text-text-primary outline-none"
                onChange={(event) => form.setBorrower(event.target.value)}
                placeholder={t("home.tx.borrowerPlaceholder")}
                value={form.borrower}
              />
            </div>
            <div className="mt-7 text-[11px] font-bold tracking-[2px] text-text-secondary">
              {t("home.tx.dueDate")}
            </div>
            <div className="mt-2.5 flex items-center gap-2.5 rounded-[20px] border border-border-subtle bg-surface px-3.5">
              <svg
                fill="none"
                height="16"
                stroke="var(--text-tertiary)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
                width="16"
              >
                <rect height="18" rx="4" width="18" x="3" y="4" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <input
                className="flex-1 border-none bg-transparent py-3.5 font-numeric text-[13px] text-text-primary outline-none"
                onChange={(event) => form.setDueDate(event.target.value)}
                type="date"
                value={form.dueDate}
              />
            </div>
          </>
        )}

        <div className="mt-7 text-[11px] font-bold tracking-[2px] text-text-secondary">
          {t("home.tx.category")}
        </div>
        <div className="mt-2.5 flex items-center gap-2.5 rounded-[20px] border border-border-subtle bg-surface px-3.5">
          <svg
            fill="none"
            height="16"
            stroke="var(--text-tertiary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
            width="16"
          >
            <path d="M12 3l3 5h-6l3-5z" />
            <circle cx="7" cy="17" r="3" />
            <rect height="6" rx="1" width="6" x="14" y="14" />
          </svg>
          <input
            className="flex-1 border-none bg-transparent py-3.5 font-numeric text-[13px] text-text-primary outline-none"
            onChange={(event) => form.setCategory(event.target.value)}
            placeholder={t("home.tx.categoryPlaceholder")}
            value={form.category}
          />
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {categoryChips.map((chip) => (
            <button
              className="rounded-full border border-border-subtle bg-surface px-3.5 py-2 font-numeric text-[11.5px] font-medium text-text-secondary transition-transform active:scale-[0.93]"
              key={chip}
              onClick={() => form.setCategory(chip)}
              type="button"
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="mt-7 text-[11px] font-bold tracking-[2px] text-text-secondary">
          {t("home.tx.notes")}
        </div>
        <textarea
          className="mt-2.5 w-full resize-none rounded-[20px] border border-border-subtle bg-surface p-3.5 font-numeric text-[13px] text-text-primary outline-none"
          onChange={(event) => form.setNotes(event.target.value)}
          placeholder={t("home.tx.notesPlaceholder")}
          rows={3}
          value={form.notes}
        />
      </div>

      <div className="absolute inset-x-5 bottom-4.5 z-5">
        <button
          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-brand-500 to-brand-600 p-4.5 text-[15px] font-bold text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.45),inset_0_-3px_6px_rgba(6,78,59,0.35),0_16px_32px_-10px_rgba(13,148,136,0.55)] transition-transform active:scale-[0.97]"
          onClick={handleClose}
          type="button"
        >
          {t("home.tx.confirm")}
          <svg
            fill="none"
            height="17"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
            viewBox="0 0 24 24"
            width="17"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </BottomSheet>
  );
}
