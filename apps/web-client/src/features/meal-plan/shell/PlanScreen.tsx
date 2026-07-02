"use client";

import PlanHeader from "@/features/meal-plan/shell/PlanHeader";
import PlanControls from "@/features/meal-plan/shell/PlanControls";
import PlanContent from "@/features/meal-plan/shell/PlanContent";

export default function PlanScreen() {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-gray-50">
      <PlanHeader />
      <PlanControls />
      <main className="flex-1 min-h-0 overflow-y-auto overscroll-contain pb-24">
        <PlanContent />
      </main>
    </div>
  );
}
