<script setup lang="ts">
import { VBtn, VList, VListItem, VListItemSubtitle, VListItemTitle, VListSubheader, VMenu } from 'vuetify/components'
import { templates } from '../modules/templates'

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
        v-for="(item, _index) in templates"
        :key="_index"
      >
        <VListItem
          prependIcon="fa-solid fa-plus"
          @click="emit('add', item.value)"
        >
          <VListItemTitle class="mono">
            {{ item.value }}
          </VListItemTitle>
          <VListItemSubtitle>
            {{ item.label }}
          </VListItemSubtitle>
        </VListItem>
      </template>
    </VList>
  </VMenu>
</template>
