
import { ProductDetailsCategorySection } from "../components/details/ProductDetailsCategorySection";
import { ProductDetailsCookingFactorsSection } from "../components/details/ProductDetailsCookingFactorsSection";
import { ProductDetailsNutrientsSection } from "../components/details/ProductDetailsNutrientsSection";
import { ProductDetailsPhotosSection } from "../components/details/ProductDetailsPhotosSection";

export const PRODUCT_DETAILS_SECTIONS = [
  ProductDetailsCategorySection,
  ProductDetailsCookingFactorsSection,
  ProductDetailsNutrientsSection,
  ProductDetailsPhotosSection,
] as const;
