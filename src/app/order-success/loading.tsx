import styles from "./order-success.module.css";

export default function Loading() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonTextSmall}></div>
        <div className={styles.skeletonButton}></div>
      </div>
    </main>
  );
}
