import type {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import { ok, serverError, notFound } from "@/presentation/protocols/http";
import type { RemoveProductFromWishlist } from "@/domain/usecases/remove-product-from-wishlist";
import { HttpStatusCode } from "../enums/http";

export class RemoveProductFromWishlistController implements Controller {
  constructor(
    private readonly removeProductFromWishlist: RemoveProductFromWishlist
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { productId } = httpRequest.params;
      const { customerId } = httpRequest.customer!;

      await this.removeProductFromWishlist.remove(customerId, productId);
      return ok({ message: "Product removed from wishlist" });
    } catch (error: any) {
      if (error.statusCode === HttpStatusCode.NOT_FOUND) {
        return notFound(error);
      }
      return serverError(error);
    }
  }
}
