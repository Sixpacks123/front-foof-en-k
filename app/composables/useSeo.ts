export interface SeoData {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  canonical?: string
  type?: 'website' | 'article'
}

export interface BreadcrumbItem {
  name: string
  url: string
}

interface MenuItem {
  name: string
  description?: string
  image?: string
  price?: number
}

interface MenuCategory {
  name: string
  description?: string
  items?: MenuItem[]
}

export function useSeo() {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  const setSeoData = (data: SeoData) => {
    const {
      title,
      description,
      keywords = [],
      image,
      canonical,
      type = 'website'
    } = data

    const siteUrl = runtimeConfig.public.siteUrl
    const fullTitle = title ? `${title} | Food en K` : 'Food en K - Food Truck Burger'
    const fullDescription = description || 'Découvrez Food en K, le food truck spécialisé dans les burgers artisanaux et les produits locaux. Réservez votre événement et savourez nos créations uniques.'
    const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/img/og-default.jpg`
    const canonicalUrl = canonical || `${siteUrl}${route.path}`

    // Meta tags basiques
    useSeoMeta({
      title: fullTitle,
      description: fullDescription,
      keywords: keywords.join(', '),
      
      // Open Graph
      ogTitle: fullTitle,
      ogDescription: fullDescription,
      ogImage: imageUrl,
      ogUrl: canonicalUrl,
      ogType: type,
      ogSiteName: 'Food en K',
      ogLocale: 'fr_FR',
      
      // Twitter Card
      twitterCard: 'summary_large_image',
      twitterTitle: fullTitle,
      twitterDescription: fullDescription,
      twitterImage: imageUrl,
      twitterSite: '@foodenk',
      twitterCreator: '@foodenk'
    })

    // Lien canonique
    useHead({
      link: [
        {
          rel: 'canonical',
          href: canonicalUrl
        }
      ]
    })
  }

  const setPageSeo = (pageName: string, customData?: Partial<SeoData>) => {
    const defaultSeoData: Record<string, SeoData> = {
      home: {
        title: 'Accueil',
        description: 'Food en K - Le food truck spécialisé dans les burgers artisanaux et les produits locaux. Découvrez nos créations uniques et réservez votre événement.',
        keywords: ['food truck', 'burger artisanal', 'produits locaux', 'événement', 'restauration mobile'],
        type: 'website'
      },
      menus: {
        title: 'Nos Menus',
        description: 'Découvrez nos burgers artisanaux, nos accompagnements et nos boissons. Des produits frais et locaux pour une expérience gustative unique.',
        keywords: ['menu', 'burger', 'artisanal', 'produits locaux', 'restauration'],
        type: 'website'
      },
      contact: {
        title: 'Contact',
        description: 'Contactez Food en K pour réserver votre événement ou obtenir des informations. Nous sommes à votre disposition pour vos projets.',
        keywords: ['contact', 'réservation', 'événement', 'food truck', 'devis'],
        type: 'website'
      },
      locations: {
        title: 'Nos Emplacements',
        description: 'Découvrez où nous trouver ! Consultez notre planning et nos emplacements pour ne pas manquer Food en K.',
        keywords: ['emplacement', 'planning', 'food truck', 'localisation', 'horaires'],
        type: 'website'
      },
      events: {
        title: 'Événements',
        description: 'Food en K pour vos événements privés et professionnels. Mariages, anniversaires, séminaires... Nous nous adaptons à vos besoins.',
        keywords: ['événement', 'mariage', 'anniversaire', 'séminaire', 'entreprise', 'food truck'],
        type: 'website'
      }
    }

    const seoData = {
      ...defaultSeoData[pageName],
      ...customData
    }

    setSeoData(seoData)
  }

  const setBreadcrumb = (items: BreadcrumbItem[]) => {
    const breadcrumbList = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': `${runtimeConfig.public.siteUrl}${item.url}`
      }))
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(breadcrumbList)
        }
      ]
    })
  }

  const setLocalBusinessSchema = () => {
    const localBusiness = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Food en K',
      'description': 'Food truck spécialisé dans les burgers artisanaux et les produits locaux',
      'url': runtimeConfig.public.siteUrl,
      'telephone': runtimeConfig.public.contactPhone,
      'email': runtimeConfig.public.contactEmail,
      'image': `${runtimeConfig.public.siteUrl}/img/logo.png`,
      'logo': `${runtimeConfig.public.siteUrl}/img/logo.png`,
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'FR',
        'addressLocality': 'France'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 48.8566,
        'longitude': 2.3522
      },
      'openingHours': [
        'Mo-Fr 11:00-14:00',
        'Mo-Fr 18:00-22:00',
        'Sa-Su 12:00-22:00'
      ],
      'servesCuisine': 'Burger, Fast Food, Cuisine Locale',
      'priceRange': '€€',
      'currenciesAccepted': 'EUR',
      'paymentAccepted': 'Cash, Credit Card'
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(localBusiness)
        }
      ]
    })
  }

  const setMenuSchema = (menuItems: MenuCategory[]) => {
    const menuSchema = {
      '@context': 'https://schema.org',
      '@type': 'Menu',
      'name': 'Menu Food en K',
      'description': 'Nos burgers artisanaux et accompagnements',
      'hasMenuSection': menuItems.map(category => ({
        '@type': 'MenuSection',
        'name': category.name,
        'description': category.description,
        'hasMenuItem': category.items?.map((item: MenuItem) => ({
          '@type': 'MenuItem',
          'name': item.name,
          'description': item.description,
          'image': item.image,
          'offers': {
            '@type': 'Offer',
            'price': item.price,
            'priceCurrency': 'EUR'
          }
        })) || []
      }))
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(menuSchema)
        }
      ]
    })
  }

  return {
    setSeoData,
    setPageSeo,
    setBreadcrumb,
    setLocalBusinessSchema,
    setMenuSchema
  }
}
