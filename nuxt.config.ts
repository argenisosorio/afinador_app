// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // 1. Configuración de Proxy con Nitro
  // Esto hace que las peticiones a '/api' sean redirigidas internamente al backend
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://192.168.4.1/api', // Tu IP Real del backend
        changeOrigin: true,
        prependPath: true,
      }
    }
  },

  devtools: { enabled: false },

  // 2. Variables de configuración accesibles en la app
  runtimeConfig: {
    public: {
      // Al usar el proxy, la URL base para el frontend es simplemente '/api'
      apiBase: '/api'
    }
  },

  // 3. Configuración de etiquetas Meta Globales (SEO y Autoría)
  app: {
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      title: 'SINIDOT V2 - Sistema de Gestión',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', content: 'Sistema Integral de Donación y Trasplante' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'author', content: 'Ing. Argenis Osorio' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700;900&display=swap' }
      ]
    }
  },

  // 4. Estilos globales y Iconos
  css: [
    'assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  // 5. Módulos y Linter
  modules: ['@nuxt/eslint'],

  eslint: {
    checker: true
  }
})