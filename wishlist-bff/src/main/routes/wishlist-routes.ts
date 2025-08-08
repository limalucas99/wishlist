import type { Router } from "express";
import { adaptRoute } from "@/main/adapters/express-route-adapter";
import { auth } from "@/main/middlewares/auth";
import { makeAddProductToWishlistController } from "@/main/factories/controllers/add-product-to-wishlist-controller-factory";
import { makeListWishlistProductsController } from "@/main/factories/controllers/list-wishlist-products-controller-factory";
import { makeCheckProductInWishlistController } from "@/main/factories/controllers/check-product-in-wishlist-controller-factory";
import { makeRemoveProductFromWishlistController } from "@/main/factories/controllers/remove-product-from-wishlist-controller-factory";

export default (router: Router): void => {
  router.get(
    "/v1/wishlist",
    auth,
    adaptRoute(makeListWishlistProductsController())
  );
  router.post(
    "/v1/wishlist",
    auth,
    adaptRoute(makeAddProductToWishlistController())
  );
  router.get(
    "/v1/wishlist/:productId",
    auth,
    adaptRoute(makeCheckProductInWishlistController())
  );
  router.delete(
    "/v1/wishlist/:productId",
    auth,
    adaptRoute(makeRemoveProductFromWishlistController())
  );
};
