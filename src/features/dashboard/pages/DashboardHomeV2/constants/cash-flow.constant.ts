import type { CashFlowBar } from "../types/home.type";

export const weeklyCashFlow: CashFlowBar[] = [
  { dayKey: "mon", heightPct: 40, positive: true },
  { dayKey: "tue", heightPct: 65, positive: true },
  { dayKey: "wed", heightPct: 30, positive: false },
  { dayKey: "thu", heightPct: 80, positive: true },
  { dayKey: "fri", heightPct: 55, positive: true },
  { dayKey: "sat", heightPct: 20, positive: false },
  { dayKey: "sun", heightPct: 45, positive: true },
];
