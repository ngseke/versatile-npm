<script setup lang="ts">
import { VLayout, VMain } from 'vuetify/components'
import AppBar from './AppBar.vue'
import Container from './Container.vue'
</script>

<template>
  <VLayout>
    <AppBar />
    <VMain>
      <Container>
        <slot />
      </Container>
    </VMain>
  </VLayout>
</template>
