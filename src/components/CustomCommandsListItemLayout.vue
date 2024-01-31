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
      <VListItemAction v-if="handleClassName">
        <DragHandle :class="handleClassName" />
      </VListItemAction>

      <div v-else class="spacer" />
    </template>

    <slot />

    <template #append>
      <RemoveButton
        v-if="$props.onRemove"
        @click="$emit('remove')"
      />
      <div v-else class="spacer" />
    </template>
  </VListItem>
</template>

<style lang="sass" scoped>
.spacer
  width: 40px
</style>
