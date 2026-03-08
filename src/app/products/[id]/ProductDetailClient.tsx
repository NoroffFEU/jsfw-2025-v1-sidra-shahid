"use client";

import { useState, useEffect } from "react";
import styles from "./ProductDetail.module.css";
import type { Product } from "@/lib/types";
import { MdAdd, MdRemove } from "react-icons/md";
import { showToast } from "@/lib/toast";

import { useCartStore } from "@/store/cartStore";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const decrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };
  const increase = () => {
    setQty(qty + 1);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [product.id]);
  // Adds the product to the cart with the selected quantity and shows a toast message
  function handleAddToCart() {
    const price = Math.round(
      product.discountedPrice < product.price
        ? product.discountedPrice
        : product.price,
    );

    addToCart(
      {
        id: product.id,
        title: product.title,
        price: price,
        imageUrl: product.image.url,
        imageAlt: product.image.alt || product.title,
      },
      qty,
    );

    showToast("Item added to cart", "success", "header");
  }
  return (
    <div className={styles.actions}>
      <div className={styles.qtyRow}>
        <span className={styles.qtyLabel}>Quantity</span>

        <div className={styles.qtyControlsModern}>
          <button
            type="button"
            className={styles.qtyCircleBtn}
            onClick={decrease}
            disabled={qty === 1}
            aria-label="Decrease quantity"
          >
            <MdRemove />
          </button>

          <span className={styles.qtyValueModern}>{qty}</span>

          <button
            type="button"
            className={styles.qtyCircleBtn}
            onClick={increase}
            aria-label="Increase quantity"
          >
            <MdAdd />
          </button>
        </div>
      </div>

      <button
        type="button"
        className={styles.addToCart}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
