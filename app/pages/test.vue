<script setup lang="ts">
import type { Location } from '~/types'

// Composable pour récupérer les emplacements
const { fetchLocations } = useLocations()

// Récupération des données
const { data: locations, pending } = await useAsyncData(
  'locations',
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

// Référence vers la carte
const mapRef = ref()

// Fonction pour gérer la sélection d'une location
const onLocationSelect = (location: Location) => {
  if (mapRef.value) {
    mapRef.value.zoomToLocation(location)
  }
}

// Meta de la page
useHead({
  title: 'Test - Emplacements',
  meta: [
    { name: 'description', content: 'Page de test pour les emplacements' }
  ]
})
</script>

<template>
  <div>
    <UContainer class="py-8">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Test - Emplacements
        </h1>
        <p class="text-gray-600">
          Page de test pour afficher les emplacements sur une carte et dans une liste
        </p>
      </div>

      <div
        v-if="pending"
        class="space-y-8"
      >
        <USkeleton class="h-96 w-full" />
        <USkeleton class="h-96 w-full" />
      </div>

      <!-- Contenu principal -->
      <div
        v-else
        class="space-y-8"
      >
        <!-- Carte des emplacements -->
        <LocationsMap
          ref="mapRef"
          :locations="locations"
          :default-center="[46.603354, 1.888334]"
          :default-zoom="6"
        />

        <!-- Liste des emplacements -->
        <LocationsList
          :locations="locations"
          :pending="pending"
          @select="onLocationSelect"
        />
      </div>
    </UContainer>
  </div>
</template>
