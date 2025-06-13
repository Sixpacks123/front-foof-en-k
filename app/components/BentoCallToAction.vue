<template>
  <div class="group relative flex flex-col justify-center items-center overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 dark:from-red-900/20 dark:via-pink-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] transform-gpu transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-red-400 to-pink-500 rounded-full blur-3xl animate-pulse" />
      <div class="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full blur-2xl animate-pulse delay-1000" />
    </div>

    <div class="relative z-10 text-center p-8 transform-gpu transition-all duration-300 group-hover:-translate-y-1">
      <div class="relative mb-6">
        <div class="w-20 h-20 bg-gradient-to-br from-red-500 via-pink-500 to-red-600 rounded-full mx-auto flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
          <UIcon
            :name="icon"
            class="w-10 h-10 text-white"
          />
        </div>
        <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <UIcon
            :name="sparkleIcon"
            class="w-4 h-4 text-yellow-800"
          />
        </div>
      </div>
      
      <h3 class="text-3xl font-bold mb-4 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
        {{ title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6 max-w-md mx-auto">
        {{ description }}
      </p>
      
      <div class="flex flex-wrap gap-3 justify-center mb-8">
        <UBadge
          v-for="(badge, index) in badges"
          :key="index"
          :color="mapColor(badge.color)"
          variant="soft"
          size="lg"
          class="px-4 py-2"
        >
          <UIcon
            v-if="badge.icon"
            :name="badge.icon"
            class="w-4 h-4 mr-2"
          />
          {{ badge.text }}
        </UBadge>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto">
        <UButton
          v-for="(button, index) in buttons"
          :key="index"
          :color="button.variant === 'primary' ? 'primary' : undefined"
          :variant="button.variant === 'outline' ? 'outline' : undefined"
          size="lg"
          :to="button.to"
          class="flex-1 shadow-lg hover:shadow-xl transition-shadow"
          :class="{ 'hover:bg-white/80 transition-colors': button.variant === 'outline' }"
        >
          <UIcon
            v-if="button.icon"
            :name="button.icon"
            class="w-5 h-5 mr-2"
          />
          {{ button.text }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Badge {
  text: string
  color: string
  icon?: string
}

interface Button {
  text: string
  to: string
  icon?: string
  variant: 'primary' | 'outline'
}

interface Props {
  title: string
  description: string
  icon: string
  sparkleIcon: string
  badges: Badge[]
  buttons: Button[]
  class?: string
}

const _props = defineProps<Props>()

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
</script>
