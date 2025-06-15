import { defineStore } from 'pinia'
import type { Product, CartItem } from '~/types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isOpen: false
  }),

  hydrate(state) {
    // Hydratation côté client seulement
    if (import.meta.client) {
      const savedCart = localStorage.getItem('food-truck-cart')
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)
          state.items = parsedCart.items || []
        } catch (error) {
          console.warn('Erreur lors de la récupération du panier:', error)
        }
      }
    }
  },

  getters: {
    itemCount: state => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: state => state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0),
    isEmpty: state => state.items.length === 0
  },

  actions: {
    // Méthode privée pour sauvegarder en localStorage
    _saveToStorage() {
      if (import.meta.client) {
        try {
          localStorage.setItem('food-truck-cart', JSON.stringify({
            items: this.items,
            lastUpdated: new Date().toISOString()
          }))
        } catch (error) {
          console.warn('Erreur lors de la sauvegarde du panier:', error)
        }
      }
    },

    addItem(product: Product, quantity: number = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          id: Date.now().toString(),
          product,
          quantity,
          addedAt: new Date()
        })
      }
      this._saveToStorage()
    },

    removeItem(itemId: string) {
      const index = this.items.findIndex(item => item.id === itemId)
      if (index > -1) {
        this.items.splice(index, 1)
        this._saveToStorage()
      }
    },

    updateQuantity(itemId: string, quantity: number) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(itemId)
        } else {
          item.quantity = quantity
          this._saveToStorage()
        }
      }
    },

    clear() {
      this.items = []
      this._saveToStorage()
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    }
  }
})
