<template>
  <div class="locations-list">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">
            Liste des emplacements
          </h3>
          <UBadge
            v-if="locations?.length"
            color="primary"
            variant="soft"
          >
            {{ locations.length }} emplacement{{ locations.length > 1 ? 's' : '' }}
          </UBadge>
        </div>   
      </template>

      <div class="space-y-4">
        <!-- État de chargement -->
        <div
          v-if="pending"
          class="space-y-4"
        >
          <USkeleton
            v-for="i in 3"
            :key="i"
            class="h-32 w-full"
          />
        </div>

        <!-- Aucun emplacement -->
        <UAlert
          v-else-if="!locations?.length"
          color="neutral"
          variant="subtle"
          title="Aucun emplacement"
          description="Aucun emplacement disponible pour le moment."
          icon="i-heroicons-information-circle"
        />

        <!-- Liste des emplacements responsive -->
        <div
          v-else
          class="space-y-3"
        >
          <UCard
            v-for="location in locations"
            :key="location.id"
            class="hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-primary-200 p-3 sm:p-4"
            @click="selectLocation(location)"
          >
            <!-- Mobile: Layout vertical -->
            <div class="block sm:hidden space-y-3">
              <!-- Header mobile avec indicateur de statut -->
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div class="relative flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center">
                    <UIcon
                      name="i-heroicons-map-pin"
                      class="w-6 h-6 text-primary-600"
                    />
                    <!-- Indicateur de statut en temps réel -->
                    <div
                      v-if="location.start_time && location.end_time"
                      :class="[
                        'absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white',
                        isLocationOpen(location) ? 'bg-green-500' : 'bg-gray-400'
                      ]"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <h4 class="text-base font-semibold text-gray-900 truncate">
                      {{ location.name }}
                    </h4>
                    <p
                      v-if="location.city"
                      class="text-sm text-gray-500"
                    >
                      {{ location.city }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Badges mobile -->
              <div class="flex flex-wrap gap-1">
                <!-- Indicateur ouvert/fermé -->
                <UBadge
                  v-if="location.start_time && location.end_time"
                  :color="isLocationOpen(location) ? 'success' : 'error'"
                  variant="soft"
                  size="xs"
                >
                  <UIcon
                    :name="isLocationOpen(location) ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
                    class="w-3 h-3 mr-1"
                  />
                  {{ isLocationOpen(location) ? 'Ouvert' : 'Fermé' }}
                </UBadge>

                <!-- Statut actif -->
                <UBadge
                  v-if="location.isActive"
                  color="primary"
                  variant="soft"
                  size="xs"
                >
                  Actif
                </UBadge>

                <!-- Distance si géolocalisé -->
                <UBadge
                  v-if="location.distance"
                  color="neutral"
                  variant="outline"
                  size="xs"
                >
                  <UIcon
                    name="i-heroicons-map-pin"
                    class="w-3 h-3 mr-1"
                  />
                  {{ formatDistance(location.distance) }}
                </UBadge>
              </div>

              <!-- Adresse mobile -->
              <div class="flex items-start gap-2">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="text-gray-500 mt-0.5 flex-shrink-0 w-4 h-4"
                />
                <p class="text-sm text-gray-600">
                  {{ formatAddress(location) }}
                </p>
              </div>

              <!-- Horaires mobile -->
              <div class="flex items-start gap-2">
                <UIcon
                  name="i-heroicons-clock"
                  class="text-gray-500 mt-0.5 flex-shrink-0 w-4 h-4"
                />
                <div>
                  <p class="text-sm text-gray-600">
                    {{ formatOpeningHours(location) }}
                  </p>
                  <p
                    v-if="location.start_time && location.end_time"
                    :class="[
                      'text-xs font-medium',
                      isLocationOpen(location) ? 'text-green-600' : 'text-red-600'
                    ]"
                  >
                    {{ isLocationOpen(location) ? 'Ouvert maintenant' : 'Fermé actuellement' }}
                  </p>
                </div>
              </div>

              <!-- Description mobile -->
              <p
                v-if="location.description"
                class="text-sm text-gray-700 line-clamp-2"
              >
                {{ location.description }}
              </p>

              <!-- Actions mobile -->
              <div class="flex gap-2">
                <UButton
                  size="sm"
                  color="primary"
                  variant="solid"
                  :to="`https://maps.google.com/maps?daddr=${location.latitude},${location.longitude}`"
                  target="_blank"
                  icon="i-heroicons-arrow-top-right-on-square"
                  class="flex-1"
                >
                  Itinéraire
                </UButton>

                <UButton
                  v-if="location.phone"
                  size="sm"
                  color="success"
                  variant="outline"
                  :href="`tel:${location.phone}`"
                  icon="i-heroicons-phone"
                >
                  <span class="sr-only">Appeler</span>
                </UButton>
              </div>
            </div>

            <!-- Desktop: Layout horizontal -->
            <div class="hidden sm:flex gap-4">
              <!-- Icone desktop avec indicateur -->
              <div class="relative flex-shrink-0 flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-10 h-10 text-primary-600"
                />
                <!-- Indicateur de statut en temps réel -->
                <div
                  v-if="location.start_time && location.end_time"
                  :class="[
                    'absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white',
                    isLocationOpen(location) ? 'bg-green-500' : 'bg-gray-400'
                  ]"
                />
              </div>

              <!-- Contenu desktop -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 truncate">
                      {{ location.name }}
                    </h4>
                    <p
                      v-if="location.city"
                      class="text-sm text-gray-500"
                    >
                      {{ location.city }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2 ml-2">
                    <!-- Indicateur ouvert/fermé -->
                    <UBadge
                      v-if="location.start_time && location.end_time"
                      :color="isLocationOpen(location) ? 'success' : 'error'"
                      variant="soft"
                      size="xs"
                    >
                      <UIcon
                        :name="isLocationOpen(location) ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
                        class="w-3 h-3 mr-1"
                      />
                      {{ isLocationOpen(location) ? 'Ouvert' : 'Fermé' }}
                    </UBadge>

                    <!-- Statut actif -->
                    <UBadge
                      v-if="location.isActive"
                      color="primary"
                      variant="soft"
                      size="xs"
                    >
                      Actif
                    </UBadge>

                    <!-- Distance si géolocalisé -->
                    <UBadge
                      v-if="location.distance"
                      color="neutral"
                      variant="outline"
                      size="xs"
                    >
                      <UIcon
                        name="i-heroicons-map-pin"
                        class="w-3 h-3 mr-1"
                      />
                      {{ formatDistance(location.distance) }}
                    </UBadge>
                  </div>
                </div>

                <!-- Adresse desktop -->
                <div class="flex items-start gap-2 mb-2">
                  <UIcon
                    name="i-heroicons-map-pin"
                    class="text-gray-500 mt-0.5 flex-shrink-0"
                  />
                  <p class="text-sm text-gray-600">
                    {{ formatAddress(location) }}
                  </p>
                </div>

                <!-- Horaires avec statut temps réel desktop -->
                <div class="flex items-start gap-2 mb-2">
                  <UIcon
                    name="i-heroicons-clock"
                    class="text-gray-500 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p class="text-sm text-gray-600">
                      {{ formatOpeningHours(location) }}
                    </p>
                    <p
                      v-if="location.start_time && location.end_time"
                      :class="[
                        'text-xs font-medium',
                        isLocationOpen(location) ? 'text-green-600' : 'text-red-600'
                      ]"
                    >
                      {{ isLocationOpen(location) ? 'Ouvert maintenant' : 'Fermé actuellement' }}
                    </p>
                  </div>
                </div>

                <!-- Description desktop -->
                <p
                  v-if="location.description"
                  class="text-sm text-gray-700 mb-3 line-clamp-2"
                >
                  {{ location.description }}
                </p>

                <!-- Actions desktop -->
                <div class="flex gap-2 mt-3">
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
            </div>
          </UCard>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Location } from '~/types'

