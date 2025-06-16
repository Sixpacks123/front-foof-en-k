import type { NavigationMenuItem } from '@nuxt/ui'

export interface FooterContent {
  companyName: string
  description: string
  contactInfo: {
    phone: string
    email: string
    address: string
  }
  socialLinks: Array<{
    platform: string
    url: string
    icon: string
  }>
  legalLinks: NavigationMenuItem[]
  navigationLinks: NavigationMenuItem[]
}

export interface FooterSettings {
  showNewsletter: boolean
  showSocialLinks: boolean
  newsletterDescription: string
}

/**
 * Composable to fetch footer content from Strapi
 */
export const useFooterContent = () => {
  const { data: footerContent, pending, error, refresh } = useAsyncData<FooterContent>(
    'footer-content',
    async () => {
      try {
        const response = await $fetch<{ data: FooterContent }>('/api/footer-content')
        return response.data
      } catch {
        // Silently handle the error and return fallback content
        return {
          companyName: 'Inspiria',
          description: 'Découvrez notre cuisine de rue authentique avec des ingrédients frais et locaux. Suivez notre food truck pour une expérience gastronomique unique !',
          contactInfo: {
            phone: '+33 1 23 45 67 89',
            email: 'contact@inspiria-foodtruck.fr',
            address: 'Paris, Île-de-France'
          },
          socialLinks: [
            {
              platform: 'Facebook',
              url: 'https://facebook.com',
              icon: 'i-simple-icons-facebook'
            },
            {
              platform: 'Instagram',
              url: 'https://instagram.com',
              icon: 'i-simple-icons-instagram'
            },
            {
              platform: 'Twitter',
              url: 'https://twitter.com',
              icon: 'i-simple-icons-twitter'
            },
            {
              platform: 'LinkedIn',
              url: 'https://linkedin.com',
              icon: 'i-simple-icons-linkedin'
            }
          ],
          legalLinks: [
            { label: 'Mentions Légales', to: '/mentions-legales' },
            { label: 'Politique de Confidentialité', to: '/politique-confidentialite' },
            { label: 'CGV', to: '/cgv' },
            { label: 'Plan du Site', to: '/sitemap' }
          ],
          navigationLinks: [
            { label: 'Accueil', to: '/' },
            { label: 'Menus', to: '/menus' },
            { label: 'Emplacements', to: '/emplacements' },
            { label: 'Événements', to: '/events' },
            { label: 'Contact', to: '/contact' }
          ]
        }
      }
    },
    {
      // Cache for 1 hour
      server: true,
      default: () => ({
        companyName: 'Inspiria',
        description: 'Découvrez notre cuisine de rue authentique avec des ingrédients frais et locaux.',
        contactInfo: {
          phone: '+33 1 23 45 67 89',
          email: 'contact@inspiria-foodtruck.fr',
          address: 'Paris, Île-de-France'
        },
        socialLinks: [],
        legalLinks: [],
        navigationLinks: []
      })
    }
  )

  return {
    footerContent: readonly(footerContent),
    pending: readonly(pending),
    error: readonly(error),
    refresh
  }
}

/**
 * Composable to fetch footer settings from Strapi
 */
export const useFooterSettings = () => {
  const { data: footerSettings, pending, error, refresh } = useAsyncData<FooterSettings>(
    'footer-settings',
    async () => {
      try {
        const response = await $fetch<{ data: FooterSettings }>('/api/footer-settings')
        return response.data
      } catch {
        // Silently handle the error and return fallback settings
        return {
          showNewsletter: true,
          showSocialLinks: true,
          newsletterDescription: 'Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et offres spéciales.'
        }
      }
    },
    {
      server: true,
      default: () => ({
        showNewsletter: true,
        showSocialLinks: true,
        newsletterDescription: 'Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et offres spéciales.'
      })
    }
  )

  return {
    footerSettings: readonly(footerSettings),
    pending: readonly(pending),
    error: readonly(error),
    refresh
  }
}

/**
 * Composable to handle newsletter subscription
 */
export const useNewsletterSubscription = () => {
  const isLoading = ref(false)

  const subscribe = async (email: string) => {
    if (!email) throw new Error('Email is required')

    isLoading.value = true
    try {
      await $fetch('/api/newsletter/subscribe', {
        method: 'POST',
        body: { email }
      })

      const toast = useToast()
      toast.add({
        title: 'Inscription réussie !',
        description: 'Merci de vous être inscrit à notre newsletter.',
        color: 'success'
      })

      return true
    } catch {
      const toast = useToast()
      toast.add({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        color: 'error'
      })
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    subscribe,
    isLoading: readonly(isLoading)
  }
}
