<template>
  <UPageSection
    v-if="burgerDuMoment"
    title="Le burger signature du moment"
    description="Découvrez notre création vedette du moment, préparée avec passion par notre équipe et plébiscitée par nos clients !"
  >
    <UCard class="max-w-6xl mx-auto overflow-hidden">
      <div class="lg:flex lg:items-center lg:gap-0">
        <div class="lg:flex-1 lg:p-12 p-8">
          <div class="flex items-center gap-4 mb-6 flex-wrap">
            <UBadge
              v-for="badge in productBadges"
              :key="badge.label"
              :color="badge.color"
              :variant="badge.variant || 'solid'"
              size="lg"
              class="px-4 py-2"
            >
              <UIcon
                :name="badge.icon"
                class="w-5 h-5 mr-2"
              />
              {{ badge.label }}
            </UBadge>
          </div>

          <h3 class="text-4xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            {{ burgerDuMoment.name }}
          </h3>

          <p class="text-gray-600 dark:text-gray-400 text-xl mb-8 leading-relaxed">
            {{ burgerDuMoment.description || 'Notre burger signature préparé avec des ingrédients frais et locaux, une recette unique qui fait notre fierté.' }}
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <UBadge
              v-for="ingredient in ingredientsList"
              :key="ingredient"
              variant="soft"
              size="md"
              class="justify-center py-2"
            >
              <UIcon
                name="i-lucide-circle-dot"
                class="w-4 h-4 mr-2"
              />
              {{ ingredient }}
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
            <!-- Product image if available -->
            <NuxtImg
              v-if="burgerDuMoment.images?.[0]"
              v-bind="optimizedBurgerImage"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <!-- Fallback placeholder -->
            <div
              v-else
              class="text-center z-10"
            >
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
                {{ formatPrice(burgerDuMoment.price) }}
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
</template>

<script setup>
import { NuxtImg } from '#components'

// =====================================
// BURGER DU MOMENT
// =====================================

const {
  fetchBurgerDuMoment,
  getIngredientsList,
  formatPrice,
  getProductBadges
} = useBurgerDuMoment()

const { getCardImageProps } = useOptimizedImage()

// Fetch burger du moment data
const { data: burgerDuMoment } = await useAsyncData(
  'burger-du-moment',
  async () => {
    try {
      return await fetchBurgerDuMoment()
    } catch {
      // Silently handle the error - no burger du moment available
      return null
    }
  },
  {
    default: () => null,
    server: true
  }
)

// Computed values for template
const ingredientsList = computed(() => {
  return burgerDuMoment.value ? getIngredientsList(burgerDuMoment.value) : []
})

const productBadges = computed(() => {
  return burgerDuMoment.value ? getProductBadges(burgerDuMoment.value) : []
})

// Optimized burger image
const optimizedBurgerImage = computed(() => {
  if (!burgerDuMoment.value?.images?.[0]) return {}

  return getCardImageProps(burgerDuMoment.value.images[0], 'medium')
})
</script>
