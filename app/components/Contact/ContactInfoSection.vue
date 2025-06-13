<template>
  <UPageSection
    title="Nos coordonnées"
    description="Plusieurs moyens de nous joindre pour répondre à toutes vos questions"
  >
    <UPageGrid>
      <UPageCard
        v-for="info in contactInfo"
        :key="info.title"
        :icon="info.icon"
        :title="info.title"
        :description="info.description"
      >
        <template #icon>
          <div :class="info.iconBg">
            <UIcon
              :name="info.icon"
              class="w-8 h-8 text-white"
            />
          </div>
        </template>
        <div class="mt-4">
          <p
            v-if="info.value"
            class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3"
          >
            {{ info.value }}
          </p>
          <p
            v-if="info.subtitle"
            class="font-semibold text-gray-900 dark:text-white mb-2"
          >
            {{ info.subtitle }}
          </p>
          <p
            v-if="info.details"
            class="text-sm text-gray-500 dark:text-gray-400 mb-3"
          >
            {{ info.details }}
          </p>
          <UButton
            v-if="info.button"
            :to="info.button.to"
            :size="info.button.size"
            :variant="info.button.variant"
            :icon="info.button.icon"
          >
            {{ info.button.label }}
          </UButton>
        </div>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>

<script setup lang="ts">
interface ContactInfo {
  icon: string
  iconBg: string
  title: string
  description: string
  value?: string
  subtitle?: string
  details?: string
  button?: {
    label: string
    to: string
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    variant: 'solid' | 'outline' | 'soft' | 'ghost' | 'link' | 'subtle'
    icon: string
  }
}

const contactInfo: ContactInfo[] = [
  {
    icon: 'i-lucide-phone',
    iconBg: 'w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6',
    title: 'Téléphone',
    description: 'Appelez-nous directement pour une réponse immédiate',
    value: '06 24 31 67 90',
    button: {
      label: 'Appeler',
      to: 'tel:0624316790',
      size: 'sm',
      variant: 'outline',
      icon: 'i-lucide-phone'
    }
  },
  {
    icon: 'i-lucide-map-pin',
    iconBg: 'w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6',
    title: 'Zone de service',
    description: 'Nous intervenons dans un rayon de 30km autour de Merdrignac',
    subtitle: 'Merdrignac et environs',
    details: 'Rayon de 30km - Livraison possible'
  },
  {
    icon: 'i-lucide-clock',
    iconBg: 'w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6',
    title: 'Disponibilité',
    description: 'Nous adaptons nos horaires selon vos besoins',
    subtitle: '7j/7 selon planning',
    details: 'Horaires flexibles pour vos événements'
  }
]
</script>
