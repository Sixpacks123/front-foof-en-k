<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      title="Contactez-nous"
      description="Une question ? Un événement à organiser ? Envoyez-nous un message, nous vous répondrons rapidement."
      :links="[
        {
          label: 'Nous appeler',
          to: 'tel:0624316790',
          icon: 'i-lucide-phone',
          size: 'lg',
          color: 'primary'
        }
      ]"
    >
      <template #headline>
        <UBadge
          variant="subtle"
          size="lg"
          class="mb-4"
        >
          <UIcon
            name="i-lucide-message-circle"
            class="w-4 h-4 mr-2"
          />
          Réponse sous 24h
        </UBadge>
      </template>
    </UPageHero>

    <!-- Informations de contact -->
    <UPageSection
      title="Nos coordonnées"
      description="Retrouvez-nous facilement"
    >
      <UPageGrid class="lg:grid-cols-3">
        <UPageCard
          icon="i-lucide-phone"
          title="Téléphone"
          description="06 24 31 67 90"
          to="tel:0624316790"
        />
        <UPageCard
          icon="i-lucide-mail"
          title="Email"
          description="contact@foodenk.fr"
          to="mailto:contact@foodenk.fr"
        />
        <UPageCard
          icon="i-lucide-map-pin"
          title="Localisation"
          description="Merdrignac et toute la Bretagne"
        />
      </UPageGrid>
    </UPageSection>

    <!-- Formulaire de contact -->
    <UPageSection
      title="Envoyez-nous un message"
      description="Remplissez le formulaire ci-dessous pour nous contacter"
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
            <div
              v-if="form.requestType === 'event'"
              class="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-center gap-2 mb-3">
                <UIcon
                  name="i-lucide-calendar"
                  class="w-5 h-5 text-primary-500"
                />
                <h4 class="font-medium text-gray-900 dark:text-white">
                  Détails de l'événement
                </h4>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormGroup
                  label="Type d'événement"
                  name="eventType"
                  required
                >
                  <USelect
                    v-model="form.eventType"
                    :options="eventTypeOptions"
                    placeholder="Sélectionnez le type..."
                    :disabled="isSubmitting"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Date souhaitée"
                  name="eventDate"
                  required
                >
                  <UInput
                    v-model="form.eventDate"
                    type="date"
                    :min="minDate"
                    icon="i-lucide-calendar-days"
                    :disabled="isSubmitting"
                  />
                </UFormGroup>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormGroup
                  label="Nombre d'invités"
                  name="estimatedGuests"
                  required
                >
                  <UInput
                    v-model="form.estimatedGuests"
                    type="number"
                    min="50"
                    max="500"
                    placeholder="ex: 100"
                    icon="i-lucide-users"
                    :disabled="isSubmitting"
                  />
                  <template #help>
                    <span class="text-xs text-gray-500">Minimum 50 personnes</span>
                  </template>
                </UFormGroup>

                <UFormGroup
                  label="Heure souhaitée"
                  name="eventTime"
                >
                  <USelect
                    v-model="form.eventTime"
                    :options="timeOptions"
                    placeholder="Moment de la journée..."
                    :disabled="isSubmitting"
                  />
                </UFormGroup>
              </div>

              <UFormGroup
                label="Lieu de l'événement"
                name="eventLocation"
                required
              >
                <UInput
                  v-model="form.eventLocation"
                  placeholder="Ville, adresse ou lieu-dit"
                  icon="i-lucide-map-pin"
                  :disabled="isSubmitting"
                />
              </UFormGroup>

              <UFormGroup
                label="Budget approximatif"
                name="budget"
              >
                <USelect
                  v-model="form.budget"
                  :options="budgetOptions"
                  placeholder="Votre budget..."
                  :disabled="isSubmitting"
                />
              </UFormGroup>
            </div>

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
  </div>
</template>

<script setup lang="ts">
import type { ContactFormData } from '~/composables/useContactForm'

// Composables
const { submitContactForm, isSubmitting, isSuccess, error, resetForm } = useContactForm()
const { isValidEmail, isRequired, isValidPhone } = useValidation()

// Formulaire
const form = reactive<ContactFormData>({
  name: '',
  email: '',
  phone: '',
  requestType: 'info',
  message: '',
  eventDate: '',
  eventTime: '',
  eventLocation: '',
  estimatedGuests: undefined,
  eventType: undefined,
  budget: undefined
})

