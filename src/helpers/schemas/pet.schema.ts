/* Used in schemaValidation tests to validate the pet schema and pet array schema */

export const petSchema = {
  type: 'object',
  required: ['id', 'name', 'status'],
  properties: {
    id: {
      type: 'integer',
      minimum: 1,
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    status: {
      type: 'string',
      enum: ['available', 'pending', 'sold'],
    },
    category: {
      type: ['object', 'null'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      },
      required: ['id', 'name'],
    },
    photoUrls: {
      type: 'array',
      items: { type: 'string' },
    },
    tags: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
        },
        required: ['id', 'name'],
      },
    },
  },
}
