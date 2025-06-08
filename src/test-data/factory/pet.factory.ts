import { PetBuilder } from '../../api/pet/pet.builder'
import { petId, PetInfo, petName } from '../entities/pet'

export class PetFactory {
  static createUniquePet(info?: PetInfo) {
    const uniqueId = petId().id || info?.id
    const uniqueName = petName().name || info?.name
    const uniqueStatus = info?.status || 'available'

    return new PetBuilder()
      .setId(uniqueId!)
      .setName(uniqueName!)
      .setStatus(uniqueStatus!)
      .build()
  }

  static createPetWithoutId(name?: string) {
    const uniqueName = petName().name || name

    return new PetBuilder().setName(uniqueName!).setStatus('available').build()
  }
}
