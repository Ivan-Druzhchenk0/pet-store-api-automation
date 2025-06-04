import { faker } from '@faker-js/faker'

export function petName() {
  return {
    name: faker.animal.dog(),
  }
}

export function petId() {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
  }
}

export function petInfo() {
  return {
    ...petId(),
    ...petName(),
  }
}
