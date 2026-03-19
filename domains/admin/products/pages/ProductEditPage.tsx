"use client";

import { useParams } from "next/navigation";

export function ProductEditPage() {
  const params = useParams();

  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold">Edit product {params.id}</div>

      {/* тут скоро буде Form reuse */}
    </div>
  );
}
