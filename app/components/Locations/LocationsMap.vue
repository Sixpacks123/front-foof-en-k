<template>
  <div class="locations-map">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Nos emplacements</h3>
          <UBadge v-if="locations?.length" color="primary" variant="soft">
            {{ locations.length }} emplacement{{ locations.length > 1 ? 's' : '' }}
          </UBadge>
        </div>
      </template>

      <div class="h-96 rounded-lg overflow-hidden">
        <LMap
          ref="mapRef"
          :zoom="zoom"
          :center="center"
          :use-global-leaflet="false"
          class="w-full h-full"
        >
          <LTileLayer
            :url="tileUrl"
            :attribution="attribution"
          />
          
          <!-- Marqueur pour chaque emplacement -->
          <LMarker
            v-for="location in locations"
            :key="location.id"
            :lat-lng="[location.latitude, location.longitude]"
            @click="onMarkerClick(location)"
          >
            <LIcon>
              <div class="flex items-center justify-center w-8 h-8 bg-primary-500 rounded-full shadow-lg">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-5 h-5 text-white"
                />
              </div>
            </LIcon>
            
            <LPopup>
              <div class="min-w-64 p-2">
                <h4 class="font-semibold text-base mb-2">
                  {{ location.name }}
                </h4>
                
                <!-- Image si disponible -->
                <div
                  v-if="location.image?.[0]"
                  class="mb-3"
                >
                  <img
                    :src="location.image[0].url"
                    :alt="location.name"
                    class="w-full h-24 object-cover rounded"
                  >
                </div>
                
                <!-- Adresse -->
                <div class="flex items-start gap-2 mb-2">
                  <UIcon
                    name="i-heroicons-map-pin"
                    class="text-gray-500 mt-0.5"
                  />
                  <p class="text-sm text-gray-600">
                    {{ formatAddress(location) }}
                  </p>
                </div>
                
                <!-- Horaires -->
                <div class="flex items-start gap-2 mb-3">
                  <UIcon
                    name="i-heroicons-clock"
                    class="text-gray-500 mt-0.5"
                  />
                  <p class="text-sm text-gray-600">
                    {{ formatOpeningHours(location) }}
                  </p>
                </div>
                
                <!-- Description si disponible -->
                <p
                  v-if="location.description"
                  class="text-sm text-gray-700 mb-3"
                >
                  {{ location.description }}
                </p>
                
                <!-- Boutons d'action -->
                <div class="flex gap-2">
                  <UButton
                    size="xs"
                    color="primary"
                    variant="solid"
                    :to="`https://maps.google.com/maps?daddr=${location.latitude},${location.longitude}`"
                    target="_blank"
                    icon="i-heroicons-arrow-top-right-on-square"
                  >
                    Itinéraire
                  </UButton>
                  
                  <UButton
                    v-if="location.phone"
                    size="xs"
                    color="success"
                    variant="outline"
                    :href="`tel:${location.phone}`"
                    icon="i-heroicons-phone"
                  >
                    Appeler
                  </UButton>
                </div>
              </div>
            </LPopup>
          </LMarker>

          <!-- Marqueur de position utilisateur -->
          <LMarker
            v-if="userLocation"
            :lat-lng="[userLocation.lat, userLocation.lon]"
          >
            <LIcon>
              <div class="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full shadow-lg border-2 border-white">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </LIcon>
            
            <LPopup>
              <div class="p-2">
                <p class="text-sm font-medium">Votre position</p>
              </div>
            </LPopup>
          </LMarker>
        </LMap>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Location } from '~/types'

interface Props {
  locations?: Location[]
  defaultCenter?: [number, number]
  defaultZoom?: number
  userLocation?: { lat: number, lon: number } | null
}

const props = withDefaults(defineProps<Props>(), {
  locations: () => [],
  defaultCenter: () => [46.603354, 1.888334], // Centre de la France
  defaultZoom: 6,
  userLocation: null
})

// État de la carte
const mapRef = ref()
const zoom = ref(props.defaultZoom)
const center = ref(props.defaultCenter)

// Configuration de la carte
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '© OpenStreetMap contributors'

// Composables
const { formatAddress, formatOpeningHours } = useLocations()

// Ajuster la vue de la carte aux emplacements
const fitBounds = () => {
  if (!props.locations?.length || !mapRef.value) return
  
  const bounds = props.locations.map(location => [location.latitude, location.longitude])
  
  // Si un seul emplacement, centrer dessus
  if (bounds.length === 1) {
    center.value = bounds[0] as [number, number]
    zoom.value = 14
    return
  }
  
  // Sinon, adapter la vue à tous les emplacements
  nextTick(() => {
    mapRef.value?.leafletObject?.fitBounds(bounds, { padding: [20, 20] })
  })
}

// Gestionnaire de clic sur marqueur
const onMarkerClick = (location: Location) => {
  // Optionnel : émettre un événement pour le composant parent
  console.log('Emplacement sélectionné:', location.name)
}

// Zoomer sur une location spécifique
const zoomToLocation = (location: Location) => {
  center.value = [location.latitude, location.longitude]
  zoom.value = 16
  
  // Optionnel : ajouter un marqueur temporaire ou une animation
  nextTick(() => {
    if (mapRef.value?.leafletObject) {
      mapRef.value.leafletObject.setView([location.latitude, location.longitude], 16)
    }
  })
}

// Centrer sur la position de l'utilisateur
const centerOnUser = (lat: number, lon: number) => {
  center.value = [lat, lon]
  zoom.value = 14
  
  nextTick(() => {
    if (mapRef.value?.leafletObject) {
      mapRef.value.leafletObject.setView([lat, lon], 14)
    }
  })
}

// Exposer les méthodes pour le composant parent
defineExpose({ zoomToLocation, centerOnUser })

// Watcher pour ajuster la carte quand les emplacements changent
watch(() => props.locations, fitBounds, { immediate: true })

// Ajuster la carte au montage
onMounted(() => {
  nextTick(() => {
    fitBounds()
  })
})
</script>