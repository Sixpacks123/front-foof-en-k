<template>
  <div>
    <UContainer class="py-8">
      <!-- En-tête simple -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">
          Contact
        </h1>
        <p class="text-gray-600">
          Contactez-nous pour organiser votre événement
        </p>
      </div>

      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Informations de contact compactes -->
        <div class="lg:col-span-1">
          <div class="space-y-4">
            <div class="text-center">
              <UButton
                to="tel:0624316790"
                color="primary"
                size="lg"
                icon="i-heroicons-phone"
                label="06 24 31 67 90"
                block
              />
            </div>
            <div class="text-center">
              <UButton
                to="mailto:contact@foodenk.fr"
                variant="outline"
                size="lg"
                icon="i-heroicons-envelope"
                label="Envoyer un email"
                block
              />
            </div>
          </div>
        </div>

        <!-- Formulaire de contact -->
        <div class="lg:col-span-3">
          <UCard class="p-8">
            <div class="mb-6">
              <h2 class="text-xl font-bold mb-2">
                Envoyez-nous un message
              </h2>
            </div>

            <!-- Formulaire avec validation conditionnelle -->
            <UForm
              :schema="schema"
              :state="state"
              class="space-y-2 w-full"
              @submit="onSubmit"
            >
              <!-- Type de demande -->
              <UFormField
                label="Type de demande"
                name="requestType"
                required
                description="Sélectionnez le type de votre demande pour personnaliser le formulaire"
              >
                <UInputMenu
                  v-model="state.requestType"
                  :items="requestTypeOptions"
                  placeholder="Choisissez votre demande..."
                  icon="i-heroicons-chat-bubble-left-right"
                />
              </UFormField>

              <!-- Informations personnelles -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UFormField
                  label="Nom complet"
                  name="name"
                  required
                  description="Votre nom et prénom complets"
                >
                  <UInput
                    v-model="state.name"
                    placeholder="Votre nom et prénom"
                    icon="i-heroicons-user"
                  />
                </UFormField>

                <UFormField
                  label="Email"
                  name="email"
                  required
                  description="Nous utiliserons cet email pour vous répondre"
                >
                  <UInput
                    v-model="state.email"
                    type="email"
                    placeholder="votre@email.com"
                    icon="i-heroicons-envelope"
                  />
                </UFormField>
              </div>

              <UFormField
                label="Téléphone (optionnel)"
                name="phone"
                description="Pour vous joindre plus facilement"
              >
                <UInput
                  v-model="state.phone"
                  placeholder="06 XX XX XX XX"
                  icon="i-heroicons-phone"
                />
              </UFormField>

              <!-- Champs spécifiques aux événements -->
              <template v-if="state.requestType?.value === 'event'">
                <div class="border-t pt-6">
                  <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <UIcon
                      name="i-heroicons-calendar-days"
                      class="w-5 h-5 text-purple-600"
                    />
                    Détails de l'événement
                  </h4>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UFormField
                      label="Date de l'événement"
                      name="eventDate"
                      :required="state.requestType?.value === 'event'"
                      description="Date prévue pour votre événement"
                    >
                      <UInput
                        v-model="state.eventDate"
                        type="date"
                        icon="i-heroicons-calendar"
                      />
                    </UFormField>

                    <UFormField
                      label="Nombre d'invités"
                      name="guestCount"
                      :required="state.requestType?.value === 'event'"
                      description="Nombre approximatif d'invités"
                    >
                      <UInput
                        v-model="state.guestCount"
                        type="number"
                        placeholder="Ex: 50"
                        icon="i-heroicons-users"
                      />
                    </UFormField>
                  </div>

                  <UFormField
                    label="Lieu de l'événement"
                    name="eventLocation"
                    :required="state.requestType?.value === 'event'"
                    description="Adresse où se déroulera l'événement"
                  >
                    <UInput
                      v-model="state.eventLocation"
                      placeholder="Adresse complète ou ville"
                      icon="i-heroicons-map-pin"
                    />
                  </UFormField>
                </div>
              </template>

              <!-- Message -->
              <UFormField
                label="Votre message"
                name="message"
                required
                class="w-full"
                description="Décrivez votre demande en détail pour que nous puissions mieux vous aider"
              >
                <UTextarea
                  v-model="state.message"
                  :rows="6"
                  class="w-full"
                  :placeholder="getMessagePlaceholder()"
                />
              </UFormField>
              <!-- Bouton d'envoi -->
              <UButton
                type="submit"
                size="lg"
                color="primary"
                icon="i-heroicons-paper-airplane"
                block
              >
                {{ getSubmitButtonText() }}
              </UButton>
            </UForm>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

// Types pour les options
type RequestTypeOption = {
  label: string
  value: string
  icon: string
}

