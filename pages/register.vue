<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>
      <form @submit.prevent="onRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Nombre</label>
          <input v-model="name" type="text" required class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Contraseña</label>
          <input v-model="password" type="password" required minlength="6" class="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Registrarse</button>
      </form>
      <p class="mt-4 text-center text-sm">¿Ya tienes cuenta? <NuxtLink to="/login" class="text-blue-600 hover:underline">Inicia sesión</NuxtLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserAuth } from '~/composables/useUserAuth'
import { useGlobalNotification } from '~/composables/useGlobalNotification'

const name = ref('')
const email = ref('')
const password = ref('')
const { register } = useUserAuth()
const { showSuccess, showError } = useGlobalNotification()
const router = useRouter()

const onRegister = async () => {
  try {
    await register({ name: name.value, email: email.value, password: password.value })
    showSuccess({ 
      title: 'Registro exitoso', 
      message: '¡Bienvenido a TechStore!' 
    })
    setTimeout(() => router.push('/user/dashboard'), 1000)
  } catch (e) {
    showError({ 
      title: 'Error de registro',
      message: e.message 
    })
  }
}
</script> 