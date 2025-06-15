<template>
  <div
    v-if="cartStore.itemCount >= 1"
    class="relative"
  >
    <UButton
      color="neutral"
      variant="outline"
      size="md"
      class="relative transition-all duration-200 hover:scale-105 active:scale-95"
      :class="{ 'animate-pulse': cartStore.itemCount > 0 && pulseEffect }"
      @click="toggleCart"
    >
      <template #leading>
        <UIcon
          name="i-lucide-shopping-cart"
          class="transition-transform duration-200"
          :class="cartStore.itemCount > 0 ? 'animate-bounce' : ''"
        />
      </template>

      <!-- Badge avec animation -->
      <Transition
        name="badge"
        mode="out-in"
      >
        <div
          v-if="cartStore.itemCount > 0"
          key="badge"
          class="absolute -top-2 -right-2 min-w-[1.25rem] h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-900 animate-pulse"
          :class="bounceClass"
        >
          {{ displayCount }}
        </div>
      </Transition>
    </UButton>

    <!-- Effet visuel lors de l'ajout d'article -->
    <Transition name="add-effect">
      <div
        v-if="showAddEffect"
        class="absolute inset-0 rounded-md bg-primary/20 pointer-events-none animate-ping"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()

// État pour les animations
const pulseEffect = ref(false)
const showAddEffect = ref(false)
const bounceClass = ref('')

// Computed pour l'affichage du badge
const displayCount = computed(() => {
  return cartStore.itemCount > 99 ? '99+' : cartStore.itemCount.toString()
})

// Watcher pour détecter l'ajout d'articles
const previousCount = ref(cartStore.itemCount)

watch(() => cartStore.itemCount, (newCount, oldCount) => {
  if (newCount > oldCount) {
    // Nouvel article ajouté - effet visuel
    showAddEffect.value = true
    bounceClass.value = 'animate-bounce'
    pulseEffect.value = true

    setTimeout(() => {
      showAddEffect.value = false
      bounceClass.value = ''
      pulseEffect.value = false
    }, 1000)
  }
  previousCount.value = newCount
})

// Toggle du panier avec feedback tactile
const toggleCart = () => {
  // Vibration tactile si supportée
  if ('vibrate' in navigator) {
    navigator.vibrate(50)
  }

  cartStore.toggleCart()
}

// Initialisation
onMounted(() => {
  previousCount.value = cartStore.itemCount
})
</script>

<style scoped>
/* Animations pour le badge */
.badge-enter-active,
.badge-leave-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.badge-enter-from {
  opacity: 0;
  transform: scale(0) rotate(180deg);
}

.badge-leave-to {
  opacity: 0;
  transform: scale(0) rotate(-180deg);
}

/* Animation pour l'effet d'ajout */
.add-effect-enter-active {
  transition: all 0.6s ease-out;
}

.add-effect-leave-active {
  transition: all 0.3s ease-in;
}

.add-effect-enter-from,
.add-effect-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
