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
  <template v-for="chunk in chunks" :key="chunk.id">
    <span
      v-if="chunk.type === 'manager'"
      class="font-weight-bold"
    >{{ chunk.value }}</span>
    <span
      v-else-if="chunk.type === 'name'"
      class="font-weight-bold gradient-name"
    >{{ chunk.value }}</span>
    <span
      v-else-if="chunk.type === 'version'"
      class="font-weight-bold gradient-version"
    >{{ chunk.value }}</span>
    <span v-else>{{ chunk.value }}</span>
  </template>
</template>

<style lang="sass" scoped>
span
  white-space: pre

.gradient-name
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  background-image: linear-gradient(150deg, #F44336, #fe5196)

.gradient-version
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  background-image: linear-gradient(150deg, #4facfe, #00f2fe)
</style>
