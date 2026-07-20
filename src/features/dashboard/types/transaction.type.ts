export type TransactionType = "DEBIT" | "CREDIT";

/** Mirrors Go's sql.NullInt64 JSON shape used for nullable id references. */
export type NullableId = {
  Int64: number;
  Valid: boolean;
};

export type TransactionRecord = {
  id_transaction: number;
  transaction_code: string;
  transaction_type: TransactionType;
  amount: number;
  balance_before: number;
  balance_after: number;
  description: string;
  created_at: string;
  is_have_parent_transaction: number;
  id_parent_transaction: NullableId;
  is_have_child_transaction: number;
  id_child_transaction: NullableId;
  id_transaction_group: number;
  transaction_name: string;
  id_account: number;
  account_name: string;
};
