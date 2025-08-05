import type { Controller, HttpResponse } from "@/presentation/protocols";
import type { CheckProductInWishlistDto } from "../dtos/check-product-in-wishlist.dto";
import { MissingParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import type { CheckProductInWishlist } from "@/domain/usecases/check-product-in-wishlist";
import type { ProductModel } from "@/domain/models/product";

export class CheckProductInWishlistController implements Controller {
  constructor(
    private readonly checkProductInWishlist: CheckProductInWishlist
  ) {}
  async handle(request: CheckProductInWishlistDto): Promise<HttpResponse> {
    try {
      if (!request.clientId) {
        return badRequest(new MissingParamError("clientId"));
      }
      if (!request.productId) {
        return badRequest(new MissingParamError("productId"));
      }

      const { clientId, productId } = request;

      const product: ProductModel = { id: productId };

      const isInWishlist = await this.checkProductInWishlist.check(
        product,
        clientId
      );
      return ok({ isInWishlist });
    } catch (error) {
      return serverError();
    }
  }
}
