<template>
  <UContainer class="pb-12">
    <!-- Mobile: Liste verticale -->
    <div class="md:hidden space-y-4">
      <MenuProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :product-badge="getProductBadge(product)"
        class="w-full"
        @add-to-cart="handleAddToCart"
      />
    </div>

    <!-- Desktop: Grille -->
    <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <MenuProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :product-badge="getProductBadge(product)"
        @add-to-cart="handleAddToCart"
      />
    </div>

    <!-- Toast de confirmation -->
    <div
      v-if="showAddedToast"
      class="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div class="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
        <UIcon
          name="i-lucide-check"
          class="w-4 h-4"
        />
        <span class="text-sm font-medium">Ajouté au panier !</span>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { Product, ProductBadge } from '~/types'

interface Props {
  products: Product[]
  getProductBadge: (product: Product) => ProductBadge | null
}

interface Emits {
  'add-to-cart': [product: Product]
}

defineProps<Props>()
const emit = defineEmits<Emits>()

// Toast feedback pour mobile
const showAddedToast = ref(false)

const handleAddToCart = (product: Product) => {
  emit('add-to-cart', product)

  // Feedback visuel sur mobile
  if (import.meta.client && window.innerWidth < 768) {
    showAddedToast.value = true

    // Vibration tactile si supportée
    if ('vibrate' in navigator) {
      navigator.vibrate(100)
    }

    setTimeout(() => {
      showAddedToast.value = false
    }, 2000)
  }
}
</script>
