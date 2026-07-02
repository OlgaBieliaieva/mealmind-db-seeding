"use client";

import { useAddToPlanNavigation } from "./useAddToPlanNavigation";
// import { useOpenAdvancedMealPlanEditor } from "./useOpenAdvancedMealPlanEditor";
import { useToggleMealItem } from "./useToggleMealItem";

type OpenCreateInput = {
  mealTypeId?: string;
  memberId?: string;
};

// type OpenEditInput = {
//   memberId?: string;
//   mealTypeId?: string;
//   recipeId?: string;
//   productId?: string;
//   amountG?: number;
// };

export function useMealPlanActions() {
  const openCreateFlow = useAddToPlanNavigation();
  //   const openAdvancedEditor = useOpenAdvancedMealPlanEditor();
  const { mutate } = useToggleMealItem();

  return {
    openCreate(input?: OpenCreateInput) {
      openCreateFlow(input);
    },

    // openEditPlannedItem(input: OpenEditInput) {
    //   openAdvancedEditor(input);
    // },

    togglePrepared(entryIds: string[]) {
      mutate(entryIds);
    },

    // removePlannedItem(entryIds: string[]) {
    //   console.log("TODO: remove planned item", entryIds);
    // },
  };
}
