<script setup lang="ts">
import { VListItem, VListItemAction } from 'vuetify/components'
import RemoveButton from './RemoveButton.vue'
import DragHandle from './DragHandle.vue'

defineProps<{ handleClassName?: string, onRemove?: unknown }>()
defineEmits<{ remove: [] }>()
</script>

<template>
  <VListItem color="transparent" tabindex="0">
    <template #prepend>
      <VListItemAction>
        <DragHandle :class="[handleClassName, { hidden: !handleClassName }]" />
      </VListItemAction>
    </template>

    <slot />

    <template #append>
      <RemoveButton
        :class="{ hidden: !$props.onRemove }"
        @click="$emit('remove')"
      />
    </template>
  </VListItem>
</template>

<style lang="sass" scoped>
.hidden
  visibility: hidden
</style>
