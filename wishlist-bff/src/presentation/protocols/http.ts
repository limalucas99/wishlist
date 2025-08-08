import { HttpStatusCode } from "../enums/http";

export interface HttpRequest {
  body?: any;
  headers?: any;
  params?: any;
  query?: any;
  customer?: {
    customerId: string;
    email: string;
  };
}

export interface HttpResponse {
  statusCode: number;
  body?: any;
}

export const ok = (data: any): HttpResponse => ({
  statusCode: HttpStatusCode.OK,
  body: data,
});

export const created = (data?: any): HttpResponse => ({
  statusCode: HttpStatusCode.CREATED,
  body: data,
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: {
    error: error.message,
  },
});

export const unauthorized = (error?: Error): HttpResponse => ({
  statusCode: HttpStatusCode.UNAUTHORIZED,
  body: {
    error: error?.message || "Unauthorized",
  },
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.FORBIDDEN,
  body: {
    error: error.message,
  },
});

export const notFound = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.NOT_FOUND,
  body: {
    error: error.message,
  },
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  body: {
    error: "Internal server error",
  },
});
