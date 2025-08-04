import type { HttpResponse } from "@/presentation/protocols";

export interface Controller<T = unknown> {
  handle: (request: T) => Promise<HttpResponse>;
}
