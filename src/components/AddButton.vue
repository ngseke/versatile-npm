<script setup lang="ts">
import { VBtn } from 'vuetify/components'
import { TEST_IDS } from '../modules/constants'
</script>

<template>
  <VBtn
    block
    :data-testid="TEST_IDS.addButton"
    icon="fa-solid fa-plus"
    rounded="pill"
    size="small"
    title="Add"
    variant="tonal"
  />
</template>
