import { generateDefaultCustomCommands } from './customCommands'

export const ENABLED_STORAGE_KEY = 'enabled'
export const CUSTOM_COMMANDS_STORAGE_KEY = 'customCommands'

export interface SyncStorageSchema {
  [ENABLED_STORAGE_KEY]: boolean
  [CUSTOM_COMMANDS_STORAGE_KEY]: string[]
}

export const syncStorageDefaultValues: SyncStorageSchema = {
  [ENABLED_STORAGE_KEY]: true,
  [CUSTOM_COMMANDS_STORAGE_KEY]: generateDefaultCustomCommands(),
}

export type SyncStorageKey = keyof SyncStorageSchema

export async function getSyncStorage <
  Key extends SyncStorageKey
> (key: Key): Promise<SyncStorageSchema[Key]> {
  return (await chrome.storage.sync.get(key))[key] ??
    structuredClone(syncStorageDefaultValues[key])
}

export async function setSyncStorage<
  Key extends SyncStorageKey
> (key: Key, value: SyncStorageSchema[Key]) {
  await chrome.storage.sync.set({ [key]: value })
}

export const loadIsEnabled = async () => {
  return await getSyncStorage(ENABLED_STORAGE_KEY)
}

export const saveIsEnabled = async (isEnabled: boolean) => {
  await setSyncStorage(ENABLED_STORAGE_KEY, isEnabled)
}

export const loadCustomCommands = async () => {
  return await getSyncStorage(CUSTOM_COMMANDS_STORAGE_KEY)
}

export const saveCustomCommands = async (customCommands: string[]) => {
  await setSyncStorage(CUSTOM_COMMANDS_STORAGE_KEY, customCommands)
}
