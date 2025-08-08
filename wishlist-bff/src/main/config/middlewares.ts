import type { Express } from "express";
import { bodyParser } from "@/main/middlewares/body-parser";
import { cors } from "@/main/middlewares/cors";

export default (app: Express): void => {
  app.disable("x-powered-by");

  app.use(bodyParser);
  app.use(cors);
};
