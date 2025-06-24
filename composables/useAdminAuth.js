export const useAdminAuth = () => {
  // Estado reactivo del usuario
  const user = ref(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(true)

  // Función para obtener datos de autenticación
  const getAuthData = () => {
    if (process.server) return null
    
    try {
      const authData = localStorage.getItem('adminAuth')
      if (!authData) return null
      
      const auth = JSON.parse(authData)
      
      // Verificar si el token ha expirado
      if (auth.expiresAt && Date.now() > auth.expiresAt) {
        localStorage.removeItem('adminAuth')
        return null
      }
      
      return auth
    } catch (error) {
      localStorage.removeItem('adminAuth')
      return null
    }
  }

  // Función para inicializar el estado de autenticación
  const initAuth = () => {
    const auth = getAuthData()
    
    if (auth && auth.user) {
      user.value = auth.user
      isAuthenticated.value = true
    } else {
      user.value = null
      isAuthenticated.value = false
    }
    
    isLoading.value = false
  }

  // Función para hacer logout
  const logout = () => {
    localStorage.removeItem('adminAuth')
    user.value = null
    isAuthenticated.value = false
    
    // Redirigir al login
    navigateTo('/admin/login')
  }

  // Función para verificar si el usuario está autenticado
  const checkAuth = () => {
    const auth = getAuthData()
    return auth && auth.user && auth.user.role === 'admin'
  }

  // Inicializar al cargar el composable
  if (process.client) {
    initAuth()
  }

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    logout,
    checkAuth,
    initAuth
  }
} 