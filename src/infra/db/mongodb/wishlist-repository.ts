import type { ProductModel } from "@/domain/models/product";
import type { AddProductToWishlist } from "@/domain/usecases/add-product-to-wishlist";
import { MongoHelper } from "./mongo-helper";

export class WishlistRepository implements AddProductToWishlist {
  async add(product: ProductModel, clientId: string): Promise<void> {
    const wishlistCollection = MongoHelper.getCollection("wishlists");
    await wishlistCollection.updateOne(
      { clientId },
      {
        $addToSet: { products: product.id },
        $setOnInsert: { clientId },
      },
      { upsert: true }
    );
  }
}
