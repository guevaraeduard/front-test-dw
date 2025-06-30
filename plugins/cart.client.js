export default defineNuxtPlugin(() => {
  // Este plugin se ejecuta solo en el cliente
  const { syncWithStorage } = useCart()
  
  // Cargar el carrito cuando la página se hidrata
  if (process.client) {
    // Esperar a que la página esté completamente cargada
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        // Pequeño delay para asegurar que Nuxt esté completamente hidratado
        setTimeout(syncWithStorage, 100)
      })
    } else {
      // Si ya está cargada, sincronizar inmediatamente con un pequeño delay
      setTimeout(syncWithStorage, 100)
    }
    
    // También sincronizar cuando la ventana se enfoca (por si se abrió en otra pestaña)
    window.addEventListener('focus', syncWithStorage)
    
    // Sincronizar cuando se detecta un cambio en localStorage (para múltiples pestañas)
    window.addEventListener('storage', (e) => {
      if (e.key === 'techstore-cart') {
        syncWithStorage()
      }
    })
  }
}) 