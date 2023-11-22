<script setup lang="ts">
import { VIcon, VList, VListItem, VListSubheader } from 'vuetify/components'
import CustomCommandChunks from './CustomCommandChunks.vue'

const command = 'npm i <package>'
</script>

<template>
  <VList lines="one">
    <VListSubheader>
      Default Command
    </VListSubheader>

    <VListItem>
      <template #prepend>
        <VIcon class="" size="small">fa-solid fa-angle-right</VIcon>
      </template>
      <span class="mono font-weight-medium text-subtitle-1">
        <CustomCommandChunks :modelValue="command" />
      </span>
    </VListItem>
  </VList>
</template>
