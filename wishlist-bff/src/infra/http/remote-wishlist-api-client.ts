import type { WishlistApiClient } from "@/domain/protocols/wishlist-api-client";
import type { WishlistProduct } from "@/domain/types";
import type { HttpClient } from "@/domain/protocols/http-client";
import { HttpStatusCode } from "@/presentation/enums/http";

export class RemoteWishlistApiClient implements WishlistApiClient {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async addProduct(customerId: string, productId: string): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/api/v1/wishlist/${customerId}/products`,
      method: "post",
      body: { productId },
    });

    if (httpResponse.statusCode !== HttpStatusCode.CREATED) {
      throw new Error("Failed to add product to wishlist");
    }
  }

  async removeProduct(customerId: string, productId: string): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/api/v1/wishlist/${customerId}/products/${productId}`,
      method: "delete",
    });

    if (httpResponse.statusCode !== HttpStatusCode.OK) {
      throw new Error("Failed to remove product from wishlist");
    }
  }

  async listProducts(customerId: string): Promise<WishlistProduct[]> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/api/v1/wishlist/${customerId}`,
      method: "get",
    });

    if (httpResponse.statusCode === HttpStatusCode.OK) {
      return httpResponse.body || [];
    }
    throw new Error("Failed to get wishlist products");
  }

  async checkProduct(customerId: string, productId: string): Promise<boolean> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/api/v1/wishlist/${customerId}/products/${productId}`,
      method: "get",
    });

    return httpResponse.statusCode === HttpStatusCode.OK;
  }
}
