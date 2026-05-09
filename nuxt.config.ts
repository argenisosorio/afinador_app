// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Desactiva el renderizado del lado del servidor para exportación estática (SSG)
  ssr: false,

  compatibilityDate: '2025-07-15',

  // Configuración de la ruta base para GitHub Pages
  app: {
    // 1. Define la base del repositorio
    baseURL: '/afinador_app_exportada/', 
    
    // 2. Renombra la carpeta '_nuxt' a 'assets' para evitar bloqueos de GitHub Pages/Jekyll
    buildAssetsDir: 'assets', 

    head: {
      htmlAttrs: {
        lang: 'es'
      },
      title: 'Afinador App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', content: 'Afinador App' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'author', content: 'Ing. Argenis Osorio' }
      ],
      link: [
        // El favicon con la ruta absoluta del repositorio
        { rel: 'icon', type: 'image/x-icon', href: '/afinador_app_exportada/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700;900&display=swap' }
      ]
    }
  },

  // Configuración de Nitro unificada
  nitro: {
    serveStatic: true,
    prerender: {
      crawlLinks: true
    },
    devProxy: {
      '/api': {
        target: (process as any).env.NUXT_PUBLIC_API_BASE,
        changeOrigin: true,
        prependPath: true,
      }
    }
  },

  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },

  css: [
    'assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  modules: ['@nuxt/eslint'],

  eslint: {
    checker: true
  }
})