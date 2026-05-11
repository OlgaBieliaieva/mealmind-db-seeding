"use client";

import { Suspense } from "react";
import AdvancedAddPage from "@/features/meal-plan/add/advanced/components/AdvancedAddPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdvancedAddPage />
    </Suspense>
  );
}
