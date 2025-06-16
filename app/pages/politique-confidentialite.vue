<template>
  <div class="container mx-auto px-4 py-8">
    <UPageHeader
      title="Politique de Confidentialité"
      description="Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée."
    />
    
    <div class="prose prose-gray dark:prose-invert max-w-none">
      <UPageBody>
        <h2>1. Collecte des informations</h2>
        <p>
          Nous collectons des informations lorsque vous nous contactez via notre formulaire de contact,
          passez une commande ou vous inscrivez à notre newsletter.
        </p>

        <h2>2. Utilisation des informations</h2>
        <p>
          Les informations que nous collectons peuvent être utilisées pour :
        </p>
        <ul>
          <li>Traiter vos commandes et réservations</li>
          <li>Améliorer notre service client</li>
          <li>Vous envoyer des informations sur nos services</li>
        </ul>

        <h2>3. Protection des informations</h2>
        <p>
          Nous mettons en œuvre diverses mesures de sécurité pour préserver la sécurité de vos informations personnelles.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Nous utilisons des cookies pour améliorer votre expérience sur notre site web.
        </p>

        <h2>5. Contact</h2>
        <p>
          Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à :
          <a href="mailto:contact@food-en-k.com">contact@food-en-k.com</a>
        </p>
      </UPageBody>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useSeoMeta({
  title: 'Politique de Confidentialité - Food en K',
  description: 'Découvrez comment Food en K protège vos données personnelles et respecte votre vie privée.',
  ogTitle: 'Politique de Confidentialité - Food en K',
  ogDescription: 'Découvrez comment Food en K protège vos données personnelles et respecte votre vie privée.'
})
</script>
