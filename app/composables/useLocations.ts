import type { Location, LocationWithDistance } from '~/types'

/**
 * Composable pour gérer les emplacements
 * Récupère les données depuis l'API Strapi
 */
export const useLocations = () => {
  // =====================================
  // DEPENDENCIES
  // =====================================
  
  const { find, findOne } = useStrapi()

  // =====================================
  // DATA FETCHING FUNCTIONS
  // =====================================

  /**
   * Fetch locations from Strapi
   */
  const fetchLocations = async (): Promise<Location[]> => {
    try {
      const response = await find('locations', {
        filters: {
          publishedAt: { $notNull: true },
          isActive: { $eq: true }
        },
        populate: {
          image: true
        },
        sort: ['name:asc']
      })
      
      const rawLocations = response?.data || response || []
      return Array.isArray(rawLocations) ? rawLocations as Location[] : []
    } catch (error) {
      console.error('Error fetching locations:', error)
      return []
    }
  }

  /**
   * Fetch a single location by ID
   */
  const fetchLocationById = async (id: string | number): Promise<Location | null> => {
    try {
      const response = await findOne('locations', String(id), {
        populate: {
          image: true
        }
      })
      
      return response?.data || response || null
    } catch (error) {
      console.error('Error fetching location:', error)
      return null
    }
  }

  // =====================================
  // UTILITY FUNCTIONS
  // =====================================

  /**
   * Calcule la distance entre deux points géographiques
   * @param lat1 Latitude du premier point
   * @param lon1 Longitude du premier point
   * @param lat2 Latitude du second point
   * @param lon2 Longitude du second point
   * @returns Distance en kilomètres
   */
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Rayon de la Terre en kilomètres
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
      * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  /**
   * Trouve les emplacements les plus proches d'une position donnée
   */
  const findNearbyLocations = async (
    userLat: number,
    userLon: number,
    maxDistance: number = 50
  ): Promise<LocationWithDistance[]> => {
    const locations = await fetchLocations()

    if (!locations?.length) return []

    return locations
      .map((location: Location) => ({
        ...location,
        distance: calculateDistance(userLat, userLon, location.latitude, location.longitude)
      }))
      .filter((location: LocationWithDistance) => (location.distance || 0) <= maxDistance)
      .sort((a: LocationWithDistance, b: LocationWithDistance) => (a.distance || 0) - (b.distance || 0))
  }

  /**
   * Formate l'adresse complète d'un emplacement
   */
  const formatAddress = (location: Location): string => {
    return `${location.address}, ${location.postal_code} ${location.city}`
  }

  /**
   * Formate les horaires d'ouverture
   */
  const formatOpeningHours = (location: Location): string => {
    if (location.opening_hours) {
      return location.opening_hours
    }

    if (location.start_time && location.end_time) {
      // Formater les heures pour afficher seulement HH:MM
      const formatTime = (timeString: string): string => {
        // Si c'est déjà au format HH:MM, le retourner tel quel
        if (timeString.match(/^\d{2}:\d{2}$/)) {
          return timeString
        }
        
        // Si c'est au format HH:MM:SS.mmm ou HH:MM:SS, extraire seulement HH:MM
        const timePart = timeString.split(':').slice(0, 2).join(':')
        return timePart
      }

      const startFormatted = formatTime(location.start_time)
      const endFormatted = formatTime(location.end_time)
      
      return `${startFormatted} - ${endFormatted}`
    }

    return 'Horaires non spécifiés'
  }

  return {
    fetchLocations,
    fetchLocationById,
    findNearbyLocations,
    calculateDistance,
    formatAddress,
    formatOpeningHours
  }
}
