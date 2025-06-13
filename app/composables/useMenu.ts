import type { Product, Category, ProductFilters } from '~/types'

/**
 * Enhanced Menu Management Composable
 * @description Provides comprehensive menu and product management with improved maintainability
 */
export const useMenu = () => {
  // =====================================
  // DEPENDENCIES
  // =====================================
  
  const { fetchEntities } = useApi()
  const { addNotification } = useAppState()

  // =====================================
  // STATE
  // =====================================
  
  const searchQuery = ref('')
  const selectedCategory = ref<number | null>(null)
  const showFilters = ref(false)
  const maxPrice = ref(20)
  const filters = ref<ProductFilters>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    available: true,
    isNew: false,
    isPopular: false
  })
  const sortBy = ref('name-asc')
  const currentPage = ref(1)
  const itemsPerPage = 12
  
  // Modal state
  const showProductModal = ref(false)
  const selectedProduct = ref<Product | null>(null)
  const selectedImageIndex = ref(0)
  const addingToCart = ref<number | null>(null)
  const isSearching = ref(false)

  // =====================================
  // DATA FETCHING
  // =====================================
  
  // Fetch products with enhanced error handling
  const { data: productsResponse, pending: productsPending, refresh: refreshProducts }
    = useAsyncData('products', () =>
      fetchEntities<Product>('products', {
        populate: {
          category: { fields: ['id', 'name', 'slug'] },
          ingredients: { fields: ['id', 'name', 'isAllergen'] },
          images: { fields: ['id', 'url', 'alternativeText', 'width', 'height'] }
        },
        cache: true
      })
    )

  // Fetch categories with enhanced error handling
  const { data: categoriesResponse, pending: categoriesPending, refresh: refreshCategories }
    = useAsyncData('categories', () =>
      fetchEntities<Category>('categories', {
        populate: {
          image: { fields: ['id', 'url', 'alternativeText'] }
        },
        cache: true
      })
    )

  // =====================================
  // COMPUTED PROPERTIES
  // =====================================
  
  const products = computed(() => productsResponse.value?.data || [])
  const categories = computed(() => categoriesResponse.value?.data || [])
  const pending = computed(() => productsPending.value || categoriesPending.value)
  
  const hasError = computed(() =>
    Boolean(productsResponse.value?.error || categoriesResponse.value?.error)
  )

  // Enhanced computed properties
  const activeFiltersCount = computed(() => {
    let count = 0
    if (searchQuery.value.trim()) count++
    if (maxPrice.value < 20) count++
    if (selectedCategory.value !== null) count++
    
    // Count active filter flags
    Object.values(filters.value).forEach((value) => {
      if (value) count++
    })
    
    return count
  })

  const breadcrumbLinks = computed(() => {
    const links = [
      { label: 'Accueil', to: '/' },
      { label: 'Menu', to: '/menus' }
    ]

    if (selectedCategory.value && categories.value) {
      const category = categories.value.find(c => c.id === selectedCategory.value)
      if (category) {
        links.push({ label: category.name, to: `/menus?category=${category.id}` })
      }
    }

    return links
  })

  const filteredProducts = computed(() => {
    let filtered = [...products.value]

    // Filter by category
    if (selectedCategory.value !== null) {
      filtered = filtered.filter(product =>
        product.category?.id === selectedCategory.value
      )
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query)
        || product.description?.toLowerCase().includes(query)
        || product.ingredients?.some(ingredient =>
          ingredient.name.toLowerCase().includes(query)
        )
      )
    }

    // Filter by price
    if (maxPrice.value < 20) {
      filtered = filtered.filter(product => product.price <= maxPrice.value)
    }

    // Apply boolean filters
    if (filters.value.vegetarian) {
      filtered = filtered.filter(product => product.isVegetarian)
    }
    if (filters.value.vegan) {
      filtered = filtered.filter(product => product.isVegan)
    }
    if (filters.value.glutenFree) {
      filtered = filtered.filter(product => product.isGlutenFree)
    }
    if (filters.value.available) {
      filtered = filtered.filter(product => product.available !== false)
    }
    if (filters.value.isNew) {
      filtered = filtered.filter(product => product.isNew)
    }
    if (filters.value.isPopular) {
      filtered = filtered.filter(product => product.isPopular)
    }

    return filtered
  })

  const categoriesWithProducts = computed(() => {
    return categories.value.filter(category =>
      filteredProducts.value.some(product => product.category?.id === category.id)
    )
  })

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredProducts.value.slice(start, start + itemsPerPage)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage)
  })

  // =====================================
  // METHODS
  // =====================================
  
  const refresh = async () => {
    await Promise.all([refreshProducts(), refreshCategories()])
    addNotification({
      title: 'Actualisé',
      description: 'Les données ont été rechargées',
      type: 'success'
    })
  }

  const clearAllFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = null
    maxPrice.value = 20
    filters.value = { vegetarian: false, vegan: false, glutenFree: false, available: true, isNew: false, isPopular: false }
    sortBy.value = 'name-asc'
    currentPage.value = 1
    showFilters.value = false

    addNotification({
      title: 'Filtres effacés',
      description: 'Tous les filtres ont été réinitialisés',
      type: 'info'
    })
  }

  const openProductModal = (product: Product) => {
    selectedProduct.value = product
    selectedImageIndex.value = 0
    showProductModal.value = true
  }

  const addToCart = async (product: Product) => {
    if (!product.available) return

    addingToCart.value = product.id

    try {
      await new Promise(resolve => setTimeout(resolve, 800))

      addNotification({
        title: 'Ajouté au panier',
        description: `${product.name} a été ajouté à votre panier`,
        type: 'success'
      })

      showProductModal.value = false
    } catch {
      addNotification({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le produit au panier',
        type: 'error'
      })
    } finally {
      addingToCart.value = null
    }
  }

  // =====================================
  // WATCHERS
  // =====================================
  
  watch([searchQuery, selectedCategory, filters, maxPrice, sortBy], () => {
    currentPage.value = 1
  }, { deep: true })

  const debouncedSearch = useDebounceFn(() => {
    isSearching.value = false
  }, 300)

  watch(searchQuery, () => {
    isSearching.value = true
    debouncedSearch()
  })

  return {
    // State
    searchQuery,
    selectedCategory,
    showFilters,
    maxPrice,
    filters,
    sortBy,
    currentPage,
    showProductModal,
    selectedProduct,
    selectedImageIndex,
    addingToCart,
    isSearching,
    itemsPerPage,

    // Computed
    activeFiltersCount,
    breadcrumbLinks,
    filteredProducts,
    categoriesWithProducts,
    paginatedProducts,
    totalPages,

    // Data
    products,
    categories,
    pending,
    hasError,

    // Methods
    refresh,
    clearAllFilters,
    openProductModal,
    addToCart
  }
}
