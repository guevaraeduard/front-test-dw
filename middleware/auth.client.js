export default defineNuxtRouteMiddleware((to, from) => {
  // Solo ejecutar en el cliente
  if (process.server) return

  // Verificar si hay datos de autenticación
  const authData = localStorage.getItem('adminAuth')
  
  if (!authData) {
    // No hay datos de autenticación, redirigir al login
    return navigateTo('/admin/login')
  }

  try {
    const auth = JSON.parse(authData)
    
    // Verificar si el token ha expirado
    if (auth.expiresAt && Date.now() > auth.expiresAt) {
      // Token expirado, limpiar y redirigir al login
      localStorage.removeItem('adminAuth')
      return navigateTo('/admin/login')
    }
    
    // Verificar que el usuario tenga rol de admin
    if (!auth.user || auth.user.role !== 'admin') {
      // Usuario no autorizado, limpiar y redirigir al login
      localStorage.removeItem('adminAuth')
      return navigateTo('/admin/login')
    }
    
    // Autenticación válida, permitir acceso
    return
    
  } catch (error) {
    // Error al parsear datos, limpiar y redirigir al login
    localStorage.removeItem('adminAuth')
    return navigateTo('/admin/login')
  }
}) 