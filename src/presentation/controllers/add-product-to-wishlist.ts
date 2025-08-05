import type { Controller, HttpResponse } from "@/presentation/protocols";
import type { AddProductToWishlistDto } from "../dtos/add-product-to-wishlist.dto";
import { MissingParamError } from "../errors";
import { badRequest, created, serverError } from "../helpers/http-helper";
import type { AddProductToWishlist } from "@/domain/usecases/add-product-to-wishlist";

export class AddProductToWishlistController implements Controller {
  constructor(private readonly addProductToWishList: AddProductToWishlist) {}
  async handle(request: AddProductToWishlistDto): Promise<HttpResponse> {
    try {
      if (!request.id) {
        return badRequest(new MissingParamError("id"));
      }
      const { id } = request;
      await this.addProductToWishList.add({ id });
      return created({ message: "Product added to wishlist successfully" });
    } catch (error) {
      return serverError();
    }
  }
}
