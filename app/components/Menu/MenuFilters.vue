<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

interface Props {
  categories: Array<{ id: number, name: string }>
  selectedCategory?: number | null
}

const props = defineProps<Props>()
const emit = defineEmits(['update:selectedCategory'])

const items = computed<TabsItem[]>(() => [
  {
    label: 'Tous',
    value: null
  },
  ...props.categories.map(category => ({
    label: category.name,
    value: category.id
  }))
])

const selectedTab = computed({
  get: () => props.selectedCategory,
  set: value => emit('update:selectedCategory', value)
})
</script>

<template>
  <UContainer>
    <UTabs
      v-model="selectedTab"
      color="primary"
      variant="link"
      :content="false"
      :items="items"
      class="w-full mt-8"
    />
  </UContainer>
</template>
