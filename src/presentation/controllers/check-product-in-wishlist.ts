import type { Controller, HttpResponse } from "@/presentation/protocols";
import type { CheckProductInWishlistDto } from "../dtos/check-product-in-wishlist.dto";
import { MissingParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import type { CheckProductInWishlist } from "@/domain/usecases/check-product-in-wishlist";

export class CheckProductInWishlistController implements Controller {
  constructor(
    private readonly checkProductInWishlist: CheckProductInWishlist
  ) {}
  async handle(request: CheckProductInWishlistDto): Promise<HttpResponse> {
    try {
      if (!request.id) {
        return badRequest(new MissingParamError("id"));
      }
      const { id } = request;
      const isInWishlist = await this.checkProductInWishlist.check({ id });
      return ok({ isInWishlist });
    } catch (error) {
      return serverError();
    }
  }
}
