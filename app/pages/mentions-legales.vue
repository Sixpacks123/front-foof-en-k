<template>
  <div class="container mx-auto px-4 py-8">
    <UPageHeader
      title="Mentions Légales"
      description="Informations légales concernant Food en K"
    />
    
    <div class="prose prose-gray dark:prose-invert max-w-none">
      <UPageBody>
        <h2>1. Informations légales</h2>
        <p>
          <strong>Dénomination sociale :</strong> Food en K<br>
          <strong>Forme juridique :</strong> Micro-entreprise<br>
          <strong>Adresse :</strong> Merdrignac, France<br>
          <strong>Email :</strong> contact@food-en-k.com<br>
          <strong>Téléphone :</strong> 06 24 31 67 90
        </p>

        <h2>2. Hébergement</h2>
        <p>
          Ce site est hébergé par Netlify, Inc.<br>
          2325 3rd Street, Suite 296<br>
          San Francisco, CA 94107<br>
          États-Unis
        </p>

        <h2>3. Propriété intellectuelle</h2>
        <p>
          L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
          Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
        </p>

        <h2>4. Responsabilité</h2>
        <p>
          Food en K ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur,
          lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées,
          soit de l'apparition d'un bug ou d'une incompatibilité.
        </p>

        <h2>5. Litiges</h2>
        <p>
          Les présentes conditions du site et votre utilisation de ce site sont gouvernées et interprétées conformément aux lois de France,
          et vous vous soumettez à la juridiction non exclusive des tribunaux français pour la résolution de tout litige.
        </p>
      </UPageBody>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useSeoMeta({
  title: 'Mentions Légales - Food en K',
  description: 'Informations légales concernant Food en K, food truck spécialisé dans les burgers artisanaux.',
  ogTitle: 'Mentions Légales - Food en K',
  ogDescription: 'Informations légales concernant Food en K, food truck spécialisé dans les burgers artisanaux.'
})
</script>
