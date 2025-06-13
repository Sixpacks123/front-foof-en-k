/**
 * Global error handling plugin
 * @description Provides centralized error management for the application
 */
export default defineNuxtPlugin(() => {
  const { addNotification } = useAppState()

  // Handle unhandled promise rejections
  if (import.meta.client) {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason)
      
      addNotification({
        type: 'error',
        title: 'Erreur système',
        description: 'Une erreur inattendue s\'est produite. Veuillez rafraîchir la page.',
        timeout: 10000
      })
    })

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      console.error('JavaScript error:', event.error)
      
      addNotification({
        type: 'error',
        title: 'Erreur JavaScript',
        description: 'Une erreur s\'est produite dans l\'application.',
        timeout: 8000
      })
    })
  }

  // Provide global error handler
  return {
    provide: {
      handleError: (error: unknown, context?: string) => {
        console.error(`Error${context ? ` in ${context}` : ''}:`, error)
        
        let message = 'Une erreur inattendue s\'est produite'
        
        if (error instanceof Error) {
          message = error.message
        } else if (typeof error === 'string') {
          message = error
        }

        addNotification({
          type: 'error',
          title: context ? `Erreur - ${context}` : 'Erreur',
          description: message,
          timeout: 8000
        })
      }
    }
  }
})
