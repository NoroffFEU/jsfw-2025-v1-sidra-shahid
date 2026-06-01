import styles from "./ProductDetail.module.css";

export default function Loading() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.imageSkeleton}></div>
        </div>

        <div className={styles.right}>
          <div className={styles.skeletonSmall}></div>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonPrice}></div>
          <div className={styles.skeletonText}></div>
          <div className={styles.skeletonText}></div>
          <div className={styles.skeletonButton}></div>
        </div>
      </div>
    </section>
  );
}
