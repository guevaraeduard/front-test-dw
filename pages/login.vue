<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Contraseña</label>
          <div class="relative">
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              required 
              class="w-full border rounded px-3 py-2 pr-10" 
            />
            <button 
              type="button"
              @click="togglePassword"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
          </div>
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" :disabled="isLoading">Entrar</button>
      </form>
      <p class="mt-4 text-center text-sm">¿No tienes cuenta? <NuxtLink to="/register" class="text-blue-600 hover:underline">Regístrate</NuxtLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { showToast } from '~/helpers/funtions'    
import { useApi } from '~/composables/useApi'
const { guardarData } = useApi();
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const { setAuth } = useAuth()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
  isLoading.value = true
  if(email.value === '' || password.value === ''){
    showToast('Advertencia!', 'Todos los campos son requeridos', 'warning')
    return
  }
  try {
    const response = await guardarData({
      email: email.value,
      password: password.value,
      type: 'user',
      end_point: 'auth/login',
    })
    
    if(response.operation){
      setAuth(response.data.access_token, response.data.user)
      navigateTo('/user/dashboard')
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