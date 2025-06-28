<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold mb-4">Mi cuenta</h2>
      <div class="mb-6">
        <div class="flex items-center space-x-4">
          <div class="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
            {{ userInitials }}
          </div>
          <div>
            <div class="font-semibold text-lg">{{ user.name }}</div>
            <div class="text-gray-500">{{ user.email }}</div>
          </div>
        </div>
      </div>
      <h3 class="text-lg font-semibold mb-2">Mis pedidos</h3>
      <div v-if="userOrders && userOrders.length">
        <div v-for="order in userOrders" :key="order.id" class="border rounded-lg p-4 mb-4">
          <div class="flex justify-between mb-2">
            <div class="font-semibold">Pedido #{{ order.id }}</div>
            <div class="text-sm text-gray-500">{{ formatDate(order.date) }}</div>
          </div>
          <div class="mb-2">
            <span class="text-sm">Estado: </span>
            <span class="font-medium" :class="getStatusColor(order.status)">{{ order.status }}</span>
          </div>
          <ul class="mb-2">
            <li v-for="item in order.items" :key="item.name" class="text-sm flex justify-between">
              <span>{{ item.name }} x{{ item.qty }}</span>
              <span>${{ item.price }}</span>
            </li>
          </ul>
          <div class="text-right font-bold">Total: ${{ order.total }}</div>
        </div>
      </div>
      <div v-else class="text-gray-500">No tienes pedidos aún.</div>
      <button @click="logoutAndGo" class="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">Cerrar sesión</button>
    </div>
  </div>
</template>
<script setup>
import { useUserAuth } from '~/composables/useUserAuth'
import { useRouter } from 'vue-router'
import { useOrders } from '~/composables/useOrders'

definePageMeta({ middleware: 'user-auth' })
const { user, logout } = useUserAuth()
const router = useRouter()
const { getUserOrders } = useOrders()

const userInitials = computed(() => {
  if (!user.value) return ''
  return user.value.name.split(' ').map(n => n[0]).join('').toUpperCase()
})

// Obtener órdenes del usuario
const userOrders = computed(() => {
  if (user.value) {
    return getUserOrders(user.value.email)
  }
  return []
})

// Formatear fecha
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Obtener color del estado
const getStatusColor = (status) => {
  switch (status) {
    case 'Entregado':
      return 'text-green-600 bg-green-100'
    case 'Procesando':
      return 'text-blue-600 bg-blue-100'
    case 'Enviado':
      return 'text-yellow-600 bg-yellow-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

const logoutAndGo = () => {
  logout()
  router.push('/')
}
</script> 