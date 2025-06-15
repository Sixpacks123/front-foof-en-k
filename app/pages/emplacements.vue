<script setup lang="ts">
import type { Location } from '~/types'

// Composable pour récupérer les emplacements
const { fetchLocations } = useLocations()

// Récupération des données
const { data: locations, pending, error } = await useAsyncData('locations', () => fetchLocations())

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
      title="Nos emplacements"
      description="Découvrez où nous trouver cette semaine. Notre food truck sillonne la région pour vous apporter le meilleur de nos burgers artisanaux."
      orientation="horizontal"
      :links="[
        {
          label: 'Nous contacter',
          to: '/contact',
          icon: 'i-heroicons-phone',
          size: 'lg'
        }
      ]"
    >
      <div class="flex items-center justify-center w-full h-64 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl">
        <UIcon
          name="i-heroicons-map-pin"
          class="w-24 h-24 text-primary-500"
        />
      </div>
    </UPageHero>

    <UContainer class="py-12">
      <!-- États de chargement et d'erreur -->
      <UAlert
        v-if="error"
        color="error"
        variant="subtle"
        title="Erreur"
        :description="error.message"
        icon="i-heroicons-exclamation-triangle"
        class="mb-8"
      />

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
          :default-center="[48.1173, -2.2571]"
          :default-zoom="10"
        />

        <!-- Liste des emplacements -->
        <LocationsList
          :locations="locations"
          :pending="pending"
          :error="error"
          @select="onLocationSelect"
        />
      </div>
    </UContainer>
  </div>
</template>
