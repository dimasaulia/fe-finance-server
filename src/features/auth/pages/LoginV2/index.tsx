"use client";

import { Suspense } from "react";
import { LoginFormSection } from "./sections/LoginFormSection";
import { LoginHeroSection } from "./sections/LoginHeroSection";

function LoginV2Content() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-app-bg px-5 py-10 font-heading">
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

      <div className="relative w-full max-w-[420px]">
        <LoginHeroSection />
        <LoginFormSection />
      </div>
    </div>
  );
}

export function LoginV2() {
  return (
    <Suspense fallback={null}>
      <LoginV2Content />
    </Suspense>
  );
}
