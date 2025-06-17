<template>
  <BaseContainer
    :loading="pending"
    :is-empty="!categories?.length"
    empty-title="Aucune catégorie"
    empty-description="Aucune catégorie de produits n'est disponible pour le moment."
    empty-icon="i-lucide-folder-x"
  >
    <!-- Mobile: Boutons horizontaux scrollables -->
    <div class="md:hidden">
      <div class="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        <UButton
          :color="selectedCategory === null ? 'primary' : 'neutral'"
          :variant="selectedCategory === null ? 'solid' : 'outline'"
          size="sm"
          class="rounded-full whitespace-nowrap flex-shrink-0"
          @click="$emit('update:selectedCategory', null)"
        >
          <UIcon
            name="i-lucide-grid-3x3"
            class="w-4 h-4 mr-2"
          />
          Tous ({{ products?.length || 0 }})
        </UButton>
        <UButton
          v-for="category in categories"
          :key="category.id"
          :color="selectedCategory === category.id ? 'primary' : 'neutral'"
          :variant="selectedCategory === category.id ? 'solid' : 'outline'"
          size="sm"
          class="rounded-full whitespace-nowrap flex-shrink-0"
          @click="$emit('update:selectedCategory', category.id)"
        >
          <UIcon
            :name="getCategoryIcon(category.name)"
            class="w-4 h-4 mr-2"
          />
          {{ category.name }} ({{ getProductCountByCategory(category.id) }})
        </UButton>
      </div>
    </div>

    <!-- Desktop: Onglets -->
    <div class="hidden md:block">
      <UTabs
        v-model="selectedTab"
        color="primary"
        variant="link"
        :content="false"
        :items="items"
        class="w-full"
      />
    </div>
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

const { getCategoryIcon } = useMenu()

const getProductCountByCategory = (categoryId: number) => {
  return props.products.filter(p => p.category?.id === categoryId).length
}

const items = computed<TabsItem[]>(() => [
  {
    label: `Tous (${props.products?.length || 0})`,
    value: 'all',
    icon: 'i-lucide-grid-3x3'
  },
  ...props.categories.map(category => ({
    label: `${category.name} (${getProductCountByCategory(category.id)})`,
    value: category.id.toString(),
    icon: getCategoryIcon(category.name)
  }))
])

const selectedTab = computed({
  get: () => props.selectedCategory === null ? 'all' : props.selectedCategory.toString(),
  set: (value: string) => {
    const categoryId = value === 'all' ? null : parseInt(value)
    emit('update:selectedCategory', categoryId)
  }
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
