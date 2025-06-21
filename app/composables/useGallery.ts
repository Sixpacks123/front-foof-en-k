import type { GalleryImage } from '~/types'

export const useGallery = () => {
  // Pour l'instant, j'utilise des images de burgers depuis Unsplash
  // Dans une vraie application, ceci devrait venir de Strapi
  const images: GalleryImage[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=640&h=640&fit=crop',
      alt: 'Burger classique avec frites'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=640&h=640&fit=crop',
      alt: 'Cheeseburger gourmand'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=640&h=640&fit=crop',
      alt: 'Burger végétarien'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=640&h=640&fit=crop',
      alt: 'Double burger au bacon'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=640&h=640&fit=crop',
      alt: 'Burger au poulet croustillant'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=640&h=640&fit=crop',
      alt: 'Burger BBQ signature'
    }
  ]

  // TODO: Remplacer par un appel à l'API Strapi
  // const { data: images } = await useFetch('/api/gallery')

  return {
    images
  }
}
