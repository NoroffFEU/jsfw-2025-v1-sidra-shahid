import type { Product } from "@/lib/types";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
  quantity: number;
};

const CART_KEY = "cart_items";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));

  window.dispatchEvent(new Event("cartUpdated"));
}

export function addToCart(product: Product, qty: number = 1) {
  const items = getCart();

  const price =
    product.discountedPrice < product.price
      ? product.discountedPrice
      : product.price;

  const existing = items.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += qty;
  } else {
    items.push({
      id: product.id,
      title: product.title,
      price,
      imageUrl: product.image.url,
      imageAlt: product.image.alt || product.title,
      quantity: qty,
    });
  }

  saveCart(items);
}

/* Increase quantity */
export function increaseQty(id: string) {
  const items = getCart();
  const item = items.find((i) => i.id === id);
  if (item) item.quantity += 1;
  saveCart(items);
}

/* Decrease quantity */
export function decreaseQty(id: string) {
  const items = getCart();
  const item = items.find((i) => i.id === id);

  if (!item) return;

  item.quantity -= 1;

  const updated = item.quantity <= 0 ? items.filter((i) => i.id !== id) : items;

  saveCart(updated);
}

/* Remove item completely */
export function removeFromCart(id: string) {
  const items = getCart().filter((i) => i.id !== id);
  saveCart(items);
}

/*Total items count */
export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
/*Clear entire cart */
export function clearCart() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
}
