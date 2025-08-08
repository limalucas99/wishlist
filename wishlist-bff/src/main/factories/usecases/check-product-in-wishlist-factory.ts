import { RemoteCheckProductInWishlist } from "@/infra/usecases";
import type { CheckProductInWishlist } from "@/domain/usecases";
import { makeAxiosHttpClient } from "../infra/axios-http-client-factory";
import env from "@/main/config/env";

export const makeCheckProductInWishlist = (): CheckProductInWishlist => {
  const httpClient = makeAxiosHttpClient();
  return new RemoteCheckProductInWishlist(env.wishlistApiUrl, httpClient);
};
