import { RemoveProductFromWishlistController } from "@/presentation/controllers/remove-product-from-wishlist";
import { MissingParamError } from "@/presentation/errors";
import type { RemoveProductFromWishlistDto } from "@/presentation/dtos/remove-product-from-wishlist.dto";
import { HttpStatusCode } from "@/presentation/enums/http";
import type { RemoveProductFromWishlist } from "@/domain/usecases/remove-product-from-wishlist";
import type { ProductModel } from "@/domain/models/product";

interface SutTypes {
  sut: RemoveProductFromWishlistController;
  removeProductFromWishlistStub: RemoveProductFromWishlist;
}

const makeRemoveProduct = (): RemoveProductFromWishlist => {
  class RemoveProductFromWishlistStub implements RemoveProductFromWishlist {
    async remove(productId: ProductModel): Promise<void> {
      await new Promise((resolve) => {
        resolve(null);
      });
    }
  }
  return new RemoveProductFromWishlistStub();
};

const makeSut = (): SutTypes => {
  const removeProductFromWishlistStub = makeRemoveProduct();
  const sut = new RemoveProductFromWishlistController(
    removeProductFromWishlistStub
  );
  return {
    sut,
    removeProductFromWishlistStub,
  };
};

describe("RemoveProductFromWishlistController", () => {
  test("Should return BAD REQUEST if no productId is provided", async () => {
    const { sut } = makeSut();
    const request: RemoveProductFromWishlistDto = {
      id: "",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(httpResponse.body).toEqual(new MissingParamError("id"));
  });
});
