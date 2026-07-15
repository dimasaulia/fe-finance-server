"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { routes } from "@/config/routes.config";
import { useSession } from "@/modules/auth/hooks/useSession";
import { validateCredentials } from "@/modules/auth/services/session.service";

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setHasError(false);

    if (!validateCredentials(username, password)) {
      setHasError(true);
      setSubmitting(false);
      return;
    }

    login({ username });
    const redirectTo = searchParams.get("redirect") ?? routes.financeHome;
    router.replace(redirectTo);
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    toggleShowPassword: () => setShowPassword((value) => !value),
    hasError,
    submitting,
    handleSubmit,
  };
}
