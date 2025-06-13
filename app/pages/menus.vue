<template>
  <div class="bg-gray-50">
    <!-- Hero Section avec accessibilité améliorée -->
    <section
      role="banner"
      aria-labelledby="hero-title"
      class="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-black/10" />
      <UContainer class="relative py-16 sm:py-20 lg:py-24">
        <div class="text-center max-w-4xl mx-auto">
          <h1
            id="hero-title"
            class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6"
          >
            {{ activeMenu ? `Menu ${activeMenu.name}` : 'Le Menu' }}
          </h1>
          <p class="text-lg sm:text-xl lg:text-2xl text-primary-100 mb-6 sm:mb-8 leading-relaxed">
            {{ activeMenu?.description || 'Découvrez notre sélection de produits délicieux, préparés avec des ingrédients frais et de qualité' }}
          </p>

          <!-- Navigation rapide vers recherche -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <UButton
              v-if="activeMenu"
              size="xl"
              variant="outline"
              color="neutral"
              class="font-semibold border-white text-white hover:bg-white hover:text-primary-600"
              @click="scrollToSearch"
            >
              <UIcon
                name="i-lucide-search"
                class="w-5 h-5 mr-2"
              />
              Rechercher un plat
            </UButton>
            <UButton
              v-if="activeMenu && categories.length > 0"
              size="xl"
              variant="solid"
              color="neutral"
              class="font-semibold bg-white text-primary-600 hover:bg-gray-100"
              @click="scrollToCategories"
            >
              <UIcon
                name="i-lucide-filter"
                class="w-5 h-5 mr-2"
              />
              Voir les catégories
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Breadcrumbs -->
    <UContainer class="py-4">
      <UBreadcrumb
        :links="[
          { label: 'Accueil', to: '/', icon: 'i-heroicons-home' },
          { label: 'Menu', to: '/menus' },
          ...(activeMenu ? [{ label: activeMenu.name }] : [])
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
          @update:model-value="changeActiveMenu"
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

    <!-- Categories Section avec accessibilité améliorée -->
    <UContainer
      v-else
      class="py-8"
    >
      <section
        id="category-filters"
        role="group"
        aria-labelledby="categories-title"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div class="flex items-center gap-3 mb-6">
          <UIcon
            name="i-lucide-filter"
            class="w-5 h-5 text-primary-500"
            aria-hidden="true"
          />
          <h2
            id="categories-title"
            class="text-lg font-semibold text-gray-800"
          >
            Catégories
          </h2>
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
          role="group"
          aria-label="Filtres par catégorie"
        >
          <UButton
            :color="selectedCategory === null ? 'primary' : 'neutral'"
            :variant="selectedCategory === null ? 'solid' : 'outline'"
            size="lg"
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
            size="lg"
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
            {{ (category as any).name }} ({{ getProductCountByCategory((category as any).id) }})
          </UButton>
        </div>
      </section>
    </UContainer>

    <!-- Search and Filters avec accessibilité améliorée -->
    <UContainer
      v-if="activeMenu"
      class="pb-6"
    >
      <section
        id="search-section"
        role="search"
        aria-labelledby="search-title"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-lucide-search"
            class="w-5 h-5 text-primary-500"
            aria-hidden="true"
          />
          <h2
            id="search-title"
            class="text-lg font-semibold text-gray-800"
          >
            Rechercher
          </h2>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="relative flex-1">
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

        <!-- Suggestions de recherche -->
        <div
          v-if="!searchQuery && !pending && products.length > 0"
          class="mt-4"
        >
          <p class="text-sm text-gray-600 mb-2">
            Suggestions :
          </p>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="suggestion in getSearchSuggestions()"
              :key="suggestion"
              variant="ghost"
              size="sm"
              class="text-primary-600 hover:bg-primary-50"
              @click="searchQuery = suggestion"
            >
              {{ suggestion }}
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
            <img
              v-if="product.images?.[0]?.url"
              :src="product.images[0].url"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            >
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
// Meta page
definePageMeta({
  title: 'Le Menu - Food en K',
  description: 'Découvrez notre sélection de burgers artisanaux'
})

// State
const searchQuery = ref('')
const selectedCategory = ref<number | null>(null)
const activeMenuId = ref<number | null>(null)

// Composables
const { find } = useStrapi()
const toast = useToast()
const { formatPrice, formatDate } = useFormatting()

// Fetch menus with their products
const { data: menusData, pending: menusPending } = await useLazyAsyncData('menus', () =>
  find('menus', {
    filters: {
      publishedAt: { $notNull: true }
    },
    populate: {
      products: {
        populate: {
          category: true,
          ingredients: true,
          images: true
        }
      }
    },
    sort: ['isActive:desc', 'createdAt:desc']
  }).catch(() => {
    return { data: [] }
  })
)

