"use client";

import { ArrowLeft } from "lucide-react";

type Props = {
  onBack: () => void;
  title?: string;
  subtitle?: string;
};

export function AdvancedAddHeader({
  onBack,
  title = "Додати в план",
  subtitle = "Налаштуйте параметри перед додаванням",
}: Props) {
  return (
    <div className="bg-white border-b px-4 py-3 space-y-2">
      {/* TOP ROW */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full border bg-white active:scale-95"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="text-sm font-semibold text-gray-900">{title}</div>
      </div>

      {/* SUBTITLE */}
      <div className="text-xs text-gray-500 ml-11">{subtitle}</div>
    </div>
  );
}
