"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../auth/auth.module.css";
import Toast from "@/components/Toast";
import { showToast } from "@/lib/toast";
import { createSession, getUser } from "@/lib/auth";

type Errors = {
  email: string;
  password: string;
};

// Checks if the email format is valid
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  });

  // Validates the email and password fields and sets error messages if needed
  function validate(nextEmail: string, nextPassword: string) {
    const nextErrors: Errors = { email: "", password: "" };

    if (!nextEmail.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(nextEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!nextPassword.trim()) {
      nextErrors.password = "Password is required.";
    } else if (nextPassword.length < 8) {
      nextErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(nextErrors);

    return nextErrors.email === "" && nextErrors.password === "";
  }

  // Handles login submission
  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const ok = validate(email, password);
    if (!ok) {
      showToast("Please fix the errors above.", "error", "auth");
      return;
    }

    const user = getUser();
    if (!user) {
      showToast("No account found. Please register first.", "error", "auth");
      return;
    }

    const emailOk = user.email.toLowerCase() === email.trim().toLowerCase();
    const passOk = user.password === password;

    if (!emailOk || !passOk) {
      showToast("Email or password is incorrect.", "error", "auth");
      return;
    }

    createSession(user.email);
    showToast(" Login successful!", "success", "auth");

    setTimeout(() => {
      router.push(redirect);
    }, 1000);
  }

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>Login</h1>

        {/* Email */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>

          <input
            id="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            onBlur={() => validate(email, password)}
          />

          <p className={styles.hint}>Example: student@noroff.no</p>
          {errors.email ? <p className={styles.error}>{errors.email}</p> : null}
        </div>

        {/* Password */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>

          <input
            id="password"
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: "" }));
            }}
            onBlur={() => validate(email, password)}
          />

          <p className={styles.hint}>
            Password must be at least 8 characters long.
          </p>
          {errors.password ? (
            <p className={styles.error}>{errors.password}</p>
          ) : null}
        </div>

        <button className={styles.button} type="submit">
          Login
        </button>

        <p className={styles.bottomRow}>
          Don&apos;t have an account?{" "}
          <a className={styles.link} href="/register">
            Register
          </a>
        </p>

        <Toast target="auth" />
      </form>
    </div>
  );
}
