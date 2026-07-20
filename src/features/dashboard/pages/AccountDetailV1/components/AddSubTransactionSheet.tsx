import { categoryChips } from "@/features/dashboard/constants/category.constant";
import { usePreferences } from "@/modules/preferences";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { CloseIcon } from "@/shared/components/icons";
import { IconButton } from "@/shared/components/IconButton";
import { SegmentedControl } from "@/shared/components/SegmentedControl";
import { useAddSubTransactionForm } from "../hooks/useAddSubTransactionForm";

type AddSubTransactionSheetProps = {
  open: boolean;
  parentTransactionId: number | null;
  onClose: () => void;
  onCreated: () => void;
};

export function AddSubTransactionSheet({
  open,
  parentTransactionId,
  onClose,
  onCreated,
}: AddSubTransactionSheetProps) {
  const { t } = usePreferences();
  const form = useAddSubTransactionForm(parentTransactionId, onCreated);

  function handleClose() {
    form.reset();
    onClose();
  }

  return (
    <BottomSheet
      onClose={handleClose}
      open={open}
      panelClassName="inset-x-3 bottom-3 rounded-[32px] px-5 pb-5"
    >
      <div className="mt-4 flex items-center justify-between">
        <div className="text-[19px] font-bold text-text-primary">
          {t("account.detail.addSub.title")}
        </div>
        <IconButton ariaLabel="Close" onClick={handleClose} size={36}>
          <CloseIcon size={14} />
        </IconButton>
      </div>

      <div className="mt-5 text-[11px] font-bold tracking-[2px] text-text-secondary">
        {t("account.detail.addSub.description")}
      </div>
      <div className="mt-2.5 flex items-center gap-2.5 rounded-[20px] border border-border-subtle bg-surface px-3.5">
        <input
          className="flex-1 border-none bg-transparent py-3.5 font-numeric text-[13px] text-text-primary outline-none"
          onChange={(event) => form.setDescription(event.target.value)}
          placeholder={t("account.detail.addSub.descriptionPlaceholder")}
          value={form.description}
        />
      </div>

      <div className="mt-5 text-[11px] font-bold tracking-[2px] text-text-secondary">
        {t("home.tx.category")}
      </div>
      <div className="mt-2.5 flex items-center gap-2.5 rounded-[20px] border border-border-subtle bg-surface px-3.5">
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

      <div className="mt-5 text-[11px] font-bold tracking-[2px] text-text-secondary">
        {t("account.detail.addSub.amount")}
      </div>
      <div className="mt-2.5 flex items-center gap-2.5 rounded-[20px] border border-border-subtle bg-surface px-3.5">
        <span className="font-numeric text-[13px] font-bold text-text-tertiary">
          Rp
        </span>
        <input
          className="flex-1 border-none bg-transparent py-3.5 font-numeric text-[13px] text-text-primary outline-none"
          inputMode="numeric"
          onChange={(event) =>
            form.setAmount(event.target.value.replace(/[^0-9]/g, ""))
          }
          placeholder="0"
          value={form.amount}
        />
      </div>

      <div className="mt-5 text-[11px] font-bold tracking-[2px] text-text-secondary">
        {t("account.detail.addSub.type")}
      </div>
      <SegmentedControl
        className="mt-2.5"
        onChange={form.setTransactionType}
        options={[
          { value: "DEBIT", label: t("account.detail.addSub.typeDebit") },
          { value: "CREDIT", label: t("account.detail.addSub.typeCredit") },
        ]}
        value={form.transactionType}
      />

      {form.error && (
        <div className="mt-3 text-xs text-danger">
          {t("account.detail.addSub.error")}
        </div>
      )}

      <button
        className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-brand-500 to-brand-600 p-4.5 text-[15px] font-bold text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.45),inset_0_-3px_6px_rgba(6,78,59,0.35),0_16px_32px_-10px_rgba(13,148,136,0.55)] transition-transform active:scale-[0.97] disabled:opacity-50"
        disabled={!form.canSubmit || form.isSubmitting}
        onClick={() => form.submit()}
        type="button"
      >
        {form.isSubmitting
          ? t("account.detail.addSub.submitting")
          : t("account.detail.addSub.submit")}
      </button>
    </BottomSheet>
  );
}
