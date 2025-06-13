import type { LocalPartner } from '~/types'

export const useLocalPartners = () => {
  const { find } = useStrapi()
  const toast = useToast()

  // Fetch local partners from Strapi
  const { data: partnersData, pending: partnersPending, error: partnersError } = useLazyAsyncData(
    'local-partners',
    () => find<LocalPartner>('local-partners', {
      populate: ['logo']
    }).catch((error) => {
      console.error('Error fetching local partners:', error)
      toast.add({
        title: 'Erreur',
        description: 'Impossible de charger les partenaires locaux',
        color: 'error'
      })
      throw error
    })
  )

  // Fallback data for development
  const defaultPartners = ref<LocalPartner[]>([
    {
      id: 1,
      documentId: 'boulangerie-1863',
      name: 'Boulangerie 1863',
      description: 'Nos pains burger sont confectionnés selon notre recette maison exclusive',
      address: 'Merdrignac, Côtes-d\'Armor',
      specialty: 'Pains artisanaux et viennoiseries',
      partnerSince: '2020',
      isExclusive: true,
      contactInfo: {
        phone: '02 96 28 XX XX',
        website: 'https://boulangerie1863.fr'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    },
    {
      id: 2,
      documentId: 'ferme-du-beau-pre',
      name: 'Ferme du Beau Pré',
      description: 'Élevage de vaches bretonnes pour une viande d\'exception',
      address: 'Plélan-le-Petit, Côtes-d\'Armor',
      specialty: 'Viande bovine française',
      partnerSince: '2019',
      isExclusive: false,
      contactInfo: {
        phone: '02 96 27 XX XX'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    },
    {
      id: 3,
      documentId: 'maraicher-bio-local',
      name: 'Maraîcher Bio Local',
      description: 'Légumes frais et de saison cultivés sans pesticides',
      address: 'Région de Merdrignac',
      specialty: 'Légumes biologiques',
      partnerSince: '2021',
      isExclusive: false,
      contactInfo: {
        email: 'contact@maraicherbio.fr'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    },
    {
      id: 4,
      documentId: 'fromagerie-bretonne',
      name: 'Fromagerie Bretonne',
      description: 'Fromages artisanaux au lait de vaches bretonnes',
      address: 'Loudéac, Côtes-d\'Armor',
      specialty: 'Fromages artisanaux',
      partnerSince: '2020',
      isExclusive: false,
      contactInfo: {
        phone: '02 96 XX XX XX',
        website: 'https://fromagerie-bretonne.fr'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    }
  ])

  // Computed values with fallbacks
  const localPartners = computed(() => {
    if (partnersData.value?.data) {
      return partnersData.value.data
    }
    return defaultPartners.value
  })

  const exclusivePartners = computed(() => {
    return localPartners.value.filter(partner => partner.isExclusive)
  })

  const regularPartners = computed(() => {
    return localPartners.value.filter(partner => !partner.isExclusive)
  })

  const isLoading = computed(() => partnersPending.value)
  const hasError = computed(() => partnersError.value)

  // Utility functions
  const getPartnerBySlug = (slug: string) => {
    return localPartners.value.find(partner =>
      partner.documentId === slug || partner.name.toLowerCase().includes(slug.toLowerCase())
    )
  }

  const getPartnersBySpecialty = (specialty: string) => {
    return localPartners.value.filter(partner =>
      partner.specialty.toLowerCase().includes(specialty.toLowerCase())
    )
  }

  const formatPartnerSince = (year: string) => {
    const currentYear = new Date().getFullYear()
    const partnerYear = parseInt(year)
    const years = currentYear - partnerYear

    if (years === 0) {
      return 'Nouveau partenaire'
    }
    if (years === 1) {
      return 'Partenaire depuis 1 an'
    }
    return `Partenaire depuis ${years} ans`
  }

  const getPartnerBadgeColor = (partner: LocalPartner) => {
    if (partner.isExclusive) {
      return 'warning'
    }
    const years = new Date().getFullYear() - parseInt(partner.partnerSince)
    if (years >= 3) {
      return 'success'
    }
    return 'primary'
  }

  const getPartnerIcon = (specialty: string) => {
    const iconMap: Record<string, string> = {
      pain: 'i-lucide-wheat',
      boulangerie: 'i-lucide-wheat',
      viande: 'i-lucide-beef',
      légume: 'i-lucide-carrot',
      fromage: 'i-lucide-milk',
      bio: 'i-lucide-leaf'
    }

    const lowerSpecialty = specialty.toLowerCase()
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerSpecialty.includes(key)) {
        return icon
      }
    }
    return 'i-lucide-store'
  }

  return {
    // Data
    localPartners: readonly(localPartners),
    exclusivePartners: readonly(exclusivePartners),
    regularPartners: readonly(regularPartners),

    // Loading states
    isLoading: readonly(isLoading),
    hasError: readonly(hasError),

    // Utility functions
    getPartnerBySlug,
    getPartnersBySpecialty,
    formatPartnerSince,
    getPartnerBadgeColor,
    getPartnerIcon
  }
}
