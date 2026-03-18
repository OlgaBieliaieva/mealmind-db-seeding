import { ProductDetailsHeaderCard } from "../components/details/ProductDetailsHeaderCard";
import { ProductDetailsBasicInfoSection } from "../components/details/ProductDetailsBasicInfoSection";

export function ProductDetailsPage() {
  return (
    <div className="space-y-6">
      <ProductDetailsHeaderCard />

      <ProductDetailsBasicInfoSection />
    </div>
  );
}
