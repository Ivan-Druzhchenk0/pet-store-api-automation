import { expect } from '@playwright/test'
import { test } from '../../../fixtures'
import { PetBuilder } from '../../../api/pet/pet.builder'
import { petId, petName } from '../../../test-data/entities/pet'

const nonExistentId = 919100000010121 // Assuming this ID does not exist

test('Get non-existent pet by ID', async ({ api }) => {
  const response = await api.pet.getPetById(nonExistentId)

  expect(response.status()).toBe(404)
})

test('Get pet with negative ID', async ({ api }) => {
  const negativeId = -1
  const response = await api.pet.getPetById(negativeId)

  expect(response.status()).toBe(404)
})

/* This test is passing because the API does not enforce strict validation for updating non-existent pets. It returns 200 OK */
test('Update non-existent pet', async ({ api }) => {
  const updateData = { name: 'Updated Name' }

  const response = await api.pet.updatePet({
    petId: nonExistentId,
    petData: updateData,
  })

  // API allows updating non-existent pets and returns 200, so no error schema to validate
  expect(response.status()).toBe(200)
})

test('Delete non-existent pet', async ({ api }) => {
  const response = await api.pet.deletePet(nonExistentId)

  expect(response.status()).toBe(404)
})

/* As per the API specification, the status can be 'available', 'pending', or 'sold'. However, the API does not enforce this validation strictly, allowing invalid statuses. This test passes as a result */
test('Create pet with invalid status', async ({ api }) => {
  const invalidPet = {
    id: petId().id,
    name: petName().name,
    status: 'invalid-status' as any, // Invalid status
  }

  const response = await api.pet.addNewPet(invalidPet as any)

  // API allows creating a pet with invalid status and returns 200, so no error schema to validate
  expect(response.status()).toBe(200)
})

/* As per the API specification, the status can be 'available', 'pending', or 'sold'. However, the API does not enforce this validation strictly, allowing invalid statuses. This test passes as a result */
test('Get pets with invalid status', async ({ api }) => {
  const response = await api.pet.getPetsByStatus('invalid-status' as any)

  // API allows fetching pets with invalid status and returns 200, so no error schema to validate
  expect(response.status()).toBe(200)
})

/* This test is passing because the API allows creating a pet with an empty name. Can be considered as a bug in the API. */
test('Create pet with empty name', async ({ api }) => {
  const incompletePet = {
    id: petId().id,
    status: 'available',
    // Missing name
  }

  const response = await api.pet.addNewPet(incompletePet as any)

  // API allows creating a pet with an empty name and returns 200, so no error schema to validate
  expect(response.status()).toBe(200)
})

/* This test is passing because the API allows updating a pet with an invalid status. Can be considered as a bug in the API. */
test('Update pet with invalid status', async ({ api }) => {
  // Create a valid pet
  const newPet = new PetBuilder()
    .setId(petId().id)
    .setName(petName().name)
    .build()

  await api.pet.addNewPet(newPet)

  // Try to update with invalid status
  const invalidUpdate = { status: 'invalid-status' as any }
  const response = await api.pet.updatePet({
    petId: newPet.id!,
    petData: invalidUpdate,
  })

  // API allows invalid status update and returns 200, so no error schema to validate
  expect(response.status()).toBe(200)

  // Cleanup
  await api.pet.deletePet(newPet.id!)
})
