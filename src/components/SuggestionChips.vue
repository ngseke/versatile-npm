<script setup lang="ts" generic="ValueType">
import { VChip, VIcon } from 'vuetify/components'

interface Item { value: ValueType, label: string }

defineProps<{
  list?: Item[]
  disabled?: boolean
}>()
defineEmits<{ click: [item: Item] }>()
</script>

<template>
  <TransitionGroup name="chip" tag="div">
    <VChip
      v-for="item in list"
      :key="String(item.value)"
      class="mr-2 mb-2"
      density="comfortable"
      :disabled="disabled"
      @click="$emit('click', item)"
    >
      <VIcon color="amber" size="x-small" start>fa-solid fa-lightbulb</VIcon>
      <span class="mono font-weight-medium">
        {{ item.label }}
      </span>
    </VChip>
  </TransitionGroup>
</template>

<style lang="sass" scoped>
.chip
  &-leave-active
    position: absolute
  &-enter-active, &-leave-active, &-move
    transition: all .2s
  &-enter-from, &-leave-to
    transform-origin: center
    transform: scale(0)
    opacity: 0
</style>
