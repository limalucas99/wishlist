import type { Controller, HttpResponse } from "@/presentation/protocols";
import type { RemoveProductFromWishlistDto } from "../dtos/remove-product-from-wishlist.dto";
import { MissingParamError } from "../errors";
import { badRequest, deleted, serverError } from "../helpers/http-helper";
import type { RemoveProductFromWishlist } from "@/domain/usecases/remove-product-from-wishlist";
import type { ProductModel } from "@/domain/models/product";

export class RemoveProductFromWishlistController implements Controller {
  constructor(
    private readonly removeProductFromWishlist: RemoveProductFromWishlist
  ) {}
  async handle(request: RemoveProductFromWishlistDto): Promise<HttpResponse> {
    try {
      if (!request.clientId) {
        return badRequest(new MissingParamError("clientId"));
      }
      if (!request.productId) {
        return badRequest(new MissingParamError("productId"));
      }

      const { clientId, productId } = request;

      const product: ProductModel = { id: productId };

      await this.removeProductFromWishlist.remove(product, clientId);

      return deleted({ message: "Product removed from wishlist successfully" });
    } catch (error) {
      return serverError();
    }
  }
}
