/**
 * Formatting utilities
 * @description Provides consistent formatting functions for the application
 */
export const useFormatting = () => {
  // =====================================
  // PRICE FORMATTING
  // =====================================
  
  const formatPrice = (price: number, currency = '€', locale = 'fr-FR'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency === '€' ? 'EUR' : currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  // =====================================
  // DATE FORMATTING
  // =====================================
  
  const formatDate = (date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    if (isNaN(dateObj.getTime())) {
      return 'Date invalide'
    }

    switch (format) {
      case 'short':
        return dateObj.toLocaleDateString('fr-FR')
      case 'long':
        return dateObj.toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      case 'relative':
        return getRelativeTime(dateObj)
      default:
        return dateObj.toLocaleDateString('fr-FR')
    }
  }

  const getRelativeTime = (date: Date): string => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'À l\'instant'
    if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} minutes`
    if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)} heures`
    if (diffInSeconds < 2592000) return `Il y a ${Math.floor(diffInSeconds / 86400)} jours`
    
    return formatDate(date, 'short')
  }

  // =====================================
  // TEXT FORMATTING
  // =====================================
  
  const formatPhone = (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '')
    
    // Format for French numbers
    if (cleaned.length === 10 && cleaned.startsWith('0')) {
      return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
    }
    
    return phone
  }

  const truncateText = (text: string, maxLength: number, suffix = '...'): string => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - suffix.length) + suffix
  }

  const capitalizeFirst = (text: string): string => {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()
  }

  // =====================================
  // NUMBER FORMATTING
  // =====================================
  
  const formatNumber = (num: number, locale = 'fr-FR'): string => {
    return new Intl.NumberFormat(locale).format(num)
  }

  const formatPercentage = (value: number, decimals = 0): string => {
    return `${(value * 100).toFixed(decimals)}%`
  }

  // =====================================
  // FILE SIZE FORMATTING
  // =====================================
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  // =====================================
  // COLOR UTILITIES
  // =====================================
  
  const hexToRgb = (hex: string): { r: number, g: number, b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1]!, 16),
          g: parseInt(result[2]!, 16),
          b: parseInt(result[3]!, 16)
        }
      : null
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  }

  // =====================================
  // VALIDATION FORMATTING
  // =====================================
  
  const formatValidationError = (field: string, errors: string[]): string => {
    if (errors.length === 0) return ''
    if (errors.length === 1) return errors[0]!
    
    return `${field}: ${errors.join(', ')}`
  }

  const formatValidationSummary = (errors: Record<string, string[]>): string[] => {
    const summary: string[] = []
    
    for (const [field, fieldErrors] of Object.entries(errors)) {
      if (fieldErrors.length > 0) {
        summary.push(formatValidationError(field, fieldErrors))
      }
    }
    
    return summary
  }

  // =====================================
  // URL FORMATTING
  // =====================================
  
  const ensureHttps = (url: string): string => {
    if (!url) return ''
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return `https://${url}`
  }

  const extractDomain = (url: string): string => {
    try {
      const urlObj = new URL(ensureHttps(url))
      return urlObj.hostname
    } catch {
      return url
    }
  }

  return {
    // Price
    formatPrice,
    
    // Date
    formatDate,
    getRelativeTime,
    
    // Text
    formatPhone,
    truncateText,
    capitalizeFirst,
    slugify,
    
    // Number
    formatNumber,
    formatPercentage,
    
    // File
    formatFileSize,
    
    // Color
    hexToRgb,
    rgbToHex,
    
    // Validation
    formatValidationError,
    formatValidationSummary,
    
    // URL
    ensureHttps,
    extractDomain
  }
}
