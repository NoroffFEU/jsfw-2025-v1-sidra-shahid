"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./checkout.module.css";

import { showToast } from "@/lib/toast";
import { MdAdd, MdRemove, MdDelete } from "react-icons/md";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const total = Math.round(totalPrice());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Toast when removing item
  function handleRemoveItem(id: string, title: string) {
    remove(id);
    showToast(`${title} removed from cart`, "info", "header");
  }
  // Finish the order
  function handleCompleteOrder() {
    if (items.length === 0) return;

    clear();
    router.push("/order-success");
  }
  if (!isMounted) {
    return (
      <main className={styles.page}>
        <div className={styles.skeletonTitle}></div>

        <div className={styles.grid}>
          <section className={styles.left}>
            <div className={styles.skeletonHeading}></div>

            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.item}>
                <div className={styles.skeletonThumb}></div>

                <div className={styles.textBlock}>
                  <div className={styles.skeletonText}></div>
                  <div className={styles.skeletonPrice}></div>
                </div>

                <div className={styles.skeletonQty}></div>
              </div>
            ))}
          </section>

          <aside className={styles.right}>
            <div className={styles.skeletonHeading}></div>

            <div className={styles.summaryBox}>
              <div className={styles.skeletonSummaryRow}></div>
              <div className={styles.skeletonButton}></div>
            </div>
          </aside>
        </div>
      </main>
    );
  }
  return (
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>Checkout</h1>

      <div className={styles.grid}>
        {/* LEFT */}
        <section className={styles.left}>
          <h2 className={styles.sectionTitle}>Your Items</h2>

          {items.length === 0 ? (
            <p className={styles.emptyText}>Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.item}>
                {/* LEFT: image */}
                <div className={styles.thumb}>
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="90px"
                    className={styles.thumbImg}
                  />
                </div>

                {/* MIDDLE */}
                <div className={styles.textBlock}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemPrice}>
                    ${Math.round(item.price * item.quantity)}
                  </p>
                </div>

                {/* RIGHT */}
                <div className={styles.controls}>
                  <div className={styles.qtyPill}>
                    {item.quantity === 1 ? (
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        aria-label="Remove item"
                        onClick={() => handleRemoveItem(item.id, item.title)}
                      >
                        <MdDelete size={20} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        aria-label="Decrease quantity"
                        onClick={() => decrease(item.id)}
                      >
                        <MdRemove size={20} />
                      </button>
                    )}

                    <span className={styles.qtyValue}>{item.quantity}</span>

                    <button
                      type="button"
                      className={styles.qtyBtn}
                      aria-label="Increase quantity"
                      onClick={() => increase(item.id)}
                    >
                      <MdAdd size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* RIGHT */}
        <aside className={styles.right}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>

          <div className={styles.summaryBox}>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>${total}</span>
            </div>

            <button
              type="button"
              className={styles.completeBtn}
              disabled={items.length === 0}
              onClick={handleCompleteOrder}
            >
              Complete Order
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
