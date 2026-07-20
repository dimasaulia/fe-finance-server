export const routes = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  financeHome: "/home",
  users: "/users",
  settings: "/settings",
  account: "/account",
  accountDetail: (id: number | string) => `/account/${id}`,
} as const;
