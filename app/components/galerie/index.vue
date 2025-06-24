<script setup lang="ts">
const { images } = useGallery()
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    dots
    :items="images"
    :ui="{ item: 'basis-1/3' }"
    class="w-full"
  >
    <div class="relative overflow-hidden rounded-lg">
      <img
        :src="item.url"
        :alt="item.alt"
        width="320"
        height="320"
        class="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  </UCarousel>
</template>
