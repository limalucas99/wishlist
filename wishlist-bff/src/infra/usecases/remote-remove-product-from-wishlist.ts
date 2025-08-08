import type { HttpClient } from "@/domain/protocols/http-client";
import type { RemoveProductFromWishlist } from "@/domain/usecases/remove-product-from-wishlist";
import { HttpStatusCode } from "@/presentation/enums/http";

export class RemoteRemoveProductFromWishlist
  implements RemoveProductFromWishlist
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async remove(customerId: string, productId: string): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/api/v1/wishlist/${customerId}/products/${productId}`,
      method: "delete",
    });
    if (httpResponse.statusCode >= HttpStatusCode.BAD_REQUEST) {
      throw new Error(
        httpResponse.body?.error || "Failed to remove product from wishlist"
      );
    }
  }
}
