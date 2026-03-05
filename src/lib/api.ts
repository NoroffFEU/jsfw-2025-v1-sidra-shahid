import { Product } from "./types";

const BASE_URL = "https://v2.api.noroff.dev/online-shop";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await response.json();
  return json.data as Product[];
}

export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch product by id");
  }

  const json = await response.json();
  return json.data as Product;
}

export async function fetchProductsByIds(ids: string[]): Promise<Product[]> {
  const results = await Promise.all(ids.map((id) => fetchProductById(id)));
  return results;
}
