import type { Express, Router } from "express";
import { Router as ExpressRouter } from "express";
import wishlistRoutes from "../routes/wishlist-routes";

export default (app: Express): void => {
  const apiRouter: Router = ExpressRouter();
  app.use("/api", apiRouter);
  wishlistRoutes(apiRouter);
};
