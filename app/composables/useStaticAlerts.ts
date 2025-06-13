import type { Alert } from '~/types'

/**
 * Composable pour gérer les alertes statiques du site
 */
export const useAlerts = () => {
  // Alertes statiques - à configurer selon les besoins
  const staticAlerts: Alert[] = [
    {
      id: 'location-change-june-2025',
      type: 'warning',
      title: 'Changement d\'emplacement',
      message: 'L\'emplacement du mercredi soir est dorénavant fermé. Nouvel emplacement : à partir du Vendredi Midi 20 Juin : Cesson Sevigné, entreprise B-Com (1219 Avenue des Champs Blancs)',
      isActive: true,
      priority: 1,
      dismissible: true
    },
    {
      id: 'private-events-june-2025',
      type: 'info',
      title: 'Food Truck privatisé en entreprise',
      message: 'JUIN : vendredi 13 (Midi) / Lundi 16 (midi) / Jeudi 19 (midi et soir), jeudi 26 (midi), Vendredi 27 (soir/ Kermesse). JUILLET : 3 et 4',
      isActive: true,
      priority: 2,
      dismissible: true
    }
  ]

  // State réactif pour les alertes dismissées
  const dismissedAlerts = ref<Set<string | number>>(new Set())

  // Alertes actives (non dismissées)
  const activeAlerts = computed(() => {
    return staticAlerts
      .filter(alert => alert.isActive && !dismissedAlerts.value.has(alert.id))
      .sort((a, b) => (a.priority || 0) - (b.priority || 0))
  })

  // Fonction pour dismisser une alerte
  const dismissAlert = (alertId: string | number) => {
    dismissedAlerts.value.add(alertId)
    
    // Optionnel : sauvegarder en localStorage pour persister entre les sessions
    if (import.meta.client) {
      const dismissed = Array.from(dismissedAlerts.value)
      localStorage.setItem('dismissed-alerts', JSON.stringify(dismissed))
    }
  }

  // Initialiser les alertes dismissées depuis localStorage
  onMounted(() => {
    if (import.meta.client) {
      const stored = localStorage.getItem('dismissed-alerts')
      if (stored) {
        const dismissed = JSON.parse(stored) as (string | number)[]
        dismissedAlerts.value = new Set(dismissed)
      }
    }
  })

  return {
    activeAlerts: readonly(activeAlerts),
    dismissAlert
  }
}
