import type { AccountApiType } from "../types/account.type";

export const accountTypeVisuals: Record<
  AccountApiType,
  { emoji: string; iconBg: string }
> = {
  BANK: { emoji: "\u{1F3E6}", iconBg: "rgba(16,185,129,0.16)" },
  EWALLET: { emoji: "\u{1F4F1}", iconBg: "rgba(14,165,233,0.14)" },
  INVESTATION: { emoji: "\u{1F4C8}", iconBg: "rgba(139,92,246,0.14)" },
  OTHER: { emoji: "\u{1F4B0}", iconBg: "rgba(251,191,36,0.18)" },
};
