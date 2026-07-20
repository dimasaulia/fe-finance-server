import { endpoints } from "@/config/endpoints.config";
import { envConfig } from "@/config/env.config";
import { apiClient } from "@/modules/http/api-client";
import type { AccountRecord } from "../types/home.type";

type AccountListResponse = {
  data: AccountRecord[];
  message: string;
  success: boolean;
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
