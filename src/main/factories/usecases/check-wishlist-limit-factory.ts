import { WishlistRepository } from "@/infra/db/mongodb/wishlist-repository";
import type { CheckWishlistLimit } from "@/domain/usecases/add-product-to-wishlist";

export const makeCheckWishlistLimit = (): CheckWishlistLimit =>
  new WishlistRepository();
