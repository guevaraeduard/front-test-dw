<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="formData.email" type="email" required class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Contraseña</label>
          <input v-model="formData.password" type="password" required class="w-full border rounded px-3 py-2" />
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
const { setAuth } = useAuth()

const handleSubmit = async () => {

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
  }
}
</script> 