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
        icon="i-lucide-shopping-cart"
        title="Panier vide"
        description="Ajoutez des plats pour commencer votre commande"
      >
        <UButton
          color="primary"
          label="Voir le menu"
          @click="navigateToMenu"
        />
      </div>

      <!-- Liste des articles -->
      <div
        v-else
        class="space-y-4"
      >
        <CartItem
          v-for="item in cartStore.items"
          :key="item.id"
          :item="item"
          @update-quantity="updateQuantity"
          @remove="removeItem"
        />
      </div>
    </template>

    <template
      v-if="!cartStore.isEmpty"
      #footer
    >
      <div class="space-y-3">
        <!-- Total -->
        <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
