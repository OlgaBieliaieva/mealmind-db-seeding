import { ProductFormValues } from "@/types/product-form.schema";
import { ProductInput } from "@/types/product.schema";
import { Brand } from "@/types/brand";

export function mapProductFormToProductInput(
  values: ProductFormValues,
  brand?: Brand,
): ProductInput {
  if (values.type === "generic") {
    return {
      type: "generic",
      name: {
        en: values.name_en,
        ua: values.name_ua,
      },
      unit: values.unit,
      category_id: values.category_id,
      subcategory_id: values.subcategory_id,
      notes: values.notes,
      is_verified: values.is_verified,
      source: "manual",
      photos: values.photos,
      ...(values.nutrients && Object.keys(values.nutrients).length > 0
        ? { nutrients: values.nutrients }
        : {}),
    };
  }

  return {
    type: "branded",
    name: {
      en: values.name_en,
      ua: values.name_ua,
    },
    unit: values.unit,
    category_id: values.category_id,
    subcategory_id: values.subcategory_id,
    brand: {
      id: brand!.brand_id,
      name: brand!.name,
    },
    barcode: values.barcode,
    parent_product_id: values.parent_product_id,
    notes: values.notes,
    is_verified: values.is_verified,
    source: "manual",
    photos: values.photos,
    ...(values.nutrients && Object.keys(values.nutrients).length > 0
      ? { nutrients: values.nutrients }
      : {}),
  };
}
