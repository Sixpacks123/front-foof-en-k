import type { Product, Category, Menu, MenuFilters, ProductBadge } from '~/types'

/**
 * Consolidated Menu Management Composable
 * @description Unified composable for menu and product management
 */
export const useMenu = () => {
  // =====================================
  // DEPENDENCIES
  // =====================================
  
  const { find } = useStrapi()
  const toast = useToast()

  // =====================================
  // STATE
  // =====================================
  
  const searchQuery = ref('')
  const selectedCategory = ref<number | null>(null)
  const showFilters = ref(false)
  const maxPrice = ref(20)
  const filters = ref<MenuFilters>({
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
  // DATA FETCHING FUNCTIONS
  // =====================================
  
  /**
   * Fetch menus with products from Strapi
   */
  const fetchMenus = async (): Promise<Menu[]> => {
    try {
      const response = await find('menus', {
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
      })
      
      const rawMenus = response?.data || response || []
      return Array.isArray(rawMenus) ? rawMenus as Menu[] : []
    } catch {
      // Silently handle the error
      return []
    }
  }

  /**
   * Fetch categories from Strapi
   */
  const fetchCategories = async (): Promise<Category[]> => {
    try {
      const response = await find('categories', {
        filters: {
          publishedAt: { $notNull: true }
        }
      })
      
      const rawCategories = response?.data || response || []
      return Array.isArray(rawCategories) ? rawCategories as Category[] : []
    } catch {
      // Silently handle the error
      return []
    }
  }

  /**
   * Fetch products from Strapi
   */
  const fetchProducts = async (categorySlug?: string): Promise<Product[]> => {
    try {
      const filters: Record<string, unknown> = {
        publishedAt: { $notNull: true }
      }

      // Add category filter if provided
      if (categorySlug) {
        filters.category = {
          slug: categorySlug
        }
      }

      const response = await find('products', {
        filters,
        populate: {
          category: true,
          ingredients: true,
          images: true
        },
        sort: ['createdAt:desc']
      })
      
      const rawProducts = response?.data || response || []
      return Array.isArray(rawProducts) ? rawProducts as Product[] : []
    } catch {
      // Silently handle the error
      return []
    }
  }

  // =====================================
  // UTILITY FUNCTIONS
  // =====================================

  /**
   * Filter products based on search query and category
   */
  const filterProducts = (products: Product[], filters: {
    searchQuery: string
    selectedCategory: number | null
    maxPrice: number
  }): Product[] => {
    let filtered = [...products]

    // Filter by category
    if (filters.selectedCategory !== null) {
      filtered = filtered.filter(p => p.category?.id === filters.selectedCategory)
    }

    // Filter by search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim()
      filtered = filtered.filter((p) => {
        const matchName = p.name.toLowerCase().includes(query)
        const matchDescription = p.description?.toLowerCase().includes(query) || false
        const matchCategory = p.category?.name.toLowerCase().includes(query) || false
        const matchIngredients = p.ingredients?.some(ing =>
          ing.name.toLowerCase().includes(query)
        ) || false
        
        return matchName || matchDescription || matchCategory || matchIngredients
      })
    }

    // Filter by price
    if (filters.maxPrice < 20) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice)
    }

    return filtered
  }

  /**
   * Get product count for a specific category
   */
  const getProductCountByCategory = (products: Product[], categoryId: number): number => {
    return products.filter(p => p.category?.id === categoryId).length
  }

  /**
   * Get product features for display
   */
  const getProductFeatures = (product: Product): string[] => {
    const features: string[] = []

    if (product.category?.name) {
      features.push(`${product.category.name}`)
    }

    if (product.ingredients && product.ingredients.length > 0) {
      const allergens = product.ingredients.filter(i => i.isAllergen)
      if (allergens.length > 0) {
        features.push(`⚠️ Allergènes: ${allergens.map(a => a.name).join(', ')}`)
      }

      const mainIngredients = product.ingredients.filter(i => !i.isAllergen).slice(0, 10)
      if (mainIngredients.length > 0) {
        features.push(`${mainIngredients.map(i => i.name).join(', ')}`)
      }
    } else {
      features.push('✨ Recette artisanale')
      features.push('👨‍🍳 Préparé avec soin')
    }

    // Ensure at least 2-3 features for consistent appearance
    if (features.length < 2) {
      features.push('🥘 Plat signature')
    }

    return features
  }

  /**
   * Get product badge configuration
   */
  const getProductBadge = (product: Product): ProductBadge | null => {
    if (!product.available) {
      return { label: 'Indisponible', color: 'error' }
    }

    if (product.isVegan) {
      return { label: 'Vegan', color: 'success' }
    }

    if (product.isVegetarian) {
      return { label: 'Végétarien', color: 'success' }
    }

    return null
  }

  /**
   * Find active menu or return first available menu
   */
  const findActiveMenu = (menus: Menu[]): Menu | null => {
    if (menus.length === 0) return null
    return menus.find(m => m.isActive) || menus[0] || null
  }

  /**
   * Create menu options for select component
   */
  const createMenuOptions = (menus: Menu[]) => {
    return menus.map(menu => ({
      label: menu.name,
      value: menu.id
    }))
  }

  /**
   * Sanitize and validate search query
   */
  const sanitizeSearchQuery = (query: string): string => {
    return query.trim().substring(0, 100) // Limit to 100 characters
  }

  // =====================================
  // ACTIONS
  // =====================================

  const clearAllFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = null
    maxPrice.value = 20
    filters.value = {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      available: true,
      isNew: false,
      isPopular: false
    }
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

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!product.available) return

    addingToCart.value = product.id

    try {
      const { addToCart: addProductToCart } = useCart()
      await addProductToCart(product, quantity)
      showProductModal.value = false
    } catch {
      toast.add({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le produit au panier',
        color: 'error'
      })
    } finally {
      addingToCart.value = null
    }
  }

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

    // Data fetching functions
    fetchMenus,
    fetchCategories,
    fetchProducts,

    // Utility functions
    filterProducts,
    getProductCountByCategory,
    getProductFeatures,
    getProductBadge,
    findActiveMenu,
    createMenuOptions,
    sanitizeSearchQuery,

    // Actions
    clearAllFilters,
    openProductModal,
    addToCart
  }
}