interface Props {
  locations?: Location[]
  pending?: boolean
  userLocation?: { lat: number, lon: number } | null
  currentTime?: Date
}

defineProps<Props>()

// Composables
const { formatAddress, formatOpeningHours } = useLocations()

// Fonction pour vérifier si un emplacement est ouvert maintenant
const isLocationOpen = (location: Location): boolean => {
  if (!location.start_time || !location.end_time) return false

  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()

  const startTimeParts = location.start_time.split(':').map(Number)
  const endTimeParts = location.end_time.split(':').map(Number)

  const startHour = startTimeParts[0] ?? 0
  const startMin = startTimeParts[1] ?? 0
  const endHour = endTimeParts[0] ?? 0
  const endMin = endTimeParts[1] ?? 0

  const startTime = startHour * 60 + startMin
  const endTime = endHour * 60 + endMin

  return currentTime >= startTime && currentTime <= endTime
}

// Formater la distance
const formatDistance = (distance?: number): string => {
  if (!distance) return ''
  return distance < 1
    ? `${Math.round(distance * 1000)}m`
    : `${distance.toFixed(1)}km`
}

// Émission d'un événement pour zoomer sur la map
const emit = defineEmits<{ (e: 'select', location: Location): void }>()
function selectLocation(location: Location) {
  emit('select', location)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}
</style>
