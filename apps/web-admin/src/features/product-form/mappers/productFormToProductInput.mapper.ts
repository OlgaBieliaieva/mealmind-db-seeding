// SECTION ███ FORM → PRODUCT INPUT MAPPER ███
// DATAFLOW: ProductFormValues → ProductInput

import { generateUUID } from "@/shared/lib/utils/uuid";

import { ProductFormValues } from "../schemas/product-form.schema";
import { ProductInput } from "../schemas/product.schema";

export function mapProductFormToProductInput(
  values: ProductFormValues,
  productId?: string,
): ProductInput {
  const id = productId ?? generateUUID();

  if (!values.category_id) {
    throw new Error("Category is required");
  }

  const baseProduct = {
    product_id: id,

    name: {
      en: values.name_en,
      ua: values.name_ua,
    },

    unit: values.unit,

    category_id: values.category_id,

    raw_or_cooked_default: values.raw_or_cooked_default,

    notes: values.notes,

    is_verified: values.is_verified,

    source: "manual",

    photos: values.photos,

    ...(values.nutrients && Object.keys(values.nutrients).length > 0
      ? { nutrients: values.nutrients }
      : {}),
  };

  if (values.type === "generic") {
    return {
      ...baseProduct,
      type: "generic",
    };
  }

  const brandId = values.brand_id;

  if (!brandId) {
    throw new Error("Brand is required for branded product");
  }

  return {
    ...baseProduct,

    type: "branded",

    brand_id: brandId,

    barcode: values.barcode,

    parent_product_id: values.parent_product_id,
  };
}
