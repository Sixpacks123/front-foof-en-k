export interface ContactFormData {
  name: string
  email: string
  phone?: string
  requestType: 'order' | 'event' | 'info' | 'other'
  message: string
  
  // Champs spécifiques aux événements
  eventType?: 'wedding' | 'corporate' | 'birthday' | 'festival' | 'inauguration' | 'seminar' | 'other'
  eventDate?: string
  eventTime?: string
  eventLocation?: string
  estimatedGuests?: number
  budget?: 'less-than-1000' | '1000-2000' | '2000-5000' | 'more-than-5000' | 'to-discuss'
  specificRequirements?: string
  hasAllergies?: boolean
  allergiesDetails?: string
}

export const useContactForm = () => {
  const isSubmitting = ref(false)
  const isSuccess = ref(false)
  const error = ref<string | null>(null)

  const submitContactForm = async (formData: ContactFormData) => {
    isSubmitting.value = true
    error.value = null

    try {
      // Validation des données
      if (!formData.name || !formData.email || !formData.requestType || !formData.message) {
        throw new Error('Veuillez remplir tous les champs obligatoires')
      }

      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Veuillez saisir une adresse email valide')
      }

      // Validation spécifique pour les événements
      if (formData.requestType === 'event') {
        if (!formData.eventType || !formData.eventDate || !formData.estimatedGuests) {
          throw new Error('Veuillez remplir tous les champs obligatoires pour votre événement')
        }
      }

      // Simulation d'un appel API
      // En production, ceci ferait appel à votre API backend
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Formatage des données pour l'envoi
      const emailBody = formatEmailBody(formData)
      
      // En production, vous enverriez ceci à votre service d'email
      console.log('Email à envoyer:', emailBody)

      isSuccess.value = true
      
      // Optionnel : redirection vers une page de confirmation
      // await navigateTo('/contact/merci')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'envoi'
    } finally {
      isSubmitting.value = false
    }
  }

  const formatEmailBody = (data: ContactFormData) => {
    let body = `Nouvelle demande de contact - Food en K\n\n`
    body += `Nom: ${data.name}\n`
    body += `Email: ${data.email}\n`
    body += `Téléphone: ${data.phone || 'Non renseigné'}\n`
    body += `Type de demande: ${getRequestTypeLabel(data.requestType)}\n\n`

    if (data.requestType === 'event') {
      body += `=== DÉTAILS DE L'ÉVÉNEMENT ===\n`
      body += `Type d'événement: ${getEventTypeLabel(data.eventType!)}\n`
      body += `Date souhaitée: ${data.eventDate}\n`
      body += `Lieu: ${data.eventLocation || 'À préciser'}\n`
      body += `Nombre d'invités estimé: ${data.estimatedGuests}\n`
      body += `Budget approximatif: ${getBudgetLabel(data.budget!)}\n`
      
      if (data.specificRequirements) {
        body += `Exigences spécifiques: ${data.specificRequirements}\n`
      }
      
      body += `Allergies alimentaires: ${data.hasAllergies ? 'Oui' : 'Non'}\n`
      if (data.hasAllergies && data.allergiesDetails) {
        body += `Détails des allergies: ${data.allergiesDetails}\n`
      }
      body += `\n`
    }

    body += `=== MESSAGE ===\n${data.message}\n\n`
    body += `---\nMessage envoyé depuis le site web Food en K`

    return body
  }

  const getRequestTypeLabel = (type: string) => {
    const labels = {
      order: '🍔 Commande burger',
      event: '🎉 Événement / Traiteur',
      foodtruck: '🚚 Réservation food truck',
      question: '❓ Question générale',
      other: '📝 Autre demande'
    }
    return labels[type as keyof typeof labels] || type
  }

  const getEventTypeLabel = (type: string) => {
    const labels = {
      wedding: 'Mariage',
      corporate: 'Événement d\'entreprise',
      birthday: 'Anniversaire',
      festival: 'Festival / Fête locale',
      other: 'Autre'
    }
    return labels[type as keyof typeof labels] || type
  }

  const getBudgetLabel = (budget: string) => {
    const labels = {
      'less-than-500': 'Moins de 500€',
      '500-1000': 'Entre 500€ et 1000€',
      '1000-2000': 'Entre 1000€ et 2000€',
      'more-than-2000': 'Plus de 2000€',
      'to-discuss': 'À discuter'
    }
    return labels[budget as keyof typeof labels] || budget
  }

  const resetForm = () => {
    isSuccess.value = false
    error.value = null
  }

  return {
    isSubmitting: readonly(isSubmitting),
    isSuccess: readonly(isSuccess),
    error: readonly(error),
    submitContactForm,
    resetForm
  }
}
