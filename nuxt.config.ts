export default defineNuxtConfig({
  plugins: [
    "~/plugins/auth.ts"
  ],
  modules: [
    "nuxt-graphql-request",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  build: {
    transpile: ['nuxt-graphql-request'],
  },
  graphql: {
    clients: {
      default: {
        endpoint: `${process.env.GRAPHQL_URL}`,
        options: {},
      },
      auth: {
        endpoint: `${process.env.GRAPHQL_AUTH_URL}`,
      },
    },
  },
  router: {
    middleware: 'auth'
  },
  pinia:  {
    autoImports: [
      'defineStore'
    ]
  }
});