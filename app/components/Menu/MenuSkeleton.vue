<template>
  <UContainer class="pb-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="i in 6" :key="i" class="overflow-hidden">
        <template #header>
          <USkeleton class="aspect-video w-full" />
        </template>
        <div class="p-4 space-y-3">
          <div class="flex justify-between items-start">
            <USkeleton class="h-6 w-32" />
            <USkeleton class="h-6 w-16" />
          </div>
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-3/4" />
          <div class="flex gap-2">
            <USkeleton class="h-5 w-16 rounded-full" />
            <USkeleton class="h-5 w-20 rounded-full" />
          </div>
          <USkeleton class="h-9 w-full rounded-md" />
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
