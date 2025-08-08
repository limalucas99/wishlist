import { RemoteRemoveProductFromWishlist } from "@/infra/usecases";
import type { RemoveProductFromWishlist } from "@/domain/usecases";
import { makeAxiosHttpClient } from "../infra/axios-http-client-factory";
import env from "@/main/config/env";

export const makeRemoveProductFromWishlist = (): RemoveProductFromWishlist => {
  const httpClient = makeAxiosHttpClient();
  return new RemoteRemoveProductFromWishlist(env.wishlistApiUrl, httpClient);
};
