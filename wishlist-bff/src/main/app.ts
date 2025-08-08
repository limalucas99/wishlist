import express from "express";
import setupMiddlewares from "@/main/config/middlewares";
import setupRoutes from "@/main/config/routes";
import setupSwagger from "@/main/config/swagger";
import { errorHandler } from "@/main/middlewares/error-handler";

const app = express();
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);
app.use(errorHandler);

export { app };
