// =====================================
// BASE TYPES
// =====================================

/**
 * Base entity interface for all Strapi entities
 * @description Standard fields present in all Strapi content types
 */
export interface BaseEntity {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

/**
 * Generic API response wrapper
 * @template T The data type being returned
 */
export interface ApiResponse<T = unknown> {
  data: T
  meta?: {
    pagination?: PaginationMeta
    [key: string]: unknown
  }
  error?: ApiError
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface MediaFile {
  id: number
  url: string
  alternativeText?: string
  name?: string
  width?: number
  height?: number
}

export interface Category extends BaseEntity {
  name: string
  slug: string
  description: string | null
  image?: MediaFile
}

export interface Menu extends BaseEntity {
  name: string
  description: string
  isActive: boolean
  image?: MediaFile
  products: Product[]
}

export interface Ingredient {
  id: number
  name: string
  isAllergen?: boolean
}

export interface Product extends BaseEntity {
  name: string
  description?: string | null
  price: number
  available?: boolean | null
  slug: string
  isVegetarian?: boolean | null
  isVegan?: boolean | null
  isGlutenFree?: boolean | null
  isNew?: boolean | null
  isPopular?: boolean | null
  preparationTime?: number | null
  images?: MediaFile[]
  ingredients?: Ingredient[]
  category?: Pick<Category, 'id' | 'name' | 'slug'>
}

// Event types
export interface EventService extends BaseEntity {
  title: string
  description: string
  icon: string
  features: string[]
  minGuests?: number
  maxGuests?: number
  price?: number
  duration?: number
}

export interface Coverage extends BaseEntity {
  department: string
  description: string
  color: string
  cities: string[]
}

// Local partners types
export interface LocalPartner extends BaseEntity {
  name: string
  description: string
  address: string
  specialty: string
  partnerSince: string
  logo?: MediaFile
  isExclusive: boolean
  contactInfo?: {
    phone?: string
    email?: string
    website?: string
  }
}

// Hero section types
export interface HeroContent {
  title: string
  description: string
  badge?: {
    text: string
    icon: string
  }
  links: Array<{
    label: string
    to: string
    icon?: string
    trailingIcon?: string
    variant?: string
    color?: string
    size?: string
  }>
}

// Contact form types
export interface ContactForm {
  name: string
  email: string
  phone?: string
  eventType?: string
  guestCount?: number
  eventDate?: string
  location?: string
  message: string
}

// API Response types
export interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface ApiError {
  message: string
  status?: number
  details?: Record<string, unknown>
}

// Filter types
export interface ProductFilters {
  category?: number | null
  maxPrice?: number
  vegetarian?: boolean
  vegan?: boolean
  glutenFree?: boolean
  available?: boolean
  isNew?: boolean
  isPopular?: boolean
}
