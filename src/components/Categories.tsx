"use client";

import Image from "next/image";
import styles from "./Categories.module.css";

type Category = {
  key: string;
  label: string;
  image: string;
};
const LEFT: Category[] = [
  {
    key: "watches",
    label: "Accessories",
    image: "/watch2.jpeg",
  },
  {
    key: "toy",
    label: "Toys",
    image: "/toy.jpg",
  },
  {
    key: "headphones",
    label: "Headphone",
    image: "/headphone.jpg",
  },
  {
    key: "storage",
    label: "Storage",
    image: "/harddisk.jpg",
  },
];
const MIDDLE: Category = {
  key: "Beauty",
  label: "Beauty",
  image: "/perfume.jpg",
};

const RIGHT_BIG: Category = {
  key: "electronics",
  label: "Electronics",
  image: "/earbuds.jpg",
};
const RIGHT_SMALL: Category[] = [
  {
    key: "bags",
    label: "Bags",
    image: "/handbag.jpg",
  },
  {
    key: "shoes",
    label: "Shoes",
    image: "/shoes.jpg",
  },
];

export default function Categories({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (tag: string | null) => void;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Explore Popular Categories</h2>
        <button className={styles.clearBtn} onClick={() => onSelect(null)}>
          Show all
        </button>
      </div>

      <div className={styles.layout}>
        {/* Left */}
        <div className={styles.leftGrid}>
          {LEFT.map((cat) => (
            <button
              key={cat.key}
              className={`${styles.tile} ${
                selected === cat.key ? styles.active : ""
              }`}
              onClick={() => onSelect(cat.key)}
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className={styles.img}
                sizes="(max-width: 900px) 50vw, 20vw"
              />
              <span className={styles.overlay} />
              <span className={styles.label}>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Middle big */}
        <button
          className={`${styles.tile} ${styles.middleBig} ${
            selected === MIDDLE.key ? styles.active : ""
          }`}
          onClick={() => onSelect(MIDDLE.key)}
        >
          <Image
            src={MIDDLE.image}
            alt={MIDDLE.label}
            fill
            className={styles.img}
            sizes="(max-width: 900px) 100vw, 35vw"
            priority
          />
          <span className={styles.overlay} />
          <span className={styles.label}>{MIDDLE.label}</span>
        </button>

        {/* Right block */}
        <div className={styles.rightBlock}>
          <button
            className={`${styles.tile} ${styles.rightBig} ${
              selected === RIGHT_BIG.key ? styles.active : ""
            }`}
            onClick={() => onSelect(RIGHT_BIG.key)}
          >
            <Image
              src={RIGHT_BIG.image}
              alt={RIGHT_BIG.label}
              fill
              className={styles.img}
              sizes="(max-width: 900px) 100vw, 35vw"
            />
            <span className={styles.label}>{RIGHT_BIG.label}</span>
          </button>

          <div className={styles.rightSmallGrid}>
            {RIGHT_SMALL.map((cat) => (
              <button
                key={cat.key}
                className={`${styles.tile} ${
                  selected === cat.key ? styles.active : ""
                }`}
                onClick={() => onSelect(cat.key)}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className={styles.img}
                  sizes="(max-width: 900px) 50vw, 17vw"
                />

                <span className={styles.label}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
