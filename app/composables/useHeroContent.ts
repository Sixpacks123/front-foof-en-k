import type { HeroContent } from '~/types'

interface StrapiHeroContent {
  page: string
  title: string
  description: string
  badge?: {
    text: string
    icon: string
  }
  links?: Array<{
    label: string
    to: string
    icon?: string
    trailingIcon?: string
    variant?: string
    color?: string
    size?: string
  }>
}

export const useHeroContent = () => {
  const { find } = useStrapi()

  // Fetch hero content from Strapi
  const { data: heroData, pending: heroPending } = useLazyAsyncData(
    'hero-content',
    () => find<StrapiHeroContent>('hero-contents', {
      populate: ['links']
    })
  )

  // Default hero contents for each page
  const defaultHeroContents = ref<Record<string, HeroContent>>({
    home: {
      title: 'Food en K - Burgers artisanaux & Traiteur événementiel',
      description: 'Découvrez nos burgers faits maison et notre service traiteur pour tous vos événements. Commandez en ligne ou contactez-nous pour une expérience gourmande et conviviale !',
      links: [
        {
          label: 'Voir nos burgers',
          to: '/menus',
          trailingIcon: 'i-lucide-utensils',
          size: 'xl',
          color: 'primary'
        },
        {
          label: 'Nous contacter',
          to: '/contact',
          icon: 'i-lucide-phone',
          size: 'xl',
          variant: 'ghost'
        }
      ]
    },
    event: {
      title: 'Votre Food Truck pour tous vos événements',
      description: 'De 50 à 500 personnes, Food en K se déplace partout en Bretagne pour faire de votre événement un moment inoubliable ! Burgers artisanaux, service personnalisé et ambiance conviviale garantie.',
      badge: {
        text: 'Service traiteur mobile',
        icon: 'i-lucide-truck'
      },
      links: [
        {
          label: 'Demander un devis',
          to: '/contact',
          trailingIcon: 'i-lucide-calculator',
          size: 'xl',
          color: 'primary'
        },
        {
          label: 'Nous appeler',
          to: 'tel:0624316790',
          icon: 'i-lucide-phone',
          size: 'xl',
          variant: 'ghost'
        }
      ]
    },
    menu: {
      title: 'Notre carte - Burgers artisanaux',
      description: 'Découvrez nos créations gourmandes préparées avec des produits locaux et de saison. Chaque burger raconte une histoire, celle de notre terroir breton.',
      badge: {
        text: 'Produits locaux',
        icon: 'i-lucide-leaf'
      },
      links: [
        {
          label: 'Commander maintenant',
          to: 'tel:0624316790',
          trailingIcon: 'i-lucide-phone',
          size: 'xl',
          color: 'primary'
        },
        {
          label: 'Organiser un événement',
          to: '/event',
          icon: 'i-lucide-calendar',
          size: 'xl',
          variant: 'ghost'
        }
      ]
    },
    contact: {
      title: 'Contactez Food en K',
      description: 'Une question, une commande ou un projet d\'événement ? Nous sommes là pour vous accompagner et créer ensemble un moment gourmand inoubliable.',
      badge: {
        text: 'Réponse rapide',
        icon: 'i-lucide-clock'
      },
      links: [
        {
          label: 'Appeler maintenant',
          to: 'tel:0624316790',
          trailingIcon: 'i-lucide-phone',
          size: 'xl',
          color: 'primary'
        },
        {
          label: 'Voir nos menus',
          to: '/menus',
          icon: 'i-lucide-utensils',
          size: 'xl',
          variant: 'ghost'
        }
      ]
    }
  })

  // Get hero content for a specific page
  const getHeroContent = (page: string): HeroContent => {
    // First try to get from Strapi data
    if (heroData.value?.data) {
      const strapiContent = heroData.value.data.find((content: StrapiHeroContent) => content.page === page)
      if (strapiContent) {
        return {
          title: strapiContent.title,
          description: strapiContent.description,
          badge: strapiContent.badge,
          links: strapiContent.links || []
        }
      }
    }

    // Fallback to default content
    const defaultContent = defaultHeroContents.value[page] || defaultHeroContents.value.home
    return defaultContent!
  }

  // Get all available hero contents
  const getAllHeroContents = () => {
    if (heroData.value?.data) {
      const strapiContents: Record<string, HeroContent> = {}
      heroData.value.data.forEach((content: StrapiHeroContent) => {
        strapiContents[content.page] = {
          title: content.title,
          description: content.description,
          badge: content.badge,
          links: content.links || []
        }
      })
      return { ...defaultHeroContents.value, ...strapiContents }
    }

    return defaultHeroContents.value
  }

  const isLoading = computed(() => heroPending.value)

  return {
    // Functions
    getHeroContent,
    getAllHeroContents,

    // Loading state
    isLoading: readonly(isLoading)
  }
}
