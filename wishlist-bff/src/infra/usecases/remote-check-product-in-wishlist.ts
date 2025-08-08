import type { HttpClient } from "@/domain/protocols/http-client";
import type { CheckProductInWishlist } from "@/domain/usecases/check-product-in-wishlist";
import { HttpStatusCode } from "@/presentation/enums/http";

export class RemoteCheckProductInWishlist implements CheckProductInWishlist {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async check(customerId: string, productId: string): Promise<boolean> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/api/v1/wishlist/${customerId}/products/${productId}`,
      method: "get",
    });

    if (httpResponse.statusCode >= HttpStatusCode.BAD_REQUEST) {
      return false;
    }

    return httpResponse.body?.isInWishlist === true;
  }
}
