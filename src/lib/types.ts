export interface ApiImage {
  url: string;
  alt?: string;
}

export interface Review {
  id: string;
  username: string;
  rating: number;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  discountedPrice: number;
  rating: number;
  image: ApiImage;
  tags?: string[];
  reviews?: Review[];
}
