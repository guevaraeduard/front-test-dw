<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-blue-600">TechStore</NuxtLink>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <a href="#inicio" class="text-gray-700 hover:text-blue-600 transition-colors">Inicio</a>
          <NuxtLink to="/products" class="text-gray-700 hover:text-blue-600 transition-colors">Productos</NuxtLink>
          <a href="#ofertas" class="text-gray-700 hover:text-blue-600 transition-colors">Ofertas</a>
          <a href="#contacto" class="text-gray-700 hover:text-blue-600 transition-colors">Contacto</a>
          <NuxtLink to="/admin/login" class="text-gray-700 hover:text-blue-600 transition-colors">Admin</NuxtLink>
        </div>
        <div class="flex items-center space-x-4">
          <NuxtLink to="/cart" class="btn-primary">Carrito ({{ totalItems }})</NuxtLink>
          <!-- Acceso de usuario -->
          <template v-if="user && user.value">
            <NuxtLink to="/user/dashboard" class="ml-2 bg-gray-100 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition">Mi cuenta</NuxtLink>
            <button @click="logoutAndGo" class="ml-2 bg-red-100 text-red-700 px-3 py-2 rounded-lg font-semibold hover:bg-red-200 transition">Cerrar sesión</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="ml-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-200 transition">Iniciar sesión</NuxtLink>
            <NuxtLink to="/register" class="ml-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 transition">Registrarse</NuxtLink>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useCart } from '~/composables/useCart'
import { useUserAuth } from '~/composables/useUserAuth'
import { useRouter } from 'vue-router'

const { totalItems } = useCart()
const { user, logout } = useUserAuth()
const router = useRouter()

const logoutAndGo = () => {
  logout()
  router.push('/')
}
</script> 