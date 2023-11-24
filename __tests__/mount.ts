import { mount } from '@vue/test-utils'
import { vuetify } from '../src/modules/plugins'
import deepmerge from 'deepmerge'
import isPlainObject from 'is-plain-obj'

export function mountWithVuetify <Type> (
  component: Type,
  options?: Parameters<typeof mount>[1]
) {
  return mount(
    component,
    deepmerge<typeof options>(
      { global: { plugins: [vuetify] } },
      options ?? {},
      { isMergeableObject: isPlainObject }
    )
  )
}
