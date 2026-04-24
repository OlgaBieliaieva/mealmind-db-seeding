"use client";

import { usePlanParams } from "../hooks/usePlanParams";
import { ViewModeSwitch } from "./ViewModeSwitch";
import { MultiDayToggle } from "./MultiDayToggle";

export default function PlanControls() {
  const { viewMode, setViewMode, isMulti, toggleMulti } = usePlanParams();

  return (
    <div className="px-4 py-2 border-b bg-white flex items-center justify-between">
      <MultiDayToggle value={isMulti} onChange={toggleMulti} />

      <ViewModeSwitch value={viewMode} onChange={setViewMode} />
    </div>
  );
}
