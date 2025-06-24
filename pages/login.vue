<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
      <form @submit.prevent="onLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Contraseña</label>
          <input v-model="password" type="password" required class="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Entrar</button>
      </form>
      <p class="mt-4 text-center text-sm">¿No tienes cuenta? <NuxtLink to="/register" class="text-blue-600 hover:underline">Regístrate</NuxtLink></p>
    </div>
    <SuccessNotification
      :is-visible="notification.isVisible.value"
      :title="notification.title.value"
      :message="notification.message.value"
      :duration="notification.duration.value"
      @close="notification.hideNotification"
    />
    <ErrorNotification
      :is-visible="notification.type.value === 'error' && notification.isVisible.value"
      :title="notification.title.value"
      :message="notification.message.value"
      :duration="notification.duration.value"
      @close="notification.hideNotification"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUserAuth } from '~/composables/useUserAuth'
import { useNotification } from '~/composables/useNotification'
const email = ref('')
const password = ref('')
const { login } = useUserAuth()
const notification = useNotification()
const router = useRouter()

const onLogin = async () => {
  try {
    await login({ email: email.value, password: password.value })
    notification.showSuccess({ title: 'Bienvenido', message: 'Has iniciado sesión correctamente.' })
    setTimeout(() => router.push('/user/dashboard'), 1000)
  } catch (e) {
    notification.showError({ message: e.message })
  }
}
</script> 