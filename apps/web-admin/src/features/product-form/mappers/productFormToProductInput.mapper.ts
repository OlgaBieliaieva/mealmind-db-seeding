// SECTION ███ FORM → PRODUCT INPUT MAPPER ███
// DATAFLOW: ProductFormValues → ProductInput

import { generateUUID } from "@/shared/lib/utils/uuid";

import { ProductFormInput } from "../schemas/product-form.schema";
import { ProductInput } from "../schemas/product.schema";

export function mapProductFormToProductInput(
  values: ProductFormInput,
  productId?: string,
): ProductInput {
  const id = productId ?? generateUUID();

  const baseProduct = {
    product_id: id,

    name: {
      en: values.name_en,
      ua: values.name_ua,
    },

    type: values.type,
    unit: values.unit,
    category_id: values.category_id,
    raw_or_cooked_default: values.raw_or_cooked_default,

    notes: values.notes,
    is_verified: values.is_verified,
    source: values.source || "manual",

    ...(values.photos?.length && { photos: values.photos }),

    ...(Object.keys(values.nutrients ?? {}).length > 0 && {
      nutrients: Object.fromEntries(
        Object.entries(values.nutrients).map(([k, v]) => [
          k,
          {
            value: Number(v.value), // 🔥 тут transform
            unit: v.unit,
          },
        ]),
      ),
    }),

    cooking_loss_pct: Number(values.cooking_loss_pct),
    edible_part_pct: Number(values.edible_part_pct),
    yield_factor: Number(values.yield_factor),
  };

  if (values.type === "generic") {
    return {
      ...baseProduct,
      type: "generic",
    };
  }

  if (!values.brand_id) {
    throw new Error("Brand required");
  }

  return {
    ...baseProduct,
    type: "branded",
    brand_id: values.brand_id,
    ...(values.barcode && { barcode: values.barcode }),
    ...(values.parent_product_id && {
      parent_product_id: values.parent_product_id,
    }),
  };
}
