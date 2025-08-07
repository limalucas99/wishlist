import { HttpStatusCode } from "@/presentation/enums/http";
import type { Controller } from "@/presentation/protocols";
import type { Request, Response } from "express";

export const adaptRoute =
  (controller: Controller) => async (req: Request, res: Response) => {
    const httpRequest = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.statusCode < HttpStatusCode.BAD_REQUEST) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      const errorBody = httpResponse.body as {
        message?: string;
        name?: string;
      };
      res.status(httpResponse.statusCode).json({
        error: errorBody.message,
      });
    }
  };
