import { test as base, request } from '@playwright/test'

import { API } from '../api'

export const test = base.extend<{ api: API }>({
  api: async ({ request }, use) => {
    const api = new API(request)
    await use(api)
  },
})
