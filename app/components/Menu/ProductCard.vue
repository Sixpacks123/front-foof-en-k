<template>
  <div
    class="group relative dark:bg-neutral-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-700 flex flex-row md:flex-col h-full"
  >
    <!-- Product Content - Mobile first -->
    <div class="p-4 md:p-6 flex-1 flex flex-col order-1 md:order-2">
      <div class="flex-1">
        <h3 class="text-lg md:text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors line-clamp-2 md:truncate">
          {{ product.name }}
        </h3>
        <p
          v-if="descriptionText"
          class="text-sm mb-3 md:mb-4  "
        >
          {{ descriptionText }}
        </p>

        <!-- Price - Mobile visible -->
        <div class="md:hidden mb-3">
          <span class="text-lg font-bold text-primary-400">{{ product.price?.toFixed(2) }}€</span>
        </div>

        <!-- Ingredients - Now visible on mobile too -->
        <div class="flex flex-wrap gap-2 mb-4">
          <!-- Main ingredients -->
          <UBadge
            v-for="ingredient in mainIngredients.slice(0, 4)"
            :key="`ingredient-${ingredient.id}`"
            variant="outline"
            size="sm"
          >
            {{ ingredient.name }}
          </UBadge>

          <!-- Allergens -->
          <UBadge
            v-for="allergen in allergens.slice(0, 2)"
            :key="`allergen-${allergen.id}`"
            color="orange"
            variant="soft"
            size="sm"
          >
            <UIcon
              name="i-lucide-alert-triangle"
              class="w-3 h-3 mr-1"
            />
            {{ allergen.name }}
          </UBadge>

          <!-- Show remaining count if there are more ingredients -->
          <UBadge
            v-if="(product.ingredients?.length || 0) > 6"
            color="gray"
            variant="soft"
            size="sm"
          >
            +{{ (product.ingredients?.length || 0) - 6 }} autres
          </UBadge>
        </div>
      </div>

      <!-- Action Button - Always at bottom -->
      <UButton
        :disabled="!product.available"
        color="primary"
        size="md"
        class="w-full md:size-lg group-hover:scale-105 transition-transform mt-auto"
        @click="$emit('add-to-cart', product)"
      >
        <UIcon
          name="i-lucide-shopping-cart"
          class="w-4 h-4 mr-2"
        />
        {{ product.available ? 'Ajouter au panier' : 'Non disponible' }}
      </UButton>
    </div>

    <!-- Product Image - Mobile right side -->
    <div class="relative w-32 md:w-full md:aspect-[4/3] overflow-hidden order-2 md:order-1">
      <NuxtImg
        v-if="product.images?.[0]"
        v-bind="getOptimizedProductImage(product.images[0], product.name)"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div
        v-else
        class="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100 border-l md:border-l-0 md:border-b border-gray-200"
      >
        <UIcon
          name="i-lucide-chef-hat"
          class="w-8 md:w-12 h-8 md:h-12 mb-1 md:mb-2"
        />
        <span class="text-xs md:text-sm text-gray-500 font-medium text-center px-2">Photo bientôt disponible</span>
      </div>

      <!-- Badge overlay - Hidden on mobile -->
      <div
        v-if="productBadge"
        class="hidden md:block absolute top-3 right-3"
      >
        <UBadge
          :color="productBadge.color || 'primary'"
          variant="solid"
          class="shadow-lg"
        >
          {{ productBadge.label }}
        </UBadge>
      </div>

      <!-- Price overlay - Desktop only -->
      <div class="hidden md:block absolute bottom-3 left-3">
        <div class="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
          <span class="text-lg font-bold text-gray-900">{{ product.price?.toFixed(2) }}€</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, ProductImage, ProductBadge } from '~/types'

interface Props {
  product: Product
  productBadge?: ProductBadge | null
}

interface Emits {
  'add-to-cart': [product: Product]
}

const props = defineProps<Props>()
defineEmits<Emits>()

const { getCardImageProps } = useOptimizedImage()

/**
 * Get optimized image props for product cards
 */
const getOptimizedProductImage = (image: ProductImage, _productName: string) => {
  return getCardImageProps(image, 'medium')
}

/**
 * Get main ingredients (non-allergens) from product
 */
const mainIngredients = computed(() => {
  return props.product.ingredients?.filter(ingredient => !ingredient.isAllergen) || []
})

/**
 * Get allergens from product
 */
const allergens = computed(() => {
  return props.product.ingredients?.filter(ingredient => ingredient.isAllergen) || []
})

/**
 * Extract text from complex description structure
 */
const descriptionText = computed(() => {
  if (!props.product.description) return null

  // If it's already a string, return it directly
  if (typeof props.product.description === 'string') {
    return props.product.description === 'Un délicieux plat préparé avec des ingrédients frais et de qualité.'
      ? null
      : props.product.description
  }

  // If it's an array (rich text from Strapi)
  if (Array.isArray(props.product.description)) {
    const text = props.product.description
      .map((block) => {
        if (block.children && Array.isArray(block.children)) {
          return block.children
            .map(child => child.text || '')
            .join('')
            .trim()
        }
        return ''
      })
      .filter(text => text.length > 0)
      .join(' ')
      .trim()

    // Don't show generic description
    return text === 'Un délicieux plat préparé avec des ingrédients frais et de qualité.'
      ? null
      : text || null
  }

  return null
})
</script>
