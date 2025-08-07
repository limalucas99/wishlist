import type { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddProductToWishlistController } from "../factories/controllers/add-product-to-wishlist-controller-factory";
import { makeRemoveProductFromWishlistController } from "../factories/controllers/remove-product-from-wishlist-controller-factory";
import { makeCheckProductInWishlistController } from "../factories/controllers/check-product-in-wishlist-controller-factory";
import { makeListWishlistProductsController } from "../factories/controllers/list-wishlist-products-controller-factory";

export default (router: Router): void => {
  router.get(
    "/v1/wishlist/:clientId",
    adaptRoute(makeListWishlistProductsController())
  );
  router.post(
    "/v1/wishlist/:clientId/products",
    adaptRoute(makeAddProductToWishlistController())
  );
  router.delete(
    "/v1/wishlist/:clientId/products/:productId",
    adaptRoute(makeRemoveProductFromWishlistController())
  );
  router.get(
    "/v1/wishlist/:clientId/products/:productId",
    adaptRoute(makeCheckProductInWishlistController())
  );
};
