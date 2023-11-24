import { beforeEach, expect, test, vi } from 'vitest'
import { loadCustomCommands, loadIsEnabled, saveCustomCommands, saveIsEnabled } from './storage'
import { CUSTOM_COMMANDS_STORAGE_KEY, ENABLED_STORAGE_KEY } from './constants'

function mockChrome () {
  const mockedChrome = {
    storage: {
      sync: {
        get: vi.fn().mockResolvedValue({}),
        set: vi.fn(),
      },
    },
  }
  vi.stubGlobal('chrome', mockedChrome)
  return mockedChrome
}

beforeEach(() => {
  // To ensure that Chrome is mocked in every test
  vi.stubGlobal('chrome', undefined)
})

test('loadIsEnabled', async () => {
  const chrome = mockChrome()
  // Default value
  await expect(loadIsEnabled()).resolves.toBe(true)

  chrome.storage.sync.get = vi.fn().mockResolvedValue({
    [ENABLED_STORAGE_KEY]: false,
  })
  await expect(loadIsEnabled()).resolves.toBe(false)
})

test('saveIsEnabled', async () => {
  const chrome = mockChrome()
  await saveIsEnabled(false)
  expect(chrome.storage.sync.set).toBeCalled()
  await saveIsEnabled(true)
  expect(chrome.storage.sync.set).toBeCalled()
})

test('loadCustomCommands', async () => {
  const chrome = mockChrome()

  // Default value
  await expect(loadCustomCommands()).resolves.not.toHaveLength(0)

  const areAllStrings = (await loadCustomCommands())
    .every(item => typeof item === 'string')
  expect(areAllStrings).toBe(true)
  chrome.storage.sync.get = vi.fn().mockResolvedValue({
    [CUSTOM_COMMANDS_STORAGE_KEY]: ['a', 'b', 'c'],
  })
  await expect(loadCustomCommands()).resolves.toEqual(['a', 'b', 'c'])
})

test('saveCustomCommands', async () => {
  const chrome = mockChrome()
  await saveCustomCommands(['a'])
  expect(chrome.storage.sync.set).toBeCalled()
})
