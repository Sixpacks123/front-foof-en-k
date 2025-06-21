<template>
  <UDrawer
    v-model:open="cartStore.isOpen"
    direction="right"
    title="Panier"
    :description="cartDescription"
    :handle="false"
    :dismissible="true"
    :modal="true"
  >
    <!-- Trigger (invisible car contrôlé par le store) -->
    <div class="hidden" />

    <template #body>
      <!-- État vide -->
      <div
        v-if="cartStore.isEmpty"
        class="flex flex-col items-center justify-center py-12 text-center"
      >
        <UIcon
          name="i-lucide-shopping-cart"
          class="w-16 h-16 text-neutral-300 dark:text-neutral-600 mb-4"
        />
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          Panier vide
        </h3>
        <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          Ajoutez des plats pour commencer votre commande
        </p>
        <UButton
          color="primary"
          icon="i-lucide-utensils"
          @click="navigateToMenu"
        >
          Voir le menu
        </UButton>
      </div>

      <!-- Liste des articles -->
      <div
        v-else
        class="space-y-4"
      >
        <!-- Articles avec swipe-to-delete intégré -->
        <div class="space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="relative overflow-hidden rounded-lg"
            @touchstart="(e) => handleTouchStart(e, item.id)"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
          >
            <!-- Background de suppression -->
            <div
              v-if="swipeState.itemId === item.id && swipeState.x < -20"
              class="absolute inset-0 bg-red-500 flex items-center justify-end pr-4 z-0"
            >
              <div class="flex items-center space-x-2 text-white">
                <UIcon
                  name="i-lucide-trash-2"
                  class="w-4 h-4"
                />
                <span class="text-sm">Supprimer</span>
              </div>
            </div>

            <!-- CartItem avec transformation -->
            <div
              class="relative z-10 transition-transform duration-200"
              :style="{
                transform: swipeState.itemId === item.id ? `translateX(${Math.max(swipeState.x, -100)}px)` : 'translateX(0px)'
              }"
            >
              <CartItem
                :item="item"
                @update-quantity="updateQuantity"
                @remove="removeItem"
              />
            </div>
          </div>
        </div>

        <!-- Bouton pour ajouter d'autres produits -->
        <div class="pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <UButton
            block
            variant="outline"
            color="primary"
            icon="i-lucide-plus"
            @click="navigateToMenu"
          >
            Ajouter d'autres produits
          </UButton>
        </div>
      </div>
    </template>

    <template
      v-if="!cartStore.isEmpty"
      #footer
    >
      <div class="space-y-3">
        <!-- Total -->
        <div class="flex justify-between items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          <span class="text-lg font-semibold">Total</span>
          <span class="text-xl font-bold text-primary">{{ formatPrice(cartStore.totalPrice) }}</span>
        </div>

        <!-- Actions principales -->
        <div class="grid grid-cols-2 gap-3">
          <UButton
            block
            color="primary"
            icon="i-lucide-phone-call"
            :loading="actionLoading === 'call'"
            @click="handleOrderAction('call')"
          >
            Appeler
          </UButton>
          <UButton
            block
            color="success"
            icon="i-lucide-message-circle"
            :loading="actionLoading === 'sms'"
            @click="handleOrderAction('sms')"
          >
            SMS
          </UButton>
        </div>

        <!-- Action copier -->
        <UButton
          block
          variant="outline"
          :icon="copied ? 'i-lucide-check' : 'i-lucide-clipboard'"
          :loading="actionLoading === 'copy'"
          @click="handleOrderAction('copy')"
        >
          {{ copied ? 'Copié !' : 'Copier la commande' }}
        </UButton>

        <!-- Vider le panier -->
        <UButton
          block
          color="error"
          variant="ghost"
          icon="i-lucide-trash-2"
          size="sm"
          @click="clearCart"
        >
          Vider le panier
        </UButton>
      </div>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import type { OrderAction } from '~/types'

const cartStore = useCartStore()
const router = useRouter()
const toast = useToast()

// Composables
const { formatPrice } = useFormatting()
const { executeOrderAction } = useCartOrder()

// État local
const actionLoading = ref<OrderAction | null>(null)
const copied = ref(false)

// État du swipe
const swipeState = ref({
  itemId: null as string | null,
  x: 0,
  startX: 0,
  isDragging: false
})

// Computed properties
const cartDescription = computed(() => {
  if (cartStore.isEmpty) return 'Aucun article'
  return `${cartStore.itemCount} article${cartStore.itemCount > 1 ? 's' : ''} • ${formatPrice(cartStore.totalPrice)}`
})

// Mise à jour de la quantité d'un article
const updateQuantity = (itemId: string, quantity: number) => {
  cartStore.updateQuantity(itemId, quantity)
}

// Suppression d'un article
const removeItem = (itemId: string) => {
  cartStore.removeItem(itemId)
  toast.add({
    title: 'Article supprimé',
    description: 'L\'article a été retiré de votre panier',
    color: 'warning'
  })
}

// Gestion du swipe
const handleTouchStart = (e: TouchEvent, itemId: string) => {
  if (!e.touches?.[0]) return
  swipeState.value = {
    itemId,
    x: 0,
    startX: e.touches[0].clientX,
    isDragging: true
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (!swipeState.value.isDragging || !swipeState.value.itemId || !e.touches?.[0]) return

  e.preventDefault()
  const deltaX = e.touches[0].clientX - swipeState.value.startX
  swipeState.value.x = Math.min(0, deltaX)
}

const handleTouchEnd = () => {
  if (!swipeState.value.isDragging || !swipeState.value.itemId) return

  const shouldDelete = swipeState.value.x < -60

  if (shouldDelete) {
    const itemId = swipeState.value.itemId
    const item = cartStore.items.find(i => i.id === itemId)

    // Suppression directe sans passer par removeItem pour éviter le doublon
    cartStore.removeItem(itemId)

    toast.add({
      title: '🗑️ Supprimé par swipe',
      description: `${item?.product.name || 'Article'} retiré du panier`,
      color: 'error'
    })
  }

  // Reset state
  swipeState.value = {
    itemId: null,
    x: 0,
    startX: 0,
    isDragging: false
  }
}

// Navigation vers le menu
const navigateToMenu = () => {
  cartStore.toggleCart()
  router.push('/menus')
}

// Gestion des actions de commande
const handleOrderAction = async (action: OrderAction) => {
  if (cartStore.isEmpty) return

  actionLoading.value = action

  try {
    const result = await executeOrderAction(action)

    if (action === 'copy' && result.success) {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }

    toast.add({
      title: result.success ? 'Succès' : 'Erreur',
      description: result.message || 'Action réalisée',
      color: result.success ? 'success' : 'error'
    })
  } catch (error) {
    console.error('Erreur lors de l\'action:', error)
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue',
      color: 'error'
    })
  } finally {
    actionLoading.value = null
  }
}

// Vider le panier directement
const clearCart = () => {
  cartStore.clear()

  toast.add({
    title: 'Panier vidé',
    description: 'Tous les articles ont été supprimés',
    color: 'success'
  })
}
</script>
