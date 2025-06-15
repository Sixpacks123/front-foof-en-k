<template>
  <UPageSection id="foodtruck-event">
    <template #title>
      Un Food Truck pour Vous, chez Vous !
    </template>

    <template #description>
      <div class="space-y-4">
        <p class="font-semibold text-primary">
          DE 50 à 500 PERSONNES*
        </p>
        <p>
          Food en'K pour votre évènement, c'est la garantie d'un évènement réussit !
        </p>
      </div>
    </template>

    <div class="space-y-6">
      <div class="prose prose-gray max-w-none">
        <p>
          Le Food Truck se déplace jusqu'à vous* en Ille et Vilaine, Morbihan et Côtes d'Armor.
          <br>
          <span class="text-xs text-gray-500">(*sous conditions)</span>
        </p>

        <p>
          Avec une formule où vous avez le choix, pour le même tarif, parmi 4 burgers, devant le camion, avec barquette de frites maison, service au plateau, le tout dans une ambiance conviviale !
          <br>
          <span class="text-xs text-gray-500">(formule 4 burgers de 50 à 100 p)</span>
        </p>
      </div>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">
            Types d'événements
          </h3>
        </template>

        <ul class="space-y-2">
          <li class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="text-primary"
            />
            Team Building / Portes Ouvertes / Inauguration
          </li>
          <li class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="text-primary"
            />
            Festivals / Concerts / Fêtes associatives
          </li>
          <li class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="text-primary"
            />
            Anniversaires, EVJF EVG, Retour mariage...
          </li>
        </ul>
      </UCard>

      <UAlert
        icon="i-heroicons-information-circle"
        color="primary"
        variant="soft"
        title="Formule incluse"
        description="1 formule = 1 burger parmi 4 au choix, 1 barquette de Frites Maison, avec ou sans dessert, avec ou sans boisson (à partir de 50 personnes minimum, sur base adulte, tarifs dégressifs selon le nombre de personnes)"
      />

      <UAlert
        icon="i-heroicons-star"
        color="warning"
        variant="soft"
        title="Tarifs spéciaux"
        description="* Associations : tarifs spéciaux"
      />

      <div class="flex justify-center gap-4 pt-6">
        <UButton
          to="/events"
          color="primary"
          size="lg"
          icon="i-lucide:info"
          trailing
          label="en savoir plus"
          variant="outline"
        />
        <UButton
          to="/contact"
          color="primary"
          size="lg"
          icon="i-heroicons-phone"
          trailing
          label="Demander un devis"
        />
      </div>
    </div>
  </UPageSection>
</template>
