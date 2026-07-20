"use client";

import { useState } from "react";
import { createAccount } from "../services/account.service";
import type { AccountApiType } from "../types/home.type";

const DEFAULT_TYPE: AccountApiType = "BANK";

export function useAddAccountForm(onCreated: () => void) {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [type, setType] = useState<AccountApiType>(DEFAULT_TYPE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = name.trim().length > 0 && balance.trim().length > 0;

  function reset() {
    setName("");
    setBalance("");
    setType(DEFAULT_TYPE);
    setError(null);
  }

  async function submit() {
    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createAccount({
        name: name.trim(),
        balance: Number(balance),
        type,
      });
      reset();
      onCreated();
    } catch {
      setError("Failed to create account");
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
    reset,
  };
}
