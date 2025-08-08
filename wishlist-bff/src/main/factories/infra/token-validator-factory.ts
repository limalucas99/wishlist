import { JwtTokenValidator } from "@/infra/crypto";
import type { TokenValidator } from "@/domain/protocols";
import env from "@/main/config/env";

export const makeTokenValidator = (): TokenValidator =>
  new JwtTokenValidator(env.jwtSecret);
