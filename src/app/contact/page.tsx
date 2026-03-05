"use client";

import { useState } from "react";
import styles from "./contact.module.css";

type Errors = {
  fullName: string;
  subject: string;
  email: string;
  message: string;
};

type ToastType = "success" | "error";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Errors>({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success");

  // Shows a small message (success or error) inside the form card
  function showCardToast(msg: string, type: ToastType) {
    setToastMsg(msg);
    setToastType(type);

    window.setTimeout(() => {
      setToastMsg("");
    }, 2000);
  }

  // Simple check to see if the email contains "@" and "."
  function isValidEmail(value: string) {
    return value.includes("@") && value.includes(".");
  }
  // Validates all form fields and sets error messages if something is wrong
  function validate(): boolean {
    const newErrors: Errors = {
      fullName: "",
      subject: "",
      email: "",
      message: "",
    };

    let ok = true;

    if (fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
      ok = false;
    }

    if (subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
      ok = false;
    }

    if (!isValidEmail(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
      ok = false;
    }

    if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  }
  // Handles form submission
  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate()) {
      showCardToast("Please fix the errors and try again.", "error");
      return;
    }

    showCardToast("Message sent successfully!", "success");

    setFullName("");
    setSubject("");
    setEmail("");
    setMessage("");
    setErrors({ fullName: "", subject: "", email: "", message: "" });
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Contact Us</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className={styles.field}>
            <label className={styles.label}>FULL NAME</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <p className={styles.info}>Minimum 3 characters.</p>
            {errors.fullName && (
              <p className={styles.error}>{errors.fullName}</p>
            )}
          </div>

          {/* Subject */}
          <div className={styles.field}>
            <label className={styles.label}>SUBJECT</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <p className={styles.info}>Minimum 3 characters.</p>
            {errors.subject && <p className={styles.error}>{errors.subject}</p>}
          </div>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label}>EMAIL</label>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className={styles.info}>Example: student@stud.noroff.no</p>
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          {/* Message */}
          <div className={styles.field}>
            <label className={styles.label}>MESSAGE</label>
            <textarea
              className={styles.textarea}
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <p className={styles.info}>Minimum 10 characters.</p>
            {errors.message && <p className={styles.error}>{errors.message}</p>}
          </div>

          <div className={styles.toastSpace}>
            {toastMsg && (
              <div
                className={`${styles.toast} ${
                  toastType === "success"
                    ? styles.toastSuccess
                    : styles.toastError
                }`}
              >
                {toastMsg}
              </div>
            )}
          </div>

          <button className={styles.button} type="submit">
            SEND MESSAGE
          </button>
        </form>
      </section>
    </main>
  );
}
