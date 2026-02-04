"use client";

import { useEffect, useState } from "react";

export type DietaryTag = {
  dietary_tag_id: number;
  code: string;
  name: {
    en: string;
    ua: string;
  };
};

export function useDietaryTags() {
  const [items, setItems] = useState<DietaryTag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dietary-tags")
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}
