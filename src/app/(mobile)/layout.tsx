import { HomeShellLayout } from "@/layouts/HomeShellLayout";

export default function MobileRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HomeShellLayout>{children}</HomeShellLayout>;
}
