<template>
  <div>
    <UPageHero
      title="Plan du Site"
      description="Retrouvez facilement toutes les pages de notre site Food en K"
    />

    <UPageSection>
      <UPageGrid>
        <UPageCard
          title="Navigation principale"
          description="Accédez aux sections essentielles de notre site"
        >
          <div class="space-y-3">
            <NuxtLink
              to="/"
              class="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <UIcon
                name="i-lucide-home"
                class="w-4 h-4"
              />
              Accueil
            </NuxtLink>
            <NuxtLink
              to="/menus"
              class="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <UIcon
                name="i-lucide-menu"
                class="w-4 h-4"
              />
              Nos Burgers
            </NuxtLink>
            <NuxtLink
              to="/emplacements"
              class="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <UIcon
                name="i-lucide-map-pin"
                class="w-4 h-4"
              />
              Nos Emplacements
            </NuxtLink>
            <NuxtLink
              to="/events"
              class="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <UIcon
                name="i-lucide-calendar"
                class="w-4 h-4"
              />
              Nos Événements
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <UIcon
                name="i-lucide-phone"
                class="w-4 h-4"
              />
              Nous Contacter
            </NuxtLink>
          </div>
        </UPageCard>

        <UPageCard
          title="Informations légales"
          description="Consultez nos conditions et mentions légales"
        >
          <div class="space-y-3">
            <NuxtLink
              to="/mentions-legales"
              class="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <UIcon
                name="i-lucide-file-text"
                class="w-4 h-4"
              />
              Mentions Légales
            </NuxtLink>
            <NuxtLink
              to="/politique-confidentialite"
              class="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <UIcon
                name="i-lucide-shield"
                class="w-4 h-4"
              />
              Politique de Confidentialité
            </NuxtLink>
          </div>
        </UPageCard>

        <UPageCard
          title="Nous suivre"
          description="Retrouvez-nous sur les réseaux sociaux"
        >
          <div class="space-y-3">
            <a
              href="https://facebook.com/foodenk"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <UIcon
                name="i-lucide-facebook"
                class="w-4 h-4"
              />
              Facebook
            </a>
            <a
              href="https://instagram.com/foodenk"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <UIcon
                name="i-lucide-instagram"
                class="w-4 h-4"
              />
              Instagram
            </a>
          </div>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
  </div>
</template>

<script setup>
// Meta
definePageMeta({
  title: 'Plan du Site - Food en K',
  description: 'Plan du site Food en K - Retrouvez facilement toutes les pages de notre food truck spécialisé dans les burgers artisanaux.'
})

// SEO
const { setPageSeo } = useSeo()
setPageSeo('sitemap')
</script>
