<template>
  <UPageHero
    title="Food en'K"
    description="Food truck de burgers artisanaux, traiteur et événementiel. Nous proposons des recettes uniques et savoureuses, préparées avec des ingrédients frais et locaux."
    headline="🔥 Nouveau Site web"
    orientation="horizontal"
    :links="[
      {
        label: 'Je veux goûter maintenant !',
        to: '/menus',
        trailingIcon: 'i-lucide-utensils',
        size: 'xl',
        class: 'hover:animate-pulse hover:scale-105',
        color: 'primary'
      },
      {
        label: 'Où nous trouver ?',
        to: '/emplacements',
        icon: 'i-lucide-map-pin',
        size: 'xl',
        variant: 'outline',
        class: 'hover:animate-pulse'
      }
    ]"
  >
    <div class="relative">
      <div class="rounded-2xl overflow-hidden shadow-xl">
        <NuxtImg
          src="/img/Truck.png"
          alt="Food en K - Food truck burgers artisanaux"
          class="w-full h-auto"
          width="800"
          height="600"
          priority
          format="webp"
          quality="85"
        />
      </div>

      <!-- Badge "Ouvert maintenant" avec animation -->
      <div class="absolute top-4 left-4 bg-white/95 rounded-lg shadow-lg p-3 transform rotate-2 animate-bounce-in">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span class="text-sm font-semibold text-gray-800">Ouvert maintenant</span>
        </div>
      </div>

      <!-- Badge "Préparé en 10min" avec animation -->
      <div class="absolute bottom-4 right-4 bg-white/95 rounded-lg shadow-lg p-3 transform -rotate-2 animate-bounce-in-delayed">
        <div class="flex items-center space-x-2">
          <UIcon
            name="i-lucide-clock"
            class="w-4 h-4 text-orange-500"
          />
          <span class="text-sm font-semibold text-gray-800">Préparé en 15min</span>
        </div>
      </div>
    </div>
  </UPageHero>
</template>

<script setup>

</script>

<style scoped>
/* Effet de gradient sur le titre */
.font-custom-title {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #ff6b6b, #ffa500, #ff6b6b);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Animation bounce-in pour les badges */
@keyframes bounce-in {
  0% {
    transform: scale(0) rotate(2deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.1) rotate(2deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(2deg);
  }
}

@keyframes bounce-in-reverse {
  0% {
    transform: scale(0) rotate(-2deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.1) rotate(-2deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(-2deg);
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.animate-bounce-in-delayed {
  animation: bounce-in-reverse 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s forwards;
  opacity: 0;
}
</style>
