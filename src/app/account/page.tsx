"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./account.module.css";
import { getSessionEmail, clearSession } from "@/lib/auth";

export default function AccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const sessionEmail = getSessionEmail();

    if (!sessionEmail) {
      router.push("/login?redirect=/account");
      return;
    }

    setEmail(sessionEmail);
  }, [router]);

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
