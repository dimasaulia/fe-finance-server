import { endpoints } from "@/config/endpoints.config";
import { envConfig } from "@/config/env.config";
import { apiClient } from "@/modules/http/api-client";
import {
  clearAuthToken,
  setAuthToken,
} from "@/modules/auth/services/session.service";
import {
  clearUserProfile,
  setUserProfile,
  type UserProfile,
} from "@/modules/auth/services/user-profile.service";

type LoginResponse = {
  data: UserProfile & { token: string };
  message: string;
};

export async function login(
  usernameOrEmail: string,
  password: string,
): Promise<UserProfile> {
  const response = await apiClient<LoginResponse>(endpoints.auth.login, {
    baseUrl: envConfig.financeServiceUrl,
    body: JSON.stringify({
      username_or_email: usernameOrEmail,
      password,
    }),
    method: "POST",
    skipAuth: true,
  });

  const { token, ...profile } = response.data;

  if (!token) {
    // The API responded 200 but didn't hand back a token — there's nothing
    // usable to keep around, so treat it the same as a failed login.
    clearAuthToken();
    clearUserProfile();
    throw new Error("Login response did not include an auth token.");
  }

  setAuthToken(token);
  setUserProfile(profile);

  return profile;
}

export function logout() {
  clearAuthToken();
  clearUserProfile();
}
