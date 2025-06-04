import { APIRequestContext } from '@playwright/test'
import { Pet } from './pet/pet.controller'

export class API {
  public pet: Pet

  constructor(request: APIRequestContext) {
    this.pet = new Pet(request)
  }
}

// Re-export BaseAPI for other controllers
export { BaseAPI } from './base.api'
