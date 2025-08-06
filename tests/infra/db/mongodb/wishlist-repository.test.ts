import { MongoHelper } from "@/infra/db/mongodb/mongo-helper";
import { WishlistRepository } from "@/infra/db/mongodb/wishlist-repository";
import type { ProductModel } from "@/domain/models/product";

interface SutTypes {
  sut: WishlistRepository;
}

const makeSut = (): SutTypes => {
  const sut = new WishlistRepository();
  return {
    sut,
  };
};

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
      const { sut } = makeSut();
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

  describe("RemoveProductFromWishlist Integration", () => {
    test("Should remove a product from the wishlist on success", async () => {
      const { sut } = makeSut();
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

  describe("CheckProductInWishlist Integration", () => {
    test("Should return true if product exists in wishlist", async () => {
      const { sut } = makeSut();
      const product: ProductModel = {
        id: "any_product_id",
      };
      const clientId = "any_client_id";

      await sut.add(product, clientId);

      const result = await sut.check(product, clientId);

      expect(result).toBe(true);
    });
    test("Should return false if product does not exist in wishlist", async () => {
      const sut = new WishlistRepository();
      const product: ProductModel = {
        id: "any_product_id",
      };
      const clientId = "any_client_id";

      const result = await sut.check(product, clientId);

      expect(result).toBe(false);
    });
  });

  describe("ListWishlistProducts Integration", () => {
    test("Should return null if client has no wishlist", async () => {
      const { sut } = makeSut();
      const clientId = "any_client_id";

      const result = await sut.list(clientId);

      expect(result).toBeNull();
    });

    test("Should return wishlist with products if client has items", async () => {
      const { sut } = makeSut();
      const product1: ProductModel = { id: "product_1" };
      const product2: ProductModel = { id: "product_2" };
      const clientId = "any_client_id";
      const expectedProductCount = 2;

      await sut.add(product1, clientId);
      await sut.add(product2, clientId);

      const result = await sut.list(clientId);

      expect(result).toBeTruthy();
      expect(result?.clientId).toBe(clientId);
      expect(result?.products).toContain("product_1");
      expect(result?.products).toContain("product_2");
      expect(result?.products).toHaveLength(expectedProductCount);
    });
  });
});
