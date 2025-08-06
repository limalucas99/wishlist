import { AddProductToWishlistController } from "@/presentation/controllers/add-product-to-wishlist";
import { makeAddProductToWishlist } from "../usecases/add-product-to-wishlist-factory";
import type { Controller } from "@/presentation/protocols";

export const makeAddProductToWishlistController = (): Controller => {
  const addProductToWishlist = makeAddProductToWishlist();
  return new AddProductToWishlistController(addProductToWishlist);
};
