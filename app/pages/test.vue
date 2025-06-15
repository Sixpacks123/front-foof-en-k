<template>
  <div
    class="text-6xl font-bold"
    :class="props.class"
  >
    <span class="relative inline-block">
      <template
        v-for="burger in burgers"
        :key="burger.id"
      >
        <!-- Animated burger with bounce, scale, and rotation effects -->
        <Motion
          :initial="{ opacity: 0, scale: 0, rotate: -15 }"
          :animate="{
            opacity: [0, 1, 0],
            scale: [0, burger.scale, 0],
            rotate: [-15, 0, 15],
            y: [0, -10, 0]
          }"
          :transition="{
            duration: 1.2,
            repeat: Infinity,
            delay: burger.delay,
            ease: 'easeInOut'
          }"
          as="div"
          class="pointer-events-none absolute z-20"
          :style="{
            left: burger.x,
            top: burger.y,
            opacity: 0,
            fontSize: burger.size
          }"
        >
          {{ burger.emoji }}
        </Motion>
      </template>
      Food en k 
    </span>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { ref, onMounted, onUnmounted } from 'vue'

interface Burger {
  id: string
  x: string
  y: string
  emoji: string
  delay: number
  scale: number
  size: string
  lifespan: number
}

interface Props {
  text: string
  burgersCount?: number
  burgerTypes?: string[]
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  burgersCount: 8,
  burgerTypes: () => ['🍔', '🍟', '🌭', '🥪', '🌮', '🍕']
})

const burgers = ref<Burger[]>([])

// Generate a new burger with randomized properties
function generateBurger(): Burger {
  const burgerX = `${Math.random() * 100}%`
  const burgerY = `${Math.random() * 100}%`
  const emoji = props.burgerTypes[Math.floor(Math.random() * props.burgerTypes.length)]
  const delay = Math.random() * 3
  const scale = Math.random() * 0.8 + 0.5
  const size = `${Math.random() * 20 + 15}px`
  const lifespan = Math.random() * 12 + 8
  const id = `${burgerX}-${burgerY}-${Date.now()}`

  return { id, x: burgerX, y: burgerY, emoji, delay, scale, size, lifespan }
}

// Initialize burgers array with random food items
function initializeBurgers() {
  burgers.value = Array.from({ length: props.burgersCount }, generateBurger)
}

// Update burgers - regenerate dead ones and update lifespans
function updateBurgers() {
  burgers.value = burgers.value.map((burger) => {
    if (burger.lifespan <= 0) {
      return generateBurger()
    } else {
      return { ...burger, lifespan: burger.lifespan - 0.1 }
    }
  })
}

let interval: number

// Start animation loop
onMounted(() => {
  initializeBurgers()
  interval = window.setInterval(updateBurgers, 100)
})

// Cleanup on unmount
onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>
