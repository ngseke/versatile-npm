<script setup lang="ts">
import { watch, computed, nextTick, unref } from 'vue'
import { VList, VListSubheader } from 'vuetify/components'
import Draggable from 'vuedraggable'
import { nanoid } from 'nanoid'
import { useCustomCommands } from '../composables/useCustomCommands'
import { useCustomCommandsDraft } from '../composables/useCustomCommandsDraft'
import CommandTextField from './CommandTextField.vue'
import { useTextFieldRef } from '../composables/useTextFieldRef'
import CustomCommandsListItemLayout from './CustomCommandsListItemLayout.vue'
import AddButton from './AddButton.vue'
import { DEBOUNCED_SAVE_DELAY, TEST_IDS } from '../modules/constants'
import { useDebounceFn } from '@vueuse/core'
import { cloneDeep, isEqual } from 'lodash-es'
import CustomCommandTemplateMenu from './CustomCommandTemplateMenu.vue'

const { customCommands, saveCustomCommands } = useCustomCommands()
const { drafts, add, remove } = useCustomCommandsDraft()

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

  saveCustomCommands(newCommands)
}

const debouncedSave = useDebounceFn(save, DEBOUNCED_SAVE_DELAY)

watch(() => cloneDeep(unref(drafts)), (newDrafts, oldDrafts) => {
  if (newDrafts?.length !== oldDrafts?.length) {
    save()
  } else {
    debouncedSave()
  }
}, { deep: true })

const { setTextFieldRef, activateLastTextField } = useTextFieldRef()

async function handleClickAdd () {
  add('<package>@<version>')
  await nextTick()
  activateLastTextField()
}

const dragOptions = {
  animation: 200,
  ghostClass: 'ghost',
  handle: '.handle',
  itemKey: 'id',
}

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
      <CustomCommandTemplateMenu @add="add" />
    </VListSubheader>

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
</style>
