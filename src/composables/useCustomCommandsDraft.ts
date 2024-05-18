import { nanoid } from 'nanoid'
import { ref } from 'vue'

export interface CustomCommandDraft {
  id: string
  value: string
}

export function useCustomCommandsDraft () {
  const drafts = ref<CustomCommandDraft[] | null>(null)

  function add (value: string) {
    drafts.value?.push({ id: nanoid(), value })
  }

  function remove (id: string) {
    if (!drafts.value) return
    drafts.value = drafts.value
      .filter(item => item.id !== id)
  }

  return {
    drafts,
    add,
    remove,
  }
}
