import { AddProductToWishlistController } from "@/presentation/controllers/add-product-to-wishlist";
import { MissingParamError } from "@/presentation/errors";
import type { AddProductToWishlistDto } from "@/presentation/dtos/add-product-to-wishlist.dto";
import { HttpStatusCode } from "@/presentation/enums/http";

interface SutTypes {
  sut: AddProductToWishlistController;
}

const makeSut = (): SutTypes => {
  const sut = new AddProductToWishlistController();
  return {
    sut,
  };
};

describe("AddProductToWishlistController", () => {
  test("Should return BAD REQUEST if no productId is provided", async () => {
    const { sut } = makeSut();
    const request: AddProductToWishlistDto = {
      productId: "",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(httpResponse.body).toEqual(new MissingParamError("productId"));
  });
});
