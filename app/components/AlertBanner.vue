<template>
  <UBanner
    v-if="showBanner"
    title="Actualités importantes"
    color="error"
    :to="isModalOpen ? undefined : '#'"
    @click="isModalOpen = true"
  />
  <!-- Modal avec toutes les alertes -->
  <UModal v-model:open="isModalOpen">
    <template #content>
      <div class="p-6 space-y-4">
        <h3 class="text-lg font-semibold mb-4">
          {{ modalTitle }}
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
const { infos, showBanner, bannerColor } = useInfo()
const isModalOpen = ref(false)

const modalTitle = computed(() => {
  const count = infos.value.length
  if (count === 0) return 'Aucune information'
  if (count === 1) {
    const info = infos.value[0]
    if (info) {
      switch (info.type) {
        case 'error': return 'Erreur importante'
        case 'warning': return 'Avertissement'
        case 'success': return 'Information positive'
        case 'info':
        default: return 'Information'
      }
    }
  }
  return `${count} notifications importantes`
})

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
