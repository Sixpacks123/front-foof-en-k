<template>
    <BaseContainer
      :loading="pending"
      :is-empty="!categories?.length"
      empty-title="Aucune catégorie"
      empty-description="Aucune catégorie de produits n'est disponible pour le moment."
      empty-icon="i-lucide-folder-x"
    >
      <UTabs
        v-model="selectedTab"
        color="primary"
        variant="link"
        :content="false"
        :items="items"
        class="w-full"
      />
    </BaseContainer>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import type { Product, Category } from '~/types'

interface Props {
  selectedCategory: number | null
  categories: Category[]
  products: Product[]
  pending: boolean
}

interface Emits {
  'update:selectedCategory': [value: number | null]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const getProductCountByCategory = (categoryId: number) => {
  return props.products.filter(p => p.category?.id === categoryId).length
}

const items = computed<TabsItem[]>(() => [
  {
    label: `Tous (${props.products?.length || 0})`,
    value: null
  },
  ...props.categories.map(category => ({
    label: `${category.name} (${getProductCountByCategory(category.id)})`,
    value: category.id,
    icon: category.icon || 'i-lucide-folder'
  }))
])

const selectedTab = computed({
  get: () => props.selectedCategory,
  set: value => emit('update:selectedCategory', value)
})
</script>
