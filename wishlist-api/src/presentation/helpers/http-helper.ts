import { HttpStatusCode } from "../enums/http";
import { ServerError } from "../errors";
import type { HttpResponse } from "../protocols/http";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: error,
});

export const serverError = (): HttpResponse => ({
  statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  body: new ServerError(),
});

export const ok = (data: unknown): HttpResponse => ({
  statusCode: HttpStatusCode.OK,
  body: data,
});

export const created = (data: unknown): HttpResponse => ({
  statusCode: HttpStatusCode.CREATED,
  body: data,
});

export const notFound = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.NOT_FOUND,
  body: error,
});

export const deleted = (data: unknown): HttpResponse => ({
  statusCode: HttpStatusCode.NO_CONTENT,
  body: data,
});
