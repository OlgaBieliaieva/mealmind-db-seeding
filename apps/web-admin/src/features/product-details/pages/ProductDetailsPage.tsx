"use client";

import { useEffect, useRef, useState } from "react";
import { useProductDetails } from "../hooks/useProductDetails";
import { PageLoader } from "@/shared/ui/page/PageLoader";
import { PageError } from "@/shared/ui/page/PageError";
import { ProductDetailsBackLink } from "../components/details/ProductDetailsBackLink";
import { ProductDetailsHeaderCard } from "../components/details/ProductDetailsHeaderCard";
import { ProductDetailsStickyHeader } from "../components/details/ProductDetailsStickyHeader";
import { ProductDetailsBasicInfoSection } from "../components/details/ProductDetailsBasicInfoSection";
import { ProductDetailsFooterActions } from "../components/details/ProductDetailsFooterActions";
import { PRODUCT_DETAILS_SECTIONS } from "../constants/product-details.sections";

export function ProductDetailsPage() {
  const { data, isLoading, isError, refetch } = useProductDetails();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    function onScroll() {
      const header = headerRef.current;
      if (!header) return;

      const threshold = header.offsetHeight;

      setShowSticky(window.scrollY > threshold);
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isLoading) {
    return <PageLoader title="Loading product..." />;
  }

  if (isError || !data) {
    return <PageError title="Failed to load product" onRetry={refetch} />;
  }

  return (
    <div className="space-y-6 pb-20">
      {showSticky && <ProductDetailsStickyHeader product={data} />}

      <ProductDetailsBackLink />

      <div ref={headerRef}>
        <ProductDetailsHeaderCard product={data} />
      </div>

      <ProductDetailsBasicInfoSection product={data} />

      {PRODUCT_DETAILS_SECTIONS.map((Section, i) => (
        <Section key={i} product={data} />
      ))}

      <ProductDetailsFooterActions product={data} />
    </div>
  );
}
