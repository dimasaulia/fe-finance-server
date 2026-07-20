"use client";

import { Suspense, useState } from "react";
import { AddAccountSheet } from "./components/AddAccountSheet";
import { AddMenuSheet } from "./components/AddMenuSheet";
import { AddTransactionSheet } from "./components/AddTransactionSheet";
import { ProfileSheet } from "./components/ProfileSheet";
import { useHomeSheets } from "./hooks/useHomeSheets";
import { HomeBottomNav } from "./sections/HomeBottomNav";
import { HomeHeader } from "./sections/HomeHeader";
import { LiquidityChips } from "./sections/LiquidityChips";
import { NetWorthHero } from "./sections/NetWorthHero";
import { PortfolioList } from "./sections/PortfolioList";
import { QuickActions } from "./sections/QuickActions";
import { WeeklyCashFlowCard } from "./sections/WeeklyCashFlowCard";

function DashboardHomeV2Content() {
  const sheets = useHomeSheets();
  const [accountsRefreshKey, setAccountsRefreshKey] = useState(0);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-app-bg font-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-16 h-[300px] w-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(52,211,153,0.45), rgba(52,211,153,0) 70%)",
          animation: "blob-float 9s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 -right-24 h-[280px] w-[280px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(45,212,191,0.38), rgba(45,212,191,0) 70%)",
          animation: "blob-float-alt 11s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[340px] -left-[70px] h-[240px] w-[240px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(167,243,208,0.5), rgba(167,243,208,0) 70%)",
          animation: "blob-float 13s ease-in-out infinite",
        }}
      />

      <div className="relative mx-auto max-w-[420px] px-5 pt-6 pb-32">
        <HomeHeader onOpenProfile={sheets.openProfile} />
        <NetWorthHero />
        <LiquidityChips />
        <QuickActions />
        <WeeklyCashFlowCard />
        <PortfolioList refreshKey={accountsRefreshKey} />
      </div>

      <HomeBottomNav onAdd={sheets.openMenu} />

      <AddMenuSheet
        onClose={sheets.close}
        onOpenAccount={sheets.openAccount}
        onOpenTransaction={sheets.openTransaction}
        open={sheets.activeSheet === "menu"}
      />
      <ProfileSheet onClose={sheets.close} open={sheets.activeSheet === "profile"} />
      <AddTransactionSheet
        onClose={sheets.close}
        onCreated={() => setAccountsRefreshKey((key) => key + 1)}
        onTxTypeChange={sheets.setTxType}
        open={sheets.activeSheet === "transaction"}
        txType={sheets.txType}
      />
      <AddAccountSheet
        onClose={sheets.close}
        onCreated={() => setAccountsRefreshKey((key) => key + 1)}
        open={sheets.activeSheet === "account"}
      />
    </div>
  );
}

export function DashboardHomeV2() {
  return (
    <Suspense fallback={null}>
      <DashboardHomeV2Content />
    </Suspense>
  );
}
