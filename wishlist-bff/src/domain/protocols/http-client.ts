import type { HttpStatusCode } from "@/presentation/enums/http";

export interface HttpClient {
  request: (data: HttpClient.Params) => Promise<HttpClient.Result>;
}

export namespace HttpClient {
  export interface Params {
    url: string;
    method: HttpMethod;
    body?: any;
    headers?: any;
  }

  export interface Result {
    statusCode: HttpStatusCode;
    body?: any;
  }
}

export type HttpMethod = "get" | "post" | "put" | "delete";
