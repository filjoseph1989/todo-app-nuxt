// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [
    "~/plugins/auth.ts"
  ],
  modules: [
    "nuxt-graphql-request",
  ],
  build: {
    transpile: ['nuxt-graphql-request'],
  },
  graphql: {
    clients: {
      default: {
        options: {},
      },
      auth: {
      },
    },
  },
});