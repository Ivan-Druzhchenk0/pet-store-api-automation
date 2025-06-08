import { BaseAPI } from '../base.api'

import { PetInterface, PetStatus } from './pet.interfaces'

export class Pet extends BaseAPI {
  async addNewPet(pet: PetInterface) {
    return this.request.post('/v2/pet', {
      data: pet,
    })
  }

  async addPetImage(petId: number, image: string) {
    return this.request.post(`/v2/pet/${petId}/uploadImage`, {
      data: {
        additionalMetadata: 'string',
        file: image,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async getPetById(petId: number) {
    return this.request.get(`/v2/pet/${petId}`)
  }

  async getPetsByStatus(status: PetStatus | PetStatus[]) {
    return this.request.get('/v2/pet/findByStatus', {
      params: {
        status: Array.isArray(status) ? status.join(',') : status,
      },
    })
  }

  /* Update a pet by merging current data with new data.
   * This ensures that only the fields provided in `petData` are updated,
   * while keeping the existing values for fields not included in `petData`.
   */

  async updatePet(data: { petId: number; petData: Partial<PetInterface> }) {
    // First, try to get the current pet data
    const currentPetResponse = await this.request.get(`/v2/pet/${data.petId}`)
    let currentPet = {}

    // If we can get current pet data, use it for merging
    if (currentPetResponse.status() === 200) {
      try {
        currentPet = await currentPetResponse.json()
      } catch (error) {
        // If JSON parsing fails, use empty object
        currentPet = {}
      }
    }

    // Merge current data with updates, ensuring ID is preserved
    const updatedPet = {
      id: data.petId,
      ...currentPet,
      ...data.petData,
    }

    return this.request.put('/v2/pet', {
      data: updatedPet,
    })
  }

  async deletePet(petId: number) {
    return this.request.delete(`/v2/pet/${petId}`)
  }
}
