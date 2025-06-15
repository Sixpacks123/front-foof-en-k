<template>
  <div class="locations-preview">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-bold">
            Où nous trouver
          </h3>
          <UButton
            to="/emplacements"
            color="primary"
            variant="outline"
            size="sm"
            trailing-icon="i-heroicons-arrow-right"
          >
            Voir tous
          </UButton>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Carte simplifiée -->
        <div
          v-if="!pending && locations?.length"
          class="h-80 rounded-lg overflow-hidden"
        >
          <LocationsMap
            :locations="locations"
            :default-center="[48.1173, -2.2571]"
            :default-zoom="9"
            :show-list="false"
          />
        </div>

        <!-- État de chargement -->
        <USkeleton
          v-else-if="pending"
          class="h-80 w-full"
        />

        <!-- Résumé des emplacements -->
        <div
          v-if="locations?.length"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <UCard
            v-for="location in locations.slice(0, 3)"
            :key="location.id"
            class="hover:shadow-md transition-shadow"
          >
            <div class="flex items-center gap-3 p-4">
              <div class="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-primary-50 rounded-lg">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-6 h-6 text-primary-500"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-900 truncate">
                  {{ location.name }}
                </h4>
                <p class="text-sm text-gray-600 truncate">
                  {{ formatAddress(location) }}
                </p>
                <div class="flex items-center gap-1 mt-1">
                  <UIcon
                    name="i-heroicons-clock"
                    class="w-4 h-4 text-gray-400"
                  />
                  <span class="text-xs text-gray-500">
                    {{ formatOpeningHours(location) }}
                  </span>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Call to action -->
        <div class="text-center pt-4">
          <UButton
            to="/emplacements"
            color="primary"
            size="lg"
            trailing-icon="i-heroicons-map-pin"
          >
            Voir tous nos emplacements
          </UButton>
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
</script>
