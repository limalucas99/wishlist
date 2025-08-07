import type { WishlistModel } from "../models/wishlist";

export interface ListWishlistProducts {
  list(clientId: string): Promise<WishlistModel | null>;
}
