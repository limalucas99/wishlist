import { WishlistRepository } from "@/infra/db/mongodb/wishlist-repository";
import type { AddProductToWishlist } from "@/domain/usecases/add-product-to-wishlist";

export const makeAddProductToWishlist = (): AddProductToWishlist =>
  new WishlistRepository();
