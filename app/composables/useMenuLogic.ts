import type { Product } from '~/types'
import type { ComputedRef } from 'vue'

export const useMenuLogic = (products: ComputedRef<Product[]>, categories: ComputedRef<any[]>) => {
  // State
  const searchQuery = ref('')
  const selectedCategory = ref<number | null>(null)
  const showFilters = ref(false)
  const maxPrice = ref(20)
  const filters = ref({
    vegetarian: false,
    vegan: false,
    available: false
  })
  const sortBy = ref('name-asc')
  const currentPage = ref(1)
  const itemsPerPage = 12
  
  // Modal state
  const showProductModal = ref(false)
  const selectedProduct = ref<Product | null>(null)
  const selectedImageIndex = ref(0)
  const addingToCart = ref<number | null>(null)

  const toast = useToast()

  // Enhanced computed properties
  const activeFiltersCount = computed(() => {
    let count = 0
    if (searchQuery.value) count++
    if (maxPrice.value < 20) count++
    if (filters.value.vegetarian) count++
    if (filters.value.vegan) count++
    if (filters.value.available) count++
    if (selectedCategory.value !== null) count++
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

    // Filtre par catégorie
    if (selectedCategory.value !== null) {
      filtered = filtered.filter(p => p.category?.id === selectedCategory.value)
    }

    // Filtre par recherche
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category?.name.toLowerCase().includes(query) ||
        (p.ingredients && p.ingredients.some(ing => ing.name.toLowerCase().includes(query)))
      )
    }

    // Filtre par prix
    if (maxPrice.value < 20) {
      filtered = filtered.filter(p => p.price <= maxPrice.value)
    }

    // Filtres alimentaires
    if (filters.value.vegetarian) {
      filtered = filtered.filter(p => p.isVegetarian)
    }
    if (filters.value.vegan) {
      filtered = filtered.filter(p => p.isVegan)
    }
    if (filters.value.available) {
      filtered = filtered.filter(p => p.available)
    }

    // Tri
    const [field, order] = sortBy.value.split('-')
    if (field && order) {
      filtered.sort((a, b) => {
        let aVal = a[field as keyof Product]
        let bVal = b[field as keyof Product]

        if (aVal == null && bVal == null) return 0
        if (aVal == null) return 1
        if (bVal == null) return -1

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }

        if (order === 'asc') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
        }
      })
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

  // Methods
  const clearAllFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = null
    maxPrice.value = 20
    filters.value = { vegetarian: false, vegan: false, available: false }
    sortBy.value = 'name-asc'
    currentPage.value = 1
    showFilters.value = false

    toast.add({
      title: 'Filtres effacés',
      description: 'Tous les filtres ont été réinitialisés',
      color: 'info'
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

      toast.add({
        title: 'Ajouté au panier',
        description: `${product.name} a été ajouté à votre panier`,
        color: 'success',
        icon: 'i-lucide-shopping-cart'
      })

      showProductModal.value = false
    } catch (error) {
      toast.add({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le produit au panier',
        color: 'error'
      })
    } finally {
      addingToCart.value = null
    }
  }

  // Watchers
  watch([searchQuery, selectedCategory, filters, maxPrice, sortBy], () => {
    currentPage.value = 1
  }, { deep: true })

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
    itemsPerPage,

    // Computed
    activeFiltersCount,
    breadcrumbLinks,
    filteredProducts,
    categoriesWithProducts,
    paginatedProducts,
    totalPages,

    // Methods
    clearAllFilters,
    openProductModal,
    addToCart
  }
}
