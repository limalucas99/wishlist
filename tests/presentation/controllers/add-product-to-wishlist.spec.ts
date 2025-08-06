import { AddProductToWishlistController } from "@/presentation/controllers/add-product-to-wishlist";
import { MissingParamError } from "@/presentation/errors";
import type { AddProductToWishlistDto } from "@/presentation/dtos/add-product-to-wishlist.dto";
import { HttpStatusCode } from "@/presentation/enums/http";
import type {
  AddProductToWishlist,
  CheckWishlistLimit,
} from "@/domain/usecases/add-product-to-wishlist";
import type { ProductModel } from "@/domain/models/product";
import { EMPTY_PRODUCT_COUNT, MAX_WISHLIST_PRODUCTS } from "@/domain/constants";

interface SutTypes {
  sut: AddProductToWishlistController;
  addProductToWishlistStub: AddProductToWishlist;
  checkWishlistLimitStub: CheckWishlistLimit;
}

const makeAddProduct = (): AddProductToWishlist => {
  class AddProductToWishlistStub implements AddProductToWishlist {
    async add(product: ProductModel, clientId: string): Promise<void> {
      await new Promise((resolve) => {
        resolve(null);
      });
    }
  }
  return new AddProductToWishlistStub();
};

const makeCheckWishlistLimit = (): CheckWishlistLimit => {
  class CheckWishlistLimitStub implements CheckWishlistLimit {
    async checkLimit(clientId: string): Promise<number> {
      return await new Promise((resolve) => {
        resolve(EMPTY_PRODUCT_COUNT);
      });
    }
  }
  return new CheckWishlistLimitStub();
};

const makeSut = (): SutTypes => {
  const addProductToWishlistStub = makeAddProduct();
  const checkWishlistLimitStub = makeCheckWishlistLimit();
  const sut = new AddProductToWishlistController(
    addProductToWishlistStub,
    checkWishlistLimitStub
  );
  return {
    sut,
    addProductToWishlistStub,
    checkWishlistLimitStub,
  };
};

describe("AddProductToWishlistController", () => {
  test("Should return BAD REQUEST if no clientId is provided", async () => {
    const { sut } = makeSut();
    const request: AddProductToWishlistDto = {
      clientId: "",
      productId: "any_product_id",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(httpResponse.body).toEqual(new MissingParamError("clientId"));
  });

  test("Should return BAD REQUEST if no productId is provided", async () => {
    const { sut } = makeSut();
    const request: AddProductToWishlistDto = {
      clientId: "any_client_id",
      productId: "",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(httpResponse.body).toEqual(new MissingParamError("productId"));
  });

  test("Should call AddProductToWishlist with correct values", async () => {
    const { sut, addProductToWishlistStub } = makeSut();
    const addSpy = jest.spyOn(addProductToWishlistStub, "add");
    const request: AddProductToWishlistDto = {
      clientId: "any_client_id",
      productId: "any_product_id",
    };
    await sut.handle(request);
    expect(addSpy).toHaveBeenCalledWith(
      { id: "any_product_id" },
      "any_client_id"
    );
  });

  test("Should return SERVER ERROR if AddProductToWishlist throws", async () => {
    const { sut, addProductToWishlistStub } = makeSut();
    jest.spyOn(addProductToWishlistStub, "add").mockImplementationOnce(() => {
      throw new Error();
    });
    const request: AddProductToWishlistDto = {
      clientId: "any_client_id",
      productId: "any_product_id",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
  });

  test("Should return CREATED if product is added successfully", async () => {
    const { sut } = makeSut();
    const request: AddProductToWishlistDto = {
      clientId: "any_client_id",
      productId: "any_product_id",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.CREATED);
    expect(httpResponse.body).toEqual({
      message: "Product added to wishlist successfully",
      product: {
        id: "any_product_id",
      },
    });
  });

  test("Should return BAD REQUEST if wishlist has reached the maximum limit", async () => {
    const { sut, checkWishlistLimitStub } = makeSut();
    jest
      .spyOn(checkWishlistLimitStub, "checkLimit")
      .mockReturnValueOnce(Promise.resolve(MAX_WISHLIST_PRODUCTS));

    const httpResponse = await sut.handle({
      clientId: "any_client_id",
      productId: "any_product_id",
    });

    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(httpResponse.body).toEqual(
      expect.objectContaining({
        message: "Wishlist has reached the maximum limit of 20 products",
        name: "WishlistLimitExceededError",
      })
    );
  });
});
