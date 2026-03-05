import { create } from "zustand";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  imageAlt?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;

  totalPrice: () => number;
  totalItems: () => number;
}

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("cart_items");
  return data ? JSON.parse(data) : [];
}

function saveCart(items: CartItem[]) {
  localStorage.setItem("cart_items", JSON.stringify(items));
}

export const useCartStore = create<CartState>((set, get) => ({
  items: loadCart(),

  addToCart: (item, qty = 1) => {
    const items = [...get().items];

    const existing = items.find((i) => i.id === item.id);

    if (existing) {
      existing.quantity += qty;
    } else {
      items.push({ ...item, quantity: qty });
    }

    saveCart(items);
    set({ items });
  },

  increase: (id) => {
    const items = get().items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );

    saveCart(items);
    set({ items });
  },

  decrease: (id) => {
    let items = get().items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
    );
    items = items.filter((item) => item.quantity > 0);

    saveCart(items);
    set({ items });
  },

  remove: (id) => {
    const items = get().items.filter((item) => item.id !== id);
    saveCart(items);
    set({ items });
  },

  clear: () => {
    saveCart([]);
    set({ items: [] });
  },

  totalPrice: () => {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },

  totalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
