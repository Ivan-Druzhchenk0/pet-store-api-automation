import { expect } from '@playwright/test'
import { test } from '../fixtures'

import { PetStatus } from '../api/pet/pet.interfaces'
import { PetBuilder } from '../api/pet/pet.builder'
import { petId, petName } from '../test-data/pet'

test.describe('CRUD pet by id', () => {
  test.describe.configure({ mode: 'serial' })

  // Timeout needed as API is slow and tests fail without it
  test.afterEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 8000))
  })

  const id = petId().id
  const name = petName().name
  const newPet = new PetBuilder().setId(id).setName(name).build()

  test('Create a pet with id', async ({ api }) => {
    const response = await api.pet.addNewPet(newPet)

    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.id).toBe(newPet.id)
    expect(responseBody.name).toBe(newPet.name)
  })

  test('Get a pet by ID', async ({ api }) => {
    const response = await api.pet.getPetById(id)

    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.id).toBe(newPet.id)
    expect(responseBody.name).toBe(newPet.name)
  })

  test('Update a pet', async ({ api }) => {
    const updatedPet = { status: 'available' as PetStatus }

    const response = await api.pet.updatePet({
      petId: id,
      petData: updatedPet,
    })

    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.id).toBe(newPet.id)
    expect(responseBody.name).toBe(newPet.name)
    expect(responseBody.status).toBe(updatedPet.status)
  })

  test('Delete a pet', async ({ api }) => {
    const response = await api.pet.deletePet(id)

    expect(response.status()).toBe(200)
  })
})

test('Create a pet without id', async ({ api }) => {
  const newPetWithoutId = new PetBuilder().setName(petName().name).build()

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
