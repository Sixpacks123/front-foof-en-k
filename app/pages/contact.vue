<template>
  <div>
    <!-- Hero Section -->
    <ContactHero />

    <!-- Informations de contact -->
    <ContactInfoSection />

    <!-- Formulaire de contact -->
    <ContactFormSection />

    <!-- FAQ Section -->
    <ContactFaqSection />

    <!-- CTA Section -->
    <ContactCtaSection />
  </div>
</template>

<script setup lang="ts">
// Meta
definePageMeta({
  title: 'Contact - Food en K',
  description: 'Contactez Food en K pour vos commandes, événements et questions. Service traiteur professionnel à Merdrignac.'
})

// SEO
useSeoMeta({
  title: 'Contact - Food en K | Traiteur & Events à Merdrignac',
  description: 'Contactez Food en K pour vos événements, mariages, séminaires. Service traiteur professionnel avec food truck mobile.',
  ogTitle: 'Contact Food en K - Service traiteur événementiel',
  ogDescription: 'Organisez votre événement avec Food en K. Service traiteur professionnel, food truck mobile, menus personnalisés.'
})
</script>
