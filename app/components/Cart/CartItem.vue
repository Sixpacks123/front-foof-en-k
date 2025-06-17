<template>
  <div class="flex items-start space-x-3 p-3 sm:p-4 sm:space-x-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
    <!-- Image du produit -->
    <div class="relative flex-shrink-0">
      <div class="relative overflow-hidden rounded-lg">
        <img
          v-if="item.product.images && item.product.images.length > 0"
          :src="getImageUrl(item.product.images[0]!, 'thumbnail')"
          :alt="item.product.name"
          class="w-12 h-12 sm:w-16 sm:h-16 object-cover"
        >
        <div
          v-else
          class="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"
        >
          <UIcon
            name="i-lucide-utensils"
            class="w-4 h-4 sm:w-6 sm:h-6 text-neutral-400"
          />
        </div>
      </div>

      <!-- Badge de quantité -->
      <div class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 min-w-[1.25rem] h-5 sm:min-w-[1.5rem] sm:h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm border-2 border-white dark:border-neutral-900">
        {{ item.quantity }}
      </div>
    </div>

    <!-- Détails du produit -->
    <div class="flex-1 min-w-0">
      <div class="flex justify-between items-start mb-2">
        <div class="flex-1 pr-1 sm:pr-2">
          <h4 class="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white line-clamp-1">
            {{ item.product.name }}
          </h4>
          <p
            v-if="productDescription"
            class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1 max-w-[160px] sm:max-w-[200px] overflow-hidden text-ellipsis"
          >
            {{ productDescription }}
          </p>
        </div>

        <!-- Bouton supprimer -->
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          size="2xs"
          class="min-w-[28px] min-h-[28px] sm:min-w-[32px] sm:min-h-[32px]"
          @click="$emit('remove', item.id)"
        />
      </div>

      <!-- Prix et badges -->
      <div class="flex items-center justify-between mb-2 sm:mb-3">
        <div class="flex items-center space-x-2">
          <span class="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
            {{ formatPrice(item.product.price) }}
          </span>
          <div class="flex items-center space-x-1">
            <UBadge
              v-if="item.product.isVegetarian"
              color="success"
              variant="soft"
              size="xs"
            >
              🌱 <span class="hidden sm:inline">Végé</span>
            </UBadge>
            <UBadge
              v-if="item.product.isVegan"
              color="success"
              variant="soft"
              size="xs"
            >
              🌿 <span class="hidden sm:inline">Vegan</span>
            </UBadge>
          </div>
        </div>
      </div>

      <!-- Notes personnalisées -->
      <div
        v-if="item.notes"
        class="mb-2 sm:mb-3 p-2 sm:p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
      >
        <div class="flex items-start space-x-2">
          <UIcon
            name="i-lucide-sticky-note"
            class="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
          />
          <span class="text-xs text-amber-800 dark:text-amber-200 font-medium">{{ item.notes }}</span>
        </div>
      </div>

      <!-- Contrôles de quantité et total -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-1 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1">
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-minus"
            size="2xs"
            :disabled="item.quantity <= 1"
            class="rounded-full min-w-[32px] min-h-[32px] active:scale-95 transition-transform"
            @click="updateQuantity(item.quantity - 1)"
          />
          <span class="text-sm font-bold min-w-[2rem] sm:min-w-[2.5rem] text-center px-1 sm:px-2 py-1">
            {{ item.quantity }}
          </span>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-plus"
            size="2xs"
            class="rounded-full min-w-[32px] min-h-[32px] active:scale-95 transition-transform"
            @click="updateQuantity(item.quantity + 1)"
          />
        </div>

        <!-- Total -->
        <div class="text-right">
          <div class="text-sm sm:text-base font-bold text-primary">
            {{ formatPrice(itemTotal) }}
          </div>
          <div class="text-xs text-neutral-400">
            {{ item.quantity }} × {{ formatPrice(item.product.price) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types'

interface Props {
  item: CartItem
}

interface Emits {
  (e: 'update-quantity', itemId: string, quantity: number): void
  (e: 'remove', itemId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Composables
const { formatPrice } = useFormatting()
const { getImageUrl } = useStrapiImage()

// Computed
const itemTotal = computed(() => props.item.product.price * props.item.quantity)

const productDescription = computed(() => {
  const description = props.item.product.description

  if (!description) return null

  // Si c'est une chaîne, la retourner directement
  if (typeof description === 'string') {
    return description
  }

  // Si c'est un tableau de RichTextBlock, extraire le texte
  if (Array.isArray(description)) {
    return description
      .map((block) => {
        if (block.type === 'paragraph' && block.children) {
          return block.children
            .filter(child => child.type === 'text')
            .map(child => child.text)
            .join('')
        }
        return ''
      })
      .join(' ')
      .trim() || null
  }

  return null
})

// Methods
const updateQuantity = (newQuantity: number) => {
  if (newQuantity < 1) return
  emit('update-quantity', props.item.id, newQuantity)
}
</script>
