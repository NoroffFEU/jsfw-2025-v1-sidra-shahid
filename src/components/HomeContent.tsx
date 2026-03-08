"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/lib/types";

import Hero from "./Hero";
import Categories from "./Categories";
import ProductsGrid from "./ProductsGrid";
import ReviewsSection from "./ReviewsSection";

const TAG_ALIASES: Record<string, string[]> = {
  watches: ["watch", "watches"],
};

export default function HomeContent({
  allProducts,
  heroProducts,
  leftProduct,
}: {
  allProducts: Product[];
  heroProducts: Product[];
  leftProduct: Product;
}) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const qRaw = searchParams.get("q") || "";
  const q = qRaw.trim().toLowerCase();
  const reset = searchParams.get("reset") === "1";

  useEffect(() => {
    if (!reset) return;

    const t = window.setTimeout(() => {
      setSelectedTag(null);
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    return () => window.clearTimeout(t);
  }, [reset]);

  const categoryFiltered = useMemo(() => {
    if (q) return allProducts;
    if (!selectedTag) return allProducts;
    const selected = selectedTag.toLowerCase();
    const wantedTags = TAG_ALIASES[selected] ?? [selected];

    return allProducts.filter((p) =>
      (p.tags ?? []).some((t) => wantedTags.includes(t.toLowerCase())),
    );
  }, [allProducts, selectedTag, q]);

  const finalProducts = useMemo(() => {
    if (!q) return categoryFiltered;

    return categoryFiltered.filter((p) => {
      const titleMatch = p.title.toLowerCase().includes(q);
      const tagMatch = (p.tags ?? []).some((t) => t.toLowerCase().includes(q));
      return titleMatch || tagMatch;
    });
  }, [categoryFiltered, q]);

  useEffect(() => {
    if (window.location.hash === "#products") {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [q]);

  return (
    <>
      <Hero slides={heroProducts} leftProduct={leftProduct} />

      <Categories selected={selectedTag} onSelect={setSelectedTag} />

      <section id="products">
        <ProductsGrid products={finalProducts} />

        {q && finalProducts.length === 0 && (
          <p style={{ textAlign: "center", marginTop: 18, fontWeight: 700 }}>
            No products found for “{qRaw}”
          </p>
        )}
      </section>

      <ReviewsSection products={allProducts} />
    </>
  );
}
