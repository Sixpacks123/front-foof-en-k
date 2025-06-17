<template>
  <div class="py-4">
    <UPageMarquee>
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-3 px-5 py-3 rounded-full shadow-sm border"
        :class="item.classes"
      >
        <UIcon
          :name="item.icon"
          class="size-5"
          :class="item.iconClasses"
        />
        <span
          class="font-semibold text-sm"
          :class="item.textClasses"
        >
          {{ item.text }}
        </span>
      </div>
    </UPageMarquee>
  </div>
</template>

<script setup>
// Props pour personnaliser les éléments du marquee
defineProps({
  items: {
    type: Array,
    default: () => [
      {
        icon: 'i-lucide-map-pin',
        text: 'Merdrignac & environs',
        classes: 'bg-white dark:bg-neutral-800 border-primary-200 dark:border-primary-700',
        iconClasses: 'text-primary-600 dark:text-primary-400',
        textClasses: 'text-primary-700 dark:text-primary-300'
      },
      {
        icon: 'i-lucide-clock',
        text: 'Ouvert 7j/7',
        classes: 'bg-white dark:bg-neutral-800 border-green-200 dark:border-green-700',
        iconClasses: 'text-green-600 dark:text-green-400',
        textClasses: 'text-green-700 dark:text-green-300'
      },
      {
        icon: 'i-lucide-leaf',
        text: '100% Produits locaux',
        classes: 'bg-white dark:bg-neutral-800 border-emerald-200 dark:border-emerald-700',
        iconClasses: 'text-emerald-600 dark:text-emerald-400',
        textClasses: 'text-emerald-700 dark:text-emerald-300'
      },
      {
        icon: 'i-lucide-truck',
        text: 'Food Truck mobile',
        classes: 'bg-white dark:bg-neutral-800 border-blue-200 dark:border-blue-700',
        iconClasses: 'text-blue-600 dark:text-blue-400',
        textClasses: 'text-blue-700 dark:text-blue-300'
      },
      {
        icon: 'i-lucide-users',
        text: 'Événements sur mesure',
        classes: 'bg-white dark:bg-neutral-800 border-purple-200 dark:border-purple-700',
        iconClasses: 'text-purple-600 dark:text-purple-400',
        textClasses: 'text-purple-700 dark:text-purple-300'
      },
      {
        icon: 'i-lucide-award',
        text: 'Artisan primé',
        classes: 'bg-white dark:bg-neutral-800 border-amber-200 dark:border-amber-700',
        iconClasses: 'text-amber-600 dark:text-amber-400',
        textClasses: 'text-amber-700 dark:text-amber-300'
      },
      {
        icon: 'i-lucide-heart',
        text: 'Fait avec amour',
        classes: 'bg-white dark:bg-neutral-800 border-rose-200 dark:border-rose-700',
        iconClasses: 'text-rose-600 dark:text-rose-400',
        textClasses: 'text-rose-700 dark:text-rose-300'
      }
    ]
  }
})
</script>
