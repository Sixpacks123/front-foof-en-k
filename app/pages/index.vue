<template>
  <div>
    <UPageHero
      title="Les vrais burgers bretons qui régalent la Bretagne !"
      description="Pain 1863, viande VBF locale, sauces maison... Nos burgers artisanaux sillonnent les routes bretonnes depuis notre food truck. Goûtez la différence !"
      orientation="horizontal"
      :ui="{ container: 'md:pt-18 lg:pt-20' }"
      :links="[
        {
          label: 'Je veux goûter !',
          to: '/menus',
          trailingIcon: 'i-lucide-heart',
          size: 'xl',
          color: 'primary'
        },
        {
          label: 'Où vous êtes ?',
          to: '/contact',
          icon: 'i-lucide-map-pin',
          size: 'xl',
          variant: 'ghost'
        }
      ]"
    >
      <template #title>
        <span class="text-center">
          Food en K - Burgers & Traiteur
        </span>
      </template>
      <NuxtImg
        src="/img/Truck.png"
        alt="Food en K - Food truck burgers artisanaux"
        class="rounded-lg shadow-2xl ring ring-default"
        width="800"
        height="600"
        priority
        loading="eager"
        format="webp"
        quality="85"
        sizes="(max-width: 768px) 100vw, 800px"
      />
    </UPageHero>

    <!-- Stats Marquee Enhanced -->
    <PageMarquee />

    <!-- Features Section Enhanced -->
    <UPageSection
      title="Nos valeurs & engagements"
      description="Chez Food en K, nous privilégions la qualité, la fraîcheur et la convivialité. Nos produits sont sélectionnés avec soin et nos recettes évoluent au fil des saisons pour vous offrir le meilleur de la gastronomie bretonne."
    >
      <UPageGrid>
        <UPageCard
          icon="i-lucide-hamburger"
          title="Burgers artisanaux"
          description="Pain de la Boulangerie 1863, viande VBF locale, ingrédients frais et sauces maison préparées chaque jour avec passion."
          :ui="{
            icon: { base: 'w-12 h-12 mb-4 text-primary-500' },
            body: { padding: 'p-8' }
          }"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-hamburger"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-party-popper"
          title="Traiteur événementiel"
          description="Mariages, anniversaires, événements d'entreprise : un service personnalisé et de qualité adapté à tous vos besoins spéciaux."
          :ui="{
            icon: { base: 'w-12 h-12 mb-4 text-purple-500' },
            body: { padding: 'p-8' }
          }"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-party-popper"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-smartphone"
          title="Commande facilitée"
          description="Bientôt disponible : commandez facilement en ligne pour un retrait rapide ou contactez-nous directement."
          :ui="{
            icon: { base: 'w-12 h-12 mb-4 text-blue-500' },
            body: { padding: 'p-8' }
          }"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-smartphone"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-chef-hat"
          title="Savoir-faire artisanal"
          description="Chaque préparation respecte les traditions culinaires françaises avec une touche d'innovation moderne."
          :ui="{
            icon: { base: 'w-12 h-12 mb-4 text-orange-500' },
            body: { padding: 'p-8' }
          }"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-chef-hat"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-recycle"
          title="Démarche éco-responsable"
          description="Emballages recyclables, circuits courts et réduction du gaspillage alimentaire au cœur de nos préoccupations."
          :ui="{
            icon: { base: 'w-12 h-12 mb-4 text-green-500' },
            body: { padding: 'p-8' }
          }"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-recycle"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-clock-3"
          title="Service rapide"
          description="Préparation minute de vos commandes pour une fraîcheur optimale et un service efficace."
          :ui="{
            icon: { base: 'w-12 h-12 mb-4 text-teal-500' },
            body: { padding: 'p-8' }
          }"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-clock-3"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
    <!-- Produits locaux enhanced avec bento layout moderne -->
    <LocalProductsSection />

    <!-- Burger du moment enhanced -->
    <UPageSection
      v-if="burgerDuMoment"
      title="Le burger signature du moment"
      description="Découvrez notre création vedette du moment, préparée avec passion par notre équipe et plébiscitée par nos clients !"
    >
      <UCard class="max-w-6xl mx-auto overflow-hidden">
        <div class="lg:flex lg:items-center lg:gap-0">
          <div class="lg:flex-1 lg:p-12 p-8">
            <div class="flex items-center gap-4 mb-6 flex-wrap">
              <UBadge
                v-for="badge in productBadges"
                :key="badge.label"
                :color="badge.color"
                :variant="badge.variant || 'solid'"
                size="lg"
                class="px-4 py-2"
              >
                <UIcon
                  :name="badge.icon"
                  class="w-5 h-5 mr-2"
                />
                {{ badge.label }}
              </UBadge>
            </div>

            <h3 class="text-4xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              {{ burgerDuMoment.name }}
            </h3>

            <p class="text-gray-600 dark:text-gray-400 text-xl mb-8 leading-relaxed">
              {{ burgerDuMoment.description || 'Notre burger signature préparé avec des ingrédients frais et locaux, une recette unique qui fait notre fierté.' }}
            </p>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <UBadge
                v-for="ingredient in ingredientsList"
                :key="ingredient"
                variant="soft"
                size="md"
                class="justify-center py-2"
              >
                <UIcon
                  name="i-lucide-circle-dot"
                  class="w-4 h-4 mr-2"
                />
                {{ ingredient }}
              </UBadge>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <UButton
                size="xl"
                color="primary"
                to="/menus"
                class="flex-1"
              >
                <UIcon
                  name="i-lucide-eye"
                  class="w-5 h-5 mr-2"
                />
                Voir tous nos burgers
              </UButton>
              <UButton
                size="xl"
                variant="outline"
                to="/contact"
                class="flex-1"
              >
                <UIcon
                  name="i-lucide-phone"
                  class="w-5 h-5 mr-2"
                />
                Commander maintenant
              </UButton>
            </div>
          </div>

          <div class="lg:w-96 relative">
            <div class="aspect-square bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-primary-900/20 dark:via-primary-800/20 dark:to-primary-700/20 rounded-2xl lg:rounded-none lg:rounded-r-2xl flex items-center justify-center relative overflow-hidden">
              <!-- Product image if available -->
              <NuxtImg
                v-if="burgerDuMoment.images?.[0]"
                v-bind="optimizedBurgerImage"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Fallback placeholder -->
              <div
                v-else
                class="text-center z-10"
              >
                <div class="w-40 h-40 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <UIcon
                    name="i-lucide-hamburger"
                    class="w-20 h-20 text-white"
                  />
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Photo prochainement disponible
                </p>
              </div>

              <!-- Decorative elements -->
              <div class="absolute top-4 left-4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl" />
              <div class="absolute bottom-4 right-4 w-20 h-20 bg-red-400/20 rounded-full blur-xl" />
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-400/10 rounded-full blur-2xl" />

              <!-- Price tag enhanced -->
              <div class="absolute top-6 right-6">
                <div class="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  {{ formatPrice(burgerDuMoment.price) }}
                </div>
              </div>

              <!-- Popular badge -->
              <div class="absolute top-6 left-6">
                <UBadge
                  color="warning"
                  size="lg"
                  class="px-3 py-2"
                >
                  <UIcon
                    name="i-lucide-star"
                    class="w-4 h-4 mr-1"
                  />
                  Populaire
                </UBadge>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UPageSection>

    <!-- Events Component -->
    <FoodTruckEventSection />

    <!-- Galerie photos -->
    <UPageSection>
      <Galerie />
    </UPageSection>

    <!-- Section emplacements simplifiée -->
    <UPageSection
      title="Où nous trouver"
      description="Découvrez nos emplacements de la semaine. Notre food truck se déplace pour vous apporter le meilleur de nos burgers artisanaux."
    >
      <LocationsPreview
        :locations="locations"
        :pending="locationsPending"
      />
    </UPageSection>

    <!-- CTA Section Améliorée -->
    <UPageSection
      title="Votre burger vous attend !"
      description="Ne laissez pas passer l'occasion ! Contactez-nous dès maintenant ou découvrez notre gamme complète."
      class=" bg-primary-200 dark:bg-neutral-800"
    >
      <!-- CTA Principal -->
      <div class="text-center mb-12">
        <UButton
          size="xl"
          color="primary"
          to="tel:0624316790"
          class="mr-4 mb-4"
        >
          <UIcon
            name="i-lucide-phone"
            class="w-5 h-5 mr-2"
          />
          Appeler : 06 24 31 67 90
        </UButton>

        <UButton
          size="xl"
          variant="outline"
          to="/menus"
          class="mb-4"
        >
          <UIcon
            name="i-lucide-menu"
            class="w-5 h-5 mr-2"
          />
          Voir nos burgers
        </UButton>
      </div>

      <!-- Actions secondaires -->
      <UPageGrid class="lg:grid-cols-3">
        <UPageCard
          icon="i-lucide-map-pin"
          title="Nous localiser"
          description="Trouvez notre food truck près de chez vous cette semaine."
          to="/contact"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-map-pin"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
          <template #footer>
            <UButton
              variant="outline"
              block
              to="/contact"
            >
              Voir nos emplacements
            </UButton>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-party-popper"
          title="Événements & Traiteur"
          description="Mariages, anniversaires, événements d'entreprise sur mesure."
          to="/contact"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-party-popper"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
          <template #footer>
            <UButton
              color="primary"
              block
              to="/contact"
            >
              Demander un devis
            </UButton>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-utensils"
          title="Notre carte complète"
          description="Découvrez tous nos burgers, accompagnements et desserts."
          to="/menus"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-utensils"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
          <template #footer>
            <UButton
              variant="outline"
              block
              to="/menus"
            >
              Voir tous les menus
            </UButton>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
  </div>
