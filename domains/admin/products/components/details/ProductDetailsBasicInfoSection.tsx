import { DetailsSectionCard } from "./DetailsSectionCard";
import { ProductDetailsDTO } from "../../types/product-details.dto";
import { PRODUCT_DETAILS_LABELS } from "../../constants/product-details.labels";
import { PageEmpty } from "@/domains/shared/components/page/PageEmpty";
import { Badge } from "@/domains/shared/components/badge/Badge";

type Props = {
  product: ProductDetailsDTO;
};

export function ProductDetailsBasicInfoSection({ product }: Props) {
  const { id, nameEn, barcode, notes, isVerified, source } = product;

  const hasAny = id || nameEn || barcode || notes || source || isVerified;

  if (!hasAny) {
    return <PageEmpty title={PRODUCT_DETAILS_LABELS.NO_BASIC_INFO} />;
  }

  return (
    <DetailsSectionCard title={PRODUCT_DETAILS_LABELS.BASIC_INFO}>
      <div className="space-y-4 text-sm">
        {/* Identity */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">
            {PRODUCT_DETAILS_LABELS.SYSTEM_ID}
          </div>
          <div className="font-mono text-xs">{id}</div>
        </div>

        {nameEn && (
          <div>
            <span className="text-muted-foreground">
              {PRODUCT_DETAILS_LABELS.NAME_EN}:
            </span>{" "}
            <span className="font-medium">{nameEn}</span>
          </div>
        )}

        {/* External identification */}
        {barcode && (
          <div>
            <span className="text-muted-foreground">
              {PRODUCT_DETAILS_LABELS.BARCODE}:
            </span>{" "}
            <span className="font-medium">{barcode}</span>
          </div>
        )}

        {source && (
          <div>
            <span className="text-muted-foreground">
              {PRODUCT_DETAILS_LABELS.SOURCE}:
            </span>{" "}
            <span className="font-medium">{source}</span>
          </div>
        )}

        {/* Moderation */}
        {isVerified !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {PRODUCT_DETAILS_LABELS.VERIFIED}:
            </span>

            <Badge variant={isVerified ? "success" : "warning"}>
              {isVerified
                ? PRODUCT_DETAILS_LABELS.YES
                : PRODUCT_DETAILS_LABELS.NO}
            </Badge>
          </div>
        )}

        {/* Human context */}
        {notes && (
          <div>
            <div className="text-muted-foreground">
              {PRODUCT_DETAILS_LABELS.NOTES}
            </div>

            <div className="mt-1 rounded bg-muted p-3 text-sm">{notes}</div>
          </div>
        )}
      </div>
    </DetailsSectionCard>
  );
}
