<script setup lang="ts">
import { VCard } from 'vuetify/components'
import DefaultCommandList from './DefaultCommandList.vue'
import CustomCommandsList from './CustomCommandsList.vue'
</script>

<template>
  <VCard rounded="lg">
    <DefaultCommandList />
    <CustomCommandsList />
  </VCard>
</template>
