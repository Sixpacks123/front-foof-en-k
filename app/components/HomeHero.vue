<template>
  <UPageHero
    title="Food en K"
    description="🍔 Food truck de burgers artisanaux, traiteur et événementiel. Nous proposons des recettes uniques et savoureuses, préparées avec des ingrédients frais et locaux."
    headline="🔥 Nouveau Site web"
    orientation="horizontal"
    :links="[
      {
        label: 'Je veux goûter maintenant !',
        to: '/menus',
        trailingIcon: 'i-lucide-utensils',
        size: 'xl',
        color: 'primary',
        class: 'shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
      },
      {
        label: 'Où nous trouver ?',
        to: '/contact',
        icon: 'i-lucide-map-pin',
        size: 'xl',
        variant: 'outline',
        class: 'shadow-lg hover:shadow-xl transition-all duration-300'
      }
    ]"
  >
    <!-- Image avec effets visuels améliorés -->
    <div class="relative group">
      <!-- Container avec effet de hover -->
      <div class="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-200/50 transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.02]">
        <NuxtImg
          src="/img/Truck.png"
          alt="Food en K - Food truck burgers artisanaux dans votre région"
          class="w-full h-auto transition-transform duration-700 group-hover:scale-105"
          width="800"
          height="600"
          priority
          loading="eager"
          format="webp"
          quality="85"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 800px"
          placeholder
          :modifiers="{
            fit: 'cover',
            quality: 85,
            format: 'webp'
          }"
        />

        <!-- Overlay gradient subtil -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <!-- Badge "Ouvert maintenant" avec animation de slide-down + bounce -->
      <div class="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 transform rotate-3 transition-transform duration-300 hover:rotate-0 animate-slide-down-bounce">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span class="text-sm font-semibold text-gray-800">Ouvert maintenant</span>
        </div>
      </div>

      <!-- Badge "Préparé en 10min" avec animation de slide-up + bounce (délai de 0.5s) -->
      <div class="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 transform -rotate-3 transition-transform duration-300 hover:rotate-0 animate-slide-up-bounce animation-delay-500">
        <div class="flex items-center space-x-2">
          <UIcon
            name="i-lucide-clock"
            class="w-4 h-4 text-orange-500"
          />
          <span class="text-sm font-semibold text-gray-800">Préparé en 10min</span>
        </div>
      </div>

      <!-- Effet de brillance au survol -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
      </div>
    </div>
  </UPageHero>
</template>

<script setup>
// SEO et performance optimisés
useHead({
  title: 'Food en K - Food Truck Burgers Artisanaux | Traiteur Local',
  meta: [
    {
      name: 'description',
      content: 'Food en K, votre food truck de burgers artisanaux. Traiteur et événementiel avec des ingrédients frais et locaux. Découvrez nos saveurs uniques !'
    },
    {
      property: 'og:title',
      content: 'Food en K - Burgers Artisanaux sur Roues'
    },
    {
      property: 'og:description',
      content: 'Food truck de burgers artisanaux, traiteur et événementiel. Ingrédients frais et locaux, saveurs uniques !'
    },
    {
      property: 'og:image',
      content: '/img/Truck.png'
    }
  ],
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/img/Truck.png',
      type: 'image/png',
      fetchpriority: 'high'
    }
  ]
})
</script>

<style scoped>
/* Animation slide-down avec bounce pour le badge du haut */
@keyframes slide-down-bounce {
  0% {
    transform: translateY(-100px) rotate(3deg);
    opacity: 0;
  }
  60% {
    transform: translateY(10px) rotate(3deg);
    opacity: 1;
  }
  80% {
    transform: translateY(-5px) rotate(3deg);
  }
  100% {
    transform: translateY(0) rotate(3deg);
  }
}

/* Animation slide-up avec bounce pour le badge du bas */
@keyframes slide-up-bounce {
  0% {
    transform: translateY(100px) rotate(-3deg);
    opacity: 0;
  }
  60% {
    transform: translateY(-10px) rotate(-3deg);
    opacity: 1;
  }
  80% {
    transform: translateY(5px) rotate(-3deg);
  }
  100% {
    transform: translateY(0) rotate(-3deg);
  }
}

.animate-slide-down-bounce {
  animation: slide-down-bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.animate-slide-up-bounce {
  animation: slide-up-bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

/* Alternative : Animation de zoom avec rotation */
@keyframes zoom-rotate-in {
  0% {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
  70% {
    transform: scale(1.1) rotate(-10deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(3deg);
  }
}

/* Alternative : Animation de flip */
@keyframes flip-in {
  0% {
    transform: perspective(400px) rotateY(90deg) rotate(3deg);
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotateY(-10deg) rotate(3deg);
  }
  70% {
    transform: perspective(400px) rotateY(10deg) rotate(3deg);
  }
  100% {
    transform: perspective(400px) rotateY(0deg) rotate(3deg);
    opacity: 1;
  }
}

/* Alternative : Animation de shake (tremblement) */
@keyframes shake-in {
  0% {
    transform: translate(-50px, -50px) rotate(3deg);
    opacity: 0;
  }
  20% {
    transform: translate(10px, -10px) rotate(3deg);
    opacity: 1;
  }
  40% {
    transform: translate(-8px, 8px) rotate(3deg);
  }
  60% {
    transform: translate(6px, -6px) rotate(3deg);
  }
  80% {
    transform: translate(-4px, 4px) rotate(3deg);
  }
  100% {
    transform: translate(0, 0) rotate(3deg);
  }
}

/* Classes alternatives à utiliser */
.animate-zoom-rotate-in {
  animation: zoom-rotate-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.animate-flip-in {
  animation: flip-in 0.8s ease-out forwards;
}

.animate-shake-in {
  animation: shake-in 0.8s ease-out forwards;
}
</style>