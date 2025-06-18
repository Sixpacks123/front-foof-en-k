<template>
  <UPageHero
    title="Les vrais burgers bretons qui régalent la Bretagne !"
    description="Pain 1863, viande VBF locale, sauces maison... Nos burgers artisanaux sillonnent les routes bretonnes depuis notre food truck. Goûtez la différence !"
    orientation="horizontal"
    :ui="{ container: 'md:pt-18 lg:pt-20' }"
    :links="[
      {
        label: 'Je veux goûter !',
        to: '/menus',
        trailingIcon: 'i-lucide-heart',
        size: 'xl',
        color: 'primary'
      },
      {
        label: 'Où vous êtes ?',
        to: '/contact',
        icon: 'i-lucide-map-pin',
        size: 'xl',
        variant: 'ghost'
      }
    ]"
  >
    <template #title>
      <span class="text-center">
        Food en K - Burgers & Traiteur
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
      quality="85"
      sizes="(max-width: 768px) 100vw, 800px"
    />
  </UPageHero>
</template>

<script setup>
</script>
