<template>
  <UPageHero
    description="Food en K est un food truck de burgers artisanaux, traiteur et événementiel. Nous proposons des recettes uniques et savoureuses, préparées avec des ingrédients frais et locaux."
    orientation="horizontal"
    :ui="{ container: 'md:pt-18 lg:pt-20' }"
    :links="[
      {
        label: 'Je veux goûter maintenant !',
        to: '/menus',
        trailingIcon: 'i-lucide-hamburger',
        size: 'xl',
        color: 'primary'
      },
      {
        label: '📍 Où nous trouver ?',
        to: '/contact',
        icon: 'i-lucide-map-pin',
        size: 'xl',
        variant: 'outline'
      }
    ]"
  >
    <template #title>
      <span class="line-clamp-2 text-3xl md:text-4xl lg:text-4xl font-extrabold pb-2">
        Food en K -
        <BaseFlipWords
          :words="['Burgers', 'Traiteur', 'Artisanaux']"
          :duration="2000"
          class="!text-primary text-4xl md:text-5xl lg:text-6xl font-extrabold"
        />
      </span>
    </template>
    <NuxtImg
      src="/img/Truck.png"
      alt="Food en K - Food truck burgers artisanaux"
      class="rounded-lg shadow-2xl ring ring-default"
      width="800"
      height="600"
      priority
      loading="eager"
      format="webp"
      quality="75"
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 800px"
      placeholder
      :modifiers="{
        fit: 'cover',
        quality: 75,
        format: 'webp'
      }"
    />
  </UPageHero>
</template>

<script setup>
// Préchargement de l'image critique pour améliorer le LCP
useHead({
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
