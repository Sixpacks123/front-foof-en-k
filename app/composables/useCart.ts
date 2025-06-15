import type { Product } from '~/types'

export const useCart = () => {
  const cartStore = useCartStore()
  const toast = useToast()

  const addToCart = (product: Product, quantity: number = 1) => {
    cartStore.addItem(product, quantity)
    toast.add({
      title: 'Produit ajouté',
      description: `${product.name} a été ajouté au panier`,
      color: 'success'
    })
  }

  const removeFromCart = (itemId: string) => {
    cartStore.removeItem(itemId)
    toast.add({
      title: 'Produit retiré',
      description: 'Le produit a été retiré du panier',
      color: 'warning'
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    cartStore.updateQuantity(itemId, quantity)
  }

  const clearCart = () => {
    cartStore.clear()
  }

  const toggleCart = () => {
    cartStore.toggleCart()
  }

  return {
    // State
    items: computed(() => cartStore.items),
    itemCount: computed(() => cartStore.itemCount),
    totalPrice: computed(() => cartStore.totalPrice),
    isEmpty: computed(() => cartStore.isEmpty),
    isOpen: computed(() => cartStore.isOpen),
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  }
}
