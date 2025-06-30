<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header del Admin -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <div class="text-2xl">⚙️</div>
            <div>
              <h1 class="text-xl font-semibold text-gray-900">Panel de Administración</h1>
              <p class="text-sm text-gray-600">TechStore - Gestión de productos</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
              <p class="text-xs text-gray-600">{{ user?.email }}</p>
            </div>
            <button 
              @click="logoutAndGo"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Estadísticas rápidas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="text-3xl text-blue-600 mr-4">📦</div>
            <div>
              <p class="text-sm font-medium text-gray-600">Total Productos</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalProducts }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="text-3xl text-green-600 mr-4">💰</div>
            <div>
              <p class="text-sm font-medium text-gray-600">Ventas Hoy</p>
              <p class="text-2xl font-bold text-gray-900">${{ stats.todaySales }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="text-3xl text-yellow-600 mr-4">🛒</div>
            <div>
              <p class="text-sm font-medium text-gray-600">Pedidos Pendientes</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.pendingOrders }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="text-3xl text-red-600 mr-4">⚠️</div>
            <div>
              <p class="text-sm font-medium text-gray-600">Stock Bajo</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.lowStock }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones rápidas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <NuxtLink 
          to="/admin/products"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-200"
        >
          <div class="flex items-center mb-4">
            <div class="text-3xl text-blue-600 mr-3">📋</div>
            <h3 class="text-lg font-semibold text-gray-900">Gestionar Productos</h3>
          </div>
          <p class="text-gray-600 text-sm">Agregar, editar o eliminar productos del catálogo</p>
        </NuxtLink>

        <NuxtLink 
          to="/admin/orders"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-green-200"
        >
          <div class="flex items-center mb-4">
            <div class="text-3xl text-green-600 mr-3">📦</div>
            <h3 class="text-lg font-semibold text-gray-900">Gestionar Pedidos</h3>
          </div>
          <p class="text-gray-600 text-sm">Ver y procesar pedidos de los clientes</p>
        </NuxtLink>

        <NuxtLink 
          to="/admin/categories"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-200"
        >
          <div class="flex items-center mb-4">
            <div class="text-3xl text-purple-600 mr-3">🏷️</div>
            <h3 class="text-lg font-semibold text-gray-900">Gestionar Categorías</h3>
          </div>
          <p class="text-gray-600 text-sm">Organizar productos por categorías</p>
        </NuxtLink>

        <NuxtLink 
          to="/admin/users"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-orange-200"
        >
          <div class="flex items-center mb-4">
            <div class="text-3xl text-orange-600 mr-3">👥</div>
            <h3 class="text-lg font-semibold text-gray-900">Gestionar Usuarios</h3>
          </div>
          <p class="text-gray-600 text-sm">Administrar cuentas de usuarios</p>
        </NuxtLink>

        <NuxtLink 
          to="/admin/dashboard"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-red-200"
        >
          <div class="flex items-center mb-4">
            <div class="text-3xl text-red-600 mr-3">📊</div>
            <h3 class="text-lg font-semibold text-gray-900">Reportes</h3>
          </div>
          <p class="text-gray-600 text-sm">Ver estadísticas y reportes de ventas</p>
        </NuxtLink>

        <NuxtLink 
          to="/admin/dashboard"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-gray-200"
        >
          <div class="flex items-center mb-4">
            <div class="text-3xl text-gray-600 mr-3">⚙️</div>
            <h3 class="text-lg font-semibold text-gray-900">Configuración</h3>
          </div>
          <p class="text-gray-600 text-sm">Configurar opciones del sistema</p>
        </NuxtLink>
      </div>

      <!-- Actividad reciente -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center space-x-4">
              <div class="text-2xl">{{ activity.icon }}</div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-xs text-gray-600">{{ activity.description }}</p>
              </div>
              <span class="text-xs text-gray-500">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Middleware de autenticación
definePageMeta({
  middleware: ['user-auth', 'verify-role-admin']
})

// Composable de autenticación
const { clearAuth, user } = useAuth()

// Meta tags
useHead({
  title: 'Dashboard - Panel de Administración',
  meta: [
    { name: 'description', content: 'Panel de administración de TechStore' }
  ]
})

// Estadísticas simuladas
const stats = ref({
  totalProducts: 16,
  todaySales: '2,450',
  pendingOrders: 8,
  lowStock: 3
})

// Actividad reciente simulada
const recentActivity = ref([
  {
    id: 1,
    icon: '📦',
    title: 'Nuevo producto agregado',
    description: 'PC Gaming Elite fue agregada al catálogo',
    time: 'Hace 2 horas'
  },
  {
    id: 2,
    icon: '💰',
    title: 'Pedido completado',
    description: 'Pedido #1234 fue procesado exitosamente',
    time: 'Hace 4 horas'
  },
  {
    id: 3,
    icon: '⚠️',
    title: 'Stock bajo detectado',
    description: 'Monitor 4K Gaming tiene solo 2 unidades',
    time: 'Hace 6 horas'
  },
  {
    id: 4,
    icon: '👤',
    title: 'Nuevo usuario registrado',
    description: 'usuario@ejemplo.com se registró en el sitio',
    time: 'Hace 8 horas'
  }
])

const logoutAndGo = () => {
  clearAuth()
  navigateTo('/')
}
</script> 