"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";

// Returns the product price, using the discounted price if available
function effectivePrice(p: Product) {
  const price = p.discountedPrice < p.price ? p.discountedPrice : p.price;
  return Math.round(price);
}
// Checks if the product currently has a discount
function isOnSale(p: Product) {
  return p.discountedPrice < p.price;
}

export default function Hero({
  slides,
  leftProduct,
}: {
  slides: Product[];
  leftProduct: Product;
}) {
  const [index, setIndex] = useState(0);

  // Automatically changes the slide every few seconds
  useEffect(() => {
    if (slides.length === 0) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className={styles.hero}>
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>
            Elevate your lifestyle with premium essentials.
          </h2>
          <p className={styles.subtitle}>
            Bring style to your look, innovation to your routine, and joy to
            every age. Discover essentials made to fit beautifully into your
            lifestyle.
          </p>
          <div className={styles.action}>
            <a href="#products" className={styles.heroBtn}>
              Products
            </a>
          </div>
        </div>

        {/* LEFT FEATURED */}
        <div className={styles.bottomSection}>
          <div className={styles.text}>
            <span className={styles.pill}>Featured</span>

            <h3 className={styles.featureTitle}>{leftProduct.title}</h3>

            <p className={styles.featureDesc}>
              {(leftProduct.description ?? "").slice(0, 90)}
              {(leftProduct.description ?? "").length > 90 ? "..." : ""}
            </p>

            <p className={styles.price}>
              ${effectivePrice(leftProduct)}
              {isOnSale(leftProduct) && (
                <span className={styles.oldPrice}> ${leftProduct.price}</span>
              )}
            </p>
          </div>

          <Link
            href={`/products/${leftProduct.id}`}
            scroll={true}
            className={styles.featureImg}
            aria-label={`Go to ${leftProduct.title}`}
          >
            <Image
              src={leftProduct.image.url}
              alt={leftProduct.image.alt ?? leftProduct.title}
              fill
              sizes="(max-width: 900px) 100vw, 25vw"
              className={styles.featureImage}
              priority
            />
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.right}>
        <div className={styles.slider}>
          {slides.map((p, i) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className={`${styles.slide} ${i === index ? styles.active : ""}`}
              aria-label={`Go to ${p.title}`}
            >
              <Image
                src={p.image.url}
                alt={p.image.alt ?? p.title}
                fill
                className={styles.slideImg}
                priority={i === 0}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
