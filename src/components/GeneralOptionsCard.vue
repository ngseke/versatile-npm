<script setup lang="ts">
import { ref, watch } from 'vue'
import { VCard, VList, VListItem, VListItemAction, VListItemTitle, VSwitch } from 'vuetify/components'
import { useIsEnabled } from '../composables/useIsEnabled'

const isEnabledSymbol = Symbol('isEnabled')

const selectedItem = ref<symbol[]>([])
const { isEnabled } = useIsEnabled()

watch(isEnabled, (isEnabled) => {
  if (isEnabled == null) return
  if (isEnabled) selectedItem.value.push(isEnabledSymbol)
  else selectedItem.value = selectedItem.value.filter(item => item !== isEnabledSymbol)
})

watch(() => selectedItem.value.includes(isEnabledSymbol), (value) => {
  isEnabled.value = value
})
</script>

<template>
  <VCard rounded="lg">
    <VList
      v-model:selected="selectedItem"
      density="compact"
      lines="one"
      variant="elevated"
    >
      <VListItem :elevation="0" :value="isEnabledSymbol">
        <template #prepend="{ isActive }">
          <VListItemAction start>
            <VSwitch
              color="red"
              density="comfortable"
              hideDetails
              :loading="isEnabled == null"
              :modelValue="isActive"
            />
          </VListItemAction>
        </template>

        <VListItemTitle>
          Enable Versatile Npm
        </VListItemTitle>
      </VListItem>
    </VList>
  </VCard>
</template>
