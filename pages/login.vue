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
import { useUserAuth } from '~/composables/useUserAuth'
import { useGlobalNotification } from '~/composables/useGlobalNotification'
import { useRouter, useRoute } from 'vue-router'

const { login } = useUserAuth()
const { showSuccess, showError } = useGlobalNotification()
const router = useRouter()
const route = useRoute()

const formData = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)

const handleSubmit = async () => {
  if (!formData.value.email || !formData.value.password) {
    showError({
      title: 'Campos requeridos',
      message: 'Por favor completa todos los campos'
    })
    return
  }

  isLoading.value = true

  try {
    await login(formData.value)
    showSuccess({
      title: '¡Bienvenido!',
      message: 'Has iniciado sesión correctamente'
    })
    
    // Redirigir según el returnUrl o al dashboard por defecto
    const returnUrl = route.query.returnUrl
    if (returnUrl) {
      router.push(returnUrl)
    } else {
      router.push('/user/dashboard')
    }
  } catch (error) {
    showError({
      title: 'Error de autenticación',
      message: error.message
    })
  } finally {
    isLoading.value = false
  }
}
</script> 