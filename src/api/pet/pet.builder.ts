import { PetInterface, PetStatus } from './pet.interfaces'

export class PetBuilder {
  private pet: PetInterface

  constructor() {
    this.pet = {
      name: '',
      status: 'available', // Default status
    }
  }

  setId(id: number): PetBuilder {
    this.pet.id = id
    return this
  }

  setCategory(id: number, name: string): PetBuilder {
    this.pet.category = { id, name }
    return this
  }

  setName(name: string): PetBuilder {
    this.pet.name = name
    return this
  }

  setPhotoUrls(photoUrls: string[]): PetBuilder {
    this.pet.photoUrls = photoUrls
    return this
  }

  setTags(tags: { id: number; name: string }[]): PetBuilder {
    this.pet.tags = tags
    return this
  }

  setStatus(status: PetStatus): PetBuilder {
    this.pet.status = status
    return this
  }

  build(): PetInterface {
    if (!this.pet.name) {
      throw new Error('Pet name is required')
    }
    if (!this.pet.status) {
      throw new Error('Status is required')
    }
    return this.pet
  }
}
