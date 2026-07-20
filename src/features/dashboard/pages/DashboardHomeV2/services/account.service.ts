import { endpoints } from "@/config/endpoints.config";
import { envConfig } from "@/config/env.config";
import { apiClient } from "@/modules/http/api-client";
import type { AccountApiType, AccountRecord } from "../types/home.type";

type AccountListResponse = {
  data: AccountRecord[];
  message: string;
  success: boolean;
};

type AccountCreateResponse = {
  data: AccountRecord;
  message: string;
  success: boolean;
};

type CreateAccountInput = {
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

export async function createAccount(
  input: CreateAccountInput,
): Promise<AccountRecord> {
  const response = await apiClient<AccountCreateResponse>(
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
