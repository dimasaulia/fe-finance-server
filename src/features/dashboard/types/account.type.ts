export type AccountApiType = "BANK" | "EWALLET" | "INVESTATION" | "OTHER";

export type AccountRecord = {
  id_account: number;
  name: string;
  balance: number;
  type: AccountApiType;
};
