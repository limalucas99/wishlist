import { ListWishlistProductsController } from "@/presentation/controllers/list-wishlist-products-controller";
import { makeListWishlistProducts } from "../usecases/list-wishlist-products-factory";

export const makeListWishlistProductsController =
  (): ListWishlistProductsController => {
    const listWishlistProducts = makeListWishlistProducts();
    return new ListWishlistProductsController(listWishlistProducts);
  };
