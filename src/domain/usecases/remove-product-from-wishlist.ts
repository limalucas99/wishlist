import type { ProductModel } from "@/domain/models/product";

export interface RemoveProductFromWishlist {
  remove(product: ProductModel): Promise<void>;
}
