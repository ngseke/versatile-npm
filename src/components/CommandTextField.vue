<script setup lang="ts">
import { VTextField } from 'vuetify/components'
import { ref, nextTick } from 'vue'
import CustomCommandChunks from './CustomCommandChunks.vue'

defineProps<{ modelValue: string }>()
defineEmits<{
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
  isActive.value = isFocused
}

function handleKeydown () {
  handleUpdateFocused(false)
}

defineExpose({ activate })
</script>

<template>
  <div class="position-relative">
    <Transition name="fade">
      <div
        v-if="!isActive"
        class="cover px-4 py-2 w-100 h-100 mono text-subtitle-1 text-truncate text-left position-absolute"
      >
        <CustomCommandChunks :modelValue="modelValue" />
      </div>
    </Transition>

    <VTextField
      ref="textField"
      class="mono"
      :class="{ transparent: !isActive }"
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
  </div>
</template>

<style lang="sass" scoped>
.cover
  line-height: 1.5
  top: 0
  left: 0
  z-index: 1
  pointer-events: none

.transparent
  :deep(input)
    color: transparent

.fade
  &-leave-active
    transition: opacity .15s
  &-leave-to
    opacity: 0
</style>
