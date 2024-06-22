import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  plugins: [
    "~/plugins/auth.ts"
  ],
  modules: [
    "nuxt-graphql-request",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  build: {
    transpile: [
      'nuxt-graphql-request',
      'vuetify',
    ],
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
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});