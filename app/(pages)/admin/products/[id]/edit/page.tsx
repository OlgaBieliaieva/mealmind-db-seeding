// TODO DELETE after refactor
import { notFound } from "next/navigation";
import { productRepository } from "@/domains/product/repositories/product.repository";
// import { ProductEditPage } from "@/domains/admin/products/pages/ProductEditPage";
import { PRODUCT_ADMIN_LABELS } from "@/domains/product/constants/product.admin.labels";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const product = await productRepository.getProductDetails(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">
        {PRODUCT_ADMIN_LABELS.edit_form.title}
      </h1>
      {/* <ProductEditPage product={product} /> */}
    </div>
  );
}
