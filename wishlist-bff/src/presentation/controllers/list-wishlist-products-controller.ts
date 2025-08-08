import type {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import { ok, serverError } from "@/presentation/protocols/http";
import type { ListWishlistProducts } from "@/domain/usecases/list-wishlist-products";

export class ListWishlistProductsController implements Controller {
  constructor(private readonly listWishlistProducts: ListWishlistProducts) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { customerId } = httpRequest.customer!;

      const products = await this.listWishlistProducts.list(customerId);
      return ok(products);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
