import type { CartItem, OrderSummary, OrderContact, OrderAction } from '~/types'

export const useCartOrder = () => {
  const cartStore = useCartStore()
  const { formatPrice } = useFormatting()
  
  // Configuration du restaurant
  const orderConfig = ref({
    restaurantName: 'Food Truck Gourmet',
    restaurantPhone: '+33123456789',
    minimumOrder: 0,
    deliveryFee: 0
  })

  // Génère le message de commande formaté
  const generateOrderMessage = (items: CartItem[], contact?: OrderContact): string => {
    const restaurantName = orderConfig.value.restaurantName
    const total = cartStore.totalPrice
    
    let message = `🍔 Nouvelle commande - ${restaurantName}\n\n`
    
    // Informations de contact si fournies
    if (contact) {
      message += `👤 Client: ${contact.name}\n`
      message += `📞 Téléphone: ${contact.phone}\n`
      if (contact.email) {
        message += `📧 Email: ${contact.email}\n`
      }
      message += '\n'
    }
    
    // Liste des articles
    message += '📋 Commande:\n'
    items.forEach((item) => {
      const itemTotal = item.product.price * item.quantity
      message += `• ${item.quantity}x ${item.product.name} - ${formatPrice(itemTotal)}\n`
      if (item.notes) {
        message += `  Note: ${item.notes}\n`
      }
    })
    
    message += '\n'
    message += `💰 Total: ${formatPrice(total)}\n`
    message += `📦 Nombre d'articles: ${cartStore.itemCount}\n\n`
    message += `📅 Commande passée le ${new Date().toLocaleString('fr-FR')}`
    
    return message
  }

  // Copie le message dans le presse-papier
  const copyOrderMessage = async (message: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(message)
      return true
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
      return false
    }
  }

  // Génère l'URL SMS
  const generateSMSUrl = (message: string, phoneNumber?: string): string => {
    const phone = phoneNumber || orderConfig.value.restaurantPhone
    const encodedMessage = encodeURIComponent(message)
    return `sms:${phone}?body=${encodedMessage}`
  }

  // Génère l'URL téléphone
  const generatePhoneUrl = (phoneNumber?: string): string => {
    const phone = phoneNumber || orderConfig.value.restaurantPhone
    return `tel:${phone}`
  }

  // Exécute une action de commande
  const executeOrderAction = async (
    action: OrderAction,
    contact?: OrderContact
  ): Promise<{ success: boolean, message?: string }> => {
    if (cartStore.isEmpty) {
      return { success: false, message: 'Le panier est vide' }
    }

    const orderMessage = generateOrderMessage(cartStore.items, contact)

    switch (action) {
      case 'copy': {
        const copied = await copyOrderMessage(orderMessage)
        return {
          success: copied,
          message: copied ? 'Message copié!' : 'Erreur lors de la copie'
        }
      }
      case 'sms': {
        const smsUrl = generateSMSUrl(orderMessage, contact?.phone)
        window.open(smsUrl, '_blank')
        return { success: true, message: 'SMS ouvert' }
      }
      case 'call': {
        const phoneUrl = generatePhoneUrl(contact?.phone)
        window.open(phoneUrl, '_blank')
        return { success: true, message: 'Appel en cours...' }
      }
      default:
        return { success: false, message: 'Action non reconnue' }
    }
  }

  // Génère le résumé de commande
  const getOrderSummary = (contact?: OrderContact): OrderSummary => {
    return {
      items: cartStore.items,
      total: cartStore.totalPrice,
      itemCount: cartStore.itemCount,
      formattedMessage: generateOrderMessage(cartStore.items, contact),
      phoneNumber: contact?.phone || orderConfig.value.restaurantPhone
    }
  }

  return {
    orderConfig: readonly(orderConfig),
    generateOrderMessage,
    copyOrderMessage,
    generateSMSUrl,
    generatePhoneUrl,
    executeOrderAction,
    getOrderSummary
  }
}
