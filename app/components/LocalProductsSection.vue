<template>
  <div class="mx-auto max-w-7xl px-6 py-16">
    <!-- En-tête de section -->
    <div class="mb-12 text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Des produits locaux d'exception
      </h2>
      <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Découvrez nos partenaires locaux qui font la différence dans nos burgers
      </p>
    </div>

    <!-- Bento Grid optimisée et responsive -->
    <div class="grid auto-rows-[18rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:auto-rows-[20rem]">
      <!-- Boulangerie 1863 - Carte principale enrichie -->
      <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20 border border-amber-200 dark:border-amber-800 p-4 sm:p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2">
        <!-- Badge premium -->
        <div class="absolute right-2 top-2 z-20 sm:right-4 sm:top-4">
          <UBadge
            color="warning"
            variant="solid"
            size="sm"
            class="shadow-lg sm:size-lg"
          >
            <UIcon
              name="i-lucide-crown"
              class="h-3 w-3 mr-1 sm:h-4 sm:w-4"
            />
            <span class="hidden sm:inline">Partenaire Exclusif</span>
            <span class="sm:hidden">Exclusif</span>
          </UBadge>
        </div>

        <!-- Image de fond décorative -->
        <div class="absolute inset-0 opacity-5">
          <UIcon
            name="i-lucide-wheat"
            class="absolute right-4 top-1/2 h-24 w-24 -translate-y-1/2 rotate-12 text-amber-600 sm:right-8 sm:h-32 sm:w-32 lg:h-40 lg:w-40"
          />
        </div>

        <!-- Contenu principal -->
        <div class="relative z-10 flex h-full flex-col">
          <!-- En-tête avec logo et titre -->
          <div class="mb-4 flex items-start gap-3 sm:mb-6 sm:gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 sm:h-16 sm:w-16">
              <UIcon
                name="i-lucide-wheat"
                class="h-6 w-6 sm:h-8 sm:w-8"
              />
            </div>

            <div class="flex-1">
              <h3 class="text-xl font-bold text-amber-900 dark:text-amber-100 sm:text-2xl lg:text-3xl">
                Boulangerie 1863
              </h3>
              <p class="mt-1 text-sm text-amber-700 dark:text-amber-300 sm:mt-2 sm:text-base lg:text-lg">
                Nos pains burger sont confectionnés selon notre recette maison exclusive
              </p>
            </div>
          </div>

          <!-- Informations détaillées -->
          <div class="mb-4 space-y-3 sm:mb-6 sm:space-y-4">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/50 sm:h-10 sm:w-10">
                <UIcon
                  name="i-lucide-map-pin"
                  class="h-4 w-4 text-amber-600 dark:text-amber-400 sm:h-5 sm:w-5"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-amber-900 dark:text-amber-100 sm:text-base">
                  Merdrignac, Côtes-d'Armor
                </p>
                <p class="text-xs text-amber-700 dark:text-amber-300 sm:text-sm">
                  Fabrication locale artisanale
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 sm:gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/50 sm:h-10 sm:w-10">
                <UIcon
                  name="i-lucide-clock"
                  class="h-4 w-4 text-orange-600 dark:text-orange-400 sm:h-5 sm:w-5"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-amber-900 dark:text-amber-100 sm:text-base">
                  Fraîcheur quotidienne
                </p>
                <p class="text-xs text-amber-700 dark:text-amber-300 sm:text-sm">
                  Livraison chaque matin à 6h
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 sm:gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/50 sm:h-10 sm:w-10">
                <UIcon
                  name="i-lucide-award"
                  class="h-4 w-4 text-red-600 dark:text-red-400 sm:h-5 sm:w-5"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-amber-900 dark:text-amber-100 sm:text-base">
                  Recette signature Food en K
                </p>
                <p class="text-xs text-amber-700 dark:text-amber-300 sm:text-sm">
                  Développée exclusivement pour nous
                </p>
              </div>
            </div>
          </div>

          <!-- Stats visuelles -->
          <div class="mb-4 grid grid-cols-3 gap-2 sm:mb-6 sm:gap-4">
            <div class="text-center">
              <div class="text-lg font-bold text-amber-900 dark:text-amber-100 sm:text-2xl">
                15+
              </div>
              <div class="text-xs text-amber-700 dark:text-amber-300">
                Ans d'expérience
              </div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold text-orange-900 dark:text-orange-100 sm:text-2xl">
                100%
              </div>
              <div class="text-xs text-orange-700 dark:text-orange-300">
                Fait maison
              </div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold text-red-900 dark:text-red-100 sm:text-2xl">
                7j/7
              </div>
              <div class="text-xs text-red-700 dark:text-red-300">
                Disponible
              </div>
            </div>
          </div>

          <!-- Call to action -->
          <div class="mt-auto">
            <UButton
              color="warning"
              variant="solid"
              size="md"
              label="Découvrir nos pains"
              icon="i-lucide-external-link"
              trailing
              class="w-full shadow-lg transition-all hover:shadow-xl sm:size-lg"
            />
          </div>
        </div>

        <!-- Effet de survol -->
        <div class="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-amber-900/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <!-- Viande locale - Carte compacte mais riche -->
      <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:p-5">
        <div class="absolute right-2 top-2 sm:right-3 sm:top-3">
          <UBadge
            color="error"
            variant="soft"
            size="sm"
          >
            <UIcon
              name="i-lucide-beef"
              class="h-3 w-3 mr-1"
            />
            Premium
          </UBadge>
        </div>

        <div class="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md sm:h-12 sm:w-12">
            <UIcon
              name="i-lucide-beef"
              class="h-5 w-5 sm:h-6 sm:w-6"
            />
          </div>
          <div>
            <h3 class="text-base font-bold text-red-900 dark:text-red-100 sm:text-lg">
              Viande Locale
            </h3>
            <p class="text-xs text-red-700 dark:text-red-300 sm:text-sm">
              Élevage breton
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-shield-check"
              class="h-4 w-4 text-red-600"
            />
            <span class="text-sm text-red-800 dark:text-red-200">Traçabilité complète</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-leaf"
              class="h-4 w-4 text-green-600"
            />
            <span class="text-sm text-red-800 dark:text-red-200">Élevage responsable</span>
          </div>
        </div>

        <div class="mt-4">
          <UButton
            color="error"
            variant="soft"
            size="sm"
            class="w-full"
          >
            En savoir plus
          </UButton>
        </div>
      </div>

      <!-- Légumes bio -->
      <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:p-5">
        <div class="absolute right-2 top-2 sm:right-3 sm:top-3">
          <UBadge
            color="success"
            variant="soft"
            size="sm"
          >
            <UIcon
              name="i-lucide-leaf"
              class="h-3 w-3 mr-1"
            />
            Bio
          </UBadge>
        </div>

        <div class="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md sm:h-12 sm:w-12">
            <UIcon
              name="i-lucide-carrot"
              class="h-5 w-5 sm:h-6 sm:w-6"
            />
          </div>
          <div>
            <h3 class="text-base font-bold text-green-900 dark:text-green-100 sm:text-lg">
              Légumes Bio
            </h3>
            <p class="text-xs text-green-700 dark:text-green-300 sm:text-sm">
              Producteurs locaux
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-sprout"
              class="h-4 w-4 text-green-600"
            />
            <span class="text-sm text-green-800 dark:text-green-200">Zéro pesticide</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-truck"
              class="h-4 w-4 text-green-600"
            />
            <span class="text-sm text-green-800 dark:text-green-200">Circuit court</span>
          </div>
        </div>

        <div class="mt-4">
          <UButton
            color="success"
            variant="soft"
            size="sm"
            class="w-full"
          >
            Nos légumes
          </UButton>
        </div>
      </div>
      <!-- Call to action central -->
      <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-4 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:p-6 sm:col-span-2 md:col-span-2">
        <div class="absolute inset-0 opacity-10" />

        <div class="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-lg sm:mb-4 sm:h-16 sm:w-16">
            <UIcon
              name="i-lucide-heart-handshake"
              class="h-6 w-6 sm:h-8 sm:w-8"
            />
          </div>

          <h3 class="mb-2 text-lg font-bold sm:text-xl">
            Rejoignez l'aventure locale
          </h3>
          <p class="mb-4 text-xs text-slate-300 sm:mb-6 sm:text-sm">
            Découvrez tous nos partenaires et leur savoir-faire exceptionnel
          </p>

          <div class="flex flex-wrap gap-1 justify-center mb-4 sm:gap-2 sm:mb-6">
            <UBadge
              color="warning"
              variant="soft"
              size="sm"
            >
              Artisans locaux
            </UBadge>
            <UBadge
              color="success"
              variant="soft"
              size="sm"
            >
              Circuit court
            </UBadge>
            <UBadge
              color="error"
              variant="soft"
              size="sm"
            >
              Qualité premium
            </UBadge>
          </div>

          <UButton
            color="primary"
            variant="solid"
            size="md"
            label="Découvrir nos partenaires"
            icon="i-lucide-users"
            trailing
            class="shadow-lg sm:size-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pas de props nécessaires pour ce composant autonome
</script>
