"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ProductFormSchema,
  ProductFormValues,
} from "@/types/product-form.schema";

import { mapProductFormToProductInput } from "@/lib/mappers/productFormToProductInput.mapper";
import { useBrands } from "@/lib/hooks/useBrands";
import { useCategories } from "@/lib/hooks/useCategories";

import { CategorySelect } from "@/components/CategorySelect";
import { SubcategorySelect } from "@/components/SubcategorySelect";
import { findCategoryById } from "@/lib/categories.find";
import { GenericProductSearch } from "@/components/GenericProductSearch";
import { BarcodeInput } from "@/components/BarcodeInput";
import { ProductPhotoUploader } from "@/components/ProductPhotoUploader";

import { Brand } from "@/types/brand";
import { GenericProduct } from "@/types/generic-product";
import { useNutrientsReference } from "@/lib/hooks/useNutrientsReference";
import { NutrientsEditor } from "@/components/NutrientsEditor";

const defaultProductFormValues: ProductFormValues = {
  name_en: "",
  name_ua: "",
  type: "branded",
  unit: "g",

  category_id: undefined as unknown as number, // див. нижче
  subcategory_id: undefined,

  notes: "",
  is_verified: false,

  brand_id: undefined,
  new_brand_name_en: "",
  new_brand_name_ua: "",

  parent_product_id: undefined,
  barcode: undefined,

  nutrients: {},

  photos: [],
};

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [parentProduct, setParentProduct] = useState<GenericProduct | null>(
    null,
  );

  const { brands, loading: brandsLoading } = useBrands();
  const { categories, loading: categoriesLoading } = useCategories();
  const { items: nutrientsRef, loading: nutrientsLoading } =
    useNutrientsReference();

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: defaultProductFormValues,
  });

  const type = watch("type");
  const selectedCategoryId = watch("category_id");
  const selectedSubcategoryId = watch("subcategory_id");

  const selectedCategory = findCategoryById(categories, selectedCategoryId);

  // parent inheritance
  useEffect(() => {
    if (type === "branded" && parentProduct) {
      setValue("category_id", parentProduct.category_id);
      setValue("subcategory_id", parentProduct.subcategory_id ?? undefined);
    }
  }, [type, parentProduct, setValue]);

  async function onSubmit(values: ProductFormValues) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    let selectedBrand: Brand | undefined;

    if (
      values.type === "branded" &&
      values.brand_id &&
      values.brand_id !== "__new__"
    ) {
      selectedBrand = brands.find((b) => b.brand_id === values.brand_id);
    }

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
      selectedBrand = {
        brand_id: data.brand_id,
        name: {
          en: values.new_brand_name_en!,
          ua: values.new_brand_name_ua!,
        },
      };
    }

    const payload = mapProductFormToProductInput(values, selectedBrand);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create product");
      setSuccess(true);

      // 🧹 reset form
      reset(defaultProductFormValues);

      // 🧹 reset local state
      setParentProduct(null);
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
        {/* name_en */}
        <div>
          <label className="block text-sm font-medium">Name (EN)</label>{" "}
          <input
            {...register("name_en")}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.name_en && (
            <p className="text-sm text-red-600">{errors.name_en.message}</p>
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
                />{" "}
                <input
                  {...register("new_brand_name_ua", { required: true })}
                  placeholder="Brand name (UA)"
                  className="w-full rounded border px-3 py-2"
                />{" "}
              </div>
            )}{" "}
          </div>
        )}
        {/* parent + barcode */}
        {type === "branded" && (
          <>
            <GenericProductSearch
              value={parentProduct}
              onSelect={(product) => {
                setParentProduct(product);

                if (!product) {
                  setValue("parent_product_id", undefined);
                  return;
                }

                setValue("parent_product_id", product.product_id);

                // 🔽 inheritance
                setValue("category_id", product.category_id);
                setValue("subcategory_id", product.subcategory_id);
              }}
            />

            <BarcodeInput value={watch("barcode")} setValue={setValue} />
          </>
        )}
        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium">Category</label>

          {categoriesLoading ? (
            <p className="text-sm text-gray-500">Loading categories…</p>
          ) : (
            <CategorySelect
              categories={categories}
              value={selectedCategoryId}
              disabled={!!parentProduct}
              onChange={(id) => {
                setValue("category_id", id!, { shouldDirty: true });
                setValue("subcategory_id", undefined);
              }}
            />
          )}
        </div>
        {/* SUBCATEGORY */}
        <SubcategorySelect
          parentCategory={selectedCategory}
          value={selectedSubcategoryId}
          disabled={!!parentProduct}
          onChange={(id) =>
            setValue("subcategory_id", id, { shouldDirty: true })
          }
        />

        {/* unit */}
        <div>
          <label className="block text-sm font-medium">Unit</label>
          <select
            {...register("unit")}
            className="mt-1 w-full rounded border px-3 py-2"
          >
            <option value="g">g</option> <option value="ml">ml</option>
            <option value="pcs">pcs</option>
          </select>
          {errors.unit && (
            <p className="text-sm text-red-600">{errors.unit.message}</p>
          )}
        </div>

        {/* nutrients */}
        {nutrientsLoading ? (
          <p className="text-sm text-gray-500">Loading nutrients…</p>
        ) : (
          <NutrientsEditor
            nutrientsRef={nutrientsRef}
            watch={watch}
            setValue={setValue}
          />
        )}

        {/* photo */}
        <ProductPhotoUploader photos={watch("photos")} setValue={setValue} />

        {/* notes */}
        <textarea
          {...register("notes")}
          placeholder="Admin notes"
          className="w-full rounded border px-3 py-2"
        />
        {/* verified */}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("is_verified")} />
          Verified
        </label>
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
