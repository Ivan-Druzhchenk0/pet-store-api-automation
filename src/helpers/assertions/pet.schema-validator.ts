import Ajv from 'ajv'
import { APIResponse } from '@playwright/test'
import { petSchema } from '../schemas/pet.schema'
import {
  petErrorSchema,
  validationErrorSchema,
} from '../schemas/pet.error-schema'

const ajv = new Ajv()

export async function validatePetSchema(response: APIResponse) {
  const responseBody = await response.json()
  const validate = ajv.compile(petSchema)
  const isValid = validate(responseBody)

  if (!isValid) {
    const errors = validate.errors
      ?.map((error) => `${error.instancePath} ${error.message}`)
      .join(', ')
    throw new Error(`Pet schema validation failed: ${errors}`)
  }

  return responseBody
}

export async function validatePetArraySchema(response: APIResponse) {
  const responseBody = await response.json()

  if (!Array.isArray(responseBody)) {
    throw new Error('Expected response to be an array')
  }

  const validate = ajv.compile(petSchema)

  responseBody.forEach((pet, index) => {
    const isValid = validate(pet)
    if (!isValid) {
      const errors = validate.errors
        ?.map((error) => `${error.instancePath} ${error.message}`)
        .join(', ')
      throw new Error(
        `Pet at index ${index} schema validation failed: ${errors}`,
      )
    }
  })

  return responseBody
}
export async function validatePetErrorSchema(response: APIResponse) {
  const responseBody = await response.json()
  const validate = ajv.compile(petErrorSchema)
  const isValid = validate(responseBody)

  if (!isValid) {
    const errors = validate.errors
      ?.map((error) => `${error.instancePath} ${error.message}`)
      .join(', ')
    throw new Error(`Pet error schema validation failed: ${errors}`)
  }

  return responseBody
}

export async function validatePetValidationErrorSchema(response: APIResponse) {
  const responseBody = await response.json()
  const validate = ajv.compile(validationErrorSchema)
  const isValid = validate(responseBody)

  if (!isValid) {
    const errors = validate.errors
      ?.map((error) => `${error.instancePath} ${error.message}`)
      .join(', ')
    throw new Error(`Pet validation error schema validation failed: ${errors}`)
  }

  return responseBody
}
