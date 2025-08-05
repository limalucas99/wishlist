import type { ProductModel } from "@/domain/models/product";

export interface AddProductToWishlist {
  add(product: ProductModel): Promise<void>;
}
