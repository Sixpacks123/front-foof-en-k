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

  optimization: {
    keyedComposables: [
      {
        name: 'useAsyncData',
        argumentLength: 2
      },
      {
        name: 'useLazyAsyncData',
        argumentLength: 2
      }
    ]
  },

  future: {
    compatibilityVersion: 4
  },

  // =====================================
  // BUILD OPTIMIZATIONS FOR CHUNK SIZE
  // =====================================

  experimental: {
    payloadExtraction: false
  },

  compatibilityDate: '2025-01-15',

  // =====================================
  // PERFORMANCE OPTIMIZATIONS
  // =====================================

  nitro: {
    compressPublicAssets: true,
    minify: true,
    experimental: {
      wasm: true
    }
  },

  // =====================================
  // TYPE SAFETY
  // =====================================

  typescript: {
    strict: true,
    typeCheck: true
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
    quality: 75,
    format: ['webp', 'avif', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    domains: [],
    alias: {},
    densities: [1, 2],
    presets: {
      hero: {
        modifiers: {
          format: 'webp',
          quality: 75,
          width: 800,
          height: 600,
          fit: 'cover'
        }
      }
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
    disallow: ['/admin', '/private']
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
    urls: [
      '/',
      '/menus',
      '/contact',
      '/emplacements',
      '/events',
      '/mentions-legales',
      '/politique-confidentialite'
    ]
  }
})
