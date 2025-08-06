import request from "supertest";
import app from "@/main/config/app";
import { MongoHelper } from "@/infra/db/mongodb/mongo-helper";
import { HttpStatusCode } from "@/presentation/enums/http";
// import env from "@/main/config/env";

describe("Wishlist Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__); // mongoDb em memória
    // await MongoHelper.connect(env.mongoTestUrl); OBS - Caso queira rodar com um banco de testes real
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const wishlistCollection = MongoHelper.getCollection("wishlists");
    await wishlistCollection.deleteMany({});
  });

  describe("POST /api/v1/wishlist/:clientId/products", () => {
    test("Should return CREATED on add product to wishlist", async () => {
      await request(app)
        .post("/api/v1/wishlist/any_client_id/products")
        .send({
          productId: "any_product_id",
        })
        .expect(HttpStatusCode.CREATED);
    });

    test("Should return BAD REQUEST if no productId is provided", async () => {
      await request(app)
        .post("/api/v1/wishlist/any_client_id/products")
        .send({})
        .expect(HttpStatusCode.BAD_REQUEST);
    });
  });

  describe("GET /api/v1/wishlist/:clientId", () => {
    test("Should return OK on list wishlist products", async () => {
      await request(app)
        .get("/api/v1/wishlist/any_client_id")
        .expect(HttpStatusCode.OK);
    });
  });

  describe("DELETE /api/v1/wishlist/:clientId/products/:productId", () => {
    test("Should return NO CONTENT on remove product from wishlist", async () => {
      await request(app).post("/api/v1/wishlist/any_client_id/products").send({
        productId: "any_product_id",
      });

      await request(app)
        .delete("/api/v1/wishlist/any_client_id/products/any_product_id")
        .expect(HttpStatusCode.NO_CONTENT);
    });
  });

  describe("GET /api/v1/wishlist/:clientId/products/:productId", () => {
    test("Should return 200 when product exists in wishlist", async () => {
      await request(app).post("/api/v1/wishlist/any_client_id/products").send({
        productId: "any_product_id",
      });

      await request(app)
        .get("/api/v1/wishlist/any_client_id/products/any_product_id")
        .expect(HttpStatusCode.OK);
    });
  });
});
