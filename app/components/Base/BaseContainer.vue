<template>
  <component
    :is="tag"
    :class="containerClasses"
    v-bind="$attrs"
  >
    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex items-center justify-center p-8"
    >
      <USkeleton
        v-if="skeletonType === 'default'"
        class="h-8 w-32"
      />
      <div
        v-else-if="skeletonType === 'grid'"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
      >
        <USkeleton
          v-for="i in skeletonCount"
          :key="i"
          class="h-32 w-full"
        />
      </div>
      <USpinner
        v-else
        size="lg"
      />
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      color="error"
      variant="soft"
      :title="errorTitle"
      :description="errorMessage"
      class="mb-4"
    >
      <template #actions>
        <UButton
          v-if="onRetry"
          variant="outline"
          size="xs"
          @click="onRetry"
        >
          Réessayer
        </UButton>
      </template>
    </UAlert>

    <!-- Empty State -->
    <div
      v-else-if="isEmpty"
      class="text-center py-12"
    >
      <UIcon
        :name="emptyIcon"
        class="mx-auto h-12 w-12 text-gray-400 mb-4"
      />
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {{ emptyTitle }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        {{ emptyDescription }}
      </p>
      <UButton
        v-if="emptyAction"
        :to="emptyAction.to"
        :variant="emptyAction.variant || 'outline'"
        @click="emptyAction.onClick"
      >
        {{ emptyAction.label }}
      </UButton>
    </div>

    <!-- Content -->
    <slot v-else />
  </component>
</template>

<script setup lang="ts">
/**
 * Base container component with loading, error, and empty states
 * @description Provides consistent state management for all container components
 */

interface EmptyAction {
  label: string
  to?: string
  variant?: 'link' | 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost'
  onClick?: () => void
}

interface Props {
  tag?: string
  loading?: boolean
  error?: string | boolean
  errorTitle?: string
  errorMessage?: string
  isEmpty?: boolean
  emptyTitle?: string
  emptyDescription?: string
  emptyIcon?: string
  emptyAction?: EmptyAction
  skeletonType?: 'default' | 'grid' | 'spinner'
  skeletonCount?: number
  onRetry?: () => void
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  loading: false,
  error: false,
  errorTitle: 'Erreur de chargement',
  errorMessage: 'Une erreur est survenue lors du chargement des données.',
  isEmpty: false,
  emptyTitle: 'Aucun résultat',
  emptyDescription: 'Aucun élément à afficher pour le moment.',
  emptyIcon: 'i-lucide-inbox',
  skeletonType: 'default',
  skeletonCount: 3,
  class: ''
})

// Computed classes
const containerClasses = computed(() => [
  'base-container',
  props.class
])

// Computed error message
const computedErrorMessage = computed(() => {
  if (typeof props.error === 'string') {
    return props.error
  }
  return props.errorMessage
})
</script>

<style scoped>
.base-container {
  @apply relative;
}
</style>
