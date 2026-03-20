"use client";

import { useRouter } from "next/navigation";

export function useConfirmNavigation(isDirty: boolean) {
  const router = useRouter();

  function push(url: string) {
    if (isDirty) {
      const ok = confirm(
        "Ви маєте не збережені зміни. Залишити цю сторінку без збереження?",
      );
      if (!ok) return;
    }

    router.push(url);
  }

  function back() {
    if (isDirty) {
      const ok = confirm(
        "Ви маєте не збережені зміни. Залишити цю сторінку без збереження?",
      );
      if (!ok) return;
    }

    router.back();
  }

  return {
    push,
    back,
  };
}
