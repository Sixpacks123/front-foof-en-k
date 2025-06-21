<template>
  <div>
    <!-- Hero Section amélioré -->
    <UPageHero
      title="Contactez Food en K"
      description="Besoin d'organiser un événement ? Une question sur nos services ? Écrivez-nous ou appelez-nous directement !"
    >
      <template #headline>
        <UBadge
          variant="subtle"
          size="lg"
          class="mb-4"
        >
          <UIcon
            name="i-heroicons-clock"
            class="w-4 h-4 mr-2"
          />
          Réponse garantie sous 24h
        </UBadge>
      </template>

      <!-- Actions rapides -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <UButton
          to="tel:0624316790"
          color="primary"
          size="xl"
          icon="i-heroicons-phone"
          class="shadow-lg hover:shadow-xl transition-shadow"
        >
          Appeler maintenant
        </UButton>
        <UButton
          to="mailto:contact@foodenk.fr"
          variant="outline"
          size="xl"
          icon="i-heroicons-envelope"
          class="shadow-lg hover:shadow-xl transition-shadow"
        >
          Envoyer un email
        </UButton>
      </div>
    </UPageHero>

    <UContainer class="py-12">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Informations de contact -->
        <div class="lg:col-span-1 space-y-6">
          <div>
            <h2 class="text-2xl font-bold mb-6">
              Nos coordonnées
            </h2>
            
            <div class="space-y-4">
              <!-- Téléphone -->
              <UCard class="p-4 hover:shadow-md transition-shadow">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <UIcon
                      name="i-heroicons-phone"
                      class="w-6 h-6 text-primary-600"
                    />
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900">
                      Téléphone
                    </h3>
                    <p class="text-gray-600">
                      06 24 31 67 90
                    </p>
                  </div>
                  <UButton
                    to="tel:0624316790"
                    size="sm"
                    variant="ghost"
                    icon="i-heroicons-phone"
                  />
                </div>
              </UCard>

              <!-- Email -->
              <UCard class="p-4 hover:shadow-md transition-shadow">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <UIcon
                      name="i-heroicons-envelope"
                      class="w-6 h-6 text-blue-600"
                    />
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900">
                      Email
                    </h3>
                    <p class="text-gray-600">
                      contact@foodenk.fr
                    </p>
                  </div>
                  <UButton
                    to="mailto:contact@foodenk.fr"
                    size="sm"
                    variant="ghost"
                    icon="i-heroicons-envelope"
                  />
                </div>
              </UCard>

              <!-- Localisation -->
              <UCard class="p-4 hover:shadow-md transition-shadow">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <UIcon
                      name="i-heroicons-map-pin"
                      class="w-6 h-6 text-green-600"
                    />
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900">
                      Zone d'intervention
                    </h3>
                    <p class="text-gray-600">
                      Toute la Bretagne
                    </p>
                  </div>
                </div>
              </UCard>
            </div>
          </div>

          <!-- Types de demandes -->
          <UCard class="p-6">
            <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UIcon
                name="i-heroicons-chat-bubble-left-right"
                class="w-5 h-5 text-gray-600"
              />
              Types de demandes
            </h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-600" />
                <div>
                  <div class="font-medium text-blue-900">Information</div>
                  <div class="text-sm text-blue-700">Questions générales</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 text-purple-600" />
                <div>
                  <div class="font-medium text-purple-900">Événement</div>
                  <div class="text-sm text-purple-700">Organiser un événement</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 text-green-600" />
                <div>
                  <div class="font-medium text-green-900">Commande</div>
                  <div class="text-sm text-green-700">Commander des burgers</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <UIcon name="i-heroicons-handshake" class="w-5 h-5 text-orange-600" />
                <div>
                  <div class="font-medium text-orange-900">Partenariat</div>
                  <div class="text-sm text-orange-700">Collaboration business</div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Formulaire de contact -->
        <div class="lg:col-span-2">
          <UCard class="p-8">
            <div class="mb-8">
              <h2 class="text-2xl font-bold mb-2">
                Envoyez-nous un message
              </h2>
              <p class="text-gray-600">
                Remplissez le formulaire ci-dessous, nous vous répondrons rapidement.
              </p>
            </div>

            <!-- Formulaire principal avec Valibot -->
            <UForm
              :schema="baseSchema"
              :state="state"
              class="space-y-6"
              @submit="onSubmit"
            >
              <!-- Type de demande -->
              <UFormField
                label="Type de demande"
                name="requestType"
                required
              >
                <USelectMenu
                  v-model="state.requestType"
                  :options="requestTypeOptions"
                  placeholder="Choisissez votre demande..."
                />
              </UFormField>

              <!-- Informations personnelles -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UFormField
                  label="Nom complet"
                  name="name"
                  required
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
              >
                <UInput
                  v-model="state.phone"
                  placeholder="06 XX XX XX XX"
                  icon="i-heroicons-phone"
                />
              </UFormField>

              <!-- Formulaire imbriqué pour événements -->
              <UForm
                v-if="state.requestType === 'event'"
                :schema="eventSchema"
                :state="eventState"
                attach
                class="border-t pt-6"
              >
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
                    required
                  >
                    <UInput
                      v-model="eventState.eventDate"
                      type="date"
                      icon="i-heroicons-calendar"
                    />
                  </UFormField>

                  <UFormField
                    label="Nombre d'invités"
                    name="guestCount"
                    required
                  >
                    <UInput
                      v-model="eventState.guestCount"
                      type="number"
                      placeholder="Ex: 50"
                      icon="i-heroicons-users"
                    />
                  </UFormField>
                </div>

                <UFormField
                  label="Lieu de l'événement"
                  name="eventLocation"
                  required
                >
                  <UInput
                    v-model="eventState.eventLocation"
                    placeholder="Adresse complète ou ville"
                    icon="i-heroicons-map-pin"
                  />
                </UFormField>

                <UFormField
                  label="Budget approximatif"
                  name="budget"
                >
                  <USelectMenu
                    v-model="eventState.budget"
                    :options="budgetOptions"
                    placeholder="Sélectionnez votre budget"
                  />
                </UFormField>
              </UForm>

              <!-- Formulaire imbriqué pour commandes -->
              <UForm
                v-if="state.requestType === 'order'"
                :schema="orderSchema"
                :state="orderState"
                attach
                class="border-t pt-6"
              >
                <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <UIcon
                    name="i-heroicons-shopping-bag"
                    class="w-5 h-5 text-green-600"
                  />
                  Détails de la commande
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <UFormField
                    label="Type de commande"
                    name="orderType"
                    required
                  >
                    <USelectMenu
                      v-model="orderState.orderType"
                      :options="orderTypeOptions"
                      placeholder="Choisissez le type"
                    />
                  </UFormField>

                  <UFormField
                    label="Quantité"
                    name="quantity"
                    required
                  >
                    <UInput
                      v-model="orderState.quantity"
                      type="number"
                      placeholder="Ex: 10"
                      icon="i-heroicons-hashtag"
                    />
                  </UFormField>
                </div>

                <UFormField
                  label="Date de livraison"
                  name="deliveryDate"
                  required
                >
                  <UInput
                    v-model="orderState.deliveryDate"
                    type="date"
                    icon="i-heroicons-truck"
                  />
                </UFormField>
              </UForm>

              <!-- Message -->
              <UFormField
                label="Votre message"
                name="message"
                required
              >
                <UTextarea
                  v-model="state.message"
                  :rows="6"
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

