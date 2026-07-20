import { envConfig } from "@/config/env.config";
import { routes } from "@/config/routes.config";
import {
  clearAuthToken,
  getAuthToken,
} from "@/modules/auth/services/session.service";
import { clearUserProfile } from "@/modules/auth/services/user-profile.service";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = RequestInit & {
  baseUrl?: string;
  /** Skip attaching the stored bearer token, e.g. for the login call itself. */
  skipAuth?: boolean;
};

async function parseJsonSafely(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function extractErrorMessage(body: unknown, status: number): string {
  if (
    body &&
    typeof body === "object" &&
    "message" in body &&
    typeof (body as { message: unknown }).message === "string"
  ) {
    return (body as { message: string }).message;
  }

  return `Request failed with status ${status}`;
}

// A 403 means the stored token is no longer valid for this account (expired,
// revoked, ...). There's no recovering from that client-side, so every
// caller gets the same behavior for free: wipe local auth state and send
// the user back to the login page.
function forceLogout() {
  clearAuthToken();
  clearUserProfile();

  if (typeof window !== "undefined") {
    window.location.href = routes.login;
  }
}

export async function apiClient<TResponse>(
  path: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const {
    baseUrl = envConfig.apiGatewayUrl,
    skipAuth = false,
    headers,
    ...requestOptions
  } = options;

  const authHeaders: HeadersInit = {};

  if (!skipAuth) {
    const token = getAuthToken();

    if (token) {
      authHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...headers,
    },
  });

  if (response.status === 403) {
    forceLogout();
    throw new ApiError(403, "Session expired. Please sign in again.");
  }

  const body = await parseJsonSafely(response);

  if (!response.ok) {
    throw new ApiError(response.status, extractErrorMessage(body, response.status));
  }

  return body as TResponse;
}
