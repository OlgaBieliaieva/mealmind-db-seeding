"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductFormSchema,
  ProductFormValues,
} from "@/types/product-form.schema";
import { useState } from "react";
import { mapProductFormToProductInput } from "@/lib/mappers/productFormToProductInput.mapper";
import { useBrands } from "@/lib/hooks/useBrands";
import { Brand } from "@/types/brand";
import { GenericProduct } from "@/types/generic-product";
import { GenericProductSearch } from "@/components/GenericProductSearch";
import { BarcodeInput } from "@/components/BarcodeInput";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [parentProduct, setParentProduct] = useState<GenericProduct | null>(
    null,
  );
  const { brands, loading: brandsLoading } = useBrands();
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      type: "branded",
    },
  });
  const type = watch("type");

  async function onSubmit(values: ProductFormValues) {
    console.log("FORM VALUES", values);
    setLoading(true);
    setError(null);
    setSuccess(false);
    let selectedBrand: Brand | undefined;

    // 1. Existing brand
    if (
      values.type === "branded" &&
      values.brand_id &&
      values.brand_id !== "__new__"
    ) {
      selectedBrand = brands.find((b) => b.brand_id === values.brand_id);
    }

    // 2. Create new brand
    if (values.type === "branded" && values.brand_id === "__new__") {
      const res = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: {
            en: values.new_brand_name_en,
            ua: values.new_brand_name_ua,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create brand");
      }

      // ⬅️ ВАЖЛИВО: формуємо brand одразу
      selectedBrand = {
        brand_id: data.brand_id,
        name: {
          en: values.new_brand_name_en!,
          ua: values.new_brand_name_ua!,
        },
      };
    }

    // 3. Build product payload
    const payload = mapProductFormToProductInput(values, selectedBrand);

    // 4. Create product
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

        {/* brand */}
        {type === "branded" && (
          <div>
            <label className="block text-sm font-medium">Brand</label>

            {brandsLoading ? (
              <p className="text-sm text-gray-500">Loading brands...</p>
            ) : (
              <select
                {...register("brand_id")}
                className="mt-1 w-full rounded border px-3 py-2"
              >
                <option value="">Select brand</option>

                {brands.map((brand) => (
                  <option key={brand.brand_id} value={brand.brand_id}>
                    {brand.name.en}
                  </option>
                ))}

                <option value="__new__">➕ Add new brand</option>
              </select>
            )}
            {watch("brand_id") === "__new__" && (
              <div className="space-y-2 rounded border p-3">
                <p className="text-sm font-medium">New brand</p>

                <input
                  {...register("new_brand_name_en", { required: true })}
                  placeholder="Brand name (EN)"
                  className="w-full rounded border px-3 py-2"
                />

                <input
                  {...register("new_brand_name_ua", { required: true })}
                  placeholder="Brand name (UA)"
                  className="w-full rounded border px-3 py-2"
                />
              </div>
            )}
          </div>
        )}

        {/* parent product */}
        {watch("type") === "branded" && (
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Parent generic product
            </label>

            <GenericProductSearch
              value={parentProduct}
              onSelect={(product) => {
                setParentProduct(product);
                setValue(
                  "parent_product_id",
                  product ? product.product_id : undefined,
                );
              }}
            />
          </div>
        )}

        {type === "branded" && (
          <BarcodeInput value={watch("barcode")} setValue={setValue} />
        )}

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
