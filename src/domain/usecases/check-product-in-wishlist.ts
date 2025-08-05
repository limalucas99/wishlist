import type { ProductModel } from "@/domain/models/product";

export interface CheckProductInWishlist {
  check(product: ProductModel): Promise<boolean>;
}
