<template>
  <div>
    <!-- Page Header -->
    <UContainer class="py-8">
      <div class="text-center">
        <h1 class="text-3xl sm:text-4xl font-bold mb-4">
          {{ activeMenu ? `Menu ${activeMenu.name}` : 'Le Menu' }}
        </h1>
        <p
          v-if="activeMenu?.description"
          class="text-lg max-w-2xl mx-auto"
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
        class="w-16 h-16  mx-auto mb-4"
      />
      <h3 class="text-xl font-semibold mb-2">
        Aucun menu actif
      </h3>
      <p>
        Aucun menu n'est actuellement disponible.
      </p>
    </UContainer>
    
    <UContainer>
      <MenuCategories
        v-if="activeMenu"
        :selected-category="selectedCategory"
        :categories="categories"
        :products="products"
        :pending="pending"
        class="mb-6"
        @update:selected-category="selectedCategory = $event"
      />
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
    <MenuProductsGrid
      v-if="filteredProducts.length > 0 && activeMenu"
      :products="filteredProducts"
      :get-product-badge="getProductBadge"
      @add-to-cart="addToCart"
    />

    <!-- Empty State -->
    <UContainer
      v-else-if="activeMenu"
      class="py-16 text-center"
    >
      <UIcon
        name="i-lucide-package-x"
        class="w-16 h-16 mx-auto mb-4"
      />
      <h3 class="text-xl font-semibold mb-2">
        Aucun produit dans cette catégorie
      </h3>
      <p class="text-gray-600">
        Sélectionnez une autre catégorie pour voir les produits disponibles.
      </p>
    </UContainer>

    <!-- Floating Cart Button -->
    <CartFloatingButton />
  </div>
</template>

<script setup lang="ts">
import type { Menu } from '~/types'

// Meta page
definePageMeta({
  title: 'Le Menu - Food en K',
  description: 'Découvrez notre sélection de burgers artisanaux'
})

// Composables
const {
  selectedCategory,
  getProductBadge,
  findActiveMenu,
  createMenuOptions,
  addToCart,
  fetchMenus,
  fetchCategories
} = useMenu()

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

  return filtered
})

// Methods
const changeActiveMenu = (menuId: number) => {
  activeMenuId.value = menuId
  selectedCategory.value = null
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

