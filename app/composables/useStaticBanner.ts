export const useStaticBanner = () => {
  const showBanner = ref(true) // Toujours affiché

  const bannerData = ref({
    icon: 'i-lucide-megaphone',
    title: 'Informations importantes - Food Truck',
    color: 'warning' as const,
    alerts: {
      closed: {
        description: 'L\'emplacement du mercredi soir est dorénavant fermé.'
      },
      newLocation: {
        description: 'À partir du Vendredi Midi 20 Juin : Cesson Sevigné, entreprise B-Com (1219 Avenue des Champs Blancs)'
      },
      privatizations: {
        description: 'JUIN : vendredi 13 (Midi), Lundi 16 (midi), Jeudi 19 (midi et soir), jeudi 26 (midi), Vendredi 27 (soir / Kermesse) • JUILLET : 3 et 4'
      }
    }
  })

  // Fonction vide - le banner ne disparaît jamais
  const dismissBanner = () => {
    // On ne fait rien, le banner reste affiché
  }

  return {
    bannerData: readonly(bannerData),
    showBanner: readonly(showBanner),
    dismissBanner
  }
}
