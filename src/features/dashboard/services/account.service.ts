import { endpoints } from "@/config/endpoints.config";
import { envConfig } from "@/config/env.config";
import { apiClient } from "@/modules/http/api-client";
import type { AccountApiType, AccountRecord } from "../types/account.type";

type AccountListResponse = {
  data: AccountRecord[];
  message: string;
  success: boolean;
};

type AccountMutateResponse = {
  data: AccountRecord;
  message: string;
  success: boolean;
};

type CreateAccountInput = {
  name: string;
  balance: number;
  type: AccountApiType;
};

type UpdateAccountInput = {
  idAccount: number;
  name: string;
  balance: number;
  type: AccountApiType;
};

type GetAccountListParams = {
  search?: string;
  page?: number;
  record?: number;
  sort?: "asc" | "desc";
};

export async function getAccountList(
  params: GetAccountListParams = {},
): Promise<AccountRecord[]> {
  const { search = "", page = 1, record = 4, sort = "asc" } = params;

  const query = new URLSearchParams({
    search,
    page: String(page),
    record: String(record),
    sort,
  });

  const response = await apiClient<AccountListResponse>(
    `${endpoints.account.list}?${query.toString()}`,
    { baseUrl: envConfig.financeServiceUrl },
  );

  return response.data;
}

export async function getAccountDetail(
  idAccount: number,
): Promise<AccountRecord | null> {
  const query = new URLSearchParams({
    search: "",
    page: "1",
    record: "1",
    sort: "asc",
    "id-account": String(idAccount),
  });

  const response = await apiClient<AccountListResponse>(
    `${endpoints.account.list}?${query.toString()}`,
    { baseUrl: envConfig.financeServiceUrl },
  );

  return response.data[0] ?? null;
}

export async function createAccount(
  input: CreateAccountInput,
): Promise<AccountRecord> {
  const response = await apiClient<AccountMutateResponse>(
    endpoints.account.create,
    {
      baseUrl: envConfig.financeServiceUrl,
      body: JSON.stringify({
        name: input.name,
        Balance: input.balance,
        Type: input.type,
      }),
      method: "POST",
    },
  );

  return response.data;
}

export async function updateAccount(
  input: UpdateAccountInput,
): Promise<AccountRecord> {
  const response = await apiClient<AccountMutateResponse>(
    endpoints.account.update,
    {
      baseUrl: envConfig.financeServiceUrl,
      body: JSON.stringify({
        id_account: input.idAccount,
        name: input.name,
        Balance: input.balance,
        Type: input.type,
      }),
      method: "PUT",
    },
  );

  return response.data;
}

export async function deleteAccount(idAccount: number): Promise<void> {
  await apiClient<{ message: string; success: boolean }>(
    endpoints.account.delete(idAccount),
    {
      baseUrl: envConfig.financeServiceUrl,
      method: "DELETE",
    },
  );
}
