import { expect } from '@playwright/test'
import { test } from '../fixtures'
import { PetStatus, PetInterface } from '../api/pet/pet.interfaces'
import { PetAssertions } from '../helpers/assertions/pet.assertions'
import { PetFactory } from '../test-data/factory/pet.factory'
import { PetBuilder } from '../api/pet/pet.builder'

test.describe(() => {
  test.describe.configure({ mode: 'serial' })

  let testPet: PetInterface
  let createdPetId: number

  test.beforeAll(() => {
    testPet = PetFactory.createUniquePet()
  })

  test.afterEach(async () => {
    // Delay needed to avoid errors with API rate limits
    await new Promise((resolve) => setTimeout(resolve, 5000))
  })

  test('Create a pet', async ({ api }) => {
    const response = await api.pet.addNewPet(testPet)

    const responseBody = await PetAssertions.verifyPetCreated(response, testPet)
    createdPetId = responseBody.id
  })

  test('Retrieve pet by ID', async ({ api }) => {
    const response = await api.pet.getPetById(createdPetId)

    await PetAssertions.verifyPetRetrieved(response, {
      id: createdPetId,
      name: testPet.name,
      status: testPet.status,
    })
  })

  test('Update pet', async ({ api }) => {
    const updateData = { name: 'Good boy', status: 'sold' as PetStatus }

    const response = await api.pet.updatePet({
      petId: createdPetId,
      petData: updateData,
    })

    await PetAssertions.verifyPetUpdated(response, {
      id: createdPetId,
      name: testPet.name,
      status: updateData.status,
    })
  })

  test('Delete pet', async ({ api }) => {
    const response = await api.pet.deletePet(createdPetId)

    await PetAssertions.verifyPetDeleted(response)
  })
})

test.describe(() => {
  test.afterEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  })

  test('Create pet without ID', async ({ api }) => {
    const petWithoutId = PetFactory.createPetWithoutId()
    const response = await api.pet.addNewPet(petWithoutId)

    const responseBody = await PetAssertions.verifyPetCreated(
      response,
      petWithoutId,
    )

    // Verify auto-generated ID and default values
    expect(responseBody.id).toBeGreaterThan(0)
    expect(responseBody.photoUrls).toEqual([])
    expect(responseBody.tags).toEqual([])
    expect(responseBody.category).toBeUndefined()

    // Cleanup
    await api.pet.deletePet(responseBody.id)
  })

  test('Create pet with all optional fields and validate schema', async ({
    api,
  }) => {
    const complexPet = new PetBuilder()
      .setName(`ComplexPet_${Date.now()}`)
      .setStatus('pending')
      .setCategory(1, 'Dogs')
      .setPhotoUrls(['http://example.com/photo1.jpg'])
      .setTags([{ id: 1, name: 'friendly' }])
      .build()

    const response = await api.pet.addNewPet(complexPet)
    const responseBody = await PetAssertions.verifyPetCreated(
      response,
      complexPet,
    )

    // Verify complex fields
    expect(responseBody.category).toEqual({ id: 1, name: 'Dogs' })
    expect(responseBody.photoUrls).toEqual(['http://example.com/photo1.jpg'])
    expect(responseBody.tags).toEqual([{ id: 1, name: 'friendly' }])

    // Cleanup
    await api.pet.deletePet(responseBody.id)
  })
})
