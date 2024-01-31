import { flushPromises } from '@vue/test-utils'

import { mockChrome } from '../../__tests__/chrome'
import { mountWithVuetify } from '../../__tests__/mount'
import SharedApp from './SharedApp.vue'

test('SharedApp should be rendered without any errors and warnings', async () => {
  mockChrome()

  mountWithVuetify(SharedApp)
  await flushPromises()

  expect(console.error).toBeCalledTimes(0)
  expect(console.warn).toBeCalledTimes(0)
})
