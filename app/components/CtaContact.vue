<template>
  <!-- CTA Section Améliorée -->
  <UPageSection
    title="Votre burger vous attend !"
    description="Ne laissez pas passer l'occasion ! Contactez-nous dès maintenant ou découvrez notre gamme complète."
    class=" bg-primary-200 dark:bg-neutral-800"
  >
    <!-- CTA Principal -->
    <div class="text-center mb-12">
      <UButton
        size="xl"
        color="primary"
        to="tel:0624316790"
        class="mr-4 mb-4"
      >
        <UIcon
          name="i-lucide-phone"
          class="w-5 h-5 mr-2"
        />
        06 24 31 67 90
      </UButton>

      <UButton
        size="xl"
        variant="outline"
        to="/menus"
        class="mb-4"
      >
        <UIcon
          name="i-lucide-hamburger"
          class="w-5 h-5 mr-2"
        />
        Voir nos burgers
      </UButton>
    </div>

    <!-- Actions secondaires -->
    <UPageGrid class="lg:grid-cols-3">
      <UPageCard
        icon="i-lucide-map-pin"
        title="Nous localiser"
        description="Trouvez notre food truck près de chez vous cette semaine."
        to="/contact"
      >
        <template #icon>
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <UIcon
              name="i-lucide-map-pin"
              class="w-8 h-8 text-white"
            />
          </div>
        </template>
        <template #footer>
          <UButton
            variant="outline"
            block
            to="/contact"
          >
            Voir nos emplacements
          </UButton>
        </template>
      </UPageCard>

      <UPageCard
        icon="i-lucide-party-popper"
        title="Événements & Traiteur"
        description="Mariages, anniversaires, événements d'entreprise sur mesure."
        to="/contact"
      >
        <template #icon>
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <UIcon
              name="i-lucide-party-popper"
              class="w-8 h-8 text-white"
            />
          </div>
        </template>
        <template #footer>
          <UButton
            color="primary"
            block
            to="/contact"
          >
            Demander un devis
          </UButton>
        </template>
      </UPageCard>

      <UPageCard
        icon="i-lucide-utensils"
        title="Notre carte complète"
        description="Découvrez tous nos burgers, accompagnements et desserts."
        to="/menus"
      >
        <template #icon>
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
            <UIcon
              name="i-lucide-cooking-pot"
              class="w-8 h-8 text-white"
            />
          </div>
        </template>
        <template #footer>
          <UButton
            variant="outline"
            block
            to="/menus"
          >
            Voir tous les menus
          </UButton>
        </template>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>

<script setup>
// Ce composant est statique et ne nécessite pas de logique particulière
</script>
