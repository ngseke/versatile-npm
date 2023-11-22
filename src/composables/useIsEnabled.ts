import { onMounted, onUnmounted, ref, watch } from 'vue'
import { loadIsEnabled, saveIsEnabled } from '../modules/storage'

export function useIsEnabled () {
  const isEnabled = ref<boolean | null>(null)

  async function handler () {
    isEnabled.value = await loadIsEnabled()
  }

  onMounted(async () => {
    isEnabled.value = await loadIsEnabled()
    chrome.storage.onChanged.addListener(handler)
  })

  onUnmounted(() => {
    chrome.storage.onChanged.removeListener(handler)
  })

  watch(isEnabled, (isEnabled) => {
    if (isEnabled == null) return
    saveIsEnabled(isEnabled)
  })

  return {
    isEnabled,
  }
}
