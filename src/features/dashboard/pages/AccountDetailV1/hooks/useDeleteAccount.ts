"use client";

import { useState } from "react";
import { deleteAccount } from "@/features/dashboard/services/account.service";

export function useDeleteAccount(accountId: number, onDeleted: () => void) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deleteAccount(accountId);
      onDeleted();
    } catch {
      setError("Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  }

  return { isDeleting, error, submit };
}
