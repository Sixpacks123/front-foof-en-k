export default defineNuxtPlugin(() => {
  // Configuration SEO globale
  
  // Utilise le SEO de base sur toutes les pages
  useHead({
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Food en K' },
      { name: 'generator', content: 'Nuxt 3' },
      { name: 'theme-color', content: '#dc2626' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Food en K' },
      { property: 'og:locale', content: 'fr_FR' },
      { name: 'twitter:site', content: '@foodenk' },
      { name: 'twitter:creator', content: '@foodenk' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/img/logo.png' },
      { rel: 'manifest', href: '/manifest.json' }
    ]
  })
})
