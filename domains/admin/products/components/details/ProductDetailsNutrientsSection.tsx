import { DetailsSectionCard } from "./DetailsSectionCard";
import { PageEmpty } from "@/domains/shared/components/page/PageEmpty";
import { ProductDetailsDTO } from "../../types/product-details.dto";
import { PRODUCT_DETAILS_LABELS } from "../../constants/product-details.labels";

type Props = {
  product: ProductDetailsDTO;
};

export function ProductDetailsNutrientsSection({ product }: Props) {
  const entries = product.nutrients ? Object.entries(product.nutrients) : [];

  if (!entries.length) {
    return (
      <PageEmpty
        title={PRODUCT_DETAILS_LABELS.NO_NUTRIENTS_TITLE}
        description={PRODUCT_DETAILS_LABELS.NO_NUTRIENTS_DESCRIPTION}
      />
    );
  }

  return (
    <DetailsSectionCard title={PRODUCT_DETAILS_LABELS.NUTRIENTS}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
        {entries.map(([code, data]) => (
          <div key={code} className="flex justify-between">
            <span className="text-muted-foreground">{data.name}</span>

            <span className="font-medium">
              {data.value} {data.unit}
            </span>
          </div>
        ))}
      </div>
    </DetailsSectionCard>
  );
}
