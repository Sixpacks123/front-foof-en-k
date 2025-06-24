<template>
  <div
    v-if="showBanner"
    class="cursor-pointer"
    @click="isModalOpen = true"
  >
    <UBanner
      title="Actualités importantes"
      color="error"
      icon="i-lucide-info"
    />
  </div>
  <!-- Modal avec toutes les alertes -->
  <UModal v-model:open="isModalOpen">
    <template #content>
      <div class="p-6 space-y-4">
        <h3 class="text-lg font-semibold mb-4">
          Actualités importantes
        </h3>

        <div class="space-y-4">
          <UAlert
            v-for="alertInfo in infos"
            :key="alertInfo.id"
            :color="getAlertColor(alertInfo.type)"
            :icon="getAlertIcon(alertInfo.type)"
            :title="alertInfo.title"
            :description="formatDescription(alertInfo.description)"
            variant="subtle"
          />
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <UButton
            color="neutral"
            variant="outline"
            @click="isModalOpen = false"
          >
            Fermer
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const { infos, showBanner } = useInfo()
const isModalOpen = ref(false)

const getAlertColor = (type: string) => {
  switch (type) {
    case 'error': return 'error'
    case 'warning': return 'warning'
    case 'success': return 'success'
    case 'info':
    default: return 'info'
  }
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'error': return 'i-lucide-x-circle'
    case 'warning': return 'i-lucide-alert-triangle'
    case 'success': return 'i-lucide-check-circle'
    case 'info':
    default: return 'i-lucide-info'
  }
}

interface DescriptionBlock {
  type: string
  children: Array<{ type: string, text: string }>
}

const formatDescription = (description: string | DescriptionBlock[] | undefined) => {
  if (Array.isArray(description)) {
    return description
      .map(block => block.children?.map(child => child.text).join('') || '')
      .join('<br>')
  }
  return description || ''
}
</script>
