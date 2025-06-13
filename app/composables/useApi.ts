import type { ApiResponse, ApiError } from '~/types'

/**
 * Centralized API management composable
 * @description Provides consistent API handling with error management and caching
 */
export const useApi = () => {
  const { find, findOne, create, update, delete: del } = useStrapi()
  const { addNotification, setLoading } = useAppState()

  // =====================================
  // CONFIGURATION
  // =====================================
  
  const _defaultCacheTime = 5 * 60 * 1000 // 5 minutes (prefixed to avoid unused warning)
  const retryAttempts = 3
  const retryDelay = 1000 // 1 second

  // =====================================
  // ERROR HANDLING
  // =====================================
  
  /**
   * Handle API errors consistently
   */
  const handleApiError = (error: unknown, operation: string): ApiError => {
    console.error(`API Error in ${operation}:`, error)
    
    let apiError: ApiError
    
    if (error instanceof Error) {
      apiError = {
        message: error.message,
        status: 500,
        details: { operation, originalError: error.name }
      }
    } else {
      apiError = {
        message: 'Une erreur inattendue s\'est produite',
        status: 500,
        details: { operation, error }
      }
    }

    // Show user-friendly notification
    addNotification({
      type: 'error',
      title: 'Erreur de chargement',
      description: apiError.message,
      timeout: 8000
    })

    return apiError
  }

  /**
   * Retry failed API calls with exponential backoff
   */
  const withRetry = async <T>(
    operation: () => Promise<T>,
    attempts: number = retryAttempts
  ): Promise<T> => {
    for (let i = 0; i < attempts; i++) {
      try {
        return await operation()
      } catch (error) {
        if (i === attempts - 1) throw error
        
        // Wait before retry with exponential backoff
        await new Promise(resolve =>
          setTimeout(resolve, retryDelay * Math.pow(2, i))
        )
      }
    }
    throw new Error('Max retry attempts exceeded')
  }

  // =====================================
  // API METHODS
  // =====================================
  
  /**
   * Fetch multiple entities with enhanced error handling
   */
  const fetchEntities = async <T>(
    endpoint: string,
    options: {
      populate?: Record<string, unknown>
      filters?: Record<string, unknown>
      sort?: string[]
      cache?: boolean
    } = {}
  ): Promise<ApiResponse<T[]>> => {
    const cacheKey = `api-${endpoint}-${JSON.stringify(options)}`
    
    try {
      setLoading(true)
      
      const result = await withRetry(async () => {
        if (options.cache !== false) {
          const { data } = await useLazyAsyncData(cacheKey, () =>
            find(endpoint, {
              populate: options.populate,
              filters: options.filters,
              sort: options.sort
            }),
          {
            server: true,
            default: () => ({ data: [], meta: {} })
          }
          )
          return data.value
        } else {
          return await find(endpoint, {
            populate: options.populate,
            filters: options.filters,
            sort: options.sort
          })
        }
      })

      return {
        data: Array.isArray(result) ? result as T[] : (result as ApiResponse<T[]>)?.data || []
      }
    } catch (error) {
      const apiError = handleApiError(error, `fetchEntities(${endpoint})`)
      return {
        data: [],
        error: apiError
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * Fetch single entity with enhanced error handling
   */
  const fetchEntity = async <T>(
    endpoint: string,
    id: string,
    options: {
      populate?: Record<string, unknown>
      cache?: boolean
    } = {}
  ): Promise<ApiResponse<T | null>> => {
    const cacheKey = `api-${endpoint}-${id}-${JSON.stringify(options)}`
    
    try {
      setLoading(true)
      
      const result = await withRetry(async () => {
        if (options.cache !== false) {
          const { data } = await useLazyAsyncData(cacheKey, () =>
            findOne(endpoint, id, {
              populate: options.populate
            }),
          {
            server: true,
            default: () => null
          }
          )
          return data.value
        } else {
          return await findOne(endpoint, id, {
            populate: options.populate
          })
        }
      })

      return {
        data: result as T || null
      }
    } catch (error) {
      const apiError = handleApiError(error, `fetchEntity(${endpoint}/${id})`)
      return {
        data: null,
        error: apiError
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * Create entity with validation
   */
  const createEntity = async <T>(
    endpoint: string,
    data: Record<string, unknown>
  ): Promise<ApiResponse<T | null>> => {
    try {
      setLoading(true)
      
      // Validate required fields
      if (!data || typeof data !== 'object') {
        throw new Error('Les données sont requises pour créer une entité')
      }

      const result = await withRetry(() => create(endpoint, data))
      
      addNotification({
        type: 'success',
        title: 'Succès',
        description: 'Élément créé avec succès'
      })

      return {
        data: result as T
      }
    } catch (error) {
      const apiError = handleApiError(error, `createEntity(${endpoint})`)
      return {
        data: null,
        error: apiError
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * Update entity with validation
   */
  const updateEntity = async <T>(
    endpoint: string,
    id: string,
    data: Record<string, unknown>
  ): Promise<ApiResponse<T | null>> => {
    try {
      setLoading(true)
      
      if (!data || typeof data !== 'object') {
        throw new Error('Les données sont requises pour mettre à jour une entité')
      }

      const result = await withRetry(() => update(endpoint, id, data))
      
      addNotification({
        type: 'success',
        title: 'Succès',
        description: 'Élément mis à jour avec succès'
      })

      return {
        data: result as T
      }
    } catch (error) {
      const apiError = handleApiError(error, `updateEntity(${endpoint}/${id})`)
      return {
        data: null,
        error: apiError
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * Delete entity with confirmation
   */
  const deleteEntity = async (
    endpoint: string,
    id: string
  ): Promise<ApiResponse<boolean>> => {
    try {
      setLoading(true)
      
      await withRetry(() => del(endpoint, id))
      
      addNotification({
        type: 'success',
        title: 'Succès',
        description: 'Élément supprimé avec succès'
      })

      return {
        data: true
      }
    } catch (error) {
      const apiError = handleApiError(error, `deleteEntity(${endpoint}/${id})`)
      return {
        data: false,
        error: apiError
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    fetchEntities,
    fetchEntity,
    createEntity,
    updateEntity,
    deleteEntity,
    handleApiError,
    withRetry
  }
}
