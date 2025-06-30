<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header del Admin -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin/dashboard"
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-300">
              ← Volver al Dashboard
            </NuxtLink>
            <div>
              <h1 class="text-xl font-semibold text-gray-900">Gestionar Pedidos</h1>
              <p class="text-sm text-gray-600">Administrar pedidos de los clientes</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <button @click="logoutAndGo"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!--
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <input v-model="searchTerm" type="text" placeholder="Buscar por cliente, ID..." 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select v-model="selectedStatus"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Todos los estados</option>
              <option value="Procesando">Procesando</option>
              <option value="Enviado">Enviado</option>
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
            <input v-model="selectedDate" type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div class="flex items-end">
            <button @click="clearFilters"
              class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mb-1">
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>
 -->
      <!-- Tabla de pedidos -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            Pedidos ({{ filteredOrders.length }})
          </h3>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Pedido
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productos
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">#{{ order._id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ order.user.name }}</div>
                    <div class="text-sm text-gray-500">{{ order.user.email }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(order.createdAt) }}</div>
                  <div class="text-sm text-gray-500">{{ formatTime(order.createdAt) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">${{ order.total }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusClass(order.status)">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.items.length }} productos</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end items-center space-x-2">
                    <!-- Botón ver detalles -->
                    <button @click="viewOrderDetails(order)"
                      class="inline-flex items-center justify-center w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 shadow-sm hover:shadow-md"
                      title="Ver detalles">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                        </path>
                      </svg>
                    </button>

                    <!-- Botón cambiar estado 
                    <button @click="changeOrderStatus(order)"
                      class="inline-flex items-center justify-center w-8 h-8 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 border border-green-200 hover:border-green-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 shadow-sm hover:shadow-md"
                      title="Cambiar estado">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                        </path>
                      </svg>
                    </button>
                    -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mensaje cuando no hay pedidos -->
        <div v-if="filteredOrders.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📦</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No hay pedidos</h3>
          <p class="text-gray-500">No se encontraron pedidos con los filtros aplicados.</p>
        </div>
      </div>
    </main>

    <!-- Modal de detalles del pedido -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              Detalles del Pedido #{{ selectedOrder?._id }}
            </h3>
            <button @click="showDetailsModal = false"
              class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div v-if="selectedOrder" class="space-y-6">
            <!-- Información del cliente -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-md font-semibold text-gray-900 mb-3">Información del Cliente</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600">Nombre</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedOrder.user.name }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Email</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedOrder.user.email }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Fecha del pedido</p>
                  <p class="text-sm font-medium text-gray-900">{{ formatDate(selectedOrder.createdAt) }} {{ formatTime(selectedOrder.createdAt) }}</p>
                </div>
              </div>
            </div>

            <!-- Dirección de envío -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-md font-semibold text-gray-900 mb-3">Dirección de Envío</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600">Dirección</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedOrder.shippingAddress?.address || 'No especificada' }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Ciudad</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedOrder.shippingAddress?.city || 'No especificada' }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Código Postal</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedOrder.shippingAddress?.zipCode || 'No especificado' }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Teléfono</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedOrder.shippingAddress?.phone || 'No especificado' }}</p>
                </div>
              </div>
            </div>

            <!-- Productos del pedido -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-md font-semibold text-gray-900 mb-3">Productos del Pedido</h4>
              <div class="space-y-3">
                <div v-for="item in selectedOrder.items" :key="item.id" 
                  class="flex items-center space-x-4 p-3 bg-white rounded-lg">
                  <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <h5 class="text-sm font-medium text-gray-900">{{ item.name }}</h5>
                    <p class="text-sm text-gray-500">Cantidad: {{ item.quantity }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-gray-900">${{ item.price }}</p>
                    <p class="text-sm text-gray-500">Total: ${{ (item.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Resumen del pedido -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-md font-semibold text-gray-900 mb-3">Resumen del Pedido</h4>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Subtotal:</span>
                  <span class="text-sm font-medium text-gray-900">${{ selectedOrder.subtotal }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Envío:</span>
                  <span class="text-sm font-medium text-gray-900">${{ selectedOrder.shippingCost || '0.00' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Impuestos:</span>
                  <span class="text-sm font-medium text-gray-900">${{ selectedOrder.taxes || '0.00' }}</span>
                </div>
                <div class="border-t pt-2">
                  <div class="flex justify-between">
                    <span class="text-md font-semibold text-gray-900">Total:</span>
                    <span class="text-md font-bold text-gray-900">${{ selectedOrder.total }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Estado actual -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-md font-semibold text-gray-900 mb-3">Estado del Pedido</h4>
              <div class="flex items-center space-x-3">
                <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
                  :class="getStatusClass(selectedOrder.status)">
                  {{ selectedOrder.status }}
                </span>
                 <!-- Estado actual 
                <button @click="changeOrderStatus(selectedOrder)"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Cambiar Estado
                </button>
                -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para cambiar estado -->
    <div v-if="showStatusModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Cambiar Estado del Pedido #{{ selectedOrder?.id }}
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nuevo Estado</label>
              <select v-model="newStatus"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Procesando">Procesando</option>
                <option value="Enviado">Enviado</option>
                <option value="Entregado">Entregado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            <div class="flex justify-end space-x-3">
              <button @click="showStatusModal = false"
                class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Cancelar
              </button>
              <button @click="updateOrderStatus"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Middleware de autenticación
definePageMeta({
  middleware: ['user-auth', 'verify-role-admin']
})

// Composable de autenticación y órdenes
const { clearAuth } = useAuth()
const { getResultDataGet } = useApi()


// Meta tags
useHead({
  title: 'Gestionar Pedidos - Panel de Administración',
  meta: [
    { name: 'description', content: 'Gestionar pedidos de clientes en TechStore' }
  ]
})

// Estado reactivo
const searchTerm = ref('')
const selectedStatus = ref('')
const selectedDate = ref('')
const showDetailsModal = ref(false)
const showStatusModal = ref(false)
const selectedOrder = ref(null)
const newStatus = ref('')
const orders = ref([])
// Computed properties
const filteredOrders = computed(() => {
  let filtered = orders.value

  // Filtro por búsqueda
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(order => 
      order._id.toString().includes(search) ||
      order.user.name.toLowerCase().includes(search) ||
      order.user.email.toLowerCase().includes(search)
    )
  }

  // Filtro por estado
  if (selectedStatus.value) {
    filtered = filtered.filter(order => order.status === selectedStatus.value)
  }

  // Filtro por fecha
  if (selectedDate.value) {
    const orderDate = new Date(selectedDate.value).toDateString()
    filtered = filtered.filter(order => 
      new Date(order.createdAt).toDateString() == orderDate
    )
  }

  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

// Métodos
const clearFilters = () => {
  searchTerm.value = ''
  selectedStatus.value = ''
  selectedDate.value = ''
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status) => {
  const classes = {
    'Procesando': 'bg-yellow-100 text-yellow-800',
    'Enviado': 'bg-blue-100 text-blue-800',
    'Entregado': 'bg-green-100 text-green-800',
    'Cancelado': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const viewOrderDetails = (order) => {
  selectedOrder.value = order
  showDetailsModal.value = true
}

const changeOrderStatus = (order) => {
  selectedOrder.value = order
  newStatus.value = order.status
  showStatusModal.value = true
}

const updateOrderStatus = () => {
  if (selectedOrder.value && newStatus.value) {
    updateOrder(selectedOrder.value.id, newStatus.value)
    selectedOrder.value.status = newStatus.value
    showStatusModal.value = false
    showDetailsModal.value = false
  }
}

const logoutAndGo = () => {
  clearAuth()
  navigateTo('/admin/login')
}

const getUsers = async () => {
  try {
    const response = await getResultDataGet({ end_point: '/pedidos' })
    if (response.operation) {
        orders.value = response.data 
     
    } else {
      showNotification('error', 'Error al cargar usuarios: ' + response.error)
    }
  } catch (error) {
    showNotification('error', 'Error al cargar usuarios')
 
  }
}

onMounted(() => {
  getUsers()
})
</script> 