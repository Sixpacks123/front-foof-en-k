<template>
  <div class="bg-gray-50">
    <!-- Page Header -->
    <UContainer class="py-8">
      <div class="text-center">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {{ activeMenu ? `Menu ${activeMenu.name}` : 'Le Menu' }}
        </h1>
        <p
          v-if="activeMenu?.description"
          class="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          {{ activeMenu.description }}
        </p>
      </div>
    </UContainer>

    <!-- Breadcrumbs -->
    <UContainer class="py-4">
      <UBreadcrumb
        :links="[
          { label: 'Accueil', to: '/', icon: 'i-heroicons-home' },
          { label: 'Menu', to: '/menus' }
        ]"
      />
    </UContainer>

    <!-- Menu Selection (if multiple menus available) -->
    <UContainer
      v-if="menus.length > 1"
      class="py-6"
    >
      <UFormGroup
        label="Choisir un menu"
        help="Sélectionnez le menu que vous souhaitez consulter"
      >
        <USelect
          v-model="activeMenuId"
          :options="menuOptions"
          placeholder="Sélectionner un menu..."
          size="lg"
          @update:model-value="(value: any) => changeActiveMenu(value as number)"
        />
      </UFormGroup>
    </UContainer>

    <!-- No Active Menu State -->
    <UContainer
      v-if="!pending && !activeMenu"
      class="py-16 text-center"
    >
      <UIcon
        name="i-lucide-calendar-x"
        class="w-16 h-16 text-gray-400 mx-auto mb-4"
      />
      <h3 class="text-xl font-semibold mb-2">
        Aucun menu actif
      </h3>
      <p class="text-gray-600">
        Aucun menu n'est actuellement disponible.
      </p>
    </UContainer>

    <!-- Search and Filters Section -->
    <UContainer
      v-if="activeMenu"
      class="py-8"
    >
      <section
        id="filters-section"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-6">
          <UIcon
            name="i-lucide-search"
            class="w-5 h-5 text-primary-500"
            aria-hidden="true"
          />
          <h2 class="text-lg font-semibold text-gray-800">
            Recherche et filtres
          </h2>
        </div>

        <!-- Search Input -->
        <div class="mb-6">
          <div class="relative">
            <UInput
              id="search-input"
              v-model="searchQuery"
              placeholder="Rechercher un plat, ingrédient ou catégorie..."
              icon="i-lucide-search"
              size="lg"
              class="w-full"
              :disabled="pending"
              aria-label="Rechercher des produits dans le menu"
              aria-describedby="search-help"
            />
            <div
              id="search-help"
              class="sr-only"
            >
              Tapez pour rechercher parmi {{ products.length }} produits disponibles
            </div>
            <UButton
              v-if="searchQuery"
              variant="ghost"
              size="sm"
              icon="i-lucide-x"
              class="absolute right-2 top-1/2 -translate-y-1/2"
              aria-label="Effacer la recherche"
              @click="clearSearch"
            />
          </div>
        </div>

        <!-- Categories Filter -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <UIcon
              name="i-lucide-filter"
              class="w-4 h-4 text-gray-500"
              aria-hidden="true"
            />
            <h3 class="text-sm font-medium text-gray-700">
              Filtrer par catégorie
            </h3>
          </div>

          <div
            v-if="pending"
            class="flex flex-wrap gap-3"
            aria-label="Chargement des catégories"
          >
            <USkeleton
              v-for="i in 4"
              :key="i"
              class="h-10 w-28 rounded-full"
            />
          </div>
          <div
            v-else
            class="flex flex-wrap gap-3"
            role="radiogroup"
            aria-label="Filtres par catégorie"
          >
            <UButton
              :color="selectedCategory === null ? 'primary' : 'neutral'"
              :variant="selectedCategory === null ? 'solid' : 'outline'"
              size="md"
              class="rounded-full hover:scale-105 transition-all duration-200"
              :aria-pressed="selectedCategory === null"
              aria-label="Afficher tous les produits"
              @click="selectedCategory = null"
            >
              <UIcon
                name="i-lucide-grid-3x3"
                class="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              Tous ({{ products?.length || 0 }})
            </UButton>
            <UButton
              v-for="category in categories"
              :key="(category as any).id"
              :color="selectedCategory === (category as any).id ? 'primary' : 'neutral'"
              :variant="selectedCategory === (category as any).id ? 'solid' : 'outline'"
              size="md"
              class="rounded-full hover:scale-105 transition-all duration-200"
              :aria-pressed="selectedCategory === (category as any).id"
              :aria-label="`Filtrer par ${(category as any).name}`"
              @click="selectedCategory = (category as any).id"
            >
              <UIcon
                name="i-lucide-tag"
                class="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              {{ (category as any).name }} ({{ getProductCountByCategory(products, (category as any).id) }})
            </UButton>
          </div>
        </div>
      </section>
    </UContainer>

    <!-- Results Counter -->
    <UContainer
      v-if="activeMenu"
      class="pb-6"
    >
      <div class="flex items-center justify-between bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-xl p-4 border border-primary-200">
        <div class="flex items-center gap-3">
          <UIcon
            name="i-lucide-package"
            class="w-5 h-5 text-primary-600"
          />
          <p
            v-if="!pending"
            class="text-sm font-medium text-primary-800"
          >
            {{ filteredProducts.length }} produit{{ filteredProducts.length > 1 ? 's' : '' }}
            <span class="text-primary-600">trouvé{{ filteredProducts.length > 1 ? 's' : '' }}</span>
            {{ selectedCategory !== null || searchQuery ? ' correspondant à vos critères' : ' disponible' }}{{ filteredProducts.length > 1 ? 's' : '' }}
          </p>
          <USkeleton
            v-else
            class="h-5 w-48"
          />
        </div>
        <div
          v-if="selectedCategory !== null || searchQuery"
          class="flex gap-2"
        >
          <UButton
            variant="ghost"
            size="sm"
            icon="i-lucide-x"
            @click="selectedCategory = null; searchQuery = ''"
          >
            Effacer les filtres
          </UButton>
        </div>
      </div>
    </UContainer>

    <!-- Loading State -->
    <UContainer
      v-if="pending && activeMenu"
      class="pb-8"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="i in 6"
          :key="i"
          class="overflow-hidden"
        >
          <template #header>
            <USkeleton class="aspect-video w-full" />
          </template>
          <div class="p-4 space-y-3">
            <div class="flex justify-between items-start">
              <USkeleton class="h-6 w-32" />
              <USkeleton class="h-6 w-16" />
            </div>
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-3/4" />
            <div class="flex gap-2">
              <USkeleton class="h-5 w-16 rounded-full" />
              <USkeleton class="h-5 w-20 rounded-full" />
            </div>
            <USkeleton class="h-9 w-full rounded-md" />
          </div>
        </UCard>
      </div>
    </UContainer>

    <!-- Products Grid -->
    <UContainer
      v-else-if="filteredProducts.length > 0 && activeMenu"
      class="pb-12"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200"
        >
          <!-- Product Image -->

          <div class="relative aspect-[4/3] overflow-hidden">
            <NuxtImg
              v-if="product.images?.[0]"
              v-bind="getOptimizedProductImage(product.images[0], product.name)"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div
              v-else
              class="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-200"
            >
              <UIcon
                name="i-lucide-chef-hat"
                class="w-12 h-12 text-gray-400 mb-2"
              />
              <span class="text-sm text-gray-500 font-medium">Photo bientôt disponible</span>
            </div>

            <!-- Badge overlay -->
            <div
              v-if="getProductBadge(product)"
              class="absolute top-3 right-3"
            >
              <UBadge
                :color="getProductBadge(product)?.color || 'primary'"
                variant="solid"
                class="shadow-lg"
              >
                {{ getProductBadge(product)?.label }}
              </UBadge>
            </div>

            <!-- Price overlay -->
            <div class="absolute bottom-3 left-3">
              <div class="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
                <span class="text-lg font-bold text-gray-900">{{ product.price?.toFixed(2) }}€</span>
              </div>
            </div>
          </div>

          <!-- Product Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors truncate">
              {{ product.name }}
            </h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
              {{ product.description || 'Un délicieux plat préparé avec des ingrédients frais et de qualité.' }}
            </p>

            <!-- Features -->
            <div class="space-y-2 mb-6">
              <div
                v-for="(feature, index) in getProductFeatures(product).slice(0, 3)"
                :key="index"
                class="flex items-center text-sm text-gray-600"
              >
                <UIcon
                  name="i-lucide-check"
                  class="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                />
                <span class="truncate">{{ feature }}</span>
              </div>
            </div>

            <!-- Action Button -->
            <UButton
              :disabled="!product.available"
              color="primary"
              size="lg"
              class="w-full group-hover:scale-105 transition-transform"
              @click="addToCart(product)"
            >
              <UIcon
                name="i-lucide-shopping-cart"
                class="w-4 h-4 mr-2"
              />
              {{ product.available ? 'Ajouter au panier' : 'Non disponible' }}
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Empty State -->
    <UContainer
      v-else-if="activeMenu"
      class="py-16 text-center"
    >
      <UIcon
        name="i-lucide-search-x"
        class="w-16 h-16 text-gray-400 mx-auto mb-4"
      />
      <h3 class="text-xl font-semibold mb-2">
        Aucun produit trouvé
      </h3>
      <p class="text-gray-600">
        Essayez de modifier votre recherche.
      </p>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { Menu, ProductImage } from '~/types'

