export type Account = {
  id: string;
  emoji: string;
  iconBg: string;
  name: string;
  balance: string;
};

export type Portfolio = {
  id: string;
  emoji: string;
  iconBg: string;
  name: string;
  sub: string;
  amount: string;
  trend: string;
  trendUp: boolean | null;
};

export type QuickActionId = "transfer" | "topUp" | "pay" | "more";

export type QuickAction = {
  id: QuickActionId;
  emoji: string;
  bg: string;
};

export type WeekdayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type CashFlowBar = {
  dayKey: WeekdayKey;
  heightPct: number;
  positive: boolean;
};

export type TxType = "expense" | "income" | "transfer" | "receivable";

export type HomeSheet = "menu" | "profile" | "transaction" | null;
