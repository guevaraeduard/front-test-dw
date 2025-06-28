import { useCookie } from '#app'
import { useApi } from '~/composables/useApi'

export const useAuth = () => {
  const token = useCookie('auth_token')
  const user = useCookie('user_data')
  const api = useApi()
  let lastValidationTime = 0
  const VALIDATION_CACHE_TIME = 5 * 60 * 1000 // 5 minutos en milisegundos

  const setAuth = (tokenData, userData) => {
    token.value = tokenData
    user.value = userData
  }

  const clearAuth = () => {
    token.value = null
    user.value = null
    lastValidationTime = 0
  }

  const isAuthenticated = () => {
    return new Promise((resolve) => {
      // Validación básica del token
      if (!token.value) {
        resolve(false)
        return
      }

      // Verificar si el token está en caché y es válido
      const currentTime = Date.now()
      if (lastValidationTime && (currentTime - lastValidationTime) < VALIDATION_CACHE_TIME) {
        resolve(true)
        return
      }

      // Si no hay caché o expiró, validar con el servidor
      api.guardarData({
        end_point: 'auth/validate-token',
      })
        .then((response) => {
          if (response.operation) {
            setAuth(response.data.token, response.data.user)
            lastValidationTime = currentTime
            resolve(true)
          } else {
            clearAuth()
            resolve(false)
          }
        })
        .catch(() => {
          clearAuth()
          resolve(false)
        })
    })
  }

  const setTwoFactor = (code) => {
    if(user.value){
      user.value.code_fau = code
    }
  }



  return {
    token,
    user,
    setAuth,
    clearAuth,
    isAuthenticated,
    setTwoFactor,
  }
} 