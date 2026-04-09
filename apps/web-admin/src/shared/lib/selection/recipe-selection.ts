import { ProductListItemDto } from "@/shared/api/products/products.types";

const KEY = "recipe:selectedProducts";

export type SelectedProduct = {
  product_id: string;

  name: string;
  brand?: string | null;
  unit: string;

  quantity_g: number;
};

export type SelectedProductsMap = Record<string, SelectedProduct>;

export function getSelectedProducts(): Record<string, SelectedProduct> {
  if (typeof window === "undefined") return {};

  const raw = sessionStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : {};
}

export function setSelectedProducts(data: Record<string, SelectedProduct>) {
  sessionStorage.setItem(KEY, JSON.stringify(data));
}

export function upsertSelectedProduct(product: SelectedProduct) {
  const current = getSelectedProducts();

  current[product.product_id] = product;

  setSelectedProducts(current);
}

export function toggleSelectedProduct(product: ProductListItemDto) {
  const current = getSelectedProducts();

  if (current[product.product_id]) {
    delete current[product.product_id];
  } else {
    current[product.product_id] = {
      product_id: product.product_id,
      name: product.name_ua,
      brand: product.brand,
      unit: product.unit || "g",
      quantity_g: 100,
    };
  }

  setSelectedProducts(current);
}

export function toggleSelectedProductFromList(product: {
  product_id: string;
  name: string;
  brand?: string | null;
  unit: string;
}) {
  const current = getSelectedProducts();

  if (current[product.product_id]) {
    delete current[product.product_id];
  } else {
    current[product.product_id] = {
      product_id: product.product_id,
      quantity_g: 100,
      name: product.name,
      brand: product.brand,
      unit: product.unit,
    };
  }

  setSelectedProducts(current);
}

export function clearSelectedProducts() {
  sessionStorage.removeItem(KEY);
}
