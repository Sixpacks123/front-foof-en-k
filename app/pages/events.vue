<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      title="Votre Food Truck pour tous vos événements"
      description="De 50 à 500 personnes, Food en K se déplace partout en Bretagne pour faire de votre événement un moment inoubliable ! Burgers artisanaux, service personnalisé et ambiance conviviale garantie."
      :links="[
        {
          label: 'Demander un devis',
          to: '/contact',
          trailingIcon: 'i-lucide-calculator',
          size: 'xl',
          color: 'primary'
        },
        {
          label: 'Nous appeler',
          to: 'tel:0624316790',
          icon: 'i-lucide-phone',
          size: 'xl',
          variant: 'ghost'
        }
      ]"
    >
      <template #headline>
        <UBadge
          variant="subtle"
          size="lg"
          class="mb-4"
        >
          <UIcon
            name="i-lucide-truck"
            class="w-4 h-4 mr-2"
          />
          Service traiteur mobile
        </UBadge>
      </template>
    </UPageHero>

    <!-- Zone de couverture -->
    <UPageSection
      title="Notre zone d'intervention"
      description="Food en K se déplace dans toute la Bretagne pour vos événements"
    >
      <UPageGrid class="lg:grid-cols-3">
        <UPageCard
          icon="i-lucide-map-pin"
          title="Ille-et-Vilaine"
          description="Tout le département couvert, de Rennes à Saint-Malo en passant par Vitré et Fougères."
          class="border-l-4 border-l-primary-500"
        />
        <UPageCard
          icon="i-lucide-map-pin"
          title="Côtes-d'Armor"
          description="De Dinan à Lannion, en passant par Saint-Brieuc et nos environs de Merdrignac."
          class="border-l-4 border-l-blue-500"
        />
        <UPageCard
          icon="i-lucide-map-pin"
          title="Morbihan"
          description="Vannes, Lorient, Pontivy et toutes les communes environnantes."
          class="border-l-4 border-l-green-500"
        />
      </UPageGrid>

      <UAlert
        icon="i-lucide-info"
        color="primary"
        variant="soft"
        title="Déplacement sous conditions"
        description="Les frais de déplacement peuvent s'appliquer selon la distance et la taille de l'événement. Contactez-nous pour un devis personnalisé !"
        class="mt-8"
      />
    </UPageSection>

    <!-- Types d'événements -->
    <UPageSection
      title="Tous vos événements"
      description="Que ce soit pour un événement privé, professionnel ou associatif, Food en K s'adapte à vos besoins"
    >
      <UPageGrid class="lg:grid-cols-2">
        <!-- Événements Professionnels -->
        <UCard class="p-8">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <UIcon
                name="i-lucide-briefcase"
                class="w-8 h-8 text-white"
              />
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-2">
                Événements Professionnels
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Impressionnez vos collaborateurs et clients
              </p>
            </div>
          </div>

          <ul class="space-y-3">
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Team Building & Séminaires</span>
            </li>
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Inaugurations & Portes Ouvertes</span>
            </li>
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Événements d'entreprise</span>
            </li>
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Pause déjeuner sur site</span>
            </li>
          </ul>

          <UBadge
            color="info"
            variant="soft"
            class="mt-6"
          >
            <UIcon
              name="i-lucide-star"
              class="w-4 h-4 mr-2"
            />
            Tarifs spéciaux entreprises
          </UBadge>
        </UCard>

        <!-- Événements Privés -->
        <UCard class="p-8">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <UIcon
                name="i-lucide-heart"
                class="w-8 h-8 text-white"
              />
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-2">
                Événements Privés
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Célébrez vos moments spéciaux
              </p>
            </div>
          </div>

          <ul class="space-y-3">
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Mariages & Retours de mariage</span>
            </li>
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Anniversaires & Fêtes de famille</span>
            </li>
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>EVJF & EVG</span>
            </li>
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Baptêmes & Communions</span>
            </li>
          </ul>

          <UBadge
            color="secondary"
            variant="soft"
            class="mt-6"
          >
            <UIcon
              name="i-lucide-gift"
              class="w-4 h-4 mr-2"
            />
            Moments inoubliables
          </UBadge>
        </UCard>

        <!-- Événements Associatifs -->
        <UCard class="p-8">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <UIcon
                name="i-lucide-users"
                class="w-8 h-8 text-white"
              />
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-2">
                Événements Associatifs
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Soutenons ensemble la vie locale
              </p>
            </div>
          </div>

          <ul class="space-y-3">
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Festivals & Concerts</span>
            </li>
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Fêtes de village</span>
            </li>
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Événements sportifs</span>
            </li>
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Marchés & Brocantes</span>
            </li>
          </ul>

          <UBadge
            color="success"
            variant="soft"
            class="mt-6"
          >
            <UIcon
              name="i-lucide-heart-handshake"
              class="w-4 h-4 mr-2"
            />
            Tarifs associatifs préférentiels
          </UBadge>
        </UCard>

        <!-- Événements Festifs -->
        <UCard class="p-8">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <UIcon
                name="i-lucide-party-popper"
                class="w-8 h-8 text-white"
              />
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-2">
                Événements Festifs
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                L'art de faire la fête avec gourmandise
              </p>
            </div>
          </div>

          <ul class="space-y-3">
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Festivals gastronomiques</span>
            </li>
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Foires & Salons</span>
            </li>
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Événements saisonniers</span>
            </li>
            <li class="flex items-center gap-3">
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-green-500"
              />
              <span>Célébrations publiques</span>
            </li>
          </ul>

          <UBadge
            color="warning"
            variant="soft"
            class="mt-6"
          >
            <UIcon
              name="i-lucide-sparkles"
              class="w-4 h-4 mr-2"
            />
            Ambiance festive garantie
          </UBadge>
        </UCard>
      </UPageGrid>
    </UPageSection>

    <!-- Notre formule -->
    <UPageSection
      title="Notre formule événements"
      description="Une offre simple et complète pour régaler tous vos invités"
    >
      <UCard class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h3 class="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Formule "Tout Compris"
          </h3>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            De 50 à 500 personnes - Service devant le food truck
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <UIcon
                name="i-lucide-hamburger"
                class="w-6 h-6 text-primary-500"
              />
              Ce qui est inclus
            </h4>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span><strong>1 burger au choix</strong> parmi 4 de nos spécialités</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span><strong>1 barquette de frites maison</strong> fraîchement préparées</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span><strong>Service au plateau</strong> dans une ambiance conviviale</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span><strong>Options :</strong> dessert et/ou boisson (supplément)</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <UIcon
                name="i-lucide-star"
                class="w-6 h-6 text-yellow-500"
              />
              Nos avantages
            </h4>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span><strong>Cuisine minute</strong> devant vos invités</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span><strong>Produits 100% locaux</strong> et de qualité</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span><strong>Équipe professionnelle</strong> et souriante</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-check"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span><strong>Spectacle culinaire</strong> pour vos invités</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <UAlert
            icon="i-lucide-users"
            color="primary"
            variant="soft"
            title="50 personnes minimum"
            description="Tarifs dégressifs selon le nombre de convives. Base adulte."
          />
          <UAlert
            icon="i-lucide-heart-handshake"
            color="success"
            variant="soft"
            title="Associations"
            description="Tarifs préférentiels pour soutenir la vie associative locale."
          />
        </div>
      </UCard>
    </UPageSection>

    <!-- FAQ -->
    <UPageSection
      title="Questions fréquentes"
      description="Tout ce que vous devez savoir sur nos services événementiels"
    >
      <UAccordion
        :items="faqItems"
        :ui="{
          item: {
            padding: 'py-6'
          }
        }"
      />
    </UPageSection>

    <!-- CTA Final -->
    <UPageSection
      title="Prêt à organiser votre événement ?"
      description="Contactez-nous dès maintenant pour recevoir votre devis personnalisé et gratuit"
    >
      <UPageGrid class="lg:grid-cols-2 max-w-4xl mx-auto">
        <UPageCard
          title="Demander un devis"
          description="Remplissez notre formulaire de contact avec tous les détails de votre événement."
          to="/contact"
          class="text-center"
        >
          <template #icon>
            <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon
                name="i-lucide-file-text"
                class="w-10 h-10 text-white"
              />
            </div>
          </template>
          <template #footer>
            <UButton
              color="primary"
              size="lg"
              block
              to="/contact"
            >
              Obtenir un devis
            </UButton>
          </template>
        </UPageCard>

        <UPageCard
          title="Nous appeler directement"
          description="Discutons ensemble de votre projet au téléphone pour un conseil personnalisé."
          to="tel:0624316790"
          class="text-center"
        >
          <template #icon>
            <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon
                name="i-lucide-phone"
                class="w-10 h-10 text-white"
              />
            </div>
          </template>
          <template #footer>
            <UButton
              color="success"
              size="lg"
              block
              to="tel:0624316790"
            >
              06 24 31 67 90
            </UButton>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
  </div>
