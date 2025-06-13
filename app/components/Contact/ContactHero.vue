<template>
  <UPageHero
    :title="heroData.title"
    :description="heroData.description"
    :links="heroData.links"
  >
    <template #headline>
      <UBadge
        variant="subtle"
        size="lg"
        class="mb-4"
      >
        {{ heroData.badge }}
      </UBadge>
    </template>
  </UPageHero>
</template>

<script setup lang="ts">
interface HeroData {
  badge: string
  title: string
  description: string
  links: Array<{
    label: string
    to: string
    trailingIcon?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
    variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link'
  }>
}

const heroData: HeroData = {
  badge: 'Contactez-nous',
  title: 'Une question ? Un projet d\'événement ?',
  description: 'Notre équipe est là pour vous accompagner dans votre projet gourmand. Que ce soit pour une commande, un événement ou une simple question, nous sommes à votre écoute.',
  links: [
    {
      label: 'Appeler maintenant',
      to: 'tel:0624316790',
      trailingIcon: 'i-lucide-phone',
      size: 'xl',
      color: 'primary'
    },
    {
      label: 'Voir nos menus',
      to: '/menus',
      variant: 'outline',
      size: 'xl',
      trailingIcon: 'i-lucide-menu'
    }
  ]
}
</script>
