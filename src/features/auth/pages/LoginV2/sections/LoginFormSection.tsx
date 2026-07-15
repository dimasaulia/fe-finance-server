import { usePreferences } from "@/modules/preferences";
import { GlassCard } from "@/shared/components/GlassCard";
import { useLoginForm } from "../hooks/useLoginForm";

export function LoginFormSection() {
  const { t } = usePreferences();
  const {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    hasError,
    submitting,
    handleSubmit,
  } = useLoginForm();

  return (
    <GlassCard
      animationDelay="0.1s"
      className="mt-7 w-full p-6 shadow-[0_10px_26px_-14px_rgba(6,78,59,0.2)]"
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="block" htmlFor="username">
          <span className="text-[11px] font-bold tracking-[2px] text-text-secondary">
            {t("login.username").toUpperCase()}
          </span>
          <div className="mt-2 flex items-center gap-2.5 rounded-[20px] border border-border-subtle bg-surface px-3.5">
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
              autoComplete="username"
              className="flex-1 border-none bg-transparent py-3.5 font-numeric text-[13px] text-text-primary outline-none"
              id="username"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              placeholder={t("login.usernamePlaceholder")}
              type="text"
              value={username}
            />
          </div>
        </label>

        <label className="block" htmlFor="password">
          <span className="text-[11px] font-bold tracking-[2px] text-text-secondary">
            {t("login.password").toUpperCase()}
          </span>
          <div className="mt-2 flex items-center gap-2.5 rounded-[20px] border border-border-subtle bg-surface px-3.5">
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
              <rect height="11" rx="3" width="18" x="3" y="11" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              autoComplete="current-password"
              className="flex-1 border-none bg-transparent py-3.5 font-numeric text-[13px] text-text-primary outline-none"
              id="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t("login.passwordPlaceholder")}
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="flex-none text-text-tertiary"
              onClick={toggleShowPassword}
              type="button"
            >
              {showPassword ? (
                <svg
                  fill="none"
                  height="17"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                  width="17"
                >
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  fill="none"
                  height="17"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                  width="17"
                >
                  <path d="M3 3l18 18" />
                  <path d="M10.6 10.6a3 3 0 0 0 4.2 4.2" />
                  <path d="M6.6 6.6C4 8.3 2 12 2 12s3.5 7 10 7c1.9 0 3.5-.6 4.8-1.4M9.9 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a15.8 15.8 0 0 1-2.2 3.2" />
                </svg>
              )}
            </button>
          </div>
        </label>

        {hasError && (
          <p className="rounded-[14px] bg-danger-bg px-3.5 py-2.5 text-[12.5px] font-semibold text-danger">
            {t("login.error.invalid")}
          </p>
        )}

        <button
          className="mt-1 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-brand-500 to-brand-600 p-4 text-[15px] font-bold text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.45),inset_0_-3px_6px_rgba(6,78,59,0.35),0_16px_32px_-10px_rgba(13,148,136,0.55)] transition-transform active:scale-[0.97] disabled:opacity-70"
          disabled={submitting}
          type="submit"
        >
          {submitting ? t("login.submitting") : t("login.submit")}
        </button>

        <p className="text-center font-numeric text-[11px] text-text-tertiary">
          {t("login.demoHint")}
        </p>
      </form>
    </GlassCard>
  );
}
