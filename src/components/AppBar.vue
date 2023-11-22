<script setup lang="ts">
import { VAppBar, VAppBarTitle } from 'vuetify/components'
import AppBarMenu from './AppBarMenu.vue'
</script>

<template>
  <VAppBar density="comfortable" rounded>
    <VAppBarTitle class="mono font-weight-bold">
      Versatile
      <span class="text-red font-weight-black">Npm</span>
    </VAppBarTitle>

    <template #append>
      <AppBarMenu />
    </template>
  </VAppBar>
</template>
