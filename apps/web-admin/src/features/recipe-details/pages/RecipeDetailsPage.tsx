"use client";

import { useEffect, useRef, useState } from "react";

import { useRecipeDetails } from "../hooks/useRecipeDetails";

import { PageLoader } from "@/shared/ui/page/PageLoader";
import { PageError } from "@/shared/ui/page/PageError";

import { RecipeDetailsBackLink } from "../components/details/RecipeDetailsBackLink";
import { RecipeDetailsHeaderCard } from "../components/details/RecipeDetailsHeaderCard";

import { RecipeDetailsStickyHeader } from "../components/details/RecipeDetailsStickyHeader";
import { RecipeDetailsFooterActions } from "../components/details/RecipeDetailsFooterActions";

import { RECIPE_DETAILS_SECTIONS } from "../constants/recipe-details.sections";

export function RecipeDetailsPage() {
  const { data, isLoading, isError, refetch } = useRecipeDetails();

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    function onScroll() {
      const header = headerRef.current;
      if (!header) return;

      setShowSticky(window.scrollY > header.offsetHeight);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isLoading) {
    return <PageLoader title="Завантаження рецепта..." />;
  }

  if (isError || !data) {
    return (
      <PageError title="Не вдалося завантажити рецепт" onRetry={refetch} />
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {showSticky && <RecipeDetailsStickyHeader recipe={data} />}

      <RecipeDetailsBackLink />

      <div ref={headerRef}>
        <RecipeDetailsHeaderCard recipe={data} />
      </div>

      {RECIPE_DETAILS_SECTIONS.map((section) => (
        <div key={section.key}>{section.render(data)}</div>
      ))}

      <RecipeDetailsFooterActions recipe={data} />
    </div>
  );
}
