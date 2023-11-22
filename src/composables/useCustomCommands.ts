import { onMounted, onUnmounted, ref } from 'vue'
import { loadCustomCommands, saveCustomCommands } from '../modules/storage'
import { generateDefaultCustomCommands } from '../modules/customCommands'

export function useCustomCommands () {
  const customCommands = ref<string[] | null>(null)

  async function handler () {
    customCommands.value = await loadCustomCommands()
  }

  onMounted(async () => {
    customCommands.value = await loadCustomCommands()
    chrome.storage.onChanged.addListener(handler)
  })

  onUnmounted(() => {
    chrome.storage.onChanged.removeListener(handler)
  })

  async function resetToDefaultCustomCommands () {
    await saveCustomCommands(generateDefaultCustomCommands())
  }

  return {
    customCommands,
    saveCustomCommands,
    resetToDefaultCustomCommands,
  }
}
