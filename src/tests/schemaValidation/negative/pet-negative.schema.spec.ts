import { expect } from '@playwright/test'
import { test } from '../../../fixtures'

import { validatePetErrorSchema } from '../../../helpers/assertions/pet.schema-validator'
const nonExistentId = 9942110099919 // Assuming this ID does not exist

test('Get non-existent pet by ID - validate error schema', async ({ api }) => {
  const response = await api.pet.getPetById(nonExistentId)

  const responseBody = await validatePetErrorSchema(response)
  expect(response.status()).toBe(404)
  expect(responseBody.code).toBe(1)
  expect(responseBody.type).toBe('error')
  expect(responseBody.message).toBe('Pet not found')
})

test('Get pet with negative ID - validate error schema', async ({ api }) => {
  const negativeId = -1
  const response = await api.pet.getPetById(negativeId)

  const responseBody = await validatePetErrorSchema(response)
  expect(response.status()).toBe(404)
  expect(responseBody.code).toBe(1)
  expect(responseBody.type).toBe('error')
  expect(responseBody.message).toBe('Pet not found')
})
