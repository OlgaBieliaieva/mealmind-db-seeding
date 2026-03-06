// SECTION ███ FORM → PRODUCT INPUT MAPPER ███
// DATAFLOW: ProductFormValues → ProductInput

import { generateUUID } from "@/domains/shared/utils/uuid";

import { ProductFormValues } from "../schemas/product-form.schema";
import { ProductInput } from "@/domains/product/schemas/product.schema";

import { Brand } from "@/domains/product/types/brand.types";

// SECTION ━━ MAPPER ━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function mapProductFormToProductInput(
  values: ProductFormValues,
  brand?: Brand,
  productId?: string,
): ProductInput {
  const id = productId ?? generateUUID();

  // ensure required fields exist

  if (!values.category_id) {
    throw new Error("Category is required");
  }

  // SECTION ━━ COMMON DATA ━━━━━━━━━━━━━━━━━━━

  const baseProduct = {
    product_id: id,

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

  // SECTION ━━ GENERIC PRODUCT ━━━━━━━━━━━━━━━

  if (values.type === "generic") {
    return {
      ...baseProduct,

      type: "generic",
    };
  }

  // SECTION ━━ BRANDED PRODUCT ━━━━━━━━━━━━━━━

  const brandId = values.brand_id ?? brand?.brand_id;

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

// import { generateUUID } from "@/lib/v1/uuid";
// import { ProductFormValues } from "@/domains/product/schemas/product-form.schema";
// import { ProductInput } from "@/types/product.schema";
// import { Brand } from "@/types/brand";

// export function mapProductFormToProductInput(
//   values: ProductFormValues,
//   brand?: Brand,
//   productId?: string,
// ): ProductInput {
//   const id = productId ?? generateUUID(); // ✅ гарантія

//   if (values.type === "generic") {
//     return {
//       product_id: id, // ✅ ДОДАНО
//       type: "generic",
//       name: {
//         en: values.name_en,
//         ua: values.name_ua,
//       },
//       unit: values.unit,
//       category_id: values.category_id,
//       subcategory_id: values.subcategory_id,
//       notes: values.notes,
//       is_verified: values.is_verified,
//       source: "manual",
//       photos: values.photos,
//       ...(values.nutrients && Object.keys(values.nutrients).length > 0
//         ? { nutrients: values.nutrients }
//         : {}),
//     };
//   }

//   return {
//     product_id: id, // ✅ ДОДАНО
//     type: "branded",
//     name: {
//       en: values.name_en,
//       ua: values.name_ua,
//     },
//     unit: values.unit,
//     category_id: values.category_id,
//     subcategory_id: values.subcategory_id,
//     brand: {
//       id: brand!.brand_id,
//       name: brand!.name,
//     },
//     barcode: values.barcode,
//     parent_product_id: values.parent_product_id,
//     notes: values.notes,
//     is_verified: values.is_verified,
//     source: "manual",
//     photos: values.photos,
//     ...(values.nutrients && Object.keys(values.nutrients).length > 0
//       ? { nutrients: values.nutrients }
//       : {}),
//   };
// }

// import { ProductFormValues } from "@/types/product-form.schema";
// import { ProductInput } from "@/types/product.schema";
// import { Brand } from "@/types/brand";

// export function mapProductFormToProductInput(
//   values: ProductFormValues,
//   brand?: Brand,
// ): ProductInput {
//   if (values.type === "generic") {
//     return {
//       type: "generic",
//       name: {
//         en: values.name_en,
//         ua: values.name_ua,
//       },
//       unit: values.unit,
//       category_id: values.category_id,
//       subcategory_id: values.subcategory_id,
//       notes: values.notes,
//       is_verified: values.is_verified,
//       source: "manual",
//       photos: values.photos,
//       ...(values.nutrients && Object.keys(values.nutrients).length > 0
//         ? { nutrients: values.nutrients }
//         : {}),
//     };
//   }

//   return {
//     type: "branded",
//     name: {
//       en: values.name_en,
//       ua: values.name_ua,
//     },
//     unit: values.unit,
//     category_id: values.category_id,
//     subcategory_id: values.subcategory_id,
//     brand: {
//       id: brand!.brand_id,
//       name: brand!.name,
//     },
//     barcode: values.barcode,
//     parent_product_id: values.parent_product_id,
//     notes: values.notes,
//     is_verified: values.is_verified,
//     source: "manual",
//     photos: values.photos,
//     ...(values.nutrients && Object.keys(values.nutrients).length > 0
//       ? { nutrients: values.nutrients }
//       : {}),
//   };
// }
