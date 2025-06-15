/**
 * Composable for optimized Strapi image handling
 * Provides consistent image optimization across the application
 */

import type { ProductImage } from '~/types'

export const useStrapiImage = () => {
  /**
   * Get the best image URL based on the desired breakpoint
   */
  const getImageUrl = (
    image: ProductImage,
    breakpoint: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'
  ): string => {
    // Try to get the requested format
    const format = image.formats?.[breakpoint]
    if (format) {
      return format.url
    }
    
    // Fallback to original image URL
    return image.url
  }

  /**
   * Get optimized image props for different use cases
   */
  const getImageProps = (
    image: ProductImage,
    alt: string,
    breakpoint: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'
  ) => {
    return {
      provider: 'strapi' as const,
      src: getImageUrl(image, breakpoint),
      alt: alt || image.alternativeText || 'Image',
      loading: 'lazy' as const
    }
  }

  /**
   * Get responsive sizes for different layouts
   */
  const getResponsiveSizes = (layout: 'card' | 'hero' | 'gallery' | 'thumbnail') => {
    const sizeMap = {
      card: 'sm:100vw md:50vw lg:33vw xl:25vw',
      hero: '100vw',
      gallery: 'sm:50vw md:33vw lg:25vw',
      thumbnail: '(max-width: 768px) 100px, 150px'
    }
    
    return sizeMap[layout]
  }

  /**
   * Get optimized image props with responsive sizes
   */
  const getOptimizedImageProps = (
    image: ProductImage,
    alt: string,
    layout: 'card' | 'hero' | 'gallery' | 'thumbnail' = 'card',
    breakpoint: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'
  ) => {
    return {
      ...getImageProps(image, alt, breakpoint),
      sizes: getResponsiveSizes(layout)
    }
  }

  /**
   * Check if image URL is from Strapi
   */
  const isStrapiImage = (url?: string) => {
    if (!url) return false
    
    // Check if it's a relative path (Strapi uploads) or contains the Strapi URL
    return url.startsWith('/uploads/') || url.includes('/uploads/')
  }

  /**
   * Get the best breakpoint based on container size
   */
  const getBreakpointForSize = (containerWidth: number): 'thumbnail' | 'small' | 'medium' | 'large' => {
    if (containerWidth <= 150) return 'thumbnail'
    if (containerWidth <= 500) return 'small'
    if (containerWidth <= 750) return 'medium'
    return 'large'
  }

  /**
   * Get available image formats for an image
   */
  const getAvailableFormats = (image: ProductImage): string[] => {
    const formats: string[] = []
    if (image.formats?.thumbnail) formats.push('thumbnail')
    if (image.formats?.small) formats.push('small')
    if (image.formats?.medium) formats.push('medium')
    if (image.formats?.large) formats.push('large')
    formats.push('original')
    return formats
  }

  return {
    getImageUrl,
    getImageProps,
    getResponsiveSizes,
    getOptimizedImageProps,
    isStrapiImage,
    getBreakpointForSize,
    getAvailableFormats
  }
}
