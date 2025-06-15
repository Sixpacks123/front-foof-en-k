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
 * Info banner data from Strapi
 */
export interface Info extends BaseEntity {
  title: string
  message: string
  description?: string
  type: 'info' | 'warning' | 'error' | 'success'
  isActive: boolean
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

/**
 * Menu entity from Strapi
 */
export interface Menu extends BaseEntity {
  name: string
  description: string | null
  isActive: boolean
  products?: Product[]
}

/**
 * Product category
 */
export interface Category extends BaseEntity {
  name: string
  description: string | null
}

/**
 * Product ingredient
 */
export interface Ingredient extends BaseEntity {
  name: string
  isAllergen: boolean
}

/**
 * Strapi image format for responsive images
 */
export interface StrapiImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

/**
 * Strapi image formats object
 */
export interface StrapiImageFormats {
  thumbnail?: StrapiImageFormat
  small?: StrapiImageFormat
  medium?: StrapiImageFormat
  large?: StrapiImageFormat
}

/**
 * Product image from Strapi v5
 */
export interface ProductImage extends BaseEntity {
  name: string
  alternativeText?: string | null
  caption?: string | null
  width: number
  height: number
  formats: StrapiImageFormats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string | null
  provider: string
  provider_metadata?: Record<string, unknown> | null
}

/**
 * Product entity from Strapi
 */
export interface Product extends BaseEntity {
  name: string
  description: string | null
  price: number
  available: boolean
  isVegetarian?: boolean
  isVegan?: boolean
  category?: Category
  ingredients?: Ingredient[]
  images?: ProductImage[]
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

// Menu specific filter types
export interface MenuFilters {
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
  available: boolean
  isNew: boolean
  isPopular: boolean
}

// Badge types
export interface ProductBadge {
  label: string
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
}

// =====================================
// BANNER/ALERT TYPES
// =====================================

/**
 * Single alert item from Strapi
 */
export interface Alert extends BaseEntity {
  title: string
  description: string
  icon: string
  color: 'error' | 'warning' | 'info' | 'success'
  isActive: boolean
}

/**
 * Banner configuration from Strapi
 */
export interface Banner extends BaseEntity {
  title: string
  icon: string
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  isActive: boolean
  alerts?: Alert[]
}

/**
 * Client-side banner data structure
 */
export interface BannerData {
  icon: string
  title: string
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  alerts: Alert[]
}

/**
 * Gallery image interface
 */
export interface GalleryImage {
  id: number
  url: string
  alt: string
  title?: string
  description?: string
}

/**
 * Gallery image from Strapi (extends BaseEntity)
 */
export interface StrapiGalleryImage extends BaseEntity {
  url: string
  alt: string
  title?: string
  description?: string
}

// =====================================
// CART TYPES
// =====================================

/**
 * Cart item represents a product in the cart with quantity
 */
export interface CartItem {
  id: string // unique identifier for the cart item
  product: Product
  quantity: number
  notes?: string // optional notes for the item
  addedAt: Date
}

/**
 * Cart state interface
 */
export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Cart store state interface
 */
export interface CartStore {
  items: CartItem[]
  isOpen: boolean
}

/**
 * Order summary for SMS/phone
 */
export interface OrderSummary {
  items: CartItem[]
  total: number
  itemCount: number
  formattedMessage: string
  phoneNumber?: string
}

/**
 * Contact information for order
 */
export interface OrderContact {
  name: string
  phone: string
  email?: string
  notes?: string
}

/**
 * Order action types
 */
export type OrderAction = 'call' | 'sms' | 'copy'

/**
 * Order summary configuration
 */
export interface OrderConfig {
  restaurantName: string
  restaurantPhone: string
  minimumOrder?: number
  deliveryFee?: number
}

/**
 * Order summary item for display
 */
export interface OrderSummaryItem {
  name: string
  price: number
  quantity: number
  total: number
}

/**
 * Complete order summary
 */
export interface CompleteOrderSummary {
  items: OrderSummaryItem[]
  total: number
  itemCount: number
}
