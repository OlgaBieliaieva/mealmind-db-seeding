"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import { ConfirmModal } from "@/shared/ui/modal/ConfirmModal";

type Props = {
  backHref?: string;

  confirmTitle?: string;
  confirmDescription?: string;
  confirmText?: string;
  cancelText?: string;
};

export function FormEditNavigation({
  backHref,

  confirmTitle = "Є незбережені зміни",
  confirmDescription = "Ви впевнені, що хочете покинути сторінку? Зміни будуть втрачені.",
  confirmText = "Покинути сторінку",
  cancelText = "Залишитися",
}: Props) {
  const router = useRouter();

  const {
    formState: { isDirty },
  } = useFormContext();

  const [open, setOpen] = useState(false);

  function navigateBack() {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  }

  function handleBack() {
    if (isDirty) {
      setOpen(true);
      return;
    }

    navigateBack();
  }

  function handleConfirm() {
    setOpen(false);
    navigateBack();
  }

  return (
    <>
      <button onClick={handleBack} className="text-sm text-gray-500 mb-2">
        ← Назад
      </button>

      <ConfirmModal
        open={open}
        title={confirmTitle}
        description={confirmDescription}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
