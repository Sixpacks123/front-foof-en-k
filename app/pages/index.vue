<template>
  <div>
    <HomeHero />

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
    <BurgerDuMoment />

    <!-- Events Component -->
    <FoodTruckEventSection />

    <!-- Galerie photos -->
    <UPageSection>
      <Galerie />
    </UPageSection>

    <!-- Section emplacements simplifiée -->
    <UPageSection
      v-if="locations && locations.length"
      title="Où nous trouver"
      description="Découvrez nos emplacements de la semaine. Notre food truck se déplace pour vous apporter le meilleur de nos burgers artisanaux."
    >
      <LocationsPreview
        :locations="locations"
        :pending="locationsPending"
      />
    </UPageSection>

    <!-- CTA Section Améliorée -->
    <CtaContact />
  </div>
</template>

<script setup>
// Use dynamic imports for large components to improve code splitting
const FoodTruckEventSection = defineAsyncComponent(() => import('~/components/FoodTruckEventSection.vue'))
const LocalProductsSection = defineAsyncComponent(() => import('~/components/LocalProductsSection.vue'))

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

const { getOptimizedUrl } = useOptimizedImage()

// Optimize hero image (unused but kept for potential future use)
const _heroImageUrl = getOptimizedUrl('/img/Truck.png', {
  width: 800,
  height: 600,
  quality: 85,
  format: 'webp'
})

// SEO avec notre composable
const { setPageSeo, setLocalBusinessSchema } = useSeo()

// Configuration SEO pour la page d'accueil
setPageSeo('home', {
  image: '/img/og-default.jpg'
})

// Schema pour entreprise locale
setLocalBusinessSchema()
</script>
