"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./account.module.css";
import { getSessionEmail, clearSession } from "@/lib/auth";

export default function AccountPage() {
  const router = useRouter();
  const email = getSessionEmail();

  useEffect(() => {
    if (!email) {
      router.push("/login?redirect=/account");
    }
  }, [email, router]);

  // Clears the user session and sends the user back to the home page
  function handleLogout() {
    clearSession();
    router.push("/");
  }
  if (!email) return null;
  const username = email.split("@")[0];
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.welcome}>
          Welcome, <span>{username}</span>
        </h2>

        <p className={styles.email}>Email: {email}</p>

        <button
          className={styles.logoutBtn}
          onClick={handleLogout}
          type="button"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
