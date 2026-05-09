// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Desactiva el renderizado del lado del servidor para exportación estática (SSG)
  ssr: false,

  compatibilityDate: '2025-07-15',

  // Configuración de la ruta base para GitHub Pages
  app: {
    baseURL: '/afinador_app_exportada/', // <--- Crucial para corregir el error MIME
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
        // El favicon ahora también debe apuntar a la ruta base correcta
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
    // Asegura que todas las rutas se generen correctamente
    prerender: {
      crawlLinks: true
    },
    // Configuración de Proxy para desarrollo
    devProxy: {
      '/api': {
        target: (process as any).env.NUXT_PUBLIC_API_BASE,
        changeOrigin: true,
        prependPath: true,
      }
    }
  },

  devtools: { enabled: false },

  // Variables de configuración accesibles en la app
  runtimeConfig: {
    public: {
      // Al usar el proxy, la URL base para el frontend es simplemente '/api'
      apiBase: '/api'
    }
  },

  // Estilos globales y Iconos
  css: [
    'assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  // Módulos y Linter
  modules: ['@nuxt/eslint'],

  eslint: {
    checker: true
  }
})