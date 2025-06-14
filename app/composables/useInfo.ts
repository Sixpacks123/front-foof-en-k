import type { Info } from '~/types'

/**
 * Composable for fetching and managing info banner data from Strapi
 * @description Handles Collection Type content from Strapi with reactive state management
 * @returns Reactive info data, banner configuration, and loading states
 */
export const useInfo = () => {
  const { find } = useStrapi()

  const { data: response, pending, error, refresh } = useLazyAsyncData('infos', () =>
    find<Info>('infos')
  )

  // Pour une Collection, les données sont dans response.data (array)
  // On garde toutes les infos actives
  const infos = computed(() => {
    const data = response.value?.data
    return Array.isArray(data) ? data.filter(info => info.isActive) : []
  })

  // La première info pour le banner principal
  const primaryInfo = computed(() => infos.value[0] || null)

  const showBanner = computed(() => infos.value.length > 0)

  const bannerColor = computed(() => {
    switch (primaryInfo.value?.type) {
      case 'error': return 'error'
      case 'warning': return 'warning'
      case 'success': return 'success'
      case 'info':
      default: return 'info'
    }
  })

  const bannerIcon = computed(() => {
    switch (primaryInfo.value?.type) {
      case 'error': return 'i-lucide-x-circle'
      case 'warning': return 'i-lucide-alert-triangle'
      case 'success': return 'i-lucide-check-circle'
      case 'info':
      default: return 'i-lucide-info'
    }
  })

  return {
    infos: readonly(infos),
    primaryInfo: readonly(primaryInfo),
    showBanner,
    bannerColor,
    bannerIcon,
    pending: readonly(pending),
    error: readonly(error),
    refresh
  }
}
