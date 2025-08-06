import { WishlistRepository } from "@/infra/db/mongodb/wishlist-repository";
import type { CheckProductInWishlist } from "@/domain/usecases/check-product-in-wishlist";

export const makeCheckProductInWishlist = (): CheckProductInWishlist =>
  new WishlistRepository();
