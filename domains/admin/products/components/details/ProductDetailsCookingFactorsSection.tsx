import { DetailsSectionCard } from "./DetailsSectionCard";
import { PageEmpty } from "@/domains/shared/components/page/PageEmpty";
import { ProductDetailsDTO } from "../../types/product-details.dto";
import { PRODUCT_DETAILS_LABELS } from "../../constants/product-details.labels";

type Props = {
  product: ProductDetailsDTO;
};

export function ProductDetailsCookingFactorsSection({ product }: Props) {
  if (!product.cookingFactors) {
    return (
      <PageEmpty
        title={PRODUCT_DETAILS_LABELS.NO_COOKING_FACTORS_TITLE}
        description={PRODUCT_DETAILS_LABELS.NO_COOKING_FACTORS_DESCRIPTION}
      />
    );
  }

  const { ediblePartPct, cookingLossPct, yieldFactor, inheritedFromGeneric } =
    product.cookingFactors;

  return (
    <DetailsSectionCard title={PRODUCT_DETAILS_LABELS.COOKING_FACTORS}>
      <div className="space-y-2 text-sm">
        {ediblePartPct != null && (
          <div>
            {PRODUCT_DETAILS_LABELS.EDIBLE_PART}{" "}
            <span className="font-medium">{ediblePartPct}%</span>
          </div>
        )}

        {cookingLossPct != null && (
          <div>
            {PRODUCT_DETAILS_LABELS.COOKING_LOSS}{" "}
            <span className="font-medium">{cookingLossPct}%</span>
          </div>
        )}

        {yieldFactor != null && (
          <div>
            {PRODUCT_DETAILS_LABELS.YIELD_FACTOR}{" "}
            <span className="font-medium">{yieldFactor}</span>
          </div>
        )}

        {inheritedFromGeneric && (
          <div className="text-xs text-muted-foreground">
            {PRODUCT_DETAILS_LABELS.INHERITED}
          </div>
        )}
      </div>
    </DetailsSectionCard>
  );
}
