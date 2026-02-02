"use client";

import { useState } from "react";
import { RecipeCreatePayload } from "@/types/recipe";

export default function AdminRecipeCreatePage() {
  const [form, setForm] = useState<RecipeCreatePayload>({
    title: "",
    description: "",
    recipe_type_id: null,

    base_servings: 1,
    base_output_weight_g: 0,
    container_weight_g: null,

    visibility: "private",
    status: "ready",
    family_id: null,
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    try {
      await fetch("/api/admin/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // redirect or toast — пізніше
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-xl font-semibold">Create recipe</h1>

      {/* Basic info */}
      <div className="space-y-2">
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Recipe title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full rounded border px-3 py-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* Portions */}
      <div className="grid grid-cols-3 gap-3">
        <input
          type="number"
          min={1}
          className="rounded border px-3 py-2"
          placeholder="Servings"
          value={form.base_servings}
          onChange={(e) =>
            setForm({
              ...form,
              base_servings: Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          min={0}
          className="rounded border px-3 py-2"
          placeholder="Output weight (g)"
          value={form.base_output_weight_g}
          onChange={(e) =>
            setForm({
              ...form,
              base_output_weight_g: Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          min={0}
          className="rounded border px-3 py-2"
          placeholder="Container weight (g)"
          value={form.container_weight_g ?? ""}
          onChange={(e) =>
            setForm({
              ...form,
              container_weight_g: Number(e.target.value),
            })
          }
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded bg-black px-4 py-2 text-white"
        >
          Save recipe
        </button>

        <button type="button" className="rounded border px-4 py-2">
          Cancel
        </button>
      </div>
    </div>
  );
}
