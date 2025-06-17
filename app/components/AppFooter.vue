<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// Define props interface for customization
interface Props {
  companyName?: string
  showSocialLinks?: boolean
  showNewsletter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  companyName: 'FoodEnk',
  showSocialLinks: true,
  showNewsletter: false
})

// Navigation links organized by sections
const navigationLinks: NavigationMenuItem[] = [
  {
    label: 'Accueil',
    to: '/'
  },
  {
    label: 'Menus',
    to: '/menus'
  },
  {
    label: 'Emplacements',
    to: '/emplacements'
  },
  {
    label: 'Événements',
    to: '/events'
  },
  {
    label: 'Contact',
    to: '/contact'
  }
]

// Legal & Info links
const legalLinks: NavigationMenuItem[] = [
  {
    label: 'Plan du Site',
    to: '/sitemap'
  }
]

// Social media links
const socialLinks = [
  {
    icon: 'i-simple-icons-facebook',
    to: 'https://facebook.com',
    label: 'Facebook'
  },
  {
    icon: 'i-simple-icons-instagram',
    to: 'https://instagram.com',
    label: 'Instagram'
  },
  {
    icon: 'i-simple-icons-twitter',
    to: 'https://twitter.com',
    label: 'Twitter'
  },
  {
    icon: 'i-simple-icons-linkedin',
    to: 'https://linkedin.com',
    label: 'LinkedIn'
  }
]

// Newsletter subscription
const newsletterEmail = ref('')
const isNewsletterLoading = ref(false)

const handleNewsletterSubmit = async () => {
  if (!newsletterEmail.value) return

  isNewsletterLoading.value = true
  try {
    // Here you would integrate with your newsletter service
    // For now, we'll just simulate the action
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Reset form
    newsletterEmail.value = ''

    // Show success notification
    const toast = useToast()
    toast.add({
      title: 'Inscription réussie !',
      description: 'Merci de vous être inscrit à notre newsletter.',
      color: 'success'
    })
  } catch {
    const toast = useToast()
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue. Veuillez réessayer.',
      color: 'error'
    })
  } finally {
    isNewsletterLoading.value = false
  }
}

// Scroll to top function
const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Current year for copyright
const currentYear = new Date().getFullYear()
</script>

<template>
  <UContainer>
    <UFooter>
      <!-- Top section with detailed content -->
      <template #top>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <img
                src="/img/logo.png"
                alt="Logo"
                class="h-8 w-auto"
              >
              <h3 class="text-lg font-semibold">
                {{ props.companyName }}
              </h3>
            </div>
            <p class="text-sm text-muted leading-relaxed">
              Découvrez notre cuisine de rue authentique avec des ingrédients frais et locaux.
              Suivez notre food truck pour une expérience gastronomique unique !
            </p>

            <!-- Contact Info -->
            <div class="space-y-2 text-sm text-muted">
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-phone"
                  class="w-4 h-4"
                />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-envelope"
                  class="w-4 h-4"
                />
                <span>contact@foodenk.fr</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-4 h-4"
                />
                <span>Paris, Île-de-France</span>
              </div>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold uppercase tracking-wider">
              Navigation
            </h3>
            <nav
              class="space-y-2"
              aria-label="Navigation links"
            >
              <NuxtLink
                v-for="link in navigationLinks"
                :key="`nav-${link.label}`"
                :to="link.to"
                class="block text-sm text-muted hover:text-primary transition-colors duration-200"
              >
                {{ link.label }}
              </NuxtLink>
            </nav>
          </div>

          <!-- Legal Links -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold uppercase tracking-wider">
              Informations
            </h3>
            <nav
              class="space-y-2"
              aria-label="Legal and information links"
            >
              <NuxtLink
                v-for="link in legalLinks"
                :key="`legal-${link.label}`"
                :to="link.to"
                class="block text-sm text-muted hover:text-primary transition-colors duration-200"
              >
                {{ link.label }}
              </NuxtLink>
            </nav>
          </div>

          <!-- Newsletter & Social -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold uppercase tracking-wider">
              Restez Connecté
            </h3>

            <!-- Newsletter Signup -->
            <div
              v-if="props.showNewsletter"
              class="space-y-3"
            >
              <p class="text-sm text-muted">
                Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et offres spéciales.
              </p>
              <form
                class="space-y-2"
                @submit.prevent="handleNewsletterSubmit"
              >
                <UInput
                  v-model="newsletterEmail"
                  type="email"
                  placeholder="Votre email"
                  required
                  :disabled="isNewsletterLoading"
                />
                <UButton
                  type="submit"
                  :loading="isNewsletterLoading"
                  :disabled="!newsletterEmail || isNewsletterLoading"
                  size="sm"
                  block
                >
                  S'inscrire
                </UButton>
              </form>
            </div>

            <!-- Social Links -->
            <div
              v-if="props.showSocialLinks"
              class="space-y-3"
            >
              <p class="text-sm text-muted">
                Suivez-nous :
              </p>
              <div class="flex gap-2">
                <UButton
                  v-for="social in socialLinks"
                  :key="social.label"
                  :icon="social.icon"
                  :to="social.to"
                  :aria-label="social.label"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  target="_blank"
                  class="hover:scale-110 transition-transform duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Bottom section with copyright and main navigation -->
      <template #left>
        <p class="text-sm text-muted">
          Copyright © {{ currentYear }} {{ props.companyName }}. Tous droits réservés.
        </p>
      </template>

      <!-- Center navigation for larger screens -->
      <UNavigationMenu
        :items="navigationLinks"
        variant="link"
        class="hidden lg:flex"
      />

      <!-- Right section with quick actions -->
      <template #right>
        <div class="flex items-center gap-2">
          <!-- GitHub Link (if applicable) -->
          <UButton
            icon="i-simple-icons-github"
            color="neutral"
            variant="ghost"
            to="https://github.com"
            target="_blank"
            aria-label="GitHub"
            size="sm"
          />

          <!-- Back to top button -->
          <UButton
            icon="i-heroicons-arrow-up"
            color="neutral"
            variant="ghost"
            aria-label="Retour en haut"
            size="sm"
            @click="scrollToTop"
          />
        </div>
      </template>
    </UFooter>
  </UContainer>
</template>
