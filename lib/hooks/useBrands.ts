import { useEffect, useState } from "react";
import { Brand } from "@/types/brand";

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/brands");
        const data = await res.json();

        setBrands(data.brands ?? []);
      } catch (e) {
        setError("Failed to load brands");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { brands, loading, error };
}
