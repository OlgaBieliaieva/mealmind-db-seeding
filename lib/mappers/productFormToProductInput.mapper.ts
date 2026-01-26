import { ProductFormValues } from "@/types/product-form.schema";
import { ProductInput } from "@/types/product.schema";

export function mapProductFormToProductInput(
  values: ProductFormValues,
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

  // branded
  return {
    type: "branded",
    name: {
      en: values.name_en,
      ua: values.name_ua,
    },
    unit: values.unit,
    category_id: 0,

    brand: {
      id: "", // TASK 1.4.1.3
      name: {
        en: "",
        ua: "",
      },
    },

    barcode: "testbarcode", // TASK 1.4.1.6

    is_verified: false,
    source: "manual",
  };
}