// Meta page
definePageMeta({
  title: 'Le Menu - Food en K',
  description: 'Découvrez notre sélection de burgers artisanaux'
})

// Composables
const {
  searchQuery,
  selectedCategory,
  getProductCountByCategory,
  getProductFeatures,
  getProductBadge,
  findActiveMenu,
  createMenuOptions,
  addToCart,
  fetchMenus,
  fetchCategories
} = useMenu()

const { getCardImageProps } = useOptimizedImage()

/**
 * Get optimized image props for product cards
 */
const getOptimizedProductImage = (image: ProductImage, _productName: string) => {
  return getCardImageProps(image, 'medium')
}

// State
const activeMenuId = ref<number | null>(null)

// Fetch menus with their products
const { data: menusData, pending: menusPending } = await useLazyAsyncData('menus', () =>
  fetchMenus().catch(() => [])
)

// Fetch categories separately
const { data: categoriesData, pending: categoriesPending } = await useLazyAsyncData('categories', () =>
  fetchCategories().catch(() => [])
)

// Computed menus avec typage correct
const menus = computed(() => {
  const rawMenus = menusData.value || []
  return Array.isArray(rawMenus) ? rawMenus as Menu[] : []
})

const activeMenu = computed(() => {
  if (activeMenuId.value) {
    return menus.value.find(m => m.id === activeMenuId.value) || null
  }
  return findActiveMenu(menus.value)
})

