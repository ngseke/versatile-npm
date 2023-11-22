<script setup lang="ts">
import { VCol, VContainer, VRow } from 'vuetify/components'

</script>

<template>
  <VContainer>
    <VRow justify="center">
      <VCol :cols="12" :lg="6" :sm="8">
        <div class="d-flex flex-column flex-wrap ga-4">
          <slot />
        </div>
      </VCol>
    </VRow>
  </VContainer>
</template>
