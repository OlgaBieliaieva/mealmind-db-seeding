"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { UseFormSetValue } from "react-hook-form";
import { ProductFormValues } from "@/types/product-form.schema";

type Props = {
  value?: string;
  setValue: UseFormSetValue<ProductFormValues>;
};

export function BarcodeInput({ value, setValue }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    return () => {
      // нічого чистити не потрібно
    };
  }, []);

  const startScan = async () => {
    setIsScanning(true);
    const reader = new BrowserMultiFormatReader();

    try {
      const result = await reader.decodeOnceFromVideoDevice(
        undefined,
        videoRef.current!,
      );

      setValue("barcode", result.getText(), {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch (e) {
      console.error("Barcode scan failed", e);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Barcode</label>

      <input
        type="text"
        value={value ?? ""}
        onChange={(e) =>
          setValue("barcode", e.target.value, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        className="w-full rounded border px-3 py-2 text-sm"
        placeholder="EAN / UPC"
      />

      <button
        type="button"
        onClick={startScan}
        className="text-sm text-blue-600 underline"
      >
        Scan barcode
      </button>

      {isScanning && (
        <video ref={videoRef} className="mt-2 w-full rounded border" />
      )}
    </div>
  );
}
