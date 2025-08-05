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

  test("Should call checkProductInWishlist with correct values", async () => {
    const { sut, checkProductInWishlistStub } = makeSut();
    const checkSpy = jest.spyOn(checkProductInWishlistStub, "check");
    const request: CheckProductInWishlistDto = {
      id: "any_product_id",
    };
    await sut.handle(request);
    expect(checkSpy).toHaveBeenCalledWith({ id: "any_product_id" });
  });

  test("Should return ok with isInWishlist true if product is found", async () => {
    const { sut } = makeSut();
    const request: CheckProductInWishlistDto = {
      id: "any_product_id",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.OK);
    expect(httpResponse.body).toEqual({ isInWishlist: true });
  });
});
