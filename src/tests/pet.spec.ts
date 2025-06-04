import { expect } from '@playwright/test'
import { test } from '../fixtures'

import { PetStatus } from '../api/pet/pet.interfaces'
import { PetBuilder } from '../api/pet/pet.builder'

test.describe('CRUD pet by id', () => {
  test.describe.configure({ mode: 'serial' })

  // Timeout needed as API is slow and tests fail without it
  test.afterEach(async () => {
    // Wait 2 seconds before each test
    await new Promise((resolve) => setTimeout(resolve, 2000))
  })

  const petId = 11
  const petName = 'Buddy'

  test('Create a pet with id', async ({ api }) => {
    const newPet = new PetBuilder().setId(petId).setName(petName).build()

    const response = await api.pet.addNewPet(newPet)

    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.id).toBe(newPet.id)
    expect(responseBody.name).toBe(newPet.name)
  })

  test('Get a pet by ID', async ({ api }) => {
    const response = await api.pet.getPetById(petId)

    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.id).toBe(petId)
    expect(responseBody.name).toBe(petName)
  })

  test('Update a pet', async ({ api }) => {
    const updatedPet = { status: 'available' as PetStatus }

    const response = await api.pet.updatePet({
      petId: petId,
      petData: updatedPet,
    })

    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.id).toBe(petId)
    expect(responseBody.name).toBe(petName)
    expect(responseBody.status).toBe(updatedPet.status)
  })

  test('Detete a pet', async ({ api }) => {
    const response = await api.pet.deletePet(petId)

    expect(response.status()).toBe(200)
  })
})

test('Create a pet without id', async ({ api }) => {
  const newPetWithoutId = new PetBuilder().setName('Charlie').build()

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
