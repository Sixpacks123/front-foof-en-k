<template>
  <BaseContainer
    :loading="pending"
    :is-empty="!categories?.length"
    empty-title="Aucune catégorie"
    empty-description="Aucune catégorie de produits n'est disponible pour le moment."
    empty-icon="i-lucide-folder-x"
  >
    <div class="flex flex-wrap gap-3 justify-center">
      <UButton
        :color="selectedCategory === null ? 'primary' : 'neutral'"
        :variant="selectedCategory === null ? 'solid' : 'outline'"
        size="md"
        class="rounded-full"
        @click="$emit('update:selectedCategory', null)"
      >
        Tous ({{ products?.length || 0 }})
      </UButton>
      <UButton
        v-for="category in categories"
        :key="category.id"
        :color="selectedCategory === category.id ? 'primary' : 'neutral'"
        :variant="selectedCategory === category.id ? 'solid' : 'outline'"
        size="md"
        class="rounded-full"
        @click="$emit('update:selectedCategory', category.id)"
      >
        {{ category.name }} ({{ getProductCountByCategory(category.id) }})
      </UButton>
    </div>
  </BaseContainer>
</template>

<script setup lang="ts">
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
defineEmits<Emits>()

const getProductCountByCategory = (categoryId: number) => {
  return props.products.filter(p => p.category?.id === categoryId).length
}
</script>
