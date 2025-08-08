import type { WishlistProduct } from "@/domain/types";

export interface WishlistApiClient {
  addProduct: (customerId: string, productId: string) => Promise<void>;
  removeProduct: (customerId: string, productId: string) => Promise<void>;
  checkProduct: (customerId: string, productId: string) => Promise<boolean>;
  listProducts: (customerId: string) => Promise<WishlistProduct[]>;
}
