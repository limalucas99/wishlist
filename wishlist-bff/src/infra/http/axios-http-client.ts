import axios, { type AxiosResponse } from 'axios'
import { type HttpClient, HttpMethod } from '../../domain/protocols/http-client'

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpClient.Params): Promise<HttpClient.Result> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error: any) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data
    }
  }
}
