"use client";

import { useState } from "react";
import { createSubTransaction } from "@/features/dashboard/services/transaction.service";
import type { TransactionType } from "@/features/dashboard/types/transaction.type";

const DEFAULT_TYPE: TransactionType = "DEBIT";

export function useAddSubTransactionForm(
  parentTransactionId: number | null,
  onCreated: () => void,
) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] =
    useState<TransactionType>(DEFAULT_TYPE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    parentTransactionId !== null &&
    description.trim().length > 0 &&
    category.trim().length > 0 &&
    Number(amount) > 0;

  function reset() {
    setDescription("");
    setCategory("");
    setAmount("");
    setTransactionType(DEFAULT_TYPE);
    setError(null);
  }

  async function submit() {
    if (!canSubmit || parentTransactionId === null || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createSubTransaction({
        idTransaction: parentTransactionId,
        transactionType,
        transactionGroup: category.trim(),
        amount: Number(amount),
        description: description.trim(),
        idTransactionDestination: null,
      });
      reset();
      onCreated();
    } catch {
      setError("Failed to add sub-transaction");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    description,
    setDescription,
    category,
    setCategory,
    amount,
    setAmount,
    transactionType,
    setTransactionType,
    canSubmit,
    isSubmitting,
    error,
    submit,
    reset,
  };
}
