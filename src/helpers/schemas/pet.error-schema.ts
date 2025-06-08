export const petErrorSchema = {
  type: 'object',
  required: ['code', 'type', 'message'],
  properties: {
    code: { type: 'integer' },
    type: { type: 'string' },
    message: { type: 'string' },
  },
}

export const validationErrorSchema = {
  type: 'object',
  required: ['code', 'type', 'message'],
  properties: {
    code: { type: 'integer' },
    type: { type: 'string', enum: ['error'] },
    message: { type: 'string' },
    details: {
      type: 'array',
      items: { type: 'string' },
    },
  },
}
