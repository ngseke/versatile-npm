import { ENABLED_STORAGE_KEY, CUSTOM_COMMANDS_STORAGE_KEY } from './constants'
import { generateDefaultCustomCommands } from './customCommands'

async function getSyncStorage <T> (key: string, defaultValue: T): Promise<T> {
  return (await chrome.storage.sync.get(key))[key] ?? defaultValue
}

async function setSyncStorage <T> (key: string, value: T) {
  await chrome.storage.sync.set({ [key]: value })
}

export const loadIsEnabled = async () => {
  return await getSyncStorage(ENABLED_STORAGE_KEY, true)
}

export const saveIsEnabled = async (isEnabled: boolean) => {
  await setSyncStorage(ENABLED_STORAGE_KEY, isEnabled)
}

export const loadCustomCommands = async () => {
  return await getSyncStorage(
    CUSTOM_COMMANDS_STORAGE_KEY,
    generateDefaultCustomCommands()
  )
}

export const saveCustomCommands = async (customCommands: string[]) => {
  await setSyncStorage(CUSTOM_COMMANDS_STORAGE_KEY, customCommands)
}
