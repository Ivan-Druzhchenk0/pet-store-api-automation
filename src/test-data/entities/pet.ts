import { faker } from '@faker-js/faker'

export interface PetInfo {
  id?: number
  name?: string
  status?: 'available' | 'pending' | 'sold'
}

export function petName() {
  return {
    name: faker.animal.dog(),
  }
}

export function petId() {
  return {
    id: faker.number.int({ min: 100000, max: 999999 }),
  }
}

export function petInfo(): PetInfo {
  return {
    ...petId(),
    ...petName(),
    status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
  }
}
