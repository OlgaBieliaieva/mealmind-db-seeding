"use client";

// SECTION ███ PRODUCT FORM HOOK ███
// WHY: інкапсулює всю логіку форми

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  ProductFormSchema,
  ProductFormValues,
} from "../schemas/product-form.schema";

export function useProductForm() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),

    defaultValues: {
      type: "branded",

      unit: "g",

      is_verified: false,
    },
  });

  async function onSubmit(values: ProductFormValues) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/v2/products", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to create product");

      setSuccess(true);

      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return {
    form,

    loading,

    error,

    success,

    onSubmit,
  };
}
