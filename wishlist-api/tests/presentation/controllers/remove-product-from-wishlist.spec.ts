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
    async remove(product: ProductModel, clientId: string): Promise<void> {
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
  test("Should return BAD REQUEST if no clientId is provided", async () => {
    const { sut } = makeSut();
    const request: RemoveProductFromWishlistDto = {
      clientId: "",
      productId: "any_product_id",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(httpResponse.body).toEqual(new MissingParamError("clientId"));
  });

  test("Should return BAD REQUEST if no productId is provided", async () => {
    const { sut } = makeSut();
    const request: RemoveProductFromWishlistDto = {
      clientId: "any_client_id",
      productId: "",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(httpResponse.body).toEqual(new MissingParamError("productId"));
  });

  test("Should call removeProductFromWishlist with correct values", async () => {
    const { sut, removeProductFromWishlistStub } = makeSut();
    const removeSpy = jest.spyOn(removeProductFromWishlistStub, "remove");
    const request: RemoveProductFromWishlistDto = {
      clientId: "any_client_id",
      productId: "any_product_id",
    };
    await sut.handle(request);
    expect(removeSpy).toHaveBeenCalledWith(
      { id: "any_product_id" },
      "any_client_id"
    );
  });

  test("Should return SERVER ERROR if removeProductFromWishlist throws", async () => {
    const { sut, removeProductFromWishlistStub } = makeSut();
    jest
      .spyOn(removeProductFromWishlistStub, "remove")
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const request: RemoveProductFromWishlistDto = {
      clientId: "any_client_id",
      productId: "any_product_id",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
  });

  test("Should return NO CONTENT if product is removed successfully", async () => {
    const { sut } = makeSut();
    const request: RemoveProductFromWishlistDto = {
      clientId: "any_client_id",
      productId: "any_product_id",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.NO_CONTENT);
    expect(httpResponse.body).toEqual({
      message: "Product removed from wishlist successfully",
    });
  });
});