// Validation conditionnelle personnalisée
const validateConditionalFields = (data: Record<string, unknown>) => {
  const errors: Record<string, string> = {}

  if ((data.requestType as RequestTypeOption)?.value === 'event') {
    if (!data.eventDate) errors.eventDate = 'Date de l\'événement requise'
    if (!data.eventLocation) errors.eventLocation = 'Lieu de l\'événement requis'
    if (!data.guestCount) errors.guestCount = 'Nombre d\'invités requis'
    else if (!/^\d+$/.test(data.guestCount as string)) errors.guestCount = 'Nombre d\'invités invalide'
  }

  return Object.keys(errors).length > 0 ? errors : null
}

// Schéma de validation Valibot simple
const schema = v.object({
  requestType: v.optional(v.object({
    label: v.string(),
    value: v.string(),
    icon: v.string()
  })),
  name: v.pipe(v.string(), v.minLength(2, 'Le nom doit contenir au moins 2 caractères')),
  email: v.pipe(v.string(), v.email('Email invalide')),
  phone: v.optional(v.pipe(v.string(), v.regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Numéro de téléphone invalide'))),
  message: v.pipe(v.string(), v.minLength(10, 'Le message doit contenir au moins 10 caractères')),
  // Champs optionnels pour la validation de base
  eventDate: v.optional(v.string()),
  eventLocation: v.optional(v.string()),
  guestCount: v.optional(v.number())
})

type Schema = v.InferOutput<typeof schema>

// État du formulaire
const state = reactive({
  requestType: undefined as RequestTypeOption | undefined,
  name: '',
  email: '',
  phone: '',
  message: '',
  eventDate: '',
  eventLocation: '',
  guestCount: 0
})

// Options pour les selects
const requestTypeOptions = [
  { label: 'Demande d\'information', value: 'info', icon: 'i-heroicons-information-circle' },
  { label: 'Organiser un événement', value: 'event', icon: 'i-heroicons-calendar-days' },
  { label: 'Partenariat', value: 'partnership', icon: 'i-heroicons-handshake' },
  { label: 'Autre demande', value: 'other', icon: 'i-heroicons-chat-bubble-left-right' }
]

// Toast pour les notifications
const toast = useToast()

// Fonctions helper pour l'UX dynamique
const getMessagePlaceholder = () => {
  switch (state.requestType?.value) {
    case 'event':
      return 'Décrivez votre événement : type (mariage, anniversaire, etc.), ambiance souhaitée, contraintes particulières...'
    case 'partnership':
      return 'Présentez votre projet de partenariat : type de collaboration, objectifs, proposition de valeur...'
    default:
      return 'Décrivez votre demande en détail...'
  }
}

const getSubmitButtonText = () => {
  switch (state.requestType?.value) {
    case 'event':
      return 'Organiser mon événement'
    case 'partnership':
      return 'Proposer un partenariat'
    default:
      return 'Envoyer le message'
  }
}

// Fonction pour reset les champs conditionnels
const resetConditionalFields = () => {
  Object.assign(state, {
    eventDate: '',
    eventLocation: '',
    guestCount: 0
  })
}

// Watch pour reset les champs quand on change de type
watch(() => state.requestType, () => {
  resetConditionalFields()
})

// Soumission du formulaire avec validation conditionnelle
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    // Validation conditionnelle manuelle
    const conditionalErrors = validateConditionalFields(event.data)
    if (conditionalErrors) {
      // Afficher les erreurs (Nuxt UI gère automatiquement l'affichage)
      throw new Error('Veuillez remplir tous les champs obligatoires')
    }

    // Simulation d'envoi API
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Succès
    toast.add({
      title: 'Message envoyé avec succès !',
      description: 'Nous vous répondrons dans les plus brefs délais.',
      color: 'success'
    })

    // Reset du formulaire
    Object.assign(state, {
      requestType: undefined,
      name: '',
      email: '',
      phone: '',
      message: '',
      eventDate: '',
      eventLocation: '',
      guestCount: 0
    })

    console.log('Form data:', event.data)
  } catch {
    toast.add({
      title: 'Erreur lors de l\'envoi',
      description: 'Une erreur est survenue, veuillez réessayer.',
      color: 'error'
    })
  }
}

// SEO
const { setPageSeo, setBreadcrumb } = useSeo()

setPageSeo('contact', {
  image: '/img/og-default.jpg'
})

setBreadcrumb([
  { name: 'Accueil', url: '/' },
  { name: 'Contact', url: '/contact' }
])

definePageMeta({
  title: 'Contact - Food en K',
  description: 'Contactez Food en K pour organiser votre événement ou commander nos burgers artisanaux. Réponse garantie sous 24h.'
})
</script>