// Menu options for select
const menuOptions = computed(() => createMenuOptions(menus.value))

// Set initial active menu
watch(menus, (newMenus) => {
  if (newMenus.length > 0 && !activeMenuId.value) {
    const defaultMenu = findActiveMenu(newMenus)
    activeMenuId.value = defaultMenu?.id || null
  }
}, { immediate: true })

// Computed data avec typage correct
const products = computed(() => activeMenu.value?.products || [])
const categories = computed(() => {
  const rawCategories = categoriesData.value || []
  return Array.isArray(rawCategories) ? rawCategories : []
})
const pending = computed(() => menusPending.value || categoriesPending.value)

// Filtered products
const filteredProducts = computed(() => {
  let filtered = [...products.value]

  // Filter by category
  if (selectedCategory.value !== null) {
    filtered = filtered.filter(p => p.category?.id === selectedCategory.value)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query)
      || p.description?.toLowerCase().includes(query)
      || p.category?.name.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Methods
const clearSearch = () => {
  searchQuery.value = ''
}

const changeActiveMenu = (menuId: number) => {
  activeMenuId.value = menuId
  selectedCategory.value = null
  searchQuery.value = ''
}

// SEO avec notre composable
const { setPageSeo, setBreadcrumb, setMenuSchema } = useSeo()

// Configuration SEO pour la page des menus
setPageSeo('menus', {
  image: '/img/og-default.jpg'
})

// Breadcrumb
setBreadcrumb([
  { name: 'Accueil', url: '/' },
  { name: 'Nos Menus', url: '/menus' }
])

// Schema pour les menus (quand ils sont chargés)
watch(activeMenu, (menu) => {
  if (menu && menu.products && menu.products.length > 0) {
    const menuCategories = categories.value.map(category => ({
      name: category.name,
      description: category.description || '',
      items: menu.products!
        .filter(product => product.category?.id === category.id)
        .map(product => ({
          name: product.name,
          description: product.description || '',
          image: product.images && product.images.length > 0 ? `/img/${product.images[0]}` : undefined,
          price: product.price
        }))
    })).filter(category => category.items.length > 0)
    
    if (menuCategories.length > 0) {
      setMenuSchema(menuCategories)
    }
  }
}, { immediate: true })
</script>

<style scoped>
/* Utilisation uniquement de Tailwind et Nuxt UI - pas de styles personnalisés */
</style>
