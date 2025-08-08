import { AxiosHttpClient } from "@/infra/http";
import type { HttpClient } from "@/domain/protocols";

export const makeAxiosHttpClient = (): HttpClient => new AxiosHttpClient();
