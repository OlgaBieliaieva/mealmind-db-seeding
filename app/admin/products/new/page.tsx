"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductFormSchema,
  ProductFormValues,
} from "@/types/product-form.schema";
import { useState } from "react";
import { mapProductFormToProductInput } from "@/lib/mappers/productFormToProductInput.mapper";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      type: "branded",
    },
  });

  async function onSubmit(values: ProductFormValues) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const payload = mapProductFormToProductInput(values);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Add product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* name_en */}
        <div>
          <label className="block text-sm font-medium">Name (EN)</label>
          <input
            {...register("name_en")}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.name_en && (
            <p className="text-sm text-red-600">{errors.name_en.message}</p>
          )}
        </div>

        {/* name_ua */}
        <div>
          <label className="block text-sm font-medium">Name (UA)</label>
          <input
            {...register("name_ua")}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.name_ua && (
            <p className="text-sm text-red-600">{errors.name_ua.message}</p>
          )}
        </div>

        {/* type */}
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            {...register("type")}
            className="mt-1 w-full rounded border px-3 py-2"
          >
            <option value="branded">Branded</option>
            <option value="generic">Generic</option>
          </select>
        </div>

        {/* unit */}
        <div>
          <label className="block text-sm font-medium">Unit</label>
          <select
            {...register("unit")}
            className="mt-1 w-full rounded border px-3 py-2"
          >
            <option value="g">g</option>
            <option value="ml">ml</option>
            <option value="pcs">pcs</option>
          </select>
          {errors.unit && (
            <p className="text-sm text-red-600">{errors.unit.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save product"}
        </button>

        {success && (
          <p className="text-sm text-green-600">Product created successfully</p>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}
