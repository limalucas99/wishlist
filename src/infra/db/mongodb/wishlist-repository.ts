import type { ProductModel } from "@/domain/models/product";
import type { AddProductToWishlist } from "@/domain/usecases/add-product-to-wishlist";
import { MongoHelper } from "./mongo-helper";
import type { RemoveProductFromWishlist } from "@/domain/usecases/remove-product-from-wishlist";
import type { CheckProductInWishlist } from "@/domain/usecases/check-product-in-wishlist";
import type { WishlistModel } from "@/domain/models/wishlist";
import type { ListWishlistProducts } from "@/domain/usecases/list-wishlist-products";

export class WishlistRepository
  implements
    AddProductToWishlist,
    RemoveProductFromWishlist,
    CheckProductInWishlist,
    ListWishlistProducts
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

  async check(product: ProductModel, clientId: string): Promise<boolean> {
    const wishlistCollection = MongoHelper.getCollection("wishlists");

    const result = await wishlistCollection.findOne({
      clientId,
      products: product.id,
    });

    return result !== null;
  }

  async list(clientId: string): Promise<WishlistModel | null> {
    const wishlistCollection = MongoHelper.getCollection("wishlists");
    const wishlistDocument = await wishlistCollection.findOne({ clientId });

    if (!wishlistDocument) return null;

    return {
      id: String(wishlistDocument._id),
      clientId,
      products: wishlistDocument.products ?? [],
    };
  }
}
