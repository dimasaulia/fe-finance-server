import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { envConfig } from "@/config/env.config";
import { PreferencesProvider } from "@/modules/preferences";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const title = "FinApp — Personal Finance Workspace";
const description =
  "Track your accounts, transactions, and net worth in one place.";

export const metadata: Metadata = {
  metadataBase: new URL(envConfig.appUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// Applies the stored theme before hydration so there is no flash of the
// wrong theme. Kept as a plain string (not a TS import) because it must run
// as an inline, un-bundled script tag.
const themeInitScript = `
(function () {
  try {
    var theme = window.localStorage.getItem("opensuite.theme");
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}
