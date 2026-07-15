"use client";

import { useMemo, useState } from "react";
import { accounts } from "../constants/accounts.constant";
import type { TxType } from "../types/home.type";

export function useAddTransactionForm(
  txType: TxType,
  onTxTypeChange: (type: TxType) => void,
) {
  const [amount, setAmount] = useState("");
  const [fromAccountId, setFromAccountId] = useState(accounts[0].id);
  const [targetAccountId, setTargetAccountId] = useState(accounts[1].id);
  const [fromPickerOpen, setFromPickerOpen] = useState(false);
  const [targetPickerOpen, setTargetPickerOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [borrower, setBorrower] = useState("");
  const [dueDate, setDueDate] = useState("");

  const fromAccount = useMemo(
    () => accounts.find((account) => account.id === fromAccountId) ?? accounts[0],
    [fromAccountId],
  );
  const targetAccount = useMemo(
    () => accounts.find((account) => account.id === targetAccountId) ?? accounts[1],
    [targetAccountId],
  );

  const showFromAccount = txType !== "income";
  const showTargetAccount = txType === "transfer" || txType === "receivable";
  const isReceivableTarget = txType === "receivable";
  const isReceivable = txType === "receivable";

  function selectTxType(nextType: TxType) {
    setFromPickerOpen(false);
    setTargetPickerOpen(false);
    onTxTypeChange(nextType);
  }

  function selectFromAccount(id: string) {
    setFromAccountId(id);
    setFromPickerOpen(false);
  }

  function selectTargetAccount(id: string) {
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
  }

  return {
    txType,
    selectTxType,
    amount,
    setAmount,
    fromAccount,
    selectFromAccount,
    targetAccount,
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
    showFromAccount,
    showTargetAccount,
    isReceivableTarget,
    isReceivable,
    reset,
  };
}
