"use client";

import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

type ToastType = "success" | "error" | "info";
type ToastTarget = "header" | "auth";

type Props = {
  target: ToastTarget;
};

export default function Toast({ target }: Props) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("info");

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{
        message: string;
        type: ToastType;
        target: ToastTarget;
      }>;

      if (custom.detail.target !== target) return;

      setMessage(custom.detail.message);
      setType(custom.detail.type || "info");

      setShow(true);
      setTimeout(() => setShow(false), 5000);
    };

    window.addEventListener("showToast", handler);
    return () => window.removeEventListener("showToast", handler);
  }, [target]);

  return (
    <div
      className={`${styles.toast} ${show ? styles.show : ""} ${styles[type]}`}
    >
      {message}
    </div>
  );
}
