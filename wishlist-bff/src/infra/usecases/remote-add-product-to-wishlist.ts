import type { HttpClient } from "@/domain/protocols/http-client";
import type { AddProductToWishlist } from "@/domain/usecases/add-product-to-wishlist";
import { HttpStatusCode } from "@/presentation/enums/http";

export class RemoteAddProductToWishlist implements AddProductToWishlist {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async add(customerId: string, productId: string): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/api/v1/wishlist/${customerId}/products`,
      method: "post",
      body: { productId },
    });

    if (httpResponse.statusCode >= HttpStatusCode.BAD_REQUEST) {
      const error = new Error(
        httpResponse.body?.error || "Failed to add product to wishlist"
      );
      (error as any).statusCode = httpResponse.statusCode;
      throw error;
    }
  }
}
