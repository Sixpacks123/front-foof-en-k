import type { Product } from '~/types'

/**
 * Composable for fetching and managing the "Burger du Moment" (Featured Burger)
 * @description Fetches products from the "bg-moment" category and manages the featured burger display
 */
export const useBurgerDuMoment = () => {
  // =====================================
  // DEPENDENCIES
  // =====================================
  
  const { find } = useStrapi()

  // =====================================
  // DATA FETCHING
  // =====================================
  
  /**
   * Fetch the featured burger from Strapi
   * @description Fetches products from the "bg-moment" category
   */
  const fetchBurgerDuMoment = async (): Promise<Product | null> => {
    try {
      const response = await find('products', {
        filters: {
          publishedAt: { $notNull: true },
          available: true,
          category: {
            slug: 'bg-moment'
          }
        },
        populate: {
          category: true,
          ingredients: true,
          images: true
        },
        sort: ['createdAt:desc'],
        pagination: {
          start: 0,
          limit: 1
        }
      })
      
      const products = response?.data || response || []
      return Array.isArray(products) && products.length > 0 ? products[0] as Product : null
    } catch {
      // Silently handle errors - no burger du moment available
      return null
    }
  }

  // =====================================
  // UTILITY FUNCTIONS
  // =====================================

  /**
   * Get ingredients list for display
   */
  const getIngredientsList = (product: Product): string[] => {
    if (!product.ingredients || product.ingredients.length === 0) {
      return [
        'Buns artisanal',
        'Salade fraîche',
        'Oignons frits',
        'Cheddar premium',
        'Steak VBF',
        'Sauce secrète'
      ]
    }

    return product.ingredients
      .filter(ingredient => !ingredient.isAllergen)
      .map(ingredient => ingredient.name)
      .slice(0, 6) // Limit to 6 ingredients for display
  }

  /**
   * Get product image URL or fallback
   */
  const getProductImage = (product: Product): string | null => {
    if (product.images && product.images.length > 0 && product.images[0]?.url) {
      return product.images[0].url
    }
    return null
  }

  /**
   * Format price for display
   */
  const formatPrice = (price: number): string => {
    return `${price.toFixed(2).replace('.', ',')}€`
  }

  /**
   * Get product badges for display
   */
  const getProductBadges = (product: Product) => {
    const badges = []

    // Always show signature badge for burger du moment
    badges.push({
      label: 'Signature du Chef',
      color: 'warning',
      icon: 'i-lucide-flame'
    })

    // Add vegetarian/vegan badges if applicable
    if (product.isVegan) {
      badges.push({
        label: 'Vegan',
        color: 'green',
        icon: 'i-lucide-leaf'
      })
    } else if (product.isVegetarian) {
      badges.push({
        label: 'Végétarien',
        color: 'green',
        icon: 'i-lucide-leaf'
      })
    }

    return badges
  }

  return {
    // Data fetching
    fetchBurgerDuMoment,
    
    // Utility functions
    getIngredientsList,
    getProductImage,
    formatPrice,
    getProductBadges
  }
}
