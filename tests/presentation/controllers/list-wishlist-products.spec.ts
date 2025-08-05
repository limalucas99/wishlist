import { ListWishlistProductsController } from "@/presentation/controllers/list-wishlist-products";
import { MissingParamError } from "@/presentation/errors";
import type { ListWishlistProductsDto } from "@/presentation/dtos/list-wishlist-products.dto";
import { HttpStatusCode } from "@/presentation/enums/http";
import type { ListWishlistProducts } from "@/domain/usecases/list-wishlist-products";
import type { WishlistModel } from "@/domain/models/wishlist";

interface SutTypes {
  sut: ListWishlistProductsController;
  listWishlistProductsStub: ListWishlistProducts;
}

const makeFakeWishlist = (): WishlistModel => ({
  id: "any_wishlist_id",
  clientId: "any_client_id",
  products: ["product1", "product2", "product3"],
});

const makeListWishlistProducts = (): ListWishlistProducts => {
  class ListWishlistProductsStub implements ListWishlistProducts {
    async list(clientId: string): Promise<WishlistModel> {
      return await new Promise((resolve) => {
        resolve(makeFakeWishlist());
      });
    }
  }
  return new ListWishlistProductsStub();
};

const makeSut = (): SutTypes => {
  const listWishlistProductsStub = makeListWishlistProducts();
  const sut = new ListWishlistProductsController(listWishlistProductsStub);
  return {
    sut,
    listWishlistProductsStub,
  };
};

describe("ListWishlistProductsController", () => {
  test("Should return BAD REQUEST if no clientId is provided", async () => {
    const { sut } = makeSut();
    const request: ListWishlistProductsDto = {
      clientId: "",
    };
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(httpResponse.body).toEqual(new MissingParamError("clientId"));
  });
});
