/**
 * Global application state management
 * @description Centralized state management for the application
 */
export const useAppState = () => {
  // =====================================
  // STATE
  // =====================================
  
  const isLoading = ref(false)
  const globalError = ref<string | null>(null)
  const notifications = ref<Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    description?: string
    timeout?: number
  }>>([])

  // Cart state (for future ecommerce features)
  const cartItems = ref<Array<{
    productId: number
    quantity: number
    customizations?: Record<string, unknown>
  }>>([])

  // User preferences
  const userPreferences = ref({
    theme: 'auto' as 'light' | 'dark' | 'auto',
    language: 'fr',
    newsletter: false
  })

  // =====================================
  // COMPUTED
  // =====================================
  
  const cartTotal = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0)
  )

  const hasNotifications = computed(() => notifications.value.length > 0)

  // =====================================
  // METHODS
  // =====================================
  
  /**
   * Add notification to the global state
   */
  const addNotification = (notification: Omit<typeof notifications.value[0], 'id'>) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newNotification = { ...notification, id }
    
    notifications.value.push(newNotification)
    
    // Auto-remove after timeout (default 5s)
    const timeout = notification.timeout ?? 5000
    if (timeout > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, timeout)
    }
    
    return id
  }

  /**
   * Remove notification by ID
   */
  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  /**
   * Clear all notifications
   */
  const clearNotifications = () => {
    notifications.value = []
  }

  /**
   * Set global loading state
   */
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  /**
   * Set global error
   */
  const setError = (error: string | null) => {
    globalError.value = error
    if (error) {
      addNotification({
        type: 'error',
        title: 'Erreur',
        description: error
      })
    }
  }

  /**
   * Clear global error
   */
  const clearError = () => {
    globalError.value = null
  }

  // =====================================
  // PERSISTENCE
  // =====================================
  
  // Persist user preferences
  if (import.meta.client) {
    const storedPreferences = localStorage.getItem('food-en-k-preferences')
    if (storedPreferences) {
      try {
        userPreferences.value = { ...userPreferences.value, ...JSON.parse(storedPreferences) }
      } catch (error) {
        console.warn('Failed to parse stored preferences:', error)
      }
    }

    // Watch for changes and persist
    watch(userPreferences, (newPreferences) => {
      localStorage.setItem('food-en-k-preferences', JSON.stringify(newPreferences))
    }, { deep: true })
  }

  return {
    // State
    isLoading: readonly(isLoading),
    globalError: readonly(globalError),
    notifications: readonly(notifications),
    cartItems: readonly(cartItems),
    userPreferences,
    
    // Computed
    cartTotal,
    hasNotifications,
    
    // Methods
    addNotification,
    removeNotification,
    clearNotifications,
    setLoading,
    setError,
    clearError
  }
}

// Export singleton instance for global state
export const appState = useAppState()
