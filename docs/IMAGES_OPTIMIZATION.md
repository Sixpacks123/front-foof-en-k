# Guide d'utilisation de useImage() avec Nuxt Image

Ce guide explique comment utiliser efficacement `useImage()` de Nuxt Image dans votre projet Nuxt 3 avec Strapi.

## 🚀 Composable useOptimizedImage

Le composable `useOptimizedImage` utilise `useImage()` de Nuxt Image pour générer des URLs d'images optimisées avec support responsive.

### Fonctionnalités principales

- ✅ Optimisation automatique (WebP, qualité, dimensions)
- ✅ Images responsives avec srcset
- ✅ Support Strapi intégré
- ✅ Images de fond optimisées
- ✅ Preloading intelligent
- ✅ TypeScript complet

## 📖 Utilisation de base

### 1. Image simple optimisée

```vue
<script setup>
const { getOptimizedUrl } = useOptimizedImage()

const optimizedImageUrl = getOptimizedUrl('/img/hero.jpg', {
  width: 800,
  height: 600,
  quality: 85,
  format: 'webp'
})
</script>

<template>
  <NuxtImg
    :src="optimizedImageUrl"
    alt="Image optimisée"
    width="800"
    height="600"
  />
</template>
```

### 2. Images Strapi optimisées

```vue
<script setup>
const { getStrapiImageUrl } = useOptimizedImage()

// Image depuis Strapi avec optimisation
const strapiImageUrl = getStrapiImageUrl(strapiImage, {
  width: 600,
  height: 400,
  format: 'webp',
  quality: 80
})
</script>

<template>
  <NuxtImg
    :src="strapiImageUrl"
    alt="Image Strapi optimisée"
  />
</template>
```

### 3. Images responsives avec srcset

```vue
<script setup>
const { getResponsiveSrcSet } = useOptimizedImage()

const responsiveImage = getResponsiveSrcSet('/img/gallery.jpg', {
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality: 80,
  format: 'webp'
})
</script>

<template>
  <NuxtImg
    src="/img/gallery.jpg"
    :srcset="responsiveImage.srcset"
    :sizes="responsiveImage.sizes"
    alt="Image responsive"
  />
</template>
```

### 4. Image de fond optimisée

```vue
<script setup>
const { getHeroBackgroundStyles } = useOptimizedImage()

const backgroundStyles = getHeroBackgroundStyles('/img/hero-bg.jpg', {
  width: 1920,
  height: 1080,
  quality: 85
})
</script>

<template>
  <section :style="backgroundStyles" class="min-h-screen">
    <!-- Contenu du hero -->
  </section>
</template>
```

## 🎯 Layouts prédéfinis

### Pour les cartes produit

```vue
<script setup>
const { getCardImageProps } = useOptimizedImage()

const cardImageProps = getCardImageProps(productImage, 'medium')
</script>

<template>
  <NuxtImg
    v-bind="cardImageProps"
    class="rounded-lg"
  />
</template>
```

### Pour les galeries

```vue
<script setup>
const { getGalleryImageProps } = useOptimizedImage()

const galleryProps = getGalleryImageProps(image, index)
</script>

<template>
  <NuxtImg
    v-bind="galleryProps"
    class="gallery-image"
  />
</template>
```

### Pour les thumbnails

```vue
<script setup>
const { getThumbnailProps } = useOptimizedImage()

const thumbnailProps = getThumbnailProps(image, 150)
</script>

<template>
  <NuxtImg
    v-bind="thumbnailProps"
    class="rounded-full"
  />
</template>
```

## ⚡ Optimisations de performance

### Preloading d'images critiques

```vue
<script setup>
const { preloadImage } = useOptimizedImage()

onMounted(() => {
  // Preload de l'image hero pour améliorer le LCP
  preloadImage('/img/hero.jpg', {
    width: 1920,
    height: 1080,
    format: 'webp'
  })
})
</script>
```

### Lazy loading intelligent

```vue
<script setup>
const { getGalleryImageProps } = useOptimizedImage()

// Les 3 premières images sont en eager, les autres en lazy
const imageProps = (image, index) => ({
  ...getGalleryImageProps(image, index),
  loading: index < 3 ? 'eager' : 'lazy'
})
</script>
```

## 🔧 Configuration avancée

### Formats d'image supportés

- `webp` (par défaut, meilleur compression)
- `avif` (compression supérieure, support limité)
- `jpg` (compatibilité maximale)
- `png` (avec transparence)

### Qualités recommandées

- **Hero images**: 85-90
- **Cartes produit**: 75-80
- **Thumbnails**: 70-75
- **Images de fond**: 80-85

### Breakpoints configurés

```typescript
// Dans nuxt.config.ts
image: {
  screens: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  }
}
```

## 📱 Exemples pratiques

### Composant de galerie optimisé

```vue
<!-- components/Gallery/OptimizedGallery.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="(image, index) in images" :key="image.id">
      <NuxtImg
        v-bind="getOptimizedImageProps(image, index)"
        class="w-full h-64 object-cover rounded-lg"
      />
    </div>
  </div>
</template>

<script setup>
const { getGalleryImageProps } = useOptimizedImage()

const getOptimizedImageProps = (image, index) => {
  return getGalleryImageProps(image, index)
}
</script>
```

### Hero avec image de fond

```vue
<!-- components/Hero/OptimizedHero.vue -->
<template>
  <section :style="backgroundStyles" class="hero">
    <div class="hero-content">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </section>
</template>

<script setup>
const { getHeroBackgroundStyles } = useOptimizedImage()

const backgroundStyles = getHeroBackgroundStyles(backgroundImage, {
  width: 1920,
  height: 1080,
  quality: 85
})
</script>
```

## 🐛 Dépannage

### Images Strapi non chargées

Vérifiez que le provider Strapi est correctement configuré :

```typescript
// nuxt.config.ts
image: {
  strapi: {
    baseURL: process.env.STRAPI_URL || 'http://localhost:1337'
  }
}
```

### Performance lente

1. Utilisez WebP par défaut
2. Ajustez la qualité (70-85)
3. Implementez le preloading pour les images critiques
4. Utilisez lazy loading pour les images below-the-fold

### TypeScript errors

Assurez-vous d'importer les types :

```typescript
import type { ProductImage } from '~/types'
```

## 📚 Ressources utiles

- [Documentation Nuxt Image](https://image.nuxt.com/)
- [Guide des formats d'image](https://web.dev/serve-images-webp/)
- [Optimisation des images web](https://web.dev/fast/#optimize-your-images)