</template>

<script setup>
import { NuxtImg } from '#components'
import FoodTruckEventSection from '~/components/FoodTruckEventSection.vue'
import LocalProductsSection from '~/components/LocalProductsSection.vue'

// =====================================
// FEATURES DATA
// =====================================

const _features = [
  {
    icon: 'i-lucide-hamburger',
    title: 'Burgers artisanaux',
    description: 'Pain de la Boulangerie 1863, viande VBF locale, ingrédients frais et sauces maison préparées chaque jour avec passion.',
    iconBg: 'bg-gradient-to-br from-primary-500 to-primary-600'
  },
  {
    icon: 'i-lucide-party-popper',
    title: 'Traiteur événementiel',
    description: 'Mariages, anniversaires, événements d\'entreprise : un service personnalisé et de qualité adapté à tous vos besoins spéciaux.',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    icon: 'i-lucide-smartphone',
    title: 'Commande facilitée',
    description: 'Bientôt disponible : commandez facilement en ligne pour un retrait rapide ou contactez-nous directement.',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    icon: 'i-lucide-chef-hat',
    title: 'Savoir-faire artisanal',
    description: 'Chaque préparation respecte les traditions culinaires françaises avec une touche d\'innovation moderne.',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600'
  },
  {
    icon: 'i-lucide-recycle',
    title: 'Démarche éco-responsable',
    description: 'Emballages recyclables, circuits courts et réduction du gaspillage alimentaire au cœur de nos préoccupations.',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    icon: 'i-lucide-clock-3',
    title: 'Service rapide',
    description: 'Préparation minute de vos commandes pour une fraîcheur optimale et un service efficace.',
    iconBg: 'bg-gradient-to-br from-teal-500 to-teal-600'
  }
]

