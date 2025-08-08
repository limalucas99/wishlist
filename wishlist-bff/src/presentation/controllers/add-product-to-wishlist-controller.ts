import type {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import {
  badRequest,
  created,
  serverError,
} from "@/presentation/protocols/http";
import type { AddProductToWishlist } from "@/domain/usecases/add-product-to-wishlist";
import { MissingParamError, InvalidParamTypeError } from "../errors";

export class AddProductToWishlistController implements Controller {
  constructor(private readonly addProductToWishlist: AddProductToWishlist) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { productId } = httpRequest.body;
      const { customerId } = httpRequest.customer!;

      if (!productId) {
        return badRequest(new MissingParamError("productId is required"));
      }

      if (typeof productId !== "string") {
        return badRequest(new InvalidParamTypeError("productId", "string"));
      }

      await this.addProductToWishlist.add(customerId, productId);
      return created({ message: "Product added to wishlist" });
    } catch (error: any) {
      // Se o erro veio da API com status 400, trata como bad request
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
