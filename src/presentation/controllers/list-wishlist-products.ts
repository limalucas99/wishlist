import type { Controller, HttpResponse } from "@/presentation/protocols";
import type { ListWishlistProductsDto } from "../dtos/list-wishlist-products.dto";
import { MissingParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import type { ListWishlistProducts } from "@/domain/usecases/list-wishlist-products";

export class ListWishlistProductsController implements Controller {
  constructor(private readonly listWishlistProducts: ListWishlistProducts) {}
  async handle(request: ListWishlistProductsDto): Promise<HttpResponse> {
    try {
      if (!request.clientId) {
        return badRequest(new MissingParamError("clientId"));
      }

      const { clientId } = request;
      const wishlist = await this.listWishlistProducts.list(clientId);

      return ok({
        products: wishlist?.products ?? [],
      });
    } catch (error) {
      return serverError();
    }
  }
}
