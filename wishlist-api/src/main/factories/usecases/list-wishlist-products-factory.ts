import { WishlistRepository } from "@/infra/db/mongodb/wishlist-repository";
import type { ListWishlistProducts } from "@/domain/usecases/list-wishlist-products";

export const makeListWishlistProducts = (): ListWishlistProducts =>
  new WishlistRepository();
