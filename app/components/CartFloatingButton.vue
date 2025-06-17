<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-full opacity-0"
    >
      <div
        v-if="!isEmpty && !isOpen"
        class="fixed bottom-0 left-0 right-0 z-50 p-4 md:bottom-6 md:right-6 md:left-auto md:max-w-sm"
      >
        <!-- Mobile: Full width bottom bar -->
        <div class="md:hidden">
          <UButton
            :label="`Voir le panier (${itemCount})`"
            :trailing="`${totalPrice.toFixed(2)}€`"
            size="xl"
            color="primary"
            variant="solid"
            class="w-full shadow-2xl"
            @click="toggleCart"
          >
            <template #leading>
              <UChip
                :text="itemCount > 99 ? '99+' : itemCount"
                :show="itemCount > 0"
                color="error"
              >
                <UIcon
                  name="i-heroicons-shopping-bag"
                />
              </UChip>
            </template>
          </UButton>
        </div>

        <!-- Desktop: Floating card -->
        <div class="hidden md:block">
          <UCard class="shadow-2xl border-2 border-primary-200 dark:border-primary-800">
            <div class="flex items-center justify-between p-2">
              <div class="flex items-center gap-3">
                <UChip
                  :text="itemCount > 99 ? '99+' : itemCount"
                  :show="itemCount > 0"
                  color="error"
                  size="sm"
                >
                  <UIcon
                    name="i-heroicons-shopping-bag"
                    class="w-6 h-6 text-primary-600"
                  />
                </UChip>
                <div>
                  <p class="font-semibold text-sm">
                    {{ itemCount }} {{ itemCount > 1 ? 'articles' : 'article' }}
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    {{ totalPrice.toFixed(2) }}€
                  </p>
                </div>
              </div>
              <UButton
                size="sm"
                color="primary"
                variant="solid"
                @click="toggleCart"
              >
                Voir
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { isEmpty, itemCount, totalPrice, toggleCart, isOpen } = useCart()
</script>
