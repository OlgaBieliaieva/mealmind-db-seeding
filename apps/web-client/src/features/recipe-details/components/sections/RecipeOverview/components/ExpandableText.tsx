"use client";

import { useState } from "react";

export function ExpandableText({
  text,
  lines = 3,
}: {
  text: string;
  lines?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p
        className={`text-sm text-gray-700 leading-relaxed whitespace-pre-line ${
          expanded ? "" : `line-clamp-${lines}`
        }`}
      >
        {text}
      </p>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="text-xs text-green-600 mt-1"
      >
        {expanded ? "Згорнути" : "Читати далі"}
      </button>
    </div>
  );
}
