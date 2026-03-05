"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../auth/auth.module.css";

import Toast from "@/components/Toast";
import { showToast } from "@/lib/toast";
import { saveUser, getUser } from "@/lib/auth";

type Errors = {
  name: string;
  email: string;
  password: string;
};

// Checks if the email format is valid
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    password: "",
  });

  // Validates the email and password fields and sets error messages if needed
  function validate(nextName: string, nextEmail: string, nextPassword: string) {
    const nextErrors: Errors = { name: "", email: "", password: "" };

    if (!nextName.trim()) {
      nextErrors.name = "Full name is required.";
    } else if (nextName.trim().length < 3) {
      nextErrors.name = "Full name must be at least 3 characters.";
    }

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

    return (
      nextErrors.name === "" &&
      nextErrors.email === "" &&
      nextErrors.password === ""
    );
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const ok = validate(name, email, password);
    if (!ok) {
      showToast("Please fix the errors above.", "error", "auth");
      return;
    }

    const existing = getUser();
    if (
      existing &&
      existing.email.toLowerCase() === email.trim().toLowerCase()
    ) {
      showToast("This email is already registered.", "error", "auth");
      return;
    }

    saveUser({ name: name.trim(), email: email.trim(), password });
    showToast("Registration successful!", "success", "auth");

    setTimeout(() => {
      router.push("/login");
    }, 700);
  }

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>Register</h1>

        {/* Full name */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Full Name
          </label>

          <input
            id="name"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            onBlur={() => validate(name, email, password)}
          />

          <p className={styles.hint}>Must be at least 3 characters long.</p>
          {errors.name ? <p className={styles.error}>{errors.name}</p> : null}
        </div>

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
            onBlur={() => validate(name, email, password)}
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
            onBlur={() => validate(name, email, password)}
          />

          <p className={styles.hint}>
            Password must be at least 8 characters long.
          </p>
          {errors.password ? (
            <p className={styles.error}>{errors.password}</p>
          ) : null}
        </div>

        <button className={styles.button} type="submit">
          Register
        </button>

        <p className={styles.bottomRow}>
          Already have an account?{" "}
          <a className={styles.link} href="/login">
            Login
          </a>
        </p>

        <Toast target="auth" />
      </form>
    </div>
  );
}
