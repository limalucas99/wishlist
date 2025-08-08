import type {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import { ok, serverError } from "@/presentation/protocols/http";
import type { CheckProductInWishlist } from "@/domain/usecases/check-product-in-wishlist";

export class CheckProductInWishlistController implements Controller {
  constructor(
    private readonly checkProductInWishlist: CheckProductInWishlist
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { productId } = httpRequest.params;
      const { customerId } = httpRequest.customer!;

      const exists = await this.checkProductInWishlist.check(
        customerId,
        productId
      );
      return ok({ exists });
    } catch (error: any) {
      return serverError(error);
    }
  }
}
