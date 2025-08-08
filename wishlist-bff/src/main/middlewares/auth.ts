import type { Request, Response, NextFunction } from "express";
import { makeTokenValidator } from "@/main/factories/infra/token-validator-factory";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Access token is required" });
      return;
    }

    const tokenValidator = makeTokenValidator();
    const customer = await tokenValidator.validate(token);

    (req as any).customer = customer;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};
