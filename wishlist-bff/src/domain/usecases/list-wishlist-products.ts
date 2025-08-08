import type { WishlistProduct } from "@/domain/types";

export interface ListWishlistProducts {
  list: (customerId: string) => Promise<WishlistProduct[]>;
}
