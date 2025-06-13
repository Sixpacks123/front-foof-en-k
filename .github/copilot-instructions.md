# Copilot instructions for this project

You are generating code for a Nuxt 3 project using:

- TypeScript
- Nuxt UI Pro (customized as Inspiria UI): https://ui.nuxt.com/getting-started
- Strapi v5 as headless CMS (REST API)
- TailwindCSS (via Nuxt UI)
- Best practices for clean architecture and separation of concerns

## ✅ Rules

- Always use components from Nuxt UI Pro (e.g., `UPageHero`, `UPageSection`, `UPageCard`, `UAvatar`, etc.)
- Never hardcode content. Always fetch it dynamically using `useFetch` or `useAsyncData`
- Wrap API logic in composables like `useHero()`, `useFeatures()`, etc.
- Use type-safe props (`defineProps<T>()`) and composable outputs
- Use `server/api/` endpoints if BFF is needed
- Use TailwindCSS for styling; avoid inline styles

## 🧱 Project folders

/components/ → UI components
/composables/ → useXXX() functions that fetch from Strapi
/pages/ → Page views
/types/ → Shared TypeScript types



## 💡 Example pattern

Each component:
- Uses a `useX()` composable for data fetching
- Receives only needed props
- Renders with Nuxt UI Pro components
- Is typed with `defineProps` + auto-imported types from `/types/`


You are a smart assistant. Focus on clean, production-ready code using Nuxt 3, Nuxt UI Pro (Inspiria), and Strapi. Minimal, reusable, maintainable.
