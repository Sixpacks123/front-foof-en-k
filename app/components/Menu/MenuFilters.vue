<template>
  <UContainer>
    <div class="flex flex-col sm:flex-row gap-4 mt-8">
      <UInput
        :model-value="searchQuery"
        placeholder="Rechercher un plat ou ingrédient..."
        icon="i-lucide-search"
        size="lg"
        class="flex-1"
        :disabled="pending"
        @update:model-value="$emit('update:searchQuery', $event)"
      />

      <div class="flex gap-2">
        <USelect
          :model-value="sortBy"
          :options="sortOptions"
          placeholder="Trier par"
          class="w-40"
          :disabled="pending"
          @update:model-value="$emit('update:sortBy', $event)"
        />

        <UButton
          color="neutral"
          variant="outline"
          icon="i-lucide-sliders-horizontal"
          :disabled="pending"
          @click="$emit('update:showFilters', !showFilters)"
        >
          Filtres
          <UBadge
            v-if="activeFiltersCount > 0"
            color="primary"
            size="xs"
            class="ml-2"
          >
            {{ activeFiltersCount }}
          </UBadge>
        </UButton>
      </div>
    </div>

    <!-- Panneau de filtres -->
    <UCard
      v-show="showFilters"
      class="mt-4 transition-all duration-300 ease-in-out"
    >
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Prix max: {{ maxPrice }}€</label>
          <URange
            :model-value="maxPrice"
            :min="0"
            :max="20"
            :step="0.5"
            :disabled="pending"
            class="w-full"
            @update:model-value="$emit('update:maxPrice', $event)"
          />
        </div>
        <div class="space-y-3">
          <UCheckbox
            :model-value="filters.vegetarian"
            label="Végétarien"
            :disabled="pending"
            color="success"
            @update:model-value="updateFilter('vegetarian', $event as boolean)"
          />
          <UCheckbox
            :model-value="filters.vegan"
            label="Vegan"
            :disabled="pending"
            color="success"
            @update:model-value="updateFilter('vegan', $event as boolean)"
          />
          <UCheckbox
            :model-value="filters.available"
            label="Disponible uniquement"
            :disabled="pending"
            color="primary"
            @update:model-value="updateFilter('available', $event as boolean)"
          />
        </div>
        <div class="flex items-end">
          <UButton
            color="error"
            variant="outline"
            size="sm"
            :disabled="pending"
            @click="$emit('clearFilters')"
          >
            <UIcon name="i-lucide-x" class="w-4 h-4 mr-2" />
            Effacer filtres
          </UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
interface Props {
  searchQuery: string
  sortBy: string
  showFilters: boolean
  maxPrice: number
  filters: {
    vegetarian: boolean
    vegan: boolean
    available: boolean
  }
  pending: boolean
  activeFiltersCount: number
}

const props = defineProps<Props>()
const emit = defineEmits([
  'update:searchQuery',
  'update:sortBy',
  'update:showFilters',
  'update:maxPrice',
  'update:filters',
  'clearFilters'
])

const sortOptions = [
  { label: 'Nom (A-Z)', value: 'name-asc' },
  { label: 'Nom (Z-A)', value: 'name-desc' },
  { label: 'Prix croissant', value: 'price-asc' },
  { label: 'Prix décroissant', value: 'price-desc' },
  { label: 'Popularité', value: 'popular' },
  { label: 'Nouveautés', value: 'newest' }
]

const updateFilter = (key: keyof Props['filters'], value: boolean) => {
  emit('update:filters', { ...props.filters, [key]: value })
}
</script>
