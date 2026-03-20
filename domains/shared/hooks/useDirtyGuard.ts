"use client";

import { useEffect } from "react";

type Options = {
  enabled: boolean;
};

export function useDirtyGuard({ enabled }: Options) {
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [enabled]);
}
