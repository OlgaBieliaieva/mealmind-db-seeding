"use client";

import { Info, X } from "lucide-react";
import { useState } from "react";

type Props = {
  title: string;
  description: string;
  align?: "left" | "right";
  side?: "top" | "bottom";
  offsetClassName?: string;
};

export function InfoTooltip({
  title,
  description,
  align = "left",
  side = "bottom",
  offsetClassName = "",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={`Пояснення: ${title}`}
        onClick={() => setOpen((value) => !value)}
        className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50"
      >
        <Info size={14} />
      </button>

      {open ? (
        <div
          className={`absolute z-20 w-[min(14rem,calc(100vw-3rem))] rounded-2xl border border-gray-200 bg-white p-3 shadow-lg ${
            side === "bottom" ? "top-8" : "bottom-8"
          } ${
            align === "right" ? "right-0" : "left-0"
          } ${offsetClassName}`}
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <div className="text-sm font-medium text-gray-900">{title}</div>

            <button
              type="button"
              aria-label="Закрити пояснення"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </div>

          <div className="text-xs leading-5 text-gray-500">{description}</div>
        </div>
      ) : null}
    </div>
  );
}
