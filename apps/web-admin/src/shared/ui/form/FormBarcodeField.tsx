"use client";

import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BrowserMultiFormatReader } from "@zxing/browser";

type ScannerControls = {
  stop: () => void;
};

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
};

export function FormBarcodeField({
  name,
  label = "Barcode",
  placeholder = "EAN / UPC",
}: Props) {
  const { setValue, watch } = useFormContext();

  const value = watch(name);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<ScannerControls | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function startScan() {
    setError(null);
    setSuccess(false);
    setIsScanning(true);
  }

  function stopScan() {
    controlsRef.current?.stop();
    controlsRef.current = null;
    setIsScanning(false);
  }

  useEffect(() => {
    if (!isScanning) return;
    if (!videoRef.current) return;

    const reader = new BrowserMultiFormatReader();

    let cancelled = false;

    reader
      .decodeFromVideoDevice(undefined, videoRef.current, (result) => {
        if (!result || cancelled) return;

        setValue(name, result.getText(), {
          shouldDirty: true,
          shouldValidate: true,
        });

        setSuccess(true);
        stopScan();
      })
      .then((controls) => {
        if (!cancelled) controlsRef.current = controls;
      })
      .catch(() => {
        setError("Не вдалося отримати доступ до камери");
        setIsScanning(false);
      });

    return () => {
      cancelled = true;
      controlsRef.current?.stop();
      controlsRef.current = null;
    };
  }, [isScanning, name, setValue]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <input
        value={value ?? ""}
        onChange={(e) =>
          setValue(name, e.target.value, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        placeholder={placeholder}
        className="w-full rounded border px-3 py-2"
      />

      <div className="flex gap-3">
        {!isScanning ? (
          <button
            type="button"
            onClick={startScan}
            className="text-sm text-blue-600 hover:underline"
          >
            Сканувати
          </button>
        ) : (
          <button
            type="button"
            onClick={stopScan}
            className="text-sm text-red-600 hover:underline"
          >
            Зупинити
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {success && (
        <p className="text-sm text-green-600">Штрихкод успішно зчитано</p>
      )}

      {isScanning && (
        <video
          ref={videoRef}
          className="w-full rounded border"
          muted
          playsInline
        />
      )}
    </div>
  );
}
