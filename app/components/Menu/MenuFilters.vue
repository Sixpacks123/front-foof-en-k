<script setup lang="ts">
interface Props {
  categories: Array<{ id: number, name: string }>
  selectedCategory?: number | null
}

const props = defineProps<Props>()
const emit = defineEmits(['update:selectedCategory'])

const items = computed(() => [
  {
    label: 'Tous',
    value: undefined as string | number | undefined
  },
  ...props.categories.map(category => ({
    label: category.name,
    value: category.id as string | number | undefined
  }))
])

const selectedTab = computed({
  get: () => props.selectedCategory === null ? undefined : props.selectedCategory,
  set: value => emit('update:selectedCategory', value === undefined ? null : value)
})
</script>

<template>
  <UContainer>
    <UTabs
      v-model="selectedTab"
      color="primary"
      variant="link"
      :content="false"
      :items="items"
      class="w-full mt-8"
    />
  </UContainer>
</template>
