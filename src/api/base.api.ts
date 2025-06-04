import { APIRequestContext } from '@playwright/test'

export class BaseAPI {
  protected request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }
}
