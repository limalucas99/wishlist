import type { ProductModel } from "@/domain/models/product";

export interface CheckProductInWishlist {
  check(product: ProductModel, clientId: string): Promise<boolean>;
}
