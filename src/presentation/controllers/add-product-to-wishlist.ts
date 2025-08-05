import type { Controller, HttpResponse } from "@/presentation/protocols";
import type { AddProductToWishlistDto } from "../dtos/add-product-to-wishlist.dto";
import { MissingParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers/http-helper";

export class AddProductToWishlistController implements Controller {
  async handle(request: AddProductToWishlistDto): Promise<HttpResponse> {
    try {
      if (!request.productId) {
        return badRequest(new MissingParamError("productId"));
      }
      const product = await new Promise((resolve, reject) => {
        resolve({ message: "Product added to wishlist successfully" });
      });
      return ok(product);
    } catch (error) {
      return serverError();
    }
  }
}
