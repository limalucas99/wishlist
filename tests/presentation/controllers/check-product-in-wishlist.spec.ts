import { CheckProductInWishlistController } from "@/presentation/controllers/check-product-in-wishlist";
import { MissingParamError } from "@/presentation/errors";
import type { CheckProductInWishlistDto } from "@/presentation/dtos/check-product-in-wishlist.dto";
import { HttpStatusCode } from "@/presentation/enums/http";
import type { CheckProductInWishlist } from "@/domain/usecases/check-product-in-wishlist";
import type { ProductModel } from "@/domain/models/product";

interface SutTypes {
  sut: CheckProductInWishlistController;
  checkProductInWishlistStub: CheckProductInWishlist;
}

const makeCheckProduct = (): CheckProductInWishlist => {
  class CheckProductInWishlistStub implements CheckProductInWishlist {
    async check(productId: ProductModel): Promise<boolean> {
      return await new Promise((resolve) => {
        resolve(true);
      });
    }
  }
  return new CheckProductInWishlistStub();
};

const makeSut = (): SutTypes => {
  const checkProductInWishlistStub = makeCheckProduct();
  const sut = new CheckProductInWishlistController(checkProductInWishlistStub);
  return {
    sut,
    checkProductInWishlistStub,
  };
};

describe("CheckProductInWishlistController", () => {
  test("Should return BAD REQUEST if no productId is provided", async () => {
    const { sut } = makeSut();
    const request: CheckProductInWishlistDto = {
      id: "",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(httpResponse.body).toEqual(new MissingParamError("id"));
  });
});
