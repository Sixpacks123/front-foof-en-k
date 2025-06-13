<script setup lang="ts">
const route = useRoute()

const items = computed(() => [{
  label: 'Menu',
  to: '/menus',
  active: route.path.startsWith('/menu')
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
        <NuxtImg
          src="/img/logo.png"
          alt="Logo"
          width="32"
          height="32"
          class="h-8 w-auto"
        />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />

      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />
      <!--
      <UButton
        label="Sign in"
        color="neutral"
        variant="outline"
        to="/login"
        class="hidden lg:inline-flex"
      />

      <UButton
        label="Sign up"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:inline-flex"
        to="/signup"
      /> -->
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
