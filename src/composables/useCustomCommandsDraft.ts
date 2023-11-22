import { ref } from 'vue'

export interface CustomCommandDraft {
  id: string
  value: string
}

export function useCustomCommandsDraft () {
  const customCommandDrafts = ref<CustomCommandDraft[] | null>(null)

  return {
    customCommandDrafts,
  }
}
