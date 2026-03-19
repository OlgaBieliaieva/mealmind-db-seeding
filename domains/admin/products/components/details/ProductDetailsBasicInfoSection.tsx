import { DetailsSectionCard } from "./DetailsSectionCard";
import { ProductDetailsDTO } from "../../types/product-details.dto";

type Props = {
  product: ProductDetailsDTO;
};

export function ProductDetailsBasicInfoSection({ product }: Props) {
  return (
    <DetailsSectionCard title="Basic Info">
      <div className="text-sm text-muted-foreground">No data yet</div>
    </DetailsSectionCard>
  );
}
