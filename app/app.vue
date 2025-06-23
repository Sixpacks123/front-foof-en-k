<script setup>
import { Analytics } from '@vercel/analytics/nuxt'
// Configuration SEO globale pour l'application
const runtimeConfig = useRuntimeConfig()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'fr'
  }
})

const title = 'Food en K - Food Truck Burger'
const description = 'Découvrez Food en K, le food truck spécialisé dans les burgers artisanaux et les produits locaux. Réservez votre événement et savourez nos créations uniques.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `${runtimeConfig.public.siteUrl}/img/og-default.jpg`,
  twitterImage: `${runtimeConfig.public.siteUrl}/img/og-default.jpg`,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="primary" />
    <Analytics />

    <AlertBanner />

    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />

    <!-- Cart Drawer -->
    <CartDrawer />
  </UApp>
</template>
