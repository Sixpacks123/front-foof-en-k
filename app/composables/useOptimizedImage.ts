/**
 * Enhanced image composable using Nuxt Image's useImage()
 * Provides advanced image optimization with responsive images and dynamic URLs
 */

import type { ProductImage } from '~/types'

export const useOptimizedImage = () => {
  const img = useImage()

  /**
   * Generate optimized image URL with dynamic parameters
   */
  const getOptimizedUrl = (
    src: string,
    options: {
      width?: number
      height?: number
      quality?: number
      format?: 'webp' | 'jpg' | 'png' | 'avif'
      fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
    } = {}
  ): string => {
    const defaultOptions = {
      quality: 80,
      format: 'webp' as const,
      fit: 'cover' as const
    }

    return img(src, {
      ...defaultOptions,
      ...options
    }, {
      provider: 'strapi'
    })
  }

  /**
   * Generate responsive srcset for different screen sizes
   */
  const getResponsiveSrcSet = (
    src: string,
    options: {
      sizes?: string
      quality?: number
      format?: 'webp' | 'jpg' | 'png' | 'avif'
      height?: number
    } = {}
  ) => {
    const defaultSizes = 'xs:100vw sm:100vw md:50vw lg:33vw xl:25vw'
    
    return img.getSizes(src, {
      sizes: options.sizes || defaultSizes,
      modifiers: {
        format: options.format || 'webp',
        quality: options.quality || 80,
        ...(options.height && { height: options.height })
      }
    })
  }

  /**
   * Get optimized Strapi image URL
   */
  const getStrapiImageUrl = (
    image: ProductImage,
    options: {
      breakpoint?: 'thumbnail' | 'small' | 'medium' | 'large'
      width?: number
      height?: number
      quality?: number
      format?: 'webp' | 'jpg' | 'png' | 'avif'
    } = {}
  ): string => {
    // Get base URL from Strapi formats or original
    let baseUrl = image.url
    
    if (options.breakpoint && image.formats?.[options.breakpoint]) {
      baseUrl = image.formats[options.breakpoint]!.url
    }

    // If no additional optimization needed, return base URL
    if (!options.width && !options.height && !options.quality && !options.format) {
      return baseUrl
    }

    return getOptimizedUrl(baseUrl, {
      width: options.width,
      height: options.height,
      quality: options.quality,
      format: options.format
    })
  }

  /**
   * Get hero image with background styles
   */
  const getHeroBackgroundStyles = (
    src: string,
    options: {
      width?: number
      height?: number
      quality?: number
    } = {}
  ) => {
    const optimizedUrl = getOptimizedUrl(src, {
      width: options.width || 1920,
      height: options.height || 1080,
      quality: options.quality || 85,
      format: 'webp'
    })

    return {
      backgroundImage: `url('${optimizedUrl}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  }

  /**
   * Get card image props optimized for different layouts
   */
  const getCardImageProps = (
    image: ProductImage,
    layout: 'small' | 'medium' | 'large' | 'hero' = 'medium'
  ) => {
    const layoutConfig = {
      small: { width: 400, height: 300, sizes: '(max-width: 768px) 100vw, 400px' },
      medium: { width: 600, height: 400, sizes: '(max-width: 768px) 100vw, 600px' },
      large: { width: 800, height: 600, sizes: '(max-width: 768px) 100vw, 800px' },
      hero: { width: 1200, height: 800, sizes: '100vw' }
    }

    const config = layoutConfig[layout]
    const responsiveSrcSet = getResponsiveSrcSet(image.url, {
      sizes: config.sizes,
      height: config.height
    })

    return {
      src: getStrapiImageUrl(image, {
        width: config.width,
        height: config.height,
        format: 'webp',
        quality: 80
      }),
      alt: image.alternativeText || 'Image',
      srcset: responsiveSrcSet.srcset,
      sizes: responsiveSrcSet.sizes,
      width: config.width,
      height: config.height,
      loading: 'lazy' as const
    }
  }

  /**
   * Get gallery image props with lazy loading
   */
  const getGalleryImageProps = (
    image: ProductImage,
    index: number = 0
  ) => {
    return {
      src: getStrapiImageUrl(image, {
        width: 800,
        height: 600,
        format: 'webp',
        quality: 75
      }),
      alt: image.alternativeText || `Image ${index + 1}`,
      loading: index < 3 ? 'eager' as const : 'lazy' as const,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    }
  }

  /**
   * Get thumbnail image props
   */
  const getThumbnailProps = (
    image: ProductImage,
    size: number = 150
  ) => {
    return {
      src: getStrapiImageUrl(image, {
        width: size,
        height: size,
        format: 'webp',
        quality: 70
      }),
      alt: image.alternativeText || 'Thumbnail',
      width: size,
      height: size,
      loading: 'lazy' as const
    }
  }

  /**
   * Preload critical images
   */
  const preloadImage = (
    src: string,
    options: {
      width?: number
      height?: number
      format?: 'webp' | 'jpg' | 'png'
    } = {}
  ) => {
    const optimizedUrl = getOptimizedUrl(src, options)
    
    // Create preload link
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = optimizedUrl
    document.head.appendChild(link)
  }

  return {
    getOptimizedUrl,
    getResponsiveSrcSet,
    getStrapiImageUrl,
    getHeroBackgroundStyles,
    getCardImageProps,
    getGalleryImageProps,
    getThumbnailProps,
    preloadImage
  }
}
