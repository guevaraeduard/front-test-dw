// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-toast'],
  runtimeConfig: {
    // Variables privadas (solo servidor)
    apiSecret: '',
    // Variables públicas (cliente y servidor)
    public: {
      backendUrl: 'http://localhost:3001/api/',
    }
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'TechStore - PCs y Componentes',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Tu tienda de confianza para PCs y componentes de computadora. Las mejores marcas al mejor precio.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})