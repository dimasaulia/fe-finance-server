"use client";

import { useState } from "react";
import { updateAccount } from "@/features/dashboard/services/account.service";
import type {
  AccountApiType,
  AccountRecord,
} from "@/features/dashboard/types/account.type";

export function useEditAccountForm(
  account: AccountRecord,
  onUpdated: () => void,
) {
  const [name, setName] = useState(account.name);
  const [balance, setBalance] = useState(String(account.balance));
  const [type, setType] = useState<AccountApiType>(account.type);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = name.trim().length > 0 && balance.trim().length > 0;

  async function submit() {
    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await updateAccount({
        idAccount: account.id_account,
        name: name.trim(),
        balance: Number(balance),
        type,
      });
      onUpdated();
    } catch {
      setError("Failed to update account");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    name,
    setName,
    balance,
    setBalance,
    type,
    setType,
    canSubmit,
    isSubmitting,
    error,
    submit,
  };
}
