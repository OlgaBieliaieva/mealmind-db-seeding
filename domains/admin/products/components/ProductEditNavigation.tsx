// TODO DELETE after refactor
"use client";

import { useFormContext } from "react-hook-form";
import { useConfirmNavigation } from "@/domains/shared/hooks/useConfirmNavigation";

export function ProductEditNavigation() {
  const {
    formState: { isDirty },
  } = useFormContext();

  const nav = useConfirmNavigation(isDirty);

  return (
    <button onClick={() => nav.back()} className="text-sm text-gray-500 mb-2">
      ← Назад
    </button>
  );
}
