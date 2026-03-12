import { ProductBasicSection } from "@/domains/product/components/ProductForm/sections/ProductBasicSection";
import { ProductCategorySection } from "@/domains/product/components/ProductForm/sections/ProductCategorySection";
import { ProductBrandSection } from "@/domains/product/components/ProductForm/sections/ProductBrandSection";
import { ProductFormSection } from "../types/product-form-section.types";

export const PRODUCT_FORM_SECTIONS: ProductFormSection[] = [
  ProductBasicSection,
  ProductBrandSection,
  ProductCategorySection,
];