// Options pour les selects
const requestTypeOptions = [
  { label: '🎉 Organiser un événement', value: 'event' },
  { label: '📋 Demande d\'information', value: 'info' },
  { label: '🍔 Commander des burgers', value: 'order' },
  { label: '💬 Autre demande', value: 'other' }
]

const eventTypeOptions = [
  { label: '💒 Mariage', value: 'wedding' },
  { label: '🏢 Événement d\'entreprise', value: 'corporate' },
  { label: '🎂 Anniversaire / Fête privée', value: 'birthday' },
  { label: '🎪 Festival / Fête locale', value: 'festival' },
  { label: '🎊 Inauguration', value: 'inauguration' },
  { label: '📊 Séminaire', value: 'seminar' },
  { label: '🎯 Autre type d\'événement', value: 'other' }
]

const budgetOptions = [
  { label: '💰 Moins de 1000€', value: 'less-than-1000' },
  { label: '💳 Entre 1000€ et 2000€', value: '1000-2000' },
  { label: '💎 Entre 2000€ et 5000€', value: '2000-5000' },
  { label: '🏆 Plus de 5000€', value: 'more-than-5000' },
  { label: '💬 À discuter', value: 'to-discuss' }
]

const timeOptions = [
  { label: '🌅 Midi (11h-14h)', value: 'lunch' },
  { label: '☀️ Après-midi (14h-18h)', value: 'afternoon' },
  { label: '🌆 Soir (18h-22h)', value: 'evening' },
  { label: '⏰ Toute la journée', value: 'all-day' }
]

// Date minimum (aujourd'hui + 1 semaine)
const minDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString().split('T')[0]
})

// Placeholder dynamique pour le message
const getMessagePlaceholder = () => {
  switch (form.requestType) {
    case 'order':
      return 'Indiquez-nous vos burgers préférés, les quantités désirées et l\'horaire de récupération...'
    case 'event':
      return 'Décrivez votre événement : ambiance souhaitée, contraintes particulières, services additionnels, allergies alimentaires...'
    case 'info':
      return 'Posez-nous toutes vos questions sur nos services, nos menus, nos tarifs...'
    default:
      return 'Décrivez votre demande en détail, nous vous répondrons rapidement...'
  }
}

// Form validation
const validateForm = () => {
  const errors: string[] = []
  
  if (!isRequired(form.name)) errors.push('Le nom est requis')
  if (!isRequired(form.email)) errors.push('L\'email est requis')
  else if (!isValidEmail(form.email)) errors.push('L\'email n\'est pas valide')
  if (form.phone && !isValidPhone(form.phone)) errors.push('Le numéro de téléphone n\'est pas valide')
  if (!isRequired(form.requestType)) errors.push('Le type de demande est requis')
  if (!isRequired(form.message)) errors.push('Le message est requis')
  
  // Validation spécifique pour les événements
  if (form.requestType === 'event') {
    if (!form.eventType) errors.push('Le type d\'événement est requis')
    if (!form.eventDate) errors.push('La date de l\'événement est requise')
    if (!form.eventLocation) errors.push('Le lieu de l\'événement est requis')
    if (!form.estimatedGuests || form.estimatedGuests < 50) errors.push('Le nombre d\'invités doit être d\'au moins 50 personnes')
  }
  
  return errors
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
        requestType: 'info',
        message: '',
        eventDate: '',
        eventTime: '',
        eventLocation: '',
        estimatedGuests: undefined,
        eventType: undefined,
        budget: undefined
      })
    }, 3000)
  }
})

// Meta
definePageMeta({
  title: 'Contact - Food en K',
  description: 'Contactez Food en K pour vos événements et commandes. Service traiteur professionnel avec food truck mobile.'
})

// SEO
useSeoMeta({
  title: 'Contact - Food en K | Traiteur & Events à Merdrignac',
  description: 'Contactez Food en K pour vos événements, mariages, séminaires. Service traiteur professionnel avec food truck mobile.',
  ogTitle: 'Contact Food en K - Service traiteur événementiel',
  ogDescription: 'Organisez votre événement avec Food en K. Service traiteur professionnel, food truck mobile, menus personnalisés.'
})
</script>
