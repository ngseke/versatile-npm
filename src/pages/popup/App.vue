<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue'
import CustomCommandList from '../../components/CustomCommandList.vue'
import DefaultCommandList from '../../components/DefaultCommandList.vue'
</script>

<template>
  <AppLayout>
    <DefaultCommandList />
    <CustomCommandList />
  </AppLayout>
</template>
