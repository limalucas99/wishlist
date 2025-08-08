import jwt from "jsonwebtoken";
import type { TokenValidator } from "@/domain/protocols/token-validator";

export class JwtTokenValidator implements TokenValidator {
  constructor(private readonly secret: string) {}

  async validate(
    token: string
  ): Promise<{ customerId: string; email: string }> {
    try {
      const decoded = jwt.verify(token, this.secret) as any;
      return {
        customerId: decoded.customerId || decoded.id,
        email: decoded.email,
      };
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
