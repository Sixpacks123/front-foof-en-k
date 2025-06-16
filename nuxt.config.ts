// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@nuxtjs/strapi',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/leaflet',
    '@nuxtjs/sitemap',
    '@nuxtjs/seo'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // =====================================
  // SEO CONFIGURATION
  // =====================================

  site: {
    name: 'Food en K - Food Truck Burger Artisanal',
    description: 'Découvrez Food en K, le food truck spécialisé dans les burgers artisanaux et les produits locaux. Réservez votre événement et savourez nos créations uniques.',
    defaultLocale: 'fr'
  },

  // =====================================
  // RUNTIME CONFIG
  // =====================================

  runtimeConfig: {
    // Private keys (only available on server-side)
    strapiToken: process.env.STRAPI_TOKEN || '',

    // Public keys (exposed to client-side)
    public: {
      strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      gtmId: process.env.GTM_ID || '',
      contactEmail: process.env.CONTACT_EMAIL || 'contact@food-en-k.com',
      contactPhone: process.env.CONTACT_PHONE || '0624316790'
    }
  },

  // =====================================
  // BUILD OPTIMIZATIONS
  // =====================================

  build: {
    transpile: ['@headlessui/vue']
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-01-15',

  // =====================================
  // PERFORMANCE OPTIMIZATIONS
  // =====================================

  nitro: {
    compressPublicAssets: true,
    minify: true
  },
  // =====================================
  // TYPE SAFETY
  // =====================================

  typescript: {
    strict: true,
    typeCheck: false
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  image: {
    quality: 80,
    format: ['webp', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    strapi: {
      baseURL: `${process.env.STRAPI_URL || 'http://localhost:1337'}`
    }
  },

  ogImage: {
    enabled: true,
    defaults: {
      component: 'OgImageDefault',
      width: 1200,
      height: 630
    }
  },

  robots: {
    allow: ['/', '/menus', '/contact', '/emplacements', '/events'],
    disallow: ['/admin', '/api'],
    sitemap: '/sitemap.xml'
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Food en K',
      url: process.env.SITE_URL || 'http://localhost:3000',
      logo: '/img/logo.png'
    }
  },

  seo: {
    redirectToCanonicalSiteUrl: true
  },

  sitemap: {
    sources: [
      '/sitemap.xml'
    ]
  }
})
