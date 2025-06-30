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
              <h1 class="text-xl font-semibold text-gray-900">Gestionar Usuarios</h1>
              <p class="text-sm text-gray-600">Administrar cuentas de usuarios registrados</p>
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
     

      <!-- Tabla de usuarios -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            Usuarios ({{ users.length }})
          </h3>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Registro
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 mr-3 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      <div v-if="user.avatar" class="w-full h-full">
                        <img :src="user.avatar" :alt="user.name" class="w-full h-full object-cover" />
                      </div>
                      <div v-else class="text-lg font-semibold text-gray-600">
                        {{ user.name ? user.name.charAt(0).toUpperCase() : 'U' }}
                      </div>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ user.name || 'Sin nombre' }}</div>
                      
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.email }}</div>
                </td>
                
                
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(user.createdAt) }}</div>
                </td>
                
             
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mensaje cuando no hay usuarios -->
        <div v-if="users.length === 0" class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">👥</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No se encontraron usuarios</h3>
          <p class="text-gray-600">No hay usuarios que coincidan con los filtros aplicados.</p>
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

// Composable de autenticación y API
const { clearAuth } = useAuth()
const { getResultDataGet } = useApi()
const { showNotification } = useGlobalNotification()

// Meta tags
useHead({
  title: 'Gestionar Usuarios - Panel de Administración',
  meta: [
    { name: 'description', content: 'Administrar usuarios registrados en TechStore' }
  ]
})

// Estado reactivo
const users = ref([])


// Cargar usuarios al montar el componente
onMounted(() => {
  getUsers()
})

// Obtener usuarios
const getUsers = async () => {
  try {
    const response = await getResultDataGet({ end_point: '/auth/users' })
    if (response.operation) {
      users.value = response.data 
     
    } else {
      showNotification('error', 'Error al cargar usuarios: ' + response.error)
    }
  } catch (error) {
    showNotification('error', 'Error al cargar usuarios')
 
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const logoutAndGo = () => {
  clearAuth()
  navigateTo('/')
}
</script> 