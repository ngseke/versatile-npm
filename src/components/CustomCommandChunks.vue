<script setup lang="ts">
import { computed } from 'vue'
import { parseCustomCommand } from '../modules/customCommands'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  modelValue: string
}>()

const chunks = computed(() => parseCustomCommand(props.modelValue))
</script>

<template>
  <template
    v-for="chunk in chunks"
    :key="chunk.id"
  >
    <span v-if="chunk.type === 'text'">{{ chunk.value }}</span>
    <span
      v-else-if="chunk.type === 'packageManager'"
      class="font-weight-bold"
    >{{ chunk.value }}</span>
    <span
      v-else-if="chunk.type === 'packageNamePlaceholder'"
      class="font-weight-bold gradient"
    >{{ chunk.value }}</span>
  </template>
</template>

<style lang="sass" scoped>
span
  white-space: pre

.gradient
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  background-image: linear-gradient(150deg, #F44336, #fe5196)
</style>
