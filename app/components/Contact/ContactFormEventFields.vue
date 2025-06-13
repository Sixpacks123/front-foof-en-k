<template>
  <div class="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
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
          :model-value="eventType"
          :options="eventTypeOptions"
          placeholder="Sélectionnez le type..."
          :disabled="isSubmitting"
          @update:model-value="(value) => $emit('update:eventType', value as string)"
        />
      </UFormGroup>

      <UFormGroup
        label="Date souhaitée"
        name="eventDate"
        required
      >
        <UInput
          :model-value="eventDate"
          type="date"
          :min="minDate"
          icon="i-lucide-calendar-days"
          :disabled="isSubmitting"
          @update:model-value="emit('update:eventDate', $event)"
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
          :model-value="estimatedGuests"
          type="number"
          min="1"
          placeholder="ex: 50"
          icon="i-lucide-users"
          :disabled="isSubmitting"
          @update:model-value="$emit('update:estimatedGuests', Number($event))"
        />
      </UFormGroup>

      <UFormGroup
        label="Budget approximatif"
        name="budget"
      >
        <USelect
          :model-value="budget"
          :options="budgetOptions"
          placeholder="Votre budget..."
          :disabled="isSubmitting"
          @update:model-value="$emit('update:budget', $event as string)"
        />
      </UFormGroup>
    </div>

    <UFormGroup
      label="Lieu de l'événement"
      name="eventLocation"
      required
    >
      <UInput
        :model-value="eventLocation"
        placeholder="Ville, adresse ou lieu-dit"
        icon="i-lucide-map-pin"
        :disabled="isSubmitting"
        @update:model-value="emit('update:eventLocation', $event)"
      />
    </UFormGroup>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eventDate?: string
  eventLocation?: string
  estimatedGuests?: number
  eventType?: string
  budget?: string
  isSubmitting: boolean
}>()

const emit = defineEmits([
  'update:eventDate',
  'update:eventLocation',
  'update:estimatedGuests',
  'update:eventType',
  'update:budget'
])

// Options pour les selects
const eventTypeOptions = [
  { label: 'Mariage', value: 'wedding' },
  { label: 'Événement d\'entreprise', value: 'corporate' },
  { label: 'Anniversaire', value: 'birthday' },
  { label: 'Festival / Fête locale', value: 'festival' },
  { label: 'Autre', value: 'other' }
]

const budgetOptions = [
  { label: 'Moins de 500€', value: 'less-than-500' },
  { label: 'Entre 500€ et 1000€', value: '500-1000' },
  { label: 'Entre 1000€ et 2000€', value: '1000-2000' },
  { label: 'Plus de 2000€', value: 'more-than-2000' },
  { label: 'À discuter', value: 'to-discuss' }
]

// Date minimum (aujourd'hui + 1 semaine)
const minDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString().split('T')[0]
})
</script>
