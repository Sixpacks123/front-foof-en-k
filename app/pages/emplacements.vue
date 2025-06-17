<script setup lang="ts">
import type { Location } from '~/types'

// Composables
const { fetchLocations, calculateDistance } = useLocations()
const { setPageSeo, setBreadcrumb } = useSeo()

// État réactif
const userLocation = ref<{ lat: number, lon: number } | null>(null)
const geolocationError = ref<string | null>(null)
const isGeolocating = ref(false)
const mapRef = ref()
const currentTime = ref(new Date())

// Données
const { data: allLocations, pending, refresh: _refresh } = await useAsyncData(
  'locations',
  () => fetchLocations().catch(() => []),
  { default: () => [], server: true }
)

// Utilitaires
const isLocationOpen = (location: Location): boolean => {
  if (!location.start_time || !location.end_time) return false

  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  const [startHour, startMin] = location.start_time.split(':').map(Number)
  const [endHour, endMin] = location.end_time.split(':').map(Number)

  return currentTime >= startHour * 60 + startMin && currentTime <= endHour * 60 + endMin
}

// Computed
const locationsWithDistance = computed(() => {
  const locations = allLocations.value || []

  if (!userLocation.value) return locations

  return locations
    .map(loc => ({
      ...loc,
      distance: calculateDistance(
        userLocation.value!.lat,
        userLocation.value!.lon,
        loc.latitude,
        loc.longitude
      )
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
})

const _stats = computed(() => ({
  openCount: (allLocations.value || []).filter(isLocationOpen).length,
  closestDistance: (() => {
    if (!userLocation.value || !locationsWithDistance.value.length) return '-'
    const closest = locationsWithDistance.value[0]
    if (!closest.distance) return '-'
    return closest.distance < 1
      ? `${Math.round(closest.distance * 1000)}m`
      : `${closest.distance.toFixed(1)}km`
  })()
}))

// Méthodes
const requestGeolocation = async () => {
  if (!navigator.geolocation) {
    geolocationError.value = 'Géolocalisation non supportée'
    return
  }

  isGeolocating.value = true
  geolocationError.value = null

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      })
    })

    userLocation.value = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }

    mapRef.value?.centerOnUser(userLocation.value.lat, userLocation.value.lon)
  } catch (err) {
    const error = err as GeolocationPositionError
    const errorMessages = {
      1: 'Accès à la localisation refusé',
      2: 'Position indisponible',
      3: 'Délai d\'attente dépassé'
    }
    geolocationError.value = errorMessages[error.code as keyof typeof errorMessages] || 'Erreur de géolocalisation'
  } finally {
    isGeolocating.value = false
  }
}

const onLocationSelect = (location: Location) => {
  mapRef.value?.zoomToLocation(location)
}

// Lifecycle
onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date()
  }, 60000)
})

// SEO
setPageSeo('locations', { image: '/img/og-default.jpg' })
setBreadcrumb([
  { name: 'Accueil', url: '/' },
  { name: 'Nos Emplacements', url: '/emplacements' }
])

useHead({
  title: 'Nos emplacements - Food en K',
  meta: [
    { name: 'description', content: 'Découvrez tous nos emplacements et horaires. Trouvez le Food Truck Food en K près de chez vous.' }
  ]
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      title="Trouvez-nous près de chez vous"
      description="Notre food truck sillonne la Bretagne pour vous apporter nos burgers artisanaux."
      :links="[
        {
          label: 'Nous localiser',
          color: 'primary',
          size: 'xl',
          icon: 'i-heroicons-map-pin',
          click: () => requestGeolocation()
        }
      ]"
    >
      <template #headline>
        <UBadge
          variant="subtle"
          size="lg"
        >
          <UIcon
            name="i-heroicons-truck"
            class="w-4 h-4 mr-2"
          />
          {{ allLocations?.length || 0 }} emplacement{{ (allLocations?.length || 0) > 1 ? 's' : '' }}
        </UBadge>
      </template>
    </UPageHero>

    <UContainer class="py-12">
      <!-- Géolocalisation -->
      <UCard class="mb-8">
        <div class="p-6 text-center">
          <h3 class="text-xl font-semibold mb-4">
            {{ userLocation ? 'Position détectée !' : 'Trouvez le plus proche' }}
          </h3>
          <UButton
            :loading="isGeolocating"
            :color="userLocation ? 'success' : 'primary'"
            size="xl"
            :icon="userLocation ? 'i-heroicons-check-circle' : 'i-heroicons-map-pin'"
            @click="requestGeolocation"
          >
            {{ userLocation ? 'Position détectée' : 'Me localiser' }}
          </UButton>
        </div>
      </UCard>

      <!-- Erreur géolocalisation -->
      <UAlert
        v-if="geolocationError"
        color="error"
        :title="geolocationError"
        class="mb-6"
        :actions="[{
          label: 'Réessayer',
          color: 'error',
          variant: 'outline',
          click: () => requestGeolocation()
        }]"
      />

      <!-- Loading -->
      <USkeleton
        v-if="pending"
        class="h-96 w-full mb-8"
      />

      <!-- État vide -->
      <UCard
        v-else-if="!allLocations?.length"
        class="text-center p-8"
      >
        <UIcon
          name="i-heroicons-map-pin"
          class="w-16 h-16 text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-2xl font-bold mb-4">
          Bientôt près de chez vous !
        </h3>
        <p class="text-gray-600 mb-6">
          Contactez-nous pour organiser un événement.
        </p>
        <UButton
          to="/contact"
          color="primary"
          size="xl"
          icon="i-heroicons-phone"
        >
          Nous contacter
        </UButton>
      </UCard>

      <!-- Contenu principal -->
      <div
        v-else
        class="space-y-8"
      >
        <!-- Carte -->
        <div>
          <h2 class="text-xl font-semibold mb-4">
            Carte interactive
          </h2>
          <LocationsMap
            ref="mapRef"
            :locations="locationsWithDistance"
            :default-center="[48.1173, -2.2571]"
            :default-zoom="10"
            :user-location="userLocation"
          />
        </div>

        <!-- Liste -->
        <div>
          <h2 class="text-xl font-semibold mb-4">
            Tous nos emplacements
          </h2>
          <LocationsList
            :locations="locationsWithDistance"
            :pending="pending"
            :user-location="userLocation"
            :current-time="currentTime"
            @select="onLocationSelect"
          />
        </div>
      </div>

      <!-- Guide -->
      <UCard class="mb-8">
        <div class="text-center p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Comment nous trouver ?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Étape 1 -->
            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-6 h-6 text-primary-600"
                />
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">
                1. Localisez-vous
              </h3>
              <p class="text-sm text-gray-600">
                Cliquez sur "Me localiser" pour trouver les emplacements les plus proches
              </p>
            </div>

            <!-- Étape 2 -->
            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <UIcon
                  name="i-heroicons-map"
                  class="w-6 h-6 text-blue-600"
                />
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">
                2. Consultez la carte
              </h3>
              <p class="text-sm text-gray-600">
                Visualisez tous nos emplacements sur la carte interactive
              </p>
            </div>

            <!-- Étape 3 -->
            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <UIcon
                  name="i-heroicons-arrow-top-right-on-square"
                  class="w-6 h-6 text-green-600"
                />
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">
                3. Venez nous voir !
              </h3>
              <p class="text-sm text-gray-600">
                Cliquez sur "Itinéraire" pour lancer votre GPS
              </p>
            </div>
          </div>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
