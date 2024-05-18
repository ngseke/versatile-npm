<script setup lang="ts">
import { VBtn, VList, VListItem, VListItemSubtitle, VListItemTitle, VListSubheader, VMenu } from 'vuetify/components'
import { customCommandSuggestions } from '../modules/customCommands'

const emit = defineEmits<{
  'add': [value: string]
}>()
</script>

<template>
  <VMenu>
    <template #activator="{ props }">
      <VBtn
        icon="fa-solid fa-ellipsis-vertical"
        size="x-small"
        v-bind="props"
        variant="flat"
      />
    </template>

    <VList>
      <VListSubheader>
        <VListItemTitle>
          Template
        </VListItemTitle>
      </VListSubheader>

      <template
        v-for="(item, _index) in customCommandSuggestions"
        :key="_index"
      >
        <VListItem
          prependIcon="fa-solid fa-plus"
          @click="emit('add', item.value)"
        >
          <VListItemTitle>
            {{ item.label }}
          </VListItemTitle>
          <VListItemSubtitle class="mono">
            {{ item.value }}
          </VListItemSubtitle>
        </VListItem>
      </template>
    </VList>
  </VMenu>
</template>
