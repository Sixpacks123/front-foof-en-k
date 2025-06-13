<template>
  <div
    :class="[
      props.class,
      'group relative flex flex-col justify-end overflow-hidden rounded-2xl transform-gpu transition-all duration-300 hover:shadow-xl',
      size === 'large' ? 'hover:scale-[1.02]' : 'hover:scale-105',
      color === 'amber' ? 'bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800' :
      color === 'red' ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20 border border-red-200 dark:border-red-800' :
      color === 'green' ? 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800' :
      color === 'emerald' ? 'bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800' :
      'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-900/20 border border-gray-200 dark:border-gray-800',
      '[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
      'dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
    ]"
  >
    <!-- Background decorative pattern -->
    <div class="absolute inset-0 opacity-10">
      <div
        :class="[
          size === 'large' ? 'w-32 h-32 top-6 left-6' : 'w-20 h-20 top-4 right-4',
          'absolute rounded-full blur-3xl',
          color === 'amber' ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
          color === 'red' ? 'bg-gradient-to-br from-red-400 to-red-600' :
          color === 'green' ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
          color === 'emerald' ? 'bg-gradient-to-br from-emerald-400 to-teal-500' :
          'bg-gradient-to-br from-gray-400 to-gray-500'
        ]"
      />
      <div
        v-if="size === 'large'"
        :class="[
          'absolute bottom-6 right-6 w-24 h-24 rounded-full blur-2xl',
          color === 'amber' ? 'bg-gradient-to-br from-orange-400 to-red-500' :
          color === 'red' ? 'bg-gradient-to-br from-red-400 to-red-500' :
          color === 'green' ? 'bg-gradient-to-br from-green-400 to-green-500' :
          color === 'emerald' ? 'bg-gradient-to-br from-emerald-400 to-emerald-500' :
          'bg-gradient-to-br from-gray-400 to-gray-500'
        ]"
      />
    </div>

    <!-- Badge absolu (si défini) -->
    <div
      v-if="badge"
      class="absolute top-4 right-4 z-10"
    >
      <UBadge
        :color="mapColor(color)"
        size="md"
        class="px-3 py-1.5 font-semibold"
      >
        <UIcon
          v-if="badgeIcon"
          :name="badgeIcon"
          class="w-3 h-3 mr-1"
        />
        {{ badge }}
      </UBadge>
    </div>

    <!-- Contenu principal -->
    <div
      :class="size === 'large' ? 'p-8' : 'p-6'"
      class="relative z-10 transform-gpu transition-all duration-300 group-hover:-translate-y-2"
    >
      <div class="mb-4">
        <div
          :class="[
            size === 'large' ? 'w-16 h-16' : 'w-12 h-12',
            'rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300',
            color === 'amber' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
            color === 'red' ? 'bg-gradient-to-br from-red-500 to-red-600' :
            color === 'green' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
            color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
            'bg-gradient-to-br from-gray-500 to-gray-600'
          ]"
        >
          <UIcon
            :name="icon"
            :class="size === 'large' ? 'w-8 h-8' : 'w-6 h-6'"
            class="text-white"
          />
        </div>
        <h3
          :class="[
            size === 'large' ? 'text-2xl' : 'text-xl',
            'font-bold mb-2',
            color === 'amber' ? 'text-amber-900 dark:text-amber-100' :
            color === 'red' ? 'text-red-900 dark:text-red-100' :
            color === 'green' ? 'text-green-900 dark:text-green-100' :
            color === 'emerald' ? 'text-emerald-900 dark:text-emerald-100' :
            'text-gray-900 dark:text-gray-100'
          ]"
        >
          {{ title }}
        </h3>
        <p
          :class="[
            size === 'large' ? 'text-lg' : 'text-sm',
            'leading-relaxed',
            color === 'amber' ? 'text-amber-700 dark:text-amber-300' :
            color === 'red' ? 'text-red-700 dark:text-red-300' :
            color === 'green' ? 'text-green-700 dark:text-green-300' :
            color === 'emerald' ? 'text-emerald-700 dark:text-emerald-300' :
            'text-gray-700 dark:text-gray-300'
          ]"
        >
          {{ description }}
        </p>
      </div>

      <!-- Détails enrichis (pour la grande carte) -->
      <div
        v-if="details && details.length > 0"
        class="space-y-3 mb-4"
      >
        <div
          v-for="(detail, index) in details"
          :key="index"
          :class="[
            'flex items-center gap-3',
            color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
            color === 'red' ? 'text-red-600 dark:text-red-400' :
            color === 'green' ? 'text-green-600 dark:text-green-400' :
            color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
            'text-gray-600 dark:text-gray-400'
          ]"
        >
          <UIcon
            :name="detail.icon"
            class="w-4 h-4"
          />
          <span class="text-sm font-medium">{{ detail.text }}</span>
        </div>
      </div>

      <!-- Badges (pour les petites cartes) -->
      <div
        v-if="badges && badges.length > 0"
        class="flex flex-wrap gap-2"
      >
        <UBadge
          v-for="(badgeItem, index) in badges"
          :key="index"
          :color="mapColor(badgeItem.color)"
          variant="soft"
          size="sm"
        >
          <UIcon
            v-if="badgeItem.icon"
            :name="badgeItem.icon"
            class="w-3 h-3 mr-1"
          />
          {{ badgeItem.text }}
        </UBadge>
      </div>
    </div>

    <!-- Effet hover -->
    <div
      :class="[
        'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
        color === 'amber' ? 'bg-gradient-to-t from-amber-900/5 to-transparent' :
        color === 'red' ? 'bg-gradient-to-t from-red-900/5 to-transparent' :
        color === 'green' ? 'bg-gradient-to-t from-green-900/5 to-transparent' :
        color === 'emerald' ? 'bg-gradient-to-t from-emerald-900/5 to-transparent' :
        'bg-gradient-to-t from-gray-900/5 to-transparent'
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Detail {
  icon: string
  text: string
}

