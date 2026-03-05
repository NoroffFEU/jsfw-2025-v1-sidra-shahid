import Image from "next/image";
import styles from "./ProductDetail.module.css";
import { fetchProductById } from "@/lib/api";
import ProductDetailClient from "./ProductDetailClient";
import { MdStar, MdOutlineStar } from "react-icons/md";

export const metadata = {
  title: "Product | Online Shop",
  description: "View product details and shop online.",
};
// Displays star icons based on the product rating
function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div className={styles.stars} aria-label={`Rating ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) =>
        n <= rounded ? (
          <MdStar key={n} className={styles.starFilled} />
        ) : (
          <MdOutlineStar key={n} className={styles.starEmpty} />
        ),
      )}
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cleanId = decodeURIComponent(id).trim();

  const product = await fetchProductById(cleanId);

  const isOnSale = product.discountedPrice < product.price;
  const shownPrice = Math.round(
    isOnSale ? product.discountedPrice : product.price,
  );

  return (
    <>
      <section className={styles.section}>
        <div className={styles.wrapper}>
          {/* LEFT */}
          <div className={styles.left}>
            <div className={styles.imageWrap}>
              <Image
                src={product.image.url}
                alt={product.image.alt || product.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.right}>
            {/* TAGS ABOVE TITLE */}
            {product.tags && product.tags.length > 0 && (
              <div className={styles.tagsRow}>
                {product.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.priceRatingRow}>
              <div className={styles.priceBlock}>
                <span className={styles.priceCurrent}>${shownPrice}</span>

                {isOnSale && (
                  <span className={styles.priceOld}>
                    ${Math.round(product.price)}
                  </span>
                )}
              </div>
              <Stars rating={product.rating} />
            </div>

            <div className={styles.descBlock}>
              <h3 className={styles.descTitle}>Item Description</h3>
              <p className={styles.descText}>
                {product.description || "No description available."}
              </p>
            </div>

            {/* Actions */}
            <ProductDetailClient product={product} />
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION UNDER MAIN SECTION */}
      <section className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>Customer Reviews</h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className={styles.reviewsList}>
            {product.reviews.map((r) => (
              <article key={r.id} className={styles.reviewCard}>
                <div className={styles.reviewTop}>
                  <div>
                    <p className={styles.reviewName}>{r.username}</p>
                  </div>

                  <div
                    className={styles.stars}
                    aria-label={`${r.rating} stars`}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className={
                          n <= r.rating ? styles.starFilled : styles.starEmpty
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <p className={styles.reviewText}>{r.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.noReviews}>No reviews yet.</p>
        )}
      </section>
    </>
  );
}
