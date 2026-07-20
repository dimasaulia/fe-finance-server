import { endpoints } from "@/config/endpoints.config";
import { envConfig } from "@/config/env.config";
import { apiClient } from "@/modules/http/api-client";
import type { TransactionType } from "../types/home.type";

type TransactionCreateResponse = {
  message: string;
  success: boolean;
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

export async function createTransaction(
  input: CreateTransactionInput,
): Promise<void> {
  await apiClient<TransactionCreateResponse>(endpoints.transaction.create, {
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
