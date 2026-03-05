"use client";

import Image from "next/image";
import styles from "./CartDrawer.module.css";
import { MdClose, MdAdd, MdRemove, MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { getSessionEmail } from "@/lib/auth";
import { showToast } from "@/lib/toast";
import { useCartStore } from "@/store/cartStore";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const remove = useCartStore((state) => state.remove);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const total = Math.round(totalPrice());

  // Removes an item from the cart and shows a toast message
  function handleRemoveItem(id: string, title: string) {
    remove(id);
    showToast(`${title} removed from cart`, "info", "header");
  }
  // Handles checkout
  function handleCheckout() {
    const sessionEmail = getSessionEmail();

    // close drawer when navigating
    onClose();

    if (!sessionEmail) {
      router.push("/login?redirect=/checkout");
      return;
    }

    router.push("/checkout");
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropShow : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className={`${styles.drawer} ${open ? styles.open : ""}`}>
        {/* Header */}
        <div className={styles.header}>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close cart"
            type="button"
          >
            <MdClose />
          </button>

          <h2 className={styles.title}>Cart</h2>

          <div style={{ width: 40 }} />
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyText}>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.item}>
                {/* Image */}
                <div className={styles.thumb}>
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="90px"
                    className={styles.thumbImg}
                  />
                </div>

                {/* Info */}
                <div className={styles.info}>
                  <div className={styles.textBlock}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.price}>
                      ${Math.round(item.price * item.quantity)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className={styles.qtyRow}>
                    {item.quantity === 1 ? (
                      <button
                        type="button"
                        className={styles.qtyBtnDark}
                        aria-label="Remove item"
                        onClick={() => handleRemoveItem(item.id, item.title)}
                      >
                        <MdDelete />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={styles.qtyBtnDark}
                        aria-label="Decrease quantity"
                        onClick={() => decrease(item.id)}
                      >
                        <MdRemove />
                      </button>
                    )}

                    <span className={styles.qtyValue}>{item.quantity}</span>

                    <button
                      type="button"
                      className={styles.qtyBtnDark}
                      aria-label="Increase quantity"
                      onClick={() => increase(item.id)}
                    >
                      <MdAdd />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalValue}>${total}</span>
          </div>

          <button
            className={styles.checkoutBtn}
            disabled={items.length === 0}
            type="button"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
