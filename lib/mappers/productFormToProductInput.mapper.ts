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
      category_id: 0,
      is_verified: false,
      source: "manual",
    };
  }

  if (!brand) {
    throw new Error("Brand is required for branded product");
  }

  return {
    type: "branded",
    name: {
      en: values.name_en,
      ua: values.name_ua,
    },
    unit: values.unit,
    category_id: 0,

    brand: {
      id: brand.brand_id,
      name: brand.name,
    },

    is_verified: false,
    source: "manual",
  };
}
