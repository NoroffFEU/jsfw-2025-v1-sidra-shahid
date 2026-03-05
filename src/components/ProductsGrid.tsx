"use client";

import { useMemo, useState } from "react";
import styles from "./ProductsGrid.module.css";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type SortOption = "recommended" | "priceLow" | "priceHigh" | "nameAZ";

function getEffectivePrice(p: Product) {
  return p.discountedPrice < p.price ? p.discountedPrice : p.price;
}

export default function ProductsGrid({ products }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [open, setOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    const copy = [...products];

    if (sortBy === "priceLow") {
      copy.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
    }

    if (sortBy === "priceHigh") {
      copy.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
    }

    if (sortBy === "nameAZ") {
      copy.sort((a, b) => a.title.localeCompare(b.title));
    }

    return copy;
  }, [products, sortBy]);

  const handleSelect = (value: SortOption) => {
    setSortBy(value);
    setOpen(false);
  };

  return (
    <section className={styles.section}>
      <div className={styles.topRow}>
        <h2 className={styles.heading}>Products</h2>

        <div className={styles.sortWrapper}>
          <button className={styles.sortButton} onClick={() => setOpen(!open)}>
            Sort by
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>

          {open && (
            <div className={styles.dropdown}>
              <div onClick={() => handleSelect("recommended")}>Recommended</div>
              <div onClick={() => handleSelect("priceLow")}>
                Price, low to high
              </div>
              <div onClick={() => handleSelect("priceHigh")}>
                Price, high to low
              </div>
              <div onClick={() => handleSelect("nameAZ")}>Name, A–Z</div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