interface Badge {
  text: string
  color: string
  icon?: string
}

interface Props {
  title: string
  description: string
  icon: string
  color: string
  size?: 'medium' | 'large'
  badge?: string
  badgeIcon?: string
  details?: Detail[]
  badges?: Badge[]
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium'
})

// Mapper les couleurs personnalisées vers les couleurs Nuxt UI
const mapColor = (color: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
  const colorMap: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    green: 'primary',
    blue: 'primary',
    purple: 'primary',
    red: 'error',
    amber: 'warning',
    emerald: 'success'
  }
  return colorMap[color] || 'primary'
}

// Classes computed
const cardClasses = computed(() => [
  props.class,
  // Base styles
  `bg-gradient-to-br from-${props.color}-50 to-${props.color}-100 dark:from-${props.color}-900/20 dark:to-${props.color}-900/20`,
  `border border-${props.color}-200 dark:border-${props.color}-800`,
  '[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
  'dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
  // Hover effects based on size
  props.size === 'large' ? 'hover:scale-[1.02]' : 'hover:scale-105'
])

const backgroundClass = computed(() => {
  const size = props.size === 'large' ? 'w-32 h-32' : 'w-20 h-20'
  const position = props.size === 'large' ? 'top-6 left-6' : 'top-4 right-4'
  return [
    size,
    position,
    `bg-gradient-to-br from-${props.color}-400 to-${props.color}-500`
  ].join(' ')
})

const secondaryBackgroundClass = computed(() => 
  `bottom-6 right-6 w-24 h-24 bg-gradient-to-br from-${props.color}-400 to-${props.color === 'amber' ? 'red' : props.color}-500`
)

const contentClasses = computed(() => 
  props.size === 'large' ? 'p-8' : 'p-6'
)

const iconClasses = computed(() => {
  const size = props.size === 'large' ? 'w-16 h-16' : 'w-12 h-12'
  return [
    size,
    `bg-gradient-to-br from-${props.color}-500 to-${props.color}-600`
  ].join(' ')
})

const iconSizeClass = computed(() => 
  props.size === 'large' ? 'w-8 h-8' : 'w-6 h-6'
)

const titleClasses = computed(() => {
  const size = props.size === 'large' ? 'text-2xl' : 'text-xl'
  return [
    size,
    `text-${props.color}-900 dark:text-${props.color}-100`
  ].join(' ')
})

const descriptionClasses = computed(() => {
  const size = props.size === 'large' ? 'text-lg' : 'text-sm'
  return [
    size,
    `text-${props.color}-700 dark:text-${props.color}-300`
  ].join(' ')
})

const detailClasses = computed(() => 
  `text-${props.color}-600 dark:text-${props.color}-400`
)

const hoverEffectClass = computed(() => 
  `bg-gradient-to-t from-${props.color}-900/5 to-transparent`
)
</script>
