import type { Controller, HttpResponse } from "@/presentation/protocols";
import type { RemoveProductFromWishlistDto } from "../dtos/remove-product-from-wishlist.dto";
import { MissingParamError } from "../errors";
import { badRequest, deleted, serverError } from "../helpers/http-helper";
import type { RemoveProductFromWishlist } from "@/domain/usecases/remove-product-from-wishlist";

export class RemoveProductFromWishlistController implements Controller {
  constructor(
    private readonly removeProductFromWishlist: RemoveProductFromWishlist
  ) {}
  async handle(request: RemoveProductFromWishlistDto): Promise<HttpResponse> {
    try {
      if (!request.id) {
        return badRequest(new MissingParamError("id"));
      }
      const { id } = request;
      await this.removeProductFromWishlist.remove({ id });
      return deleted({ message: "Product removed from wishlist successfully" });
    } catch (error) {
      return serverError();
    }
  }
}
