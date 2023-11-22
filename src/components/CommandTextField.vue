<script setup lang="ts">
import { VTextField } from 'vuetify/components'
import { ref, nextTick } from 'vue'
import CustomCommandChunks from './CustomCommandChunks.vue'

const props = defineProps<{ modelValue: string }>()
const emits = defineEmits<{
  'update:modelValue': [value: string]
  'remove': []
}>()

const isActive = ref(false)

const textField = ref<InstanceType<typeof VTextField> | null>(null)

async function activate () {
  isActive.value = true
  await nextTick()
  textField.value?.focus()
}

function handleUpdateFocused (isFocused: boolean) {
  if (isFocused) return
  isActive.value = false
  if (!props.modelValue) emits('remove')
}

function handleKeydown () {
  handleUpdateFocused(false)
}

defineExpose({ activate })
</script>

<template>
  <button
    v-if="!isActive"
    class="px-4 py-2 mono text-subtitle-1 d-inline-block text-truncate"
    :style="{ lineHeight: 'normal' }"
    type="button"
    @click="activate"
  >
    <CustomCommandChunks :modelValue="modelValue" />
  </button>

  <VTextField
    v-else
    ref="textField"
    class="mono"
    density="compact"
    flat
    hideDetails
    :maxlength="1000"
    :modelValue="modelValue"
    placeholder="npm i <package>"
    rounded
    singleLine
    variant="solo-filled"
    @keydown.enter.prevent="handleKeydown"
    @keydown.esc.prevent="handleKeydown"
    @update:focused="handleUpdateFocused"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>
