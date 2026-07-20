"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { routes } from "@/config/routes.config";
import { useSession } from "@/modules/auth/hooks/useSession";
import { ApiError } from "@/modules/http/api-client";
import { usePreferences } from "@/modules/preferences";

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useSession();
  const { t } = usePreferences();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      await login(username, password);
      const redirectTo = searchParams.get("redirect") ?? routes.financeHome;
      router.replace(redirectTo);
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(t("login.error.network"));
      }
      setSubmitting(false);
    }
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    toggleShowPassword: () => setShowPassword((value) => !value),
    errorMessage,
    submitting,
    handleSubmit,
  };
}
