<template>
  <div>
    <UPageHero
      title="Food en K - Burgers  & Traiteur"
      description="Découvrez nos burgers faits maison et notre service traiteur pour tous vos événements. Commandez en ligne ou contactez-nous pour une expérience gourmande et conviviale !"
      orientation="horizontal"
      image="/img/logo.png"
      :links="[
        {
          label: 'Voir nos burgers',
          to: '/menus',
          trailingIcon: 'i-lucide-hamburger',
          size: 'xl',
          color: 'primary'
        },
        {
          label: 'Nous contacter',
          to: '/contact',
          icon: 'i-lucide-phone',
          size: 'xl',
          variant: 'ghost'
        }
      ]"
    />

    <!-- Stats Marquee Enhanced -->
    <UPageMarquee>
      <div class="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-full">
        <UIcon
          name="i-lucide-map-pin"
          class="size-6 text-primary-600 dark:text-primary-400"
        />
        <span class="font-semibold text-primary-700 dark:text-primary-300">Merdrignac & environs</span>
      </div>
      <div class="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-full">
        <UIcon
          name="i-lucide-clock"
          class="size-6 text-green-600 dark:text-green-400"
        />
        <span class="font-semibold text-green-700 dark:text-green-300">Ouvert 7j/7</span>
      </div>
      <div class="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-full">
        <UIcon
          name="i-lucide-leaf"
          class="size-6 text-emerald-600 dark:text-emerald-400"
        />
        <span class="font-semibold text-emerald-700 dark:text-emerald-300">100% Produits locaux</span>
      </div>
      <div class="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-full">
        <UIcon
          name="i-lucide-truck"
          class="size-6 text-blue-600 dark:text-blue-400"
        />
        <span class="font-semibold text-blue-700 dark:text-blue-300">Food Truck mobile</span>
      </div>
      <div class="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-full">
        <UIcon
          name="i-lucide-users"
          class="size-6 text-purple-600 dark:text-purple-400"
        />
        <span class="font-semibold text-purple-700 dark:text-purple-300">Événements sur mesure</span>
      </div>
      <div class="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-full">
        <UIcon
          name="i-lucide-award"
          class="size-6 text-amber-600 dark:text-amber-400"
        />
        <span class="font-semibold text-amber-700 dark:text-amber-300">Artisan primé</span>
      </div>
      <div class="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 rounded-full">
        <UIcon
          name="i-lucide-heart"
          class="size-6 text-rose-600 dark:text-rose-400"
        />
        <span class="font-semibold text-rose-700 dark:text-rose-300">Fait avec amour</span>
      </div>
    </UPageMarquee>

    <!-- Features Section Enhanced -->
    <UPageSection
      title="Nos valeurs & engagements"
      description="Chez Food en K, nous privilégions la qualité, la fraîcheur et la convivialité. Nos produits sont sélectionnés avec soin et nos recettes évoluent au fil des saisons pour vous offrir le meilleur de la gastronomie bretonne."
    >
      <UPageGrid>
        <UPageCard
          icon="i-lucide-hamburger"
          title="Burgers artisanaux"
          description="Pain de la Boulangerie 1863, viande VBF locale, ingrédients frais et sauces maison préparées chaque jour avec passion."
          :ui="{
            icon: { base: 'w-12 h-12 mb-4 text-primary-500' },
            body: { padding: 'p-8' }
          }"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-hamburger"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-party-popper"
          title="Traiteur événementiel"
          description="Mariages, anniversaires, événements d'entreprise : un service personnalisé et de qualité adapté à tous vos besoins spéciaux."
          :ui="{
            icon: { base: 'w-12 h-12 mb-4 text-purple-500' },
            body: { padding: 'p-8' }
          }"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-party-popper"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-smartphone"
          title="Commande facilitée"
          description="Bientôt disponible : commandez facilement en ligne pour un retrait rapide ou contactez-nous directement."
          :ui="{
            icon: { base: 'w-12 h-12 mb-4 text-blue-500' },
            body: { padding: 'p-8' }
          }"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-smartphone"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-chef-hat"
          title="Savoir-faire artisanal"
          description="Chaque préparation respecte les traditions culinaires françaises avec une touche d'innovation moderne."
          :ui="{
            icon: { base: 'w-12 h-12 mb-4 text-orange-500' },
            body: { padding: 'p-8' }
          }"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-chef-hat"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-recycle"
          title="Démarche éco-responsable"
          description="Emballages recyclables, circuits courts et réduction du gaspillage alimentaire au cœur de nos préoccupations."
          :ui="{
            icon: { base: 'w-12 h-12 mb-4 text-green-500' },
            body: { padding: 'p-8' }
          }"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-recycle"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-clock-3"
          title="Service rapide"
          description="Préparation minute de vos commandes pour une fraîcheur optimale et un service efficace."
          :ui="{
            icon: { base: 'w-12 h-12 mb-4 text-teal-500' },
            body: { padding: 'p-8' }
          }"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-clock-3"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
    <!-- Produits locaux enhanced avec bento layout moderne -->
    <LocalProductsSection />

    <!-- Burger du moment enhanced -->
    <UPageSection
      title="Le burger signature du moment"
      description="Découvrez notre création vedette du moment, préparée avec passion par notre équipe et plébiscitée par nos clients !"
    >
      <UCard class="max-w-6xl mx-auto overflow-hidden">
        <div class="lg:flex lg:items-center lg:gap-0">
          <div class="lg:flex-1 lg:p-12 p-8">
            <div class="flex items-center gap-4 mb-6">
              <UBadge
                color="warning"
                size="lg"
                class="px-4 py-2"
              >
                <UIcon
                  name="i-lucide-flame"
                  class="w-5 h-5 mr-2"
                />
                Signature du Chef
              </UBadge>
              <UBadge
                color="success"
                variant="outline"
                size="lg"
                class="px-4 py-2"
              >
                <UIcon
                  name="i-lucide-leaf"
                  class="w-4 h-4 mr-2"
                />
                100% Local
              </UBadge>
            </div>

            <h3 class="text-4xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Le Classic Premium
            </h3>

            <p class="text-gray-600 dark:text-gray-400 text-xl mb-8 leading-relaxed">
              Notre buns artisanal doré à souhait, salade croquante du jardin, oignons frits croustillants,
              généreux cheddar fondu, steak VBF haché minute et notre légendaire sauce burger maison aux herbes secrètes.
            </p>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <UBadge
                variant="soft"
                size="md"
                class="justify-center py-2"
              >
                <UIcon
                  name="i-lucide-wheat"
                  class="w-4 h-4 mr-2"
                />
                Buns artisanal
              </UBadge>
              <UBadge
                variant="soft"
                size="md"
                class="justify-center py-2"
              >
                <UIcon
                  name="i-lucide-salad"
                  class="w-4 h-4 mr-2"
                />
                Salade fraîche
              </UBadge>
              <UBadge
                variant="soft"
                size="md"
                class="justify-center py-2"
              >
                <UIcon
                  name="i-lucide-zap"
                  class="w-4 h-4 mr-2"
                />
                Oignons frits
              </UBadge>
              <UBadge
                variant="soft"
                size="md"
                class="justify-center py-2"
              >
                <UIcon
                  name="i-lucide-cheese"
                  class="w-4 h-4 mr-2"
                />
                Cheddar premium
              </UBadge>
              <UBadge
                variant="soft"
                size="md"
                class="justify-center py-2"
              >
                <UIcon
                  name="i-lucide-beef"
                  class="w-4 h-4 mr-2"
                />
                Steak VBF
              </UBadge>
              <UBadge
                variant="soft"
                size="md"
                class="justify-center py-2"
              >
                <UIcon
                  name="i-lucide-droplets"
                  class="w-4 h-4 mr-2"
                />
                Sauce secrète
              </UBadge>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <UButton
                size="xl"
                color="primary"
                to="/menus"
                class="flex-1"
              >
                <UIcon
                  name="i-lucide-eye"
                  class="w-5 h-5 mr-2"
                />
                Voir tous nos burgers
              </UButton>
              <UButton
                size="xl"
                variant="outline"
                to="/contact"
                class="flex-1"
              >
                <UIcon
                  name="i-lucide-phone"
                  class="w-5 h-5 mr-2"
                />
                Commander maintenant
              </UButton>
            </div>
          </div>

          <div class="lg:w-96 relative">
            <div class="aspect-square bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-primary-900/20 dark:via-primary-800/20 dark:to-primary-700/20 rounded-2xl lg:rounded-none lg:rounded-r-2xl flex items-center justify-center relative overflow-hidden">
              <div class="text-center z-10">
                <div class="w-40 h-40 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <UIcon
                    name="i-lucide-hamburger"
                    class="w-20 h-20 text-white"
                  />
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Photo prochainement disponible
                </p>
              </div>

              <!-- Decorative elements -->
              <div class="absolute top-4 left-4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl" />
              <div class="absolute bottom-4 right-4 w-20 h-20 bg-red-400/20 rounded-full blur-xl" />
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-400/10 rounded-full blur-2xl" />

              <!-- Price tag enhanced -->
              <div class="absolute top-6 right-6">
                <div class="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  8,90€
                </div>
              </div>

              <!-- Popular badge -->
              <div class="absolute top-6 left-6">
                <UBadge
                  color="warning"
                  size="lg"
                  class="px-3 py-2"
                >
                  <UIcon
                    name="i-lucide-star"
                    class="w-4 h-4 mr-1"
                  />
                  Populaire
                </UBadge>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UPageSection>

    <!-- Map Component -->
    <MapLocations />

    <!-- Events Component -->
    <FoodTruckEventSection />

    <!-- CTA Simple vers les pages dédiées -->
    <UPageSection
      title="Prêt à découvrir Food en K ?"
      description="Contactez-nous pour vos commandes ou événements, ou découvrez notre carte complète"
    >
      <UPageGrid class="lg:grid-cols-3">
        <UPageCard
          icon="i-lucide-utensils"
          title="Découvrir nos menus"
          description="Consultez notre carte complète de burgers artisanaux et spécialités locales."
          to="/menus"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-utensils"
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
              Voir les menus
            </UButton>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-phone"
          title="Commander maintenant"
          description="Appelez-nous directement pour passer votre commande ou réserver."
          to="tel:0624316790"
        >
          <template #icon>
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-phone"
                class="w-8 h-8 text-white"
              />
            </div>
          </template>
          <template #footer>
            <UButton
              color="primary"
              block
              to="tel:0624316790"
            >
              06 24 31 67 90
            </UButton>
          </template>
        </UPageCard>

        <UPageCard
          icon="i-lucide-party-popper"
          title="Organiser un événement"
          description="Service traiteur pour mariages, anniversaires, événements d'entreprise."
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
              variant="outline"
              block
              to="/contact"
            >
              Nous contacter
            </UButton>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
  </div>
</template>

<script setup>
import MapLocations from '~/components/MapLocations.vue'
import FoodTruckEventSection from '~/components/FoodTruckEventSection.vue'
import LocalProductsSection from '~/components/LocalProductsSection.vue'

// Meta
definePageMeta({
  title: 'Food en K - Burgers artisanaux & Traiteur',
  description: 'Découvrez nos burgers faits maison et notre service traiteur pour tous vos événements à Merdrignac.'
})

// SEO
useSeoMeta({
  title: 'Food en K - Burgers artisanaux & Traiteur événementiel',
  description: 'Découvrez nos burgers faits maison et notre service traiteur pour tous vos événements. Produits locaux, viande bovine bretonne.',
  ogTitle: 'Food en K - Burgers artisanaux à Merdrignac',
  ogDescription: 'Burgers à la française avec viande bovine bretonne et ingrédients locaux. Service traiteur pour vos événements.',
  ogImage: '/og-foodenk.jpg'
})
</script>
