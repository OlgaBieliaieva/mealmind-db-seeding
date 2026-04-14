import { getRecipeDraft, setRecipeDraft } from "../recipe/recipe-draft";
import { RecipeCreateInput } from "@/features/recipe-form/schemas/recipe.create.schema";

export type SelectedProduct = {
  product_id: string;
  name: string;
  brand?: string | null;
  unit: string;
  quantity_g: number;
};

type Draft = RecipeCreateInput & {
  selection?: Record<string, SelectedProduct>;
};

export function getSelection(): Record<string, SelectedProduct> {
  const draft = getRecipeDraft<Draft>();
  return draft?.selection || {};
}

export function toggleSelection(product: SelectedProduct) {
  const draft = getRecipeDraft<Draft>() || ({} as Draft);

  const selection = { ...(draft.selection || {}) };

  if (selection[product.product_id]) {
    delete selection[product.product_id];
  } else {
    selection[product.product_id] = product;
  }

  setRecipeDraft({
    ...draft,
    selection,
  });
}

export function upsertSelection(product: SelectedProduct) {
  const draft = getRecipeDraft<Draft>() || ({} as Draft);

  const selection = { ...(draft.selection || {}) };

  selection[product.product_id] = product;

  setRecipeDraft({
    ...draft,
    selection,
  });
}

export function removeSelection(product_id: string) {
  const draft = getRecipeDraft<Draft>() || ({} as Draft);

  const selection = { ...(draft.selection || {}) };

  delete selection[product_id];

  setRecipeDraft({
    ...draft,
    selection,
  });
}

export function clearSelection() {
  const draft = getRecipeDraft<Draft>() || ({} as Draft);

  setRecipeDraft({
    ...draft,
    selection: {},
  });
}
