import { DetailsSectionCard } from "./DetailsSectionCard";
import { EntityLink } from "@/domains/shared/components/link/EntityLink";
import { ProductDetailsDTO } from "../../types/product-details.dto";

type Props = {
  category?: ProductDetailsDTO["category"];
  brand?: ProductDetailsDTO["brand"];
  parent?: ProductDetailsDTO["parent"];
};

export function ProductDetailsCategorySection({
  category,
  parent,
  brand,
}: Props) {
  return (
    <DetailsSectionCard title="Classification">
      <div className="space-y-3 text-sm">
        {category && (
          <div>
            <span className="text-muted-foreground">Category:</span>{" "}
            <span className="font-medium">
              {category.rootName} / {category.leafName}
            </span>
          </div>
        )}

        {brand && (
          <div>
            <span className="text-muted-foreground">Brand:</span>{" "}
            <span className="font-medium">{brand.name}</span>
          </div>
        )}

        {parent && (
          <div>
            <span className="text-muted-foreground">Parent product:</span>{" "}
            <EntityLink href={`/admin/products/${parent.id}`}>
              {parent.name}
            </EntityLink>
          </div>
        )}
      </div>
    </DetailsSectionCard>
  );
}
