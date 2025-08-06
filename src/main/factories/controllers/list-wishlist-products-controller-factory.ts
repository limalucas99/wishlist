import { ListWishlistProductsController } from "@/presentation/controllers/list-wishlist-products";
import { makeListWishlistProducts } from "../usecases/list-wishlist-products-factory";
import type { Controller } from "@/presentation/protocols";

export const makeListWishlistProductsController = (): Controller => {
  const listWishlistProducts = makeListWishlistProducts();
  return new ListWishlistProductsController(listWishlistProducts);
};
