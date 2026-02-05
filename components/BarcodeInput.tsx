"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { UseFormSetValue } from "react-hook-form";
import { ProductFormValues } from "@/types/product-form.schema";

type Props = {
  value?: string;
  setValue: UseFormSetValue<ProductFormValues>;
};

type ScannerControls = {
  stop: () => void;
};

export function BarcodeInput({ value, setValue }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<ScannerControls | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanSuccess, setScanSuccess] = useState(false);

  const startScan = async () => {
    if (isScanning) return;

    setError(null);
    setScanSuccess(false);
    setIsScanning(true);

    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;

    try {
      const controls = await reader.decodeFromVideoDevice(
        undefined,
        videoRef.current!,
        (result) => {
          if (!result) return;

          setValue("barcode", result.getText(), {
            shouldDirty: true,
            shouldValidate: true,
          });

          setScanSuccess(true);
          stopScan();
        },
      );

      controlsRef.current = controls;
    } catch (e) {
      console.error("Barcode scan failed", e);
      setError("Failed to access camera");
      setIsScanning(false);
    }
  };

  const stopScan = () => {
    controlsRef.current?.stop();
    controlsRef.current = null;
    readerRef.current = null;
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      controlsRef.current?.stop();
    };
  }, []);

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

      {!isScanning ? (
        <button
          type="button"
          onClick={startScan}
          className="text-sm text-blue-600 underline"
        >
          Scan barcode
        </button>
      ) : (
        <button
          type="button"
          onClick={stopScan}
          className="text-sm text-red-600 underline"
        >
          Stop scanning
        </button>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      {scanSuccess && (
        <p className="text-sm text-green-600">Barcode scanned successfully</p>
      )}

      {isScanning && (
        <video
          ref={videoRef}
          className="mt-2 w-full rounded border"
          muted
          playsInline
        />
      )}
    </div>
  );
}
