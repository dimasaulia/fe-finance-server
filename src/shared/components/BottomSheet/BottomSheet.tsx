"use client";

import { useEffect } from "react";

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Positions/sizes the sheet panel itself, e.g. "inset-x-0 bottom-0 rounded-t-[36px]". */
  panelClassName?: string;
  showHandle?: boolean;
};

export function BottomSheet({
  open,
  onClose,
  children,
  panelClassName = "inset-x-3 bottom-3 rounded-[32px]",
  showHandle = true,
}: BottomSheetProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-20 bg-scrim backdrop-blur-[3px]"
        onClick={onClose}
        style={{ animation: "fade-in 0.2s ease both" }}
      />
      {/*
       * Centers a column the same width as the page content (max-w-[420px])
       * so the sheet lines up with it instead of spanning the full viewport
       * on wide/desktop screens. `panelClassName` positions itself (inset-x,
       * bottom, top, ...) relative to this column, not the raw viewport.
       */}
      <div className="pointer-events-none fixed inset-y-0 left-1/2 z-30 w-full max-w-[420px] -translate-x-1/2">
        <div
          aria-modal="true"
          className={`pointer-events-auto absolute flex flex-col overflow-hidden bg-surface-sheet font-heading ${panelClassName}`}
          role="dialog"
          style={{
            animation: "sheet-up 0.32s cubic-bezier(0.2, 0.9, 0.3, 1) both",
          }}
        >
          {showHandle && (
            <div className="mx-auto mt-3 h-[5px] w-11 flex-none rounded-full bg-border-glass" />
          )}
          {children}
        </div>
      </div>
    </>
  );
}
