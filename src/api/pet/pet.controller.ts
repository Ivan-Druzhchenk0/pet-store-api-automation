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

  async updatePet(pet: PetInterface) {
    return this.request.put('/v2/pet', {
      data: pet,
    })
  }

  async deletePet(petId: number) {
    return this.request.delete(`/v2/pet/${petId}`)
  }
}
