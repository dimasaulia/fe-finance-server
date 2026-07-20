export const envConfig = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  apiGatewayUrl: process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? "",
  financeServiceUrl: process.env.NEXT_PUBLIC_FINANCE_SERVICE_URL ?? "",
  authUrl: process.env.NEXT_PUBLIC_AUTH_URL ?? "",
  authorizationUrl: process.env.NEXT_PUBLIC_AUTHORIZATION_URL ?? "",
  fileUrl: process.env.NEXT_PUBLIC_FILE_URL ?? "",
  notificationUrl: process.env.NEXT_PUBLIC_NOTIFICATION_URL ?? "",
} as const;
