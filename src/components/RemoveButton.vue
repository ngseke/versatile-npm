<script setup lang="ts">
import { VBtn } from 'vuetify/components'
import { TEST_IDS } from '../modules/constants'
</script>

<template>
  <VBtn
    :data-testid="TEST_IDS.removeButton"
    icon="fa-solid fa-times"
    size="small"
    title="Remove"
    variant="plain"
  />
</template>
