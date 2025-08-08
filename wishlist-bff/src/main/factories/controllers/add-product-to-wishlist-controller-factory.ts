import { AddProductToWishlistController } from "@/presentation/controllers";
import { makeAddProductToWishlist } from "../usecases/add-product-to-wishlist-factory";

export const makeAddProductToWishlistController =
  (): AddProductToWishlistController => {
    const addProductToWishlist = makeAddProductToWishlist();
    return new AddProductToWishlistController(addProductToWishlist);
  };
