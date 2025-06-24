<script setup lang="ts">
import { NuxtImg } from '#components';

const route = useRoute()

const items = computed(() => [{
  label: 'Accueil',
  to: '/',
  active: route.path === '/'
}, {
  label: 'Nos Burgers',
  to: '/menus',
  active: route.path.startsWith('/menu')
}, {
  label: 'Nos Emplacements',
  to: '/emplacements',
  active: route.path.startsWith('/emplacements')
}, {
  label: 'Nos Événements',
  to: '/events',
  active: route.path.startsWith('/events')
}, {
  label: 'Nous Contacter',
  to: '/contact'
}])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink
        to="/"
        aria-label="Retour à l'accueil - Food en K"
      >
        <NuxtImg
          src="/img/logo.png"
          alt="Logo Food en K"
          class="h-8 w-auto"
          width="120"
          height="32"
          format="webp"
          loading="lazy"
          placeholder="blur"
          quality="80"
        />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <CartButton />

      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
