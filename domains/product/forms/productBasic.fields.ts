// SECTION ███ PRODUCT BASIC FIELDS CONFIG ███

import { FormField } from "@/domains/shared/types/form.types";

import { ProductFormValues } from "../schemas/product-form.schema";

import {
  PRODUCT_TYPE_OPTIONS,
  PRODUCT_UNIT_OPTIONS,
} from "../constants/product.constants";

import { PRODUCT_LABELS } from "../constants/product.form.labels";

export const PRODUCT_BASIC_FIELDS: FormField<ProductFormValues>[] = [
  {
    type: "input",
    name: "name_ua",
    label: PRODUCT_LABELS.NAME_UA,
  },

  {
    type: "input",
    name: "name_en",
    label: PRODUCT_LABELS.NAME_EN,
  },

  {
    type: "select",
    name: "type",
    label: PRODUCT_LABELS.TYPE,
    options: PRODUCT_TYPE_OPTIONS,
  },

  {
    type: "select",
    name: "unit",
    label: PRODUCT_LABELS.UNIT,
    options: PRODUCT_UNIT_OPTIONS,
  },
];
