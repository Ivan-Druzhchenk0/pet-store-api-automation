import { expect } from '@playwright/test'
import { test } from '../fixtures'

import { PetStatus } from '../api/pet/pet.interfaces'
import { PetBuilder } from '../api/pet/pet.builder'

test('Create a pet with id', async ({ api }) => {
  const newPet = new PetBuilder()
    .setId(112233)
    .setName('Buddy')
    .setStatus('available' as PetStatus)
    .build()

  const response = await api.pet.addNewPet(newPet)

  const responseBody = await response.json()
  expect(response.status()).toBe(200)
  expect(responseBody.id).toBe(newPet.id)
  expect(responseBody.name).toBe(newPet.name)
})

test('Get a pet by ID', async ({ api }) => {
  const petId = 112233

  const response = await api.pet.getPetById(petId)

  const responseBody = await response.json()
  expect(response.status()).toBe(200)
  expect(responseBody.id).toBe(petId)
  expect(responseBody.name).toBe('Buddy')
})

test('Create a pet without id', async ({ api }) => {
  const newPetWithoutId = new PetBuilder()
    .setName('Charlie')
    .setStatus('available' as PetStatus)
    .build()

  const response = await api.pet.addNewPet(newPetWithoutId)

  const responseBody = await response.json()
  expect(response.status()).toBe(200)
  expect(responseBody.id).toBeDefined()
  expect(responseBody.name).toBe(newPetWithoutId.name)
  expect(responseBody.status).toBe(newPetWithoutId.status)
  expect(responseBody.category).toBeUndefined()
  expect(responseBody.photoUrls).toEqual([])
  expect(responseBody.tags).toEqual([])
})
