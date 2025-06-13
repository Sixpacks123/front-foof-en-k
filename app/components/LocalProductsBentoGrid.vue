<template>
  <div class="mx-auto max-w-7xl">
    <!-- Bento Grid Layout optimisé -->
    <div class="grid auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <!-- Boulangerie 1863 - Grande carte principale (2x2) -->
      <BentoCard
        title="Boulangerie 1863"
        description="Nos pains burger sont confectionnés par la Boulangerie 1863 à Merdrignac, d'après notre recette maison exclusive."
        icon="i-lucide-wheat"
        color="warning"
        :details="[
          { icon: 'i-lucide-map-pin', text: 'Merdrignac, Côtes-d\'Armor' },
          { icon: 'i-lucide-clock', text: 'Fraîcheur quotidienne garantie' },
          { icon: 'i-lucide-award', text: 'Recette signature Food en K' }
        ]"
        badge="Partenaire Exclusif"
        badge-icon="i-lucide-crown"
        class="md:col-span-2 md:row-span-2"
        size="large"
      />

      <!-- VBF Bretagne -->
      <BentoCard
        title="VBF Bretagne"
        description="Steaks 'hachés boucher minute' frais, issus de viande bovine bretonne sélectionnée pour sa tendreté."
        icon="i-lucide-beef"
        color="error"
        :badges="[
          { text: 'Fraîcheur', color: 'error', icon: 'i-lucide-shield-check' },
          { text: 'Local', color: 'success', icon: 'i-lucide-map-pin' }
        ]"
        class="col-span-1"
        size="medium"
      />

      <!-- Producteurs locaux -->
      <BentoCard
        title="Producteurs locaux"
        description="Légumes de saison, fromages artisanaux et condiments sélectionnés dans un rayon de 30km."
        icon="i-lucide-carrot"
        color="success"
        :badges="[
          { text: '< 30km', color: 'success', icon: 'i-lucide-truck' }
        ]"
        class="col-span-1"
        size="medium"
      />

      <!-- Certification Bio -->
      <BentoCard
        title="Certification Bio"
        description="Plusieurs de nos produits sont certifiés biologiques pour votre santé et l'environnement."
        icon="i-lucide-leaf"
        color="success"
        :badges="[
          { text: 'Bio certifié', color: 'success', icon: 'i-lucide-shield-check' }
        ]"
        class="col-span-1"
        size="medium"
      />

      <!-- Call to Action - Fait avec passion -->
      <BentoCallToAction
        title="Fait avec passion"
        description="Chaque burger est préparé avec amour et des ingrédients soigneusement sélectionnés par nos artisans."
        icon="i-lucide-chef-hat"
        sparkle-icon="i-lucide-sparkles"
        :badges="[
          { text: 'Circuit court', color: 'green', icon: 'i-lucide-leaf' },
          { text: 'Qualité garantie', color: 'blue', icon: 'i-lucide-shield-check' },
          { text: 'Fait maison', color: 'purple', icon: 'i-lucide-heart' }
        ]"
        :buttons="[
          { text: 'Nos burgers', to: '/menus', icon: 'i-lucide-eye', variant: 'primary' },
          { text: 'Commander', to: '#contact', icon: 'i-lucide-phone', variant: 'outline' }
        ]"
        class="md:col-span-2 lg:col-span-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Imports des composants enfants
import BentoCard from '~/components/BentoCard.vue'
import BentoCallToAction from '~/components/BentoCallToAction.vue'
</script>