// Schémas de validation Valibot séparés
const baseSchema = v.object({
  requestType: v.pipe(v.string(), v.minLength(1, 'Veuillez sélectionner un type de demande')),
  name: v.pipe(v.string(), v.minLength(2, 'Le nom doit contenir au moins 2 caractères')),
  email: v.pipe(v.string(), v.email('Email invalide')),
  phone: v.optional(v.pipe(v.string(), v.regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Numéro de téléphone invalide'))),
  message: v.pipe(v.string(), v.minLength(10, 'Le message doit contenir au moins 10 caractères'))
})

const eventSchema = v.object({
  eventDate: v.pipe(v.string(), v.minLength(1, 'Date de l\'événement requise')),
  eventLocation: v.pipe(v.string(), v.minLength(3, 'Lieu de l\'événement requis')),
  guestCount: v.pipe(v.string(), v.regex(/^\d+$/, 'Nombre d\'invités invalide')),
  budget: v.optional(v.string())
})

const orderSchema = v.object({
  orderType: v.pipe(v.string(), v.minLength(1, 'Type de commande requis')),
  quantity: v.pipe(v.string(), v.regex(/^\d+$/, 'Quantité invalide')),
  deliveryDate: v.pipe(v.string(), v.minLength(1, 'Date de livraison requise'))
})

type BaseSchema = v.InferOutput<typeof baseSchema>
type EventSchema = v.InferOutput<typeof eventSchema>
type OrderSchema = v.InferOutput<typeof orderSchema>

// État du formulaire avec champs conditionnels
const state = reactive({
  requestType: '',
  name: '',
  email: '',
  phone: '',
  message: ''
})

// États séparés pour les champs conditionnels
const eventState = reactive({
  eventDate: '',
  eventLocation: '',
  guestCount: '',
  budget: ''
})

const orderState = reactive({
  orderType: '',
  quantity: '',
  deliveryDate: ''
})

// Options pour les selects
const requestTypeOptions = [
  { label: 'Demande d\'information', value: 'info' },
  { label: 'Organiser un événement', value: 'event' },
  { label: 'Commander des burgers', value: 'order' },
  { label: 'Partenariat', value: 'partnership' },
  { label: 'Autre demande', value: 'other' }
]

const orderTypeOptions = [
  { label: 'Burgers classiques', value: 'classic' },
  { label: 'Menu complet', value: 'menu' },
  { label: 'Commande personnalisée', value: 'custom' }
]

const budgetOptions = [
  { label: 'Moins de 500€', value: '0-500' },
  { label: '500€ - 1000€', value: '500-1000' },
  { label: '1000€ - 2000€', value: '1000-2000' },
  { label: 'Plus de 2000€', value: '2000+' },
  { label: 'À discuter', value: 'discuss' }
]

// Toast pour les notifications
const toast = useToast()

// Fonctions helper pour l'UX dynamique
const getMessagePlaceholder = () => {
  switch (state.requestType) {
    case 'event':
      return 'Décrivez votre événement : type (mariage, anniversaire, etc.), ambiance souhaitée, contraintes particulières...'
    case 'order':
      return 'Précisez vos préférences : allergies, personnalisation des burgers, horaire de livraison...'
    case 'partnership':
      return 'Présentez votre projet de partenariat : type de collaboration, objectifs, proposition de valeur...'
    default:
      return 'Décrivez votre demande en détail...'
  }
}

const getSubmitButtonText = () => {
  switch (state.requestType) {
    case 'event':
      return 'Organiser mon événement'
    case 'order':
      return 'Passer ma commande'
    case 'partnership':
      return 'Proposer un partenariat'
    default:
      return 'Envoyer le message'
  }
}

// Fonction pour reset les champs conditionnels
const resetConditionalFields = () => {
  Object.assign(eventState, {
    eventDate: '',
    eventLocation: '',
    guestCount: '',
    budget: ''
  })
  Object.assign(orderState, {
    orderType: '',
    quantity: '',
    deliveryDate: ''
  })
}

// Watch pour reset les champs quand on change de type
watch(() => state.requestType, () => {
  resetConditionalFields()
})

// Soumission du formulaire
async function onSubmit(event: FormSubmitEvent<BaseSchema>) {
  try {
    // Simulation d'envoi API
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Combiner toutes les données
    const formData = {
      ...event.data,
      ...(state.requestType === 'event' ? eventState : {}),
      ...(state.requestType === 'order' ? orderState : {})
    }

    // Succès
    toast.add({
      title: 'Message envoyé avec succès !',
      description: 'Nous vous répondrons dans les plus brefs délais.',
      color: 'success'
    })

    // Reset du formulaire
    Object.assign(state, {
      requestType: '',
      name: '',
      email: '',
      phone: '',
      message: ''
    })
    resetConditionalFields()

    console.log('Form data:', formData)
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
