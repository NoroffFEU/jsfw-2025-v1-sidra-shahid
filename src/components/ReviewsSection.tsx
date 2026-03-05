"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import styles from "./ReviewsSection.module.css";
import { MdStar, MdStarBorder, MdStarHalf } from "react-icons/md";

type Review = {
  username: string;
  rating: number;
  description: string;
};

type ProductWithReviews = Product & {
  reviews?: Review[];
};

export default function ReviewsSection({
  products,
}: {
  products: ProductWithReviews[];
}) {
  const pages = useMemo(() => {
    const allReviews = (products ?? []).flatMap((p) =>
      (p.reviews ?? []).map((r) => ({
        username: r.username,
        rating: Number(r.rating) || 0,
        description: r.description,
        productTitle: p.title,
      })),
    );

    const grouped: Array<typeof allReviews> = [];
    for (let i = 0; i < allReviews.length; i += 2) {
      grouped.push(allReviews.slice(i, i + 2));
    }
    return grouped;
  }, [products]);

  const pageCount = pages.length;
  const [page, setPage] = useState(0);
  const AUTO_DELAY = 10000;
  const PAUSE_AFTER_CLICK = 15000;

  const pausedRef = useRef(false);
  const pauseTimeoutRef = useRef<number | null>(null);

  const goNext = () => {
    if (pageCount <= 1) return;
    setPage((p) => (p + 1) % pageCount);
  };

  const goPrev = () => {
    if (pageCount <= 1) return;
    setPage((p) => (p - 1 + pageCount) % pageCount);
  };

  const pauseAuto = () => {
    pausedRef.current = true;
    if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current);

    pauseTimeoutRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, PAUSE_AFTER_CLICK);
  };

  useEffect(() => {
    if (pageCount <= 1) return;

    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setPage((p) => (p + 1) % pageCount);
    }, AUTO_DELAY);

    return () => window.clearInterval(id);
  }, [pageCount]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  if (pageCount === 0) return null;

  return (
    <section className={styles.section} aria-label="Customer reviews">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>CUSTOMER REVIEWS</h2>
          <p className={styles.subtitle}>
            We value every customer’s voice. Here’s what people love most about
            shopping with us.
          </p>
        </header>

        <div
          className={styles.slider}
          role="region"
          aria-roledescription="carousel"
        >
          <div className={styles.viewport}>
            {pages.map((pair, idx) => (
              <div
                key={idx}
                className={`${styles.fadePage} ${idx === page ? styles.fadeActive : ""}`}
                aria-hidden={idx !== page}
              >
                <div className={styles.pageGrid}>
                  {pair.map((r, i) => (
                    <article className={styles.card} key={`${idx}-${i}`}>
                      <div className={styles.cardTop}>
                        <div className={styles.meta}>
                          <p className={styles.name}>{r.username}</p>
                          <p className={styles.product}>{r.productTitle}</p>
                        </div>

                        <div
                          className={styles.rating}
                          aria-label={`Rating ${r.rating} out of 5`}
                        >
                          {renderStars(r.rating)}
                        </div>
                      </div>

                      <p className={styles.desc}>{r.description}</p>
                    </article>
                  ))}

                  {pair.length === 1 && (
                    <div className={styles.cardGhost} aria-hidden="true" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => {
                goPrev();
                pauseAuto();
              }}
              aria-label="Previous reviews"
              disabled={pageCount <= 1}
            >
              <ArrowLeft />
            </button>

            <button
              type="button"
              className={styles.arrow}
              onClick={() => {
                goNext();
                pauseAuto();
              }}
              aria-label="Next reviews"
              disabled={pageCount <= 1}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderStars(rating: number) {
  const safe = Math.max(0, Math.min(5, rating));
  const full = Math.floor(safe);
  const half = safe % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className={styles.stars}>
      {Array.from({ length: full }).map((_, i) => (
        <MdStar key={`f-${i}`} size={16} />
      ))}
      {half && <MdStarHalf size={16} />}
      {Array.from({ length: empty }).map((_, i) => (
        <MdStarBorder key={`e-${i}`} size={16} />
      ))}
    </span>
  );
}

function ArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
