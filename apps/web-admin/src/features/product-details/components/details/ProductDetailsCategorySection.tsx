import { DetailsSectionCard } from "./DetailsSectionCard";
import { EntityLink } from "@/shared/ui/link/EntityLink";
import { ProductDetailsDto } from "@/shared/api/products/products.types";
import { PRODUCT_DETAILS_LABELS } from "../../constants/product-details.labels";

type Props = {
  product: ProductDetailsDto;
};

export function ProductDetailsCategorySection({ product }: Props) {
  return (
    <DetailsSectionCard title={PRODUCT_DETAILS_LABELS.CLASSIFICATION}>
      <div className="space-y-3 text-sm">
        {product.category && (
          <div>
            <span className="text-muted-foreground">
              {PRODUCT_DETAILS_LABELS.CATEGORY}:
            </span>{" "}
            <span className="font-medium">
              {product.category.rootName} / {product.category.leafName}
            </span>
          </div>
        )}

        {product.brand && (
          <div>
            <span className="text-muted-foreground">
              {PRODUCT_DETAILS_LABELS.BRAND}:
            </span>{" "}
            <span className="font-medium">{product.brand.name}</span>
          </div>
        )}

        {product.parent && (
          <div>
            <span className="text-muted-foreground">
              {PRODUCT_DETAILS_LABELS.PARENT_PRODUCT}:
            </span>{" "}
            <EntityLink href={`/admin/products/${product.parent.id}`}>
              {product.parent.name}
            </EntityLink>
          </div>
        )}
      </div>
    </DetailsSectionCard>
  );
}
