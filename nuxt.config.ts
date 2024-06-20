// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-graphql-request"],
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
})