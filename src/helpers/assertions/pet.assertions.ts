import { expect, APIResponse } from '@playwright/test'
import { validatePetSchema } from './pet.schema-validator'
import { PetInterface } from '../../api/pet/pet.interfaces'

export class PetAssertions {
  static async verifyPetCreated(
    response: APIResponse,
    expectedPet: PetInterface,
  ) {
    const responseBody = await validatePetSchema(response)
    expect(response.status()).toBe(200)

    if (expectedPet.id) {
      expect(responseBody.id).toBe(expectedPet.id)
    } else {
      expect(responseBody.id).toBeDefined()
      expect(typeof responseBody.id).toBe('number')
    }

    expect(responseBody.name).toBe(expectedPet.name)
    expect(responseBody.status).toBe(expectedPet.status)

    return responseBody
  }

  static async verifyPetRetrieved(
    response: APIResponse,
    expectedPet: Partial<PetInterface>,
  ) {
    const responseBody = await validatePetSchema(response)
    expect(response.status()).toBe(200)

    if (expectedPet.id) expect(responseBody.id).toBe(expectedPet.id)
    if (expectedPet.name) expect(responseBody.name).toBe(expectedPet.name)
    if (expectedPet.status) expect(responseBody.status).toBe(expectedPet.status)

    return responseBody
  }

  static async verifyPetUpdated(
    response: APIResponse,
    expectedPet: Partial<PetInterface>,
  ) {
    const responseBody = await validatePetSchema(response)
    expect(response.status()).toBe(200)

    Object.entries(expectedPet).forEach(([key, value]) => {
      if (value !== undefined) {
        expect(responseBody[key]).toBe(value)
      }
    })

    return responseBody
  }

  static async verifyPetDeleted(response: APIResponse) {
    expect(response.status()).toBe(200)
  }
}
