import { type MaybeRef, computed, unref } from 'vue'
import { type Nullish } from '../types/Nullish'
import { type CustomCommandDraft } from './useCustomCommandsDraft'
import { customCommandSuggestions, packageNamePlaceholder } from '../modules/customCommands'

export function useCustomCommandSuggestions (
  customCommandDrafts: MaybeRef<Nullish<CustomCommandDraft[]>>
) {
  const unusedCustomCommandSuggestions = computed(() => {
    const draftSet = new Set<string>(
      unref(customCommandDrafts)?.map(draft => draft.value.trim())
    )
    return customCommandSuggestions
      .filter(suggestion => !draftSet.has(suggestion))
      .map((value) => ({
        value,
        label: value.replaceAll(packageNamePlaceholder, ''),
      }))
  })

  return {
    unusedCustomCommandSuggestions,
  }
}
