export type AccountApiType = "BANK" | "EWALLET" | "INVESTATION" | "OTHER";

export type AccountRecord = {
  id_account: number;
  name: string;
  balance: number;
  type: AccountApiType;
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

export type TransactionType = "DEBIT" | "CREDIT";

export type HomeSheet = "menu" | "profile" | "transaction" | "account" | null;
