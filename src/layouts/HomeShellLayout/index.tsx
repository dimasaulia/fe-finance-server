type HomeShellLayoutProps = {
  children: React.ReactNode;
};

export function HomeShellLayout({ children }: HomeShellLayoutProps) {
  return <main className="min-h-dvh bg-app-bg">{children}</main>;
}
