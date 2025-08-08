import { RemoteAddProductToWishlist } from "@/infra/usecases";
import type { AddProductToWishlist } from "@/domain/usecases";
import { makeAxiosHttpClient } from "../infra/axios-http-client-factory";
import env from "@/main/config/env";

export const makeAddProductToWishlist = (): AddProductToWishlist => {
  const httpClient = makeAxiosHttpClient();
  return new RemoteAddProductToWishlist(env.wishlistApiUrl, httpClient);
};
