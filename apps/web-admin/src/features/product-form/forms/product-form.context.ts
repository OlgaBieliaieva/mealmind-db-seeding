"use client";

import { createContext, useContext } from "react";

type ProductFormContextValue = {
  parentLocked: boolean;
  setParentLocked: (v: boolean) => void;
  mode: "create" | "edit";
  allowParentEdit: boolean;
  setAllowParentEdit: (v: boolean) => void;
};

export const ProductFormContext = createContext<ProductFormContextValue | null>(
  null,
);

export function useProductFormUI() {
  const ctx = useContext(ProductFormContext);

  if (!ctx) {
    throw new Error("useProductFormUI must be used inside ProductForm");
  }

  return ctx;
}
