<script setup lang="ts">
const route = useRoute()

const items = computed(() => [{
  label: 'Menu',
  to: '/menus',
  active: route.path.startsWith('/menu')
}, {
  label: 'Emplacements',
  to: '/emplacements',
  active: route.path.startsWith('/emplacements')
}, {
  label: 'Evenements',
  to: '/events',
  active: route.path.startsWith('/events')
}, {
  label: 'Contact',
  to: '/contact'
}])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <img
          src="/img/logo.png"
          alt="Logo"
          class="h-24 w-auto"
        >
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <CartButton />

      <UColorModeButton />

      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <UButton
        label="Sign in"
        color="neutral"
        variant="subtle"
        to="/login"
        block
        class="mb-3"
      />
      <UButton
        label="Sign up"
        color="neutral"
        to="/signup"
        block
      />
    </template>
  </UHeader>
</template>