// =====================================
// EMPLACEMENTS
// =====================================

const { fetchLocations } = useLocations()

// Récupération des emplacements pour la section preview
const { data: locations, pending: locationsPending } = await useAsyncData(
  'locations-preview',
  async () => {
    try {
      return await fetchLocations()
    } catch {
      // Silently handle the error - no locations available
      return []
    }
  },
  {
    default: () => [],
    server: true
  }
)

// Meta
definePageMeta({
  title: 'Food en K - Burgers artisanaux & Traiteur',
  description: 'Découvrez nos burgers faits maison et notre service traiteur pour tous vos événements à Merdrignac.'
})

// =====================================
// IMAGE OPTIMIZATION
// =====================================

const { getOptimizedUrl, getCardImageProps } = useOptimizedImage()

// Optimize hero image (unused but kept for potential future use)
const _heroImageUrl = getOptimizedUrl('/img/Truck.png', {
  width: 800,
  height: 600,
  quality: 85,
  format: 'webp'
})

// Optimized burger image
const optimizedBurgerImage = computed(() => {
  if (!burgerDuMoment.value?.images?.[0]) return {}

  return getCardImageProps(burgerDuMoment.value.images[0], 'medium')
})

// SEO avec notre composable
const { setPageSeo, setLocalBusinessSchema } = useSeo()

// Configuration SEO pour la page d'accueil
setPageSeo('home', {
  image: '/img/og-default.jpg'
})

// Schema pour entreprise locale
setLocalBusinessSchema()

// =====================================
// BURGER DU MOMENT
// =====================================

const {
  fetchBurgerDuMoment,
  getIngredientsList,
  getProductImage,
  formatPrice,
  getProductBadges
} = useBurgerDuMoment()

// Fetch burger du moment data
const { data: burgerDuMoment } = await useAsyncData(
  'burger-du-moment',
  async () => {
    try {
      return await fetchBurgerDuMoment()
    } catch {
      // Silently handle the error - no burger du moment available
      return null
    }
  },
  {
    default: () => null,
    server: true
  }
)

// Computed values for template
const ingredientsList = computed(() => {
  return burgerDuMoment.value ? getIngredientsList(burgerDuMoment.value) : []
})

const _productImage = computed(() => {
  return burgerDuMoment.value ? getProductImage(burgerDuMoment.value) : null
})

const productBadges = computed(() => {
  return burgerDuMoment.value ? getProductBadges(burgerDuMoment.value) : []
})
</script>
