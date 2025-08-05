import { MongoHelper } from "@/infra/db/mongodb/mongo-helper";
import { WishlistRepository } from "@/infra/db/mongodb/wishlist-repository";
import type { ProductModel } from "@/domain/models/product";

describe("WishlistRepository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const wishlistCollection = MongoHelper.getCollection("wishlists");
    await wishlistCollection.deleteMany({});
  });

  describe("AddProductToWishlist Integration", () => {
    test("Should persist product in MongoDB when adding to wishlist", async () => {
      const sut = new WishlistRepository();
      const product: ProductModel = {
        id: "any_product_id",
      };
      const clientId = "any_client_id";

      await sut.add(product, clientId);

      const wishlistCollection = MongoHelper.getCollection("wishlists");
      const result = await wishlistCollection.findOne({ clientId });

      expect(result).toBeTruthy();
      expect(result?.clientId).toBe(clientId);
      expect(result?.products).toContain(product.id);
    });

    test("Should not allow adding the same product twice", async () => {
      const sut = new WishlistRepository();
      const product: ProductModel = {
        id: "any_product_id",
      };
      const clientId = "any_client_id";
      const expectedSingleProduct = 1;

      await sut.add(product, clientId);
      await sut.add(product, clientId);

      const wishlistCollection = MongoHelper.getCollection("wishlists");
      const result = await wishlistCollection.findOne({ clientId });

      expect(result).toBeTruthy();
      expect(result?.products).toHaveLength(expectedSingleProduct);
      expect(result?.products).toContain(product.id);
    });
  });

  describe("RemoveProductFromWishlist", () => {
    test("Should remove a product from the wishlist on success", async () => {
      const sut = new WishlistRepository();
      const product: ProductModel = {
        id: "any_product_id",
      };
      const clientId = "any_client_id";

      await sut.add(product, clientId);
      await sut.remove(product, clientId);

      const wishlistCollection = MongoHelper.getCollection("wishlists");
      const result = await wishlistCollection.findOne({ clientId });

      expect(result?.products).not.toContain(product.id);
    });
  });
});
