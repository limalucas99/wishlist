import type { ProductModel } from "@/domain/models/product";
import type { AddProductToWishlist } from "@/domain/usecases/add-product-to-wishlist";
import { MongoHelper } from "./mongo-helper";
import type { RemoveProductFromWishlist } from "@/domain/usecases/remove-product-from-wishlist";

export class WishlistRepository
  implements AddProductToWishlist, RemoveProductFromWishlist
{
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
  async remove(product: ProductModel, clientId: string): Promise<void> {
    const wishlistCollection = MongoHelper.getCollection("wishlists");
    const pullQuery: Record<string, unknown> = {
      $pull: { products: product.id },
    };
    await wishlistCollection.updateOne({ clientId }, pullQuery);
  }
}
