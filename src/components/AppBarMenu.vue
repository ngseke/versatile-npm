<script setup lang="ts">
import { VBtn, VDivider, VList, VListItem, VListItemSubtitle, VListItemTitle, VMenu } from 'vuetify/components'
import { useCustomCommands } from '../composables/useCustomCommands'
import { VERSION } from '../modules/constants'

const { resetToDefaultCustomCommands } = useCustomCommands()

type Item = {
  title: string
  icon?: string
  subtitle?: string
  handler?: () => void
  href?: string
} | 'divider'

const list: Item[] = [
  {
    title: 'Reset To Default',
    icon: 'fa-solid fa-rotate-left',
    handler () {
      resetToDefaultCustomCommands()
    },
  },
  'divider',
  {
    title: 'Help',
    icon: 'fa-solid fa-circle-question',
    href: 'https://versatile-npm.ngseke.me/',
  },
  {
    title: 'Chrome Web Store',
    icon: 'fa-brands fa-chrome',
    href: 'https://chromewebstore.google.com/detail/versatile-npm/jahejogdoffpehfhkhbpjblnlhghjnje',
  },
  {
    title: 'GitHub',
    icon: 'fa-brands fa-github',
    href: 'https://github.com/ngseke/versatile-npm',
  },
  {
    title: 'Report Issue',
    icon: 'fa-solid fa-bug',
    href: 'https://github.com/ngseke/versatile-npm/issues',
  },
  {
    title: 'Buy Me a Coffee',
    icon: 'fa-solid fa-mug-hot',
    href: 'https://ko-fi.com/L3L3D5N8A',
  },
  'divider',
  {
    title: 'Version',
    subtitle: VERSION,
  },
]
</script>

<template>
  <VMenu>
    <template #activator="{ props }">
      <VBtn
        icon="fa-solid fa-ellipsis-vertical"
        size="small"
        v-bind="props"
      />
    </template>
    <VList>
      <template
        v-for="(item, _index) in list"
        :key="_index"
      >
        <VDivider v-if="item === 'divider'" />
        <VListItem
          v-else
          :href="item.href"
          :prependIcon="item.icon"
          :target=" item.href ? '_blank' : undefined"
          @click="item.handler"
        >
          <VListItemTitle v-if="item.title">
            {{ item.title }}
          </VListItemTitle>
          <VListItemSubtitle v-if="item.subtitle">
            {{ item.subtitle }}
          </VListItemSubtitle>
        </VListItem>
      </template>
    </VList>
  </VMenu>
</template>
