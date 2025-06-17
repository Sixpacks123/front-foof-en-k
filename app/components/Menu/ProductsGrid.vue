<template>
  <UContainer class="pb-12">
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      <MenuProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :product-badge="getProductBadge(product)"
        @add-to-cart="$emit('add-to-cart', $event)"
      />
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
defineEmits<Emits>()
</script>
