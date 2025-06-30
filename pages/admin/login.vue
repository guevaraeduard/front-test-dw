<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="text-6xl mb-4">🔐</div>
        <h2 class="text-3xl font-bold text-gray-900">Panel de Administración</h2>
        <p class="mt-2 text-sm text-gray-600">Ingresa tus credenciales para continuar</p>
      </div>

      <!-- Formulario de login -->
      <div class="bg-white rounded-lg shadow-xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input id="email" v-model="form.email" type="email" required
              class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="admin@techstore.com" :class="{ 'border-red-500 focus:ring-red-500': errors.email }" />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div class="relative">
              <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required
                class="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="••••••••" :class="{ 'border-red-500 focus:ring-red-500': errors.password }" />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                <div v-if="showPassword" class="text-lg">🙈</div>
                <div v-else class="text-lg">👁️</div>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>



          <!-- Botón de login -->
          <button type="submit" :disabled="isLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <div v-if="isLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>
        </form>


      </div>

      <!-- Footer -->
      <div class="text-center">
        <NuxtLink to="/" class="text-sm text-blue-600 hover:text-blue-800 transition-colors">
          ← Volver al sitio principal
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { showToast, validateEmail } from '~/helpers/funtions'
import { useApi } from '~/composables/useApi'
import { useAuth } from '~/composables/useAuth'
const { guardarData } = useApi();
const { setAuth } = useAuth()

// Meta tags
useHead({
  title: 'Login - Panel de Administración',
  meta: [
    { name: 'description', content: 'Acceso al panel de administración de TechStore' }
  ]
})

// Estado del formulario
const form = ref({
  email: '',
  password: ''
})

// Estado de la UI
const showPassword = ref(false)
const isLoading = ref(false)
const errors = ref({})
const generalError = ref('')



// Función de login
const handleLogin = async () => {

  if (form.value.email === '' || form.value.password === '') {
    showToast('Advertencia!', 'Todos los campos son requeridos', 'warning')
    return
  }
  if (!validateEmail(form.value.email)) {
    showToast('Error', 'El email no es válido', 'error')
    return
  }
  // Simular carga
  isLoading.value = true

  try {
    const response = await guardarData({
      email: form.value.email,
      password: form.value.password,
      end_point: 'auth/login',
    })
   
    if (response.operation) {
      setAuth(response.data.access_token, response.data.user)
      navigateTo('/admin/dashboard')
    } else {
      showToast('Error!', response.error || 'Error al iniciar sesión', 'error')
    }
  } catch (error) {
    showToast('Error!', 'Error al iniciar sesión', 'error')
  } finally {
    isLoading.value = false
  }


}
</script>