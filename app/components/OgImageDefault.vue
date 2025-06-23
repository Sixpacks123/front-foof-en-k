<!-- Composant pour générer les images Open Graph par défaut -->
<template>
  <div class="w-[1200px] h-[630px] bg-gradient-to-br from-red-600 to-red-800 flex flex-col items-center justify-center text-white relative overflow-hidden">
    <!-- Pattern de fond -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute inset-0"
        style="background: radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)"
      />
    </div>
    
    <!-- Contenu -->
    <div class="relative z-10 text-center px-16">
      <!-- Logo/Titre -->
      <h1 class="text-8xl font-bold mb-8 tracking-tight">
        Food en K
      </h1>
      
      <!-- Sous-titre -->
      <p class="text-3xl font-light mb-4 opacity-90">
        Food Truck Burger
      </p>
      
      <!-- Description -->
      <p class="text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
        Découvrez nos burgers artisanaux et nos produits locaux
      </p>
    </div>
    
    <!-- Élément décoratif -->
    <div class="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mb-32" />
    <div class="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mt-16" />
  </div>
</template>

<script setup lang="ts">
// Props pour personnaliser l'image si nécessaire
defineProps<{
  title?: string
  description?: string
}>()
</script>
