import { HTTP_STATUS_CODE } from '../../models/enums/HttpStatusCode'

export interface HttpResponse {
  statusCode: HTTP_STATUS_CODE
  data?: any
}

export interface IHttpClientProvider {
  get(url: string, options?: any): Promise<HttpResponse>
  post(url: string, body?: any, options?: any): Promise<HttpResponse>
  put(url: string, body?: any, options?: any): Promise<HttpResponse>
  patch(url: string, body?: any, options?: any): Promise<HttpResponse>
  delete(url: string, options?: any): Promise<HttpResponse>
}
