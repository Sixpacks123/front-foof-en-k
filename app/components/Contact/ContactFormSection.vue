<template>
  <UPageSection
    title="Envoyez-nous un message"
    description="Remplissez le formulaire ci-dessous, nous vous répondrons dans les plus brefs délais"
  >
    <div class="max-w-2xl mx-auto">
      <UCard>
        <!-- Messages d'état -->
        <UAlert
          v-if="isSuccess"
          color="success"
          variant="soft"
          title="Message envoyé avec succès !"
          description="Nous vous répondrons dans les plus brefs délais."
          class="mb-6"
        />

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :title="error"
          class="mb-6"
        />

        <!-- Formulaire -->
        <UForm
          v-if="!isSuccess"
          :state="form"
          class="space-y-6"
          @submit="onSubmit"
        >
          <!-- Informations personnelles -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormGroup
              label="Nom complet"
              name="name"
              required
            >
              <UInput
                v-model="form.name"
                placeholder="Votre nom et prénom"
                icon="i-lucide-user"
                :disabled="isSubmitting"
              />
            </UFormGroup>

            <UFormGroup
              label="Email"
              name="email"
              required
            >
              <UInput
                v-model="form.email"
                type="email"
                placeholder="votre@email.com"
                icon="i-lucide-mail"
                :disabled="isSubmitting"
              />
            </UFormGroup>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormGroup
              label="Téléphone"
              name="phone"
            >
              <UInput
                v-model="form.phone"
                placeholder="06 XX XX XX XX"
                icon="i-lucide-phone"
                :disabled="isSubmitting"
              />
            </UFormGroup>

            <UFormGroup
              label="Type de demande"
              name="requestType"
              required
            >
              <USelect
                v-model="form.requestType"
                :options="requestTypeOptions"
                placeholder="Choisissez votre demande..."
                :disabled="isSubmitting"
              />
            </UFormGroup>
          </div>

          <!-- Champs événement -->
          <ContactFormEventFields
            v-if="form.requestType === 'event'"
            v-model:event-date="form.eventDate"
            v-model:event-location="form.eventLocation"
            v-model:estimated-guests="form.estimatedGuests"
            v-model:event-type="form.eventType"
            v-model:budget="form.budget"
            :is-submitting="isSubmitting"
          />

          <!-- Message -->
          <UFormGroup
            label="Message"
            name="message"
            required
          >
            <UTextarea
              v-model="form.message"
              :rows="5"
              :placeholder="getMessagePlaceholder()"
              :disabled="isSubmitting"
            />
          </UFormGroup>

          <!-- Bouton d'envoi -->
          <UButton
            type="submit"
            size="lg"
            color="primary"
            block
            :loading="isSubmitting"
            :disabled="isSubmitting"
            icon="i-lucide-send"
          >
            {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
          </UButton>
        </UForm>
      </UCard>
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
import type { ContactFormData } from '~/composables/useContactForm'

// Composables
const { submitContactForm, isSubmitting, isSuccess, error, resetForm } = useContactForm()
const { isValidEmail, isRequired, isValidPhone } = useValidation()

// Form validation
const validateForm = () => {
  const errors: string[] = []
  
  if (!isRequired(form.name)) errors.push('Le nom est requis')
  if (!isRequired(form.email)) errors.push('L\'email est requis')
  else if (!isValidEmail(form.email)) errors.push('L\'email n\'est pas valide')
  if (form.phone && !isValidPhone(form.phone)) errors.push('Le numéro de téléphone n\'est pas valide')
  if (!isRequired(form.requestType)) errors.push('Le type de demande est requis')
  if (!isRequired(form.message)) errors.push('Le message est requis')
  
  return errors
}

// Formulaire
const form = reactive<ContactFormData>({
  name: '',
  email: '',
  phone: '',
  requestType: 'question',
  message: '',
  eventDate: '',
  eventLocation: '',
  estimatedGuests: undefined,
  eventType: undefined,
  budget: undefined
})

// Options pour les selects
const requestTypeOptions = [
  { label: 'Commande burger', value: 'order' },
  { label: 'Événement / Traiteur', value: 'event' },
  { label: 'Réservation food truck', value: 'foodtruck' },
  { label: 'Question générale', value: 'question' },
  { label: 'Autre demande', value: 'other' }
]

// Placeholder dynamique pour le message
const getMessagePlaceholder = () => {
  switch (form.requestType) {
    case 'order':
      return 'Indiquez-nous vos burgers préférés, quantités et horaire de récupération souhaité...'
    case 'event':
      return 'Décrivez votre événement : ambiance souhaitée, contraintes particulières, services additionnels...'
    case 'foodtruck':
      return 'Précisez le lieu, la date et les détails de votre demande de réservation...'
    case 'question':
      return 'Posez-nous votre question, nous vous répondrons rapidement...'
    default:
      return 'Décrivez votre demande en détail...'
  }
}

// Soumission du formulaire
const onSubmit = async (event: Event) => {
  event.preventDefault()
  
  // Validate form
  const validationErrors = validateForm()
  if (validationErrors.length > 0) {
    // Show validation errors to user
    const { addNotification } = useAppState()
    addNotification({
      title: 'Erreurs de validation',
      description: validationErrors.join(', '),
      type: 'error'
    })
    return
  }
  
  await submitContactForm(form)
}

// Reset du formulaire après succès
watch(isSuccess, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      resetForm()
      Object.assign(form, {
        name: '',
        email: '',
        phone: '',
        requestType: 'question',
        message: '',
        eventDate: '',
        eventLocation: '',
        estimatedGuests: undefined,
        eventType: undefined,
        budget: undefined
      })
    }, 3000)
  }
})
</script>
