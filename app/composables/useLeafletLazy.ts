export const useLeafletLazy = () => {
  const leafletModule = ref<typeof import('leaflet') | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const loadLeaflet = async () => {
    if (leafletModule.value) {
      return leafletModule.value
    }

    loading.value = true
    error.value = null

    try {
      // Dynamic import of Leaflet to reduce initial bundle size
      const leaflet = await import('leaflet')
      leafletModule.value = leaflet
      return leaflet
    } catch (err) {
      error.value = err as Error
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    leafletModule: readonly(leafletModule),
    loading: readonly(loading),
    error: readonly(error),
    loadLeaflet
  }
}
