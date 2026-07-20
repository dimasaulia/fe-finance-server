export const endpoints = {
  auth: {
    session: "/auth/session",
    login: "/api/user/v1/login",
    logout: "/auth/logout",
  },
  authorization: {
    snapshot: "/authorization/access-snapshot",
    menus: "/authorization/menus",
  },
  user: {
    list: "/users",
    detail: (id: string) => `/users/${id}`,
  },
  account: {
    list: "/api/account/v1",
    create: "/api/account/v1",
  },
} as const;
