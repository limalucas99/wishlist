import { CheckProductInWishlistController } from "@/presentation/controllers/check-product-in-wishlist-controller";
import { makeCheckProductInWishlist } from "../usecases/check-product-in-wishlist-factory";

export const makeCheckProductInWishlistController =
  (): CheckProductInWishlistController => {
    const checkProductInWishlist = makeCheckProductInWishlist();
    return new CheckProductInWishlistController(checkProductInWishlist);
  };
