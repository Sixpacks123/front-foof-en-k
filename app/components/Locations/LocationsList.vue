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

        <!-- Liste des emplacements -->
        <div
          v-else
          class="grid gap-4"
        >
          <UCard
            v-for="location in locations"
            :key="location.id"
            :ui="{ body: { padding: 'p-4' } }"
            class="hover:shadow-md transition-shadow cursor-pointer"
            @click="selectLocation(location)"
          >
            <div class="flex gap-4">
              <!-- Icone -->
              <div
                class="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-primary-50 rounded-lg"
              >
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-10 h-10 text-primary-500"
                />
              </div>
              <!-- Contenu -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-2">
                  <h4 class="text-lg font-semibold text-gray-900 truncate">
                    {{ location.name }}
                  </h4>
                  <UBadge
                    v-if="location.isActive"
                    color="success"
                    variant="soft"
                    size="xs"
                  >
                    Actif
                  </UBadge>
                </div>

                <!-- Adresse -->
                <div class="flex items-start gap-2 mb-2">
                  <UIcon
                    name="i-heroicons-map-pin"
                    class="text-gray-500 mt-0.5 flex-shrink-0"
                  />
                  <p class="text-sm text-gray-600">
                    {{ formatAddress(location) }}
                  </p>
                </div>

                <!-- Horaires -->
                <div class="flex items-start gap-2 mb-2">
                  <UIcon
                    name="i-heroicons-clock"
                    class="text-gray-500 mt-0.5 flex-shrink-0"
                  />
                  <p class="text-sm text-gray-600">
                    {{ formatOpeningHours(location) }}
                  </p>
                </div>

                <!-- Description -->
                <p
                  v-if="location.description"
                  class="text-sm text-gray-700 mb-3 line-clamp-2"
                >
                  {{ location.description }}
                </p>

                <!-- Actions -->
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
}

defineProps<Props>()

// Composables
const { formatAddress, formatOpeningHours } = useLocations()

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
