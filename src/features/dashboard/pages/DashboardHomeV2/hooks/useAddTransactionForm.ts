"use client";

import { useMemo, useState } from "react";
import { createTransaction } from "../services/transaction.service";
import type { TransactionType, TxType } from "../types/home.type";
import { useAccountList } from "./useAccountList";

const transactionTypeByTxType: Record<TxType, TransactionType> = {
  expense: "DEBIT",
  income: "CREDIT",
  transfer: "DEBIT",
  receivable: "DEBIT",
};

export function useAddTransactionForm(
  txType: TxType,
  onTxTypeChange: (type: TxType) => void,
  onCreated: () => void,
) {

  const [refreshKey, setRefreshKey] = useState(0);
  const { accounts } = useAccountList(refreshKey);

  const [amount, setAmount] = useState("");
  const [fromAccountId, setFromAccountId] = useState<number | null>(null);
  const [targetAccountId, setTargetAccountId] = useState<number | null>(null);
  const [fromPickerOpen, setFromPickerOpen] = useState(false);
  const [targetPickerOpen, setTargetPickerOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [borrower, setBorrower] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fromAccount = useMemo(
    () =>
      accounts.find((account) => account.id_account === fromAccountId) ??
      accounts[0] ??
      null,
    [accounts, fromAccountId],
  );

  // An account can't transfer to itself, so the destination list drops
  // whichever account is currently selected as the source.
  const targetAccountOptions = useMemo(
    () =>
      accounts.filter(
        (account) => account.id_account !== fromAccount?.id_account,
      ),
    [accounts, fromAccount],
  );

  const targetAccount = useMemo(
    () =>
      targetAccountOptions.find(
        (account) => account.id_account === targetAccountId,
      ) ??
      targetAccountOptions[0] ??
      null,
    [targetAccountOptions, targetAccountId],
  );

  const showTargetAccount = txType === "transfer" || txType === "receivable";
  const isReceivableTarget = txType === "receivable";
  const isReceivable = txType === "receivable";

  const canSubmit =
    Number(amount) > 0 &&
    category.trim().length > 0 &&
    fromAccount !== null &&
    (txType !== "transfer" || targetAccount !== null);

  function selectTxType(nextType: TxType) {
    setFromPickerOpen(false);
    setTargetPickerOpen(false);
    onTxTypeChange(nextType);
  }

  function selectFromAccount(id: number) {
    setFromAccountId(id);
    setFromPickerOpen(false);
  }

  function selectTargetAccount(id: number) {
    setTargetAccountId(id);
    setTargetPickerOpen(false);
  }

  function reset() {
    setAmount("");
    setCategory("");
    setNotes("");
    setBorrower("");
    setDueDate("");
    setFromPickerOpen(false);
    setTargetPickerOpen(false);
    setError(null);
  }

  async function submit() {
    if (!canSubmit || !fromAccount || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const description =
      notes.trim() ||
      (isReceivable && borrower.trim()
        ? `${category.trim()} - ${borrower.trim()}`
        : category.trim());

    try {
      await createTransaction({
        idAccount: fromAccount.id_account,
        transactionType: transactionTypeByTxType[txType],
        transactionGroup: category.trim(),
        amount: Number(amount),
        description,
        idTransactionDestination:
          txType === "transfer" && targetAccount
            ? targetAccount.id_account
            : undefined,
      });
      reset();
      setRefreshKey((key) => key + 1);
      onCreated();
    } catch {
      setError("Failed to create transaction");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    txType,
    selectTxType,
    amount,
    setAmount,
    accounts,
    fromAccount,
    selectFromAccount,
    targetAccount,
    targetAccountOptions,
    selectTargetAccount,
    fromPickerOpen,
    setFromPickerOpen,
    targetPickerOpen,
    setTargetPickerOpen,
    category,
    setCategory,
    notes,
    setNotes,
    borrower,
    setBorrower,
    dueDate,
    setDueDate,
    showTargetAccount,
    isReceivableTarget,
    isReceivable,
    canSubmit,
    isSubmitting,
    error,
    submit,
    reset,
  };
}
