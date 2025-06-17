<template>
  <div
    ref="containerRef"
    class="relative overflow-hidden rounded-lg"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <!-- Background de suppression -->
    <div
      class="absolute inset-0 bg-red-500 flex items-center justify-end pr-4 z-0"
      :class="{ 'opacity-0': swipeX >= -30, 'opacity-100': swipeX < -30 }"
    >
      <div class="flex items-center space-x-2 text-white">
        <UIcon
          name="i-lucide-trash-2"
          class="w-4 h-4"
        />
        <span class="text-sm font-medium">Supprimer</span>
      </div>
    </div>

    <!-- CartItem avec transformation -->
    <div
      ref="itemRef"
      class="relative z-10 transition-transform duration-200 ease-out"
      :style="{
        transform: `translateX(${Math.max(swipeX, -120)}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }"
    >
      <CartItem
        :item="item"
        @update-quantity="(itemId, quantity) => $emit('update-quantity', itemId, quantity)"
        @remove="(itemId) => $emit('remove', itemId)"
      />
    </div>

    <!-- Indicateur de swipe -->
    <div
      v-if="swipeX < -20"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none"
    >
      <div
        class="bg-white dark:bg-neutral-800 rounded-full p-1.5 shadow border border-red-200"
        :class="{
          'animate-pulse': swipeX < -60,
          'scale-105': swipeX < -60
        }"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="w-3 h-3 text-red-500"
        />
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
  (e: 'remove' | 'swipe-delete', itemId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Refs
const containerRef = ref<HTMLElement>()
const itemRef = ref<HTMLElement>()

// État du swipe
const swipeX = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const startTime = ref(0)

// Touch handlers
const handleTouchStart = (e: TouchEvent) => {
  startDrag(e.touches[0].clientX)
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  e.preventDefault()
  updateDrag(e.touches[0].clientX)
}

const handleTouchEnd = () => {
  endDrag()
}

// Mouse handlers (pour desktop)
const handleMouseDown = (e: MouseEvent) => {
  startDrag(e.clientX)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  e.preventDefault()
  updateDrag(e.clientX)
}

const handleMouseUp = () => {
  endDrag()
}

// Logique de drag
const startDrag = (clientX: number) => {
  isDragging.value = true
  startX.value = clientX
  startTime.value = Date.now()
}

const updateDrag = (clientX: number) => {
  if (!isDragging.value) return
  
  const deltaX = clientX - startX.value
  // Permettre seulement le swipe vers la gauche et limiter la distance
  swipeX.value = Math.min(0, Math.max(deltaX, -120))
}

const endDrag = () => {
  if (!isDragging.value) return
  
  const deltaTime = Date.now() - startTime.value
  const velocity = Math.abs(swipeX.value) / deltaTime
  
  // Décider si on supprime ou on remet en place
  const shouldDelete = swipeX.value < -60 || (swipeX.value < -30 && velocity > 0.5)
  
  if (shouldDelete) {
    // Animation de suppression
    swipeX.value = -200
    setTimeout(() => {
      emit('swipe-delete', props.item.id)
    }, 200)
  } else {
    // Retour en position
    swipeX.value = 0
  }
  
  isDragging.value = false
}

// Reset position si l'item change
watch(() => props.item.id, () => {
  swipeX.value = 0
  isDragging.value = false
})
</script>

<style scoped>
/* Désactiver la sélection de texte pendant le drag */
.dragging {
  user-select: none;
  -webkit-user-select: none;
}

/* Smooth scroll pour la liste */
:deep(.scroll-smooth) {
  scroll-behavior: smooth;
}
</style>
