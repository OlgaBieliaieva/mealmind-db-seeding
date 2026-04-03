"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  archiveProduct,
  activateProduct,
  restoreProduct,
} from "@/shared/api/products/products.api";

export function useProductStatusActions() {
  const qc = useQueryClient();

  const commonOnSuccess = () => {
    qc.invalidateQueries({ queryKey: ["product"] });
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  const archive = useMutation({
    mutationFn: archiveProduct,
    onSuccess: () => {
      toast.success("Продукт архівовано");
      commonOnSuccess();
    },
  });

  const activate = useMutation({
    mutationFn: activateProduct,
    onSuccess: () => {
      toast.success("Продукт активовано");
      commonOnSuccess();
    },
  });

  const restore = useMutation({
    mutationFn: restoreProduct,
    onSuccess: () => {
      toast.success("Продукт відновлено");
      commonOnSuccess();
    },
  });

  return {
    archive,
    activate,
    restore,
  };
}