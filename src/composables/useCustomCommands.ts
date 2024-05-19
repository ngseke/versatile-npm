import { onMounted, ref } from 'vue'
import { loadCustomCommands, saveCustomCommands } from '../modules/storage'
import { useChromeStorageListener } from './useChromeStorageListener'
import { generateDefaultCustomCommands } from '../modules/templates'

export function useCustomCommands () {
  const customCommands = ref<string[] | null>(null)

  async function handler () {
    customCommands.value = await loadCustomCommands()
  }

  onMounted(handler)
  useChromeStorageListener(handler)

  async function resetToDefaultCustomCommands () {
    await saveCustomCommands(generateDefaultCustomCommands())
  }

  return {
    customCommands,
    saveCustomCommands,
    resetToDefaultCustomCommands,
  }
}
