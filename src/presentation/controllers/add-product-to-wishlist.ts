import type { Controller, HttpResponse } from "@/presentation/protocols";
import type { AddProductToWishlistDto } from "../dtos/add-product-to-wishlist.dto";
import { MissingParamError } from "../errors";
import { badRequest, created, serverError } from "../helpers/http-helper";
import type { AddProductToWishlist } from "@/domain/usecases/add-product-to-wishlist";
import type { ProductModel } from "@/domain/models/product";

export class AddProductToWishlistController implements Controller {
  constructor(private readonly addProductToWishList: AddProductToWishlist) {}
  async handle(request: AddProductToWishlistDto): Promise<HttpResponse> {
    try {
      if (!request.clientId) {
        return badRequest(new MissingParamError("clientId"));
      }
      if (!request.productId) {
        return badRequest(new MissingParamError("productId"));
      }

      const { clientId, productId } = request;

      const product: ProductModel = { id: productId };
      await this.addProductToWishList.add(product, clientId);

      return created({
        message: "Product added to wishlist successfully",
        product,
      });
    } catch (error) {
      return serverError();
    }
  }
}
