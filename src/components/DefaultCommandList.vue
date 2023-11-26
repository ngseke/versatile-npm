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

    <VListItem density="compact">
      <div class="d-flex align-center">
        <VIcon class="text-medium-emphasis mr-3" size="small">fa-solid fa-angle-right</VIcon>
        <span class="mono font-weight-medium text-subtitle-1">
          <CustomCommandChunks :modelValue="command" />
        </span>
      </div>
    </VListItem>
  </VList>
</template>
