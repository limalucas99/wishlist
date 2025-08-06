import { AddProductToWishlistController } from "@/presentation/controllers/add-product-to-wishlist";
import { makeAddProductToWishlist } from "../usecases/add-product-to-wishlist-factory";
import { makeCheckWishlistLimit } from "../usecases/check-wishlist-limit-factory";
import type { Controller } from "@/presentation/protocols";

export const makeAddProductToWishlistController = (): Controller => {
  const addProductToWishlist = makeAddProductToWishlist();
  const checkWishlistLimit = makeCheckWishlistLimit();
  return new AddProductToWishlistController(
    addProductToWishlist,
    checkWishlistLimit
  );
};