// Fetch categories separately
const { data: categoriesData, pending: categoriesPending } = await useLazyAsyncData('categories', () =>
  find('categories', {
    filters: {
      publishedAt: { $notNull: true }
    }
  }).catch(() => {
    return { data: [] }
  })
)

// Computed menus avec typage correct
const menus = computed(() => {
  const rawMenus = menusData.value?.data || menusData.value || []
  return Array.isArray(rawMenus) ? rawMenus : []
})

const activeMenu = computed(() => {
  if (activeMenuId.value) {
    return menus.value.find((m: any) => m.id === activeMenuId.value) || null
  }
  return menus.value.find((m: any) => m.isActive) || menus.value[0] || null
})

// Menu options for select
const menuOptions = computed(() =>
  menus.value.map((menu: any) => ({
    label: menu.name,
    value: menu.id
  }))
)

// Set initial active menu
watch(menus, (newMenus) => {
  if (newMenus.length > 0 && !activeMenuId.value) {
    const defaultMenu = newMenus.find((m: any) => m.isActive) || newMenus[0]
    activeMenuId.value = defaultMenu?.id || null
  }
}, { immediate: true })

// Computed data avec typage correct
const products = computed(() => activeMenu.value?.products || [])
const categories = computed(() => {
  const rawCategories = categoriesData.value?.data || categoriesData.value || []
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
const scrollToSearch = () => {
  const searchElement = document.getElementById('search-input')
  if (searchElement) {
    searchElement.focus()
    searchElement.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToCategories = () => {
  const categoriesElement = document.getElementById('category-filters')
  if (categoriesElement) {
    categoriesElement.scrollIntoView({ behavior: 'smooth' })
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const getSearchSuggestions = () => {
  const suggestions = new Set<string>()

  // Ajouter les noms de catégories
  categories.value.forEach((cat: any) => {
    if (cat.name) suggestions.add(cat.name)
  })

  // Ajouter quelques mots-clés populaires basés sur les produits
  const keywords = ['burger', 'frites', 'boisson', 'dessert', 'végétarien', 'épicé']
  keywords.forEach(keyword => suggestions.add(keyword))

  return Array.from(suggestions).slice(0, 6)
}

const changeActiveMenu = (menuId: number) => {
  activeMenuId.value = menuId
  selectedCategory.value = null
  searchQuery.value = ''
}

const getProductCountByCategory = (categoryId: number) => {
  return products.value.filter((p: any) => p.category?.id === categoryId).length
}

const getProductFeatures = (product: any) => {
  const features = []

  if (product.category?.name) {
    features.push(`📂 ${product.category.name}`)
  }

  if (product.ingredients && product.ingredients.length > 0) {
    const allergens = product.ingredients.filter((i: any) => i.isAllergen)
    if (allergens.length > 0) {
      features.push(`⚠️ Allergènes: ${allergens.map((a: any) => a.name).join(', ')}`)
    }

    const mainIngredients = product.ingredients.filter((i: any) => !i.isAllergen).slice(0, 3)
    if (mainIngredients.length > 0) {
      features.push(`🍃 ${mainIngredients.map((i: any) => i.name).join(', ')}`)
    }
  } else {
    // Cas où il n'y a pas d'ingrédients - on ajoute un message informatif
    features.push('✨ Recette artisanale')
    features.push('👨‍🍳 Préparé avec soin')
  }

  // Toujours avoir au moins 2-3 features pour un aspect cohérent
  if (features.length < 2) {
    features.push('🥘 Plat signature')
  }

  return features
}

const getProductBadge = (product: any) => {
  if (!product.available) {
    return { label: 'Indisponible', color: 'error' as const }
  }

  if (product.isVegan) {
    return { label: 'Vegan', color: 'success' as const }
  }

  if (product.isVegetarian) {
    return { label: 'Végétarien', color: 'success' as const }
  }

  return null
}

const addToCart = (product: any) => {
  if (!product.available) return

  toast.add({
    title: 'Ajouté au panier',
    description: `${product.name} a été ajouté à votre panier`,
    color: 'success',
    icon: 'i-lucide-shopping-cart'
  })
}

// SEO
useSeoMeta({
  title: () => activeMenu.value ? `Menu ${activeMenu.value.name} - Food en K` : 'Le Menu - Food en K',
  description: () => activeMenu.value?.description || 'Découvrez notre sélection de burgers artisanaux.',
  ogTitle: () => activeMenu.value ? `Menu ${activeMenu.value.name} - Food en K` : 'Menu Food en K',
  ogDescription: () => activeMenu.value?.description || 'Burgers artisanaux avec ingrédients frais et locaux.'
})
</script>

<style scoped>
/* Utilisation uniquement de Tailwind et Nuxt UI - pas de styles personnalisés */
</style>
