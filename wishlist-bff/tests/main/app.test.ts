import request from "supertest";
import { app } from "@/main/app";
import { HttpStatusCode } from "@/presentation/enums/http";

describe("Wishlist API Integration", () => {
  test("should return UNAUTHORIZED on POST /api/v1/wishlist without auth", async () => {
    const response = await request(app)
      .post("/api/v1/wishlist")
      .send({ productId: "any-product-id" });
    expect(response.status).toBe(HttpStatusCode.UNAUTHORIZED);
    expect(response.body).toEqual({ error: "Access token is required" });
  });

  test("should return UNAUTHORIZED on GET /api/v1/wishlist without auth", async () => {
    const response = await request(app).get("/api/v1/wishlist");
    expect(response.status).toBe(HttpStatusCode.UNAUTHORIZED);
    expect(response.body).toEqual({ error: "Access token is required" });
  });
});
