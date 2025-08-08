import { RemoveProductFromWishlistController } from "@/presentation/controllers/remove-product-from-wishlist-controller";
import { makeRemoveProductFromWishlist } from "../usecases/remove-product-from-wishlist-factory";

export const makeRemoveProductFromWishlistController =
  (): RemoveProductFromWishlistController => {
    const removeProductFromWishlist = makeRemoveProductFromWishlist();
    return new RemoveProductFromWishlistController(removeProductFromWishlist);
  };
