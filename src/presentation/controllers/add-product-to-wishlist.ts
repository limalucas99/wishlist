import type { Controller, HttpResponse } from "@/presentation/protocols";
import type { AddProductToWishlistDto } from "../dtos/add-product-to-wishlist.dto";
import { MissingParamError, WishlistLimitExceededError } from "../errors";
import { badRequest, created, serverError } from "../helpers/http-helper";
import type {
  AddProductToWishlist,
  CheckWishlistLimit,
} from "@/domain/usecases/add-product-to-wishlist";
import type { ProductModel } from "@/domain/models/product";
import { MAX_WISHLIST_PRODUCTS } from "@/domain/constants";

export class AddProductToWishlistController implements Controller {
  constructor(
    private readonly addProductToWishList: AddProductToWishlist,
    private readonly checkWishlistLimit: CheckWishlistLimit
  ) {}
  async handle(request: AddProductToWishlistDto): Promise<HttpResponse> {
    try {
      if (!request.clientId) {
        return badRequest(new MissingParamError("clientId"));
      }
      if (!request.productId) {
        return badRequest(new MissingParamError("productId"));
      }

      const { clientId, productId } = request;

      const currentProductCount = await this.checkWishlistLimit.checkLimit(
        clientId
      );
      if (currentProductCount >= MAX_WISHLIST_PRODUCTS) {
        return badRequest(new WishlistLimitExceededError());
      }

      const product: ProductModel = { id: productId };
      await this.addProductToWishList.add(product, clientId);

      return created({
        message: "Product added to wishlist successfully",
        product,
      });
    } catch (error) {
      return serverError();
    }
  }
}
