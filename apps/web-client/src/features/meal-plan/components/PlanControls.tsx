"use client";

import { usePlanParams } from "../hooks/usePlanParams";
import { ViewModeSwitch } from "./ViewModeSwitch";

export default function PlanControls() {
  const { viewMode, setViewMode } = usePlanParams();

  return (
    <div className="px-4 pt-2 pb-2 border-b bg-white">
      <ViewModeSwitch value={viewMode} onChange={setViewMode} />
    </div>
  );
}