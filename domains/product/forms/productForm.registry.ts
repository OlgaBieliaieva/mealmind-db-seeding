import { ProductBasicSection } from "@/domains/product/components/ProductForm/sections/ProductBasicSection";
import { ProductCategorySection } from "@/domains/product/components/ProductForm/sections/ProductCategorySection";
import { ProductBrandSection } from "@/domains/product/components/ProductForm/sections/ProductBrandSection";
import { ProductParentSection } from "../components/ProductForm/sections/ProductParentSection";
import { ProductFormSection } from "../types/product-form-section.types";
import { ProductCookingFactorsSection } from "../components/ProductForm/sections/ProductCookingFactorsSection";
import { ProductNutrientsSection } from "../components/ProductForm/sections/ProductNutrientsSection";
import { ProductMetaSection } from "../components/ProductForm/sections/ProductMetaSection";
import { ProductPhotosSection } from "../components/ProductForm/sections/ProductPhotosSection";

export const PRODUCT_FORM_SECTIONS: ProductFormSection[] = [
  ProductBasicSection,
  ProductParentSection,
  ProductBrandSection,
  ProductCategorySection,
  ProductCookingFactorsSection,
  ProductNutrientsSection,
  ProductMetaSection,
  ProductPhotosSection,
];
