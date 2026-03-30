import Image from "next/image";
import { DetailsSectionCard } from "./DetailsSectionCard";
import { PageEmpty } from "@/shared/ui/page/PageEmpty";
import { ProductDetailsDto } from "@/shared/api/products/products.types";
import { PRODUCT_DETAILS_LABELS } from "../../constants/product-details.labels";

type Props = {
  product: ProductDetailsDto;
};

export function ProductDetailsPhotosSection({ product }: Props) {
  if (!product.photos?.length) {
    return (
      <PageEmpty
        title={PRODUCT_DETAILS_LABELS.NO_PHOTOS_TITLE}
        description={PRODUCT_DETAILS_LABELS.NO_PHOTOS_DESCRIPTION}
      />
    );
  }

  return (
    <DetailsSectionCard title={PRODUCT_DETAILS_LABELS.PHOTOS}>
      <div className="grid grid-cols-4 gap-3">
        {product.photos.map((photo) => (
          <div
            key={photo.id}
            className="relative overflow-hidden rounded border"
          >
            <Image
              src={photo.url}
              alt=""
              width={200}
              height={128}
              className="h-32 w-full object-cover"
            />

            {photo.isPrimary && (
              <div className="absolute top-1 left-1 rounded bg-white px-1 text-xs">
                Primary
              </div>
            )}

            <div className="absolute bottom-1 right-1 rounded bg-white px-1 text-xs">
              {photo.type}
            </div>
          </div>
        ))}
      </div>
    </DetailsSectionCard>
  );
}
