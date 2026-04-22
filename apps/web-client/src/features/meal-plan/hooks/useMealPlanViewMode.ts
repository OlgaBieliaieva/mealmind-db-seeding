"use client";

import { useState } from "react";
import { ViewMode } from "@/shared/types/meal-plan.types";

export function useMealPlanViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>("meal");

  return {
    viewMode,
    setViewMode,
  };
}
