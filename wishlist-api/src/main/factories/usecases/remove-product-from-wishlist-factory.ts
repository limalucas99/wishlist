import { WishlistRepository } from "@/infra/db/mongodb/wishlist-repository";
import type { RemoveProductFromWishlist } from "@/domain/usecases/remove-product-from-wishlist";

export const makeRemoveProductFromWishlist = (): RemoveProductFromWishlist =>
  new WishlistRepository();
