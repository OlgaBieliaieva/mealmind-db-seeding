import { PRODUCT_TYPE_LABELS } from "./product.type.labels";
import { PRODUCT_UNIT_LABELS } from "./product.unit.labels";
import { PRODUCT_STATE_LABELS } from "./product.state.labels";
import { PRODUCT_PHOTO_TYPE_LABELS } from "./product.photoType.labels";
import {
  ProductType,
  ProductUnit,
  ProductPhotoType,
  ProductState,
} from "./product.constants";

// SECTION ━━ OPTIONS FOR SELECTS ━━━━━━━━━━━

export const PRODUCT_TYPE_OPTIONS = Object.entries(PRODUCT_TYPE_LABELS).map(
  ([value, label]) => ({
    value: value as ProductType,
    label,
  }),
);

export const PRODUCT_UNIT_OPTIONS = Object.entries(PRODUCT_UNIT_LABELS).map(
  ([value, label]) => ({
    value: value as ProductUnit,
    label,
  }),
);

export const PRODUCT_STATE_OPTIONS = Object.entries(PRODUCT_STATE_LABELS).map(
  ([value, label]) => ({
    value: value as ProductState,
    label,
  }),
);

export const PRODUCT_PHOTO_TYPE_OPTIONS = Object.entries(
  PRODUCT_PHOTO_TYPE_LABELS,
).map(([value, label]) => ({
  value: value as ProductPhotoType,
  label,
}));
