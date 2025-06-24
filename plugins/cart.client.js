export default defineNuxtPlugin(() => {
  // Este plugin se ejecuta solo en el cliente
  const { syncWithStorage } = useCart()
  
  // Cargar el carrito cuando la página se hidrata
  if (process.client) {
    // Esperar a que la página esté completamente cargada
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', syncWithStorage)
    } else {
      // Si ya está cargada, sincronizar inmediatamente
      syncWithStorage()
    }
    
    // También sincronizar cuando la ventana se enfoca (por si se abrió en otra pestaña)
    window.addEventListener('focus', syncWithStorage)
  }
}) 