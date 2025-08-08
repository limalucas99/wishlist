import type { HttpClient } from "@/domain/protocols/http-client";
import type { ListWishlistProducts } from "@/domain/usecases/list-wishlist-products";
import type { WishlistProduct } from "@/domain/types";
import { HttpStatusCode } from "@/presentation/enums/http";

export class RemoteListWishlistProducts implements ListWishlistProducts {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async list(customerId: string): Promise<WishlistProduct[]> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/api/v1/wishlist/${customerId}`,
      method: "get",
    });
    if (httpResponse.statusCode === HttpStatusCode.NOT_FOUND) {
      return [];
    }
    if (httpResponse.statusCode >= HttpStatusCode.BAD_REQUEST) {
      throw new Error("Failed to list wishlist products");
    }
    return httpResponse.body || [];
  }
}