</template>

<script setup>
// FAQ Data
const faqItems = [
  {
    label: 'Combien de personnes minimum pour un événement ?',
    content: 'Nous intervenons à partir de 50 personnes minimum. Cette capacité nous permet d\'optimiser notre service et de vous proposer des tarifs attractifs. Pour les groupes plus petits, contactez-nous pour étudier les possibilités.',
    defaultOpen: true
  },
  {
    label: 'Dans quelle zone géographique intervenez-vous ?',
    content: 'Nous couvrons principalement la Bretagne : Ille-et-Vilaine, Côtes-d\'Armor et Morbihan. Des frais de déplacement peuvent s\'appliquer selon la distance. N\'hésitez pas à nous consulter pour votre localisation spécifique.'
  },
  {
    label: 'Quels sont les délais de réservation ?',
    content: 'Nous recommandons de nous contacter au moins 2 semaines avant votre événement pour garantir notre disponibilité. Pour les gros événements (plus de 200 personnes), prévoyez plutôt 1 mois à l\'avance.'
  },
  {
    label: 'Proposez-vous des options végétariennes ?',
    content: 'Absolument ! Nous avons des options végétariennes dans notre sélection de burgers. Prévenez-nous lors de votre demande pour que nous puissions adapter notre offre à vos besoins spécifiques.'
  },
  {
    label: 'Comment se déroule le service le jour J ?',
    content: 'Nous arrivons 1h avant le début du service pour installer notre food truck. Vos invités passent commande directement devant le camion et reçoivent leur repas chaud sur plateau. Le spectacle de la cuisine en direct fait partie de l\'expérience !'
  },
  {
    label: 'Que faut-il prévoir côté logistique ?',
    content: 'Nous avons besoin d\'un espace plat pour stationner le food truck (environ 8m x 3m) et d\'un accès à l\'électricité (prise 220V). Pour les événements en extérieur, nous sommes autonomes. Nous vous fournirons tous les détails techniques lors du devis.'
  },
  {
    label: 'Les tarifs sont-ils différents selon le type d\'événement ?',
    content: 'Nous pratiquons des tarifs dégressifs selon le nombre de convives. Les associations bénéficient de tarifs préférentiels. Chaque devis est personnalisé selon vos besoins spécifiques (options boissons, desserts, etc.).'
  },
  {
    label: 'Peut-on personnaliser le menu ?',
    content: 'Notre formule standard propose 4 burgers au choix, mais nous pouvons adapter selon vos préférences et contraintes alimentaires. Discutons-en ensemble pour créer la formule parfaite pour votre événement !'
  }
]

// Meta
definePageMeta({
  title: 'Événements - Food en K',
  description: 'Food Truck pour tous vos événements en Bretagne. Mariages, entreprise, associations. Service traiteur mobile de qualité.'
})

// SEO avec notre composable
const { setPageSeo, setBreadcrumb } = useSeo()

// Configuration SEO pour la page des événements
setPageSeo('events', {
  image: '/img/og-default.jpg'
})

// Breadcrumb
setBreadcrumb([
  { name: 'Accueil', url: '/' },
  { name: 'Événements', url: '/events' }
])
</script>
