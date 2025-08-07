import { CheckProductInWishlistController } from "@/presentation/controllers/check-product-in-wishlist";
import { makeCheckProductInWishlist } from "../usecases/check-product-in-wishlist-factory";
import type { Controller } from "@/presentation/protocols";

export const makeCheckProductInWishlistController = (): Controller => {
  const checkProductInWishlist = makeCheckProductInWishlist();
  return new CheckProductInWishlistController(checkProductInWishlist);
};
