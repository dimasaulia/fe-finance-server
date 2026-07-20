import { endpoints } from "@/config/endpoints.config";
import { envConfig } from "@/config/env.config";
import { apiClient } from "@/modules/http/api-client";
import { isoDateToApiDate } from "@/shared/utils/date";
import type { TransactionRecord, TransactionType } from "../types/transaction.type";

type TransactionListResponse = {
  // The API returns `null` (not `[]`) when nothing matches the filters.
  data: TransactionRecord[] | null;
  message: string;
  success: boolean;
};

type TransactionMutateResponse = {
  message: string;
  success: boolean;
};

type GetTransactionListParams = {
  idAccount: number;
  page?: number;
  record?: number;
  /** Inclusive date filters, formatted "YYYY-MM-DD" — converted to the API's "DD-MM-YYYY" internally. */
  startDate?: string;
  endDate?: string;
};

type CreateTransactionInput = {
  idAccount: number;
  transactionType: TransactionType;
  transactionGroup: string;
  amount: number;
  description: string;
  /** Destination account id — only set for transfers between accounts. */
  idTransactionDestination?: number;
};

type CreateSubTransactionInput = {
  idTransaction: number;
  transactionType: TransactionType;
  transactionGroup: string;
  amount: number;
  description: string;
  /** Only used to redirect leftover amounts to another transaction — always null for now. */
  idTransactionDestination?: number | null;
};

export async function getTransactionList(
  params: GetTransactionListParams,
): Promise<TransactionRecord[]> {
  const { idAccount, page = 1, record = 50, startDate, endDate } = params;

  const query = new URLSearchParams({
    record: String(record),
    "id-account": String(idAccount),
    page: String(page),
  });

  if (startDate) {
    query.set("start-date", isoDateToApiDate(startDate));
  }

  if (endDate) {
    query.set("end-date", isoDateToApiDate(endDate));
  }

  const response = await apiClient<TransactionListResponse>(
    `${endpoints.transaction.list}?${query.toString()}`,
    { baseUrl: envConfig.financeServiceUrl },
  );

  return response.data ?? [];
}

export async function createTransaction(
  input: CreateTransactionInput,
): Promise<void> {
  await apiClient<TransactionMutateResponse>(endpoints.transaction.create, {
    baseUrl: envConfig.financeServiceUrl,
    body: JSON.stringify({
      id_account: input.idAccount,
      transaction_type: input.transactionType,
      transaction_group: input.transactionGroup,
      amount: input.amount,
      description: input.description,
      ...(input.idTransactionDestination !== undefined
        ? { id_transaction_destination: input.idTransactionDestination }
        : {}),
    }),
    method: "POST",
  });
}

export async function createSubTransaction(
  input: CreateSubTransactionInput,
): Promise<void> {
  await apiClient<TransactionMutateResponse>(endpoints.subTransaction.create, {
    baseUrl: envConfig.financeServiceUrl,
    body: JSON.stringify({
      id_transaction: input.idTransaction,
      transaction_type: input.transactionType,
      transaction_group: input.transactionGroup,
      id_transaction_destination: input.idTransactionDestination ?? null,
      amount: input.amount,
      description: input.description,
    }),
    method: "POST",
  });
}
