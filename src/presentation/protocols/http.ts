import type { HttpStatusCode } from "../enums/http";

export interface HttpResponse {
  statusCode: HttpStatusCode;
  body: unknown;
}
