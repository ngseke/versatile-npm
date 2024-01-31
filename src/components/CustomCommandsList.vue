<script setup lang="ts">
import { watch, computed, nextTick, unref } from 'vue'
import { VList, VListItem, VListSubheader } from 'vuetify/components'
import Draggable from 'vuedraggable'
import { nanoid } from 'nanoid'
import { useCustomCommands } from '../composables/useCustomCommands'
import { useCustomCommandsDraft } from '../composables/useCustomCommandsDraft'
import SuggestionChips from './SuggestionChips.vue'
import { useCustomCommandSuggestions } from '../composables/useCustomCommandSuggestions'
import CommandTextField from './CommandTextField.vue'
import { useTextFieldRef } from '../composables/useTextFieldRef'
import CustomCommandsListItemLayout from './CustomCommandsListItemLayout.vue'
import AddButton from './AddButton.vue'
import { DEBOUNCED_SAVE_DELAY, TEST_IDS } from '../modules/constants'
import { useDebounceFn } from '@vueuse/core'
import { cloneDeep, isEqual } from 'lodash-es'

const { customCommands, saveCustomCommands } = useCustomCommands()
const { customCommandDrafts: drafts } = useCustomCommandsDraft()

function setDraftsFromCustomCommands (commands: string[]) {
  drafts.value = commands.map((value) => ({ id: nanoid(), value }))
}

watch(customCommands, (customCommands) => {
  if (!customCommands) return
  const commands = drafts.value?.map(({ value }) => value)

  if (isEqual(commands, customCommands)) return

  setDraftsFromCustomCommands(customCommands)
})

function save () {
  if (!drafts.value) return
  const newCommands = drafts.value?.map(({ value }) => value)
  if (isEqual(newCommands, customCommands.value)) return

  const filteredCommand = newCommands

  saveCustomCommands(filteredCommand)
}

const debouncedSave = useDebounceFn(save, DEBOUNCED_SAVE_DELAY)

watch(() => cloneDeep(unref(drafts)), (newDrafts, oldDrafts) => {
  if (newDrafts?.length !== oldDrafts?.length) {
    save()
  } else {
    debouncedSave()
  }
}, { deep: true })

function remove (id: string) {
  if (!drafts.value) return
  drafts.value = drafts.value
    .filter(item => item.id !== id)
}

function add (value: string) {
  drafts.value?.push({ id: nanoid(), value })
}

const { setTextFieldRef, activateLastTextField } = useTextFieldRef()

async function handleClickAdd () {
  add('<package>')
  await nextTick()
  activateLastTextField()
}

const dragOptions = {
  animation: 200,
  ghostClass: 'ghost',
  handle: '.handle',
  itemKey: 'id',
}

const { unusedCustomCommandSuggestions } = useCustomCommandSuggestions(drafts)

const isExceeded = computed(
  () => (drafts.value?.length ?? Infinity) >= 20
)
</script>

<template>
  <VList
    v-if="drafts"
    :data-testid="TEST_IDS.customCommandsSection"
    density="compact"
    lines="one"
  >
    <VListSubheader>
      Custom Commands
    </VListSubheader>

    <VListItem
      v-if="unusedCustomCommandSuggestions.length "
      color="transparent"
    >
      <SuggestionChips
        :disabled="isExceeded"
        :list="unusedCustomCommandSuggestions"
        @click="(value) => add(value.value)"
      />
    </VListItem>

    <TransitionGroup name="list">
      <Draggable
        v-if="drafts"
        v-model="drafts"
        v-bind="dragOptions"
        :ondragend="save"
      >
        <template #item="{ element, index }">
          <CustomCommandsListItemLayout
            handleClassName="handle"
            @remove="remove(element.id)"
          >
            <CommandTextField
              :ref="el => setTextFieldRef(el, index)"
              v-model="element.value"
              @blur="save"
            />
          </CustomCommandsListItemLayout>
        </template>
      </Draggable>
    </TransitionGroup>

    <CustomCommandsListItemLayout>
      <AddButton :disabled="isExceeded" @click="handleClickAdd" />
    </CustomCommandsListItemLayout>
  </VList>
</template>

<style lang="sass" scoped>
.ghost
  opacity: 0.5

.handle
  cursor: move
</style>
