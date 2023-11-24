<script setup lang="ts">
import { watch, computed, nextTick } from 'vue'
import { VCard, VList, VListItem, VListItemAction, VListSubheader } from 'vuetify/components'
import Draggable from 'vuedraggable'
import { nanoid } from 'nanoid'
import { useCustomCommands } from '../composables/useCustomCommands'
import { useCustomCommandsDraft } from '../composables/useCustomCommandsDraft'
import RemoveButton from './RemoveButton.vue'
import DragHandle from './DragHandle.vue'
import AddButton from './AddButton.vue'
import SuggestionChips from './SuggestionChips.vue'
import { useCustomCommandSuggestions } from '../composables/useCustomCommandSuggestions'
import { isEqual } from '../modules/isEqual'
import CommandTextField from './CommandTextField.vue'
import DefaultCommandList from './DefaultCommandList.vue'
import { useTextFieldRef } from '../composables/useTextFieldRef'

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

watch(drafts, save, { deep: true })

function save () {
  if (!drafts.value) return
  const newCommands = drafts.value?.map(({ value }) => value)
  if (isEqual(newCommands, customCommands.value)) return

  const filteredCommand = newCommands

  saveCustomCommands(filteredCommand)
}

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
  <VCard rounded="lg">
    <DefaultCommandList />
    <VList
      v-if="drafts"
      density="compact"
      lines="one"
    >
      <VListSubheader>
        Custom Commands
        <AddButton :disabled="isExceeded" @click="handleClickAdd" />
      </VListSubheader>

      <TransitionGroup name="list">
        <Draggable
          v-if="drafts"
          v-model="drafts"
          v-bind="dragOptions"
        >
          <template #item="{ element, index }">
            <VListItem color="transparent" tabindex="0">
              <template #prepend>
                <VListItemAction>
                  <DragHandle class="handle" />
                </VListItemAction>
              </template>
              <CommandTextField
                :ref="el => setTextFieldRef(el, index)"
                v-model="element.value"
              />

              <template #append>
                <RemoveButton @click="remove(element.id)" />
              </template>
            </VListItem>
          </template>
        </Draggable>
      </TransitionGroup>

      <VListItem v-if="!drafts?.length" disabled>
        <span>
          No custom commands
        </span>
      </VListItem>

      <VListItem
        v-if="unusedCustomCommandSuggestions.length "
        color="transparent"
        tabindex="0"
      >
        <SuggestionChips
          :disabled="isExceeded"
          :list="unusedCustomCommandSuggestions"
          @click="(value) => add(value.value)"
        />
      </VListItem>
    </VList>
  </VCard>
</template>

<style lang="sass" scoped>
.ghost
  opacity: 0.5

.handle
  cursor: move
</style>
