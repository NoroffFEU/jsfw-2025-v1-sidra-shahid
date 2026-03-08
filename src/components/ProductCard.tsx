"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import { Product } from "@/lib/types";
import { MdOutlineShoppingCart, MdStar, MdOutlineStar } from "react-icons/md";
import { showToast } from "@/lib/toast";
import { useCartStore } from "@/store/cartStore";

// Calculates the discount percentage between the original price and discounted price
function getDiscountPercent(price: number, discountedPrice: number) {
  if (discountedPrice >= price) return 0;
  return Math.round(((price - discountedPrice) / price) * 100);
}

// Displays star icons based on the product rating
function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);

  return (
    <div className={styles.stars} aria-label={`Rating ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rounded ? (
          <MdStar key={star} className={styles.starFilled} />
        ) : (
          <MdOutlineStar key={star} className={styles.starEmpty} />
        ),
      )}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const discountPercent = getDiscountPercent(
    product.price,
    product.discountedPrice,
  );
  const isOnSale = discountPercent > 0;
  const shownPrice = isOnSale ? product.discountedPrice : product.price;
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <article className={styles.card}>
      <Link
        href={`/products/${encodeURIComponent(product.id)}`}
        scroll={true}
        className={styles.imageLink}
        aria-label={`View details for ${product.title}`}
      >
        <div className={styles.imageWrap}>
          {isOnSale && (
            <span className={styles.badge}>-{discountPercent}%</span>
          )}

          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className={styles.image}
            priority={false}
          />
        </div>
      </Link>

      {/* Bottom content */}
      <div className={styles.bottom}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.ratingRow}>
          <Stars rating={product.rating} />
        </div>

        <div className={styles.priceCartRow}>
          <div className={styles.prices}>
            <span className={styles.currentPrice}>
              ${Math.round(shownPrice)}
            </span>
            {isOnSale && (
              <span className={styles.originalPrice}>
                ${Math.round(product.price)}
              </span>
            )}
          </div>
          <button
            className={styles.cartBtn}
            aria-label="Add to cart"
            type="button"
            onClick={() => {
              addToCart(
                {
                  id: product.id,
                  title: product.title,
                  price: shownPrice,
                  imageUrl: product.image.url,
                  imageAlt: product.image.alt || product.title,
                },
                1,
              );

              showToast("Item added to cart", "success", "header");
            }}
          >
            <MdOutlineShoppingCart className={styles.cartIcon} />
          </button>
        </div>
      </div>
    </article>
  );
}
