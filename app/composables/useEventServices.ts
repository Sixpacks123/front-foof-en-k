import type { EventService, Coverage } from '~/types'

export const useEventServices = () => {
  const { find } = useStrapi()

  // Fetch event services from Strapi
  const { data: servicesData, pending: servicesPending } = useLazyAsyncData(
    'event-services',
    async () => {
      try {
        return await find<EventService>('event-services')
      } catch {
        // Silently handle the error - use fallback data
        return []
      }
    }
  )

  // Fetch coverage areas from Strapi
  const { data: coverageData, pending: coveragePending } = useLazyAsyncData(
    'coverage-areas',
    async () => {
      try {
        return await find<Coverage>('coverage-areas')
      } catch {
        // Silently handle the error - use fallback data
        return []
      }
    }
  )

  // Fallback data for development
  const defaultServices = ref<EventService[]>([
    {
      id: 1,
      documentId: 'professional-events',
      title: 'Événements Professionnels',
      description: 'Impressionnez vos collaborateurs et clients',
      icon: 'i-lucide-briefcase',
      features: [
        'Team Building & Séminaires',
        'Inaugurations & Portes Ouvertes',
        'Événements d\'entreprise',
        'Pause déjeuner sur site'
      ],
      minGuests: 20,
      maxGuests: 500,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    },
    {
      id: 2,
      documentId: 'private-events',
      title: 'Événements Privés',
      description: 'Célébrez vos moments précieux',
      icon: 'i-lucide-heart',
      features: [
        'Mariages & Réceptions',
        'Anniversaires & Fêtes familiales',
        'Communions & Baptêmes',
        'Fêtes entre amis'
      ],
      minGuests: 10,
      maxGuests: 200,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    },
    {
      id: 3,
      documentId: 'association-events',
      title: 'Événements Associatifs',
      description: 'Rassemblez votre communauté',
      icon: 'i-lucide-users',
      features: [
        'Festivals & Marchés',
        'Tournois & Compétitions',
        'Assemblées générales',
        'Événements caritatifs'
      ],
      minGuests: 50,
      maxGuests: 1000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    }
  ])

  const defaultCoverage = ref<Coverage[]>([
    {
      id: 1,
      documentId: 'ille-et-vilaine',
      department: 'Ille-et-Vilaine',
      description: 'Tout le département couvert, de Rennes à Saint-Malo en passant par Vitré et Fougères.',
      color: 'primary-500',
      cities: ['Rennes', 'Saint-Malo', 'Vitré', 'Fougères'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    },
    {
      id: 2,
      documentId: 'cotes-d-armor',
      department: 'Côtes-d\'Armor',
      description: 'De Dinan à Lannion, en passant par Saint-Brieuc et nos environs de Merdrignac.',
      color: 'blue-500',
      cities: ['Dinan', 'Lannion', 'Saint-Brieuc', 'Merdrignac'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    },
    {
      id: 3,
      documentId: 'morbihan',
      department: 'Morbihan',
      description: 'Vannes, Lorient, Pontivy et toutes les communes environnantes.',
      color: 'green-500',
      cities: ['Vannes', 'Lorient', 'Pontivy'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    }
  ])

  // Computed values with fallbacks
  const eventServices = computed(() => {
    if (Array.isArray(servicesData.value)) {
      return servicesData.value
    }
    if (servicesData.value && 'data' in servicesData.value) {
      return servicesData.value.data
    }
    return defaultServices.value
  })

  const coverageAreas = computed(() => {
    if (Array.isArray(coverageData.value)) {
      return coverageData.value
    }
    if (coverageData.value && 'data' in coverageData.value) {
      return coverageData.value.data
    }
    return defaultCoverage.value
  })

  const isLoading = computed(() => servicesPending.value || coveragePending.value)
  const hasError = computed(() => false) // Always false since we handle errors silently

  // Utility functions
  const getServiceBySlug = (slug: string) => {
    return eventServices.value.find(service =>
      service.documentId === slug || service.title.toLowerCase().includes(slug.toLowerCase())
    )
  }

  const getCoverageByDepartment = (department: string) => {
    return coverageAreas.value.find(area =>
      area.department.toLowerCase() === department.toLowerCase()
    )
  }

  const getServiceIcon = (service: EventService) => {
    const iconMap: Record<string, string> = {
      professionnel: 'i-lucide-briefcase',
      privé: 'i-lucide-heart',
      associatif: 'i-lucide-users'
    }

    return service.icon || iconMap[service.documentId] || 'i-lucide-calendar'
  }

  const formatGuestRange = (service: EventService) => {
    if (service.minGuests && service.maxGuests) {
      return `${service.minGuests} - ${service.maxGuests} personnes`
    }
    if (service.minGuests) {
      return `À partir de ${service.minGuests} personnes`
    }
    if (service.maxGuests) {
      return `Jusqu'à ${service.maxGuests} personnes`
    }
    return 'Selon vos besoins'
  }

  return {
    // Data
    eventServices: readonly(eventServices),
    coverageAreas: readonly(coverageAreas),
    
    // Loading states
    isLoading: readonly(isLoading),
    hasError: readonly(hasError),
    
    // Utility functions
    getServiceBySlug,
    getCoverageByDepartment,
    getServiceIcon,
    formatGuestRange
  }
}
