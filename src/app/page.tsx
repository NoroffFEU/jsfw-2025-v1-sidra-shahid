import HomeContent from "@/components/HomeContent";
import { fetchProducts, fetchProductsByIds, fetchProductById } from "@/lib/api";

export const metadata = {
  title: "Home | Online Shop",
  description:
    "Explore premium essentials, discover featured products, and shop the latest deals in our online store.",
};
const HERO_PRODUCT_IDS = [
  "159fdd2f-2b12-46de-9654-d9139525ba87",
  "7238397e-0ee5-4d5c-9e82-bda666dd2470",
  "ce5b64e3-440d-46e5-952f-bfdbad8a48d2",
  "9be4812e-16b2-44e6-bc55-b3aef9db2b82",
];

const FEATURED_LEFT_ID = "f2d44fba-09a7-4ccb-9ceb-a6212bf5c213";

export default async function HomePage() {
  const [allProducts, heroProducts, leftProduct] = await Promise.all([
    fetchProducts(),
    fetchProductsByIds(HERO_PRODUCT_IDS),
    fetchProductById(FEATURED_LEFT_ID),
  ]);

  return (
    <HomeContent
      allProducts={allProducts}
      heroProducts={heroProducts}
      leftProduct={leftProduct}
    />
  );
}
