"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./order-success.module.css";
import { showToast } from "@/lib/toast";

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    showToast("Order completed successfully!", "success");
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Order Completed!</h1>
        <p className={styles.text}>
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <button
          className={styles.button}
          type="button"
          onClick={() => router.push("/")}
        >
          Continue Shopping
        </button>
      </div>
    </main>
  );
}
