import { RemoveProductFromWishlistController } from "@/presentation/controllers/remove-product-from-wishlist";
import { makeRemoveProductFromWishlist } from "../usecases/remove-product-from-wishlist-factory";
import type { Controller } from "@/presentation/protocols";

export const makeRemoveProductFromWishlistController = (): Controller => {
  const removeProductFromWishlist = makeRemoveProductFromWishlist();
  return new RemoveProductFromWishlistController(removeProductFromWishlist);
};
