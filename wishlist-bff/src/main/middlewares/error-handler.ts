import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof SyntaxError && error.message.includes("JSON")) {
    res.status(400).json({
      error: "Invalid JSON format in request body",
    });
    return;
  }

  if (error.status === 400 || error.statusCode === 400) {
    res.status(400).json({
      error: "Bad request",
    });
    return;
  }

  res.status(500).json({
    error: "Internal server error",
  });
};
