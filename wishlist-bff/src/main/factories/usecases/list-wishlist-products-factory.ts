import { RemoteListWishlistProducts } from "@/infra/usecases";
import type { ListWishlistProducts } from "@/domain/usecases";
import { makeAxiosHttpClient } from "../infra/axios-http-client-factory";
import env from "@/main/config/env";

export const makeListWishlistProducts = (): ListWishlistProducts => {
  const httpClient = makeAxiosHttpClient();
  return new RemoteListWishlistProducts(env.wishlistApiUrl, httpClient);
};
